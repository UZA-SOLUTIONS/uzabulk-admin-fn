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

export const apiFail = error => ({
  type: FD_BUSINESS_TYPE_API_FAIL,
  payload: error,
})

/* Get Food Delivery busniness */
export const getFdbusinesstypes = (storeType, data) => ({
  type: GET_FD_BUSINESS_TYPES,
  payload: { storeType, data },
})

export const getFdbusinesstypesSuccess = fdbusniesstypes => ({
  type: GET_FD_BUSINESS_TYPES_SUCCESS,
  payload: fdbusniesstypes,
})

export const getFdbusinesstypesFail = error => ({
  type: GET_FD_BUSINESS_TYPES_FAIL,
  payload: error,
})
/* Get Food Delivery busniness END */

/* Add Food Delivery businessType */
export const addFdbusinesstype = (storeType, fdBusinesstype, history) => ({
  type: ADD_FD_BUSINESS_TYPE,
  payload: { storeType, fdBusinesstype, history },
})

export const addFdbusinesstypeFail = error => ({
  type: ADD_FD_BUSINESS_TYPE_FAIL,
  payload: error,
})

export const addFdbusinesstypeSuccess = () => ({
  type: ADD_FD_BUSINESS_TYPE_SUCCESS,
})
/* Add Food Delivery businessType END */

/* Get Food Delivery businessType */
export const getFdBusinesstype = (storeType, id) => ({
  type: GET_FD_BUSINESS_TYPE,
  payload: { storeType, id },
})

export const getFdBusinesstypeFail = error => ({
  type: GET_FD_BUSINESS_TYPE_FAIL,
  payload: error,
})

export const getFdBusinesstypeSuccess = fdCuisine => ({
  type: GET_FD_BUSINESS_TYPE_SUCCESS,
  payload: fdCuisine,
})
/* Get Food Delivery businessType END */

/* Update Food Delivery BusinessType */
export const putFdBusinesstype = (storeType, data, history) => ({
  type: PUT_FD_BUSINESS_TYPE,
  payload: { storeType, data, history },
})

export const putFdBusinesstypeFail = error => ({
  type: PUT_FD_BUSINESS_TYPE_FAIL,
  payload: error,
})

export const putFdBusinesstypeSuccess = () => ({
  type: PUT_FD_BUSINESS_TYPE_SUCCESS,
})
/* Update Food Delivery BusinessType END */

/* Delete Food Delivery Businesstype */
export const deleteFdBusinesstype = (storeType, data, callback) => ({
  type: DELETE_FD_BUSINESS_TYPE,
  payload: { storeType, data, callback },
})

export const deleteFdBusinesstypeFail = error => ({
  type: DELETE_FD_BUSINESS_TYPE_FAIL,
  payload: error,
})

export const deleteFdBusinesstypeSuccess = () => ({
  type: DELETE_FD_BUSINESS_TYPE_SUCCESS,
})
/* Delete Food Delivery Businesstype END */

/* Update Multi Food Delivery BusinessType Status */
export const putFdBusinesstypesStatus = (storeType, data, callback) => ({
  type: PUT_FD_BUSINESS_TYPES_STATUS,
  payload: { storeType, data, callback },
})

export const putFdBusinesstypesStatusFail = error => ({
  type: PUT_FD_BUSINESS_TYPES_STATUS_FAIL,
  payload: error,
})

export const putFdBusinesstypesStatusSuccess = () => ({
  type: PUT_FD_BUSINESS_TYPES_STATUS_SUCCESS,
})
/* Update Multi Food Delivery BusinessType Status END */

/* Export BusinessTypes */
export const exportFdBusinesstypes = storeType => ({
  type: EXPORT_FD_BUSINESS_TYPES,
  payload: { storeType },
})

export const exportFdBusinesstypesSuccess = () => ({
  type: EXPORT_FD_BUSINESS_TYPES_SUCCESS,
})

export const exportFdBusinesstypesFail = error => ({
  type: EXPORT_FD_BUSINESS_TYPES_FAIL,
  payload: error,
})
/* Export BusinessTypes END */
