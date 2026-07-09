import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects"
import toastr from "toastr"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import "toastr/build/toastr.min.css"

// Customer Redux States
import {
  GET_SETTINGS,
  PUT_SETTINGS,
  GET_ACCESS_LIST,
  GET_STORE_TYPES,
  GET_STARTED,
  DELETE_STORE,
  ADD_PAY360_BANK_ACCOUNT,
  GET_PAY360_BANK_ACCOUNT,
  GET_PAY360_MERCHANT,
  ADD_PAY360_MERCHANT,
} from "./actionTypes"
import {
  getSettings as getSettingsAction,
  getSettingsSuccess,
  getSettingsFail,
  putSettingsSuccess,
  putSettingsFail,
  getAccessListSuccess,
  getAccessListFail,
  getStoreTypesSuccess,
  getStoreTypesFail,
  getStartedSuccess,
  getStartedFail,
  deleteStoreSuccess,
  deleteStoreFail,
  addBankAccountFaiure,
  addBankAccountSuccess,
  getBankAccountFaiure,
  getBankAccountSuccess,
  getMerchantFaiure,
  getMerchantSuccess,
  addMerchantSuccess,
  addMerchantFaiure,
} from "./actions"
import { updateSocket } from "store/auth/login/actions"
import { getFdRestaurant } from "../FoodDelivery/restaurants/actions"
import { currentUser } from "../auth/login/actions"

import {
  getSettings,
  putSettings,
  getAccessList,
  getStoreTypes,
  getStarted,
  deleteStore,
  postBankAccount,
  getBankAccount,
  getMerchant,
  postMerchant,
} from "helpers/backend_helper"
import { ROLES } from "helpers/contants"

function* onGetSettings() {
  try {
    Nprogress.start()

    const response = yield call(getSettings)

    if (response.status == "failure") {
      Nprogress.done()
      return yield put(getSettingsFail(response.message))
    }

    const Billing = yield select(state => state.Billing)
    const Login = yield select(state => state.Login)

    if (
      Billing.billingDone &&
      Billing.currentPlan?.billingPlan?.type === "basic"
    ) {
      /* Check after response of 3 API's */
      /* Connect Socket & emit restaurant id */
      if (
        Login.meDone &&
        Login.user.role !== ROLES.vendor &&
        response.data?.storeTypeEnabled[0]
      ) {
        console.log("settings saga hit socket")
        yield put(
          updateSocket(response.data.storeTypeEnabled[0].singleVendorId)
        )
      }

      if (response.data?.storeTypeEnabled[0]) {
        const { singleVendorId: vendorId, _id: storeId } =
          response.data.storeTypeEnabled[0]

        yield put(getFdRestaurant(storeId, vendorId))
      }
    } else {
      /* Connect socket without restaurant if not basic & VENDOR */
      if (Login.meDone && Login.user.role !== ROLES.vendor) {
        yield put(updateSocket())
      }
    }

    yield put(getSettingsSuccess(response.data))
    Nprogress.done()
  } catch (error) {
    console.log("error ", error)
    yield put(getSettingsFail(error))
  }
}

function* onPutSettings({ payload }) {
  try {
    const response = yield call(putSettings, payload)

    window.scrollTo(0, 0)

    if (response.status == "failure") {
      return yield put(putSettingsFail(response.message))
    }

    yield put(getSettingsAction())
    yield put(currentUser())
    yield put(putSettingsSuccess(response.message))
  } catch (error) {
    yield put(putSettingsFail(error))
  }
}

function* onGetAccessList({ payload }) {
  try {
    const response = yield call(getAccessList, payload)

    if (response.status == "failure") {
      return yield put(getAccessListFail(response.message))
    }

    yield put(getAccessListSuccess(response.data))
  } catch (error) {
    yield put(getAccessListFail(error))
  }
}

function* onGetStoreTypes({ payload }) {
  try {
    const response = yield call(getStoreTypes, payload)

    if (response.status == "failure") {
      return yield put(getStoreTypesFail(response.message))
    }

    yield put(getStoreTypesSuccess(response.data))
  } catch (error) {
    yield put(getStoreTypesFail(error))
  }
}

function* onGetStarted({ }) {
  try {
    const response = yield call(getStarted)

    if (response.status == "failure") {
      return yield put(getStartedFail(response.message))
    }

    yield put(getStartedSuccess(response.data))
  } catch (error) {
    yield put(getStartedFail("Server Error"))
  }
}

function* onDeleteStore({ history }) {
  try {
    const response = yield call(deleteStore)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(deleteStoreFail(response.message))
    }

    localStorage.clear()

    toastr.success(response.message)
    yield put(deleteStoreSuccess())

    window.location.replace("/login")
  } catch (error) {
    yield put(deleteStoreFail("Server Error"))
  }
}

function* onAddBankAccount({ payload: { data, callback } }) {
  try {

    const response = yield call(postBankAccount, data)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(addBankAccountFaiure(response.message))
    }
    toastr.success(response.message)
    window.location.replace("/settings")
    yield put(addBankAccountSuccess(response.data))

  } catch (err) {
    yield put(addBankAccountFaiure("Server error"))
  }
}

function* onGetBankAccount({ }) {
  try {

    const response = yield call(getBankAccount)

    if (response.status == "failure") {
      return yield put(getBankAccountFaiure(response.message))
    }
    yield put(getBankAccountSuccess(response.data))

  } catch (err) {
    yield put(getBankAccountFaiure("Server error"))
  }
}

function* onGetMerchant({ }) {
  try {

    const response = yield call(getMerchant)

    if (response.status == "failure") {
      return yield put(getMerchantFaiure(response.message))
    }
    yield put(getMerchantSuccess(response.data))

  } catch (err) {
    yield put(getMerchantFaiure("Server error"))
  }
}

function* onAddMerchant({ payload: { data, callback } }) {
  try {

    const response = yield call(postMerchant, data)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(addMerchantFaiure(response.message))
    }
    window.location.replace("/settings")
    yield put(addMerchantSuccess(response.data))

  } catch (err) {
    yield put(addMerchantFaiure("Server error"))
  }
}

function* settingsSaga() {
  yield takeEvery(GET_SETTINGS, onGetSettings)
  yield takeEvery(PUT_SETTINGS, onPutSettings)
  yield takeEvery(GET_ACCESS_LIST, onGetAccessList)
  yield takeLatest(GET_STORE_TYPES, onGetStoreTypes)
  yield takeLatest(GET_STARTED, onGetStarted)
  yield takeLatest(DELETE_STORE, onDeleteStore)
  yield takeLatest(ADD_PAY360_BANK_ACCOUNT, onAddBankAccount)
  yield takeLatest(GET_PAY360_BANK_ACCOUNT, onGetBankAccount)
  yield takeLatest(GET_PAY360_MERCHANT, onGetMerchant)
  yield takeLatest(ADD_PAY360_MERCHANT, onAddMerchant)

}

export default settingsSaga
