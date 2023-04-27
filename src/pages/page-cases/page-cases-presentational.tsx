import React from 'react';
import {Column, Heading, Row} from '../style-helpers';
import styled from '@emotion/styled';
import {renderers} from './renderers';

export const Input = styled.input<{flex?: number}>`
	font-size: 150%;
	${props => (props['flex'] ? `flex: ${props['flex']};` : '')}
`;

export const Pre = styled.pre<{flex?: number}>`
	font-size: 150%;
	background-color: ${props => props.theme.colors.background2};
	text-align: center;
	padding: 10px;
	border: 1px solid ${props => props.theme.colors.tableBorder};
	cursor: copy;
	${props => (props['flex'] ? `flex: ${props['flex']};` : '')}
	&:hover {
		background-color: ${props => props.theme.colors.tableBorder};
	}
`;

type TProps = {
	input: string;
	setInput: (value: string) => void;
	parts: string[];
};

export const PageCasesPresentational = ({input, setInput, parts}: TProps) => (
	<Column>
		<Heading>Change Cases</Heading>
		<Row>
			<Input value={input} flex={1} onChange={e => setInput(e.target.value)} />
		</Row>
		{renderers.map(r => {
			const result = r(parts);
			return <Case key={result.name} {...result} />;
		})}
	</Column>
);

const Case = ({name, value}: {name: string; value: string}) => (
	<>
		<p>{name}:</p>
		<Pre onClick={() => navigator.clipboard.writeText(value)}>{value}</Pre>
	</>
);
