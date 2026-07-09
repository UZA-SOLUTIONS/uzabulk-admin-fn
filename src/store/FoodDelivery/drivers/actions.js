import {
  FD_DRIVER_API_FAIL,
  GET_FD_DRIVERS,
  GET_FD_DRIVERS_FAIL,
  GET_FD_DRIVERS_SUCCESS,
  ADD_FD_DRIVER,
  ADD_FD_DRIVER_FAIL,
  ADD_FD_DRIVER_SUCCESS,
  GET_FD_DRIVER,
  GET_FD_DRIVER_FAIL,
  GET_FD_DRIVER_SUCCESS,
  PUT_FD_DRIVER,
  PUT_FD_DRIVER_FAIL,
  PUT_FD_DRIVER_SUCCESS,
  DELETE_FD_DRIVER,
  DELETE_FD_DRIVER_FAIL,
  DELETE_FD_DRIVER_SUCCESS,
  PUT_FD_DRIVERS_STATUS,
  PUT_FD_DRIVERS_STATUS_FAIL,
  PUT_FD_DRIVERS_STATUS_SUCCESS,
  POST_FD_DRIVER_PAY,
  POST_FD_DRIVER_PAY_SUCCESS,
  POST_FD_DRIVER_PAY_FAIL,
  POST_FD_DRIVER_PAY_ADJUSTMENT,
  POST_FD_DRIVER_PAY_ADJUSTMENT_SUCCESS,
  POST_FD_DRIVER_PAY_ADJUSTMENT_FAIL,
  EXPORT_DRIVERS,
  EXPORT_DRIVERS_SUCCESS,
  EXPORT_DRIVERS_FAIL,
  IMPORT_DRIVERS,
  IMPORT_DRIVERS_SUCCESS,
  IMPORT_DRIVERS_FAIL,
  EDIT_DRIVER_VEHICLE_INFO,
  EDIT_DRIVER_VEHICLE_INFO_SUCCESS,
  EDIT_DRIVER_VEHICLE_INFO_FAIL,
  UPDATE_DRIVER_VEHICLE_INFO,
  UPDATE_DRIVER_VEHICLE_INFO_FAIL,
  UPDATE_DRIVER_VEHICLE_INFO_SUCCESS,
  DRIVER_VEHICLE_LIST,
  DRIVER_VEHICLE_LIST_FAIL,
  DRIVER_VEHICLE_LIST_SUCCESS,
  DRIVER_BANK_INFO,
  DRIVER_BANK_INFO_SUCCESS,
  DRIVER_BANK_INFO_FAIL,
  DRIVER_BANK_INFO_UPDATE,
  DRIVER_BANK_INFO__UPDATE_SUCCESS,
  DRIVER_BANK_INFO__UPDATE_FAIL,
  ADD_DRIVER_SERVICES,
  ADD_DRIVER_SERVICES_SUCCESS,
  ADD_DRIVER_SERVICES_FAIL,
  DELETE_DRIVER_SERVICES,
  DELETE_DRIVER_SERVICES_SUCCESS,
  DELETE_DRIVER_SERVICES_FAIL,
  DELETE_VIRTUAL_ACCOUNT,
  DELETE_VIRTUAL_ACCOUNT_SUCCESS,
  DELETE_VIRTUAL_ACCOUNT_FAIL,
  GET_FD_DRIVER_POST,
  GET_FD_DRIVER_POST_FAIL,
  GET_FD_DRIVER_POST_SUCCESS,
} from "./actionTypes"
/* Document */
import {
  GET_FD_DRIVER_DOCUMENTS,
  GET_FD_DRIVER_DOCUMENTS_FAIL,
  GET_FD_DRIVER_DOCUMENTS_SUCCESS,
  POST_FD_DRIVER_DOCUMENT,
  POST_FD_DRIVER_DOCUMENT_FAIL,
  POST_FD_DRIVER_DOCUMENT_SUCCESS,
  GET_FD_DRIVER_DOCUMENT,
  GET_FD_DRIVER_DOCUMENT_FAIL,
  GET_FD_DRIVER_DOCUMENT_SUCCESS,
  PUT_FD_DRIVER_DOCUMENT,
  PUT_FD_DRIVER_DOCUMENT_FAIL,
  PUT_FD_DRIVER_DOCUMENT_SUCCESS,
  DELETE_FD_DRIVER_DOCUMENT,
  DELETE_FD_DRIVER_DOCUMENT_FAIL,
  DELETE_FD_DRIVER_DOCUMENT_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: FD_DRIVER_API_FAIL,
  payload: error,
})

