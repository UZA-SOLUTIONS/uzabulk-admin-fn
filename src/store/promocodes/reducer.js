import {
  PROMO_CODE_API_FAIL,
  GET_PROMO_CODES,
  GET_PROMO_CODES_FAIL,
  GET_PROMO_CODES_SUCCESS,
  ADD_PROMO_CODE,
  ADD_PROMO_CODE_FAIL,
  ADD_PROMO_CODE_SUCCESS,
  GET_PROMO_CODE,
  GET_PROMO_CODE_FAIL,
  GET_PROMO_CODE_SUCCESS,
  PUT_PROMO_CODE,
  PUT_PROMO_CODE_FAIL,
  PUT_PROMO_CODE_SUCCESS,
  DELETE_PROMO_CODE,
  DELETE_PROMO_CODE_FAIL,
  DELETE_PROMO_CODE_SUCCESS,
  PUT_PROMO_CODES_STATUS,
  PUT_PROMO_CODES_STATUS_FAIL,
  PUT_PROMO_CODES_STATUS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  promoCodes: [],
  totalPromoCodes: 0,
  error: "",
  loading: false,
  promoCode: {},
}

const PromoCode = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get PromoCodes */
    case GET_PROMO_CODES:
      return {
        ...state,
        loading: true,
        error: "",
      }

    case GET_PROMO_CODES_SUCCESS:
      return {
        ...state,
        promoCodes: action.payload.data || [],
        totalPromoCodes: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_PROMO_CODES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get PromoCodes END */

    /* Add Promo Code */
    case ADD_PROMO_CODE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_PROMO_CODE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_PROMO_CODE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Promo Code END */

    /* Get Promo Code */
    case GET_PROMO_CODE:
      return {
        ...state,
        error: "",
        loading: true,
        promoCode: {},
      }

    case GET_PROMO_CODE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        promoCode: {},
      }

    case GET_PROMO_CODE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        promoCode: action.payload,
      }
    /* Add Promo Code END */

    /* Update Promo Code */
    case PUT_PROMO_CODE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_PROMO_CODE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_PROMO_CODE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Promo Code END */

    /* Delete Promo Code */
    case DELETE_PROMO_CODE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_PROMO_CODE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_PROMO_CODE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Promo Code END */

    /* Update Promo Codes Status */
    case PUT_PROMO_CODES_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_PROMO_CODES_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_PROMO_CODES_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Promo Codes Status END */

    case PROMO_CODE_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default PromoCode
