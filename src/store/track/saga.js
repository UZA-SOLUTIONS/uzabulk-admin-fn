import {
  call,
  put,
  takeEvery,
  takeLatest,
  delay,
  select,
} from "redux-saga/effects";



// Crypto Redux States
import {
  GET_MAP_VIEW,
  SET_MAP_VIEW_CENTER,
  SET_MAP_VIEW_BOUNDS,
  ASSIGN_DRIVER,
  MAP_POPUP_DRIVER_LOCATION,
} from "./actionTypes"
import {
  setMapViewCenterSuccess,
  setMapViewBoundSuccess,
  getMapViewSuccess,
  getMapViewFail,
  assignDriverSuccess,
  assignDriverFail,
  setDriver_Location_Popup_Fail,
  setDriver_Location_Popup_Success,
} from "./actions"

import { getBirdView, assignDriver } from "helpers/backend_helper";

import toastr from "toastr";

function* setMapBounds({ data }) {
  yield put(setMapViewBoundSuccess(data))
  yield delay(2000)
  yield fetchMapView(data)
}

function* setMapCenter({ data }) {
  yield put(setMapViewCenterSuccess(data))
}

function* fetchMapView(data) {
  try {
    const query = {
      location: { lat: 54.53239124613329, lng: -118.64200020455428 },
      bounds: {
        ne: { lat: 86.04573200557402, lng: 180 },
        sw: { lat: -52.69453733266381, lng: -180 },
      },
    }

    console.log("fetch data", data)
    const response = yield call(getBirdView, data)
    yield put(getMapViewSuccess(response.data))
  } catch (error) {
    console.log("Error", error)
    yield put(getMapViewFail(error))
  }
}

function* popupDriver(id) {
  try {
    const data = {}
    yield put(setDriver_Location_Popup_Success, data)
  } catch (error) {
    yield put(setDriver_Location_Popup_Fail, error)
  }
}

function* assignDriverToTrip({ payload: { data, callback } }) {
  try {
    const response = yield call(assignDriver, data)
    if (response.status == "success") {
      toastr.success(response.message)
      callback && callback()
      yield put(assignDriverSuccess(response))
    } else {
      toastr.error(response.message)
      callback && callback()
    }
  } catch (error) {
    yield put(assignDriverFail(error))
  }
}

function* mapViewSaga() {
  yield takeLatest(SET_MAP_VIEW_CENTER, setMapCenter)
  yield takeLatest(SET_MAP_VIEW_BOUNDS, setMapBounds)
  yield takeLatest(GET_MAP_VIEW, fetchMapView)
  yield takeLatest(ASSIGN_DRIVER, assignDriverToTrip)
  yield takeLatest(MAP_POPUP_DRIVER_LOCATION, popupDriver)
}

export default mapViewSaga
