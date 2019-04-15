import { combineReducers } from 'redux';
import Login from '../../modules/login/LoginReducer';
import TimeEntry from '../../modules/entry/EntryReducer';
export default combineReducers({
	loginReducers: Login,
	timeEntryReducer: TimeEntry
});
