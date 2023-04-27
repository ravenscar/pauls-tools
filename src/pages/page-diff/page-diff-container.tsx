import React from 'react';
import {useSerialize} from '../../storage/cache';
import {prismHighlightSyntax} from './prism-highlight-syntax';
import {parseLanguageString, type ParseMode, parseModes} from './util';
import {PageDiffPresentational} from './page-diff-presentational';

export const PageDiffContainer = () => {
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
		<PageDiffPresentational
			{...{
				highlightSyntax,
				newIn,
				oldIn,
				parsedNewIn,
				parsedOldIn,
				parseMode,
				setParseMode,
				setNewIn,
				setOldIn,
			}}
		/>
	);
};
