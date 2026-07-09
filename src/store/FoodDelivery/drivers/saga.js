import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import toastr from "toastr"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import "toastr/build/toastr.min.css"

// Food Delivery Drivers Redux States
import {
  GET_FD_DRIVERS,
  ADD_FD_DRIVER,
  GET_FD_DRIVER,
  PUT_FD_DRIVER,
  DELETE_FD_DRIVER,
  PUT_FD_DRIVERS_STATUS,
  POST_FD_DRIVER_PAY,
  POST_FD_DRIVER_PAY_ADJUSTMENT,
  EXPORT_DRIVERS,
  IMPORT_DRIVERS,
  EDIT_DRIVER_VEHICLE_INFO,
  UPDATE_DRIVER_VEHICLE_INFO,
  DRIVER_VEHICLE_LIST,
  DRIVER_BANK_INFO_UPDATE,
  DRIVER_BANK_INFO,
  REMOVE_FRAUD_STATUS_DRIVER,
  GET_FD_DRIVER_POST,
  ADD_DRIVER_SERVICES,
  DELETE_DRIVER_SERVICES,
  DELETE_VIRTUAL_ACCOUNT,
} from "./actionTypes"
import {
  GET_FD_DRIVER_DOCUMENTS,
  POST_FD_DRIVER_DOCUMENT,
  GET_FD_DRIVER_DOCUMENT,
  PUT_FD_DRIVER_DOCUMENT,
  DELETE_FD_DRIVER_DOCUMENT,
} from "./actionTypes"
import {
  getFdDriversFail,
  getFdDriversSuccess,
  addFdDriverFail,
  addFdDriverSuccess,
  getFdDriverFail,
  getFdDriverSuccess,
  putFdDriverFail,
  putFdDriverSuccess,
  deleteFdDriverFail,
  deleteFdDriverSuccess,
  putFdDriversStatusFail,
  putFdDriversStatusSuccess,
  postFdDriverPaySuccess,
  postFdDriverPayFail,
  ostFdDriverPayAdjustmentSuccess,
  postFdDriverPayAdjustmentFail,
  exportDriversFail,
  exportDriversSuccess,
  importDriversFail,
  importDriversSuccess,
  editDriverVehicleInfoFailure,
  editDriverVehicleInfoSuccess,
  updateDriverVehicleInfoFailure,
  updateDriverVehicleInfoSuccess,
  postdriverListSuccess,
  postdriverListFailure,
  postdriverbankInfoSuccess,
  postdrivebankInfoFailure,
  postdriverbankUpdateSuccess,
  postdriverbankUpdateFailure,
  removeFraudStatusDriverFail,
  removeFraudStatusDriverSuccess,
  getFdDriverFailPost,
  getFdDriverSuccessPost,
  postdriverServicesSuccess,
  postdriverServicesFailure,
  deletedriverServicesSuccess,
  deletedriverServicesFailure,
  deletevirtualAccountSuccess,
  deletevirtualAccountFailure,
} from "./actions"
import {
  getFdDriverDocumentsFail,
  getFdDriverDocumentsSuccess,
  postFdDriverDocumentFail,
  postFdDriverDocumentSuccess,
  getFdDriverDocumentFail,
  getFdDriverDocumentSuccess,
  putFdDriverDocumentFail,
  putFdDriverDocumentSuccess,
  deleteFdDriverDocumentFail,
  deleteFdDriverDocumentSuccess,
} from "./actions"

import {
  getFdDrivers,
  postFdDriver,
  getFdDriver,
  putFdDriver,
  deleteFdDriver,
  putFdDriversStatus,
  postPay,
  postPayAdjustment,
  exportDrivers,
  importDrivers,
  editVehicleDriver,
  updateVehicleDriver,
  driverVehicleList,
  postDriverBankDetails,
  postUpdateDriverBankDetails,
  getFdDriverPost,
  addDriverServices,
  deleteDriverServices,
  deletevirtualAccount,
} from "helpers/backend_helper"
import {
  getDocuments,
  postDocument,
  getDocument,
  putDocument,
  deleteDocument,
} from "helpers/backend_helper"

