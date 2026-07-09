import { call, put, takeEvery } from "redux-saga/effects"

// Promo Code Redux States
import {
  GET_PROMO_CODES,
  ADD_PROMO_CODE,
  GET_PROMO_CODE,
  PUT_PROMO_CODE,
  DELETE_PROMO_CODE,
  PUT_PROMO_CODES_STATUS,
} from "./actionTypes"
import {
  getPromoCodesFail,
  getPromoCodesSuccess,
  addPromoCodeFail,
  addPromoCodeSuccess,
  getPromoCodeFail,
  getPromoCodeSuccess,
  putPromoCodeFail,
  putPromoCodeSuccess,
  deletePromoCodeFail,
  deletePromoCodeSuccess,
  putPromoCodesStatusFail,
  putPromoCodesStatusSuccess,
} from "./actions"

import {
  getPromoCodes,
  postPromoCode,
  getPromoCode,
  putPromoCode,
  deletePromoCode,
  putPromoCodesStatus,
} from "helpers/backend_helper"

function* fetchPromoCodes({ payload }) {
  try {
    const response = yield call(getPromoCodes, payload)

    if (response.status == "failure") {
      return yield put(getPromoCodesFail(response.message))
    }

    yield put(getPromoCodesSuccess(response))
  } catch (error) {
    yield put(getPromoCodesFail(error))
  }
}

function* onAddNewPromoCode({ payload: { promoCode, history } }) {
  try {
    const response = yield call(postPromoCode, promoCode)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addPromoCodeFail(response.message))
    }

    history && history.goBack()

    yield put(addPromoCodeSuccess())
  } catch (error) {
    yield put(addPromoCodeFail("Internal Error!"))
  }
}

function* fetchPromoCode({ payload }) {
  try {
    const response = yield call(getPromoCode, payload)

    if (response.status == "failure") {
      return yield put(getPromoCodeFail(response.message))
    }

    yield put(getPromoCodeSuccess(response.data))
  } catch (error) {
    yield put(getPromoCodeFail(error))
  }
}

function* onPutPromoCode({ payload: { data, history } }) {
  try {
    const response = yield call(putPromoCode, data)

    if (response.status == "failure") {
      return yield put(putPromoCodeFail(response.message))
    }

    history && history.goBack()

    yield put(putPromoCodeSuccess())
  } catch (error) {
    yield put(putPromoCodeFail("Internal Error!"))
  }
}

function* onDeletePromoCode({ payload: { data, callback } }) {
  try {
    const response = yield call(deletePromoCode, data)
    callback && callback(response)
    if (response.status == "failure") {
      return yield put(deletePromoCodeFail(response.message))
    }

    yield put(deletePromoCodeSuccess())
    callback && callback()
  } catch (error) {
    yield put(deletePromoCodeFail("Internal Error!"))
  }
}

function* onPutPromoCodesStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putPromoCodesStatus, data)

    if (response.status == "failure") {
      return yield put(putPromoCodesStatusFail(response.message))
    }

    yield put(putPromoCodesStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putPromoCodesStatusFail("Internal Error!"))
  }
}

function* PromoCodesSaga() {
  yield takeEvery(GET_PROMO_CODES, fetchPromoCodes)
  yield takeEvery(ADD_PROMO_CODE, onAddNewPromoCode)
  yield takeEvery(GET_PROMO_CODE, fetchPromoCode)
  yield takeEvery(PUT_PROMO_CODE, onPutPromoCode)
  yield takeEvery(DELETE_PROMO_CODE, onDeletePromoCode)
  yield takeEvery(PUT_PROMO_CODES_STATUS, onPutPromoCodesStatus)
}

export default PromoCodesSaga
