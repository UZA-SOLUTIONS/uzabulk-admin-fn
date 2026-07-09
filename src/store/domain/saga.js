import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Crypto Redux States
import { GET_DOMAIN, BUY_DOMAIN, CLEAR_DOMAIN } from "./actionTypes"
import {
  searhDomainSuccess,
  searhDomainFail,
  buyDomainSuccess,
  buyDomainFail,
  clearDomain,
  clearDomainSuccess,
} from "./actions"

import { searchDomain, buyDomain } from "helpers/backend_helper"

function* fetchDomain({ name }) {
  try {
    const response = yield call(searchDomain, name)
    yield put(searhDomainSuccess(response))
    return response
  } catch (error) {
    yield put(searhDomainFail(error))
  }
}

function* BuyDomain({ data }) {
  try {
    const response = yield call(buyDomain, data)
    delete response.data
    yield put(buyDomainSuccess(response))
  } catch (error) {
    yield put(buyDomainFail(error))
  }
}

function* clearDomainFn() {
  yield put(clearDomainSuccess())
}

function* domainSaga() {
  yield takeEvery(GET_DOMAIN, fetchDomain)
  yield takeLatest(BUY_DOMAIN, BuyDomain)
  yield takeEvery(CLEAR_DOMAIN, clearDomainFn)
}

export default domainSaga
