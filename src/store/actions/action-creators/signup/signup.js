import { path } from '../../../../constants';
import HttpRequest from '../../../../services/http-request';

import {
  signupInitiationSuccess,
  signupInitiationFail,
  signupReset
} from '../../action-types';

const timeout = 10000;

export const signupInitiation = (code) => {
  return async dispatch => {

    dispatch(signupReset());

    try {

      const requestPayload = {
        code: code,
      }

      let httpResponse = await HttpRequest('POST', requestPayload, path.verify, timeout);

      if (httpResponse) {

        let statusCode = httpResponse.data.status;
        let response = httpResponse.data.certificate;
        // let message = response.info;

        if (statusCode && statusCode === 200) {
          dispatch(signupInitiationSuccess(response));

        } else {
          // dispatch(signupInitiationFail(errors));
        }
      }

    } catch (error) {

      let message = "no certificate found"
      dispatch(signupInitiationFail(message));
    }
  }
}
