import {
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  EDIT_PROFILE,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  POST_ENABLE_NOTIFICATIONS,
  POST_ENABLE_NOTIFICATIONS_SUCCESS,
  POST_ENABLE_NOTIFICATIONS_FAIL,
} from "./actionTypes"

export const editProfile = (user, history) => {
  return {
    type: EDIT_PROFILE,
    payload: { user, history },
  }
}

export const profileSuccess = msg => {
  return {
    type: PROFILE_SUCCESS,
    payload: msg,
  }
}

export const profileError = error => {
  return {
    type: PROFILE_ERROR,
    payload: error,
  }
}

export const putChangePwd = (data, callback) => {
  return {
    type: CHANGE_PASSWORD,
    payload: { data, callback },
  }
}

export const putChangePwdSuccess = msg => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: msg,
  }
}

export const putChangePwdError = error => {
  return {
    type: CHANGE_PASSWORD_FAIL,
    payload: error,
  }
}

export const postEnableNotifications = data => ({
  type: POST_ENABLE_NOTIFICATIONS,
  payload: data,
})

export const postEnableNotificationsSuccess = () => ({
  type: POST_ENABLE_NOTIFICATIONS_SUCCESS,
})

export const postEnableNotificationsFail = error => ({
  type: POST_ENABLE_NOTIFICATIONS_FAIL,
  payload: error,
})
