import React, {useEffect} from 'react';
import {Area, Column, Heading, Row} from './style-helpers';
import {useSerialize} from '../storage/cache';
import styled from '@emotion/styled';

type TRenderer = (parts: string[]) => {
	name: string;
	value: string;
};

export const Input = styled.input<{flex?: number}>`
	font-size: 200%;
	${props => (props['flex'] ? `flex: ${props['flex']};` : '')}
`;

export const Pre = styled.pre<{flex?: number}>`
	font-size: 200%;
	background-color: black;
	text-align: center;
	padding: 10px;
	border: 1px solid ${props => props.theme.colors.tableBorder};
	${props => (props['flex'] ? `flex: ${props['flex']};` : '')}
	&:hover {
		background-color: ${props => props.theme.colors.tableBorder};
	}
`;

const kebabRenderer: TRenderer = parts => {
	console.log('Parts: ', JSON.stringify(parts));
	return {
		name: 'kebab-case',
		value: parts.join('-'),
	};
};

const snakeRenderer: TRenderer = parts => {
	console.log('Parts: ', JSON.stringify(parts));
	return {
		name: 'snake_case',
		value: parts.join('_'),
	};
};

const renderers: TRenderer[] = [kebabRenderer, snakeRenderer];

const Cases = () => {
	const [raw, setRaw] = React.useState('');
	const [parts, setParts] = React.useState<string[]>([]);

	useEffect(() => {
		const stripped = raw.replace(/\s/g, '');
		if (stripped.length === 0) {
			setParts([]);
			return;
		}

		// check if first char is non-alpha like _
		const flMatch = stripped[0].match(/[A-Za-z]/);

		let prefix: string;
		let meat: string;
		if (!flMatch) {
			prefix = stripped[0];
			meat = stripped.slice(1);
		} else {
			prefix = '';
			meat = stripped;
		}

		let bits: string[];

		if (meat.includes('_')) {
			bits = meat.split('_');
		} else if (meat.includes('-')) {
			bits = meat.split('-');
		} else if (meat.includes('.')) {
			bits = meat.split('.');
		} else {
			bits = meat
				.replace(/([A-Z])/g, ' $1')
				.split(' ')
				.filter(Boolean);
		}

		bits = bits.map(b => b.toLocaleLowerCase());
		bits[0] = `${prefix}${bits[0]}`;

		setParts(bits);
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
			<Case name='parts' value={parts.join(' ')} />
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
