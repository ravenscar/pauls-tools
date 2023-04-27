import React from 'react';
import styled from '@emotion/styled';
import {Area, Column, Row} from '../style-helpers';
import {DiffViewerWrapper} from './diff-viewer-wrapper';
import {ParseModeButtons} from './parse-mode-buttons';
import {ParseMode} from './util';

const Output = styled.div`
	overflow: scroll;
`;

type TProps = {
	parseMode: ParseMode;
	setParseMode: (value: ParseMode) => void;
	oldIn: string;
	newIn: string;
	parsedOldIn: string;
	parsedNewIn: string;
	setOldIn: (value: string) => void;
	setNewIn: (value: string) => void;
	highlightSyntax: (str: string) => JSX.Element;
};

export const PageDiffPresentational = (props: TProps) => (
	<Column>
		<Row>
			<ParseModeButtons
				parseMode={props.parseMode}
				setParseMode={props.setParseMode}
			/>
		</Row>
		<Row>
			<Area
				flex={1}
				min-height='200px'
				onChange={evt => {
					props.setOldIn(evt.target.value);
				}}
				value={props.oldIn}
			/>
			<Area
				flex={1}
				min-height='200px'
				onChange={evt => {
					props.setNewIn(evt.target.value);
				}}
				value={props.newIn}
			/>
		</Row>
		<Output>
			<DiffViewerWrapper
				oldValue={props.parsedOldIn}
				newValue={props.parsedNewIn}
				renderContent={props.highlightSyntax}
			/>
		</Output>
	</Column>
);
