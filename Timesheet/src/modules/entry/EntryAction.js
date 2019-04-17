import { callAPI } from '../../services/RequestBuilder';
import { PostEntriesAPI } from '../../services/APIConfig';
import RequestBody from '../../services/RequestBody';
import { INITIAL_HEADERS } from '../../services/RequestBuilder';
import { Alert } from 'react-native';
import AppStorage from '../../utils/AppAsyncStorage';
import { TIME_ENTRY } from '../../utils/Constants';

export const saveTimeEntry = (props) => {
	debugger;
	const { navigation } = props;
	//dispatch an action to show loading spinner while data is being fetched.
	return (dispatch) => {
		const { params, query } = RequestBody.timeEntry(props.state);
		const header = INITIAL_HEADERS;
		debugger;
		callAPI(PostEntriesAPI, params, query, header)
			.then((response) => {
				const { message, access_token } = response;
				debugger;
				if (message != null && message !== undefined) {
					navigation.popToTop();
					Alert.alert('Success', message);
				}
			})
			.catch((error) => {
				debugger;
				console.log(error.message);
				// requestFail(dispatch, error);
			});
	};
};
