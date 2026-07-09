import {
  REGISTER_USER_EMAIL,
  REGISTER_USER_EMAIL_SUCCESSFUL,
  REGISTER_USER_EMAIL_FAILED,
  REGISTER_STORE_NAME,
  REGISTER_STORE_NAME_FAIL,
  REGISTER_STORE_NAME_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
} from "./actionTypes"

export const registerUserEmail = (user, callback) => {
  return {
    type: REGISTER_USER_EMAIL,
    payload: { user, callback },
  }
}

export const registerUserEmailSuccessful = user => {
  return {
    type: REGISTER_USER_EMAIL_SUCCESSFUL,
    payload: user,
  }
}

export const registerUserEmailFailed = user => {
  return {
    type: REGISTER_USER_EMAIL_FAILED,
    payload: user,
  }
}

export const registerStoreName = (user, callback) => {
  return {
    type: REGISTER_STORE_NAME,
    payload: { user, callback },
  }
}

export const registerStoreNameSuccessful = user => {
  return {
    type: REGISTER_STORE_NAME_SUCCESS,
    payload: user,
  }
}

export const registerStoreNameFailed = user => {
  return {
    type: REGISTER_STORE_NAME_FAIL,
    payload: user,
  }
}

export const registerUser = (user, history) => {
  return {
    type: REGISTER_USER,
    payload: { user, history },
  }
}

export const registerUserSuccessful = user => {
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: user,
  }
}

export const registerUserFailed = user => {
  return {
    type: REGISTER_USER_FAILED,
    payload: user,
  }
}
