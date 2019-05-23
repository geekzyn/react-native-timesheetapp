import { callAPI } from '../../services/RequestBuilder';
import { PostEntriesAPI, SyncEntriesAPI } from '../../services/APIConfig';
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
	TIMEENTRY_SAVED,
	RESET_ENTRYSAVE_FLAG
  } from '../../utils/Constants';
import {
	GetProjectAPI,
	GetCustomerAPI,
	GetActivitiesAPI,
	EditTaskAPI,
} from '../../services/APIConfig';

export const saveTimeEntry = (props) => {
	
	const { navigation } = props;
	//dispatch an action to show loading spinner while data is being fetched.
	return (dispatch) => {
		const { params, query } = RequestBody.timeEntry(props.state);
		updateDisplayList(dispatch, params, props);
		const header = INITIAL_HEADERS;
		
		callAPI(PostEntriesAPI, params, query, header)
			.then((response) => {
				if (typeof response !== 'undefined') {
					const { message, access_token } = response;
					if (message != null && message !== undefined) {
						Alert.alert('New entry is successfully synced on server', message);
					}
					dispatch({
						type: TIMEENTRY_SAVED,
						payload: true
					});
				} else {
					// navigation.navigate('Dashboard');
				
					updateOfflineQueueList(dispatch, params);
				}
				
			})
			.catch((error) => {
				
				console.log(error.message);
				updateOfflineQueueList(dispatch, params);
				// navigation.navigate('Dashboard');

			});
	};
};

export const resetTimeEntryFlag = () => {
	return (dispatch) => {
		dispatch({
			type: RESET_ENTRYSAVE_FLAG,
			}
		)
	}
}

export const editTask = (props) => {
	
	//dispatch an action to show loading spinner while data is being fetched.
	return (dispatch) => {
		const { params } = RequestBody.timeEntry(props.state);
		updateDisplayList(dispatch, params, props);
		const header = INITIAL_HEADERS;
		
		callAPI(EditTaskAPI, params, 0, header)
			.then((response) => {
				if (typeof response !== 'undefined') {
					const { message, access_token } = response;
					if (message != null && message !== undefined) {
						Alert.alert('New entry is successfully synced on server', message);
					}
					dispatch({
						type: TIMEENTRY_SAVED,
						payload: true
					});
				} else {
					// navigation.navigate('Dashboard');
				
					updateOfflineQueueList(dispatch, params);
				}
				
			})
			.catch((error) => {
				
				console.log(error.message);
				updateOfflineQueueList(dispatch, params);
				// navigation.navigate('Dashboard');

			});
	};
}
 
const updateOfflineQueueList = (dispatch, queueItem) => {
	alert("Updating the task in Offline Queue");
	// to maintaine offline queue of task
	
	dispatch({
		type: OFFLINE_TASKQUEUE,
		payload: queueItem
	});
}

const updateDisplayList = (dispatch, queueItem, props) => {
	
	dispatch({
		type: NEW_OFFLINE_TASK_UPDATE ,
		payload: queueItem
	});

	Alert.alert("Task List Updated..");
	props.navigation.popToTop();
	//update the async storage with updated list for offine
	
	
}

export const saveSelectedProject = (props) => {
	
	return (dispatch) => {
		dispatch ({
			type: SELECTED_PROJECT,
			payload: props
		});
	}
};

export const fetchProjectData = (props) => {
	var header = INITIAL_HEADERS;
	const {accessToken, navigation} = props;

	header['Authorization'] = 'Bearer ' + accessToken;
	
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
					alert("Unable to fetch from server... Checking local storage now.")
					getProjectListFromStorage(dispatch, navigation);
				}
			})
			.catch((error) => {
				alert()
				getProjectListFromStorage(dispatch, navigation);
			});
	}
}

export const fetchCustomerData = (props) => {
	var header = INITIAL_HEADERS;
	const {accessToken, navigation} = props;

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
					alert("Unable to fetch from server... Checking local storage now.")
					getCustomerListFromStorage(dispatch, navigation);
				}
			})
			.catch((error) => {
				alert("Coudn't find data in offline storage. Error:" + error)
				getCustomerListFromStorage(dispatch, navigation);
			});
	}
}

export const fetchActivities = (value)=> {
	var header = INITIAL_HEADERS;
	const {selectedProject, props} = value;
	return (dispatch) => {
		
		header['Authorization'] = 'Bearer ' + props.accessToken;
		const { params, query } = RequestBody.activities(selectedProject);
		
		callAPI(GetActivitiesAPI, params, {}, header)
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
					alert("Unable to fetch from server... Checking local storage now.")
					getActivityFromStorage(dispatch, props);
				}
			})
			.catch((error) => {
				alert("Coudn't find data in offline storage. Error:" + error)
				getActivityFromStorage(dispatch, props);
			});
		}
}

export const uploadOfflineTask = (offlineTask) => {
	//dispatch an action to show loading spinner while data is being fetched.
	return (dispatch) => {
		const header = INITIAL_HEADERS;
		
		callAPI(SyncEntriesAPI, offlineTask, {}, header)
			.then((response) => {
				
				if (typeof response !== 'undefined') {
					const { message, access_token } = response;
					if (message != null && message !== undefined) {
						
						Alert.alert('Success', message);
						// reset the offline task queue
						updateOfflineQueueList(dispatch, [])
					}
				} else {
					Alert.alert('Not Uploaded', "failure");
					// updateOfflineQueueList(dispatch, props, params);
				}
				
			})
			.catch((error) => {
				
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
				if (customerList === null) {
					alert("Coudn't find data in offline storage. Please connect once to sync data from server")
					navigation.pop();
					return
				}
				dispatch({
					type: CUSTOMER_LIST,
					payload: customerList
				});
			})
			.catch((error) => {
				alert("Coudn't find data in offline storage. Error:" + error)
				navigation.pop();
			});
};

const getProjectListFromStorage = (dispatch, navigation) => {
	AppStorage.getValue('projectList')
		.then((result) => {
			const projectList = JSON.parse(result);
			if (projectList === null) {
				alert("Coudn't find data in offline storage. Please connect once to sync data from server")
				navigation.pop();
				return
			}
			dispatch({
				type: PROJECT_LIST,
				payload: projectList
			});
		})
		.catch((error) => {
			alert("Coudn't find data in offline storage. Error:" + error)
			navigation.pop();
		});
};

const getActivityFromStorage = (dispatch, props) => {
	AppStorage.getValue('activityList')
		.then((result) => {
			const activityList = JSON.parse(result);

			if (activityList === null) {
				alert("Coudn't find data in offline storage. Please connect once to sync data from server")
				navigation.pop();
			}
			dispatch({
				type: ACTIVITY_LIST,
				payload: activityList
			});
			navigateToAcivity(props);
		})
		.catch((error) => {
			alert("Coudn't find data in offline storage. Error:" + error)
			navigation.pop();
		});
};

