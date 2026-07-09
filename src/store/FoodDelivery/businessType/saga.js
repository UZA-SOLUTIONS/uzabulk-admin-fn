import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

// Food Delivery Cuisines Redux States
import {
  GET_FD_BUSINESS_TYPES,
  ADD_FD_BUSINESS_TYPE,
  GET_FD_BUSINESS_TYPE,
  PUT_FD_BUSINESS_TYPE,
  DELETE_FD_BUSINESS_TYPE,
  PUT_FD_BUSINESS_TYPES_STATUS,
  EXPORT_FD_BUSINESS_TYPES,
} from "./actionTypes"
import {
  getFdbusinesstypesFail,
  getFdbusinesstypesSuccess,
  addFdbusinesstypeFail,
  addFdbusinesstypeSuccess,
  getFdBusinesstypeFail,
  getFdBusinesstypeSuccess,
  putFdBusinesstypeFail,
  putFdBusinesstypeSuccess,
  deleteFdBusinesstypeFail,
  deleteFdBusinesstypeSuccess,
  putFdBusinesstypesStatusFail,
  putFdBusinesstypesStatusSuccess,
  exportFdBusinesstypesFail,
  exportFdBusinesstypesSuccess,
} from "./actions"

import {
  postFdBusinesstype,
  getFdBusinesstype,
  putFdbusinesstype,
  deleteFdBusinesstype,
  putFdBusinesstypesStatus,
  exportFdBusinesstypes,
  getFdBusinesstypes,
} from "helpers/backend_helper"

function* fetchFdBusinesstypes({ payload: { storeType, data } }) {
  try {
    const response = yield call(getFdBusinesstypes, storeType, data)

    if (response.status == "failure") {
      return yield put(getFdbusinesstypesFail(response.message))
    }

    yield put(getFdbusinesstypesSuccess(response))
  } catch (error) {
    yield put(getFdbusinesstypesFail(error))
  }
}

function* onAddNewFdBusinesstype({
  payload: { storeType, fdBusinesstype, history },
}) {
  try {
    const response = yield call(postFdBusinesstype, storeType, fdBusinesstype)

    if (response.status == "failure") {
      window.scrollTo(0, 0)
      toastr.error(response.message)
      return yield put(addFdbusinesstypeFail(response.message))
    }

    history && history.goBack()

    toastr.success(response.message)
    yield put(addFdbusinesstypeSuccess())
  } catch (error) {
    yield put(addFdbusinesstypeFail("Internal Error!"))
  }
}

function* fetchFdBusinesstype({ payload: { storeType, id } }) {
  try {
    const response = yield call(getFdBusinesstype, storeType, id)

    if (response.status == "failure") {
      return yield put(getFdBusinesstypeFail(response.message))
    }

    yield put(getFdBusinesstypeSuccess(response.data))
  } catch (error) {
    yield put(getFdBusinesstypeFail(error))
  }
}

function* onPutFdBusinesstype({ payload: { storeType, data, history } }) {
  try {
    const response = yield call(putFdbusinesstype, storeType, data)

    if (response.status == "failure") {
      return yield put(putFdBusinesstypeFail(response.message))
    }

    history && history.goBack()

    yield put(putFdBusinesstypeSuccess())
  } catch (error) {
    yield put(putFdBusinesstypeFail("Internal Error!"))
  }
}

function* onDeleteFdBusinesstype({ payload: { storeType, data, callback } }) {
  try {
    const response = yield call(deleteFdBusinesstype, storeType, data)

    if (response.status == "failure") {
      return yield put(deleteFdBusinesstypeFail(response.message))
    }

    yield put(deleteFdBusinesstypeSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteFdBusinesstypeFail("Internal Error!"))
  }
}

function* onPutFdBusinesstypeStatus({
  payload: { storeType, data, callback },
}) {
  try {
    const response = yield call(putFdBusinesstypesStatus, storeType, data)

    if (response.status == "failure") {
      return yield put(putFdBusinesstypesStatusFail(response.message))
    }

    yield put(putFdBusinesstypesStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putFdBusinesstypesStatusFail("Internal Error!"))
  }
}

function* onExportFdBusinesstype({ payload: { storeType } }) {
  try {
    const response = yield call(exportFdBusinesstypes, storeType)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(exportFdBusinesstypesFail(response.message))
    }

    var hiddenElement = document.createElement("a")
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(response)
    hiddenElement.target = "_blank"
    hiddenElement.download = "cuisines.csv"
    hiddenElement.click()

    yield put(exportFdBusinesstypesSuccess())
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(exportFdBusinesstypesFail("Internal Error!"))
  }
}

function* FdCuisinesSaga() {
  yield takeEvery(GET_FD_BUSINESS_TYPES, fetchFdBusinesstypes)
  yield takeEvery(ADD_FD_BUSINESS_TYPE, onAddNewFdBusinesstype)
  yield takeEvery(GET_FD_BUSINESS_TYPE, fetchFdBusinesstype)
  yield takeEvery(PUT_FD_BUSINESS_TYPE, onPutFdBusinesstype)
  yield takeEvery(DELETE_FD_BUSINESS_TYPE, onDeleteFdBusinesstype)
  yield takeEvery(PUT_FD_BUSINESS_TYPES_STATUS, onPutFdBusinesstypeStatus)
  yield takeLatest(EXPORT_FD_BUSINESS_TYPES, onExportFdBusinesstype)
}

export default FdCuisinesSaga
