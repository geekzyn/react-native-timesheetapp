import { TIME_ENTRY, PROJECT_LIST, CUSTOMER_LIST, ACTIVITY_LIST } from '../../utils/Constants';

const INITIAL_STATE = {
	accessToken: '',
	error: '',
	loading: false,
	timeEntrySaved: false,
	projectList: [],
	customerList: [],
	activityList: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TIME_ENTRY:
			return {
				...state,
				timeEntrySaved: action.payload
			};
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
		default:
			return state;
	}
};
