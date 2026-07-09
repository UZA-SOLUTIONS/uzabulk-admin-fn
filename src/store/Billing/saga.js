import { takeEvery, put, call, takeLatest, select } from "redux-saga/effects"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

import {
  GET_CURRENT_PLAN,
  GET_BILLING_PLANS,
  POST_BILLING_CARD,
  POST_UPGRADE_PLAN,
} from "./actionTypes"

import {
  getCurrentPlanSuccess,
  getCurrentPlanFail,
  getCurrentPlan as getBillingPlansAction,
  getBillingPlansSuccess,
  getBillingPlansFail,
  postBillingCardSuccess,
  postBillingCardFail,
  postUpgradePlanSuccess,
  postUpgradePlanFail,
} from "./actions"
import { getFdRestaurant } from "../FoodDelivery/restaurants/actions"
import { updateSocket } from "store/auth/login/actions"

import {
  getCurrentPlan,
  getBillingPlans,
  postBillingCard,
  postUpgradePlan,
} from "helpers/backend_helper"
import { ROLES } from "helpers/contants"

function* fetchCurrentPlan({ payload }) {
  try {
    const response = yield call(getCurrentPlan)

    if (response.status == "failure") {
      return yield put(getCurrentPlanFail(response?.message))
    }

    const Settings = yield select(state => state.Settings)
    const Login = yield select(state => state.Login)

    if (response?.data?.billingPlan?.type === "basic") {
      if (
        Login.meDone &&
        Login.user.role !== ROLES.vendor &&
        Settings.settings?.storeTypeEnabled[0]
      ) {
        console.log("Billing saga hit socket")
        yield put(
          updateSocket(Settings.settings.storeTypeEnabled[0].singleVendorId)
        )
      }

      if (Settings.settings?.storeTypeEnabled[0]) {
        const { singleVendorId: vendorId, _id: storeId } =
          Settings.settings.storeTypeEnabled[0]

        yield put(getFdRestaurant(storeId, vendorId))
      }
    } else if (Login.meDone && Settings.settingsDone) {
      /* Connect socket without restaurant if not basic & VENDOR */
      if (Login.user?.role !== ROLES.vendor) {
        yield put(updateSocket())
      }
    }

    yield put(getCurrentPlanSuccess(response?.data))
  } catch (error) {
    console.log("billing error", error)
    yield put(getCurrentPlanFail(error))
  }
}

function* fetchBillingPlans({ payload }) {
  try {
    const response = yield call(getBillingPlans, payload)

    if (response.status == "failure") {
      return yield put(getBillingPlansFail(response?.message))
    }

    yield put(getBillingPlansSuccess(response?.data, response?.cardDetails))
  } catch (error) {
    yield put(getBillingPlansFail(error))
  }
}

function* onPostBillingCard({ payload: { data, callback } }) {
  try {
    const response = yield call(postBillingCard, data)

    if (response.status == "failure") {
      return yield put(postBillingCardFail(response?.message))
    }

    callback && callback()
    yield put(postBillingCardSuccess(response?.data))
  } catch (error) {
    yield put(postBillingCardFail(error))
  }
}

function* onPostUpgradePlan({ payload }) {
  try {
    const response = yield call(postUpgradePlan, payload)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(postUpgradePlanFail(response?.message))
    }

    toastr.success(response.message)
    yield put(postUpgradePlanSuccess(response?.data))
    yield put(getBillingPlansAction())
  } catch (error) {
    yield put(postUpgradePlanFail(error))
  }
}

function* Billing() {
  yield takeLatest(GET_CURRENT_PLAN, fetchCurrentPlan)
  yield takeEvery(GET_BILLING_PLANS, fetchBillingPlans)
  yield takeEvery(POST_BILLING_CARD, onPostBillingCard)
  yield takeEvery(POST_UPGRADE_PLAN, onPostUpgradePlan)
}

export default Billing
