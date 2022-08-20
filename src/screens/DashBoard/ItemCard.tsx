import React from 'react';
import { FlexCol, FlexRow, Gutter, Typography } from 'components/atoms';
import { TouchableOpacity } from 'react-native';
import { TSpaceX } from 'typings/spaceX';
import styled from 'styled-components/native';
import { navigate } from 'services/NavigationService';
import FastImage from 'react-native-fast-image';
import { formatDate } from 'utils/date';

type Props = {
	item: TSpaceX;
};

const Wrapper = styled(TouchableOpacity)`
	position: relative;
	display: flex;
	margin: 5px;
	flex: 0.5;
`;

const LabelWrapper = styled(FlexCol)<{ isSuccess?: boolean }>`
	position: absolute;
	top: 0;
	right: 0;
	padding: 2px 10px;
	border-top-left-radius: 15px;
	border-bottom-left-radius: 15px;
	background-color: ${(props) =>
		props.isSuccess
			? props.theme.colors.lightGreen
			: props.theme.colors.lightRed};
`;

const Message = styled(Typography)<{ isSuccess?: boolean }>`
	font-weight: bold;
	color: ${(props) =>
		props.isSuccess ? props.theme.colors.green : props.theme.colors.red};
`;

const ImageWrapper = styled(FlexCol)<{ isSuccess?: boolean }>`
	padding: 10px;
	background: ${(props) => props.theme.colors.grey4};
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	overflow: hidden;
`;

const Image = styled(FastImage)`
	width: 100%;
	height: 160px;
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
			<ImageWrapper isSuccess={item.launch_success}>
				<Image
					source={{
						uri: item.links.mission_patch_small,
						priority: FastImage.priority.normal,
					}}
					resizeMode={FastImage.resizeMode.stretch}
				/>
				<LabelWrapper isSuccess={item.launch_success}>
					<Message fontSize={'xs'} isSuccess={item.launch_success}>
						{item.launch_success ? 'Success' : 'Failed'}
					</Message>
				</LabelWrapper>
			</ImageWrapper>
			<Gutter spacing={0.5} />
			<BoldText fontSize={'as'}>{item.mission_name}</BoldText>
			<BoldText fontSize={'as'}>{item.rocket.rocket_name}</BoldText>
			<FlexRow justifyContent={'space-between'}>
				<Typography fontSize={'xs'} fontColor={'grey2'}>
					{item.upcoming ? 'Upcoming' : 'Completed'}
				</Typography>
				<Typography fontSize={'xs'} fontColor={'grey2'}>
					{formatDate(item.launch_date_utc, 'll')}
				</Typography>
			</FlexRow>
		</Wrapper>
	);
};

export { ItemCard };
