import { call, put, takeEvery } from "redux-saga/effects"

// Faq Redux States
import toastr from "toastr"
import {
  GET_FAQS,
  ADD_FAQ,
  GET_FAQ,
  PUT_FAQ,
  DELETE_FAQ,
  PUT_FAQS_STATUS,
} from "./actionTypes"
import {
  getFaqsFail,
  getFaqsSuccess,
  addFaqFail,
  addFaqSuccess,
  getFaqFail,
  getFaqSuccess,
  putFaqFail,
  putFaqSuccess,
  deleteFaqFail,
  deleteFaqSuccess,
  putFaqsStatusFail,
  putFaqsStatusSuccess,
} from "./actions"

import {
  getFaqs,
  postFaq,
  getFaq,
  putFaq,
  deleteFaq,
  putFaqsStatus,
} from "helpers/backend_helper"

function* fetchFaqs({ payload: { data, callback } }) {
  
  console.log('callback1234567', callback)
  try {
    const response = yield call(getFaqs, data)

    callback && callback(response)

    if (response.status == "failure") {
      return yield put(getFaqsFail(response.message))
    }

    yield put(getFaqsSuccess(response))
  } catch (error) {
    yield put(getFaqsFail(error))
  }
}

function* onAddNewFaq({ payload: { faq, history } }) {
  try {
    const response = yield call(postFaq, faq)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addFaqFail(response.message))
    }

    history && history.replace("/faqs")

    yield put(addFaqSuccess())
  } catch (error) {
    yield put(addFaqFail("Internal Error!"))
  }
}

function* fetchFaq({ payload }) {
  try {
    const response = yield call(getFaq, payload)

    if (response.status == "failure") {
      return yield put(getFaqFail(response.message))
    }

    yield put(getFaqSuccess(response.data))
  } catch (error) {
    yield put(getFaqFail(error))
  }
}

function* onPutFaq({ payload: { data, history } }) {
  try {
    const response = yield call(putFaq, data)

    if (response.status == "failure") {
      return yield put(putFaqFail(response.message))
    }

    history && history.replace("/faqs")

    yield put(putFaqSuccess())
  } catch (error) {
    yield put(putFaqFail("Internal Error!"))
  }
}

function* onDeleteFaq({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteFaq, data)

    if (response.status == "failure") {
      return yield put(deleteFaqFail(response.message))
    }

    yield put(deleteFaqSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteFaqFail("Internal Error!"))
  }
}

function* onPutFaqsStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putFaqsStatus, data)

    if (response.status == "failure") {
      return yield put(putFaqsStatusFail(response.message))
    }
    toastr.success(response.message)

    yield put(putFaqsStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putFaqsStatusFail("Internal Error!"))
  }
}

function* FaqsSaga() {
  yield takeEvery(GET_FAQS, fetchFaqs)
  yield takeEvery(ADD_FAQ, onAddNewFaq)
  yield takeEvery(GET_FAQ, fetchFaq)
  yield takeEvery(PUT_FAQ, onPutFaq)
  yield takeEvery(DELETE_FAQ, onDeleteFaq)
  yield takeEvery(PUT_FAQS_STATUS, onPutFaqsStatus)
}

export default FaqsSaga
