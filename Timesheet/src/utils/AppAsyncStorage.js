import { Component } from 'react';
import { AsyncStorage } from 'react-native';

export default class AppAsyncStorage extends Component {
	/* ----------------------fectch the value for key from async storage.-----------------------*/
	static getValue(key) {
		return new Promise((getSuccess, getFail) => {
			AsyncStorage.getItem(key)
				.then((result) => result)
				.then((result) => getSuccess(result))
				.catch((error) => getFail(error));
		});
	}

	/* ----------------------save the value for key in async storage.-----------------------*/
	static setValue(key, value) {
		return new Promise((saveSuccess, saveFailure) => {
			AsyncStorage.setItem(key, value).then(() => saveSuccess(true)).catch((error) => saveFailure(error));
		});
	}

	static deleteValue(key) {
		return new Promise((deleteSuccess, deleteFailure) => {
			AsyncStorage.removeItem(key).then(() => deleteSuccess(true)).catch((error) => deleteFailure(error));
		});
	}

	static updateValue(key, value) {
		return new Promise((updateSuccess, updateFailure) => {
			AsyncStorage.mergeItem(key, value).then(() => updateSuccess(true)).catch((error) => updateFailure(error));
		});
	}

	// AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta), () => {
}
