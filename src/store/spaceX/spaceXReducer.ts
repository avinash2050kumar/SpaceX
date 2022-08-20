import update from 'immutability-helper';
import type { SpaceXActionType } from 'store/spaceX/types';
import {
	FILTER_LAUNCHES,
	RESET_LAUNCHES,
	SET_LAUNCHES,
	SORT_LAUNCHES,
	SPACEX_LOADING,
} from 'store/spaceX/types';
import type { TSpaceX } from 'typings/spaceX';
import moment from 'moment';

interface InitialState {
	loading: boolean;
	spaceXDataSource: TSpaceX[];
	filteredDataSource: TSpaceX[];
}

const initialState: InitialState = {
	loading: true,
	spaceXDataSource: [],
	filteredDataSource: [],
};

export default (state = initialState, action: SpaceXActionType) => {
	switch (action.type) {
		case SET_LAUNCHES:
			return update(state, {
				spaceXDataSource: { $set: action.payload },
				filteredDataSource: { $set: action.payload },
			});

		case SPACEX_LOADING:
			return update(state, {
				loading: { $set: action.payload },
			});

		case SORT_LAUNCHES: {
			let sortData: TSpaceX[] = state.filteredDataSource;

			// sort by date
			if (action.payload === 'Launch_Date') {
				sortData = sortData.sort(
					(a, b) =>
						moment(a.launch_date_utc).valueOf() -
						moment(b.launch_date_utc).valueOf(),
				);
			}

			// sort by name
			if (action.payload === 'Mission_Name') {
				sortData = sortData.sort((a, b) =>
					a.mission_name > b.mission_name ? 1 : -1,
				);
			}

			return update(state, {
				filteredDataSource: { $set: sortData },
			});
		}

		case FILTER_LAUNCHES: {
			const {
				startDate,
				endDate,
				rocketName,
				launchStatusOpt,
				upcomingStatus,
			} = action.payload;

			let filteredLaunches: TSpaceX[] = state.spaceXDataSource;

			// Upcoming Launch
			// do nothing for length = 2 (true & false)
			if (upcomingStatus.length === 1) {
				const isUpcoming = upcomingStatus[0] === 'upcoming';
				filteredLaunches = filteredLaunches.filter(
					(el) => isUpcoming === el.upcoming,
				);
			}

			// Success Launch
			// do nothing for length = 2 (true & false)
			if (launchStatusOpt.length === 1) {
				const isSuccess = launchStatusOpt[0] === 'success';
				filteredLaunches = filteredLaunches.filter(
					(el) => isSuccess === el.launch_success,
				);
			}

			// Rocket Name
			if (rocketName.length > 0) {
				filteredLaunches = filteredLaunches.filter((el) => {
					return rocketName.indexOf(el.rocket.rocket_name) >= 0;
				});
			}

			// DateWise
			if (startDate) {
				filteredLaunches = filteredLaunches.filter((launch) =>
					moment(launch.launch_date_utc).isAfter(moment(startDate)),
				);
			}

			if (endDate) {
				filteredLaunches = filteredLaunches.filter((launch) =>
					moment(launch.launch_date_utc).isBefore(moment(endDate)),
				);
			}

			return update(state, {
				filteredDataSource: { $set: filteredLaunches },
			});
		}

		case RESET_LAUNCHES:
			return initialState;

		default:
			return state;
	}
};
