import { path } from "../../../../../constants";
import HttpRequest from "../../../../../services/http-request";

import {
  adminDashboardIsRequesting,
  adminDashboardSuccess,
  adminDashboardFail
} from "../../../action-types/dashboard/adminDashboard";

export const getAdminDashboard = () => {
  return async dispatch => {

    dispatch(adminDashboardIsRequesting());

    try {
      let httpResponse = await HttpRequest(
        "GET",
        {},
        path.dashboard,
        10000,
        true
      );

      if (httpResponse) {
        let statusCode = httpResponse.data.meta.status;
        let response = httpResponse.data.meta;
        let data = httpResponse.data;
        let message = response.info;

        let adminDashboardData = data.data;


        if (statusCode && statusCode === "200") {
          dispatch(adminDashboardSuccess(adminDashboardData));
        } else {
          dispatch(adminDashboardFail(message));
        }
      }
    } catch (error) {
      let errorMessage =
        error.response && error.response.data && error.response.data.meta
          ? error.response.data.meta.info
          : error.message === "timeout of 10000ms exceeded"
            ? "Network timeout"
            : error.message;
      dispatch(adminDashboardFail(errorMessage));
    }
  }
}