import { combineReducers } from 'redux';
import spaceXReducer from 'store/spaceX/spaceXReducer';

const rootReducer = combineReducers({
	main: spaceXReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
