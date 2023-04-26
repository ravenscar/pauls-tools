import React from 'react';
import {v4} from 'uuid';
import {nanoid} from 'nanoid';
import {Area, Button, Column, Heading, Row} from './style-helpers';
import {useSerialize} from '../storage/cache';
import styled from '@emotion/styled';

const CopyButton = styled(Button)`
	cursor: copy;
`;

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
						<CopyButton onClick={handleUuid}>UUID + copy</CopyButton>
					</Row>
				</Column>
				<Column flex={1}>
					<Row>
						<Area readOnly value={nanoId} flex={1} />
						<CopyButton onClick={handleNanoId}>Nano ID + copy</CopyButton>
					</Row>
				</Column>
			</Row>
		</Column>
	);
};

export default Encoding;
