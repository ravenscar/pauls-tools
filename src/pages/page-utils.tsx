import React from 'react';
import {v4} from 'uuid';
import {nanoid} from 'nanoid';
import {Area, Button, Column, Heading, Row} from './style-helpers';
import {useSerialize} from '../storage/cache';

const Encoding = () => {
	const [uuid, setUuid] = React.useState('');
	const [nanoId, setNanoId] = React.useState('');

	useSerialize(
		'/utils',
		{uuid, nanoId},
		{
			uuid: setUuid,
			nanoId: setNanoId,
		},
	);

	const handleUuid = async () => {
		const value = v4();
		setUuid(value);
		await navigator.clipboard.writeText(value);
	};

	const handleNanoId = async () => {
		const value = nanoid();
		setNanoId(value);
		await navigator.clipboard.writeText(value);
	};

	return (
		<Column>
			<Heading>Generate IDs</Heading>
			<Row>
				<Column flex={1}>
					<Row>
						<Area readOnly value={uuid} flex={1} />
						<Button onClick={handleUuid}>UUID + copy</Button>
					</Row>
				</Column>
				<Column flex={1}>
					<Row>
						<Area readOnly value={nanoId} flex={1} />
						<Button onClick={handleNanoId}>Nano ID + copy</Button>
					</Row>
				</Column>
			</Row>
		</Column>
	);
};

export default Encoding;
