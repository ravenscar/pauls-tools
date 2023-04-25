import React, {useState} from 'react';
import styled from '@emotion/styled';

import {Area, Button, Column} from '../style-helpers';

import {AddTodoForm} from './todo/add-todo-form';
import {TodoList} from './todo/todo-list';
import {purgeCompletedTodos, Todo} from '../../storage/todos';
import {useEditorFilelist} from '../../storage/editor';
import {FilePlus, Save} from 'react-feather';

const Page = styled.div`
	min-height: 100%;
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

const EditorForm = styled.div`
	grid-template-rows: auto 1fr;
`;

const Home = () => {
	const [selected, setSelected] = useState<Todo | undefined>();
	const [editorContent, setEditorContent] = useState('');
	const files = useEditorFilelist();

	const purge = async () => {
		await purgeCompletedTodos();
		if (selected && selected.completed) {
			setSelected(undefined);
		}
	};

	return (
		<Page>
			<Sidebar>
				{files?.map(file => (
					<Button key={file.id}>
						<code>{file.title}</code>
					</Button>
				))}
			</Sidebar>
			<Column>
				<EditorForm>
					<NoteControls>
						<input />
						<Save />
						<FilePlus />
					</NoteControls>
					<Area />
				</EditorForm>
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

export default Home;
