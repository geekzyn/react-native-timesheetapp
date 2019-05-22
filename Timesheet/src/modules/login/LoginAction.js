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
	
	const { navigation } = props;
	//dispatch an action to show loading spinner while data is being fetched.
	return (dispatch) => {
		dispatch({ type: SPINNER_LOADING_ACTION });
		const { params, query } = RequestBody.login(props.state);
		const header = INITIAL_HEADERS;
		
		callAPI(LoginAPI, params, query, header)
			.then((response) => {
				
				if (typeof response !== 'undefined') {
					const { message, access_token } = response;
					
					if (message != null && message !== undefined) {
						requestFail(dispatch, message);
					} else {
						AppStorage.setValue('accessToken', access_token);
						dispatch({
							type: LOGIN_SUCCESS,
							payload: access_token
						});
						navigation.navigate('TaskNavigator');
					}
				return;
			} else {
				alert("Unable to Login. Please check your network.");
				requestFail(dispatch, error);

			}
			
		})
			.catch((error) => {
				console.log(error);
				requestFail(dispatch, error);
			});
	};
};


//------------ AsyncStorage for TimeSheet Data ------//

export const getAccessTokenFromStorage = () => {
	return(dispatch)=> {
		AppStorage.getValue('accessToken')
		.then((result) => {
			
			dispatch({
				type: LOGIN_SUCCESS,
				payload: result
			});
		})
		.catch((error) => {
			console.log(error);
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
