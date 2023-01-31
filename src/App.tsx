import React, {useEffect, useState} from 'react';
import {ThemeProvider, Global, css} from '@emotion/react';

import {PageLayout} from './components/page-layout';

import {darkTheme, lightTheme} from './theme';
import {RouterRoutes} from './routes';

function App() {
	const [darkmode, setDarkmode] = useState(
		window.matchMedia('(prefers-color-scheme: dark)').matches,
	);
	const [theme, setTheme] = useState(lightTheme);

	useEffect(() => {
		if (darkmode) {
			setTheme(darkTheme);
		} else {
			setTheme(lightTheme);
		}
	}, [darkmode]);

	const globalStyles = css`
		body {
			margin: 0;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
				'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
				'Helvetica Neue', sans-serif;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			background-color: ${theme.colors.background};
			color: ${theme.colors.text};
		}

		code {
			font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
				monospace;
		}

		td:first-of-type {
			font-weight: bold;
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

	return (
		<>
			<Global styles={globalStyles} />
			<ThemeProvider theme={theme}>
				<PageLayout
					toggleDarkmode={() => {
						setDarkmode(!darkmode);
					}}
				>
					<RouterRoutes />
				</PageLayout>
			</ThemeProvider>
		</>
	);
}

export default App;
