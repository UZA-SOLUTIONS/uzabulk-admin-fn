import { takeEvery, call, put, takeLatest } from "redux-saga/effects"
import toastr from "toastr"

import {
  getDispatch,
  postRequestDriver,
  getDispatchRequests,
  putAssigndriver,
  postDispatchRequest,
  getDispatchFare,
} from "helpers/backend_helper"

import {
  getDispatchSuccess,
  getDispatchFail,
  postRequestDriversSuccess,
  postRequestDriversFail,
  getDispatchRequestsFail,
  getDispatchRequestsSuccess,
  putAssignDriverFail,
  putAssignDriverSuccess,
  postDispatchRequestFail,
  postDispatchRequestSuccess,
  getDispatchFareFail,
  getDispatchFareSuccess,
} from "./actions"

import {
  GET_DISPATCH,
  POST_REQUEST_DRIVERS,
  GET_DISPATCH_REQUESTS,
  PUT_ASSIGN_DRIVER,
  POST_DISPATCH_REQUEST,
  GET_DISPATCH_FARE,
} from "./actionTypes"

function* onGetDispatch() {
  try {
    const response = yield call(getDispatch)

    if (response.status == "failure") {
      return yield put(getDispatchFail(response.message))
    }

    yield put(getDispatchSuccess(response.data))
  } catch (error) {
    console.log("error")
    yield put(getDispatchFail(error))
  }
}
function* onPostRequestDrivers({ payload }) {
  try {
    const response = yield call(postRequestDriver, payload)

    if (response.status == "failure") {
      return yield put(postRequestDriversFail(response.message))
    }

    yield put(postRequestDriversSuccess(response))
  } catch (error) {
    console.log("error saga")
    yield put(postRequestDriversFail(error))
  }
}
function* onGetDispatchRequests({ payload: { data, callback } }) {
  try {
    const response = yield call(getDispatchRequests, data)

    if (response.status == "failure") {
      return yield put(getDispatchRequestsFail(response.message))
    }

    callback && callback(response)

    yield put(getDispatchRequestsSuccess(response))
  } catch (error) {
    yield put(getDispatchRequestsFail(error))
  }
}

function* onPutAssignDriver({ payload: { id, data, callback } }) {
  try {
    const response = yield call(putAssigndriver, id, data)

    if (response.status == "failure") {
      toastr.error(response.message)

      return yield put(putAssignDriverFail(response.message))
    }

    callback && callback()
    yield put(putAssignDriverSuccess(response))
  } catch (error) {
    console.log("not working")
    yield put(putAssignDriverFail(error))
  }
}

function* onPostDispatchRequest({ payload: { data, callback } }) {
  try {
    const response = yield call(postDispatchRequest, data)

    if (response.status == "failure") {
      toastr.error(response.message)

      return yield put(postDispatchRequestFail(response.message))
    }

    callback && callback()
    yield put(postDispatchRequestSuccess(response.data))
  } catch (error) {
    console.log("error")
    yield put(postDispatchRequestFail(""))
  }
}

function* onGetDispatchFare({ payload: { data, callback } }) {
  try {
    const response = yield call(getDispatchFare, data)

    if (response.status == "failure") {
      toastr.error(response.message)

      return yield put(getDispatchFareFail(response.message))
    }

    callback && callback(response)
    yield put(getDispatchFareSuccess(response.data))
  } catch (error) {
    console.log("error")
    yield put(getDispatchFareFail(""))
  }
}

function* DispatchSaga() {
  yield takeEvery(GET_DISPATCH, onGetDispatch)
  yield takeEvery(POST_REQUEST_DRIVERS, onPostRequestDrivers)
  yield takeEvery(GET_DISPATCH_REQUESTS, onGetDispatchRequests)
  yield takeEvery(PUT_ASSIGN_DRIVER, onPutAssignDriver)
  yield takeLatest(POST_DISPATCH_REQUEST, onPostDispatchRequest)
  yield takeLatest(GET_DISPATCH_FARE, onGetDispatchFare)
}

export default DispatchSaga
