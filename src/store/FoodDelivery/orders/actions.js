import { EXPORT_FD_RESTAURANTS_FAIL } from "../restaurants/actionTypes"
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
  EXPORT_ORDER_PDF,
  EXPORT_ORDER_PDF_FAIL,
  EXPORT_ORDER_PDF_SUCCESS,
  GET_FD_ORDERS_POST,
  GET_FD_ORDERS_POST_SUCCESS,
  GET_FD_ORDERS_POST_FAIL,
  EXPORT_ORDER_REPORT,
  EXPORT_ORDER_REPORT_FAIL,
  EXPORT_ORDER_REPORT_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: FD_ORDER_API_FAIL,
  payload: error,
})

/* Get Food Delivery Orders */
export const getFdOrders = (data, query, getSecret) => ({
  type: GET_FD_ORDERS,
  payload: { data, query, getSecret },
})

export const getFdOrdersSuccess = fdOrders => ({
  type: GET_FD_ORDERS_SUCCESS,
  payload: fdOrders,
})

export const getFdOrdersFail = error => ({
  type: GET_FD_ORDERS_FAIL,
  payload: error,
})





/* Get Food Delivery Orders */
export const getFdOrder = id => ({
  type: GET_FD_ORDER,
  payload: id,
})

export const getFdOrderFail = error => ({
  type: GET_FD_ORDER_FAIL,
  payload: error,
})

export const getFdOrderSuccess = fdOrder => ({
  type: GET_FD_ORDER_SUCCESS,
  payload: fdOrder,
})
/* Get Food Delivery Orders END */

/* Post Food Delivery Order Refund */
export const postFdOrderRefund = (data, callback) => ({
  type: POST_FD_ORDER_REFUND,
  payload: { data, callback },
})

export const postFdOrderRefundFail = error => ({
  type: POST_FD_ORDER_REFUND_FAIL,
  payload: error,
})

export const postFdOrderRefundSuccess = () => ({
  type: POST_FD_ORDER_REFUND_SUCCESS,
})
/* Post Food Delivery Order Refund END */

/* Post Accept Food Delivery Order */
export const postAcceptFdOrder = (data, callback) => ({
  type: POST_ACCEPT_FD_ORDER,
  payload: { data, callback },
})

export const postAcceptFdOrderFail = error => ({
  type: POST_ACCEPT_FD_ORDER_FAIL,
  payload: error,
})

export const postAcceptFdOrderSuccess = () => ({
  type: POST_ACCEPT_FD_ORDER_SUCCESS,
})
/* Post Accept Food Delivery Order END */

/* Post Reject Food Delivery Order */
export const postRejectFdOrder = (data, callback) => ({
  type: POST_REJECT_FD_ORDER,
  payload: { data, callback },
})

export const postRejectFdOrderFail = error => ({
  type: POST_REJECT_FD_ORDER_FAIL,
  payload: error,
})

export const postRejectFdOrderSuccess = () => ({
  type: POST_REJECT_FD_ORDER_SUCCESS,
})
/* Post Reject Food Delivery Order END */

/* Post Inprocess Food Delivery Order */
export const postInprocessFdOrder = (data, callback) => ({
  type: POST_INPROCESS_FD_ORDER,
  payload: { data, callback },
})

export const postInprocessFdOrderFail = error => ({
  type: POST_INPROCESS_FD_ORDER_FAIL,
  payload: error,
})

export const postInprocessFdOrderSuccess = () => ({
  type: POST_INPROCESS_FD_ORDER_SUCCESS,
})
/* Post Inprocess Food Delivery Order END */

/* Post Order Status */
export const postFdOrderStatus = (data, callback) => ({
  type: POST_FD_ORDER_STATUS,
  payload: { data, callback },
})

export const postFdOrderStatusFail = error => ({
  type: POST_FD_ORDER_STATUS_FAIL,
  payload: error,
})

export const postFdOrderStatusSuccess = () => ({
  type: POST_FD_ORDER_STATUS_SUCCESS,
})
/* Post Order Status END */

/* Export PDF Order */
export const exportPdfOrder = storeType => ({
  type: EXPORT_ORDER_PDF,
  payload: storeType,
})

export const exportPdfOrderSuccess = () => ({
  type: EXPORT_ORDER_PDF_SUCCESS,
})

export const exportPdfOrderFail = error => ({
  type: EXPORT_ORDER_PDF_FAIL,
  payload: error,
})


// export order 

export const exportOrderReport = () => ({
  type: EXPORT_ORDER_REPORT,
})

export const exportOrderReportSuccess = () => ({
  type: EXPORT_ORDER_REPORT_FAIL,
})

export const exportOrderReportFail = error => ({
  type: EXPORT_ORDER_REPORT_SUCCESS,
  payload: error,
})