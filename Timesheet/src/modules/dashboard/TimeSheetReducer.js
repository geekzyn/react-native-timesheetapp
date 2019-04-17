import { SERVER_TASK_LIST } from '../../utils/Constants';

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
		default:
			return state;
	}
};
