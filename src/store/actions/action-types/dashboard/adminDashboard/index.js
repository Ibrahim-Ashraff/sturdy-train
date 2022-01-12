import { adminDashboardConstants } from '../../../../../constants';

const {
  GET_ADMIN_DASHBOARD_REQUESTING,
  GET_ADMIN_DASHBOARD_SUCCESS,
  GET_ADMIN_DASHBOARD_FAIL
} = adminDashboardConstants;

export const adminDashboardIsRequesting = () => {
  return dispatch => {
    dispatch({
      type: GET_ADMIN_DASHBOARD_REQUESTING
    })
  }
}

export const adminDashboardSuccess = adminDashboardData => {
  return dispatch => {
    dispatch({
      type: GET_ADMIN_DASHBOARD_SUCCESS,
      adminDashboardData: adminDashboardData
    });
  }
}

export const adminDashboardFail = error => {
  return dispatch => {
    dispatch({
      type: GET_ADMIN_DASHBOARD_FAIL
    });
  }
}