import { devBaseURL } from './WebConfig.env';
import Request from './Request';
import AppStorage from '../utils/AppAsyncStorage';
import Utils from '../utils/Utils';

import {
	SERVER_HEADER_KEYS_ACCEPT,
	SERVER_HEADER_KEYS_CONTENT_TYPE,
	DEFAULT_ACCEPT_HEADER,
	DEFAULT_CONTENT_TYPE,
	DEFAULT_AUTHORiZATION
} from './APIConfig';

const QUESTION_MARK = '?';
const AND_MARK = '&';
const EQUAL_TO = '=';

/**
 * A method to generate the url for the request
 * @param {string} endpoint - The endpoint of the request
 * @param {object} query    - The query params to be added to the url
 */
const getURL = (endpoint, query) => {

	var updatedUrl = devBaseURL	+ endpoint
	
	updatedUrl = (typeof query === "number" || typeof query === "string") ? updatedUrl + query : updatedUrl;
	return updatedUrl;
};

/**
 * A method to add query params to the ur;
 * @param {string} url      - The url of the request
 * @param {object} query    - The query params to be added to the url
 */
const addQueryParams = (url, query) => {
	let targetUrl = url;
	if (query && !Utils.isEmpty(query)) {
		targetUrl += QUESTION_MARK;
		Object.keys(query).forEach((key) => {
			targetUrl = targetUrl + key + EQUAL_TO + query[key] + AND_MARK;
		});
		targetUrl = targetUrl.substring(0, targetUrl.length - 1);
	}
	return targetUrl;
};

/**
 * A simple interface method to call any API
 * @param {object} config   - The config object of the request from config.js file
 * @param {object} params   - The params to be passed as body
 * @param {object} query    - The params to be passed as query in the url
 */
export const callAPI = async (config, params, query, header) => {
	const processedParams = !params ? {} : params;
	
	const url = getURL(config.endpoint, query);
	// Call fetch methods interface
	
	try {
		const parsedData = await Request.send(url, header, config.method, processedParams);
		
		return parsedData;
	} catch (err) {
		
		console.log(err);
		throw err;
	}
};

export const INITIAL_HEADERS = {
	[SERVER_HEADER_KEYS_ACCEPT]: DEFAULT_ACCEPT_HEADER,
	[SERVER_HEADER_KEYS_CONTENT_TYPE]: DEFAULT_CONTENT_TYPE
};

export default callAPI;
