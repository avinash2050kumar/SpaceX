import { Client } from 'utils/axios';
import type { TSpaceX } from 'typings/spaceX';
import { SET_LAUNCHES, SPACEX_LOADING } from 'store/spaceX/types';

export const fetchAllLaunches = () => async (dispatch: any) => {
	try {
		dispatch(setSpaceXLoading(true));
		const res = await Client.get('/launches');
		dispatch(setAllLaunches(res.data));
	} catch (e) {
		console.log('error', e);
	} finally {
		dispatch(setSpaceXLoading(false));
	}
};

export const setSpaceXLoading = (payload: boolean) => ({
	type: SPACEX_LOADING,
	payload,
});

export const setAllLaunches = (payload: TSpaceX) => ({
	type: SET_LAUNCHES,
	payload,
});
