import {
  GEO_FENCING_API_FAIL,
  GET_GEO_FENCINGS,
  GET_GEO_FENCINGS_FAIL,
  GET_GEO_FENCINGS_SUCCESS,
  ADD_GEO_FENCING,
  ADD_GEO_FENCING_FAIL,
  ADD_GEO_FENCING_SUCCESS,
  GET_GEO_FENCING,
  GET_GEO_FENCING_FAIL,
  GET_GEO_FENCING_SUCCESS,
  PUT_GEO_FENCING,
  PUT_GEO_FENCING_FAIL,
  PUT_GEO_FENCING_SUCCESS,
  DELETE_GEO_FENCING,
  DELETE_GEO_FENCING_FAIL,
  DELETE_GEO_FENCING_SUCCESS,
  PUT_GEO_FENCINGS_STATUS,
  PUT_GEO_FENCINGS_STATUS_FAIL,
  PUT_GEO_FENCINGS_STATUS_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: GEO_FENCING_API_FAIL,
  payload: error,
})

/* Get GeoFencings */
export const getGeoFencings = data => ({
  type: GET_GEO_FENCINGS,
  payload: { data },
})

export const getGeoFencingsSuccess = geoFencings => ({
  type: GET_GEO_FENCINGS_SUCCESS,
  payload: geoFencings,
})

export const getGeoFencingsFail = error => ({
  type: GET_GEO_FENCINGS_FAIL,
  payload: error,
})
/* Get GeoFencings END */

/* Add GeoFencings */
export const addGeoFencing = (geoFencing, callback) => ({
  type: ADD_GEO_FENCING,
  payload: { geoFencing, callback },
})

export const addGeoFencingFail = error => ({
  type: ADD_GEO_FENCING_FAIL,
  payload: error,
})

export const addGeoFencingSuccess = () => ({
  type: ADD_GEO_FENCING_SUCCESS,
})
/* Add GeoFencings END */

/* Get GeoFencings */
export const getGeoFencing = id => ({
  type: GET_GEO_FENCING,
  payload: { id },
})

export const getGeoFencingFail = error => ({
  type: GET_GEO_FENCING_FAIL,
  payload: error,
})

export const getGeoFencingSuccess = geoFencing => ({
  type: GET_GEO_FENCING_SUCCESS,
  payload: geoFencing,
})
/* Get GeoFencings END */

/* Update GeoFencings */
export const putGeoFencing = (data, callback) => ({
  type: PUT_GEO_FENCING,
  payload: { data, callback },
})

export const putGeoFencingFail = error => ({
  type: PUT_GEO_FENCING_FAIL,
  payload: error,
})

export const putGeoFencingSuccess = () => ({
  type: PUT_GEO_FENCING_SUCCESS,
})
/* Update GeoFencings END */

/* Delete GeoFencings */
export const deleteGeoFencing = (data, callback) => ({
  type: DELETE_GEO_FENCING,
  payload: { data, callback },
})

export const deleteGeoFencingFail = error => ({
  type: DELETE_GEO_FENCING_FAIL,
  payload: error,
})

export const deleteGeoFencingSuccess = () => ({
  type: DELETE_GEO_FENCING_SUCCESS,
})
/* Delete GeoFencings END */

/* Update Multi GeoFencings Status */
export const putGeoFencingsStatus = (data, callback) => ({
  type: PUT_GEO_FENCINGS_STATUS,
  payload: { data, callback },
})

export const putGeoFencingsStatusFail = error => ({
  type: PUT_GEO_FENCINGS_STATUS_FAIL,
  payload: error,
})

export const putGeoFencingsStatusSuccess = () => ({
  type: PUT_GEO_FENCINGS_STATUS_SUCCESS,
})
/* Update Multi GeoFencings Status END */
