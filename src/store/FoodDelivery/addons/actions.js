import {
  FD_ADDON_API_FAIL,
  GET_FD_ADDONS,
  GET_FD_ADDONS_FAIL,
  GET_FD_ADDONS_SUCCESS,
  ADD_FD_ADDON,
  ADD_FD_ADDON_FAIL,
  ADD_FD_ADDON_SUCCESS,
  GET_FD_ADDON,
  GET_FD_ADDON_FAIL,
  GET_FD_ADDON_SUCCESS,
  PUT_FD_ADDON,
  PUT_FD_ADDON_FAIL,
  PUT_FD_ADDON_SUCCESS,
  DELETE_FD_ADDON,
  DELETE_FD_ADDON_FAIL,
  DELETE_FD_ADDON_SUCCESS,
  PUT_FD_ADDONS_STATUS,
  PUT_FD_ADDONS_STATUS_FAIL,
  PUT_FD_ADDONS_STATUS_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: FD_ADDON_API_FAIL,
  payload: error,
})

/* Get Food Delivery Addons */
export const getFdAddons = data => ({
  type: GET_FD_ADDONS,
  payload: data,
})

export const getFdAddonsSuccess = fdAddons => ({
  type: GET_FD_ADDONS_SUCCESS,
  payload: fdAddons,
})

export const getFdAddonsFail = error => ({
  type: GET_FD_ADDONS_FAIL,
  payload: error,
})
/* Get Food Delivery Addons END */

/* Add Food Delivery Addons */
export const addFdAddon = (fdAddon, history) => ({
  type: ADD_FD_ADDON,
  payload: { fdAddon, history },
})

export const addFdAddonFail = error => ({
  type: ADD_FD_ADDON_FAIL,
  payload: error,
})

export const addFdAddonSuccess = () => ({
  type: ADD_FD_ADDON_SUCCESS,
})
/* Add Food Delivery Addons END */

/* Get Food Delivery Addons */
export const getFdAddon = (storeType, id) => ({
  type: GET_FD_ADDON,
  payload: { storeType, id },
})

export const getFdAddonFail = error => ({
  type: GET_FD_ADDON_FAIL,
  payload: error,
})

export const getFdAddonSuccess = fdAddon => ({
  type: GET_FD_ADDON_SUCCESS,
  payload: fdAddon,
})
/* Get Food Delivery Addons END */

/* Update Food Delivery Addons */
export const putFdAddon = (data, history) => ({
  type: PUT_FD_ADDON,
  payload: { data, history },
})

export const putFdAddonFail = error => ({
  type: PUT_FD_ADDON_FAIL,
  payload: error,
})

export const putFdAddonSuccess = () => ({
  type: PUT_FD_ADDON_SUCCESS,
})
/* Update Food Delivery Addons END */

/* Delete Food Delivery Addons */
export const deleteFdAddon = (data, callback) => ({
  type: DELETE_FD_ADDON,
  payload: { data, callback },
})

export const deleteFdAddonFail = error => ({
  type: DELETE_FD_ADDON_FAIL,
  payload: error,
})

export const deleteFdAddonSuccess = () => ({
  type: DELETE_FD_ADDON_SUCCESS,
})
/* Delete Food Delivery Addons END */

/* Update Multi Food Delivery Addons Status */
export const putFdAddonsStatus = (data, callback) => ({
  type: PUT_FD_ADDONS_STATUS,
  payload: { data, callback },
})

export const putFdAddonsStatusFail = error => ({
  type: PUT_FD_ADDONS_STATUS_FAIL,
  payload: error,
})

export const putFdAddonsStatusSuccess = () => ({
  type: PUT_FD_ADDONS_STATUS_SUCCESS,
})
/* Update Multi Food Delivery Addons Status END */
