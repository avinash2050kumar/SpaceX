import React from 'react';
import { FlexCol, Gutter, Typography } from 'components/atoms';
import { TouchableOpacity } from 'react-native';
import { TSpaceX } from 'typings/spaceX';
import styled from 'styled-components/native';
import moment from 'moment';
import { navigate } from 'services/NavigationService';
import FastImage from 'react-native-fast-image';

type Props = {
	item: TSpaceX;
};

const Wrapper = styled(TouchableOpacity)`
	display: flex;
	margin: 5px;
	flex: 0.5;
`;

const ImageWrapper = styled(FlexCol)`
	padding: 10px;
	background: ${(props) => props.theme.colors.grey4};
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	overflow: hidden;
`;

const Image = styled(FastImage)`
	width: 100%;
	aspect-ratio: 1;
`;

const BoldText = styled(Typography)`
	font-weight: bold;
`;

const ItemCard: React.ComponentType<Props> = ({ item }) => {
	return (
		<Wrapper
			onPress={() =>
				navigate('LaunchDetails', { flight_number: item.flight_number })
			}
		>
			<ImageWrapper>
				<Image
					source={{
						uri: item.links.mission_patch_small,
						priority: FastImage.priority.normal,
					}}
				/>
			</ImageWrapper>
			<Gutter spacing={0.5} />
			<BoldText fontSize={'as'}>{item.mission_name}</BoldText>
			<BoldText fontSize={'as'}>{item.rocket.rocket_name}</BoldText>
			<Typography fontSize={'xs'} fontColor={'grey2'}>
				{moment(item.launch_date_utc).format('LL')}
			</Typography>
		</Wrapper>
	);
};

export { ItemCard };
