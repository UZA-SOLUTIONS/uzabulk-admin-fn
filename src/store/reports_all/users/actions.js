import {
  GET_CUSTOMERS_REPORTS,
  GET_CUSTOMERS_REPORTS_SUCCESS,
  GET_CUSTOMERS_REPORTS_FAIL,
} from "./actionTypes"

export const getCustomer_Reports = data => {
  return {
    type: GET_CUSTOMERS_REPORTS,
    data,
  }
}

export const getCustomer_Reports_Success = domain => ({
  type: GET_CUSTOMERS_REPORTS_SUCCESS,
  payload: domain,
})

export const getCustomer_Reports_Fail = error => ({
  type: GET_CUSTOMERS_REPORTS_FAIL,
  payload: error,
})
