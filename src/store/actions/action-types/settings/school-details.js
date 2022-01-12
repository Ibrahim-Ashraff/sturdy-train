import { schoolDetailsConstants } from '../../../../constants';

const {
  SCHOOL_DETAILS_REQUESTING,
  SCHOOL_DETAILS_SUCCESS,
  SCHOOL_DETAILS_FAIL,

  EDIT_SCHOOL_DETAILS_REQUESTING,
  EDIT_SCHOOL_DETAILS_SUCCESS,
  EDIT_SCHOOL_DETAILS_FAIL,

  CLEAR_ERRORS

} = schoolDetailsConstants;

export const getSchoolDetailsRequesting = () => {
  return dispatch => {
    dispatch({
      type: SCHOOL_DETAILS_REQUESTING
    });
  }
}

export const getSchoolDetailsSuccess = school => {
  return dispatch => {
    dispatch({
      type: SCHOOL_DETAILS_SUCCESS,
      school: school
    });
  }
}

export const getSchoolDetailsFail = message => {
  return dispatch => {
    dispatch({
      type: SCHOOL_DETAILS_FAIL,
      error: message
    });
  }
}

export const editSchoolDetailsRequesting = () => {
  return dispatch => {
    dispatch({
      type: EDIT_SCHOOL_DETAILS_REQUESTING
    });
  }
}

export const editSchoolDetailsSuccess = () => {
  return dispatch => {
    dispatch({
      type: EDIT_SCHOOL_DETAILS_SUCCESS
    });
  }
}

export const editSchoolDetailsFail = message => {
  return dispatch => {
    dispatch({
      type: EDIT_SCHOOL_DETAILS_FAIL,
      error: message
    });
  }
}

export const clearErrors = () => {
  return dispatch => {
    dispatch({ type: CLEAR_ERRORS })
  }
}