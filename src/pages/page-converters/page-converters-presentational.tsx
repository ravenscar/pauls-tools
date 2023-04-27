import React from 'react';
import {Area, Column, Error, Heading, Row} from '../style-helpers';

const Converter = (props: TProps['converters'][number]) => (
	<>
		<Heading>{props.heading}</Heading>
		<Row>
			<Area
				flex={1}
				placeholder='source'
				min-height='200px'
				onChange={e => props.onChangeSrc(e.target.value)}
				value={props.src}
			/>
			<Area
				flex={1}
				placeholder='destination'
				min-height='200px'
				onChange={e => props.onChangeDest(e.target.value)}
				value={props.dest}
			/>
		</Row>
		{props.err && <Error>↑ {`${props.err}`}</Error>}
	</>
);

type TProps = {
	converters: {
		heading: string;
		src: string;
		dest: string;
		err: unknown;
		onChangeSrc: (newValue: string) => void;
		onChangeDest: (newValue: string) => void;
	}[];
};

export const PageConvertersPresentational = ({converters}: TProps) => (
	<Column>
		{converters.map((c, i) => (
			<Converter key={i} {...c} />
		))}
	</Column>
);
