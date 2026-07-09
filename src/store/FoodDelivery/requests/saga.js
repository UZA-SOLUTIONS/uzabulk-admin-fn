import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects"

// Food Delivery Requests Redux States
import {
  GET_FD_REQUESTS,
  GET_FD_REQUEST,
  POST_ACCEPT_FD_REQUEST,
  POST_REJECT_FD_REQUEST,
  POST_READY_FD_REQUEST,
  POST_COMPLETE_FD_REQUEST,
  POST_CANCELLED_FD_REQUEST,
} from "./actionTypes"
import {
  getFdRequestsFail,
  getFdPendingRequestsSuccess,
  getFdConfirmedRequestsSuccess,
  getFdCompletedRequestsSuccess,
  getFdRejectedRequestsSuccess,
  getFdCancelledRequestsSuccess,
  getFdRequestFail,
  getFdRequestSuccess,
  postAcceptFdRequestFail,
  postAcceptFdRequestSuccess,
  postRejectFdRequestFail,
  postRejectFdRequestSuccess,
  postReadyFdRequestFail,
  postReadyFdRequestSuccess,
  postCompleteFdRequestFail,
  postCompleteFdRequestSuccess,
  postCancelledFdRequestSuccess,
  postCancelledFdRequestFail,
} from "./actions"

import {
  getFdOrders,
  getFdOrder,
  postAcceptFdOrder,
  postRejectFdOrder,
  postReadyFdOrder,
  postCompleteFdOrder,
  postCancelledFdOrder,
} from "helpers/backend_helper"

function* fetchFdRequests({ payload: { status, data } }) {
  try {
    const response = yield call(getFdOrders, data, "")

    if (response.status == "failure") {
      return yield put(getFdRequestsFail(response.message))
    }

    if (status === "pending") {
      yield put(getFdPendingRequestsSuccess(response))
    } else if (status === "confirmed") {
      yield put(getFdConfirmedRequestsSuccess(response))
    } else if (status === "completed") {
      yield put(getFdCompletedRequestsSuccess(response))
    } else if (status === "rejected") {
      yield put(getFdRejectedRequestsSuccess(response))
    } else if (status === "cancelled") {
      yield put(getFdCancelledRequestsSuccess(response))
    }
  } catch (error) {
    yield put(getFdRequestsFail(error))
  }
}

function* fetchFdRequest({ payload }) {
  try {
    const response = yield call(getFdOrder, payload)

    if (response.status == "failure") {
      return yield put(getFdRequestFail(response.message))
    }

    yield put(getFdRequestSuccess(response.data))
  } catch (error) {
    yield put(getFdRequestFail(error))
  }
}

function* onPostAcceptFdRequest({ payload: { data, callback } }) {
  try {
    let version

    const storeVersion = yield select(
      state => state.Settings?.settings?.storeVersion
    )

    if (storeVersion) {
      version = `/api/v` + storeVersion
    }

    const response = yield call(postAcceptFdOrder, data, version)

    if (response.status == "failure") {
      return yield put(postAcceptFdRequestFail(response.message))
    }

    callback && callback()
    yield put(postAcceptFdRequestSuccess(response.data))
  } catch (error) {
    yield put(postAcceptFdRequestFail(error))
  }
}

function* onPostRejectFdRequest({ payload: { data, callback } }) {
  try {
    let version

    const storeVersion = yield select(
      state => state.Settings?.settings?.storeVersion
    )

    if (storeVersion) {
      version = `/api/v` + storeVersion
    }

    const response = yield call(postRejectFdOrder, data, version)

    if (response.status == "failure") {
      return yield put(postRejectFdRequestFail(response.message))
    }

    callback && callback()
    yield put(postRejectFdRequestSuccess(response.data))
  } catch (error) {
    yield put(postRejectFdRequestFail(error))
  }
}

function* onPostReadyFdRequest({ payload: { data, callback } }) {
  try {
    let version

    const storeVersion = yield select(
      state => state.Settings?.settings?.storeVersion
    )

    if (storeVersion) {
      version = `/api/v` + storeVersion
    }

    const response = yield call(postReadyFdOrder, data, version)

    if (response.status == "failure") {
      return yield put(postReadyFdRequestFail(response.message))
    }

    callback && callback()
    yield put(postReadyFdRequestSuccess(response.data))
  } catch (error) {
    yield put(postReadyFdRequestFail(error))
  }
}

function* onPostCompleteFdRequest({ payload: { data, callback } }) {
  try {
    let version

    const storeVersion = yield select(
      state => state.Settings?.settings?.storeVersion
    )

    if (storeVersion) {
      version = `/api/v` + storeVersion
    }
    const response = yield call(postCompleteFdOrder, data, version)

    if (response.status == "failure") {
      return yield put(postCompleteFdRequestFail(response.message))
    }

    callback && callback()
    yield put(postCompleteFdRequestSuccess(response.data))
  } catch (error) {
    yield put(postCompleteFdRequestFail(error))
  }
}

function* onPostCancelledFdRequest({ payload: { data, callback } }) {
  try {
    let version

    const storeVersion = yield select(
      state => state.Settings?.settings?.storeVersion
    )

    if (storeVersion) {
      version = `/api/v` + storeVersion
    }
    const response = yield call(postCancelledFdOrder, data, version)
    console.log(response, "PPPPPPPPO");
    if (response.status == "failure") {
      return yield put(postCancelledFdRequestFail(response.message))
    }
    callback && callback()
    yield put(postCancelledFdRequestSuccess(response.data))

  } catch (error) {
    yield put(postCancelledFdRequestFail(error))
  }
}

function* FdRequestsSaga() {
  yield takeEvery(GET_FD_REQUESTS, fetchFdRequests)
  yield takeEvery(GET_FD_REQUEST, fetchFdRequest)
  yield takeLatest(POST_ACCEPT_FD_REQUEST, onPostAcceptFdRequest)
  yield takeLatest(POST_REJECT_FD_REQUEST, onPostRejectFdRequest)
  yield takeLatest(POST_READY_FD_REQUEST, onPostReadyFdRequest)
  yield takeLatest(POST_COMPLETE_FD_REQUEST, onPostCompleteFdRequest)
  yield takeLatest(POST_CANCELLED_FD_REQUEST, onPostCancelledFdRequest)
}

export default FdRequestsSaga
