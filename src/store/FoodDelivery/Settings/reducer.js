import {
  GET_STORE_SETTINGS,
  GET_STORE_SETTINGS_FAIL,
  GET_STORE_SETTINGS_SUCCESS,
  PUT_STORE_SETTINGS,
  PUT_STORE_SETTINGS_FAIL,
  PUT_STORE_SETTINGS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  settings: {},
  loading: false,
  error: "",
  success: "",
}

const Settings = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STORE_SETTINGS:
      return {
        ...state,
        loading: true,
        error: "",
        success: "",
      }

    case GET_STORE_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: action.payload,
        loading: false,
        error: "",
      }

    case GET_STORE_SETTINGS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_STORE_SETTINGS:
      return {
        ...state,
        loading: true,
        error: "",
        success: "",
      }

    case PUT_STORE_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        success: action.payload,
      }

    case PUT_STORE_SETTINGS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Settings
