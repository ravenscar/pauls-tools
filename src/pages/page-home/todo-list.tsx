import React from 'react';

import {Todo, useTodoList} from '../../storage/todos';
import {StickyNote, TodoBoard} from './style';

export const TodoList = ({selected}: {selected: (todo: Todo) => void}) => {
	const todos = useTodoList();

	return (
		<TodoBoard>
			{todos?.map(todo => (
				<StickyNote
					priority={todo.priority}
					completed={todo.completed}
					key={todo.id}
					onClick={() => selected(todo!)}
				>
					<div>{todo.text}</div>
				</StickyNote>
			))}
		</TodoBoard>
	);
};
