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

const initialState = {
  error: "",
  success: "",
  loading: false,
}

const profile = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      state = { ...state, loading: true }
      break
    case PROFILE_SUCCESS:
      state = { ...state, success: action.payload, error: "", loading: false }
      break
    case PROFILE_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break

    case CHANGE_PASSWORD:
      state = { ...state, loading: true }
      break
    case CHANGE_PASSWORD_SUCCESS:
      state = { ...state, success: action.payload, loading: false }
      break
    case CHANGE_PASSWORD_FAIL:
      state = { ...state, error: action.payload, loading: false }
      break

    case POST_ENABLE_NOTIFICATIONS:
      state = { ...state, loading: true }
      break
    case POST_ENABLE_NOTIFICATIONS_SUCCESS:
    case POST_ENABLE_NOTIFICATIONS_FAIL:
      state = { ...state, loading: false, error: action.payload || "" }
      break

    default:
      state = { ...state }
      break
  }
  return state
}

export default profile
