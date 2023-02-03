import React from 'react';

import styled from '@emotion/styled';
import {Button} from '../style-helpers';

import {parseModes, type ParseMode} from './util';

const Container = styled.div`
	display: grid;
	gap: 10px;
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
