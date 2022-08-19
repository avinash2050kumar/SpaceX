import React, { useCallback } from 'react';
import type { ModalProps } from 'react-native';
import styled from 'styled-components/native';
import { FlexCol, FlexRow, Gutter, Typography } from 'components/atoms';
import { TouchableOpacity } from 'react-native';
import { LAUNCH_SORT_ORDER } from 'data';
import type { TLAUNCH_SORT_ORDER } from 'data';
import { useColor } from 'hooks/useColor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

const BoldText = styled(Typography)`
	font-weight: bold;
`;

const ItemWrapper = styled(TouchableOpacity)`
	padding: 10px;
`;

const Text = styled(Typography)<{ isSelected?: boolean }>`
	font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};
	color: ${(props) =>
		props.isSelected
			? props.theme.colors.black
			: props.theme.colors.primaryGrey};
`;

// Types and Props
export type LaunchSortOrder = 'Launch_Date' | 'Mission_Name';
type Props = ModalProps & {
	selected: LaunchSortOrder;
	sortOrder: LaunchSortOrder;
	onSelect: Function;
	onClose: Function;
};

const SortingModal: React.ComponentType<Props> = ({
	onSelect,
	onClose,
	selected,
	...props
}) => {
	const green = useColor('green');

	const Option = useCallback(
		({ item }: { item: TLAUNCH_SORT_ORDER }) => {
			const isSelected = item.value === selected;
			return (
				<ItemWrapper
					key={item.id}
					onPress={() => {
						onSelect(item.value);
					}}
				>
					<FlexRow justifyContent={'space-between'}>
						<Text isSelected={isSelected}>{item.name}</Text>
						{isSelected && (
							<MaterialCommunityIcons
								name={'check'}
								size={20}
								color={green}
							/>
						)}
					</FlexRow>
				</ItemWrapper>
			);
		},
		[green, selected, onSelect],
	);

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
						<BoldText>Sort Launches By</BoldText>
						<TouchableOpacity onPress={() => onClose()}>
							<MaterialCommunityIcons
								name={'close-thick'}
								size={20}
							/>
						</TouchableOpacity>
					</FlexRow>
					<Gutter />
					{LAUNCH_SORT_ORDER.map((item) => (
						<Option key={item.id} item={item} />
					))}
				</Card>
			</Wrapper>
		</Modal>
	);
};

export { SortingModal };
