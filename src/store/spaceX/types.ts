import { TSpaceX } from 'typings/spaceX';
import type { LaunchSortOrder } from 'screens/DashBoard';

export const SPACEX_LOADING = 'SPACEX_LOADING';
export const SET_LAUNCHES = 'SET_LAUNCHES';
export const RESET_LAUNCHES = 'RESET_LAUNCHES';
export const SORT_LAUNCHES = 'SORT_LAUNCHES';

interface ISetSpaceXLoading {
	type: typeof SPACEX_LOADING;
	payload: boolean;
}

interface ISetAllLaunches {
	type: typeof SET_LAUNCHES;
	payload: TSpaceX[];
}

interface IResetLaunchState {
	type: typeof RESET_LAUNCHES;
}

interface ISortLaunches {
	type: typeof SORT_LAUNCHES;
	payload: LaunchSortOrder;
}

export type SpaceXActionType =
	| ISetSpaceXLoading
	| ISetAllLaunches
	| IResetLaunchState
	| ISortLaunches;
