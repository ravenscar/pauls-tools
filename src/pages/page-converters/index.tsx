import React from 'react';
import {Area, Column, Heading, Row} from '../style-helpers';
import {useSerialize} from '../../storage/cache';
import {convertFromHex, convertToHex} from './util';
import {useConverter} from './useConverter';

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
	const [b64Src, b64Dest, b64Err, onChangeB64Src, onChangeB64Dest] =
		useConverter(
			(newValue, setSrc, setDest, setErr) => {
				setSrc(newValue);
				setDest(btoa(newValue));
				setErr(false);
			},

			(newValue, setSrc, setDest, setErr) => {
				setDest(newValue);
				try {
					setSrc(atob(newValue));
					setErr(false);
				} catch {
					setErr(true);
				}
			},
		);

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
			b64Text: onChangeB64Src,
			b64: onChangeB64Dest,
			hexText: setHexSrc,
			hex: setHexDest,
			jot: setJotSrc,
			jotProps: setJotDest,
		},
	);

	const handleHexSrcChange = (val: string) => {
		setHexSrc(val);
		setHexDest(convertToHex(val));
		setHexErr(false);
	};

	const handleHexDestChange = (val: string) => {
		setHexDest(val);
		try {
			setHexSrc(convertFromHex(val));
			setHexErr(false);
		} catch {
			setHexErr(true);
		}
	};

	const handleJotSrcChange = (val: string) => {
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

	const handleJotDestChange = (val: string) => {
		setJotDest(val);
	};

	return (
		<Column>
			<Converter
				{...{
					heading: 'Text to Base64',
					srcValue: b64Src,
					destValue: b64Dest,
					onChangeSrc: e => onChangeB64Src(e.target.value),
					onChangeDest: e => onChangeB64Dest(e.target.value),
				}}
			/>
			<Converter
				{...{
					heading: 'Text to Hex',
					srcValue: hexSrc,
					destValue: hexDest,
					onChangeSrc: e => handleHexSrcChange(e.target.value),
					onChangeDest: e => handleHexDestChange(e.target.value),
				}}
			/>
			<Converter
				{...{
					heading: 'Decode JOT',
					srcValue: jotSrc,
					destValue: jotDest,
					onChangeSrc: e => handleJotSrcChange(e.target.value),
					onChangeDest: e => handleJotDestChange(e.target.value),
				}}
			/>
		</Column>
	);
};

export default Converters;
