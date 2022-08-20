import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FlexCol, FlexRow, Gutter, Typography } from 'components/atoms';
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

const Card = styled(FlexCol)`
	padding: 14px;
	border-radius: 10px;
	border-width: 1px;
	border-color: ${(props) => props.theme.colors.grey3};
`;

const Col = styled(FlexCol)`
	flex: 1;
	padding: 0 0 0 10px;
`;

const Label = styled(Typography)`
	color: ${(props) => props.theme.colors.black};
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
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={style.scrollView}
		>
			<Wrapper>
				{links.mission_patch_small && (
					<>
						<Gutter />
						<Image
							source={{
								uri: links.mission_patch_small,
								priority: FastImage.priority.normal,
							}}
							resizeMode={FastImage.resizeMode.stretch}
						/>
					</>
				)}
				<Gutter spacing={3} />

				<FlexCol justifyContent={'center'} alignItems={'center'}>
					<BoldText fontSize={'m'} fontColor={'black'}>
						{mission_name}
					</BoldText>
					<BoldText fontSize={'as'}>
						{moment(launch_date_utc).format('LL')}
					</BoldText>
				</FlexCol>

				<Gutter spacing={2} />

				<Card>
					<BoldText fontSize={'s'} fontColor={'black'}>
						Launch Site
					</BoldText>
					<Gutter spacing={0.5} />
					<FlexRow justifyContent={'space-between'}>
						<FlexCol>
							<Label>Name </Label>
							<Label>Location </Label>
						</FlexCol>
						<Col>
							<Typography fontSize={'as'} style={style.flex1}>
								{launch_site.site_name}
							</Typography>
							<Typography fontSize={'as'} style={style.flex1}>
								{launch_site.site_name_long}
							</Typography>
						</Col>
					</FlexRow>
				</Card>

				<Gutter />

				<Card>
					<BoldText fontSize={'s'} fontColor={'black'}>
						Launch Status
					</BoldText>
					<Gutter spacing={0.5} />
					<FlexRow justifyContent={'space-between'}>
						<FlexCol>
							<Label>Success </Label>
							<Label>Upcoming </Label>
						</FlexCol>
						<Col>
							<Typography fontSize={'as'} style={style.flex1}>
								{launch_success ? 'true' : 'false'}
							</Typography>
							<Typography fontSize={'as'} style={style.flex1}>
								{upcoming ? 'true' : 'false'}
							</Typography>
						</Col>
					</FlexRow>
				</Card>

				<Gutter />

				<Card>
					<BoldText fontSize={'s'} fontColor={'black'}>
						Rocket
					</BoldText>
					<Gutter spacing={0.5} />
					<FlexRow justifyContent={'space-between'}>
						<FlexCol>
							<Label>Name </Label>
							<Label>Type </Label>
						</FlexCol>
						<Col>
							<Typography fontSize={'as'} style={style.flex1}>
								{rocket_name}
							</Typography>
							<Typography fontSize={'as'} style={style.flex1}>
								{rocket_type}
							</Typography>
						</Col>
					</FlexRow>
				</Card>

				<Gutter />

				<Card>
					<BoldText fontSize={'s'} fontColor={'black'}>
						Details
					</BoldText>
					<Gutter spacing={0.5} />
					<Typography fontSize={'as'}>{details}</Typography>
				</Card>
				<Gutter spacing={2} />
			</Wrapper>
		</ScrollView>
	);
};

const style = StyleSheet.create({
	scrollView: { flexGrow: 1 },
	flex1: { flex: 1 },
});

export { LaunchDetails };
