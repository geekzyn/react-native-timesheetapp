import { 
	SERVER_TASK_LIST,
	NEW_OFFLINE_TASK_UPDATE,
} from '../../utils/Constants';

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
				filterTaskList: action.payload,
			};
		case NEW_OFFLINE_TASK_UPDATE: {
			debugger;
			var list = state.newTaskList;
			list.push(action.payload);
			return {
				...state,
				newTaskList: list
			}
		}
		default:
			return state;
	}
};
