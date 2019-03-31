

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
    endpoint: '/movies.json',
  };