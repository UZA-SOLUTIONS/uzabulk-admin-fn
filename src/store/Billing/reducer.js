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

const INIT_STATE = {
  billingDone: false,
  currentPlan: {},
  currentPlanLoading: false,
  currentPlanFailed: false,
  plans: [],
  cardDetails: null,
  loading: false,
  error: "",
  currentPlan: {},
}

const Billing = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Current Plan */
    case GET_CURRENT_PLAN:
      return {
        ...state,
        currentPlanLoading: true,
        currentPlanFailed: false,
      }

    case GET_CURRENT_PLAN_SUCCESS:
      return {
        ...state,
        currentPlanLoading: false,
        currentPlanFailed: false,
        currentPlan: action.payload,
        billingDone: true,
        error: "",
      }

    case GET_CURRENT_PLAN_FAIL:
      return {
        ...state,
        currentPlanLoading: false,
        currentPlanFailed: true,
      }
    /* Get Current Plan END */

    /* Get Billing Plans */
    case GET_BILLING_PLANS:
      return {
        ...state,
        loading: true,
        error: "",
      }

    case GET_BILLING_PLANS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        plans: [], // action.payload?.data,
        cardDetails: action?.payload?.cardDetails,
      }

    case GET_BILLING_PLANS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    /* Get Billing Plans END */

    /* Get Billing Plans */
    case POST_BILLING_CARD:
      return {
        ...state,
        loading: true,
        error: "",
      }

    case POST_BILLING_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        cardDetails: action?.payload,
      }

    case POST_BILLING_CARD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    /* Get Billing Plans END */

    /* Upgrade Plan */
    case POST_UPGRADE_PLAN:
      return {
        ...state,
        loading: true,
      }

    case POST_UPGRADE_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case POST_UPGRADE_PLAN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    /* Upgrade Plan */

    default:
      return state
  }
}

export default Billing
