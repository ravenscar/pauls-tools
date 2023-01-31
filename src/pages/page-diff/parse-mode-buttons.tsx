import styled from '@emotion/styled';
import React from 'react';

import {parseModes, type ParseMode} from './util';

const Container = styled.div`
	display: grid;
`;
const Button = styled.div<{selected: boolean}>`
	background-color: ${props =>
		props.selected
			? props.theme.colors.featureBackground2
			: props.theme.colors.featureBackground};
	text-align: center;
	padding: 10px;
	border-radius: 5px;
	border: 10px green;
	margin: 5px;
	cursor: pointer;
`;
export const ParseModeButtons = ({
	parseMode,
	setParseMode,
}: {
	parseMode: ParseMode;
	setParseMode: (parseMode: ParseMode) => void;
}) => (
	<Container>
		{parseModes.map(({key, display}) => (
			<Button
				key={key}
				selected={parseMode === key}
				onClick={() => {
					setParseMode(key);
				}}
			>
				<code>{display}</code>
			</Button>
		))}
	</Container>
);
