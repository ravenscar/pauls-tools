import styled from '@emotion/styled';
import React from 'react';
import {useSerialize} from '../../storage/cache';
import {Area, Column, Row} from '../style-helpers';
import {DiffViewerWrapper} from './diff-viewer-wrapper';
import {ParseModeButtons} from './parse-mode-buttons';
import {prismHighlightSyntax} from './prism-highlight-syntax';
import {parseLanguageString, type ParseMode, parseModes} from './util';

const Output = styled.div`
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
		<Column>
			<Row>
				<ParseModeButtons parseMode={parseMode} setParseMode={setParseMode} />
			</Row>
			<Row>
				<Area
					flex={1}
					min-height='200px'
					onChange={evt => {
						setOldIn(evt.target.value);
					}}
					value={oldIn}
				/>
				<Area
					flex={1}
					min-height='200px'
					onChange={evt => {
						setNewIn(evt.target.value);
					}}
					value={newIn}
				/>
			</Row>
			<Output>
				<DiffViewerWrapper
					oldValue={parsedOldIn}
					newValue={parsedNewIn}
					renderContent={highlightSyntax}
				/>
			</Output>
		</Column>
	);
};

export default Base64;
