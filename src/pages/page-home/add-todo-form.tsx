import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';

import {
	Priority,
	setCompletedValue,
	Todo,
	upsertTodo,
} from '../../storage/todos';
import {Button} from '../style-helpers';

import {StickyNote} from './style';
import {PriorityBar} from './priority';

const AddNoteContainer = styled.div`
	display: grid;
	grid-template-columns: auto auto;
`;

const AddNoteArea = styled.textarea`
	background-color: var(--stickyNoteBackground);
	min-width: 100%;
	max-width: 100%;
	resize: none;
	border: none;
	&:focus {
		border: none;
		outline: none;
	}
	color: var(--stickyNotePen);
	font-family: 'Caveat', cursive;
	font-size: 200%;
	cursor: auto;
`;

const AddStickyNote = styled(StickyNote)`
	justify-self: right;
	min-width: 50%;
	overflow: hidden;
`;

const Controls = styled.div`
	justify-self: left;
	align-self: end;
	min-width: 0%;
	margin-left: 10px;
`;
const AddNoteAddButton = styled(Button)`
	margin-top: 10px;
	justify-self: left;
	align-self: end;
	min-width: 100px;
`;

export const AddTodoForm = ({
	updateTodo,
	clearUpdate,
}: {
	updateTodo?: Todo;
	clearUpdate: () => void;
}) => {
	const [text, setText] = useState('');
	const [priority, setPriority] = useState<Priority>('Low');
	const [completed, setCompleted] = useState(false);
	const [id, setId] = useState<number | undefined>();

	useEffect(() => {
		if (updateTodo) {
			setText(updateTodo.text);
			setPriority(updateTodo.priority);
			setCompleted(!!updateTodo.completed);
			setId(updateTodo.id);
		} else {
			clear();
		}
	}, [updateTodo]);

	async function addTodo() {
		try {
			await upsertTodo({id, text, priority, completed});
			clear();
		} catch (error) {
			console.error(`Failed to add ${text}: ${error}`);
		}
	}

	async function toggleCompleted() {
		try {
			await setCompletedValue(id, !completed);
			clear();
		} catch (error) {
			console.error(`Failed to add ${text}: ${error}`);
		}
	}

	function clear() {
		setText('');
		setId(undefined);
		setCompleted(false);
	}

	return (
		<AddNoteContainer>
			<AddStickyNote priority={priority} completed={completed}>
				<AddNoteArea
					placeholder='Type your note here'
					value={text}
					onChange={ev => setText(ev.target.value)}
				/>
				<PriorityBar priority={priority} setPriority={setPriority} />
			</AddStickyNote>
			<Controls>
				{id !== undefined && (
					<AddNoteAddButton onClick={toggleCompleted}>
						{completed ? 'Restore' : 'Delete'}
					</AddNoteAddButton>
				)}
				{id !== undefined && (
					<AddNoteAddButton onClick={clearUpdate}>Cancel</AddNoteAddButton>
				)}
				<AddNoteAddButton onClick={addTodo}>
					{id === undefined ? 'Add' : 'Update'}
				</AddNoteAddButton>
			</Controls>
		</AddNoteContainer>
	);
};
