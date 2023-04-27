import {useState} from 'react';

type TConverter = (
	handleSrcChange: TChangeHandler,
	handleDestChange: TChangeHandler,
) => {
	src: string;
	dest: string;
	err: unknown;
	onChangeSrc: (newValue: string) => void;
	onChangeDest: (newValue: string) => void;
};

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

	return {
		src,
		dest,
		err,
		onChangeSrc: (val: string) => handleSrcChange(val, setSrc, setDest, setErr),
		onChangeDest: (val: string) =>
			handleDestChange(val, setSrc, setDest, setErr),
	};
};
