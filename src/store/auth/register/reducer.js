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

const initialState = {
  registrationError: null,
  message: null,
  loading: false,
  storeNameLoading: false,
  storeName: "",
  storeNameValid: null,
  storeNameFailed: "",
}

const account = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_EMAIL:
      return {
        ...state,
        user: null,
        loading: true,
        registrationError: null,
      }

    case REGISTER_USER_EMAIL_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        user: null,
        registrationError: null,
      }

    case REGISTER_USER_EMAIL_FAILED:
      return {
        ...state,
        user: null,
        loading: false,
        registrationError: action.payload,
      }

    case REGISTER_STORE_NAME:
      return {
        ...state,
        registrationError: "",
        storeNameLoading: true,
        storeNameFailed: "",
        storeNameValid: false,
      }

    case REGISTER_STORE_NAME_FAIL:
      return {
        ...state,
        storeNameLoading: false,
        storeNameValid: false,
        registrationError: action.payload
      }

    case REGISTER_STORE_NAME_SUCCESS:
      return {
        ...state,
        storeNameLoading: false,
        storeNameValid: true
      }

    case REGISTER_USER:
      return {
        ...state,
        user: null,
        loading: true,
        registrationError: null,
      }

    case REGISTER_USER_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        user: action.payload,
        registrationError: null,
      }

    case REGISTER_USER_FAILED:
      return {
        ...state,
        user: null,
        loading: false,
        registrationError: action.payload,
      }

    default:
      return state
  }
}

export default account