function* fetchFdDrivers({ payload: { storeType, data } }) {
  try {
    const response = yield call(getFdDrivers, storeType, data)

    if (response.status == "failure") {
      return yield put(getFdDriversFail(response.message))
    }

    yield put(getFdDriversSuccess(response))
  } catch (error) {
    yield put(getFdDriversFail(error))
  }
}

function* onAddNewFdDriver({ payload: { storeType, fdDriver, history } }) {
  try {
    const response = yield call(postFdDriver, storeType, fdDriver)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      toastr.error(response.message || "Error Occured")
      return yield put(addFdDriverFail(response.message))
    }

    history && history.goBack()
    toastr.success("Driver Added")
    yield put(addFdDriverSuccess())
  } catch (error) {
    yield put(addFdDriverFail("Internal Error!"))
  }
}

function* fetchFdDriver({ payload: { storeType, id } }) {
  try {
    Nprogress.start()

    const response = yield call(getFdDriver, storeType, id)

    if (response.status == "failure") {
      Nprogress.done()

      return yield put(getFdDriverFail(response.message))
    }

    yield put(getFdDriverSuccess(response.data))
    Nprogress.done()
  } catch (error) {
    yield put(getFdDriverFail(error))
  }
}

// date based on list

function* fetchFdDriverPost({ payload: { storeType, data, callback } }) {
  console.log("data12132", callback)
  try {
    Nprogress.start()

    const response = yield call(getFdDriverPost, storeType, data)

    callback && callback(response)

    if (response.status == "failure") {
      Nprogress.done()

      return yield put(getFdDriverFailPost(response.message))
    }

    yield put(getFdDriverSuccessPost(response.data))
    Nprogress.done()
  } catch (error) {
    yield put(getFdDriverFailPost(error))
  }
}

function* onPutFdDriver({ payload: { storeType, data, history } }) {
  try {
    const response = yield call(putFdDriver, storeType, data)

    if (response.status == "failure") {
      toastr.error(response.message || "Error Occured")
      return yield put(putFdDriverFail(response.message))
    }

    history && history.goBack()

    toastr.success("Driver Updated")
    yield put(putFdDriverSuccess())
  } catch (error) {
    yield put(putFdDriverFail("Internal Error!"))
  }
}

function* onDeleteFdDriver({ payload: { storeType, data, callback } }) {
  try {
    const response = yield call(deleteFdDriver, storeType, data)
    callback && callback(response)

    if (response.status == "failure") {
      return yield put(deleteFdDriverFail(response.message))
    }

    yield put(deleteFdDriverSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteFdDriverFail("Internal Error!"))
  }
}

function* onPutFdDriversStatus({ payload: { storeType, data, callback } }) {
  try {
    const response = yield call(putFdDriversStatus, storeType, data)

    if (response.status == "failure") {
      return yield put(putFdDriversStatusFail(response.message))
    }

    yield put(putFdDriversStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putFdDriversStatusFail("Internal Error!"))
  }
}

function* onPostFdDriverPay({ payload: { data, callback } }) {
  try {
    const response = yield call(postPay, data)

    if (response.status == "failure") {
      return yield put(postFdDriverPayFail(response.message))
    }

    callback && callback()
    yield put(postFdDriverPaySuccess())
  } catch (error) {
    yield put(postFdDriverPayFail(error))
  }
}

function* onPostFdDriverPayAdjustment({ payload: { data, callback } }) {
  try {
    const response = yield call(postPayAdjustment, data)

    if (response.status == "failure") {
      return yield put(postFdDriverPayAdjustmentFail(response.message))
    }

    callback && callback()
    yield put(postFdDriverPayAdjustmentSuccess())
  } catch (error) {
    yield put(postFdDriverPayAdjustmentFail(error))
  }
}

function* fetchFdDriverDocuments({ payload }) {
  try {
    const response = yield call(getDocuments, payload)

    if (response.status == "failure") {
      return yield put(getFdDriverDocumentsFail(response.message))
    }

    yield put(getFdDriverDocumentsSuccess(response?.data))
  } catch (error) {
    yield put(getFdDriverDocumentsFail(error))
  }
}

