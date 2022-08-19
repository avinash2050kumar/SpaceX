import React from 'react';
import styled from 'styled-components/native';
import type { TFilterItem } from 'screens/DashBoard';
import { Typography } from 'components/atoms';

const Wrapper = styled.TouchableOpacity<{ isSelected: boolean }>`
	margin: 4px 7px;
	padding: 7px 15px;
	border-radius: 30px;
	border-width: 1px;
	border-color: ${(props) =>
		props.isSelected ? props.theme.colors.black : props.theme.colors.grey3};
`;

const Text = styled(Typography)<{ isSelected: boolean }>`
	color: ${(props) =>
		props.isSelected ? props.theme.colors.black : props.theme.colors.text};
`;

type Props = {
	isSelected: boolean;
	item: TFilterItem;
	onSelect: Function;
};

const Capsule: React.ComponentType<Props> = ({
	isSelected,
	item,
	onSelect,
}) => {
	return (
		<Wrapper onPress={onSelect} isSelected={isSelected}>
			<Text isSelected={isSelected}>{item.name}</Text>
		</Wrapper>
	);
};

export { Capsule };
