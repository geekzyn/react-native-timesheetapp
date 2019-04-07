import { callAPI } from '../../services/RequestBuilder';
import { LoginAPI } from '../../services/APIConfig';
import RequestBody from '../../services/RequestBody';
import { INITIAL_HEADERS } from '../../services/RequestBuilder';
import AppStorage from '../../utils/AppAsyncStorage';
import {
	SPINNER_LOADING_ACTION,
	REQUEST_SUCCESS_ACTION,
	REQUEST_FAIL_ACTION,
	LOGIN_SUCCESS
} from '../../utils/Constants';

export const requestLogin = (props) => {
	debugger;
	const { navigation } = props;
	//dispatch an action to show loading spinner while data is being fetched.
	return (dispatch) => {
		dispatch({ type: SPINNER_LOADING_ACTION });
		const { params, query } = RequestBody.login(props.state);
		const header = INITIAL_HEADERS;
		debugger;
		callAPI(LoginAPI, params, query, header)
			.then((response) => {
				const { message, access_token } = response;
				debugger;
				if (message != null && message !== undefined) {
					requestFail(dispatch, message);
				} else {
					AppStorage.setValue('accessToken', access_token);
					dispatch({
						type: LOGIN_SUCCESS,
						payload: access_token
					});
					navigation.navigate('Dashboard');
				}
			})
			.catch((error) => {
				console.log(error);
				requestFail(dispatch, error);
			});
	};
};

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
