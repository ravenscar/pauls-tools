import {css} from '@emotion/react';
import {type Theme} from '@emotion/react';

export const getGlobalStyles = (theme: Theme) => css`
	:root {
		--yellow: #ffc600;
		--black: #000000;
		--gray: rgb(200, 200, 200);
		--darkgray: rgb(50, 50, 50);
		--midgray: rgb(100, 100, 100);

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
		overflow: hidden;
		background-color: ${theme.colors.background};
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

	body {
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
			monospace;
	}

	a {
		color: ${theme.colors.link};
	}

	textarea {
		background-color: ${theme.colors.background};
		color: ${theme.colors.text};
		border-color: ${theme.colors.tableBorder};
	}
`;

export const lightTheme = {
	features: {
		isDark: false,
	},
	colors: {
		background: 'white',
		text: 'var(--black)',
		featureBackground: 'var(--lightblue)',
		featureBackground2: 'var(--midlightblue)',
		featureBackgroundContrast: 'white',
		featureBackgroundContrast2: 'white',
		tableOddRowBackground: 'lightgrey',
		tableBorder: 'grey',
		highlight: 'yellow',
		highlightBackground: 'black',
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
		background: 'black',
		text: 'var(--gray);',
		featureBackground: 'var(--darkblue)',
		featureBackground2: 'var(--middarkblue)',
		featureBackgroundContrast: 'var(--gray)',
		featureBackgroundContrast2: 'var(--gray)',
		tableOddRowBackground: 'var(--darkgray)',
		tableBorder: 'var(--midgray)',
		highlight: 'black',
		highlightBackground: 'yellow',
		error: 'red',
		link: 'lightblue',
	},
};

declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/no-empty-interface
	export interface Theme extends TheTheme {}
}
