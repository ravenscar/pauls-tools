import React from 'react';
import {useTheme} from '@emotion/react';
import DiffViewer, {
	DiffMethod,
	type ReactDiffViewerProps,
} from 'react-diff-viewer-continued';

const defaultProps: Partial<ReactDiffViewerProps> = {
	extraLinesSurroundingDiff: Infinity,
	showDiffOnly: false,
	styles: {},
	compareMethod: DiffMethod.WORDS,
	useDarkTheme: true,
};

export const DiffViewerWrapper = (props: ReactDiffViewerProps) => {
	const theme = useTheme();
	return (
		<DiffViewer
			{...{...defaultProps, ...props, useDarkTheme: theme.features.isDark}}
		/>
	);
};
