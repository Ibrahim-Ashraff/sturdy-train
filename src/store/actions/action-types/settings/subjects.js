import { subjectContants } from '../../../../constants';

const {
  GET_SUBJECT_REQUESTING,
  GET_SUBJECT_SUCCESS,
  GET_SUBJECT_FAIL,

  ADD_SUBJECT_REQUESTING,
  ADD_SUBJECT_SUCCESS,
  ADD_SUBJECT_FAIL,

  EDIT_SUBJECT_REQUESTING,
  EDIT_SUBJECT_SUCCESS,
  EDIT_SUBJECT_FAIL,

  DELETE_SUBJECT_REQUESTING,
  DELETE_SUBJECT_SUCCESS,
  DELETE_SUBJECT_FAIL,

  CLEAR_SUBJECT_ERRORS

} = subjectContants;

export const getSubjectsRequesting = () => {
  return dispatch => {
    dispatch({
      type: GET_SUBJECT_REQUESTING
    });
  }
}

export const getSubjectsSuccess = subjects => {
  return dispatch => {
    dispatch({
      type: GET_SUBJECT_SUCCESS,
      subjects: subjects
    });
  }
}

export const getSubjectsFail = message => {
  return dispatch => {
    dispatch({
      type: GET_SUBJECT_FAIL,
      error: message
    });
  }
}

export const addSubjectRequesting = () => {
  return dispatch => {
    dispatch({
      type: ADD_SUBJECT_REQUESTING
    });
  }
}

export const addSubjectSuccess = () => {
  return dispatch => {
    dispatch({
      type: ADD_SUBJECT_SUCCESS
    });
  }
}

export const addSubjectFail = message => {
  return dispatch => {
    dispatch({
      type: ADD_SUBJECT_FAIL,
      error: message
    });
  }
}

export const editSubjectRequesting = () => {
  return dispatch => {
    dispatch({
      type: EDIT_SUBJECT_REQUESTING
    });
  }
}

export const editSubjectSuccess = () => {
  return dispatch => {
    dispatch({
      type: EDIT_SUBJECT_SUCCESS
    });
  }
}

export const editSubjectFail = message => {
  return dispatch => {
    dispatch({
      type: EDIT_SUBJECT_FAIL,
      error: message
    });
  }
}

export const deleteSubjectRequesting = () => {
  return dispatch => {
    dispatch({
      type: DELETE_SUBJECT_REQUESTING
    });
  }
}

export const deleteSubjectSuccess = () => {
  return dispatch => {
    dispatch({
      type: DELETE_SUBJECT_SUCCESS
    });
  }
}

export const deleteSubjectFail = message => {
  return dispatch => {
    dispatch({
      type: DELETE_SUBJECT_FAIL,
      error: message
    });
  }
}

export const clearSubjectErrors = () => {
  return dispatch => {
    dispatch({ type: CLEAR_SUBJECT_ERRORS });
  }
}