import styled from '@emotion/styled';
import {Priority} from '../../../storage/todos';
import {getPriorityColour} from './priority';

export const StickyNote = styled.div<{priority: Priority; completed?: boolean}>`
	display: grid;
	grid-template-rows: 1fr auto;
	max-width: 250px;
	background-color: ${props =>
		props.completed ? 'var(--gray)' : 'var(--stickyNoteBackground)'};
	color: var(--stickyNotePen);
	padding: 10px;
	box-shadow: 5px 5px 5px 0px var(--midgray);
	border-top: 5px solid ${props => getPriorityColour(props.priority)};
	font-family: 'Caveat', cursive;
	font-size: 150%;
	min-width: 100px;
	cursor: pointer;
	max-height: 200px;
	overflow: auto;
`;

export const TodoBoard = styled.div`
	display: flex;
	flex-flow: wrap;
	align-content: baseline;
	justify-content: center;
	gap: 10px;

	overflow-y: auto;
`;
