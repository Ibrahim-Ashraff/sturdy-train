import { guardianDashboardConstants } from "../../../../constants";

const {
  GET_TOTAL_FEES_REQUESTING,
  GET_TOTAL_FEES_SUCCESS,
  GET_TOTAL_FEES_FAIL,

  CLEAR_ERRORS,
} = guardianDashboardConstants;

export const getTotalFeesRequesting = () => {
  return (dispatch) => {
    dispatch({
      type: GET_TOTAL_FEES_REQUESTING,
    });
  };
};

export const getTotalFeesSuccess = (fees) => {
  return (dispatch) => {
    dispatch({
      type: GET_TOTAL_FEES_SUCCESS,
      fees: fees,
    });
  };
};

export const getTotalFeesFail = (message) => {
  return (dispatch) => {
    dispatch({
      type: GET_TOTAL_FEES_FAIL,
      error: message,
    });
  };
};

export const clearFeeErrors = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
};
