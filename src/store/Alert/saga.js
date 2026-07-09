import { call, put, takeEvery } from "redux-saga/effects"

import { RELOAD_ON_DEMAND } from "./actionTypes"
import { hideAlert } from "./actions"
import { currentUser } from "store/actions"

function* onReloadDemand({ payload }) {
  try {
    window.location.replace("/")

    yield put(currentUser())
    yield put(hideAlert())
  } catch (error) {}
}

function* alertSaga() {
  yield takeEvery(RELOAD_ON_DEMAND, onReloadDemand)
}

export default alertSaga
