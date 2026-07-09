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

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
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

const LogoutUser = () => {
  localStorage.clear()
  window.location.replace("/login")
}
// const PlanExpired = () => {
//   localStorage.clear()
//   window.location.replace("/expireplan")

// }

export async function get(url, config) {
  if (!config) {
    config = authHeader()
  }

  return await axiosApi.get(url, { ...config }).then(response => {
    if (response.data.status === "failure") {
      if (response.data.error_description == "Invalid Login Credential!") {
        // return LogoutUser()
        return LogoutUser()
      }
      if (response.data.isInvalidToken) {
        LogoutUser()
        // return { status: "failure" }
      } else if (response.data.message === "ACCESS_DENIED") {
        store.dispatch(showAlert())
      } else {
        return response.data
      }
    } else {
      return response.data
    }
  })
}

export async function post(url, data, config) {
  if (!config) {
    config = authHeader()
  }

  return axiosApi.post(url, data, { ...config }).then(response => {
    if (response.data.status === "failure") {
      if (response.data.isInvalidToken) {
        LogoutUser()
        // return { status: "failure" }
      } else if (response.data.message === "ACCESS_DENIED") {
        store.dispatch(showAlert())
      } else {
        return response.data
      }
    } else {
      return response.data
    }
  })
}

export async function put(url, data, config) {
  if (!config) {
    config = authHeader()
  }

  return axiosApi.put(url, { ...data }, { ...config }).then(response => {
    if (response.data.status === "failure") {
      if (response.data.isInvalidToken) {
        LogoutUser()
        // return { status: "failure" }
      } else if (response.data.message === "ACCESS_DENIED") {
        store.dispatch(showAlert())
      } else {
        return response.data
      }
    } else {
      return response.data
    }
  })
}

export async function del(url, config) {
  if (!config) {
    config = authHeader()
  }

  return await axiosApi.delete(url, { ...config }).then(response => {
    if (response.data.status === "failure") {
      if (response.data.isInvalidToken) {
        LogoutUser()
        // return { status: "failure" }
      } else if (response.data.message === "ACCESS_DENIED") {
        store.dispatch(showAlert())
      } else {
        return response.data
      }
    } else {
      return response.data
    }
  })
}
