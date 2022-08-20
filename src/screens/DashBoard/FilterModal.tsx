import React, { useState } from 'react';
import moment from 'moment';
import styled, { DefaultTheme } from 'styled-components/native';
import { FlexCol, FlexRow, Gutter, Typography } from 'components/atoms';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { FilterItem } from './FilterItem';
import { SelectDate } from 'components/app';
import { filterObjInitialState, LAUNCH_STATUS_OPT, UPCOMING_OPT } from 'data';
import type { TSpaceX } from 'typings/spaceX';
import type { ModalProps } from 'react-native';

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

export type TFilterObj = {
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
	const [filterObj, setFilterObj] = useState<TFilterObj>(
		filterObjInitialState,
	);

	const rocketName = dataSource
		.map((item) => item.rocket.rocket_name)
		.filter((value, index, self) => self.indexOf(value) === index)
		.map((opt, index) =>
			Object.assign({}, { id: index, name: opt, value: opt }),
		);

	const onSelect = (name: string, value: any) => {
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
						title={'Rocket Name'}
						option={rocketName}
						selected={filterObj.rocketName}
						onSelect={(value: string[]) => {
							onSelect('rocketName', value);
						}}
					/>
					<Gutter />
					<FilterItem
						title={'Up-Coming'}
						option={UPCOMING_OPT}
						selected={filterObj.upcomingStatus}
						onSelect={(value: string[]) => {
							onSelect('upcomingStatus', value);
						}}
					/>
					<Gutter />
					<FilterItem
						title={'Launch Status'}
						option={LAUNCH_STATUS_OPT}
						selected={filterObj.launchStatusOpt}
						onSelect={(value: string[]) => {
							onSelect('launchStatusOpt', value);
						}}
					/>
					<Gutter />
					<BoldText fontSize={'as'}>Date Range</BoldText>
					<Gutter spacing={0.5} />
					<FlexRow justifyContent={'space-between'}>
						<SelectDate
							text={
								filterObj.startDate
									? moment(filterObj.startDate).format('LL')
									: 'Start Date'
							}
							onSelect={(date: Date) =>
								onSelect('startDate', date)
							}
							minimumDate={new Date(2000, 0, 0)}
							maximumDate={moment(filterObj.endDate).toDate()}
						/>
						<SelectDate
							text={
								filterObj.endDate
									? moment(filterObj.endDate).format('LL')
									: 'End Date'
							}
							onSelect={(date: Date) => onSelect('endDate', date)}
							minimumDate={
								filterObj.startDate
									? moment(filterObj.startDate).toDate()
									: new Date(2000, 0, 0)
							}
							maximumDate={moment().toDate()}
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
