import { takeEvery, fork, put, all, call } from "redux-saga/effects"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

//Account Redux states
import {
  REGISTER_USER_EMAIL,
  REGISTER_STORE_NAME,
  REGISTER_USER,
} from "./actionTypes"
import {
  registerUserEmailSuccessful,
  registerUserEmailFailed,
  registerStoreNameSuccessful,
  registerStoreNameFailed,
  registerUserSuccessful,
  registerUserFailed,
} from "./actions"
import { loginSuccess } from "../login/actions"
import { updateToken } from "helpers/api_helper"

//Include Both Helper File with needed methods
import {
  postRegisterEmail,
  postStoreName,
  postRegister,
} from "helpers/backend_helper"
import { USER_AUTH_KEY } from "helpers/contants"

function* registerUserEmail({ payload: { user, callback } }) {
  try {
    if (!user.policy) {
      window.scrollTo(0, 0)
      return yield put(registerUserEmailFailed("agree_term_condition"))
    }
    const response = yield call(postRegisterEmail, user)

    if (response.status == "failure") {
      window.scrollTo(0, 0)
      return yield put(registerUserEmailFailed(response.message))
    }

    callback && callback()
    yield put(registerUserEmailSuccessful(response))
  } catch (error) {
    console.log(error)
    yield put(registerUserEmailFailed("Internal Server Error"))
  }
}

function* registerStoreName({ payload: { user, callback } }) {
  try {
    if (user?.storeName === user?.currentStoreName) {
      return yield put(registerStoreNameSuccessful())
    }

    const response = yield call(postStoreName, user)

    if (response.status == "failure") {
      window.scrollTo(0, 0)
      return yield put(registerStoreNameFailed(response.message))
    }

    callback && callback()
    yield put(registerStoreNameSuccessful(response))
  } catch (error) {
    console.log(error)
    yield put(registerStoreNameFailed("Internal Server Error"))
  }
}

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user, history } }) {
  try {
    if (!user.policy) {
      window.scrollTo(0, 0)
      return yield put(registerUserFailed("agree_term_condition"))
    }
    const response = yield call(postRegister, user)

    if (response.status == "failure") {
      window.scrollTo(0, 0)
      return yield put(registerUserFailed(response.message))
    }

    /* history.replace("/")
    yield put(registerUserSuccessful(response)) */

    localStorage.setItem(USER_AUTH_KEY, JSON.stringify(response))
    updateToken(response.token)
    yield put(loginSuccess(response))
    // TODO: Toast: Your account has been successfully created.
    toastr.options = {
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
    }

    toastr.success(response.message)
  } catch (error) {
    console.log(error)
    yield put(registerUserFailed("Internal Server Error"))
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER_EMAIL, registerUserEmail)
  yield takeEvery(REGISTER_STORE_NAME, registerStoreName)
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