/* Get Food Delivery Drivers */
export const getFdDrivers = (storeType, data) => ({
  type: GET_FD_DRIVERS,
  payload: { storeType, data },
})

export const getFdDriversSuccess = fdDrivers => ({
  type: GET_FD_DRIVERS_SUCCESS,
  payload: fdDrivers,
})

export const getFdDriversFail = error => ({
  type: GET_FD_DRIVERS_FAIL,
  payload: error,
})
/* Get Food Delivery Drivers END */

/* Add Food Delivery Drivers */
export const addFdDriver = (storeType, fdDriver, history) => ({
  type: ADD_FD_DRIVER,
  payload: { storeType, fdDriver, history },
})

export const addFdDriverFail = error => ({
  type: ADD_FD_DRIVER_FAIL,
  payload: error,
})

export const addFdDriverSuccess = () => ({
  type: ADD_FD_DRIVER_SUCCESS,
})
/* Add Food Delivery Drivers END */

/* Get Food Delivery Drivers */
export const getFdDriver = (storeType, id) => ({
  type: GET_FD_DRIVER,
  payload: { storeType, id },
})

export const getFdDriverFail = error => ({
  type: GET_FD_DRIVER_FAIL,
  payload: error,
})

export const getFdDriverSuccess = fdDriver => ({
  type: GET_FD_DRIVER_SUCCESS,
  payload: fdDriver,
})

// date filter base

export const getFdDriverPost = (storeType, data, callback) => (
  console.log("id1212", callback),
  {
    type: GET_FD_DRIVER_POST,
    payload: { storeType, data, callback },
  }
)

export const getFdDriverFailPost = error => ({
  type: GET_FD_DRIVER_POST_FAIL,
  payload: error,
})

export const getFdDriverSuccessPost = fdDriver => ({
  type: GET_FD_DRIVER_POST_SUCCESS,
  payload: fdDriver,
})

/* Get Food Delivery Drivers END */

/* Update Food Delivery Drivers */
export const putFdDriver = (storeType, data, history) => ({
  type: PUT_FD_DRIVER,
  payload: { storeType, data, history },
})

export const putFdDriverFail = error => ({
  type: PUT_FD_DRIVER_FAIL,
  payload: error,
})

export const putFdDriverSuccess = () => ({
  type: PUT_FD_DRIVER_SUCCESS,
})
/* Update Food Delivery Drivers END */

/* Delete Food Delivery Drivers */
export const deleteFdDriver = (storeType, data, callback) => ({
  type: DELETE_FD_DRIVER,
  payload: { storeType, data, callback },
})

export const deleteFdDriverFail = error => ({
  type: DELETE_FD_DRIVER_FAIL,
  payload: error,
})

export const deleteFdDriverSuccess = () => ({
  type: DELETE_FD_DRIVER_SUCCESS,
})
/* Delete Food Delivery Drivers END */

/* Update Multi Food Delivery Drivers Status */
export const putFdDriversStatus = (storeType, data, callback) => ({
  type: PUT_FD_DRIVERS_STATUS,
  payload: { storeType, data, callback },
})

export const putFdDriversStatusFail = error => ({
  type: PUT_FD_DRIVERS_STATUS_FAIL,
  payload: error,
})

export const putFdDriversStatusSuccess = () => ({
  type: PUT_FD_DRIVERS_STATUS_SUCCESS,
})
/* Update Multi Food Delivery Drivers Status END */

