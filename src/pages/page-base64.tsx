import styled from '@emotion/styled';
import React from 'react';
import {v4} from 'uuid';
import {nanoid} from 'nanoid';
import {Area, BigLeft, Button, Container, Half, Quarter} from './style-helpers';
import {useSerialize} from '../storage/cache';

const Base64 = () => {
	const [text, setText] = React.useState(atob(''));
	const [b64, setB64] = React.useState('');
	const [badBase64, setBadBase64] = React.useState(false);

	const [jot, setJot] = React.useState('');
	const [jotProps, setJotProps] = React.useState('');
	const [badJot, setBadJot] = React.useState(false);

	const [uuid, setUuid] = React.useState('');
	const [nanoId, setNanoId] = React.useState('');

	useSerialize(
		'/b64',
		{text, b64, jot, jotProps, uuid, nanoId},
		{
			text: setText,
			b64: setB64,
			jot: setJot,
			jotProps: setJotProps,
			uuid: setUuid,
			nanoId: setNanoId,
		},
	);

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setText(val);
		setB64(btoa(val));
		setBadBase64(false);
	};

	const handleB64Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setB64(val);
		try {
			setText(atob(val));
			setBadBase64(false);
		} catch {
			setBadBase64(true);
		}
	};

	const handleJotChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		try {
			setJot(val);
			const [, meat] = val.split('.');
			const decoded = atob(meat);
			const parsed = JSON.parse(decoded);
			setJotProps(JSON.stringify(parsed, null, 2));
			setBadJot(false);
		} catch {
			setJotProps('');
			setBadJot(true);
		}
	};

	const handleJotPropsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setJotProps(val);
	};

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
		<Container>
			<Half>
				<Area
					placeholder='text'
					min-height='200px'
					onChange={handleTextChange}
					value={text}
				/>
			</Half>
			<Half>
				<Area
					placeholder='b64 encoded'
					min-height='200px'
					onChange={handleB64Change}
					value={b64}
				/>
			</Half>

			<Half>
				<Area
					placeholder='jwt'
					min-height='300px'
					onChange={handleJotChange}
					value={jot}
				/>
			</Half>
			<Half>
				<Area
					placeholder='props'
					min-height='300px'
					onChange={handleJotPropsChange}
					value={jotProps}
				/>
			</Half>

			<Quarter>
				<BigLeft>
					<Area readOnly value={uuid} />
					<Button onClick={handleUuid}>UUID + copy</Button>
				</BigLeft>
			</Quarter>
			<Quarter>
				<BigLeft>
					<Area readOnly value={nanoId} />
					<Button onClick={handleNanoId}>Nano ID + copy</Button>
				</BigLeft>
			</Quarter>
		</Container>
	);
};

export default Base64;
