import React from 'react';
import styled from 'styled-components/native';
import { FlexCol } from 'components/atoms';
import Lottie from 'lottie-react-native';

const Wrapper = styled(FlexCol)`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 16px;
`;

const NoDataFound = () => {
	return (
		<Wrapper>
			<Lottie
				source={require('/assets/json/no_data_found.json')}
				autoPlay
				loop
			/>
		</Wrapper>
	);
};

export { NoDataFound };
