import {
  FD_CUISINE_API_FAIL,
  GET_FD_CUISINES,
  GET_FD_CUISINES_FAIL,
  GET_FD_CUISINES_SUCCESS,
  ADD_FD_CUISINE,
  ADD_FD_CUISINE_FAIL,
  ADD_FD_CUISINE_SUCCESS,
  GET_FD_CUISINE,
  GET_FD_CUISINE_FAIL,
  GET_FD_CUISINE_SUCCESS,
  PUT_FD_CUISINE,
  PUT_FD_CUISINE_FAIL,
  PUT_FD_CUISINE_SUCCESS,
  DELETE_FD_CUISINE,
  DELETE_FD_CUISINE_FAIL,
  DELETE_FD_CUISINE_SUCCESS,
  PUT_FD_CUISINES_STATUS,
  PUT_FD_CUISINES_STATUS_FAIL,
  PUT_FD_CUISINES_STATUS_SUCCESS,
  EXPORT_FD_CUISINES,
  EXPORT_FD_CUISINES_SUCCESS,
  EXPORT_FD_CUISINES_FAIL,
} from "./actionTypes"

export const apiFail = error => ({
  type: FD_CUISINE_API_FAIL,
  payload: error,
})

/* Get Food Delivery Cuisines */
export const getFdCuisines = (storeType, data) => ({
  type: GET_FD_CUISINES,
  payload: { storeType, data },
})

export const getFdCuisinesSuccess = fdCuisines => ({
  type: GET_FD_CUISINES_SUCCESS,
  payload: fdCuisines,
})

export const getFdCuisinesFail = error => ({
  type: GET_FD_CUISINES_FAIL,
  payload: error,
})
/* Get Food Delivery Cuisines END */

/* Add Food Delivery Cuisines */
export const addFdCuisine = (storeType, fdCuisine, history) => ({
  type: ADD_FD_CUISINE,
  payload: { storeType, fdCuisine, history },
})

export const addFdCuisineFail = error => ({
  type: ADD_FD_CUISINE_FAIL,
  payload: error,
})

export const addFdCuisineSuccess = () => ({
  type: ADD_FD_CUISINE_SUCCESS,
})
/* Add Food Delivery Cuisines END */

/* Get Food Delivery Cuisines */
export const getFdCuisine = (storeType, id) => ({
  type: GET_FD_CUISINE,
  payload: { storeType, id },
})

export const getFdCuisineFail = error => ({
  type: GET_FD_CUISINE_FAIL,
  payload: error,
})

export const getFdCuisineSuccess = fdCuisine => ({
  type: GET_FD_CUISINE_SUCCESS,
  payload: fdCuisine,
})
/* Get Food Delivery Cuisines END */

/* Update Food Delivery Cuisines */
export const putFdCuisine = (storeType, data, history) => ({
  type: PUT_FD_CUISINE,
  payload: { storeType, data, history },
})

export const putFdCuisineFail = error => ({
  type: PUT_FD_CUISINE_FAIL,
  payload: error,
})

export const putFdCuisineSuccess = () => ({
  type: PUT_FD_CUISINE_SUCCESS,
})
/* Update Food Delivery Cuisines END */

/* Delete Food Delivery Cuisines */
export const deleteFdCuisine = (storeType, data, callback) => ({
  type: DELETE_FD_CUISINE,
  payload: { storeType, data, callback },
})

export const deleteFdCuisineFail = error => ({
  type: DELETE_FD_CUISINE_FAIL,
  payload: error,
})

export const deleteFdCuisineSuccess = () => ({
  type: DELETE_FD_CUISINE_SUCCESS,
})
/* Delete Food Delivery Cuisines END */

/* Update Multi Food Delivery Cuisines Status */
export const putFdCuisinesStatus = (storeType, data, callback) => ({
  type: PUT_FD_CUISINES_STATUS,
  payload: { storeType, data, callback },
})

export const putFdCuisinesStatusFail = error => ({
  type: PUT_FD_CUISINES_STATUS_FAIL,
  payload: error,
})

export const putFdCuisinesStatusSuccess = () => ({
  type: PUT_FD_CUISINES_STATUS_SUCCESS,
})
/* Update Multi Food Delivery Cuisines Status END */

/* Export cuisines */
export const exportFdCuisines = storeType => ({
  type: EXPORT_FD_CUISINES,
  payload: { storeType },
})

export const exportFdCuisinesSuccess = () => ({
  type: EXPORT_FD_CUISINES_SUCCESS,
})

export const exportFdCuisinesFail = error => ({
  type: EXPORT_FD_CUISINES_FAIL,
  payload: error,
})
/* Export cuisines END */
