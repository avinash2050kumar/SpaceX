import { useContext } from 'react';
import { DefaultTheme, ThemeContext } from 'styled-components/native';
import { LiteralUnion } from 'typings/utils';

export type Color = LiteralUnion<keyof DefaultTheme['colors'], string>;

export const useColor = (color: Color) => {
	const theme = useContext(ThemeContext);

	// @ts-ignore
	return theme.colors[color] || color;
};
