import {
  SHOW_ALERT,
  HIDE_ALERT,
  RELOAD_ON_DEMAND,
  SHOW_BILLING_ALERT,
  HIDE_BILLING_ALERT,
} from "./actionTypes"

export const showAlert = () => ({
  type: SHOW_ALERT,
})

export const hideAlert = () => ({
  type: HIDE_ALERT,
})

export const reloadOnDemand = () => ({
  type: RELOAD_ON_DEMAND,
})

export const showBillingAlert = () => ({
  type: SHOW_BILLING_ALERT,
})

export const hideBillingAlert = () => ({
  type: HIDE_BILLING_ALERT,
})
