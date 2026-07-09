import { call, put, takeEvery } from "redux-saga/effects"

// Promo Code Redux States
import {
  GET_GALLERIES,
  ADD_GALLERY,
  GET_GALLERY,
  PUT_GALLERY,
  DELETE_GALLERY,
  PUT_GALLERIES_STATUS,
} from "./actionTypes"
import {
  getGalleriesFail,
  getGalleriesSuccess,
  addGalleryFail,
  addGallerySuccess,
  getGalleryFail,
  getGallerySuccess,
  putGalleryFail,
  putGallerySuccess,
  deleteGalleryFail,
  deleteGallerySuccess,
  putGalleriesStatusFail,
  putGalleriesStatusSuccess,
} from "./actions"

import {
  getGalleries,
  postGallery,
  getGallery,
  putGallery,
  deleteGallery,
  putGalleriesStatus,
} from "helpers/backend_helper"

function* fetchGalleries({ payload }) {
  try {
    const response = yield call(getGalleries, payload)

    if (response.status == "failure") {
      return yield put(getGalleriesFail(response.message))
    }

    yield put(getGalleriesSuccess(response))
  } catch (error) {
    yield put(getGalleriesFail(error))
  }
}

function* onAddNewGallery({ payload: { gallery, history } }) {
  try {
    const response = yield call(postGallery, gallery)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addGalleryFail(response.message))
    }

    history && history.goBack()

    yield put(addGallerySuccess())
  } catch (error) {
    yield put(addGalleryFail("Internal Error!"))
  }
}

function* fetchGallery({ payload }) {
  try {
    const response = yield call(getGallery, payload)

    if (response.status == "failure") {
      return yield put(getGalleryFail(response.message))
    }

    yield put(getGallerySuccess(response.data))
  } catch (error) {
    yield put(getGalleryFail(error))
  }
}

function* onPutGallery({ payload: { data, history } }) {
  try {
    const response = yield call(putGallery, data)

    if (response.status == "failure") {
      return yield put(putGalleryFail(response.message))
    }

    history && history.goBack()

    yield put(putGallerySuccess())
  } catch (error) {
    yield put(putGalleryFail("Internal Error!"))
  }
}

function* onDeleteGallery({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteGallery, data)

    if (response.status == "failure") {
      return yield put(deleteGalleryFail(response.message))
    }

    yield put(deleteGallerySuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteGalleryFail("Internal Error!"))
  }
}

function* onPutGalleriesStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putGalleriesStatus, data)

    if (response.status == "failure") {
      return yield put(putGalleriesStatusFail(response.message))
    }

    yield put(putGalleriesStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putGalleriesStatusFail("Internal Error!"))
  }
}

function* GalleriesSaga() {
  yield takeEvery(GET_GALLERIES, fetchGalleries)
  yield takeEvery(ADD_GALLERY, onAddNewGallery)
  yield takeEvery(GET_GALLERY, fetchGallery)
  yield takeEvery(PUT_GALLERY, onPutGallery)
  yield takeEvery(DELETE_GALLERY, onDeleteGallery)
  yield takeEvery(PUT_GALLERIES_STATUS, onPutGalleriesStatus)
}

export default GalleriesSaga
