import Dexie, {Table} from 'dexie';
import {useLiveQuery} from 'dexie-react-hooks';

export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';

export const PriorityValue: Record<Priority, number> = {
	Critical: 100,
	High: 80,
	Medium: 60,
	Low: 40,
};

export interface Todo {
	id?: number;
	text: string;
	priority: Priority;
	completed?: boolean;
}

export class TodoStore extends Dexie {
	todos!: Table<Todo>;

	constructor() {
		super('todos');
		this.version(1).stores({
			todos: '++id', // Primary key and indexed props
		});
	}
}

export const sortTodos = (todos: Todo[]): Todo[] =>
	[...todos].sort((a, b) => {
		const status = (b.completed ? 0 : 1) - (a.completed ? 0 : 1);
		const prio = PriorityValue[b.priority] - PriorityValue[a.priority];
		const id = (a.id || 0) - (b.id || 0);

		return status || prio || id;
	});

export const upsertTodo = async (todo: Todo) => {
	if (todo.id) {
		await db.todos.update(todo.id, todo);
	} else {
		await db.todos.add(todo);
	}
};

export const setCompletedValue = async (todoId: Todo['id'], value: boolean) => {
	if (typeof todoId === 'number') {
		await db.todos.update(todoId, {
			completed: value,
		});
	} else {
		throw new Error(`Can't complete todo, missing id: ${todoId}`);
	}
};

export const purgeCompletedTodos = async () => {
	const loaded = await db.todos.toArray();
	const completed = loaded.filter(todo => todo.completed);
	await db.todos.bulkDelete(completed.map(c => c.id!));
};

export const useTodoList = () => {
	return useLiveQuery(async () => {
		const loaded = await db.todos.toArray();
		return sortTodos(loaded);
	});
};

const db = new TodoStore();
