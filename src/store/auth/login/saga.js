import {
  call,
  put,
  retry,
  takeEvery,
  takeLatest,
  delay,
  select,
} from "redux-saga/effects"
import moment from "moment"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import io from "socket.io-client"

// Login Redux States
import {
  GET_PUBLIC_DATA,
  SUPER_ADMIN_LOGIN,
  LOGIN_USER,
  GET_CURRENT_USER,
  LOGOUT_USER,
  SOCIAL_LOGIN,
  GET_NOTIFICATION_TOKEN,
  ENABLE_NOTIFICATION,
  GET_LANGUAGES,
  UPDATE_SOCKET,
} from "./actionTypes"
import {
  apiError,
  setAppReady,
  superAdminLoginSuccess,
  superAdminLoginFail,
  loginSuccess,
  currentUserSuccess,
  currentUserFail,
  logoutUserSuccess,
  enableNotification,
  enableNotificationSuccess,
  enableNotificationFail,
  getLanguagesSuccess,
  getLanguagesFail,
  updateSocket,
  updateSocketSuccess,
  getPublicDataSuccess,
  getPublicDataFail,
} from "./actions"
import { getStarted } from "../../Settings/actions"
import { postEnableNotifications } from "../profile/actions"
import toastr from "toastr"

import {
  getPublicData,
  postSuperAdminLogin,
  postLogin,
  postLogout,
  getCurrentUser,
  getLanguages,
  // postSocialLogin,
} from "helpers/backend_helper"
import { updateToken } from "helpers/api_helper"
import { getFirebaseBackend } from "helpers/firebase_helper"
import {
  ROLES,
  ADMIN_SERVICE_ROUTE,
  ADMIN_SUB_SERVICES_ROUTE,
  TIMEZONES,
  USER_AUTH_KEY,
} from "helpers/contants"
import { SOCKET_URL } from "helpers/api_helper"

const isSupported = () =>
  "Notification" in window &&
  "serviceWorker" in navigator &&
  "PushManager" in window

let _Notification = {}

if (isSupported()) {
  _Notification = Notification
}

const permissionsFilter = item => {
  if (item?.type === "storetypes") return true

  const _index = item?.permissions?.findIndex(i =>
    ["VIEW", "view", "List", "list"].includes(i.label)
  )

  if (_index !== -1) {
    if (!item?.permissions) {
      return true
    }

    return item?.permissions[_index]?.value
  }

  return false
}

const findValidRoute = ({ permissions, routes, preLink }) => {
  permissions = permissions?.filter(permissionsFilter)
  let route = ""

  if (!permissions) return route

  const item = permissions[0]

  if (!item) return route

  if (item?.type === "storetypes") {
    return findValidRoute({
      preLink: item?.storeTypes[0]?.storeType?.toLowerCase(),
      permissions: item?.storeTypes[0]?.navigation,
      routes: ADMIN_SUB_SERVICES_ROUTE,
    })
  }

  route = routes[item?.type]?.key

  if (preLink) {
    route = preLink + "/" + route
  }

  if (routes[item?.type]?.isDynamic) {
    route += "s"
  }

  return route
}

function* onGetPublicData({ payload }) {
  try {
    const response = yield call(getPublicData, payload)

    if (response.status == "failure") {
      return yield put(getPublicDataFail(response.message))
    }

    if (response.data) {
      const favicon = document.getElementById("favicon")

      if (favicon && response.data?.favIcon?.link) {
        // favicon.href = response.data?.favIcon?.link
      }

      const root = document.documentElement
      // let bodyWrapper = document.querySelector(".auth-body")
      let bodyWrapper2 = document.querySelector(".auth-body #login")
      let loginForm = document.querySelector(".auth-body form#loginform")
      let formH1 = document.querySelector(".auth-body #login h1")
      let formButton = document.querySelector(".auth-body #login .fullwidthbtn")
      let formLink = document.querySelector(".auth-body .colortextlink")

      if (response.data?.themeSettings?.bodyWrapper) {
        /* if (bodyWrapper) {
          bodyWrapper.style.background =
            response.data.themeSettings.bodyWrapper.backgroundColor || "initial"
        } */

        root.style.setProperty(
          "--auth-body",
          response.data.themeSettings.bodyWrapper.backgroundColor || "initial"
        )

        if (bodyWrapper2) {
          bodyWrapper2.style.background =
            response.data.themeSettings.bodyWrapper.backgroundColor || "initial"
        }

        if (loginForm) {
          loginForm.style.background =
            response.data.themeSettings.bodyWrapper.backgroundColor || "initial"
          loginForm.style.color =
            response.data.themeSettings.bodyWrapper.fontColor || "initial"
        }

        if (formH1) {
          formH1.style.color =
            response.data.themeSettings.bodyWrapper.fontColor || "initial"
        }

        if (formButton) {
          formButton.style.background =
            response.data.themeSettings.button.backgroundColor || "initial"
          formButton.style.color =
            response.data.themeSettings.button.fontColor || "initial"
        }

        if (formLink) {
          formLink.style.color =
            response.data.themeSettings.hyperlink.fontColor || "initial"
        }
      }

      /* let root = document.documentElement
      if (root && response.data?.themeSettings?.primaryColor) {
        root.style.setProperty(
          "--primary",
          response.data?.themeSettings?.primaryColor
        )
      } */
    }

    yield put(getPublicDataSuccess(response.data))
  } catch (error) {
    yield put(getPublicDataFail(""))
  }
}

