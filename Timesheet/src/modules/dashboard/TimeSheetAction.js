import { callAPI } from '../../services/RequestBuilder';
import { GetTaskEntriesAPI, DeleteTaskAPI } from '../../services/APIConfig';
import RequestBody from '../../services/RequestBody';
import { INITIAL_HEADERS } from '../../services/RequestBuilder';
import { Alert } from 'react-native';
import AppStorage from '../../utils/AppAsyncStorage';
import { SERVER_TASK_LIST,
	ASTORAGE_OFFLINETASK,
	UPDATE_OFFLINETASKQUEUE,
	UPDATE_FILTER_LIST,
} from '../../utils/Constants';

export const getTaskEntries = (props) => {
	//dispatch an action to show loading spinner while data is being fetched.
	return (dispatch) => {
		var header = INITIAL_HEADERS;
		header['Authorization'] = 'Bearer ' + props;
		callAPI(GetTaskEntriesAPI, {}, {}, header)
			.then((response) => {
				if (typeof response !== 'undefined') {
					saveTimeSheetDataToStorage(response.data);
					dispatch({
						type: SERVER_TASK_LIST,
						payload: response.data
					});
					return;
				  } else {
					// in case of internet time out.  
					getTimeSheetDataFromStorage(dispatch);
				  }
		  
			})// in case of network not found.
			.catch((error) => {
				getTimeSheetDataFromStorage(dispatch);
				console.log(error);
			});
    };
};

export const updateFilteredList = (list) => {
	return (dispatch) => {
		
		dispatch({
			type: UPDATE_FILTER_LIST,
			payload: list,
		});
	};
};


export const deleteTask = (taskId, props) => {
	
	var header = INITIAL_HEADERS;
	return (dispatch) => {
	header['Authorization'] = 'Bearer ' + props;
	callAPI(DeleteTaskAPI, {}, taskId, header)
	.then((response) => {
		
		if (typeof response !== 'undefined') {
			
		}
		
		}
	)
	.catch((error) => {
		console.log(error);
	});
}
};


//------------ AsyncStorage for TimeSheet Data ------//

const saveTimeSheetDataToStorage = (list) => {
	AppStorage.setValue('TimeSheetList', JSON.stringify(list));
};

const getTimeSheetDataFromStorage = (dispatch) => {
		AppStorage.getValue('TimeSheetList')
			.then((result) => {
				dispatch({
					type: SERVER_TASK_LIST,
					payload: JSON.parse(result)
				});
			})
			.catch((error) => {
				console.log(error);
				
			});
};

export const getTaskQueueDataFromStorage = () => {
	return (dispatch) => {
		AppStorage.getValue(ASTORAGE_OFFLINETASK)
		.then((result) => {
			const offlineTaskList = JSON.parse(result);
			dispatch({
				type: UPDATE_OFFLINETASKQUEUE,
				payload: offlineTaskList
			});
		})
		.catch((error) => {
			console.log(error);
			
		});
	}
	
};


