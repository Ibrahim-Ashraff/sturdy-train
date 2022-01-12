import { path } from '../../../../constants';
import {
  authStart,
  authenticate,
  authError,
  logout
} from '../../action-types';
import HttpRequest from '../../../../services/http-request';

let timer;

export const logIn = (email, password) => {

  return async dispatch => {

    dispatch(authStart());

    try {
      const requestPayload = {
        email: email,
        password: password

      }

      let httpResponse = await HttpRequest('POST', requestPayload, path.auth, 10000);

      let sessionInfo;

      if (httpResponse) {


        let statusCode = await httpResponse.data.status;
        let response = await httpResponse.data.user;

        console.log("status", statusCode)
        if (statusCode && statusCode === 200) {
          let accessToken = httpResponse.data.token;
          // let refreshToken = response.data.refresh_token;
          let userId = response.id;
          let roles = response.role;
          let email = response.email;
          let username = response.firstName + " " + response.lastName;

          sessionInfo = {
            token: {
              accessToken: accessToken,
            },
            user: {
              userId: userId,
              username: username,
              email: email,
              roles: roles,
            }
          }

          console.log("session info", sessionInfo)

          // Save to local storage
          localStorage.setItem('session_info', JSON.stringify(sessionInfo));
          // Dispatches
          dispatch(authenticate(sessionInfo.token, sessionInfo.user));
          // dispatch(accessTokenTimer(300000, accessToken));
        }
      }

      return sessionInfo;

    } catch (error) {
      // let errorMessage = (error.response && error.response.data && error.response.data.meta) ? error.response.data.meta.info : error.message === "timeout of 10000ms exceeded" ? 'Network timeout' : error.message;
      dispatch(authError(error));
    }
  }
}

const clearAccessTokenTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
}

export const authTimer = () => {
  // return dispatch => {
  //   dispatch(getAuthTimer(timer));
  // }
  return null
}



export const accessTokenTimer = (expirationTime, accessToken) => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(getNewAccessToken(accessToken));
    }, expirationTime);
  }
}

const getNewAccessToken = accessToken => {

  return async dispatch => {

    clearAccessTokenTimer();

    try {
      const requestPayload = {
        meta: {
          source: 'web'
        },
        data: {
          expired_token: accessToken
        }
      }

      let httpResponse = await HttpRequest('POST', requestPayload, path.refreshToken, 10000, false, true);

      let updatedSessionInfo = {};


      if (httpResponse) {

        let statusCode = await httpResponse.data.meta.status;
        let response = await httpResponse.data;

        if (statusCode && statusCode === "200") {
          let accessToken = response.data.access_token;
          let refreshToken = response.data.refresh_token;
          let userId = response.data.user_id;
          let roles = response.data.roles;

          // Update session_info in local storage
          const sessionInfo = localStorage.getItem('session_info');
          const parsedSessionInfo = sessionInfo ? JSON.parse(sessionInfo) : {};

          const newSessionInfo = {
            token: {
              accessToken: accessToken,
              refreshToken: refreshToken
            },
            user: {
              userId: userId,
              roles: roles,
              username: parsedSessionInfo.user.username,
              email: parsedSessionInfo.user.email,
              hasOnboarded: parsedSessionInfo.user.hasOnboarded
            }
          }

          // Save back to localStorage
          localStorage.setItem('session_info', JSON.stringify(newSessionInfo));

          // Dispatches
          dispatch(authenticate(newSessionInfo.token, newSessionInfo.user));
        }
      }

      return updatedSessionInfo;

    } catch (error) {
      let errorMessage = (error.response && error.response.data && error.response.data.meta) ? error.response.data.meta.info : error.message === "timeout of 10000ms exceeded" ? 'Network timeout' : error.message;
      dispatch(authError(errorMessage));
      dispatch(logout(true));
    }
  }

}