import { combineReducers } from 'redux';
import spaceXReducer from 'store/spaceX/spaceXReducer';

export default combineReducers({
	main: spaceXReducer,
});
