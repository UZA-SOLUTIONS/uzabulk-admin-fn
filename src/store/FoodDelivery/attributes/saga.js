import { call, put, takeEvery } from "redux-saga/effects"

// Food Delivery Attributes Redux States
import {
  GET_FD_ATTRIBUTES,
  ADD_FD_ATTRIBUTE,
  GET_FD_ATTRIBUTE,
  PUT_FD_ATTRIBUTE,
  DELETE_FD_ATTRIBUTE,
  PUT_FD_ATTRIBUTES_STATUS,
  POST_FD_TERM_IN_ATTRIBUTE,
} from "./actionTypes"
import {
  getFdAttributesFail,
  getFdAttributesSuccess,
  addFdAttributeFail,
  addFdAttributeSuccess,
  getFdAttributeFail,
  getFdAttributeSuccess,
  putFdAttributeFail,
  putFdAttributeSuccess,
  deleteFdAttributeFail,
  deleteFdAttributeSuccess,
  putFdAttributesStatusFail,
  putFdAttributesStatusSuccess,
  postFdTermInAttributeSuccess,
  postFdTermInAttributeFail,
} from "./actions"

import {
  getFdAttributes,
  postFdAttribute,
  getFdAttribute,
  putFdAttribute,
  deleteFdAttribute,
  putFdAttributesStatus,
  postFdTermInAttribute,
} from "helpers/backend_helper"

function* fetchFdAttributes({ payload }) {
  try {
    const response = yield call(getFdAttributes, payload)

    if (response.status == "failure") {
      return yield put(getFdAttributesFail(response.message))
    }

    yield put(getFdAttributesSuccess(response))
  } catch (error) {
    yield put(getFdAttributesFail(error))
  }
}

function* onAddNewFdAttribute({ payload: { fdAttribute, history } }) {
  try {
    const response = yield call(postFdAttribute, fdAttribute)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addFdAttributeFail(response.message))
    }

    history && history.goBack()

    yield put(addFdAttributeSuccess())
  } catch (error) {
    yield put(addFdAttributeFail("Internal Error!"))
  }
}

function* fetchFdAttribute({ payload: { storeType, id } }) {
  try {
    const response = yield call(getFdAttribute, storeType, id)

    if (response.status == "failure") {
      return yield put(getFdAttributeFail(response.message))
    }

    yield put(getFdAttributeSuccess(response.data))
  } catch (error) {
    yield put(getFdAttributeFail(error))
  }
}

function* onPutFdAttribute({ payload: { data, history } }) {
  try {
    const response = yield call(putFdAttribute, data)

    if (response.status == "failure") {
      return yield put(putFdAttributeFail(response.message))
    }

    history && history.goBack()

    yield put(putFdAttributeSuccess())
  } catch (error) {
    yield put(putFdAttributeFail("Internal Error!"))
  }
}

function* onDeleteFdAttribute({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteFdAttribute, data)

    if (response.status == "failure") {
      return yield put(deleteFdAttributeFail(response.message))
    }

    yield put(deleteFdAttributeSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteFdAttributeFail("Internal Error!"))
  }
}

function* onPutFdAttributesStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putFdAttributesStatus, data)

    if (response.status == "failure") {
      return yield put(putFdAttributesStatusFail(response.message))
    }

    yield put(putFdAttributesStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putFdAttributesStatusFail("Internal Error!"))
  }
}

function* onPostFdTermInAttribute({ payload: { data, callback } }) {
  try {
    const response = yield call(postFdTermInAttribute, data)

    if (response.status == "failure") {
      return yield put(postFdTermInAttributeFail(response.message))
    }

    callback && callback(response.data)
    yield put(postFdTermInAttributeSuccess(data?.attributeId, response.data))
  } catch (error) {
    yield put(postFdTermInAttributeFail("Internal Error!"))
  }
}

function* FdAttributesSaga() {
  yield takeEvery(GET_FD_ATTRIBUTES, fetchFdAttributes)
  yield takeEvery(ADD_FD_ATTRIBUTE, onAddNewFdAttribute)
  yield takeEvery(GET_FD_ATTRIBUTE, fetchFdAttribute)
  yield takeEvery(PUT_FD_ATTRIBUTE, onPutFdAttribute)
  yield takeEvery(DELETE_FD_ATTRIBUTE, onDeleteFdAttribute)
  yield takeEvery(PUT_FD_ATTRIBUTES_STATUS, onPutFdAttributesStatus)
  yield takeEvery(POST_FD_TERM_IN_ATTRIBUTE, onPostFdTermInAttribute)
}

export default FdAttributesSaga
