import { TSpaceX } from 'typings/spaceX';

export const SPACEX_LOADING = 'SPACEX_LOADING';
export const SET_LAUNCHES = 'SET_LAUNCHES';
export const RESET_LAUNCHES = 'RESET_LAUNCHES';

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

export type SpaceXActionType =
	| ISetSpaceXLoading
	| ISetAllLaunches
	| IResetLaunchState;
