/**
 * Use 'static' functions to assign them to the class and not its 'prototype'
 */
export default class Utils {
	static isEmpty(obj) {
		
		if (Object.keys(obj).length === 0) {
			return true;
		} else {
			return false;
		}
	}

	static isEmptyOrNull(obj) {
		
		if (obj === '' || obj == null){
			return true;
		} else {
			return false;
		}
	}
}
