import {
  FD_ORDER_API_FAIL,
  GET_FD_ORDERS,
  GET_FD_ORDERS_FAIL,
  GET_FD_ORDERS_SUCCESS,
  GET_FD_ORDER,
  GET_FD_ORDER_FAIL,
  GET_FD_ORDER_SUCCESS,
  POST_FD_ORDER_REFUND,
  POST_FD_ORDER_REFUND_FAIL,
  POST_FD_ORDER_REFUND_SUCCESS,
  POST_ACCEPT_FD_ORDER,
  POST_ACCEPT_FD_ORDER_FAIL,
  POST_ACCEPT_FD_ORDER_SUCCESS,
  POST_REJECT_FD_ORDER,
  POST_REJECT_FD_ORDER_FAIL,
  POST_REJECT_FD_ORDER_SUCCESS,
  POST_INPROCESS_FD_ORDER,
  POST_INPROCESS_FD_ORDER_FAIL,
  POST_INPROCESS_FD_ORDER_SUCCESS,
  POST_FD_ORDER_STATUS,
  POST_FD_ORDER_STATUS_FAIL,
  POST_FD_ORDER_STATUS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  fdOrders: [],
  totalFdOrders: 0,
  error: "",
  loading: false,
  fdOrder: {},
}

const FdOrders = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Food Delivery Orders */
    case GET_FD_ORDERS:
      return {
        ...state,
        loading: action.payload.getSecret ? false : true,
      }

    case GET_FD_ORDERS_SUCCESS:
      return {
        ...state,
        fdOrders: action.payload.data || [],
        totalFdOrders: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_FD_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Food Delivery Orders END */

    /* Get Food Delivery Orders */
    case GET_FD_ORDER:
      return {
        ...state,
        error: "",
        loading: true,
        fdOrder: {},
      }

    case GET_FD_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fdOrder: {},
      }

    case GET_FD_ORDER_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdOrder: action.payload,
      }
    /* Add Food Delivery Orders END */

    /* Post Food Delivery Order Refund */
    case POST_FD_ORDER_REFUND:
    case POST_FD_ORDER_STATUS:
      return {
        ...state,
        loading: true,
      }

    case POST_FD_ORDER_REFUND_SUCCESS:
    case POST_FD_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case POST_FD_ORDER_REFUND_FAIL:
    case POST_FD_ORDER_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Post Food Delivery Order Refund END */

    /* Post Accept Food Delivery Order */
    case POST_ACCEPT_FD_ORDER:
      return {
        ...state,
        loading: true,
      }

    case POST_ACCEPT_FD_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case POST_ACCEPT_FD_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Post Accept Food Delivery Order END */

    /* Post Reject Food Delivery Order */
    case POST_REJECT_FD_ORDER:
      return {
        ...state,
        loading: true,
      }

    case POST_REJECT_FD_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case POST_REJECT_FD_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Post Reject Food Delivery Order END */

    /* Post Inprocess Food Delivery Order */
    case POST_INPROCESS_FD_ORDER:
      return {
        ...state,
        loading: true,
      }

    case POST_INPROCESS_FD_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case POST_INPROCESS_FD_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Post InProcess Food Delivery Order END */

    case FD_ORDER_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default FdOrders
