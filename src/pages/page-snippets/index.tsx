import React, {useState} from 'react';
import styled from '@emotion/styled';

import {Area, Button, Column} from '../style-helpers';

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

const NoteControls = styled.div`
	background-color: red;
	min-height: 100px;
`;

const EditorForm = styled.div`
	grid-template-rows: auto 1fr;
`;

const Home = () => {
	const [editorContent, setEditorContent] = useState('');
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
			<Column>
				<EditorForm>
					<NoteControls>
						<input />
						<Save />
						<FilePlus />
					</NoteControls>
					<Area />
				</EditorForm>
			</Column>
		</Page>
	);
};

export default Home;
