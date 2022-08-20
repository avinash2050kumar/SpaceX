import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import {
	fetchAllLaunches,
	filterSpaceXLaunches,
	resetLaunches,
	sortLaunches,
} from 'store/spaceX/actions';
import { Loading } from 'components/app';
import type { RootState } from 'store/rootReducer';
import { FlexCol, FlexRow, Gutter } from 'components/atoms';
import styled from 'styled-components/native';
import {
	FilterModal,
	ItemCard,
	NoDataFound,
	SortModal,
} from 'screens/DashBoard';
import type { FilterObjProps } from 'screens/DashBoard';
import type { LaunchSortOrder } from 'screens/DashBoard';
import { TSpaceX } from 'typings/spaceX';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigation/Root';

const Wrapper = styled(FlexCol)`
	padding: 14px;
	height: 100%;
	flex: 1;
	background: ${(props) => props.theme.colors.grey};
`;

const IconWrapper = styled.View`
	position: relative;
`;

const Circle = styled.View`
	width: 5px;
	height: 5px;
	position: absolute;
	border-radius: 3px;
	bottom: 3px;
	right: 11px;
	background-color: ${(props) => props.theme.colors.red};
`;

//Types
type Props = {
	navigation: StackNavigationProp<RootStackParamList, 'Dashboard'>;
};

const LaunchDashboard: React.ComponentType<Props> = ({ navigation }) => {
	const dispatch: Dispatch<any> = useDispatch();
	const [sortOrder, setSortOrder] = useState<LaunchSortOrder>('Launch_Date');
	const [isFilterSelected, setIsFilterSelected] = useState<boolean>(false);
	const [isSortVisible, setIsSortVisible] = useState<boolean>(false);
	const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

	const loading = useSelector((state: RootState) => state.main.loading);
	const launches = useSelector(
		(state: RootState) => state.main.filteredDataSource,
	);
	const dataSource = useSelector(
		(state: RootState) => state.main.spaceXDataSource,
	);

	// Navbar Icons
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<FlexRow>
					<IconWrapper>
						<TouchableOpacity
							style={style.navBarButton}
							onPress={() => setIsSortVisible(true)}
						>
							<MaterialCommunityIcons name={'sort'} size={20} />
						</TouchableOpacity>
					</IconWrapper>
					<IconWrapper>
						<TouchableOpacity
							style={style.navBarButton}
							onPress={() => setIsFilterVisible(true)}
						>
							{isFilterSelected && <Circle />}
							<MaterialCommunityIcons name={'filter'} size={20} />
						</TouchableOpacity>
					</IconWrapper>
				</FlexRow>
			),
		});
	}, [navigation, isFilterSelected]);

	const onSelectSortItem = (item: LaunchSortOrder) => {
		setSortOrder(item);
		dispatch(sortLaunches(item));
		setIsSortVisible(false);
	};

	const LaunchCard = useCallback(({ item }: { item: TSpaceX }) => {
		return <ItemCard item={item} />;
	}, []);

	const onSelectFilter = (obj: FilterObjProps) => {
		dispatch(filterSpaceXLaunches(obj));
		dispatch(sortLaunches(sortOrder));
		setIsFilterSelected(Object.keys(obj).length !== 0);
	};

	useEffect(() => {
		dispatch(fetchAllLaunches());

		return () => {
			dispatch(resetLaunches());
		};
	}, [dispatch]);

	return (
		<Wrapper>
			<Loading isLoading={loading} />
			{launches.length === 0 && !loading && <NoDataFound />}
			<SortModal
				selected={sortOrder}
				onSelect={onSelectSortItem}
				sortOrder={sortOrder}
				visible={isSortVisible}
				onClose={() => setIsSortVisible(false)}
			/>
			<FilterModal
				visible={isFilterVisible}
				onDone={onSelectFilter}
				onClose={() => setIsFilterVisible(false)}
				dataSource={dataSource}
			/>
			<FlatList
				data={launches}
				extraData={launches}
				initialNumToRender={20}
				numColumns={2}
				columnWrapperStyle={style.row}
				keyExtractor={(item) => item.mission_name}
				renderItem={({ item }) => (
					<LaunchCard key={item.mission_name} item={item} />
				)}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => <Gutter spacing={1} />}
				ListFooterComponent={() =>
					launches.length ? <Gutter spacing={4} /> : null
				}
			/>
		</Wrapper>
	);
};

const style = StyleSheet.create({
	navBarButton: {
		paddingLeft: 10,
		paddingRight: 10,
	},

	row: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
});

export { LaunchDashboard };
