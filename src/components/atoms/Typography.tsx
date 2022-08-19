import React from 'react';
import { TextStyle } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
type EllipsizeMode = 'head' | 'middle' | 'tail' | 'clip';
type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';
export interface ITypography {
	children: any;
	fontSize?: keyof DefaultTheme['fontSize'];
	fontColor?: keyof DefaultTheme['colors'];
	ellipsizeMode?: EllipsizeMode;
	numberOfLines?: number;
	textAlign?: TextAlign;
	letterSpacing?: number;
	textDecorationLine?:
		| 'none'
		| 'underline'
		| 'line-through'
		| 'underline line-through';
	style?: TextStyle | TextStyle[];
	textTransform?: TextTransform;
}

const Text = styled.Text<
	Pick<
		ITypography,
		| 'fontSize'
		| 'fontColor'
		| 'textDecorationLine'
		| 'letterSpacing'
		| 'textAlign'
		| 'textTransform'
	>
>`
	color: ${(props) =>
		props.fontColor
			? props.theme.colors[props.fontColor]
			: props.theme.colors.text};
	font-size: ${(props) =>
		props.fontSize
			? `${props.theme.fontSize[props.fontSize]}px`
			: `${props.theme.fontSize.s}px`};
	text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')};
	text-decoration-line: ${(props) =>
		props.textDecorationLine ? props.textDecorationLine : 'none'};
	text-transform: ${(props) =>
		props.textTransform ? props.textTransform : 'none'};
`;

export const Typography = ({
	textTransform,
	ellipsizeMode,
	numberOfLines,
	textAlign,
	fontSize,
	fontColor,
	textDecorationLine,
	letterSpacing,
	children,
	...rest
}: ITypography) => {
	return (
		<Text
			textTransform={textTransform}
			fontSize={fontSize}
			fontColor={fontColor}
			numberOfLines={numberOfLines}
			ellipsizeMode={ellipsizeMode}
			textAlign={textAlign}
			textDecorationLine={textDecorationLine}
			letterSpacing={letterSpacing}
			{...rest}
		>
			{children}
		</Text>
	);
};
