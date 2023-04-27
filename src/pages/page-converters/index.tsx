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

	const [hexSrc, hexDest, hexErr, onChangeHexSrc, onChangeHexDest] =
		useConverter(
			(newValue, setSrc, setDest, setErr) => {
				setSrc(newValue);
				setDest(convertToHex(newValue));
				setErr(false);
			},

			(newValue, setSrc, setDest, setErr) => {
				setDest(newValue);
				try {
					setSrc(convertFromHex(newValue));
					setErr(false);
				} catch {
					setErr(true);
				}
			},
		);

	const [jotSrc, jotDest, jotErr, onChangeJotSrc, onChangeJotDest] =
		useConverter(
			(newValue, setSrc, setDest, setErr) => {
				try {
					setSrc(newValue);
					const [, meat] = newValue.split('.');
					const decoded = atob(meat);
					const parsed = JSON.parse(decoded);
					setDest(JSON.stringify(parsed, null, 2));
					setErr(false);
				} catch {
					setDest('');
					setErr(true);
				}
			},

			(newValue, setSrc, setDest, setErr) => {
				setDest(newValue);
			},
		);

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
			hexText: onChangeHexSrc,
			hex: onChangeHexDest,
			jot: onChangeJotSrc,
			jotProps: onChangeJotDest,
		},
	);

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
					onChangeSrc: e => onChangeHexSrc(e.target.value),
					onChangeDest: e => onChangeHexDest(e.target.value),
				}}
			/>
			<Converter
				{...{
					heading: 'Decode JOT',
					srcValue: jotSrc,
					destValue: jotDest,
					onChangeSrc: e => onChangeJotSrc(e.target.value),
					onChangeDest: e => onChangeJotDest(e.target.value),
				}}
			/>
		</Column>
	);
};

export default Converters;
