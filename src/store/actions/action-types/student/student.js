import { studentContants } from '../../../../constants';

const {
  GET_STUDENTS_REQUESTING,
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_FAIL,

  GET_STUDENT_REQUESTING,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_FAIL,

  ADD_STUDENT_REQUESTING,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAIL,

  GET_CERTIFICATES_REQUESTING,
  GET_CERTIFICATES_SUCCESS,
  GET_CERTIFICATES_FAIL,

  ADD_CERTIFICATE_REQUESTING,
  ADD_CERTIFICATE_SUCCESS,
  ADD_CERTIFICATE_FAIL,

  EDIT_STUDENT_REQUESTING,
  EDIT_STUDENT_SUCCESS,
  EDIT_STUDENT_FAIL,

  DELETE_STUDENT_REQUESTING,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAIL,

  CLEAR_STUDENT_ERRORS,
  RESET_ADD_STUDENT

} = studentContants;

export const getStudentsRequesting = () => {
  return dispatch => {
    dispatch({
      type: GET_STUDENTS_REQUESTING
    });
  }
}

export const getStudentsSuccess = (students) => {
  return dispatch => {
    dispatch({
      type: GET_STUDENTS_SUCCESS,
      students: students,
    });
  }
}

export const getStudentsFail = message => {
  return dispatch => {
    dispatch({
      type: GET_STUDENTS_FAIL,
      error: message
    });
  }
}

export const getCertificatesRequesting = () => {
  return dispatch => {
    dispatch({
      type: GET_CERTIFICATES_REQUESTING
    });
  }
}

export const getCertificatesSuccess = (certificates) => {
  return dispatch => {
    dispatch({
      type: GET_CERTIFICATES_SUCCESS,
      certificates: certificates,
    });
  }
}

export const getCertificatesFail = message => {
  return dispatch => {
    dispatch({
      type: GET_CERTIFICATES_FAIL,
      error: message
    });
  }
}

export const getStudentFail = message => {
  return dispatch => {
    dispatch({
      type: GET_STUDENT_FAIL,
      error: message
    });
  }
}

export const getStudentRequesting = () => {
  return dispatch => {
    dispatch({
      type: GET_STUDENT_REQUESTING
    });
  }
}

export const getStudentSuccess = (student) => {
  return dispatch => {
    dispatch({
      type: GET_STUDENT_SUCCESS,
      student: student,

    });
  }
}

export const addStudentRequesting = () => {
  return dispatch => {
    dispatch({
      type: ADD_STUDENT_REQUESTING
    });
  }
}

export const addStudentSuccess = () => {
  return dispatch => {
    dispatch({
      type: ADD_STUDENT_SUCCESS
    });
  }
}

export const addStudentFail = message => {
  return dispatch => {
    dispatch({
      type: ADD_STUDENT_FAIL,
      error: message
    });
  }
}

export const addCertificateRequesting = () => {
  return dispatch => {
    dispatch({
      type: ADD_CERTIFICATE_REQUESTING
    });
  }
}

export const addCertificateSuccess = () => {
  return dispatch => {
    dispatch({
      type: ADD_CERTIFICATE_SUCCESS
    });
  }
}

export const addCertificateFail = message => {
  return dispatch => {
    dispatch({
      type: ADD_CERTIFICATE_FAIL,
      error: message
    });
  }
}

export const editStudentRequesting = () => {
  return dispatch => {
    dispatch({
      type: EDIT_STUDENT_REQUESTING
    });
  }
}

export const editStudentSuccess = () => {
  return dispatch => {
    dispatch({
      type: EDIT_STUDENT_SUCCESS
    });
  }
}

export const editStudentFail = message => {
  return dispatch => {
    dispatch({
      type: EDIT_STUDENT_FAIL,
      error: message
    });
  }
}

export const deleteStudentRequesting = () => {
  return dispatch => {
    dispatch({
      type: DELETE_STUDENT_REQUESTING
    });
  }
}

export const deleteStudentSuccess = () => {
  return dispatch => {
    dispatch({
      type: DELETE_STUDENT_SUCCESS
    });
  }
}

export const deleteStudentFail = message => {
  return dispatch => {
    dispatch({
      type: DELETE_STUDENT_FAIL,
      error: message
    });
  }
}

export const clearStudentErrors = () => {
  return dispatch => {
    dispatch({ type: CLEAR_STUDENT_ERRORS });
  }
}

export const resetAddStudent = () => {
  return dispatch => {
    dispatch({ type: RESET_ADD_STUDENT });
  }
}