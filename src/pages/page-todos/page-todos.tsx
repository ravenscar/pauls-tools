import React, {useState} from 'react';
import styled from '@emotion/styled';

import {Column} from '../style-helpers';

import {AddTodoForm} from './add-todo-form';
import {TodoList} from './todo-list';
import {purgeCompletedTodos, Todo} from '../../storage/todos';

const Page = styled.div`
	min-height: 100%;
`;

const Todos = styled.div`
	display: grid;
	grid-gap: 20px;
	grid-template-columns: auto;
	grid-template-rows: auto auto 1fr;
	align-content: baseline;
`;

const Cleanup = styled.div`
	justify-self: right;
	font-size: 200%;
	cursor: pointer;
	align-self: end;
`;

export const PageTodos = () => {
	const [selected, setSelected] = useState<Todo | undefined>();

	const purge = async () => {
		await purgeCompletedTodos();
		if (selected && selected.completed) {
			setSelected(undefined);
		}
	};

	return (
		<Page>
			<Column>
				<div>
					<Todos>
						<AddTodoForm
							updateTodo={selected}
							clearUpdate={() => setSelected(undefined)}
						/>
						<TodoList selected={setSelected} />
						<Cleanup onClick={purge}>🗑️</Cleanup>
					</Todos>
				</div>
			</Column>
		</Page>
	);
};
