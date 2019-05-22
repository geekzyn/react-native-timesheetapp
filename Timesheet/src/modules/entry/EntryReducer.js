import { 
	TIMEENTRY_SAVED, 
	PROJECT_LIST,
	CUSTOMER_LIST, 
	ACTIVITY_LIST,
	SELECTED_PROJECT,
	OFFLINE_TASKQUEUE,
	ASTORAGE_OFFLINETASK,
	UPDATE_OFFLINETASKQUEUE,
	RESET_ENTRYSAVE_FLAG,
	OFFLINE_UPLOAD,
} from '../../utils/Constants';
import AppStorage from '../../utils/AppAsyncStorage';

const INITIAL_STATE = {
	accessToken: '',
	error: '',
	isDataUploaded: false,
	timeEntrySaved: false,
	projectList: [],
	customerList: [],
	activityList: [],
	selectedProject: '',
	offlineTaskQueueList: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {

		case OFFLINE_UPLOAD: 
			return {
				...state,
				isDataUploaded: action.payload
			};
		case TIMEENTRY_SAVED:
			return {
				...state,
				timeEntrySaved: action.payload
			};
		case RESET_ENTRYSAVE_FLAG: 
			return {
				...state,
				timeEntrySaved: false
			}
		case PROJECT_LIST:
			return {
				...state,
				projectList: action.payload
			};
		case CUSTOMER_LIST:
			return {
				...state,
				customerList: action.payload
			}
		case ACTIVITY_LIST:
			return {
				...state,
				activityList: action.payload
			}
		case SELECTED_PROJECT: 
			return {
				...state,
				selectedProject: action.payload
			}
		case OFFLINE_TASKQUEUE: {
			
			var list = state.offlineTaskQueueList
			if (list === null || typeof list === 'undefined') {
				list = [];
			}
			list.push(action.payload);
			AppStorage.setValue(ASTORAGE_OFFLINETASK, JSON.stringify(list));
			return {
				...state,
				offlineTaskQueueList: list
			}
		}
		case UPDATE_OFFLINETASKQUEUE: {
			return {
				...state,
				offlineTaskQueueList: action.payload
			}

		}
		default:
			return state;
	}
};
