import {
  PROMOTION_API_FAIL,
  GET_PROMOTIONS,
  GET_PROMOTIONS_FAIL,
  GET_PROMOTIONS_SUCCESS,
  ADD_PROMOTION,
  ADD_PROMOTION_FAIL,
  ADD_PROMOTION_SUCCESS,
  GET_PROMOTION,
  GET_PROMOTION_FAIL,
  GET_PROMOTION_SUCCESS,
  PUT_PROMOTION,
  PUT_PROMOTION_FAIL,
  PUT_PROMOTION_SUCCESS,
  DELETE_PROMOTION,
  DELETE_PROMOTION_FAIL,
  DELETE_PROMOTION_SUCCESS,
  PUT_PROMOTIONS_STATUS,
  PUT_PROMOTIONS_STATUS_FAIL,
  PUT_PROMOTIONS_STATUS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  promotions: [],
  totalPromotions: 0,
  error: "",
  loading: false,
  promotion: {},
}

const Promotion = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Promotions */
    case GET_PROMOTIONS:
      return {
        ...state,
        loading: true,
      }

    case GET_PROMOTIONS_SUCCESS:
      return {
        ...state,
        promotions: action.payload.data || [],
        totalPromotions: action.payload.totalcount || 0,
        loading: false,
      }

    case GET_PROMOTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Promotions END */

    /* Add Promo Code */
    case ADD_PROMOTION:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_PROMOTION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_PROMOTION_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Promo Code END */

    /* Get Promo Code */
    case GET_PROMOTION:
      return {
        ...state,
        error: "",
        loading: true,
        promotion: {},
      }

    case GET_PROMOTION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        promotion: {},
      }

    case GET_PROMOTION_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        promotion: action.payload,
      }
    /* Add Promo Code END */

    /* Update Promo Code */
    case PUT_PROMOTION:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_PROMOTION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_PROMOTION_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Promo Code END */

    /* Delete Promo Code */
    case DELETE_PROMOTION:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_PROMOTION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_PROMOTION_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Promo Code END */

    /* Update Promo Codes Status */
    case PUT_PROMOTIONS_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_PROMOTIONS_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_PROMOTIONS_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Promo Codes Status END */

    case PROMOTION_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Promotion
