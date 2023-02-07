import React, {useState} from 'react';
import styled from '@emotion/styled';

import {Area, BigRight, Button, Container, Half} from '../style-helpers';

import {AddTodoForm} from './add-todo-form';
import {TodoList} from './todo-list';
import {purgeCompletedTodos, Todo} from '../../storage/todos';
import {useEditorFilelist} from '../../storage/editor';

const Page = styled(BigRight)`
	min-height: 100%;
	max-height: 100%;
`;

const Sidebar = styled.div`
	display: grid;
	grid-gap: 20px;
	margin-right: 20px;
	align-content: baseline;
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

const NoteControls = styled.div`
	background-color: red;
	min-height: 100px;
`;

const Editor = styled(Half)`
	grid-template-rows: auto 1fr;
`;

const Home = () => {
	const [selected, setSelected] = useState<Todo | undefined>();
	const files = useEditorFilelist();

	return (
		<Page>
			<Sidebar>
				{files?.map(file => (
					<Button key={file.id}>
						<code>{file.title}</code>
					</Button>
				))}
			</Sidebar>
			<Container vertStretch={true}>
				<Editor>
					<NoteControls>xxx</NoteControls>
					<Area></Area>
				</Editor>
				<Half>
					<Todos>
						<AddTodoForm
							updateTodo={selected}
							clearUpdate={() => setSelected(undefined)}
						/>
						<TodoList selected={setSelected} />
						<Cleanup onClick={purgeCompletedTodos}>🗑️</Cleanup>
					</Todos>
				</Half>
			</Container>
		</Page>
	);
};

export default Home;
