import {
  SUB_ADMIN_API_FAIL,
  GET_SUB_ADMINS,
  GET_SUB_ADMINS_FAIL,
  GET_SUB_ADMINS_SUCCESS,
  ADD_SUB_ADMIN,
  ADD_SUB_ADMIN_FAIL,
  ADD_SUB_ADMIN_SUCCESS,
  GET_SUB_ADMIN,
  GET_SUB_ADMIN_FAIL,
  GET_SUB_ADMIN_SUCCESS,
  PUT_SUB_ADMIN,
  PUT_SUB_ADMIN_FAIL,
  PUT_SUB_ADMIN_SUCCESS,
  DELETE_SUB_ADMIN,
  DELETE_SUB_ADMIN_FAIL,
  DELETE_SUB_ADMIN_SUCCESS,
  PUT_SUB_ADMINS_STATUS,
  PUT_SUB_ADMINS_STATUS_FAIL,
  GET_CUSTOMER_DISPATCHER_LIST,
  GET_CUSTOMER_DISPATCHER_LIST_SUCCESS,
  PUT_SUB_ADMINS_STATUS_SUCCESS,
  GET_DRIVER_DISPATCHER_LIST_FAILURE,
  GET_DRIVER_DISPATCHER_LIST,
  GET_DRIVER_DISPATCHER_LIST_SUCCESS,
  GET_VENDOR_LIST_SUBADMIN,
  GET_VENDOR_LIST_SUBADMIN_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: SUB_ADMIN_API_FAIL,
  payload: error,
})

/* Get subAdmins */
export const getSubAdmins = data => ({
  type: GET_SUB_ADMINS,
  payload: data,
})

export const getSubAdminsSuccess = subAdmins => ({
  type: GET_SUB_ADMINS_SUCCESS,
  payload: subAdmins,
})

export const getSubAdminsFail = error => ({
  type: GET_SUB_ADMINS_FAIL,
  payload: error,
})
/* Get SubAdmins END */

/* Add SubAdmin */
export const addSubAdmin = (subAdmin, history) => ({
  type: ADD_SUB_ADMIN,
  payload: { subAdmin, history },
})

export const addSubAdminFail = error => ({
  type: ADD_SUB_ADMIN_FAIL,
  payload: error,
})

export const addSubAdminSuccess = () => ({
  type: ADD_SUB_ADMIN_SUCCESS,
})
/* Add SubAdmin END */

/* Get SubAdmin */
export const getSubAdmin = id => ({
  type: GET_SUB_ADMIN,
  payload: id,
})

export const getSubAdminFail = error => ({
  type: GET_SUB_ADMIN_FAIL,
  payload: error,
})

export const getSubAdminSuccess = subAdmin => ({
  type: GET_SUB_ADMIN_SUCCESS,
  payload: subAdmin,
})
/* Get SubAdmin END */

/* Update SubAdmin */
export const putSubAdmin = (data, history) => ({
  type: PUT_SUB_ADMIN,
  payload: { data, history },
})

export const putSubAdminFail = error => ({
  type: PUT_SUB_ADMIN_FAIL,
  payload: error,
})

export const putSubAdminSuccess = () => ({
  type: PUT_SUB_ADMIN_SUCCESS,
})
/* Update SubAdmin END */

/* Delete SubAdmin */
export const deleteSubAdmin = (data, callback) => ({
  type: DELETE_SUB_ADMIN,
  payload: { data, callback },
})

export const deleteSubAdminFail = error => ({
  type: DELETE_SUB_ADMIN_FAIL,
  payload: error,
})

export const deleteSubAdminSuccess = () => ({
  type: DELETE_SUB_ADMIN_SUCCESS,
})
/* Delete Faz END */

/* Update Multi SubAdmins Status */
export const putSubAdminsStatus = (data, callback) => ({
  type: PUT_SUB_ADMINS_STATUS,
  payload: { data, callback },
})

export const putSubAdminsStatusFail = error => ({
  type: PUT_SUB_ADMINS_STATUS_FAIL,
  payload: error,
})

export const putSubAdminsStatusSuccess = () => ({
  type: PUT_SUB_ADMINS_STATUS_SUCCESS,
})
/* Update Multi SubAdmins Status END */


/* Get DriverList */
export const getDriverDispatcherList = data => ({
  type: GET_DRIVER_DISPATCHER_LIST,
  payload: { data },
})

export const getDriverDispatcherListFail = error => ({
  type: GET_DRIVER_DISPATCHER_LIST_FAILURE,
  payload: error,
})

export const getDriverDispatcherListSuccess = data => ({
  type: GET_DRIVER_DISPATCHER_LIST_SUCCESS,
  payload: data,
})

export const getCustomerDispatcherList = data => ({
  type: GET_CUSTOMER_DISPATCHER_LIST,
  payload: { data },
})

export const getCustomerDispatcherListSuccess = data => ({
  type: GET_CUSTOMER_DISPATCHER_LIST_SUCCESS,
  payload: data,
})

export const getVendorListSubAdmin = data => ({
  type: GET_VENDOR_LIST_SUBADMIN,
  payload: data,
})

export const getVendorListSubAdminSuccess = data => ({
  type: GET_VENDOR_LIST_SUBADMIN_SUCCESS,
  payload: data,
})


/* Get SubAdmin END */