import React from 'react';
import {v4} from 'uuid';
import {nanoid} from 'nanoid';
import {Area, Button, Column, Heading, Row} from './style-helpers';
import {useSerialize} from '../storage/cache';

const Base64 = () => {
	const [b64Text, setB64Text] = React.useState(atob(''));
	const [b64, setB64] = React.useState('');
	const [badBase64, setBadBase64] = React.useState(false);

	const [hexText, setHexText] = React.useState(atob(''));
	const [hex, setHex] = React.useState('');
	const [badHex, setBadHex] = React.useState(false);

	const [jot, setJot] = React.useState('');
	const [jotProps, setJotProps] = React.useState('');
	const [badJot, setBadJot] = React.useState(false);

	const [uuid, setUuid] = React.useState('');
	const [nanoId, setNanoId] = React.useState('');

	useSerialize(
		'/b64',
		{b64Text, b64, hexText, hex, jot, jotProps, uuid, nanoId},
		{
			b64Text: setB64Text,
			b64: setB64,
			hexText: setHexText,
			hex: setHex,
			jot: setJot,
			jotProps: setJotProps,
			uuid: setUuid,
			nanoId: setNanoId,
		},
	);

	const handleB64TextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setB64Text(val);
		setB64(btoa(val));
		setBadBase64(false);
	};

	const handleB64Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setB64(val);
		try {
			setB64Text(atob(val));
			setBadBase64(false);
		} catch {
			setBadBase64(true);
		}
	};

	const convertToHex = (input: string) => {
		let output = '';

		for (const c of input) {
			output = output + c.charCodeAt(0).toString(16).padStart(2, '0');
		}

		return output;
	};

	const convertFromHex = (input: string) => {
		let output = '';
		let buffer = '';

		for (const c of input) {
			if (!Number.isNaN(parseInt(c, 16))) {
				buffer = buffer + c;
			}
			if (buffer.length === 2) {
				const c = String.fromCharCode(parseInt(buffer, 16));
				output = output + c;
				buffer = '';
			}
		}

		return output;
	};

	const handleHexTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setHexText(val);
		setHex(convertToHex(val));
		setBadHex(false);
	};

	const handleHexChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setHex(val);
		try {
			setHexText(convertFromHex(val));
			setBadHex(false);
		} catch {
			setBadHex(true);
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
		<Column>
			<Heading>Text to Base64</Heading>
			<Row>
				<Area
					flex={1}
					placeholder='text'
					min-height='200px'
					onChange={handleB64TextChange}
					value={b64Text}
				/>
				<Area
					flex={1}
					placeholder='b64 encoded'
					min-height='200px'
					onChange={handleB64Change}
					value={b64}
				/>
			</Row>

			<Heading>Text to Hex</Heading>
			<Row>
				<Area
					flex={1}
					placeholder='text'
					min-height='200px'
					onChange={handleHexTextChange}
					value={hexText}
				/>
				<Area
					flex={1}
					placeholder='hex encoded'
					min-height='200px'
					onChange={handleHexChange}
					value={hex}
				/>
			</Row>

			<Heading>Get JOT details</Heading>
			<Row>
				<Area
					flex={1}
					placeholder='jwt'
					min-height='300px'
					onChange={handleJotChange}
					value={jot}
				/>
				<Area
					flex={1}
					placeholder='props'
					min-height='300px'
					onChange={handleJotPropsChange}
					value={jotProps}
				/>
			</Row>

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

export default Base64;
