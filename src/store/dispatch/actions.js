import {
  GET_DISPATCH,
  GET_DISPATCH_FAIL,
  GET_DISPATCH_SUCCESS,
  POST_REQUEST_DRIVERS,
  POST_REQUEST_DRIVERS_FAIL,
  POST_REQUEST_DRIVERS_SUCCESS,
  GET_DISPATCH_REQUESTS,
  GET_DISPATCH_REQUESTS_FAIL,
  GET_DISPATCH_REQUESTS_SUCCESS,
  PUT_ASSIGN_DRIVER,
  PUT_ASSIGN_DRIVER_FAIL,
  PUT_ASSIGN_DRIVER_SUCCESS,
  POST_DISPATCH_REQUEST,
  POST_DISPATCH_REQUEST_FAIL,
  POST_DISPATCH_REQUEST_SUCCESS,
  GET_DISPATCH_FARE,
  GET_DISPATCH_FARE_FAIL,
  GET_DISPATCH_FARE_SUCCESS,
} from "./actionTypes"

/* Get Dispatch Data */
export const getDispatch = () => ({
  type: GET_DISPATCH,
})

export const getDispatchSuccess = response => ({
  type: GET_DISPATCH_SUCCESS,
  payload: response,
})

export const getDispatchFail = error => ({
  type: GET_DISPATCH_FAIL,
  payload: error,
})
/* Get Dispatch Data END */

/* Get Dispatch Requests */
export const getDispatchRequests = (data, callback) => ({
  type: GET_DISPATCH_REQUESTS,
  payload: { data, callback },
})

export const getDispatchRequestsSuccess = response => ({
  type: GET_DISPATCH_REQUESTS_SUCCESS,
  payload: response,
})

export const postRequestDriversFail = error => ({
  type: POST_REQUEST_DRIVERS_FAIL,
  payload: error,
})
/* Get Dispatch Requests END */

export const postRequestDrivers = data => ({
  type: POST_REQUEST_DRIVERS,
  payload: data,
})

export const postRequestDriversSuccess = response => ({
  type: POST_REQUEST_DRIVERS_SUCCESS,
  payload: response,
})

export const getDispatchRequestsFail = error => ({
  type: GET_DISPATCH_REQUESTS_FAIL,
  payload: error,
})

export const putAssignDriver = (id, data, callback) => ({
  type: PUT_ASSIGN_DRIVER,
  payload: { id, data, callback },
})

export const putAssignDriverSuccess = response => ({
  type: PUT_ASSIGN_DRIVER_SUCCESS,
  payload: response,
})

export const putAssignDriverFail = error => ({
  type: PUT_ASSIGN_DRIVER_FAIL,
  payload: error,
})

/* Create Dispute Request */
export const postDispatchRequest = (data, callback) => ({
  type: POST_DISPATCH_REQUEST,
  payload: { data, callback },
})

export const postDispatchRequestSuccess = data => ({
  type: POST_DISPATCH_REQUEST_SUCCESS,
  payload: data,
})

export const postDispatchRequestFail = error => ({
  type: POST_DISPATCH_REQUEST_FAIL,
  payload: error,
})
/* Create Dispute Request */

/* Get Dispute Request Fare */
export const getDispatchFare = (data, callback) => ({
  type: GET_DISPATCH_FARE,
  payload: { data, callback },
})

export const getDispatchFareSuccess = data => ({
  type: GET_DISPATCH_FARE_SUCCESS,
  payload: data,
})

export const getDispatchFareFail = error => ({
  type: GET_DISPATCH_FARE_FAIL,
  payload: error,
})
/* Get Dispute Request Fare END */
