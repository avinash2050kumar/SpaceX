import React from 'react';
import { ScrollView } from 'react-native';
import { FlexCol, Gutter, Typography } from 'components/atoms';
import styled from 'styled-components/native';
import { RootStackParamList } from 'navigation/Root';
import type { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import FastImage from 'react-native-fast-image';
import { TSpaceX } from 'typings/spaceX';
import moment from 'moment';

const Wrapper = styled(FlexCol)`
	flex: 1;
	padding: 16px;
	background-color: ${(props) => props.theme.colors.primaryWhite};
`;

const Image = styled(FastImage)`
	width: 60%;
	align-self: center;
	aspect-ratio: 1;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
`;

const BoldText = styled(Typography)`
	font-weight: bold;
`;

const Label = styled(BoldText)`
	color: ${(props) => props.theme.colors.text};
	font-size: ${(props) => props.theme.fontSize.as};
`;

// Types
type Props = {
	route: RouteProp<RootStackParamList, 'LaunchDetails'>;
};

const LaunchDetails: React.ComponentType<Props> = ({ route }) => {
	const {
		params: { flight_number },
	} = route;

	const launches = useSelector(
		(state: RootState) => state.main.filteredDataSource,
	);

	const launchIndex = launches.findIndex(
		(launch) => launch.flight_number === flight_number,
	);
	const {
		launch_success,
		upcoming,
		launch_site,
		launch_date_utc,
		mission_name,
		links,
		rocket: { rocket_name, rocket_type },
		details,
	}: TSpaceX = launches[launchIndex];

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<Wrapper>
				<Gutter />
				<Image
					source={{
						uri: links.mission_patch_small,
						priority: FastImage.priority.normal,
					}}
				/>
				<Gutter spacing={3} />

				<BoldText fontSize={'m'} fontColor={'black'}>
					{mission_name}
				</BoldText>
				<BoldText fontSize={'as'}>
					{moment(launch_date_utc).format('LL')}
				</BoldText>

				<Gutter spacing={2} />

				<FlexCol>
					<BoldText fontSize={'s'} fontColor={'black'}>
						Launch Site
					</BoldText>
					<Gutter spacing={0.2} />
					<Typography fontSize={'as'}>
						<Label>Name</Label> - {launch_site.site_name}
					</Typography>
					<Typography fontSize={'as'}>
						<Label>Location</Label> - {launch_site.site_name_long}
					</Typography>
				</FlexCol>

				<Gutter />

				<FlexCol>
					<BoldText fontSize={'s'} fontColor={'black'}>
						Launch Status
					</BoldText>
					<Gutter spacing={0.2} />
					<Typography fontSize={'as'}>
						<Label>Success</Label> - {launch_success.toString()}
					</Typography>
					<Typography fontSize={'as'}>
						<Label>Upcoming</Label> - {upcoming.toString()}
					</Typography>
				</FlexCol>

				<Gutter />

				<FlexCol>
					<BoldText fontSize={'s'} fontColor={'black'}>
						Rocket
					</BoldText>
					<Gutter spacing={0.2} />
					<Typography fontSize={'as'}>
						<Label>Name</Label> - {rocket_name}
					</Typography>
					<Typography fontSize={'as'}>
						<Label>Type</Label> - {rocket_type}
					</Typography>
				</FlexCol>

				<Gutter />

				<FlexCol>
					<BoldText fontSize={'s'} fontColor={'black'}>
						Details
					</BoldText>
					<Gutter spacing={0.2} />
					<Typography fontSize={'as'}>{details}</Typography>
				</FlexCol>
				<Gutter spacing={2} />
			</Wrapper>
		</ScrollView>
	);
};

export { LaunchDetails };
