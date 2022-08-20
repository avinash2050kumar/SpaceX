import React, { useCallback } from 'react';
import {
	Capsule,
	FlexCol,
	FlexRow,
	Gutter,
	Typography,
} from 'components/atoms';
import styled from 'styled-components/native';
import { addOrRemoveArr } from 'utils/array';

const Title = styled(Typography)`
	font-weight: bold;
`;

export type TFilterItem = {
	id: number;
	name: string;
	value: string;
};

type Props = {
	title: string;
	option: TFilterItem[];
	selected: string[];
	onSelect: Function;
};

const FilterItem: React.ComponentType<Props> = ({
	title,
	option,
	selected,
	onSelect,
}) => {
	const RenderCapsule = useCallback(
		({ item, isSelected }: { item: TFilterItem; isSelected: boolean }) => {
			return (
				<Capsule
					isSelected={isSelected}
					text={item.name}
					onSelect={() =>
						onSelect(addOrRemoveArr(selected, item.value))
					}
				/>
			);
		},
		[onSelect, selected],
	);

	return (
		<FlexCol>
			<Title fontSize={'as'}>{title}</Title>
			<Gutter spacing={0.5} />
			<FlexRow flexWrap={'wrap'}>
				{option.map((opt) => (
					<RenderCapsule
						key={opt.id}
						item={opt}
						isSelected={selected.indexOf(opt.value) !== -1}
					/>
				))}
			</FlexRow>
		</FlexCol>
	);
};

export { FilterItem };
