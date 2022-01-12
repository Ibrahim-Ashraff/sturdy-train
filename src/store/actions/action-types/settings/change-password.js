import { changePasswordConstants } from '../../../../constants';

const {
  CHANGE_PASSWORD_REQUESTING,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,

  RESET_CHANGE_PASSWORD
} = changePasswordConstants;

export const changePasswordRequesting = () => {
  return dispatch => {
    dispatch({
      type: CHANGE_PASSWORD_REQUESTING
    });
  }
}

export const changePasswordSuccess = subjects => {
  return dispatch => {
    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      subjects: subjects
    });
  }
}

export const changePasswordFail = message => {
  return dispatch => {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      error: message
    });
  }
}

export const resetChangePassword = () => {
  return dispatch => {
    dispatch({
      type: RESET_CHANGE_PASSWORD
    });
  }
}