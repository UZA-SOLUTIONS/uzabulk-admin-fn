import {
  FD_BUSINESS_TYPE_API_FAIL,
  GET_FD_BUSINESS_TYPES,
  GET_FD_BUSINESS_TYPES_FAIL,
  GET_FD_BUSINESS_TYPES_SUCCESS,
  ADD_FD_BUSINESS_TYPE,
  ADD_FD_BUSINESS_TYPE_FAIL,
  ADD_FD_BUSINESS_TYPE_SUCCESS,
  GET_FD_BUSINESS_TYPE,
  GET_FD_BUSINESS_TYPE_FAIL,
  GET_FD_BUSINESS_TYPE_SUCCESS,
  PUT_FD_BUSINESS_TYPE,
  PUT_FD_BUSINESS_TYPE_FAIL,
  PUT_FD_BUSINESS_TYPE_SUCCESS,
  DELETE_FD_BUSINESS_TYPE,
  DELETE_FD_BUSINESS_TYPE_FAIL,
  DELETE_FD_BUSINESS_TYPE_SUCCESS,
  PUT_FD_BUSINESS_TYPES_STATUS,
  PUT_FD_BUSINESS_TYPES_STATUS_FAIL,
  PUT_FD_BUSINESS_TYPES_STATUS_SUCCESS,
  EXPORT_FD_BUSINESS_TYPES,
  EXPORT_FD_BUSINESS_TYPES_SUCCESS,
  EXPORT_FD_BUSINESS_TYPES_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  fdBusinessTypes: [],
  totalFdBusinessTypes: 0,
  error: "",
  loading: false,
  fdBusinesstype: {},
}

const FdBusinessTypes = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Food Delivery BusinessTypes */
    case GET_FD_BUSINESS_TYPES:
      return {
        ...state,
        loading: true,
      }

    case GET_FD_BUSINESS_TYPES_SUCCESS:
      return {
        ...state,
        fdBusinessTypes: action.payload.data || [],
        totalFdBusinessTypes: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_FD_BUSINESS_TYPES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Food Delivery BusinessTypes END */

    /* Add Food Delivery BusinessTypes */
    case ADD_FD_BUSINESS_TYPE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_FD_BUSINESS_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_FD_BUSINESS_TYPE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Food Delivery BusinessTypes END */

    /* Get Food Delivery BusinessTypes */
    case GET_FD_BUSINESS_TYPE:
      return {
        ...state,
        error: "",
        loading: true,
        fdBusinesstype: {},
      }

    case GET_FD_BUSINESS_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fdBusinesstype: {},
      }

    case GET_FD_BUSINESS_TYPE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdBusinesstype: action.payload,
      }
    /* Add Food Delivery BusinessTypes END */

    /* Update Food Delivery BusinessTypes */
    case PUT_FD_BUSINESS_TYPE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_BUSINESS_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_BUSINESS_TYPE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery BusinessTypes END */

    /* Delete Food Delivery BusinessTypes */
    case DELETE_FD_BUSINESS_TYPE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_FD_BUSINESS_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_FD_BUSINESS_TYPE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Food Delivery BusinessTypes END */

    /* Update Food Delivery BusinessTypes Status */
    case PUT_FD_BUSINESS_TYPES_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_BUSINESS_TYPES_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_BUSINESS_TYPES_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery BusinessTypes Status END */

    /* Export FdBusinessTypes */
    case EXPORT_FD_BUSINESS_TYPES:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case EXPORT_FD_BUSINESS_TYPES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case EXPORT_FD_BUSINESS_TYPES_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Export FdBusinessTypes END */

    case FD_BUSINESS_TYPE_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default FdBusinessTypes
