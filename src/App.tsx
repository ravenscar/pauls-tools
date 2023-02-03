import React, {useEffect, useState} from 'react';
import {ThemeProvider, Global} from '@emotion/react';

import {PageLayout} from './components/page-layout';

import {getGlobalStyles, darkTheme, lightTheme} from './theme';
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

	return (
		<>
			<Global styles={getGlobalStyles(theme)} />
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
