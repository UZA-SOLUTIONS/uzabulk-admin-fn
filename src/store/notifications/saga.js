import { call, put, takeEvery } from "redux-saga/effects"

// Promo Code Redux States
import { GET_NOTIFICATIONS, POST_NOTIFICATION } from "./actionTypes"
import {
  getNotificationsFail,
  getNotificationsSuccess,
  postNotificationFail,
  postNotificationSuccess,
} from "./actions"

import { getNotifications, postNotification } from "helpers/backend_helper"

function* fetchNotifications({ payload }) {
  try {
    const response = yield call(getNotifications, payload)

    if (response.status == "failure") {
      return yield put(getNotificationsFail(response.message))
    }

    yield put(getNotificationsSuccess(response))
  } catch (error) {
    yield put(getNotificationsFail(error))
  }
}

function* onPostNotification({ payload: { data, history } }) {
  try {
    const response = yield call(postNotification, data)

    if (response.status == "failure") {
      return yield put(postNotificationFail(response.message))
    }

    history && history.goBack()

    yield put(postNotificationSuccess())
  } catch (error) {
    yield put(postNotificationFail("Internal Error!"))
  }
}

function* NotificationsSaga() {
  yield takeEvery(GET_NOTIFICATIONS, fetchNotifications)
  yield takeEvery(POST_NOTIFICATION, onPostNotification)
}

export default NotificationsSaga
