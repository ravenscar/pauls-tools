import React from 'react';

export const prismHighlightSyntax = (str: string, lang: string) => {
	const input = str ?? '';

	return (
		<pre
			style={{display: 'inline'}}
			dangerouslySetInnerHTML={{
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
				__html: (window as any).Prism.highlight(
					input,
					(window as any).Prism.languages[lang],
				),
			}}
		/>
	);
};

export const highlightJsonSyntax = (str: string) =>
	prismHighlightSyntax(str, 'json');
