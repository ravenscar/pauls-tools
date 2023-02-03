import styled from '@emotion/styled';
import React from 'react';
import {v4} from 'uuid';
import {nanoid} from 'nanoid';
import {
	Area,
	Bad,
	BigLeft,
	BigRight,
	Button,
	ContainerBaseline,
	Half,
	Quarter,
} from './style-helpers';

const Base64 = () => {
	const [text, setText] = React.useState(atob(''));
	const [b64, setB64] = React.useState('');
	const [badBase64, setBadBase64] = React.useState(false);
	const [uuid, setUuid] = React.useState('');
	const [nanoId, setNanoId] = React.useState('');

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
		<ContainerBaseline>
			<Half>
				<BigRight>
					<h3>Ascii&nbsp;</h3>
					<Area onChange={handleTextChange} value={text} />
				</BigRight>
			</Half>
			<Half>
				<BigRight>
					<h3>
						Base64 <Bad>{badBase64 ? 'x' : ''}</Bad>&nbsp;
					</h3>
					<Area onChange={handleB64Change} value={b64} />
				</BigRight>
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
		</ContainerBaseline>
	);
};

export default Base64;
