import {
  SET_MAP_VIEW_CENTER,
  SET_MAP_VIEW_CENTER_SUCCESS,
  SET_MAP_VIEW_BOUNDS,
  SET_MAP_VIEW_BOUNDS_SUCCESS,
  GET_MAP_VIEW,
  GET_MAP_VIEW_SUCCESS,
  GET_MAP_VIEW_FAIL,
  ASSIGN_DRIVER,
  ASSIGN_DRIVER_SUCCESS,
  ASSIGN_DRIVER_FAIL,
  MAP_POPUP_DRIVER_LOCATION,
  MAP_POPUP_DRIVER_LOCATION_SUCCESS,
  MAP_POPUP_DRIVER_LOCATION_FAIL,
} from "./actionTypes"

export const setMapViewCenter = data => {
  return {
    type: SET_MAP_VIEW_CENTER,
    data,
  }
}
export const setMapViewCenterSuccess = data => {
  return {
    type: SET_MAP_VIEW_CENTER_SUCCESS,
    payload: data,
  }
}

export const setMapViewBounds = data => {
  return {
    type: SET_MAP_VIEW_BOUNDS,
    data,
  }
}
export const setMapViewBoundSuccess = data => {
  return {
    type: SET_MAP_VIEW_BOUNDS_SUCCESS,
    payload: data,
  }
}

export const getMapView = data => {
  return {
    type: GET_MAP_VIEW,
    data,
  }
}

export const getMapViewSuccess = data => ({
  type: GET_MAP_VIEW_SUCCESS,
  payload: data,
})

export const getMapViewFail = error => ({
  type: GET_MAP_VIEW_FAIL,
  payload: error,
})

export const assignDriver = (data, callback) => {
  return {
    type: ASSIGN_DRIVER,
    payload: { data, callback },
  }
}
export const assignDriverSuccess = data => {
  return {
    type: ASSIGN_DRIVER_SUCCESS,
    payload: data,
  }
}
export const assignDriverFail = data => {
  return {
    type: ASSIGN_DRIVER_FAIL,
    payload: data,
  }
}

export const setDriver_Location_Popup = id => {
  return {
    type: MAP_POPUP_DRIVER_LOCATION,
    payload: id,
  }
}
export const setDriver_Location_Popup_Success = id => {
  return {
    type: MAP_POPUP_DRIVER_LOCATION_SUCCESS,
    payload: id,
  }
}

export const setDriver_Location_Popup_Fail = error => {
  return {
    type: MAP_POPUP_DRIVER_LOCATION_FAIL,
    payload: error,
  }
}
