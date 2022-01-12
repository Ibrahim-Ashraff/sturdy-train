import { classContants } from "../../../../constants";

const {
  GET_CLASS_REQUESTING,
  GET_CLASS_SUCCESS,
  GET_CLASS_FAIL,

  ADD_CLASS_REQUESTING,
  ADD_CLASS_SUCCESS,
  ADD_CLASS_FAIL,

  EDIT_CLASS_REQUESTING,
  EDIT_CLASS_SUCCESS,
  EDIT_CLASS_FAIL,

  DELETE_CLASS_REQUESTING,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_FAIL,

  CLEAR_ERRORS,
} = classContants;

export const getClassesRequesting = () => {
  return (dispatch) => {
    dispatch({
      type: GET_CLASS_REQUESTING,
    });
  };
};

export const getClassesSuccess = (classes, sections) => {
  return (dispatch) => {
    dispatch({
      type: GET_CLASS_SUCCESS,
      classes: classes,
      sections: sections,
    });
  };
};

export const getClassesFail = (message) => {
  return (dispatch) => {
    dispatch({
      type: GET_CLASS_FAIL,
      error: message,
    });
  };
};

export const addClassesRequesting = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_CLASS_REQUESTING,
    });
  };
};

export const addClassesSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_CLASS_SUCCESS,
    });
  };
};

export const addClassesFail = (message) => {
  return (dispatch) => {
    dispatch({
      type: ADD_CLASS_FAIL,
      error: message,
    });
  };
};

export const editClassesRequesting = () => {
  return (dispatch) => {
    dispatch({
      type: EDIT_CLASS_REQUESTING,
    });
  };
};

export const editClassesSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: EDIT_CLASS_SUCCESS,
    });
  };
};

export const editClassesFail = (message) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_CLASS_FAIL,
      error: message,
    });
  };
};

export const deleteClassesRequesting = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CLASS_REQUESTING,
    });
  };
};

export const deleteClassesSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CLASS_SUCCESS,
    });
  };
};

export const deleteClassesFail = (message) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CLASS_FAIL,
      error: message,
    });
  };
};

export const clearClassErrors = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
};
