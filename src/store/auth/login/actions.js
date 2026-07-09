import {
  CLEAR_USER_TOKEN,
  IS_APP_READY,
  GET_PUBLIC_DATA,
  GET_PUBLIC_DATA_SUCCESS,
  GET_PUBLIC_DATA_FAIL,
  SUPER_ADMIN_LOGIN,
  SUPER_ADMIN_LOGIN_SUCCESS,
  SUPER_ADMIN_LOGIN_FAIL,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
  ENABLE_NOTIFICATION,
  ENABLE_NOTIFICATION_SUCCESS,
  ENABLE_NOTIFICATION_FAIL,
  GET_NOTIFICATION_TOKEN,
  GET_LANGUAGES,
  GET_LANGUAGES_SUCCESS,
  GET_LANGUAGES_FAIL,
  UPDATE_SOCKET,
  UPDATE_SOCKET_SUCCESS,
  UPDATE_SOCKET_FAIL,
} from "./actionTypes"

export const updateSocket = restaurantId => ({
  type: UPDATE_SOCKET,
  payload: restaurantId,
})

export const updateSocketSuccess = socket => ({
  type: UPDATE_SOCKET_SUCCESS,
  payload: socket,
})

export const clearUserToken = () => ({
  type: CLEAR_USER_TOKEN,
})

export const setAppReady = status => ({
  type: IS_APP_READY,
  payload: status,
})

export const getPublicData = data => ({
  type: GET_PUBLIC_DATA,
  payload: data,
})

export const getPublicDataSuccess = data => ({
  type: GET_PUBLIC_DATA_SUCCESS,
  payload: data,
})

export const getPublicDataFail = () => ({
  type: GET_PUBLIC_DATA_FAIL,
})

export const superAdminLogin = token => {
  return {
    type: SUPER_ADMIN_LOGIN,
    payload: token,
  }
}

export const superAdminLoginFail = error => {
  return {
    type: SUPER_ADMIN_LOGIN_FAIL,
    payload: error,
  }
}

export const superAdminLoginSuccess = user => {
  return {
    type: SUPER_ADMIN_LOGIN_SUCCESS,
    payload: user,
  }
}

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  }
}

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export const logoutUser = (history, role) => {
  return {
    type: LOGOUT_USER,
    payload: { history, role },
  }
}

export const currentUser = () => {
  return {
    type: GET_CURRENT_USER,
  }
}

export const currentUserSuccess = user => {
  return {
    type: GET_CURRENT_USER_SUCCESS,
    payload: user,
  }
}

export const currentUserFail = error => {
  return {
    type: GET_CURRENT_USER_FAIL,
    payload: error,
  }
}

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

export const socialLogin = (data, history, type) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { data, history, type },
  }
}

export const enableNotification = () => {
  return {
    type: ENABLE_NOTIFICATION,
  }
}

export const getNotificationToken = () => ({
  type: GET_NOTIFICATION_TOKEN,
})

export const enableNotificationSuccess = token => ({
  type: ENABLE_NOTIFICATION_SUCCESS,
  payload: token,
})

export const enableNotificationFail = error => ({
  type: ENABLE_NOTIFICATION_FAIL,
  payload: error,
})

export const getLanguages = () => ({
  type: GET_LANGUAGES,
})

export const getLanguagesSuccess = data => ({
  type: GET_LANGUAGES_SUCCESS,
  payload: data,
})

export const getLanguagesFail = error => ({
  type: GET_LANGUAGES_FAIL,
  payload: error,
})
