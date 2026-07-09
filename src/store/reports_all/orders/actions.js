import {
  GET_ORDERS_REPORTS,
  GET_ORDERS_REPORTS_SUCCESS,
  GET_ORDERS_REPORTS_FAIL,
} from "./actionTypes"

export const getOrder_Reports = data => {
  return {
    type: GET_ORDERS_REPORTS,
    data,
  }
}

export const getOrder_Reports_Success = domain => ({
  type: GET_ORDERS_REPORTS_SUCCESS,
  payload: domain,
})

export const getOrder_Reports_Fail = error => ({
  type: GET_ORDERS_REPORTS_FAIL,
  payload: error,
})
