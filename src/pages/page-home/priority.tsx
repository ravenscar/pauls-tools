import React from 'react';

import styled from '@emotion/styled';

import {Priority} from '../../storage/todos';

const StyledPriority = styled.div`
	display: flex;
	flex: 1;
	max-height: 20px;
	min-height: 20px;
`;

export const getPriorityColour = (priority: Priority) => {
	switch (priority) {
		case 'Critical':
			return 'red';
		case 'High':
			return 'orange';
		case 'Medium':
			return 'yellow';
		case 'Low':
			return 'green';
	}
};

const ColouredPriority = styled.div<{
	priority: Priority;
	selected?: boolean;
	autoHide?: boolean;
}>`
	flex: 1;
	background-color: none;
	background-color: ${props =>
		props.autoHide ? 'none' : getPriorityColour(props.priority)};
	border: ${props =>
		props.autoHide ? 'none' : props.selected ? '2px solid' : 'none'};
	&:hover {
		background-color: ${props => getPriorityColour(props.priority)};
		border: ${props =>
			props.autoHide ? 'none' : props.selected ? '2px solid' : 'none'};
	}
`;

type PriorityBarProps = {
	priority: Priority;
	setPriority: (prio: Priority) => void;
	autoHide?: boolean;
};

type PrioritySlugProps = {
	thisPriority: Priority;
	selectedPriority: Priority;
	setPriority: (prio: Priority) => void;
	autoHide?: boolean;
};

const PrioritySlug = ({
	thisPriority,
	selectedPriority,
	setPriority,
	autoHide,
}: PrioritySlugProps) => {
	return (
		<ColouredPriority
			priority={thisPriority}
			selected={selectedPriority === thisPriority}
			onClick={() => setPriority(thisPriority)}
			autoHide={autoHide}
		>
			&nbsp;
		</ColouredPriority>
	);
};

export const PriorityBar = ({
	priority,
	setPriority,
	autoHide,
}: PriorityBarProps) => {
	const priorityProps = {setPriority, autoHide, selectedPriority: priority};
	return (
		<StyledPriority>
			<PrioritySlug {...{...priorityProps, thisPriority: 'Critical'}} />
			<PrioritySlug {...{...priorityProps, thisPriority: 'High'}} />
			<PrioritySlug {...{...priorityProps, thisPriority: 'Medium'}} />
			<PrioritySlug {...{...priorityProps, thisPriority: 'Low'}} />
		</StyledPriority>
	);
};
