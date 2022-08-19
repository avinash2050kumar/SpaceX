import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { FlexCol } from 'components/atoms/Flex';
import styled, { DefaultTheme } from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { Gutter, Typography } from 'components/atoms';

type Props = {
	isLoading: boolean;
	message?: string;
	loadingColor?: keyof DefaultTheme['colors'];
};

const Wrapper = styled(FlexCol)`
	flex: 1;
	justify-content: center;
	align-items: center;
	background: transparent;
	z-index: 400;
`;

const Message = styled(Typography)`
	font-weight: bold;
`;

const Card = styled(FlexCol)`
	padding: 30px 40px;
	background: ${(props) => props.theme.colors.primaryWhite};
	border-radius: 10px;
`;

const Loading: React.ComponentType<Props> = ({
	isLoading,
	loadingColor,
	message,
}) => {
	return (
		<Spinner visible={isLoading}>
			<Wrapper>
				<Card>
					<ActivityIndicator size="large" color={loadingColor} />
					<Gutter spacing={1} />
					<Message>{message ? message : 'Please Wait...'}</Message>
				</Card>
			</Wrapper>
		</Spinner>
	);
};

export { Loading };
