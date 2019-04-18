import { callAPI } from '../../services/RequestBuilder';
import { PostEntriesAPI } from '../../services/APIConfig';
import RequestBody from '../../services/RequestBody';
import { INITIAL_HEADERS } from '../../services/RequestBuilder';
import { Alert } from 'react-native';
import AppStorage from '../../utils/AppAsyncStorage';
import { 
	ACTIVITY_LIST, 
	PROJECT_LIST, 
	CUSTOMER_LIST, 
	OFFLINE_TASKQUEUE,
	SELECTED_PROJECT,
	NEW_OFFLINE_TASK_UPDATE,
  } from '../../utils/Constants';
import {GetProjectAPI, GetCustomerAPI, GetActivitiesAPI} from '../../services/APIConfig';

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
				if (typeof response !== 'undefined') {
					const { message, access_token } = response;
					if (message != null && message !== undefined) {
						navigation.popToTop();
						Alert.alert('Success', message);
					}
				} else {
					// navigation.navigate('Dashboard');
				
					updateOfflineQueueList(dispatch, params);
					updateDisplayList(dispatch, params, props);
				}
				
			})
			.catch((error) => {
				debugger;
				console.log(error.message);
				updateOfflineQueueList(dispatch, params);
				updateDisplayList(dispatch, params, props);
				// navigation.navigate('Dashboard');

			});
	};
};

const updateOfflineQueueList = (dispatch, queueItem) => {
	debugger;
	// to maintaine offline queue of task
	debugger;
	dispatch({
		type: OFFLINE_TASKQUEUE,
		payload: queueItem
	});
}

const updateDisplayList = (dispatch, queueItem, props) => {
	debugger;
	dispatch({
		type: NEW_OFFLINE_TASK_UPDATE ,
		payload: queueItem
	});
	Alert.alert('OFFLINE', "As you are offline, data is saved locally and will be uploaded later.");
	props.navigation.popToTop();
}

export const saveSelectedProject = (props) => {
	debugger;
	return (dispatch) => {
		dispatch ({
			type: SELECTED_PROJECT,
			payload: props
		});
	}
};

export const fetchProjectData = (accessToken) => {
	var header = INITIAL_HEADERS;
	header['Authorization'] = 'Bearer ' + accessToken;
	debugger;
	//dispatch an action to show loading spinner while data is being fetched.
	return (dispatch) => {

		callAPI(GetProjectAPI, {}, {}, header)
			.then((response) => {
				if (typeof response !== 'undefined') {
					dispatch({
						type: PROJECT_LIST,
						payload: response.data
					});
					// saving to async Storage
					AppStorage.setValue('projectList', JSON.stringify(response.data));
				} else {
					// fetch data from async storage in case of network issue.
					getProjectListFromStorage(dispatch, PROJECT_LIST);
				}
			})
			.catch((error) => {
				getProjectListFromStorage(dispatch, PROJECT_LIST);
				console.log(error);
			});
	}
}

export const fetchCustomerData = (accessToken) => {
	var header = INITIAL_HEADERS;
	return (dispatch) => {
		header['Authorization'] = 'Bearer ' + accessToken;
		callAPI(GetCustomerAPI, {}, {}, header)
			.then((response) => {
				if (typeof response !== 'undefined') {
					dispatch({
						type: CUSTOMER_LIST,
						payload: response.data,
					});
					// saving to async Storage
					AppStorage.setValue('customerList', JSON.stringify(response.data));
				} else {
					getCustomerListFromStorage(dispatch);
				}
			})
			.catch((error) => {
				getCustomerListFromStorage(dispatch);
				console.log(error);
			});
	}
}

export const fetchActivities = (value)=> {
	var header = INITIAL_HEADERS;
	const {selectedProject, props} = value;
	return (dispatch) => {
		debugger;
		header['Authorization'] = 'Bearer ' + props.accessToken;
		const { params, query } = RequestBody.activities(selectedProject);
		debugger;
		callAPI(GetActivitiesAPI, params, query, header)
			.then((response) => {
				if (typeof response !== 'undefined') {
					dispatch({
						type: ACTIVITY_LIST,
						payload: response,
					});
					// saving to async Storage
					AppStorage.setValue('activityList', JSON.stringify(response));
					navigateToAcivity();
				}
				else {
					getActivityFromStorage(dispatch, props);
				}
			})
			.catch((error) => {
				getActivityFromStorage(dispatch, props);
				console.log(error);
			});
		}
}

export const uploadOfflineTask = (offlineTask) => {
	//dispatch an action to show loading spinner while data is being fetched.
	return (dispatch) => {
		const header = INITIAL_HEADERS;
		debugger;
		callAPI(PostEntriesAPI, offlineTask, {}, header)
			.then((response) => {
				if (typeof response !== 'undefined') {
					const { message, access_token } = response;
					if (message != null && message !== undefined) {
						Alert.alert('Success', message);
					}
				} else {
					Alert.alert('Not Uploaded', "failure");
					// updateOfflineQueueList(dispatch, props, params);
				}
				
			})
			.catch((error) => {
				debugger;
				console.log(error.message);
				// updateOfflineQueueList(dispatch, props, params);
			});
	};
}

const navigateToAcivity = (props) => {
	props.navigation.navigate('ActivityList');
}


//------------ AsyncStorage for TimeSheet Data ------//

const getCustomerListFromStorage = (dispatch) => {
		AppStorage.getValue('customerList')
			.then((result) => {
				const customerList = JSON.parse(result);
				debugger;
				dispatch({
					type: CUSTOMER_LIST,
					payload: customerList
				});
			})
			.catch((error) => {
				console.log(error);
				debugger;
			});
};

const getProjectListFromStorage = (dispatch) => {
	AppStorage.getValue('projectList')
		.then((result) => {
			const projectList = JSON.parse(result);
			debugger;
			dispatch({
				type: PROJECT_LIST,
				payload: projectList
			});
		})
		.catch((error) => {
			console.log(error);
			debugger;
		});
};

const getActivityFromStorage = (dispatch, props) => {
	AppStorage.getValue('activityList')
		.then((result) => {
			const activityList = JSON.parse(result);
			debugger;
			dispatch({
				type: ACTIVITY_LIST,
				payload: activityList
			});
			navigateToAcivity(props);
		})
		.catch((error) => {
			console.log(error);
			debugger;
		});
};

