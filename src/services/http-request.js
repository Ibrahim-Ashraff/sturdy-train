import axios from 'axios';
import Auth from '../components/Auth/Auth';

/**
 * type (string)
 * headers (object)
 * body (object)
 * url (string)
 * timeout (milliseconds) 
 * accessToken (boolean)
 * refreshToken (boolean)
 */
export const HttpRequest = (method, dataObj, url, timeout, accessToken) => {
  let headers = {};
  if (accessToken === true) {
    headers = {
      'Authorization': `${Auth().accessToken}`,
    }
  }

  return axios({
    method: method,
    url: url,
    data: dataObj,
    timeout: timeout,
    headers: headers
  });
}

export const formatNetworkError = (error, timeout) => {
  if (error === `timeout of ${timeout}ms exceeded`)
    return 'Looks like the server is taking too long to respond, please try again in sometime.';
  else
    return error
}

export default HttpRequest;