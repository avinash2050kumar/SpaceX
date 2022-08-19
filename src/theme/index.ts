import { DefaultTheme } from 'styled-components/native';

// common colors
const Pallet = {
	primaryGrey: '#6D7177',
	primaryWhite: '#FFFFFF',
	grey2: '#AAAAAA',
	grey3: '#E6EAEC',
	grey4: '#F5F7F8',
	error: '#c43232',
	black: '#000',
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
