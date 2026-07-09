import {
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_BILLING_ALERT,
  HIDE_BILLING_ALERT,
} from "./actionTypes"

const INIT_STATE = {
  alert: false,
  billingAlert: false,
}

const Alert = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        alert: true,
      }

    case HIDE_ALERT:
      return {
        ...state,
        alert: false,
      }

    case SHOW_BILLING_ALERT:
      return {
        ...state,
        billingAlert: true,
      }

    case HIDE_BILLING_ALERT:
      return {
        ...state,
        billingAlert: false,
      }

    default:
      return state
  }
}

export default Alert