/* Post Food Delivery Driver Pay */
export const postFdDriverPay = (data, callback) => ({
  type: POST_FD_DRIVER_PAY,
  payload: { data, callback },
})

export const postFdDriverPayFail = error => ({
  type: POST_FD_DRIVER_PAY_FAIL,
  payload: error,
})

export const postFdDriverPaySuccess = () => ({
  type: POST_FD_DRIVER_PAY_SUCCESS,
})

export const postFdDriverPayAdjustment = (data, callback) => ({
  type: POST_FD_DRIVER_PAY_ADJUSTMENT,
  payload: { data, callback },
})

export const postFdDriverPayAdjustmentFail = error => ({
  type: POST_FD_DRIVER_PAY_ADJUSTMENT_FAIL,
  payload: error,
})

export const postFdDriverPayAdjustmentSuccess = () => ({
  type: POST_FD_DRIVER_PAY_ADJUSTMENT_SUCCESS,
})
/* Post Food Delivery Driver Pay END */

/* Document */
/* Get Food Delivery Drivers Documents */
export const getFdDriverDocuments = data => ({
  type: GET_FD_DRIVER_DOCUMENTS,
  payload: data,
})

export const getFdDriverDocumentsFail = error => ({
  type: GET_FD_DRIVER_DOCUMENTS_FAIL,
  payload: error,
})

export const getFdDriverDocumentsSuccess = documents => ({
  type: GET_FD_DRIVER_DOCUMENTS_SUCCESS,
  payload: documents,
})
/* Get Food Delivery Drivers END */

/* Add Food Delivery Driver Document */
export const postFdDriverDocument = (document, history) => ({
  type: POST_FD_DRIVER_DOCUMENT,
  payload: { document, history },
})

export const postFdDriverDocumentFail = error => ({
  type: POST_FD_DRIVER_DOCUMENT_FAIL,
  payload: error,
})

export const postFdDriverDocumentSuccess = () => ({
  type: POST_FD_DRIVER_DOCUMENT_SUCCESS,
})
/* Add Food Delivery Drivers END */

/* Get Food Delivery Drivers */
export const getFdDriverDocument = data => ({
  type: GET_FD_DRIVER_DOCUMENT,
  payload: { data },
})

export const getFdDriverDocumentFail = error => ({
  type: GET_FD_DRIVER_DOCUMENT_FAIL,
  payload: error,
})

export const getFdDriverDocumentSuccess = document => ({
  type: GET_FD_DRIVER_DOCUMENT_SUCCESS,
  payload: document,
})
/* Get Food Delivery Drivers END */

/* Update Food Delivery Drivers */
export const putFdDriverDocument = (data, history) => ({
  type: PUT_FD_DRIVER_DOCUMENT,
  payload: { data, history },
})

export const putFdDriverDocumentFail = error => ({
  type: PUT_FD_DRIVER_DOCUMENT_FAIL,
  payload: error,
})

export const putFdDriverDocumentSuccess = () => ({
  type: PUT_FD_DRIVER_DOCUMENT_SUCCESS,
})
/* Update Food Delivery Drivers END */

/* Delete Food Delivery Drivers */
export const deleteFdDriverDocument = (data, callback) => ({
  type: DELETE_FD_DRIVER_DOCUMENT,
  payload: { data, callback },
})

export const deleteFdDriverDocumentFail = error => ({
  type: DELETE_FD_DRIVER_DOCUMENT_FAIL,
  payload: error,
})

export const deleteFdDriverDocumentSuccess = () => ({
  type: DELETE_FD_DRIVER_DOCUMENT_SUCCESS,
})
/* Delete Food Delivery Drivers END */

/* Export drivers */
export const exportDrivers = () => ({
  type: EXPORT_DRIVERS,
})

export const exportDriversSuccess = () => ({
  type: EXPORT_DRIVERS_SUCCESS,
})

export const exportDriversFail = error => ({
  type: EXPORT_DRIVERS_FAIL,
  payload: error,
})
/* Export drivers END */

/* Import drivers */
export const importDrivers = (data, callback) => ({
  type: IMPORT_DRIVERS,
  payload: { data, callback },
})

