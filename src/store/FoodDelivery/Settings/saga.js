import { call, put, takeEvery } from "redux-saga/effects"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import toastr from "toastr"

// Customer Redux States
import { GET_MERCHANT_ACCOUNT, GET_STORE_SETTINGS, PUT_STORE_SETTINGS } from "./actionTypes"
import {
  getStoreSettingsSuccess,
  getStoreSettingsFail,
  putStoreSettingsSuccess,
  putStoreSettingsFail,
  getMerchantAccountFailure,
  getMerchantAccountSuccess,
} from "./actions"
import { currentUser } from "../../auth/login/actions"

import { getMerchantAccount, getStoreSettings, putStoreSettings } from "helpers/backend_helper"

function* onGetStoreSettings({ payload: { storeType, id } }) {
  try {
    Nprogress.start()

    const response = yield call(getStoreSettings, storeType, id)

    if (response.status == "failure") {
      Nprogress.done()
      return yield put(getStoreSettingsFail(response.message))
    }

    yield put(getStoreSettingsSuccess(response.data))
    Nprogress.done()
  } catch (error) {
    yield put(getStoreSettingsFail(error))
  }
}

function* onPutStoreSettings({ payload: { storeType, data } }) {
  try {
    const response = yield call(putStoreSettings, storeType, data)

    window.scrollTo(0, 0)

    if (response.status == "failure") {
      return yield put(putStoreSettingsFail(response.message))
    }

    yield put(currentUser())
    yield put(putStoreSettingsSuccess(response.message))
  } catch (error) {
    yield put(putStoreSettingsFail(error))
  }
}

function* ongetMerchantAccount({ payload: { id } }) {
  console.log(id, 65465654)
  try {
    const response = yield call(getMerchantAccount, id)
    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(getMerchantAccountFailure(response.message))
    }
    toastr.success(response.message)
    yield put(getMerchantAccountSuccess())
  } catch (err) {
    yield put(getMerchantAccountFailure(err))
  }
}

function* settingsSaga() {
  yield takeEvery(GET_STORE_SETTINGS, onGetStoreSettings)
  yield takeEvery(PUT_STORE_SETTINGS, onPutStoreSettings)
  yield takeEvery(GET_MERCHANT_ACCOUNT, ongetMerchantAccount)
}

export default settingsSaga
