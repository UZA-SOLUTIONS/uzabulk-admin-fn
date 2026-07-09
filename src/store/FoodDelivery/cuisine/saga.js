import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

// Food Delivery Cuisines Redux States
import {
  GET_FD_CUISINES,
  ADD_FD_CUISINE,
  GET_FD_CUISINE,
  PUT_FD_CUISINE,
  DELETE_FD_CUISINE,
  PUT_FD_CUISINES_STATUS,
  EXPORT_FD_CUISINES,
} from "./actionTypes"
import {
  getFdCuisinesFail,
  getFdCuisinesSuccess,
  addFdCuisineFail,
  addFdCuisineSuccess,
  getFdCuisineFail,
  getFdCuisineSuccess,
  putFdCuisineFail,
  putFdCuisineSuccess,
  deleteFdCuisineFail,
  deleteFdCuisineSuccess,
  putFdCuisinesStatusFail,
  putFdCuisinesStatusSuccess,
  exportFdCuisinesFail,
  exportFdCuisinesSuccess,
} from "./actions"

import {
  getFdCuisines,
  postFdCuisine,
  getFdCuisine,
  putFdCuisine,
  deleteFdCuisine,
  putFdCuisinesStatus,
  exportFdCuisines,
} from "helpers/backend_helper"

function* fetchFdCuisines({ payload: { storeType, data } }) {
  try {
    const response = yield call(getFdCuisines, storeType, data)

    if (response.status == "failure") {
      return yield put(getFdCuisinesFail(response.message))
    }

    yield put(getFdCuisinesSuccess(response))
  } catch (error) {
    yield put(getFdCuisinesFail(error))
  }
}

function* onAddNewFdCuisine({ payload: { storeType, fdCuisine, history } }) {
  try {
    const response = yield call(postFdCuisine, storeType, fdCuisine)

    if (response.status == "failure") {
      window.scrollTo(0, 0)
      toastr.error(response.message)
      return yield put(addFdCuisineFail(response.message))
    }

    history && history.goBack()

    toastr.success(response.message)
    yield put(addFdCuisineSuccess())
  } catch (error) {
    yield put(addFdCuisineFail("Internal Error!"))
  }
}

function* fetchFdCuisine({ payload: { storeType, id } }) {
  try {
    const response = yield call(getFdCuisine, storeType, id)

    if (response.status == "failure") {
      return yield put(getFdCuisineFail(response.message))
    }

    yield put(getFdCuisineSuccess(response.data))
  } catch (error) {
    yield put(getFdCuisineFail(error))
  }
}

function* onPutFdCuisine({ payload: { storeType, data, history } }) {
  try {
    const response = yield call(putFdCuisine, storeType, data)

    if (response.status == "failure") {
      return yield put(putFdCuisineFail(response.message))
    }

    history && history.goBack()

    yield put(putFdCuisineSuccess())
  } catch (error) {
    yield put(putFdCuisineFail("Internal Error!"))
  }
}

function* onDeleteFdCuisine({ payload: { storeType, data, callback } }) {
  try {
    const response = yield call(deleteFdCuisine, storeType, data)

    if (response.status == "failure") {
      return yield put(deleteFdCuisineFail(response.message))
    }

    yield put(deleteFdCuisineSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteFdCuisineFail("Internal Error!"))
  }
}

function* onPutFdCuisinesStatus({ payload: { storeType, data, callback } }) {
  try {
    const response = yield call(putFdCuisinesStatus, storeType, data)

    if (response.status == "failure") {
      return yield put(putFdCuisinesStatusFail(response.message))
    }

    yield put(putFdCuisinesStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putFdCuisinesStatusFail("Internal Error!"))
  }
}

function* onExportFdCuisines({ payload: { storeType } }) {
  try {
    const response = yield call(exportFdCuisines, storeType)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(exportFdCuisinesFail(response.message))
    }

    var hiddenElement = document.createElement("a")
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(response)
    hiddenElement.target = "_blank"
    hiddenElement.download = "cuisines.csv"
    hiddenElement.click()

    yield put(exportFdCuisinesSuccess())
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(exportFdCuisinesFail("Internal Error!"))
  }
}

function* FdCuisinesSaga() {
  yield takeEvery(GET_FD_CUISINES, fetchFdCuisines)
  yield takeEvery(ADD_FD_CUISINE, onAddNewFdCuisine)
  yield takeEvery(GET_FD_CUISINE, fetchFdCuisine)
  yield takeEvery(PUT_FD_CUISINE, onPutFdCuisine)
  yield takeEvery(DELETE_FD_CUISINE, onDeleteFdCuisine)
  yield takeEvery(PUT_FD_CUISINES_STATUS, onPutFdCuisinesStatus)
  yield takeLatest(EXPORT_FD_CUISINES, onExportFdCuisines)
}

export default FdCuisinesSaga
