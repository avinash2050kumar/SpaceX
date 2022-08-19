import { TSpaceX } from 'typings/spaceX';

export const SPACEX_LOADING = 'SPACEX_LOADING';
export const SET_LAUNCHES = 'SET_LAUNCHES';

interface ISetSpaceXLoading {
	type: typeof SPACEX_LOADING;
}

interface ISetAllLaunches {
	type: typeof SET_LAUNCHES;
	payload: TSpaceX[];
}

export type SpaceXActionType = ISetSpaceXLoading | ISetAllLaunches;
