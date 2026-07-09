import { USER_AUTH_KEY } from "helpers/contants"

export default () => {
  let obj

  if (typeof window !== "undefined") {
    obj = JSON.parse(localStorage.getItem(USER_AUTH_KEY))
  }

  if (obj && obj.token) {
    return { Authorization: "Bearer " + obj.token }
  } else {
    return {}
  }
}
