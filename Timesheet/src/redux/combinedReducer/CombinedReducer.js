import { combineReducers } from 'redux';
import Login from '../../modules/login/LoginReducer';
import TaskEntry from '../../modules/entry/EntryReducer';
import TimeSheet from '../../modules/dashboard/TimeSheetReducer';
import ReportReducer from '../../modules/report/ReportReducer';
export default combineReducers({
	loginReducers: Login,
	timeEntryReducer: TaskEntry,
	timeSheetReducer: TimeSheet,
	reportReducer: ReportReducer
});
