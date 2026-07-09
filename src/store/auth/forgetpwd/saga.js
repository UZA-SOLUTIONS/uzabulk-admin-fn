import { takeEvery, fork, put, all, call, takeLatest } from "redux-saga/effects"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

// Login Redux States
import { FORGET_PASSWORD, RESET_PASSWORD } from "./actionTypes"
import {
  userForgetPasswordSuccess,
  userForgetPasswordError,
  userResetPasswordSuccess,
  userResetPasswordError,
} from "./actions"

import { postForgetPwd, postResetPwd } from "helpers/backend_helper"

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, callback } }) {
  try {
    const response = yield call(postForgetPwd, user)

    if (response.status == "failure") {
      return yield put(userForgetPasswordError(response.message))
    }

    callback && callback()
    yield put(userForgetPasswordSuccess())
  } catch (error) {
    console.log('forgetUser');
    yield put(userForgetPasswordError("Internal Server Error"))
  }
}

function* resetUser({ payload: { user, callback } }) {
  try {
    const response = yield call(postResetPwd, user)

    if (response.status == "failure") {
      return yield put(userResetPasswordError(response.message))
    }

    callback && callback()
    yield put(userResetPasswordSuccess(response.message))
    toastr.success(response.message)
  } catch (error) {
    console.log("resetUser");
    yield put(userResetPasswordError("Internal Server Error"))
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser)
  yield takeLatest(RESET_PASSWORD, resetUser)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)])
}

export default forgetPasswordSaga
