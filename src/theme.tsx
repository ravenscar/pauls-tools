export const lightTheme = {
	colors: {
		background: 'white',
		text: 'black',
		featureBackground: 'rgb(237, 115, 35)', // E.g. SB orange
		featureBackground2: 'rgb(200, 85, 35)', // E.g. a button BG if on SB orange
		featureBackgroundContrast: 'white', // E.g. text colour on the orange background
		featureBackgroundContrast2: 'white', // E.g. text colour on the other feature background
		tableOddRowBackground: 'lightgrey',
		tableBorder: 'grey',
		highlight: 'yellow',
		highlightBackground: 'black',
	},
};

type TheTheme = typeof lightTheme & typeof darkTheme;

export const darkTheme = {
	colors: {
		background: 'black',
		text: 'rgb(200,200,200)',
		featureBackground: 'rgb(130, 55, 05)',
		featureBackground2: 'rgb(200, 85, 35)',
		featureBackgroundContrast: 'rgb(200,200,200)',
		featureBackgroundContrast2: 'rgb(200,200,200)',
		tableOddRowBackground: 'rgb(50,50,50)',
		tableBorder: 'rgb(100,100,100)',
		highlight: 'black',
		highlightBackground: 'yellow',
	},
};

declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	export interface Theme extends TheTheme {}
}
