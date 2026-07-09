import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_ORDERS_REPORTS,
  GET_ORDERS_REPORTS_SUCCESS,
  GET_ORDERS_REPORTS_FAIL,
} from "./actionTypes"
import {
  getOrder_Reports,
  getOrder_Reports_Success,
  getOrder_Reports_Fail,
} from "./actions"

import { getOrderReports } from "helpers/backend_helper"

function* fetchOrderReports(data) {
  console.log(data, 656656)
  try {
    const response = yield call(getOrderReports, data.data)
    yield put(getOrder_Reports_Success(response.data))
    return response
  } catch (error) {
    yield put(getOrder_Reports_Fail(error))
  }
}

function* OrderSaga() {
  yield takeEvery(GET_ORDERS_REPORTS, fetchOrderReports)
}

export default OrderSaga