export const importDriversSuccess = success => ({
  type: IMPORT_DRIVERS_SUCCESS,
  payload: success,
})

export const importDriversFail = error => ({
  type: IMPORT_DRIVERS_FAIL,
  payload: error,
})
/* Import drivers END */

/* Driver Vehicle INfo Edit */
export const editDriverVehicleInfo = data => ({
  type: EDIT_DRIVER_VEHICLE_INFO,
  payload: data,
})
export const editDriverVehicleInfoSuccess = data => ({
  type: EDIT_DRIVER_VEHICLE_INFO_SUCCESS,
  payload: data,
})
export const editDriverVehicleInfoFailure = err => ({
  type: EDIT_DRIVER_VEHICLE_INFO_FAIL,
  payload: err,
})
/* Driver Vehicle INfo Edit (GET DATA)*/

//update driver vehicle info

export const updateDriverVehicleInfo = (data, history) => ({
  type: UPDATE_DRIVER_VEHICLE_INFO,
  payload: { data, history },
})
export const updateDriverVehicleInfoSuccess = data => ({
  type: UPDATE_DRIVER_VEHICLE_INFO_SUCCESS,
  payload: data,
})
export const updateDriverVehicleInfoFailure = err => ({
  type: UPDATE_DRIVER_VEHICLE_INFO_FAIL,
  payload: err,
})

export const postdriverList = data => ({
  type: DRIVER_VEHICLE_LIST,
  payload: data,
})
export const postdriverListSuccess = data => ({
  type: DRIVER_VEHICLE_LIST_SUCCESS,
  payload: data,
})
export const postdriverListFailure = err => ({
  type: DRIVER_VEHICLE_LIST_FAIL,
  payload: err,
})

// get driver bank Account info

export const postdriverbankInfo = data => ({
  type: DRIVER_BANK_INFO,
  payload: data,
})
export const postdriverbankInfoSuccess = data => ({
  type: DRIVER_BANK_INFO_SUCCESS,
  payload: data,
})
export const postdrivebankInfoFailure = err => ({
  type: DRIVER_BANK_INFO_FAIL,
  payload: err,
})

// update driver bank Account info

export const postdriverbankUpdate = (data, history) => ({
  type: DRIVER_BANK_INFO_UPDATE,
  payload: { data, history },
})
export const postdriverbankUpdateSuccess = data => ({
  type: DRIVER_BANK_INFO__UPDATE_SUCCESS,
  payload: data,
})
export const postdriverbankUpdateFailure = err => ({
  type: DRIVER_BANK_INFO__UPDATE_FAIL,
  payload: err,
})

// add driver Services

export const postdriverServices = (data, history) => ({
  type: ADD_DRIVER_SERVICES,
  payload: { data, history },
})
export const postdriverServicesSuccess = data => ({
  type: ADD_DRIVER_SERVICES_SUCCESS,
  payload: data,
})
export const postdriverServicesFailure = err => ({
  type: ADD_DRIVER_SERVICES_FAIL,
  payload: err,
})

// delete driver Services

export const deletedriverServices = (storeType, data, callback) => ({
  type: DELETE_DRIVER_SERVICES,
  payload: { storeType, data, callback },
})
export const deletedriverServicesSuccess = data => ({
  type: DELETE_DRIVER_SERVICES_SUCCESS,
  payload: data,
})
export const deletedriverServicesFailure = err => ({
  type: DELETE_DRIVER_SERVICES_FAIL,
  payload: err,
})

// delete virtual account

export const deletevirtualAccount = (storeType, data, callback) => ({
  type: DELETE_VIRTUAL_ACCOUNT,
  payload: { storeType, data, callback },
})
export const deletevirtualAccountSuccess = data => ({
  type: DELETE_VIRTUAL_ACCOUNT_SUCCESS,
  payload: data,
})
export const deletevirtualAccountFailure = err => ({
  type: DELETE_VIRTUAL_ACCOUNT_FAIL,
  payload: err,
})