function* onPostFdDriverDocument({ payload: { fdDocument, history } }) {
  try {
    const response = yield call(postDocument, fdDocument)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(postFdDriverDocumentFail(response.message))
    }

    history && history.goBack()

    yield put(postFdDriverDocumentSuccess())
  } catch (error) {
    yield put(postFdDriverDocumentFail("Internal Error!"))
  }
}

function* fetchFdDriverDocument({ payload: { data } }) {
  try {
    const response = yield call(getDocument, data)

    if (response.status == "failure") {
      return yield put(getFdDriverDocumentFail(response.message))
    }

    yield put(getFdDriverDocumentSuccess(response.data))
  } catch (error) {
    yield put(getFdDriverDocumentFail(error))
  }
}

function* onPutFdDriverDocument({ payload: { data, history } }) {
  try {
    const response = yield call(putDocument, data)

    if (response.status == "failure") {
      return yield put(putFdDriverDocumentFail(response.message))
    }

    history && history.goBack()

    yield put(putFdDriverDocumentSuccess())
  } catch (error) {
    yield put(putFdDriverDocumentFail("Internal Error!"))
  }
}

function* onDeleteFdDriverDocument({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteDocument, data)

    if (response.status == "failure") {
      return yield put(deleteFdDriverDocumentFail(response.message))
    }

    yield put(deleteFdDriverDocumentSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteFdDriverDocumentFail("Internal Error!"))
  }
}

function* onExportDrivers({ payload }) {
  try {
    const response = yield call(exportDrivers)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(exportDriversFail(response.message))
    }

    var hiddenElement = document.createElement("a")
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(response)
    hiddenElement.target = "_blank"
    hiddenElement.download = "drivers.csv"
    hiddenElement.click()

    yield put(exportDriversSuccess())
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(exportDriversFail("Internal Error!"))
  }
}

function* onImportDrivers({ payload: { data, callback } }) {
  try {
    const response = yield call(importDrivers, data)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(importDriversFail(response.message))
    }

    callback && callback(response)
    yield put(importDriversSuccess(response.message))
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(importDriversFail("Internal Error!"))
  }
}

function* onEditDriverVehicleInfo({ payload }) {
  console.log(payload, "PAYLOAd")
  try {
    const response = yield call(editVehicleDriver, payload)
    console.log(response, "RESPONSE")

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(editDriverVehicleInfoFailure(response.message))
    }

    return yield put(editDriverVehicleInfoSuccess(response.data))
  } catch (error) {
    console.log(error, "EZRROR")
    toastr.error("Internal Error!")
    yield put(editDriverVehicleInfoFailure("Internal Error!"))
  }
}

function* onUpdateDriverVehicleInfo({ payload: { data, history } }) {
  try {
    const response = yield call(updateVehicleDriver, data)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(updateDriverVehicleInfoFailure(response.message))
    }
    history.goBack()
    toastr.success(response.message)
    return yield put(updateDriverVehicleInfoSuccess(response.data))
  } catch (error) {
    console.log(error, "EZRROR")
    toastr.error("Internal Error!")
    yield put(updateDriverVehicleInfoFailure("Internal Error!"))
  }
}

function* onPostDriverList({ payload }) {
  try {
    const response = yield call(driverVehicleList, payload)

    if (response.status == "failure") {
      return yield put(postdriverListFailure(response.message))
    }

    return yield put(postdriverListSuccess(response.data))
  } catch (error) {
    console.log(error, "EZRROR")
    toastr.error("Internal Error!")
    yield put(postdriverListFailure("Internal Error!"))
  }
}
function* onDriverbankInfo({ payload }) {
  try {
    const response = yield call(postDriverBankDetails, payload)

    if (response.status == "failure") {
      return yield put(postdrivebankInfoFailure(response.message))
    }

    return yield put(postdriverbankInfoSuccess(response.data))
  } catch (error) {
    console.log(error, "EZRROR")
    toastr.error("Internal Error!")
    yield put(postdrivebankInfoFailure("Internal Error!"))
  }
}

