import { SPINNER_LOADING_ACTION, REQUEST_FAIL_ACTION, LOGIN_SUCCESS } from '../../utils/Constants';

const INITIAL_STATE = {
	accessToken: '',
	error: '',
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				accessToken: action.payload,
				loading: false
			};
		case REQUEST_FAIL_ACTION:
			
			return {
				...state,
				loading: false,
				error: 'GET REQUEST FAILED'
			};
		case SPINNER_LOADING_ACTION:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};
