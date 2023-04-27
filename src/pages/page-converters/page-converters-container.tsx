import React from 'react';
import {useSerialize} from '../../storage/cache';
import {convertFromHex, convertToHex} from './util';
import {useConverter} from './useConverter';
import {PageConvertersPresentational} from './page-converters-presentational';

export const PageConvertersContainer = () => {
	const b64Converter = useConverter(
		(newValue, setSrc, setDest, setErr) => {
			setSrc(newValue);
			setDest(btoa(newValue));
			setErr(undefined);
		},
		(newValue, setSrc, setDest, setErr) => {
			setDest(newValue);
			try {
				setSrc(atob(newValue));
				setErr(undefined);
			} catch {
				setErr("Couldn't parse b64");
			}
		},
	);

	const hexConverter = useConverter(
		(newValue, setSrc, setDest, setErr) => {
			setSrc(newValue);
			setDest(convertToHex(newValue));
			setErr(undefined);
		},
		(newValue, setSrc, setDest, setErr) => {
			setDest(newValue);
			try {
				setSrc(convertFromHex(newValue));
				setErr(undefined);
			} catch {
				setErr("Couldn't parse hex");
			}
		},
	);

	const jotConverter = useConverter(
		(newValue, setSrc, setDest, setErr) => {
			try {
				setSrc(newValue);
				const [, meat] = newValue.split('.');
				const decoded = atob(meat);
				const parsed = JSON.parse(decoded);
				setDest(JSON.stringify(parsed, null, 2));
				setErr(undefined);
			} catch {
				setDest('');
				setErr("Couldn't parse JOT");
			}
		},
		(newValue, setSrc, setDest, setErr) => {
			setDest(newValue);
		},
	);

	useSerialize(
		'/converters',
		{
			b64Text: b64Converter.src,
			b64: b64Converter.dest,
			hexText: hexConverter.src,
			hex: hexConverter.dest,
			jot: jotConverter.src,
			jotProps: jotConverter.dest,
		},
		{
			b64Text: b64Converter.onChangeSrc,
			b64: b64Converter.onChangeDest,
			hexText: hexConverter.onChangeSrc,
			hex: hexConverter.onChangeDest,
			jot: jotConverter.onChangeSrc,
			jotProps: jotConverter.onChangeDest,
		},
	);

	return (
		<PageConvertersPresentational
			{...{
				converters: [
					{...b64Converter, heading: 'Text to Base64'},
					{...hexConverter, heading: 'Text to hex'},
					{...jotConverter, heading: 'Decode JOT'},
				],
			}}
		/>
	);
};
