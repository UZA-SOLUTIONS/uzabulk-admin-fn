import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from "./actionTypes"

const initialState = {
  forgetSuccessMsg: null,
  forgetError: null,
  loading: false,
}

const forgetPassword = (state = initialState, action) => {
  switch (action.type) {
    /* Forgot Password */
    case FORGET_PASSWORD:
      state = {
        ...state,
        forgetSuccessMsg: null,
        forgetError: null,
        loading: true,
      }
      break
    case FORGET_PASSWORD_SUCCESS:
      state = {
        ...state,
        forgetSuccessMsg: action.payload,
        loading: false,
        forgetError: null,
      }
      break
    case FORGET_PASSWORD_ERROR:
      state = { ...state, forgetError: action.payload, loading: false }
      break
    /* Reset Password END */

    /* Reset Password */
    case RESET_PASSWORD:
      state = {
        ...state,
        forgetSuccessMsg: null,
        forgetError: null,
        loading: true,
      }
      break
    case RESET_PASSWORD_SUCCESS:
      state = {
        ...state,
        forgetSuccessMsg: action.payload,
        loading: false,
        forgetError: null,
      }
      break
    case RESET_PASSWORD_ERROR:
      state = { ...state, forgetError: action.payload, loading: false }
      break
    /* Reset Password END */

    default:
      state = { ...state }
      break
  }
  return state
}

export default forgetPassword
