import React, {useState} from 'react';
import styled from '@emotion/styled';

import {Area, BigRight, Button, Container, Half} from '../style-helpers';

import {AddTodoForm} from './todo/add-todo-form';
import {TodoList} from './todo/todo-list';
import {purgeCompletedTodos, Todo} from '../../storage/todos';
import {useEditorFilelist} from '../../storage/editor';

import ReactSimpleCodeEditor from 'react-simple-code-editor';
// import { highlight, languages } from 'prismjs/components/prism-core';
import {prismHighlightSyntax} from '../page-diff/prism-highlight-syntax';

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

// const EditorForm = styled(Half)`
// 	grid-template-rows: auto 1fr;
// `;

const EditorForm = styled.div`
	display: flex;
	flex-direction: column;
	max-height: fit-content(20em);
`;

const EditorContainer = styled.div`
	flex: 1;
	overflow: scroll;
	max-height: 100%;
`;

const Editor = styled(ReactSimpleCodeEditor)`
	white-space: pre;
	caret-color: #fff;
	min-width: 100%;
	min-height: 100%;
	float: left;
	& > textarea,
	& > pre {
		outline: none;
		white-space: pre !important;
	}
`;
const Home = () => {
	const [selected, setSelected] = useState<Todo | undefined>();
	const files = useEditorFilelist();

	const [code, setCode] = React.useState(
		`function add(a, b) {\n  return a + b;\n}`,
	);

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
			<Container vertStretch={true}>
				<EditorForm>
					<NoteControls>xxx</NoteControls>
					<EditorContainer>
						<Editor
							value={code}
							onValueChange={code => setCode(code)}
							highlight={code => prismHighlightSyntax(code, 'js')}
							padding={10}
							style={{
								fontFamily: '"Fira code", "Fira Mono", monospace',
								fontSize: 12,
							}}
						/>
					</EditorContainer>
				</EditorForm>
				<Half>
					<Todos>
						<AddTodoForm
							updateTodo={selected}
							clearUpdate={() => setSelected(undefined)}
						/>
						<TodoList selected={setSelected} />
						<Cleanup onClick={purge}>🗑️</Cleanup>
					</Todos>
				</Half>
			</Container>
		</Page>
	);
};

export default Home;
