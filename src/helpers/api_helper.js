import axios from "axios"
import authHeader from "./jwt-token-access/auth-token-header"

import store from "store"
import { showAlert } from "store/actions"
import { ROLES, USER_AUTH_KEY } from "./contants"

//apply base url for axios
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const API_URL = API_BASE_URL + process.env.REACT_APP_API_BASE_URL_EXTENSION
export const API_VERSION = process.env.REACT_APP_API_VERSION
export const SOCKET_URL = process.env.REACT_APP_API_SOCKET_URL

export const BASE_URL = API_URL

const axiosApi = axios.create({
  baseURL: BASE_URL,
  timeout: 30 * 1000, // Let's say you want to wait at least 30 seconds
})

axiosApi.interceptors.request.use(
  request => {
    const auth = JSON.parse(localStorage.getItem(USER_AUTH_KEY) || "{}")
    if (auth.data?.role === ROLES.subVendor) {
      try {
        if ("vendor" in request.data) {
          request.data.vendor = auth.data.vendor
        }
      } catch (err) {
        console.error("billi error", err)
        return request
      }
    }
    return request
  },
  error => Promise.reject(error)
)

let isForceLoggingOut = false

const LogoutUser = () => {
  if (isForceLoggingOut || typeof window === "undefined") return
  isForceLoggingOut = true
  localStorage.clear()
  window.location.replace("/login")
}

const hasStoredAuthToken = () => {
  try {
    const auth = JSON.parse(localStorage.getItem(USER_AUTH_KEY) || "{}")
    return !!auth?.token
  } catch (err) {
    return false
  }
}

const isInvalidSessionResponse = data => {
  if (!data || data.status !== "failure") return false
  if (data.isInvalidToken) return true
  // showUnathorizedErrorResponse always sets this description for expired/invalid auth
  if (data.error_description === "Invalid Login Credential!") return true
  const message = String(data.message || "").toLowerCase()
  return (
    message.includes("token expired")
    || message.includes("invalid token")
    || message === "invalid_token"
  )
}

const handleAuthFailureResponse = data => {
  if (!data || data.status !== "failure") {
    return data
  }
  if (isInvalidSessionResponse(data)) {
    LogoutUser()
    return
  }
  if (data.message === "ACCESS_DENIED") {
    store.dispatch(showAlert())
    return
  }
  return data
}

axiosApi.interceptors.response.use(
  response => {
    // Admin API often returns HTTP 200 with status:"failure" + isInvalidToken
    if (hasStoredAuthToken() && isInvalidSessionResponse(response?.data)) {
      LogoutUser()
    }
    return response
  },
  error => {
    // Hard HTTP auth failures (if any endpoint uses real 401)
    const status = error?.response?.status
    const data = error?.response?.data
    if (
      hasStoredAuthToken()
      && (status === 401 || isInvalidSessionResponse(data))
    ) {
      LogoutUser()
    }
    return Promise.reject(error)
  }
)

export const updateToken = token => {
  axiosApi.defaults.headers.common["Authorization"] = "Bearer " + token
}

export const updateLanguage = languageKey => {
  axiosApi.defaults.headers.common["accept-language"] = languageKey
}

let obj

if (typeof window !== "undefined") {
  obj = JSON.parse(localStorage.getItem(USER_AUTH_KEY))
}

updateToken(obj ? obj.token : null)
// const PlanExpired = () => {
//   localStorage.clear()
//   window.location.replace("/expireplan")

// }

export async function get(url, config) {
  if (!config) {
    config = authHeader()
  }

  return await axiosApi.get(url, { ...config }).then(response => {
    return handleAuthFailureResponse(response.data)
  })
}

export async function post(url, data, config) {
  if (!config) {
    config = authHeader()
  }

  return axiosApi.post(url, data, { ...config }).then(response => {
    return handleAuthFailureResponse(response.data)
  })
}

export async function put(url, data, config) {
  if (!config) {
    config = authHeader()
  }

  return axiosApi.put(url, { ...data }, { ...config }).then(response => {
    return handleAuthFailureResponse(response.data)
  })
}

export async function del(url, config) {
  if (!config) {
    config = authHeader()
  }

  return await axiosApi.delete(url, { ...config }).then(response => {
    return handleAuthFailureResponse(response.data)
  })
}
