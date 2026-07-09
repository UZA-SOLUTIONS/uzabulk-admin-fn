import { USER_AUTH_KEY } from "helpers/contants"
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
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAIL,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  ENABLE_NOTIFICATION,
  ENABLE_NOTIFICATION_SUCCESS,
  ENABLE_NOTIFICATION_FAIL,
  GET_LANGUAGES,
  GET_LANGUAGES_SUCCESS,
  GET_LANGUAGES_FAIL,
  UPDATE_SOCKET,
  UPDATE_SOCKET_SUCCESS,
} from "./actionTypes"

const { data, ...authUser } = JSON.parse(
  localStorage.getItem(USER_AUTH_KEY) || "{}"
)

const isSupported = () =>
  "Notification" in window &&
  "serviceWorker" in navigator &&
  "PushManager" in window

let _Notification = {}

if (isSupported()) {
  _Notification = Notification
}

const hostname = window.location.hostname

const initialState = {
  socket: null,
  isHyperApp: [
    "staging-app.projectName",
    "staging-app.projectName.com",
    "app.projectName",
    "app.projectName.com",
    "projectName",
    "projectName.com",
  ].includes(hostname),
  isOther: [
    "app.jupytarexpress.com",
    "jupytarexpress.com",
    "app.jupytarexpress",
    "jupytarexpress",
  ].includes(hostname),
  fromLogin: false,
  isAppReady: true,
  isSuperAdmin: false,
  superError: false,
  superLoading: false,
  meLoading: false,
  meDone: false,
  isMeFailed: false,
  error: "",
  loading: false,
  user: authUser.data || {},
  authToken: authUser.token || null,
  fcmToken:
    isSupported() && _Notification.permission === "granted"
      ? localStorage.getItem("fcmToken")
      : null,
  notificationGranted: _Notification.permission === "granted",
  languages: [],
  timezones: [],
  countries: [],
  currencies: [],
  publicDomainData: {},
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case GET_PUBLIC_DATA_SUCCESS:
      return {
        ...state,
        publicDomainData: action.payload,
      }

    case UPDATE_SOCKET_SUCCESS:
      return {
        ...state,
        socket: action.payload,
      }

    case IS_APP_READY:
      return {
        ...state,
        isAppReady: action.payload,
      }
    case CLEAR_USER_TOKEN:
      return {
        ...state,
        authToken: null,
      }
    case SUPER_ADMIN_LOGIN:
      return {
        ...state,
        isSuperAdmin: true,
        superError: false,
        superLoading: true,
      }
    case SUPER_ADMIN_LOGIN_FAIL:
      return {
        ...state,
        superError: true,
        superLoading: false,
      }
    case SUPER_ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isSuperAdmin: false,
        superError: false,
        superLoading: false,
        authToken: action.payload.token,
      }
    case LOGIN_USER:
      return {
        ...state,
        error: "",
        loading: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: "",
        // user: action.payload.data,
        authToken: action.payload.token,
        loading: false,
        fromLogin: true,
      }
    case GET_CURRENT_USER:
      return {
        ...state,
        error: "",
        meLoading: true,
        isMeFailed: false,
      }
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        error: "",
        user: action.payload.data,
        meDone: true,
        meLoading: false,
        isMeFailed: false,
      }

    case GET_CURRENT_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isMeFailed: true,
        meLoading: false,
      }
    case LOGOUT_USER:
      return { ...state, loading: true }
    case LOGOUT_USER_SUCCESS:
      return { ...state, loading: false, user: {}, authToken: null }
    case API_ERROR:
      return { ...state, error: action.payload, loading: false }

    case ENABLE_NOTIFICATION_SUCCESS:
      return { ...state, fcmToken: action.payload,notificationGranted:_Notification.permission === "granted" }
    case ENABLE_NOTIFICATION_FAIL:
      return { ...state, fcmToken: null,notificationGranted:_Notification.permission === "granted" }

    case GET_LANGUAGES_SUCCESS:
      return { ...state, ...action.payload }

    default:
      return { ...state }
  }
  return state
}

export default login
