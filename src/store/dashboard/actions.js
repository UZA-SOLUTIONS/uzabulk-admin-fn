import {
  GET_DASHBOARD_REPORTS,
  GET_DASHBOARD_REPORTS_SUCCESS,
  GET_DASHBOARD_REPORTS_FAIL,
} from "./actionTypes"

export const dashboardReports = data => {
  return (
    console.log("data111", data),
    {
      type: GET_DASHBOARD_REPORTS,
      data,
    }
  )
}

export const dashboardSuccess = domain => ({
  type: GET_DASHBOARD_REPORTS_SUCCESS,
  payload: domain,
})

export const dashboardFail = error => ({
  type: GET_DASHBOARD_REPORTS_FAIL,
  payload: error,
})
