import { DefaultTheme } from 'styled-components/native';

// common colors
const Pallet = {
	primaryGrey: '#6D7177',
	primaryWhite: '#FFFFFF',
	grey: '#fafafa',
	grey2: '#AAAAAA',
	grey3: '#E6EAEC',
	grey4: '#F0F4F6',
	red: '#c43232',
	lightRed: '#ffe8e7',
	blue: '#87CEEB',
	black: '#000',
	green: '#66a366',
	lightGreen: '#dbf0da',
	transparentBlack: '#00000077',
};

const FontSize = {
	xs: 12,
	as: 14,
	bs: 15,
	s: 16,
	ssm: 17,
	sm: 18,
	m: 20,
	l: 24,
	xl: 26,
	xxl: 28,
};

const Colors = {
	text: Pallet.primaryGrey,
	...Pallet,
};

declare module 'styled-components/native' {
	interface DefaultTheme {
		colors: typeof Colors;
		fontSize: typeof FontSize;
	}
}

export const Theme: DefaultTheme = {
	colors: Colors,
	fontSize: FontSize,
};

export default Theme;
