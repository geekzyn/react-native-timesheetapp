import Utils from '../utils/Utils';

export default class Requests {
    /**
     * Actual method to perform web service requests. Promise based.
     * @param {String} URI
     * @param {Object} header
     * @param {String} method
     * @param {Object} body
     */
    static send(URI, method, body) {
        const MILLISECONDS = 30000;

        const request = Requests.requestBuilder(method, body);
        console.log(request);
        return Requests.handleTimeOut(MILLISECONDS, fetch(URI, request))
            .then(response => Requests.processResponse(response))
            .catch(error => {
                console.log(error);
                Requests.processResponse({
                    handledError: error
                }, true)
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
                    if (!response.handledError.status) {
                        const selectedLocale = await AppAsyncStorage.getValue(AsyncStorageKeys.selectedlocale);
                        const locale = new Locale(selectedLocale);
                        let message = locale.strings ? locale.strings.NETWORK_ERROR : message;
                        if (response.handledError.status) {
                            message = locale.strings ? locale.strings.SERVER_ERROR : message;
                        }
                        return reject(new Error(message));
                    }
                }
                return reject(response.handledError);
            }

            return resolve(JSON.parse(response._bodyInit));
            //   const resObj = { ...ResponseValidator.validateResponse(response) };
            //   console.log(resObj);
            //     return response.data
            //       .json()
            //       .then((parsedJSON) => {
            //         resObj.data = parsedJSON;
            //         return resolve(response);
            //       })
            //       .catch(err => reject(err));
        });
    }

    /**
     * Builds the request by adding body and headers based on the type of request
     * @param {Object} header - object with KVP to be added as headers in the web request
     * @param {String} method - type of web request
     * @param {Object} body - object with KVP to be added as body in the web request
     */
    static requestBuilder(method, body) {
        const options = {};
        // leaving scope for more modifications if needed...
        options.method = method;

        if (method !== 'GET') {
            options.body = JSON.stringify(body);
        }
        // options.headers = header;

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
                reject(new Error('Connection timed out. Please try again, later.'));
            }, milliseconds);

            promise.then(resolve, reject);
        });
    }
}