function* onSuperAdminLogin({ payload }) {
  try {
    const response = yield call(postSuperAdminLogin, { storeToken: payload })

    if (response.status == "failure") {
      return yield put(superAdminLoginFail(response.message))
    }

    localStorage.setItem(USER_AUTH_KEY, JSON.stringify(response))
    updateToken(response.token)
    yield put(superAdminLoginSuccess(response))
  } catch (error) {
    yield put(superAdminLoginFail(""))
  }
}

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postLogin, {
      role: "ADMIN",
      email: String(user.email || "").trim(),
      password: user.password,
    })

    if (response.status == "failure") {
      return yield put(apiError(response.message))
    }

    localStorage.setItem(USER_AUTH_KEY, JSON.stringify(response))
    updateToken(response.token)
    yield put(loginSuccess(response))

    /* if (response?.data?.role === ROLES.staff) {
      updateToken(response.token)
      yield put(loginSuccess(response)) */

    /* const route = findValidRoute({
        permissions: response?.data?.accessLevel?.permissions || [],
        routes: ADMIN_SERVICE_ROUTE,
      }) */

    // window.location.replace("/" + route)
    // history.push("/" + route)
    // history.push("/dashboard")
    /* } else if (response?.data?.role === ROLES.admin) {
      updateToken(response.token)
      yield put(loginSuccess(response)) */

    // window.location.replace("/dashboard")
    // history.push("/dashboard")
    /* } else {
      window.location.replace("/dashboard")
    } */
  } catch (error) {
    yield put(apiError(error))
  }
}

function* currentUser() {
  try {
    const response = yield call(getCurrentUser)

    if (response.status == "failure") {
      return yield put(currentUserFail(response.message))
    }

    if (response?.data?.role === ROLES.admin) {
      yield put(getStarted())
    }

    if (response?.data?.role === ROLES.staff && !response?.data?.accessLevel) {
      localStorage.clear()
      window.location.replace("/")
      return
    }

    const Settings = yield select(state => state.Settings)
    const Billing = yield select(state => state.Billing)

    /* Connect Socket & Emit restaurant socket */
    if (response?.data?.role === ROLES.vendor) {
      yield put(updateSocket(response?.data?._id))
    } else {
      if (Settings.settingsDone && Billing.billingDone) {
        if (Billing.currentPlan?.billingPlan?.type === "basic") {
          if (Settings.settingsDone && Settings.settings?.storeTypeEnabled[0]) {
            console.log("login saga hit socket")
            yield put(
              updateSocket(Settings.settings.storeTypeEnabled[0].singleVendorId)
            )
          }
        } else {
          yield put(updateSocket())
        }
      }
    }

    /* if (response?.data?.role === ROLES.vendor) { */
    let fcmToken = localStorage.getItem("fcmToken")

    if (!fcmToken && isSupported() && _Notification.permission === "granted") {
      yield put(enableNotification())
    }
    /* } */

    yield put(currentUserSuccess(response))

    // setAppReady
    // date_created_utc
    if (response?.data?.role !== ROLES.admin) return
    /* const isAppReady = moment(response?.data?.date_created_utc).isBefore(
      moment().subtract(2, "minutes")
    )
    yield put(setAppReady(isAppReady))

    if (!isAppReady) {
      yield delay(120 * 1000)

      yield put(setAppReady(true))
    } */
  } catch (error) {
    console.log("login error", error)
    yield put(currentUserFail("Server Error"))
  }
}

