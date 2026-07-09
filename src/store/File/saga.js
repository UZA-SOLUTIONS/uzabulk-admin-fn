import { call, put, takeEvery } from "redux-saga/effects"

// Customer Redux States
import { UPLOAD_FILE, REMOVE_FILE } from "./actionTypes"
import { apiFail } from "./actions"

import { postFile, postRemoveFile } from "helpers/backend_helper"

function* onAddFile({ payload: { data, callback } }) {
  try {
    const response = yield call(postFile, data)

    if (response.status == "failure") {
      return yield put(apiFail(response.message))
    }

    callback && callback(response)
    yield put(apiFail(""))
  } catch (error) {
    yield put(apiFail(error))
  }
}

function* onRemoveFile({ payload }) {
  try {
    const response = yield call(postRemoveFile, payload)

    if (response.status == "failure") {
      return yield put(apiFail(response.message))
    }
  } catch (error) {
    yield put(apiFail(error))
  }
}

function* fileSaga() {
  yield takeEvery(UPLOAD_FILE, onAddFile)
  yield takeEvery(REMOVE_FILE, onRemoveFile)
}

export default fileSaga
