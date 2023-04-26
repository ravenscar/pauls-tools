import {css} from '@emotion/react';
import {type Theme} from '@emotion/react';

export const getGlobalStyles = (theme: Theme) => css`
	:root {
		--yellow: #ffc600;
		--black: #000000;
		--vdarkgray: rgb(31, 31, 31);
		--darkgray: rgb(63, 63, 63);
		--midgray: rgb(127, 127, 127);
		--lightgray: rgb(191, 191, 191);
		--vlightgray: rgb(223, 223, 223);
		--white: #ffffff;

		--lightblue: rgb(135, 185, 200);
		--midlightblue: rgb(75, 125, 200);
		--middarkblue: rgb(35, 85, 200);
		--darkblue: rgb(5, 55, 130);

		--stickyNoteBackground: rgb(255, 245, 188);
		--stickyNotePen: var(--darkgray);
	}

	html {
		/* border-box: add border and padding without increasing box-size */
		box-sizing: border-box;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
			'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
			'Helvetica Neue', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: ${theme.colors.text};
	}

	/* inherit box-sizing from .html */
	*,
	*:before,
	*:after {
		box-sizing: inherit;
		margin: 0;
		padding: 0;
	}

	body {
		min-height: 100vh;
		background-color: ${theme.colors.background};
	}

	#root {
		overflow: auto;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 0 0 5px 0;
	}

	p {
		font-size: 15px;
		margin: 5px;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
			monospace;
	}

	a {
		color: ${theme.colors.link};
	}

	textarea {
		background-color: ${theme.colors.background2};
		color: ${theme.colors.text};
		tab-size: 2;
		border: 1px solid ${theme.colors.tableBorder};
		padding: 5px;
	}

	input {
		background-color: ${theme.colors.background2};
		color: ${theme.colors.text};
		border: 1px solid ${theme.colors.tableBorder};
		padding: 5px;
	}
`;

export const lightTheme = {
	features: {
		isDark: false,
	},
	colors: {
		background: 'var(--vlightgray)',
		background2: 'var(--white)',
		text: 'var(--black)',
		text2: 'var(--darkgray)',
		tableOddRowBackground: 'var(--lightgray)',
		tableBorder: 'var(--midgray)',
		highlight: 'yellow',
		highlightBackground: 'var(--black)',
		error: 'red',
		link: 'blue',
	},
};

type TheTheme = typeof lightTheme & typeof darkTheme;

export const darkTheme = {
	features: {
		isDark: true,
	},
	colors: {
		background: 'var(--vdarkgray)',
		background2: 'var(--black)',
		text: 'var(--white)',
		text2: 'var(--lightgray)',
		tableOddRowBackground: 'var(--darkgray)',
		tableBorder: 'var(--midgray)',
		highlight: 'var(--black)',
		highlightBackground: 'yellow',
		error: 'red',
		link: 'lightblue',
	},
};

declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/no-empty-interface
	export interface Theme extends TheTheme {}
}
