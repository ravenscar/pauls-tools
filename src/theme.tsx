export const lightTheme = {
	features: {
		isDark: false,
	},
	colors: {
		background: 'white',
		text: 'black',
		featureBackground: 'rgb(135, 185, 200)',
		featureBackground2: 'rgb(75, 125, 200)',
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
		text: 'rgb(200,200,200)',
		featureBackground: 'rgb(5, 55, 130)',
		featureBackground2: 'rgb(35, 85, 200)',
		featureBackgroundContrast: 'rgb(200,200,200)',
		featureBackgroundContrast2: 'rgb(200,200,200)',
		tableOddRowBackground: 'rgb(50,50,50)',
		tableBorder: 'rgb(100,100,100)',
		highlight: 'black',
		highlightBackground: 'yellow',
		error: 'red',
		link: 'lightblue',
	},
};

declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	export interface Theme extends TheTheme {}
}
