
export default class Requests {
	/**
     * Actual method to perform web service requests. Promise based.
     * @param {String} URI
     * @param {Object} header
     * @param {String} method
     * @param {Object} body
     */
	static send(URI, header, method, body) {
		const MILLISECONDS = 30000;
		
		const request = Requests.requestBuilder(header, method, body);
		console.log(request);
		
		return Requests.handleTimeOut(MILLISECONDS, fetch(URI, request))
			.then((response) => Requests.processResponse(response))
			.catch((error) => {
				console.log(error);
				Requests.processResponse(
					{
						handledError: error
					},
					true
				);
			});
	}

	/**
     * Processes received reponse from the web services.
     * @param {Object} response - response from web service
     */
	static processResponse(response, hasError = false) {
		return new Promise(async (resolve, reject) => {
			if (!hasError) console.log(response);
			if (response.handledError) {
				
				if (response.handledError.message === 'Network request failed') {
						return reject(response.handledError.message);
				}
				return reject(response.handledError);
			}
			
			return resolve(JSON.parse(response._bodyInit));
		});
	}

	/**
     * Builds the request by adding body and headers based on the type of request
     * @param {Object} header - object with KVP to be added as headers in the web request
     * @param {String} method - type of web request
     * @param {Object} body - object with KVP to be added as body in the web request
     */
	static requestBuilder(header, method, body) {
		const options = {};
		// leaving scope for more modifications if needed...
		options.method = method;

		if (method !== 'GET') {
			options.body = JSON.stringify(body);
		}
		options.headers = header;

		return options;
	}

	/**
     * Uses setTimeout to handle timeout of requests and avoid race conditions
     * @param {UnsignedInt} milliseconds - the time out value for web request
     * @param {Object} promise  - the promise based
     */
	static handleTimeOut(milliseconds, promise) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				// this gets called even if the request thing has been successful
				// but since the success would have been already,
				// context of the requesting thing will go out of scope... :)
				reject({message: 'Connection timed out. Please try again, later.'});
			}, milliseconds);

			promise.then(resolve, reject);
		});
	}
}
