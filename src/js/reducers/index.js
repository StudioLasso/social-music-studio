import Studio from './Studio';
import Tracks from './Tracks';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	Tracks,
	Studio,
	form: formReducer
});

export default rootReducer;