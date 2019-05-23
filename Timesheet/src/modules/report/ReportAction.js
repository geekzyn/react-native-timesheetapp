import { callAPI } from '../../services/RequestBuilder';
import { GetTotalEntriesTime, GetTotalTodayEntriesAPI } from '../../services/APIConfig';
import RequestBody from '../../services/RequestBody';
import { INITIAL_HEADERS } from '../../services/RequestBuilder';
import AppStorage from '../../utils/AppAsyncStorage';
import {
	SPINNER_LOADING_ACTION,
	REQUEST_SUCCESS_ACTION,
	REQUEST_FAIL_ACTION,
    LOGIN_SUCCESS,
	TOTAL_TODAYENTRY,
	TOTAL_TODAYENTRY_TIME,
    
} from '../../utils/Constants';

export const getTotalTodayEntries = (props) => {
    
    var header = INITIAL_HEADERS;
	const {accessToken} = props;

	return (dispatch) => {
        header['Authorization'] = 'Bearer ' + accessToken;

		callAPI(GetTotalTodayEntriesAPI, {}, {}, header)
			.then((response) => {
                
				if (typeof response !== 'undefined' && typeof response == 'number') {
					dispatch({
						type: TOTAL_TODAYENTRY,
						payload: response
					});
					//fetch the time when entires are fetched.
				} else {
				}
			})
			.catch((error) => {
			});
	}
};


//------------ AsyncStorage for TimeSheet Data ------//

export const getTotalTodayTime = (props) => {
    
    var header = INITIAL_HEADERS;
	const {accessToken} = props;

	return (dispatch) => {
        header['Authorization'] = 'Bearer ' + accessToken;

		callAPI(GetTotalEntriesTime, {}, {}, header)
			.then((response) => {
                
				if (typeof response !== 'undefined' && typeof response == 'number') {
					dispatch({
						type: TOTAL_TODAYENTRY_TIME,
						payload: response
					});
				} else {
				}
			})
			.catch((error) => {
			});
	}
};

// AppStorage.setValue('accessToken', access_token);
// dispatch({
// 	type: LOGIN_SUCCESS,
// 	payload: access_token
// });



//---------------- Action handling async response --------------------//
const requestSuccess = (dispatch, data) => {
	dispatch({
		type: LOGIN_SUCCESS,
		payload: data
	});
};

const requestFail = (dispatch, error) => {
	dispatch({
		type: REQUEST_FAIL_ACTION,
		payload: error
	});
};
