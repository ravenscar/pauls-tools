import React from 'react';
import {Area, Column, Heading, Row} from './style-helpers';
import {useSerialize} from '../storage/cache';

const Converter = (props: {
	heading: string;
	error?: any;
	srcValue: string;
	onChangeSrc?: React.ChangeEventHandler<HTMLTextAreaElement>;
	destValue: string;
	onChangeDest?: React.ChangeEventHandler<HTMLTextAreaElement>;
}) => (
	<>
		<Heading>{props.heading}</Heading>
		<Row>
			<Area
				flex={1}
				placeholder='source'
				min-height='200px'
				onChange={props.onChangeSrc}
				value={props.srcValue}
			/>
			<Area
				flex={1}
				placeholder='destination'
				min-height='200px'
				onChange={props.onChangeDest}
				value={props.destValue}
			/>
		</Row>
	</>
);

const Converters = () => {
	const [b64Src, setB64Src] = React.useState(atob(''));
	const [b64Dest, setB64Dest] = React.useState('');
	const [b64Err, setB64Err] = React.useState(false);

	const [hexSrc, setHexSrc] = React.useState(atob(''));
	const [hexDest, setHexDest] = React.useState('');
	const [hexErr, setHexErr] = React.useState(false);

	const [jotSrc, setJotSrc] = React.useState('');
	const [jotDest, setJotDest] = React.useState('');
	const [jotErr, setJotErr] = React.useState(false);

	useSerialize(
		'/converters',
		{
			b64Text: b64Src,
			b64: b64Dest,
			hexText: hexSrc,
			hex: hexDest,
			jot: jotSrc,
			jotProps: jotDest,
		},
		{
			b64Text: setB64Src,
			b64: setB64Dest,
			hexText: setHexSrc,
			hex: setHexDest,
			jot: setJotSrc,
			jotProps: setJotDest,
		},
	);

	const handleB64SrcChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setB64Src(val);
		setB64Dest(btoa(val));
		setB64Err(false);
	};

	const handleB64DestChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setB64Dest(val);
		try {
			setB64Src(atob(val));
			setB64Err(false);
		} catch {
			setB64Err(true);
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

	const handleHexSrcChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setHexSrc(val);
		setHexDest(convertToHex(val));
		setHexErr(false);
	};

	const handleHexDestChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setHexDest(val);
		try {
			setHexSrc(convertFromHex(val));
			setHexErr(false);
		} catch {
			setHexErr(true);
		}
	};

	const handleJotSrcChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		try {
			setJotSrc(val);
			const [, meat] = val.split('.');
			const decoded = atob(meat);
			const parsed = JSON.parse(decoded);
			setJotDest(JSON.stringify(parsed, null, 2));
			setJotErr(false);
		} catch {
			setJotDest('');
			setJotErr(true);
		}
	};

	const handleJotDestChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setJotDest(val);
	};

	return (
		<Column>
			<Converter
				{...{
					heading: 'Text to Base64',
					srcValue: b64Src,
					destValue: b64Dest,
					onChangeSrc: handleB64SrcChange,
					onChangeDest: handleB64DestChange,
				}}
			/>
			<Converter
				{...{
					heading: 'Text to Hex',
					srcValue: hexSrc,
					destValue: hexDest,
					onChangeSrc: handleHexSrcChange,
					onChangeDest: handleHexDestChange,
				}}
			/>
			<Converter
				{...{
					heading: 'Decode JOT',
					srcValue: jotSrc,
					destValue: jotDest,
					onChangeSrc: handleJotSrcChange,
					onChangeDest: handleJotDestChange,
				}}
			/>
		</Column>
	);
};

export default Converters;
