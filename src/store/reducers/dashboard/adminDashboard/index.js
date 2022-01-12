import { adminDashboardConstants } from '../../../../constants/';

const {
  GET_ADMIN_DASHBOARD_REQUESTING,
  GET_ADMIN_DASHBOARD_SUCCESS,
  GET_ADMIN_DASHBOARD_FAIL
} = adminDashboardConstants;

const initialState = {
  getAdminDashboardIsRequesting: false,
  adminDashboardData: null,
  getAdminDashboardFail: null
}

const adminDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN_DASHBOARD_REQUESTING:
      return {
        getAdminDashboardIsRequesting: true
      }
    case GET_ADMIN_DASHBOARD_SUCCESS:
      return {
        getAdminDashboardIsRequesting: false,
        adminDashboardData: action.adminDashboardData
      }
    case GET_ADMIN_DASHBOARD_FAIL:
      return {
        getAdminDashboardIsRequesting: false,
        getAdminDashboardFail: action.error
      }
    default:
      return state;
  }
}

export default adminDashboardReducer;