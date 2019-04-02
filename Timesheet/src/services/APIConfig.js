/*
Format of API endpoints
export const Tracker_COUNTRY_CODE = {
  method: GET,
  app: APPNAME (if needed in API),
  version: VERSION (if needed in API),
  endpoint: '/internationalDialingCode',
};

export const Tracker_LOGIN = {
  method: POST,
  app: APPNAME (if needed in API),
  version: VERSION (if needed in API),
  endpoint: '/login',
};
*/

// Request types
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const PATCH = 'PATCH';
//API config with request method, end points
export const SampleAPI = {
	method: GET,
	endpoint: '/movies.json'
};

export const LoginAPI = {
	method: POST,
	endpoint: '/api/auth/login'
};

export const GetCustomerAPI = {
	method: GET,
	endpoint: '/api/customers'
};

export const GetProjectAPI = {
	method: GET,
	endpoint: '/api/projects'
};

export const GetActivitiesAPI = {
	method: POST,
	endpoint: '/api/activities'
};

export const SERVER_HEADER_KEYS_ACCEPT = 'Accept';
export const SERVER_HEADER_KEYS_CONTENT_TYPE = 'Content-Type';

// Server Constants
export const DEFAULT_ACCEPT_HEADER = 'application/json';
export const DEFAULT_CONTENT_TYPE = 'application/json; charset=UTF-8';

export const DEFAULT_AUTHORiZATION = 'Authorization';
