import React, {useEffect} from 'react';
import {Area, Column, Heading, Row} from './style-helpers';
import {useSerialize} from '../storage/cache';

type TRenderer = (parts: string[]) => {
	name: string;
	value: string;
};

const kebabRenderer: TRenderer = parts => {
	console.log('Parts: ', JSON.stringify(parts));
	return {
		name: 'kebab-case',
		value: parts.join('-'),
	};
};

const renderers: TRenderer[] = [kebabRenderer];

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
				<Area value={raw} flex={1} onChange={e => setRaw(e.target.value)} />
			</Row>
			<Row>{parts.join(' ')}</Row>
			{renderers.map(r => {
				const result = r(parts);
				return <Row key={result.name}>{result.value}</Row>;
			})}
		</Column>
	);
};

export default Cases;
