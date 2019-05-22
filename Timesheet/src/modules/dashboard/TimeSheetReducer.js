import { 
	SERVER_TASK_LIST,
	NEW_OFFLINE_TASK_UPDATE,
	UPDATE_FILTER_LIST,
} from '../../utils/Constants';
import AppStorage from '../../utils/AppAsyncStorage';

const INITIAL_STATE = {
	serverTaskList: [],
	newTaskList: [],
	filterTaskList: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SERVER_TASK_LIST:
			return {
				...state,
				serverTaskList: action.payload,
				newTaskList: action.payload,
			};
		case UPDATE_FILTER_LIST: 
		
			return {
				...state,
				filterTaskList: action.payload
			}
		case NEW_OFFLINE_TASK_UPDATE: {
			
			var list = state.newTaskList;
			if (list === null || typeof list === 'undefined') {
				list = [];
			}
			list.push(action.payload);
			// update the task list in offline mode too
			AppStorage.setValue('TimeSheetList', JSON.stringify(list));
			return {
				...state,
				newTaskList: list
			}
		}
		default:
			return state;
	}
};
