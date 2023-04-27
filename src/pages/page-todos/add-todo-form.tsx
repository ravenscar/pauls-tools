import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import {CheckCircle, Save, Slash, XCircle} from 'react-feather';

import {
	Priority,
	setCompletedValue,
	Todo,
	upsertTodo,
} from '../../storage/todos';
import {StealthButton} from '../style-helpers';

import {StickyNote} from './style';
import {PriorityBar} from './priority';
import {useSerialize} from '../../storage/cache';

const AddNoteContainer = styled.div`
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: end;
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
	min-width: 600px;
	min-height: 400px;
	overflow: hidden;
`;

const Controls = styled.div`
	float: left;
	max-width: 0;
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

	useSerialize(
		'/notes/todo/form',
		{text, priority, completed, id},
		{text: setText, priority: setPriority, completed: setCompleted, id: setId},
	);

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
					<StealthButton onClick={toggleCompleted}>
						{completed ? <XCircle /> : <CheckCircle />}
					</StealthButton>
				)}
				{id !== undefined && (
					<StealthButton
						onClick={() => {
							clearUpdate();
							clear();
						}}
					>
						<Slash />
					</StealthButton>
				)}
				<StealthButton onClick={addTodo}>
					<Save />
				</StealthButton>
			</Controls>
		</AddNoteContainer>
	);
};
