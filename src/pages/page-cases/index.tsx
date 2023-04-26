import React, {useEffect} from 'react';
import {Column, Heading, Row} from '../style-helpers';
import {useSerialize} from '../../storage/cache';
import styled from '@emotion/styled';
import {renderers} from './renderers';
import {getParts} from './util';

export const Input = styled.input<{flex?: number}>`
	font-size: 150%;
	${props => (props['flex'] ? `flex: ${props['flex']};` : '')}
`;

export const Pre = styled.pre<{flex?: number}>`
	font-size: 150%;
	background-color: black;
	text-align: center;
	padding: 10px;
	border: 1px solid ${props => props.theme.colors.tableBorder};
	${props => (props['flex'] ? `flex: ${props['flex']};` : '')}
	&:hover {
		background-color: ${props => props.theme.colors.tableBorder};
	}
`;

const Cases = () => {
	const [raw, setRaw] = React.useState('');
	const [parts, setParts] = React.useState<string[]>([]);

	useEffect(() => {
		setParts(getParts(raw));
	}, [raw]);

	useSerialize(
		'/cases',
		{raw},
		{
			raw: setRaw,
		},
	);

	return (
		<Column>
			<Heading>Change Cases</Heading>
			<Row>
				<Input value={raw} flex={1} onChange={e => setRaw(e.target.value)} />
			</Row>
			{renderers.map(r => {
				const result = r(parts);
				return <Case key={result.name} {...result} />;
			})}
		</Column>
	);
};

const Case = ({name, value}: {name: string; value: string}) => (
	<>
		<p>{name}:</p>
		<Pre onClick={() => navigator.clipboard.writeText(value)}>{value}</Pre>
	</>
);

export default Cases;
