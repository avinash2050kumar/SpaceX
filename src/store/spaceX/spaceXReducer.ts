import update from 'immutability-helper';
import type { SpaceXActionType } from 'store/spaceX/types';
import {
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

		case RESET_LAUNCHES:
			return initialState;

		default:
			return state;
	}
};
