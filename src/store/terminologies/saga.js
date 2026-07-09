import { call, put, takeEvery } from "redux-saga/effects"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"

// Terminology Redux States
import { GET_TERMINOLOGIES, PUT_TERMINOLOGY } from "./actionTypes"
import {
  getTerminologiesFail,
  getTerminologiesSuccess,
  putTerminologyFail,
  putTerminologySuccess,
} from "./actions"

import { getTerminologies, putTerminology } from "helpers/backend_helper"

function* fetchTerminologies({ payload }) {
  try {
    const response = yield call(getTerminologies, payload)

    if (response.status == "failure") {
      return yield put(getTerminologiesFail(response.message))
    }

    yield put(getTerminologiesSuccess(response))
  } catch (error) {
    yield put(getTerminologiesFail(error))
  }
}

function* onPutTerminology({ payload: { data, history } }) {
  try {
    Nprogress.start()

    const response = yield call(putTerminology, data)

    window.scrollTo(0, 0)
    if (response.status == "failure") {
      Nprogress.done()

      return yield put(putTerminologyFail(response.message))
    }

    // history && history.replace("/terminologies")

    Nprogress.done()
    yield put(putTerminologySuccess(response.message))
  } catch (error) {
    Nprogress.done()
    yield put(putTerminologyFail("Internal Error!"))
  }
}

function* TerminologiesSaga() {
  yield takeEvery(GET_TERMINOLOGIES, fetchTerminologies)
  yield takeEvery(PUT_TERMINOLOGY, onPutTerminology)
}

export default TerminologiesSaga
