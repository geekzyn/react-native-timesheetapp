import { callAPI } from '../../services/RequestBuilder';
import { GetTaskEntriesAPI } from '../../services/APIConfig';
import RequestBody from '../../services/RequestBody';
import { INITIAL_HEADERS } from '../../services/RequestBuilder';
import { Alert } from 'react-native';
import AppStorage from '../../utils/AppAsyncStorage';
import { SERVER_TASK_LIST } from '../../utils/Constants';

export const getTaskEntries = (props) => {
	debugger;
	//dispatch an action to show loading spinner while data is being fetched.
	return (dispatch) => {
		var header = INITIAL_HEADERS;
		header['Authorization'] = 'Bearer ' + props;
		callAPI(GetTaskEntriesAPI, {}, {}, header)
			.then((response) => {
				debugger;
				dispatch({
					type: SERVER_TASK_LIST,
					payload: response.data
				});
				debugger;
			})
			.catch((error) => {
				console.log(error);
			});
    };
};
