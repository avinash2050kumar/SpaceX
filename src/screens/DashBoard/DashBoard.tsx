import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLaunches, resetLaunches } from 'store/spaceX/actions';
import { Dispatch } from 'redux';
import { Loading } from 'components/app';
import type { RootState } from 'store/rootReducer';
import { FlexCol, Gutter } from 'components/atoms';
import styled from 'styled-components/native';
import { ItemCard } from './ItemCard';
import { TSpaceX } from 'typings/spaceX';

const Wrapper = styled(FlexCol)`
	padding: 14px;
	flex: 1;
	background: ${(props) => props.theme.colors.primaryWhite};
`;

const LaunchDashboard = () => {
	const loading = useSelector((state: RootState) => state.main.loading);
	const launches = useSelector(
		(state: RootState) => state.main.filteredDataSource,
	);

	const dispatch: Dispatch<any> = useDispatch();

	useEffect(() => {
		dispatch(fetchAllLaunches());

		return () => {
			dispatch(resetLaunches());
		};
	}, [dispatch]);

	const LaunchCard = useCallback(({ item }: { item: TSpaceX }) => {
		return <ItemCard item={item} />;
	}, []);

	return (
		<Wrapper>
			<Loading isLoading={loading} />
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
		justifyContent: 'space-around',
	},
});

export { LaunchDashboard };
