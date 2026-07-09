import { takeEvery, fork, put, all, call, takeLatest } from "redux-saga/effects"

// Login Redux States
import {
  EDIT_PROFILE,
  CHANGE_PASSWORD,
  POST_ENABLE_NOTIFICATIONS,
} from "./actionTypes"
import {
  profileSuccess,
  profileError,
  putChangePwdSuccess,
  putChangePwdError,
  postEnableNotificationsSuccess,
  postEnableNotificationsFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  putProfile,
  putChangePassword,
  postEnableNotifications,
} from "helpers/backend_helper"

function* editProfile({ payload: { user } }) {
  try {
    const response = yield call(putProfile, user)
    if (response.status === "failure") {
      return yield put(profileError(response.message))
    }

    yield put(profileSuccess(response.message))
  } catch (error) {
    yield put(profileError("Internal Server Error"))
  }
}

function* changePassword({ payload: { data, callback } }) {
  try {
    const response = yield call(putChangePassword, data)
    if (response.status === "failure") {
      return yield put(putChangePwdError(response.message))
    }

    callback && callback()
    yield put(putChangePwdSuccess(response))
  } catch (error) {
    yield put(putChangePwdError("Internal Server Error"))
  }
}

function* onPostEnableNotifications({ payload }) {
  try {
    const response = yield call(postEnableNotifications, payload)
    if (response.status === "failure") {
      return yield put(postEnableNotificationsFail(response.message))
    }

    yield put(postEnableNotificationsSuccess(response))
  } catch (error) {
    console.log("error  ", error)
    yield put(postEnableNotificationsFail("Internal Server Error"))
  }
}

export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile)
  yield takeEvery(CHANGE_PASSWORD, changePassword)
  yield takeLatest(POST_ENABLE_NOTIFICATIONS, onPostEnableNotifications)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
