import { TIME_ENTRY } from '../../utils/Constants';

const INITIAL_STATE = {
	accessToken: '',
	error: '',
	loading: false,
	timeEntrySaved: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TIME_ENTRY:
			return {
				...state,
				timeEntrySaved: action.payload
			};
		// case REQUEST_FAIL_ACTION:
		// 	debugger;
		// 	return {
		// 		...state,
		// 		loading: false,
		// 		error: 'GET REQUEST FAILED'
		// 	};
		// case SPINNER_LOADING_ACTION:
		// 	return {
		// 		...state,
		// 		loading: true
		// 	};
		default:
			return state;
	}
};
