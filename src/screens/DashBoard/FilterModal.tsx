import React, { useState } from 'react';
import styled, { DefaultTheme } from 'styled-components/native';
import { FlexCol, FlexRow, Gutter, Typography } from 'components/atoms';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { FilterItem } from './FilterItem';
import { SelectDate } from 'components/app';
import { filterObjInitialState, LAUNCH_STATUS_OPT, UPCOMING_OPT } from 'data';
import type { TSpaceX } from 'typings/spaceX';
import type { ModalProps } from 'react-native';
import { formatDate, toDate } from 'utils/date';

const Modal = styled.Modal`
	display: flex;
`;

const Wrapper = styled(FlexCol)`
	flex: 1;
	justify-content: flex-end;
	background-color: ${(props) => props.theme.colors.transparentBlack};
`;

const Card = styled(FlexCol)`
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	padding: 20px 14px 14px 14px;
	background-color: ${({ theme }) => theme.colors.primaryWhite};
`;

const Button = styled.TouchableOpacity<{
	backgroundColor?: keyof DefaultTheme['colors'];
}>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	padding: 12px 5px;
	background-color: ${(props) =>
		props.backgroundColor
			? props.theme.colors[props.backgroundColor]
			: props.theme.colors.transparentBlack};
	border-radius: 5px;
	margin: 5px;
`;

const BoldText = styled(Typography)`
	font-weight: bold;
`;

// Types and Props
type Props = ModalProps & {
	onDone: Function;
	onClose: Function;
	dataSource: TSpaceX[];
};

export type FilterObjProps = {
	rocketName: string[];
	launchStatusOpt: string[];
	upcomingStatus: string[];
	startDate?: Date;
	endDate?: Date;
};

const FilterModal: React.ComponentType<Props> = ({
	onDone,
	dataSource,
	onClose,
	...props
}) => {
	const [filterObj, setFilterObj] = useState<FilterObjProps>(
		filterObjInitialState,
	);
	const { startDate, endDate, rocketName, launchStatusOpt, upcomingStatus } =
		filterObj;
	const minimumDate = new Date(2000, 0, 0);

	// List of all rockets
	const rocketList = dataSource
		.map((item) => item.rocket.rocket_name)
		.filter((value, index, self) => self.indexOf(value) === index)
		.map((opt, index) =>
			Object.assign({}, { id: index, name: opt, value: opt }),
		);

	const onCapsulePress = (name: string, value: any) => {
		setFilterObj({ ...filterObj, [name]: value });
	};

	const onReset = () => {
		setFilterObj(filterObjInitialState);
		onDone(filterObjInitialState);
		onClose();
	};

	const onDoneClick = () => {
		onDone(filterObj);
		onClose();
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			onRequestClose={onClose}
			{...props}
		>
			<Wrapper>
				<Card>
					<FlexRow justifyContent={'space-between'}>
						<BoldText fontSize={'s'} fontColor={'black'}>
							Filters
						</BoldText>
						<TouchableOpacity onPress={() => onClose()}>
							<MaterialCommunityIcons
								name={'close-thick'}
								size={20}
							/>
						</TouchableOpacity>
					</FlexRow>
					<Gutter />
					<FilterItem
						name={'rocketName'}
						title={'Rocket Name'}
						option={rocketList}
						selected={rocketName}
						onSelect={onCapsulePress}
					/>
					<Gutter />
					<FilterItem
						name={'upcomingStatus'}
						title={'Up-Coming'}
						option={UPCOMING_OPT}
						selected={upcomingStatus}
						onSelect={onCapsulePress}
					/>
					<Gutter />
					<FilterItem
						name={'launchStatusOpt'}
						title={'Launch Status'}
						option={LAUNCH_STATUS_OPT}
						selected={launchStatusOpt}
						onSelect={onCapsulePress}
					/>
					<Gutter />
					<BoldText fontSize={'as'}>Date Range</BoldText>
					<Gutter spacing={0.5} />

					<FlexRow justifyContent={'space-between'}>
						<SelectDate
							name={'startDate'}
							text={
								startDate ? formatDate(startDate) : 'Start Date'
							}
							onSelect={onCapsulePress}
							minimumDate={minimumDate}
							maximumDate={toDate(endDate)}
						/>
						<SelectDate
							name={'endDate'}
							text={endDate ? formatDate(endDate) : 'End Date'}
							onSelect={onCapsulePress}
							minimumDate={
								startDate ? toDate(startDate) : minimumDate
							}
							maximumDate={toDate()}
						/>
					</FlexRow>

					<Gutter spacing={2} />

					<FlexRow justifyContent={'space-between'}>
						<Button onPress={onReset} backgroundColor={'grey3'}>
							<BoldText fontColor={'black'}>Reset</BoldText>
						</Button>
						<Button backgroundColor={'black'} onPress={onDoneClick}>
							<BoldText fontColor={'primaryWhite'}>Done</BoldText>
						</Button>
					</FlexRow>
				</Card>
			</Wrapper>
		</Modal>
	);
};

export { FilterModal };
