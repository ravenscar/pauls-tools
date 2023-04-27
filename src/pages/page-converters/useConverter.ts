import {useState} from 'react';

type TConverter = (
	handleSrcChange: TChangeHandler,
	handleDestChange: TChangeHandler,
) => [
	string,
	string,
	unknown,
	(newValue: string) => void,
	(newValue: string) => void,
];

type TChangeHandler = (
	newValue: string,
	setSrc: (newSrc: string) => void,
	setDest: (newDest: string) => void,
	setErr: (err: any) => void,
) => void;

export const useConverter: TConverter = (handleSrcChange, handleDestChange) => {
	const [src, setSrc] = useState('');
	const [dest, setDest] = useState('');
	const [err, setErr] = useState<unknown>(undefined);

	return [
		src,
		dest,
		err,
		(val: string) => handleSrcChange(val, setSrc, setDest, setErr),
		(val: string) => handleDestChange(val, setSrc, setDest, setErr),
	];
};
