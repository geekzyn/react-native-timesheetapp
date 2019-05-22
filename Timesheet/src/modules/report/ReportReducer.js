import 	{ TOTAL_TODAYENTRY, TOTAL_TODAYENTRY_TIME} from '../../utils/Constants';


const INITIAL_STATE = {
totalTodayEntries: 0,
totalEntriesTime: "0 hours",
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {

        case TOTAL_TODAYENTRY: 
        
			return {
				...state,
				totalTodayEntries: action.payload
			};
		case TOTAL_TODAYENTRY_TIME:
			return {
				...state,
				totalEntriesTime: action.payload
            };
            default:
			return state;
    }
}