function* onDriverbankInfoUpdate({ payload: { data, history } }) {
  try {
    const response = yield call(postUpdateDriverBankDetails, data)

    if (response.status == "failure") {
      return yield put(postdriverbankUpdateFailure(response.message))
    }
    history.goBack()
    return yield put(postdriverbankUpdateSuccess(response.data))
  } catch (error) {
    console.log(error, "EZRROR")
    toastr.error("Internal Error!")
    yield put(postdriverbankUpdateFailure("Internal Error!"))
  }
}
function* onAdddriverService({ payload: { data, history } }) {
  try {
    const response = yield call(addDriverServices, data)

    if (response.status == "failure") {
      return yield put(postdriverServicesFailure(response.message))
    }
    history.goBack()
    return yield put(postdriverServicesSuccess(response.data))
  } catch (error) {
    console.log(error, "EZRROR")
    toastr.error("Internal Error!")
    yield put(postdriverServicesFailure("Internal Error!"))
  }
}
function* ondeletedriverService({ payload: { storeType, data, callback } }) {
  try {
    const response = yield call(deleteDriverServices, data)
    callback && callback(response)

    if (response.status == "failure") {
      return yield put(deletedriverServicesFailure(response.message))
    }
    yield put(deletedriverServicesSuccess(response.data))
    callback && callback()
  } catch (error) {
    yield put(deletedriverServicesFailure("Internal Error!"))
  }
}
function* ondeletevirtualAccount({ payload: { storeType, data, callback } }) {
  try {
    const response = yield call(deletevirtualAccount, data)
    callback && callback(response)

    if (response.status == "failure") {
      return yield put(deletevirtualAccountFailure(response.message))
    }
    yield put(deletevirtualAccountSuccess(response.data))
    callback && callback()
  } catch (error) {
    yield put(deletedriverServicesFailure("Internal Error!"))
  }
}

function* FdDriversSaga() {
  yield takeEvery(GET_FD_DRIVERS, fetchFdDrivers)
  yield takeEvery(ADD_FD_DRIVER, onAddNewFdDriver)
  yield takeEvery(GET_FD_DRIVER, fetchFdDriver)
  yield takeEvery(GET_FD_DRIVER_POST, fetchFdDriverPost)
  yield takeEvery(PUT_FD_DRIVER, onPutFdDriver)
  yield takeEvery(DELETE_FD_DRIVER, onDeleteFdDriver)
  yield takeEvery(PUT_FD_DRIVERS_STATUS, onPutFdDriversStatus)
  yield takeEvery(POST_FD_DRIVER_PAY, onPostFdDriverPay)
  yield takeLatest(POST_FD_DRIVER_PAY_ADJUSTMENT, onPostFdDriverPayAdjustment)
  yield takeEvery(GET_FD_DRIVER_DOCUMENTS, fetchFdDriverDocuments)
  yield takeEvery(POST_FD_DRIVER_DOCUMENT, onPostFdDriverDocument)
  yield takeEvery(GET_FD_DRIVER_DOCUMENT, fetchFdDriverDocument)
  yield takeEvery(PUT_FD_DRIVER_DOCUMENT, onPutFdDriverDocument)
  yield takeEvery(DELETE_FD_DRIVER_DOCUMENT, onDeleteFdDriverDocument)
  yield takeLatest(EXPORT_DRIVERS, onExportDrivers)
  yield takeLatest(IMPORT_DRIVERS, onImportDrivers)
  yield takeLatest(EDIT_DRIVER_VEHICLE_INFO, onEditDriverVehicleInfo)
  yield takeLatest(UPDATE_DRIVER_VEHICLE_INFO, onUpdateDriverVehicleInfo)
  yield takeLatest(DRIVER_VEHICLE_LIST, onPostDriverList)
  yield takeLatest(DRIVER_BANK_INFO, onDriverbankInfo)
  yield takeLatest(DRIVER_BANK_INFO_UPDATE, onDriverbankInfoUpdate)
  yield takeLatest(ADD_DRIVER_SERVICES, onAdddriverService),
    yield takeLatest(DELETE_DRIVER_SERVICES, ondeletedriverService)
  yield takeLatest(DELETE_VIRTUAL_ACCOUNT, ondeletevirtualAccount)
}

export default FdDriversSaga