function* logoutUser({ payload: { history, role } }) {
  try {
    Nprogress.start()

    const data = {}
    data.firebaseToken = localStorage.getItem("fcmToken")

    yield call(postLogout, data)

    localStorage.removeItem(USER_AUTH_KEY)
    localStorage.removeItem("fcmToken")
    localStorage.removeItem("role")

    yield put(logoutUserSuccess())
    yield put(updateSocketSuccess(null))

    history.push("/login")
    window.location.replace("/login")

    Nprogress.done()
  } catch (error) {
    yield put(apiError(error))
  }
}

function* onGetFcmToken({ payload }) {
  try {
    console.log("onGetFcmToken")
    const fireBaseBackend = getFirebaseBackend()

    const token = yield call(fireBaseBackend?.getToken)

    yield put(enableNotificationSuccess(token))
    localStorage.setItem("fcmToken", token)
  } catch (error) {
    console.log(error)
    yield put(enableNotificationSuccess(null))
    yield put(apiError(error))
  }
}

function* onEnableNotification({ payload }) {
  try {
    let Settings = yield select(state => state?.Settings)

    if (Settings?.settings?._id) {
      const fireBaseBackend = getFirebaseBackend(Settings?.settings?._id)

      const token = yield call(fireBaseBackend?.askForPermission)

      yield put(enableNotificationSuccess(token))
      yield put(postEnableNotifications({ firebaseToken: token }))

      localStorage.setItem("fcmToken", token)
    }
  } catch (error) {
    console.log("er", error)
    if (
      typeof error === "string" &&
      error?.includes("messaging/permission-blocked")
    ) {
      toastr.error("Permissions are blocked")
    }
    yield put(enableNotificationFail(error))
    yield put(apiError(error))
  }
}

function* onGetLanguages({ payload }) {
  try {
    const response = yield call(getLanguages)

    if (response.status == "failure") {
      return yield put(getLanguagesFail(response.message))
    }

    /* let _timezones = [moment.tz.guess()]

    response?.data?.map(language => {
      language?.timezones?.map(item => {
        if (!_timezones.includes(item)) {
          _timezones.push(item)
        }
      })
    })

    _timezones = _timezones?.sort()

    data.timezones = _timezones
      ?.map(item => {
        const zoneIndex = TIMEZONES.findIndex(zone => zone.value === item)

        if (zoneIndex !== -1) {
          return TIMEZONES[zoneIndex]
        }
      })
      ?.filter(item => !!item) */

    yield put(getLanguagesSuccess(response?.data))
  } catch (error) {
    console.log("error ", error)
    yield put(getLanguagesFail(error))
  }
}

function* onUpdateSocket({ payload }) {
  try {
    const socketUrl = (SOCKET_URL || "").trim()
    if (!socketUrl || /^(off|false|disabled|0)$/i.test(socketUrl)) {
      console.warn("[socket] realtime disabled (REACT_APP_API_SOCKET_URL); skipping connection")
      return
    }

    const socket = io(socketUrl, {
      // Avoid CORS failure when the host returns Access-Control-Allow-Origin: *
      withCredentials: false,
      // Don't spam retries when the socket host is down
      reconnectionAttempts: 3,
      timeout: 10000,
    })

    socket.on("connect_error", err => {
      console.warn("[socket] connect_error:", err?.message || err)
    })

    socket?.on("connect", order => {
      console.log("connected")
      console.log("connect for ", order)

      if (payload) {
        console.log("restaurantId", payload)

        socket?.emit("restaurantsocket", { restaurantId: payload }, () => { })
      }
    })

    yield put(updateSocketSuccess(socket))
  } catch (error) {
    console.log("error", error)
  }
}

function* authSaga() {
  yield takeLatest(GET_PUBLIC_DATA, onGetPublicData)
  yield takeEvery(SUPER_ADMIN_LOGIN, onSuperAdminLogin)
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(GET_CURRENT_USER, currentUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
  yield takeEvery(GET_NOTIFICATION_TOKEN, onGetFcmToken)
  yield takeEvery(ENABLE_NOTIFICATION, onEnableNotification)
  yield takeEvery(GET_LANGUAGES, onGetLanguages)
  yield takeLatest(UPDATE_SOCKET, onUpdateSocket)
}

export default authSaga
