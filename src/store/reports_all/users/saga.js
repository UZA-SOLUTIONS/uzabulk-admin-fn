import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Crypto Redux States
import { GET_CUSTOMERS_REPORTS } from "./actionTypes"
import {
  getCustomer_Reports_Success,
  getCustomer_Reports_Fail,
} from "./actions"

import { getCustomerReports } from "helpers/backend_helper"

function* fetchCustomerReports(data) {
  try {
    const response = yield call(getCustomerReports, data.data)
    yield put(getCustomer_Reports_Success(response.data))
    return response
  } catch (error) {
    yield put(getCustomer_Reports_Fail(error))
  }
}

function* CustomerSaga() {
  yield takeEvery(GET_CUSTOMERS_REPORTS, fetchCustomerReports)
}

export default CustomerSaga
