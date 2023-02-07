import styled from '@emotion/styled';
import React from 'react';
import {useSerialize} from '../../storage/cache';
import {Area} from '../style-helpers';
import {DiffViewerWrapper} from './diff-viewer-wrapper';
import {ParseModeButtons} from './parse-mode-buttons';
import {prismHighlightSyntax} from './prism-highlight-syntax';
import {parseLanguageString, type ParseMode, parseModes} from './util';

const Container = styled.div`
	display: grid;
	grid-template-columns: auto 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 10px;
	min-height: 100%;
	max-height: 100%;
`;

const Selection = styled.div`
	display: grid;
	grid-row: span 2;
	align-items: baseline;
`;

const Old = styled.div`
	display: grid;
	justify-items: stretch;
`;

const New = styled.div`
	display: grid;
	justify-items: stretch;
`;

const Output = styled.div`
	display: grid;
	grid-column: span 2;
	justify-items: stretch;
	overflow: scroll;
`;

const Base64 = () => {
	const [oldIn, setOldIn] = React.useState<string>('');
	const [newIn, setNewIn] = React.useState<string>('');
	const [parsedOldIn, setParsedOldIn] = React.useState<string>('');
	const [parsedNewIn, setParsedNewIn] = React.useState<string>('');
	const [parseMode, setParseMode] = React.useState<ParseMode>('JSON');

	React.useEffect(() => {
		setParsedOldIn(parseLanguageString(oldIn, parseMode));
	}, [oldIn, parseMode]);

	React.useEffect(() => {
		setParsedNewIn(parseLanguageString(newIn, parseMode));
	}, [newIn, parseMode]);

	useSerialize(
		'/diff',
		{oldIn, newIn, parseMode},
		{oldIn: setOldIn, newIn: setNewIn, parseMode: setParseMode},
	);

	const highlightSyntax = (str: string) =>
		prismHighlightSyntax(
			str,
			parseModes.find(({key}) => key === parseMode)!.prismVal,
		);

	return (
		<Container>
			<Selection>
				<ParseModeButtons parseMode={parseMode} setParseMode={setParseMode} />
			</Selection>
			<Old>
				<Area
					onChange={evt => {
						setOldIn(evt.target.value);
					}}
					value={oldIn}
				/>
			</Old>
			<New>
				<Area
					onChange={evt => {
						setNewIn(evt.target.value);
					}}
					value={newIn}
				/>
			</New>
			<Output>
				<DiffViewerWrapper
					oldValue={parsedOldIn}
					newValue={parsedNewIn}
					renderContent={highlightSyntax}
				/>
			</Output>
		</Container>
	);
};

export default Base64;
