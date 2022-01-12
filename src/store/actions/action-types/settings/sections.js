import { sectionContants } from "../../../../constants";

const {
  GET_SECTION_REQUESTING,
  GET_SECTION_SUCCESS,
  GET_SECTION_FAIL,

  ADD_SECTION_REQUESTING,
  ADD_SECTION_SUCCESS,
  ADD_SECTION_FAIL,

  EDIT_SECTION_REQUESTING,
  EDIT_SECTION_SUCCESS,
  EDIT_SECTION_FAIL,

  DELETE_SECTION_REQUESTING,
  DELETE_SECTION_SUCCESS,
  DELETE_SECTION_FAIL,

  CLEAR_ERRORS,
} = sectionContants;

export const getSectionsRequesting = () => {
  return (dispatch) => {
    dispatch({
      type: GET_SECTION_REQUESTING,
    });
  };
};

export const getSectionsSuccess = (sections) => {
  return (dispatch) => {
    dispatch({
      type: GET_SECTION_SUCCESS,
      sections: sections,
    });
  };
};

export const getSectionsFail = (message) => {
  return (dispatch) => {
    dispatch({
      type: GET_SECTION_FAIL,
      error: message,
    });
  };
};

export const addSectionsRequesting = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_SECTION_REQUESTING,
    });
  };
};

export const addSectionsSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_SECTION_SUCCESS,
    });
  };
};

export const addSectionsFail = (message) => {
  return (dispatch) => {
    dispatch({
      type: ADD_SECTION_FAIL,
      error: message,
    });
  };
};

export const editSectionsRequesting = () => {
  return (dispatch) => {
    dispatch({
      type: EDIT_SECTION_REQUESTING,
    });
  };
};

export const editSectionsSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: EDIT_SECTION_SUCCESS,
    });
  };
};

export const editSectionsFail = (message) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_SECTION_FAIL,
      error: message,
    });
  };
};

export const deleteSectionsRequesting = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_SECTION_REQUESTING,
    });
  };
};

export const deleteSectionsSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_SECTION_SUCCESS,
    });
  };
};

export const deleteSectionsFail = (message) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_SECTION_FAIL,
      error: message,
    });
  };
};

export const clearSectionErrors = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
};
