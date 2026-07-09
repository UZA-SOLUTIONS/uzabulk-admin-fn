import {
  FD_REQUEST_API_FAIL,
  GET_FD_REQUESTS,
  GET_FD_REQUESTS_FAIL,
  GET_FD_PENDING_REQUEST_SUCCESS,
  GET_FD_CONFIRMED_REQUEST_SUCCESS,
  GET_FD_COMPLETED_REQUEST_SUCCESS,
  GET_FD_REJECTED_REQUEST_SUCCESS,
  GET_FD_CANCELLED_REQUEST_SUCCESS,
  GET_FD_REQUEST,
  GET_FD_REQUEST_FAIL,
  GET_FD_REQUEST_SUCCESS,
  POST_FD_REQUEST_REFUND,
  POST_FD_REQUEST_REFUND_FAIL,
  POST_FD_REQUEST_REFUND_SUCCESS,
  POST_ACCEPT_FD_REQUEST,
  POST_ACCEPT_FD_REQUEST_FAIL,
  POST_ACCEPT_FD_REQUEST_SUCCESS,
  POST_REJECT_FD_REQUEST,
  POST_REJECT_FD_REQUEST_FAIL,
  POST_REJECT_FD_REQUEST_SUCCESS,
  POST_READY_FD_REQUEST,
  POST_READY_FD_REQUEST_FAIL,
  POST_READY_FD_REQUEST_SUCCESS,
  POST_COMPLETE_FD_REQUEST,
  POST_COMPLETE_FD_REQUEST_FAIL,
  POST_COMPLETE_FD_REQUEST_SUCCESS,
  POST_CANCELLED_FD_REQUEST_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  fdPendingRequests: [],
  fdConfirmedRequests: [],
  fdCompletedRequests: [],
  fdRejectedRequests: [],
  fdCancelledRequests: [],
  totalFdRequests: 0,
  error: "",
  loading: false,
  fdRequest: {},
}

const FdRequests = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Food Delivery Requests */
    case GET_FD_REQUESTS:
      return {
        ...state,
        loading: action.payload.getSecret ? false : true,
      }

    case GET_FD_PENDING_REQUEST_SUCCESS:
      return {
        ...state,
        fdPendingRequests: action.payload.data || [],
        totalFdRequests: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_FD_CONFIRMED_REQUEST_SUCCESS:
      return {
        ...state,
        fdConfirmedRequests: action.payload.data || [],
        totalFdRequests: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_FD_COMPLETED_REQUEST_SUCCESS:
      return {
        ...state,
        fdCompletedRequests: action.payload.data || [],
        totalFdRequests: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_FD_REJECTED_REQUEST_SUCCESS:
      return {
        ...state,
        fdRejectedRequests: action.payload.data || [],
        totalFdRequests: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_FD_CANCELLED_REQUEST_SUCCESS:
      return {
        ...state,
        fdCancelledRequests: action.payload.data || [],
        totalFdRequests: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_FD_REQUESTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Food Delivery Requests END */

    /* Get Food Delivery Requests */
    case GET_FD_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
        fdRequest: {},
      }

    case GET_FD_REQUEST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fdRequest: {},
      }

    case GET_FD_REQUEST_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdRequest: action.payload,
      }
    /* Add Food Delivery Requests END */

    /* Post Food Delivery Request Refund */
    case POST_FD_REQUEST_REFUND:
      return {
        ...state,
        loading: true,
      }

    case POST_FD_REQUEST_REFUND_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      }

    case POST_FD_REQUEST_REFUND_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Post Food Delivery Request Refund END */

    /* Post Accept Food Delivery Request */
    case POST_ACCEPT_FD_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case POST_ACCEPT_FD_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      }

    case POST_ACCEPT_FD_REQUEST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Post Accept Food Delivery Request END */

    /* Post Reject Food Delivery Request */
    case POST_REJECT_FD_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case POST_REJECT_FD_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      }

    case POST_REJECT_FD_REQUEST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Post Reject Food Delivery Request END */

    /* Post Ready Food Delivery Request */
    case POST_READY_FD_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case POST_READY_FD_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      }

    case POST_READY_FD_REQUEST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Post Ready Food Delivery Request END */

    /* Post Complete Food Delivery Request */
    case POST_COMPLETE_FD_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case POST_COMPLETE_FD_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      }

    case POST_COMPLETE_FD_REQUEST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case POST_CANCELLED_FD_REQUEST_FAIL: {
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    }
    /* Post Complete Food Delivery Request END */

    case FD_REQUEST_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default FdRequests
