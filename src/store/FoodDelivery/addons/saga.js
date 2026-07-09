import { call, put, takeEvery } from "redux-saga/effects"

// Food Delivery Addons Redux States
import {
  GET_FD_ADDONS,
  ADD_FD_ADDON,
  GET_FD_ADDON,
  PUT_FD_ADDON,
  DELETE_FD_ADDON,
  PUT_FD_ADDONS_STATUS,
} from "./actionTypes"
import {
  getFdAddonsFail,
  getFdAddonsSuccess,
  addFdAddonFail,
  addFdAddonSuccess,
  getFdAddonFail,
  getFdAddonSuccess,
  putFdAddonFail,
  putFdAddonSuccess,
  deleteFdAddonFail,
  deleteFdAddonSuccess,
  putFdAddonsStatusFail,
  putFdAddonsStatusSuccess,
} from "./actions"

import {
  getFdAddons,
  postFdAddon,
  getFdAddon,
  putFdAddon,
  deleteFdAddon,
  putFdAddonsStatus,
} from "helpers/backend_helper"

function* fetchFdAddons({ payload }) {
  try {
    const response = yield call(getFdAddons, payload)

    if (response.status == "failure") {
      return yield put(getFdAddonsFail(response.message))
    }

    yield put(getFdAddonsSuccess(response))
  } catch (error) {
    yield put(getFdAddonsFail(error))
  }
}

function* onAddNewFdAddon({ payload: { fdAddon, history } }) {
  try {
    const response = yield call(postFdAddon, fdAddon)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addFdAddonFail(response.message))
    }

    history && history.goBack()

    yield put(addFdAddonSuccess())
  } catch (error) {
    yield put(addFdAddonFail("Internal Error!"))
  }
}

function* fetchFdAddon({ payload: { storeType, id } }) {
  try {
    const response = yield call(getFdAddon, storeType, id)

    if (response.status == "failure") {
      return yield put(getFdAddonFail(response.message))
    }

    yield put(getFdAddonSuccess(response.data))
  } catch (error) {
    yield put(getFdAddonFail(error))
  }
}

function* onPutFdAddon({ payload: { data, history } }) {
  try {
    const response = yield call(putFdAddon, data)

    if (response.status == "failure") {
      return yield put(putFdAddonFail(response.message))
    }

    history && history.goBack()

    yield put(putFdAddonSuccess())
  } catch (error) {
    yield put(putFdAddonFail("Internal Error!"))
  }
}

function* onDeleteFdAddon({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteFdAddon, data)

    if (response.status == "failure") {
      return yield put(deleteFdAddonFail(response.message))
    }

    yield put(deleteFdAddonSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteFdAddonFail("Internal Error!"))
  }
}

function* onPutFdAddonsStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putFdAddonsStatus, data)

    if (response.status == "failure") {
      return yield put(putFdAddonsStatusFail(response.message))
    }

    yield put(putFdAddonsStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putFdAddonsStatusFail("Internal Error!"))
  }
}

function* FdAddonsSaga() {
  yield takeEvery(GET_FD_ADDONS, fetchFdAddons)
  yield takeEvery(ADD_FD_ADDON, onAddNewFdAddon)
  yield takeEvery(GET_FD_ADDON, fetchFdAddon)
  yield takeEvery(PUT_FD_ADDON, onPutFdAddon)
  yield takeEvery(DELETE_FD_ADDON, onDeleteFdAddon)
  yield takeEvery(PUT_FD_ADDONS_STATUS, onPutFdAddonsStatus)
}

export default FdAddonsSaga
