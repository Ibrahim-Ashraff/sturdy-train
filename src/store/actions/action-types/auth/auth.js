import { authContants } from "../../../../constants";

const { AUTHENTICATE, AUTH_START, AUTH_ERROR, AUTH_CLEAR, AUTH_TIMEOUT } =
  authContants;

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const sessionInfo = localStorage.getItem("session_info");
    if (!sessionInfo) {
      dispatch(logout());
    } else {
      const parseSessionInfo = JSON.parse(sessionInfo);
      dispatch(authenticate(parseSessionInfo?.token, parseSessionInfo?.user));
    }
  };
};

export const authenticate = (token, user) => {

  return {
    type: AUTHENTICATE,
    token: {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    },
    user: {
      userId: user.userId,
      username: user.username,
      email: user.email,
      roles: user.roles,
      hasOnboarded: user.hasOnboarded
    },
  }
};

export const authError = message => {
  return {
    type: AUTH_ERROR,
    message: message,
  };
};

export const logout = (failedToGetRefreshToken = false) => {
  return (dispatch) => {
    localStorage.removeItem("session_info");

    if (failedToGetRefreshToken) {
      dispatch({
        type: AUTH_TIMEOUT,
      });
    } else {
      dispatch({
        type: AUTH_CLEAR,
      });
    }
  };
};
