import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

// GeoFencings Redux States
import {
  GET_GEO_FENCINGS,
  ADD_GEO_FENCING,
  GET_GEO_FENCING,
  PUT_GEO_FENCING,
  DELETE_GEO_FENCING,
  PUT_GEO_FENCINGS_STATUS,
} from "./actionTypes"
import {
  getGeoFencingsFail,
  getGeoFencingsSuccess,
  addGeoFencingFail,
  addGeoFencingSuccess,
  getGeoFencingFail,
  getGeoFencingSuccess,
  putGeoFencingFail,
  putGeoFencingSuccess,
  deleteGeoFencingFail,
  deleteGeoFencingSuccess,
  putGeoFencingsStatusFail,
  putGeoFencingsStatusSuccess,
} from "./actions"

import {
  getGeoFencings,
  postGeoFencing,
  getGeoFencing,
  putGeoFencing,
  deleteGeoFencing,
  putGeoFencingsStatus,
} from "helpers/backend_helper"

function* fetchGeoFencings({ payload: { data } }) {
  try {
    const response = yield call(getGeoFencings, data)

    if (response.status == "failure") {
      return yield put(getGeoFencingsFail(response.message))
    }

    yield put(getGeoFencingsSuccess(response))
  } catch (error) {
    yield put(getGeoFencingsFail(error))
  }
}

function* onAddNewGeoFencing({ payload: { geoFencing, callback } }) {
  try {
    const response = yield call(postGeoFencing, geoFencing)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addGeoFencingFail(response.message))
    }

    callback && callback(response)

    yield put(addGeoFencingSuccess())
  } catch (error) {
    yield put(addGeoFencingFail("Internal Error!"))
  }
}

function* fetchGeoFencing({ payload: { id } }) {
  try {
    const response = yield call(getGeoFencing, id)

    if (response.status == "failure") {
      return yield put(getGeoFencingFail(response.message))
    }

    yield put(getGeoFencingSuccess(response.data))
  } catch (error) {
    yield put(getGeoFencingFail(error))
  }
}

function* onPutGeoFencing({ payload: { data, callback } }) {
  try {
    const response = yield call(putGeoFencing, data)

    if (response.status == "failure") {
      return yield put(putGeoFencingFail(response.message))
    }

    callback && callback(response)

    yield put(putGeoFencingSuccess())
  } catch (error) {
    yield put(putGeoFencingFail("Internal Error!"))
  }
}

function* onDeleteGeoFencing({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteGeoFencing, data)

    if (response.status == "failure") {
      return yield put(deleteGeoFencingFail(response.message))
    }

    yield put(deleteGeoFencingSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteGeoFencingFail("Internal Error!"))
  }
}

function* onPutGeoFencingsStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putGeoFencingsStatus, data)

    if (response.status == "failure") {
      return yield put(putGeoFencingsStatusFail(response.message))
    }

    yield put(putGeoFencingsStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putGeoFencingsStatusFail("Internal Error!"))
  }
}

function* GeoFencingsSaga() {
  yield takeEvery(GET_GEO_FENCINGS, fetchGeoFencings)
  yield takeEvery(ADD_GEO_FENCING, onAddNewGeoFencing)
  yield takeEvery(GET_GEO_FENCING, fetchGeoFencing)
  yield takeEvery(PUT_GEO_FENCING, onPutGeoFencing)
  yield takeEvery(DELETE_GEO_FENCING, onDeleteGeoFencing)
  yield takeEvery(PUT_GEO_FENCINGS_STATUS, onPutGeoFencingsStatus)
}

export default GeoFencingsSaga
