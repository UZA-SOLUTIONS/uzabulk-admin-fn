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
  POST_CANCELLED_FD_REQUEST,
  POST_CANCELLED_FD_REQUEST_FAIL,
  POST_CANCELLED_FD_REQUEST_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: FD_REQUEST_API_FAIL,
  payload: error,
})

/* Get Food Delivery Requests */
export const getFdRequests = (data, status, getSecret) => ({
  type: GET_FD_REQUESTS,
  payload: { data, status, getSecret },
})

export const getFdPendingRequestsSuccess = fdRequests => ({
  type: GET_FD_PENDING_REQUEST_SUCCESS,
  payload: fdRequests,
})

export const getFdConfirmedRequestsSuccess = fdRequests => ({
  type: GET_FD_CONFIRMED_REQUEST_SUCCESS,
  payload: fdRequests,
})

export const getFdCompletedRequestsSuccess = fdRequests => ({
  type: GET_FD_COMPLETED_REQUEST_SUCCESS,
  payload: fdRequests,
})

export const getFdRejectedRequestsSuccess = fdRequests => ({
  type: GET_FD_REJECTED_REQUEST_SUCCESS,
  payload: fdRequests,
})

export const getFdCancelledRequestsSuccess = fdRequests => ({
  type: GET_FD_CANCELLED_REQUEST_SUCCESS,
  payload: fdRequests,
})

export const getFdRequestsFail = error => ({
  type: GET_FD_REQUESTS_FAIL,
  payload: error,
})
/* Get Food Delivery Requests END */

/* Get Food Delivery Requests */
export const getFdRequest = id => ({
  type: GET_FD_REQUEST,
  payload: id,
})

export const getFdRequestFail = error => ({
  type: GET_FD_REQUEST_FAIL,
  payload: error,
})

export const getFdRequestSuccess = fdRequest => ({
  type: GET_FD_REQUEST_SUCCESS,
  payload: fdRequest,
})
/* Get Food Delivery Requests END */

/* Post Food Delivery Request Refund */
export const postFdRequestRefund = (data, callback) => ({
  type: POST_FD_REQUEST_REFUND,
  payload: { data, callback },
})

export const postFdRequestRefundFail = error => ({
  type: POST_FD_REQUEST_REFUND_FAIL,
  payload: error,
})

export const postFdRequestRefundSuccess = () => ({
  type: POST_FD_REQUEST_REFUND_SUCCESS,
})
/* Post Food Delivery Request Refund END */

/* Post Accept Food Delivery Request */
export const postAcceptFdRequest = (data, callback) => ({
  type: POST_ACCEPT_FD_REQUEST,
  payload: { data, callback },
})

export const postAcceptFdRequestFail = error => ({
  type: POST_ACCEPT_FD_REQUEST_FAIL,
  payload: error,
})

export const postAcceptFdRequestSuccess = () => ({
  type: POST_ACCEPT_FD_REQUEST_SUCCESS,
})
/* Post Accept Food Delivery Request END */

/* Post Reject Food Delivery Request */
export const postRejectFdRequest = (data, callback) => ({
  type: POST_REJECT_FD_REQUEST,
  payload: { data, callback },
})

export const postRejectFdRequestFail = error => ({
  type: POST_REJECT_FD_REQUEST_FAIL,
  payload: error,
})

export const postRejectFdRequestSuccess = () => ({
  type: POST_REJECT_FD_REQUEST_SUCCESS,
})
/* Post Reject Food Delivery Request END */

/* Post Ready Food Delivery Request */
export const postReadyFdRequest = (data, callback) => ({
  type: POST_READY_FD_REQUEST,
  payload: { data, callback },
})

export const postReadyFdRequestFail = error => ({
  type: POST_READY_FD_REQUEST_FAIL,
  payload: error,
})

export const postReadyFdRequestSuccess = () => ({
  type: POST_READY_FD_REQUEST_SUCCESS,
})
/* Post Ready Food Delivery Request END */

/* Post Complete Food Delivery Request */
export const postCompleteFdRequest = (data, callback) => ({
  type: POST_COMPLETE_FD_REQUEST,
  payload: { data, callback },
})

export const postCompleteFdRequestFail = error => ({
  type: POST_COMPLETE_FD_REQUEST_FAIL,
  payload: error,
})

export const postCompleteFdRequestSuccess = () => ({
  type: POST_COMPLETE_FD_REQUEST_SUCCESS,
})

/* Post Complete Food Delivery Request */
export const postCancelledFdRequest = (data, callback) => ({
  type: POST_CANCELLED_FD_REQUEST,
  payload: { data, callback },
})

export const postCancelledFdRequestFail = error => ({
  type: POST_CANCELLED_FD_REQUEST_FAIL,
  payload: error,
})

export const postCancelledFdRequestSuccess = () => ({
  type: POST_CANCELLED_FD_REQUEST_SUCCESS,
})

/* Post Complete Food Delivery Request END */
