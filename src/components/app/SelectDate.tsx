import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import type { ReactNativeModalDateTimePickerProps } from 'react-native-modal-datetime-picker';
import styled from 'styled-components/native';
import { FlexCol, Typography } from 'components/atoms';
import moment from 'moment';

const Wrapper = styled(FlexCol)`
	flex: 1;
	justify-content: center;
	align-items: center;
	margin: 5px;
`;

const TextWrapper = styled.TouchableOpacity`
	width: 100%;
	padding: 10px 20px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	border-width: 1px;
	border-color: ${(props) => props.theme.colors.grey3};
`;

type Props = {
	name: string;
	text: string;
	onSelect(name: string, value: any): void;
} & Pick<ReactNativeModalDateTimePickerProps, 'minimumDate' | 'maximumDate'>;

const SelectDate: React.ComponentType<Props> = ({
	text,
	onSelect,
	name,
	...props
}) => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date: Date) => {
		onSelect(name, moment(date).format());
		hideDatePicker();
	};

	return (
		<Wrapper>
			<TextWrapper onPress={() => setDatePickerVisibility(true)}>
				<Typography>{text}</Typography>
			</TextWrapper>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
				{...props}
			/>
		</Wrapper>
	);
};

export { SelectDate };
