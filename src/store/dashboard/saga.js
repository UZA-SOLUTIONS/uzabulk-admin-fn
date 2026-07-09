import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_DASHBOARD_REPORTS,
  GET_DASHBOARD_REPORTS_SUCCESS,
  GET_DASHBOARD_REPORTS_FAIL,
} from "./actionTypes"
import { dashboardSuccess, dashboardFail } from "./actions"

import { getDashboard } from "helpers/backend_helper"

function* fetchDashboard(data) {
  console.log(data, 656656)
  try {
    const response = yield call(getDashboard, data.data)
    yield put(dashboardSuccess(response.data))
    return response
  } catch (error) {
    console.log("first111", error)
    yield put(dashboardFail(error))
  }
}

function* DashboardSaga() {
  yield takeEvery(GET_DASHBOARD_REPORTS, fetchDashboard)
}

export default DashboardSaga
