import {
  GET_CURRENT_PLAN,
  GET_CURRENT_PLAN_SUCCESS,
  GET_CURRENT_PLAN_FAIL,
  GET_BILLING_PLANS,
  GET_BILLING_PLANS_SUCCESS,
  GET_BILLING_PLANS_FAIL,
  POST_BILLING_CARD,
  POST_BILLING_CARD_SUCCESS,
  POST_BILLING_CARD_FAIL,
  POST_UPGRADE_PLAN,
  POST_UPGRADE_PLAN_SUCCESS,
  POST_UPGRADE_PLAN_FAIL,
} from "./actionTypes"

/* Get Current Plan */
export const getCurrentPlan = () => ({
  type: GET_CURRENT_PLAN,
})

export const getCurrentPlanSuccess = data => ({
  type: GET_CURRENT_PLAN_SUCCESS,
  payload: data,
})

export const getCurrentPlanFail = error => ({
  type: GET_CURRENT_PLAN_FAIL,
  payload: error,
})
/* Get Current Plan END */

/* Get Billing Plans */
export const getBillingPlans = data => ({
  type: GET_BILLING_PLANS,
  payload: data,
})

export const getBillingPlansSuccess = (data, cardDetails) => ({
  type: GET_BILLING_PLANS_SUCCESS,
  payload: { data, cardDetails },
})

export const getBillingPlansFail = () => ({
  type: GET_BILLING_PLANS_FAIL,
})
/* Get Billing Plans END */

/* Add/Update Billing Card */
export const postBillingCard = (data, callback) => ({
  type: POST_BILLING_CARD,
  payload: { data, callback },
})

export const postBillingCardSuccess = data => ({
  type: POST_BILLING_CARD_SUCCESS,
  payload: data,
})

export const postBillingCardFail = () => ({
  type: POST_BILLING_CARD_FAIL,
})
/* Add/Update Billing Card END */

/* Upgrade Billing Plan */
export const postUpgradePlan = data => ({
  type: POST_UPGRADE_PLAN,
  payload: data,
})

export const postUpgradePlanSuccess = () => ({
  type: POST_UPGRADE_PLAN_SUCCESS,
})

export const postUpgradePlanFail = error => ({
  type: POST_UPGRADE_PLAN_FAIL,
  payload: error,
})
/* Upgrade Billing Plan End */
