import React from 'react';
import { FlexCol, Gutter, Typography } from 'components/atoms';
import { TouchableOpacity } from 'react-native';
import { TSpaceX } from 'typings/spaceX';
import styled from 'styled-components/native';
import moment from 'moment';

type Props = {
	item: TSpaceX;
};

const Wrapper = styled(TouchableOpacity)`
	display: flex;
	margin: 5px;
	flex: 1;
`;

const ImageWrapper = styled(FlexCol)`
	padding: 10px;
	background: ${(props) => props.theme.colors.grey4};
`;

const Image = styled.Image`
	width: 100%;
	aspect-ratio: 1;
`;

const BoldText = styled(Typography)`
	font-weight: bold;
`;

const ItemCard: React.ComponentType<Props> = ({ item }) => {
	return (
		<Wrapper onPress={() => console.log(item.mission_name + item.crew)}>
			<ImageWrapper>
				<Image
					source={{
						uri: item.links.mission_patch_small,
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
