import React, {useState} from 'react';
import styled from '@emotion/styled';

import {Column, Row} from '../style-helpers';

import {AddTodoForm} from './add-todo-form';
import {TodoList} from './todo-list';
import {purgeCompletedTodos, Todo} from '../../storage/todos';

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
		<Column>
			<Row>
				<AddTodoForm
					updateTodo={selected}
					clearUpdate={() => setSelected(undefined)}
				/>
			</Row>
			<Row>
				<TodoList selected={setSelected} />
			</Row>
			<Row>
				<Cleanup onClick={purge}>🗑️</Cleanup>
			</Row>
		</Column>
	);
};
