import { call, put, takeEvery } from "redux-saga/effects"

// Promo Code Redux States
import {
  GET_PROMOTIONS,
  ADD_PROMOTION,
  GET_PROMOTION,
  PUT_PROMOTION,
  DELETE_PROMOTION,
  PUT_PROMOTIONS_STATUS,
} from "./actionTypes"
import {
  getPromotionsFail,
  getPromotionsSuccess,
  addPromotionFail,
  addPromotionSuccess,
  getPromotionFail,
  getPromotionSuccess,
  putPromotionFail,
  putPromotionSuccess,
  deletePromotionFail,
  deletePromotionSuccess,
  putPromotionsStatusFail,
  putPromotionsStatusSuccess,
} from "./actions"

import {
  getPromotions,
  postPromotion,
  getPromotion,
  putPromotion,
  deletePromotion,
  putPromotionsStatus,
} from "helpers/backend_helper"

function* fetchPromotions({ payload }) {
  try {
    const response = yield call(getPromotions, payload)

    if (response.status == "failure") {
      return yield put(getPromotionsFail(response.message))
    }

    yield put(getPromotionsSuccess(response))
  } catch (error) {
    yield put(getPromotionsFail(error))
  }
}

function* onAddNewPromotion({ payload: { promotion, history } }) {
  try {
    const response = yield call(postPromotion, promotion)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addPromotionFail(response.message))
    }

    history && history.goBack()

    yield put(addPromotionSuccess())
  } catch (error) {
    yield put(addPromotionFail("Internal Error!"))
  }
}

function* fetchPromotion({ payload }) {
  try {
    const response = yield call(getPromotion, payload)

    if (response.status == "failure") {
      return yield put(getPromotionFail(response.message))
    }

    yield put(getPromotionSuccess(response.data))
  } catch (error) {
    yield put(getPromotionFail(error))
  }
}

function* onPutPromotion({ payload: { data, history } }) {
  try {
    const response = yield call(putPromotion, data)

    if (response.status == "failure") {
      return yield put(putPromotionFail(response.message))
    }

    history && history.goBack()

    yield put(putPromotionSuccess())
  } catch (error) {
    yield put(putPromotionFail("Internal Error!"))
  }
}

function* onDeletePromotion({ payload: { data, callback } }) {
  try {
    const response = yield call(deletePromotion, data)

    if (response.status == "failure") {
      return yield put(deletePromotionFail(response.message))
    }

    yield put(deletePromotionSuccess())
    callback && callback()
  } catch (error) {
    yield put(deletePromotionFail("Internal Error!"))
  }
}

function* onPutPromotionsStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putPromotionsStatus, data)

    if (response.status == "failure") {
      return yield put(putPromotionsStatusFail(response.message))
    }

    yield put(putPromotionsStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putPromotionsStatusFail("Internal Error!"))
  }
}

function* PromotionsSaga() {
  yield takeEvery(GET_PROMOTIONS, fetchPromotions)
  yield takeEvery(ADD_PROMOTION, onAddNewPromotion)
  yield takeEvery(GET_PROMOTION, fetchPromotion)
  yield takeEvery(PUT_PROMOTION, onPutPromotion)
  yield takeEvery(DELETE_PROMOTION, onDeletePromotion)
  yield takeEvery(PUT_PROMOTIONS_STATUS, onPutPromotionsStatus)
}

export default PromotionsSaga
