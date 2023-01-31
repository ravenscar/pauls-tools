import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	min-height: ${() => window.innerHeight - 150}px;
	max-height: ${() => window.innerHeight - 150}px;
`;

const Bad = styled.span`
	color: ${props => props.theme.colors.error};
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	margin: 10px;
	min-height: 80vh;
`;

const Area = styled.textarea`
	flex: 1;
`;

const Base64 = () => {
	const [text, setText] = React.useState(atob(''));
	const [b64, setB64] = React.useState('');
	const [badBase64, setBadBase64] = React.useState(false);

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

	return (
		<Container>
			<Column>
				<h1>Ascii</h1>
				<Area onChange={handleTextChange} value={text} />
			</Column>
			<Column>
				<h1>
					Base64<Bad>{badBase64 ? ' x' : ''}</Bad>
				</h1>
				<Area onChange={handleB64Change} value={b64} />
			</Column>
		</Container>
	);
};

export default Base64;
