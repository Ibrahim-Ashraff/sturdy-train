import { houseContants } from "../../../../constants";

const {
  GET_HOUSE_REQUESTING,
  GET_HOUSE_SUCCESS,
  GET_HOUSE_FAIL,

  ADD_HOUSE_REQUESTING,
  ADD_HOUSE_SUCCESS,
  ADD_HOUSE_FAIL,

  EDIT_HOUSE_REQUESTING,
  EDIT_HOUSE_SUCCESS,
  EDIT_HOUSE_FAIL,

  DELETE_HOUSE_REQUESTING,
  DELETE_HOUSE_SUCCESS,
  DELETE_HOUSE_FAIL,

  CLEAR_ERRORS,
} = houseContants;

export const getHousesRequesting = () => {
  return (dispatch) => {
    dispatch({
      type: GET_HOUSE_REQUESTING,
    });
  };
};

export const getHousesSuccess = (houses) => {
  return (dispatch) => {
    dispatch({
      type: GET_HOUSE_SUCCESS,
      houses: houses,
    });
  };
};

export const getHousesFail = (message) => {
  return (dispatch) => {
    dispatch({
      type: GET_HOUSE_FAIL,
      error: message,
    });
  };
};

export const addHousesRequesting = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_HOUSE_REQUESTING,
    });
  };
};

export const addHousesSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_HOUSE_SUCCESS,
    });
  };
};

export const addHousesFail = (message) => {
  return (dispatch) => {
    dispatch({
      type: ADD_HOUSE_FAIL,
      error: message,
    });
  };
};

export const editHousesRequesting = () => {
  return (dispatch) => {
    dispatch({
      type: EDIT_HOUSE_REQUESTING,
    });
  };
};

export const editHousesSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: EDIT_HOUSE_SUCCESS,
    });
  };
};

export const editHousesFail = (message) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_HOUSE_FAIL,
      error: message,
    });
  };
};

export const deleteHousesRequesting = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_HOUSE_REQUESTING,
    });
  };
};

export const deleteHousesSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_HOUSE_SUCCESS,
    });
  };
};

export const deleteHousesFail = (message) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_HOUSE_FAIL,
      error: message,
    });
  };
};

export const clearHouseErrors = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
};
