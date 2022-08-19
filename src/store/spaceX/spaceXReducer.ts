import update from 'immutability-helper';
import type { SpaceXActionType } from 'store/spaceX/types';
import { SET_LAUNCHES } from 'store/spaceX/types';
import type { TSpaceX } from 'typings/spaceX';

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

		default:
			return state;
	}
};
