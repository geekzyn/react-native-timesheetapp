import { devBaseURL } from './WebConfig.env';
import Request from './Request';

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
	const url = devBaseURL + endpoint;

	return url;
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
	debugger;
	const url = getURL(config.endpoint, query);
	// Call fetch methods interface
	debugger;
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
	[SERVER_HEADER_KEYS_CONTENT_TYPE]: DEFAULT_CONTENT_TYPE,
	[DEFAULT_AUTHORiZATION]:
		'Bearer ' +
		'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIyNmE0NGI4OTgyZGM3NTgwMWU3Y2U4OTJiNjdlOGEwY2QzMmJiOTliMTQwODQ4Mzk0MjhkMDg5ZTQ5YWFmNGUzMWNiMDIyNzVmZmU5NTAyIn0.eyJhdWQiOiIxIiwianRpIjoiMjI2YTQ0Yjg5ODJkYzc1ODAxZTdjZTg5MmI2N2U4YTBjZDMyYmI5OWIxNDA4NDgzOTQyOGQwODllNDlhYWY0ZTMxY2IwMjI3NWZmZTk1MDIiLCJpYXQiOjE1NTQwNjE1NTUsIm5iZiI6MTU1NDA2MTU1NSwiZXhwIjoxNTg1NjgzOTU0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.nHD9cR4eQrT-l3Ui2pfjcf_Q9QxnrMlQv6-rhfgc-rumYFsNzGObHMxByq9HaDxoOqj6qmXn9m0xniyRzQNII02JFNAF9hXXKCq9YRGe-tbc1LMbTVyR4RYZMFsne08m0AVBq8pS8slDGKoSkxNjSTwb3v-dpsiIvvpfn0IQ79qmiPi_FcCYcwjhaH4Qbq1XJ8WmraChQK207vQw9o7OShiR5DcTvZe_sl3daXg_ZZKa674wTtzBMFDqTEfYVM0DaSxz4yCvdN9m7PqET6l0iVH-q8kbcpFmWozkfrjZ5PTfIr8MZsomLRTvRCvGtXUcC3Y91AFg5SmeljH5VumVMj3phnTRfGEgzffODcVQiy8i-59Zgad82ZtdGNUmauHpHvFgy9wbF0kJmBFsrp7O4_rRGd6FpjNtgWS6578IMYtGW2KVAcpn4fgj42df3T7J0qGEu454MbBlCr-33T8i2zhSvNXciv2tf6pY1qN0jBfr_OrDOZx3wpkG51gQdc7eeCIqute0iQ562GqWer0SS-ruwWb4h1OXiJ3qKu4h9Qrm_agK_Lc87Ei0auHRpHVoec7t15wFeANH44onbPgdjxEN1QS_CCdpCNuz5v--7Uoj1BXom8cHrZajJJ9FbcirXnqRVg2OY2cbNF6dvayLger0KjEqyxz37d4dp8RMKoo'
};

export default callAPI;
