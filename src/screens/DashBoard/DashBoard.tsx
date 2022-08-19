import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import {
	fetchAllLaunches,
	resetLaunches,
	sortLaunches,
} from 'store/spaceX/actions';
import { Dispatch } from 'redux';
import { Loading } from 'components/app';
import type { RootState } from 'store/rootReducer';
import { FlexCol, FlexRow, Gutter } from 'components/atoms';
import styled from 'styled-components/native';
import { ItemCard, SortingModal } from 'screens/DashBoard';
import type { LaunchSortOrder } from 'screens/DashBoard';
import { TSpaceX } from 'typings/spaceX';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Wrapper = styled(FlexCol)`
	padding: 14px;
	flex: 1;
	background: ${(props) => props.theme.colors.gray};
`;

const IconWrapper = styled.View`
	padding: 0 10px;
`;

const LaunchDashboard = ({ navigation }: any) => {
	const dispatch: Dispatch<any> = useDispatch();
	const [sortOrder, setSortOrder] = useState<LaunchSortOrder>('Launch_Date');
	const [isSortVisible, setIsSortVisible] = useState<boolean>(false);
	const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
	const loading = useSelector((state: RootState) => state.main.loading);
	const launches = useSelector(
		(state: RootState) => state.main.filteredDataSource,
	);

	useEffect(() => {
		dispatch(fetchAllLaunches());

		return () => {
			dispatch(resetLaunches());
		};
	}, [dispatch]);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<FlexRow>
					<IconWrapper>
						<TouchableOpacity
							onPress={() => setIsSortVisible(true)}
						>
							<MaterialCommunityIcons name={'sort'} size={20} />
						</TouchableOpacity>
					</IconWrapper>
					<IconWrapper>
						<TouchableOpacity
							onPress={() => setIsFilterVisible(true)}
						>
							<MaterialCommunityIcons name={'filter'} size={20} />
						</TouchableOpacity>
					</IconWrapper>
				</FlexRow>
			),
		});
	}, [navigation]);

	const onSortSelect = (item: LaunchSortOrder) => {
		setSortOrder(item);
		dispatch(sortLaunches(item));
		setIsSortVisible(false);
	};

	const LaunchCard = useCallback(({ item }: { item: TSpaceX }) => {
		return <ItemCard item={item} />;
	}, []);

	return (
		<Wrapper>
			<Loading isLoading={loading} />
			<SortingModal
				selected={sortOrder}
				onSelect={onSortSelect}
				sortOrder={sortOrder}
				visible={isSortVisible}
				onClose={() => setIsSortVisible(false)}
			/>
			<FlatList
				data={launches}
				initialNumToRender={20}
				numColumns={2}
				columnWrapperStyle={style.row}
				keyExtractor={(item) => item.mission_name}
				renderItem={({ item }) => (
					<LaunchCard key={item.mission_name} item={item} />
				)}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => <Gutter spacing={0.7} />}
				ListFooterComponent={() =>
					launches.length ? <Gutter spacing={4} /> : null
				}
			/>
		</Wrapper>
	);
};

const style = StyleSheet.create({
	row: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
});

export { LaunchDashboard };
