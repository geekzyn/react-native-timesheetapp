import { combineReducers } from 'redux';
import Login from '../../modules/login/LoginReducer';
import TaskEntry from '../../modules/entry/EntryReducer';
import TimeSheet from '../../modules/dashboard/TimeSheetReducer';
export default combineReducers({
	loginReducers: Login,
	timeEntryReducer: TaskEntry,
	timeSheetReducer: TimeSheet
});
