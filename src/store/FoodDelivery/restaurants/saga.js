import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import toastr from "toastr"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import "toastr/build/toastr.min.css"

// Food Delivery Restaurants Redux States
import {
  GET_FD_RESTAURANTS,
  ADD_FD_RESTAURANT,
  GET_FD_RESTAURANT,
  PUT_FD_RESTAURANT,
  DELETE_FD_RESTAURANT,
  CLONE_FD_RESTAURANT,
  PUT_FD_RESTAURANTS_STATUS,
  PUT_FD_RESTAURANT_SETTINGS,
  POST_FD_RESTAURANT_PAY,
  POST_FD_RESTAURANT_PAY_ADJUSTMENT,
  EXPORT_FD_RESTAURANTS,
  IMPORT_FD_RESTAURANTS,
  DELETE_FD_VENDOR_STRIPE_CONNECT,
  GET_FD_RESTAURANT_POST,
} from "./actionTypes"
import {
  GET_FD_RESTAURANT_DOCUMENTS,
  POST_FD_RESTAURANT_DOCUMENT,
  GET_FD_RESTAURANT_DOCUMENT,
  PUT_FD_RESTAURANT_DOCUMENT,
  DELETE_FD_RESTAURANT_DOCUMENT,
} from "./actionTypes"

import {
  getFdRestaurantsFail,
  getFdRestaurantsSuccess,
  addFdRestaurantFail,
  addFdRestaurantSuccess,
  getFdRestaurantFail,
  getFdRestaurantSuccess,
  putFdRestaurantFail,
  putFdRestaurantSuccess,
  deleteFdRestaurantFail,
  deleteFdRestaurantSuccess,
  cloneFdRestaurantFail,
  cloneFdRestaurantSuccess,
  putFdRestaurantsStatusFail,
  putFdRestaurantsStatusSuccess,
  putFdRestaurantSettingsSuccess,
  putFdRestaurantSettingsFail,
  postFdRestaurantPaySuccess,
  postFdRestaurantPayFail,
  postFdRestaurantPayAdjustmentSuccess,
  postFdRestaurantPayAdjustmentFail,
  exportFdRestaurantsFail,
  exportFdRestaurantsSuccess,
  importFdRestaurantsFail,
  importFdRestaurantsSuccess,
  deleteFdRestaurantStripeConnectFail,
  deleteFdRestaurantStripeConnectSuccess,
  getFdRestaurantPostFail,
  getFdRestaurantPostSuccess,
} from "./actions"
import {
  getFdRestaurantDocumentsFail,
  getFdRestaurantDocumentsSuccess,
  postFdRestaurantDocumentFail,
  postFdRestaurantDocumentSuccess,
  getFdRestaurantDocumentFail,
  getFdRestaurantDocumentSuccess,
  putFdRestaurantDocumentFail,
  putFdRestaurantDocumentSuccess,
  deleteFdRestaurantDocumentFail,
  deleteFdRestaurantDocumentSuccess,
} from "./actions"

import {
  getFdRestaurants,
  postFdRestaurant,
  getFdRestaurant,
  putFdRestaurant,
  deleteFdRestaurant,
  cloneFdRestaurant,
  putFdRestaurantsStatus,
  putFdRestaurantSettings,
  postPay,
  postPayAdjustment,
  exportFdRestaurants,
  importFdRestaurants,
  deleteFdRestaurantStripeConnect,
  getFdRestaurantPost,
} from "helpers/backend_helper"
import {
  getDocuments,
  postDocument,
  getDocument,
  putDocument,
  deleteDocument,
} from "helpers/backend_helper"

function* fetchFdRestaurants({ payload: { storeType, data } }) {
  try {
    const response = yield call(getFdRestaurants, storeType, data)

    if (response.status == "failure") {
      return yield put(getFdRestaurantsFail(response.message))
    }

    yield put(getFdRestaurantsSuccess(response))
  } catch (error) {
    yield put(getFdRestaurantsFail(error))
  }
}

function* onAddNewFdRestaurant({
  payload: { storeType, fdRestaurant, callback },
}) {
  try {
    const response = yield call(postFdRestaurant, storeType, fdRestaurant)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addFdRestaurantFail(response.message))
    }

    callback && callback(response?.data)

    yield put(addFdRestaurantSuccess())
  } catch (error) {
    console.log(error)
    yield put(addFdRestaurantFail("Internal Error!"))
  }
}

function* fetchFdRestaurant({ payload: { storeType, id } }) {
  try {
    Nprogress.start()
    const response = yield call(getFdRestaurant, storeType, id)

    if (response.status == "failure") {
      Nprogress.done()
      return yield put(getFdRestaurantFail(response.message))
    }

    yield put(getFdRestaurantSuccess(response.data))
    Nprogress.done()
  } catch (error) {
    yield put(getFdRestaurantFail(error))
  }
}

// post

function* fetchFdRestaurantPost({ payload: { data, id, callback } }) {
  try {
    Nprogress.start()
    const response = yield call(getFdRestaurantPost, data, id,)
    callback && callback(response)

    if (response.status == "failure") {
      Nprogress.done()
      return yield put(getFdRestaurantPostFail(response.message))
    }

    yield put(getFdRestaurantPostSuccess(response.data))
    Nprogress.done()
  } catch (error) {
    yield put(getFdRestaurantPostFail(error))
  }
}




function* onPutFdRestaurant({ payload: { storeType, data, history } }) {
  try {
    const response = yield call(putFdRestaurant, storeType, data)

    if (response.status == "failure") {
      return yield put(putFdRestaurantFail(response.message))
    }

    history && history.goBack()
    yield put(putFdRestaurantSuccess(response.data))
  } catch (error) {
    yield put(putFdRestaurantFail("Internal Error!"))
  }
}

function* onDeleteFdRestaurant({ payload: { storeType, data, callback } }) {
  try {
    const response = yield call(deleteFdRestaurant, storeType, data)

    if (response.status == "failure") {
      return yield put(deleteFdRestaurantFail(response.message))
    }

    yield put(deleteFdRestaurantSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteFdRestaurantFail("Internal Error!"))
  }
}

function* onCloneFdRestaurant({ payload: { storeType, data, callback } }) {
  try {
    const response = yield call(cloneFdRestaurant, storeType, data)

    callback && callback(response);
    if (response.status == "failure") {
      return yield put(cloneFdRestaurantFail(response.message))
    }

    yield put(cloneFdRestaurantSuccess())
  } catch (error) {
    yield put(cloneFdRestaurantFail("Internal Error!"))
  }
}

function* onPutFdRestaurantsStatus({ payload: { storeType, data, callback } }) {
  try {
    const response = yield call(putFdRestaurantsStatus, storeType, data)

    if (response.status == "failure") {
      return yield put(putFdRestaurantsStatusFail(response.message))
    }

    yield put(putFdRestaurantsStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putFdRestaurantsStatusFail("Internal Error!"))
  }
}

function* onPutSettings({ payload: { storeType, data } }) {
  try {
    const response = yield call(putFdRestaurantSettings, storeType, data)

    window.scrollTo(0, 0)

    if (response.status == "failure") {
      return yield put(putFdRestaurantSettingsFail(response.message))
    }

    yield put(putFdRestaurantSettingsSuccess(response.data, response.message))
  } catch (error) {
    yield put(putFdRestaurantSettingsFail(error))
  }
}

function* onPostFdRestaurantPay({ payload: { data, callback } }) {
  try {
    const response = yield call(postPay, data)

    if (response.status == "failure") {
      return yield put(postFdRestaurantPayFail(response.message))
    }

    callback && callback()
    yield put(postFdRestaurantPaySuccess())
  } catch (error) {
    yield put(postFdRestaurantPayFail(error))
  }
}

function* onPostFdRestaurantPayAdjustment({ payload: { data, callback } }) {
  try {
    const response = yield call(postPayAdjustment, data)

    if (response.status == "failure") {
      return yield put(postFdRestaurantPayAdjustmentFail(response.message))
    }

    callback && callback()
    yield put(postFdRestaurantPayAdjustmentSuccess())
  } catch (error) {
    yield put(postFdRestaurantPayAdjustmentFail(error))
  }
}

function* fetchFdRestaurantDocuments({ payload }) {
  try {
    const response = yield call(getDocuments, payload)

    if (response.status == "failure") {
      return yield put(getFdRestaurantDocumentsFail(response.message))
    }

    yield put(getFdRestaurantDocumentsSuccess(response?.data))
  } catch (error) {
    yield put(getFdRestaurantDocumentsFail(error))
  }
}

function* onPostFdRestaurantDocument({ payload: { fdDocument, history } }) {
  try {
    const response = yield call(postDocument, fdDocument)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(postFdRestaurantDocumentFail(response.message))
    }

    history && history.goBack()

    yield put(postFdRestaurantDocumentSuccess())
  } catch (error) {
    yield put(postFdRestaurantDocumentFail("Internal Error!"))
  }
}

function* fetchFdRestaurantDocument({ payload: { id } }) {
  try {
    const response = yield call(getDocument, id)

    if (response.status == "failure") {
      return yield put(getFdRestaurantDocumentFail(response.message))
    }

    yield put(getFdRestaurantDocumentSuccess(response.data))
  } catch (error) {
    yield put(getFdRestaurantDocumentFail(error))
  }
}

function* onPutFdRestaurantDocument({ payload: { data, history } }) {
  try {
    const response = yield call(putDocument, data)

    if (response.status == "failure") {
      return yield put(putFdRestaurantDocumentFail(response.message))
    }

    history && history.goBack()

    yield put(putFdRestaurantDocumentSuccess())
  } catch (error) {
    yield put(putFdRestaurantDocumentFail("Internal Error!"))
  }
}

function* onDeleteFdRestaurantDocument({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteDocument, data)

    if (response.status == "failure") {
      return yield put(deleteFdRestaurantDocumentFail(response.message))
    }

    yield put(deleteFdRestaurantDocumentSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteFdRestaurantDocumentFail("Internal Error!"))
  }
}

function* onExportFdRestaurants({ payload }) {
  try {
    const response = yield call(exportFdRestaurants, payload)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(exportFdRestaurantsFail(response.message))
    }

    var hiddenElement = document.createElement("a")
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(response)
    hiddenElement.target = "_blank"
    hiddenElement.download = "vendors.csv"
    hiddenElement.click()

    yield put(exportFdRestaurantsSuccess())
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(exportFdRestaurantsFail("Internal Error!"))
  }
}

function* onImportFdRestaurants({ payload: { data, callback } }) {
  try {
    const response = yield call(importFdRestaurants, data)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(importFdRestaurantsFail(response.message))
    }

    callback && callback(response)
    yield put(importFdRestaurantsSuccess(response.message))
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(importFdRestaurantsFail("Internal Error!"))
  }
}

function* onDeleteFdRestaurantStripeConnect({ payload: { id, callback } }) {
  try {
    const response = yield call(deleteFdRestaurantStripeConnect, id)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(deleteFdRestaurantStripeConnectFail(response.message))
    }

    callback && callback(response)
    yield put(deleteFdRestaurantStripeConnectSuccess(response.message))
  } catch (error) {
    console.log("error ", error)
    // toastr.error("Internal Error!")
    yield put(deleteFdRestaurantStripeConnectFail("Internal Error!"))
  }
}

function* FdRestaurantsSaga() {
  yield takeEvery(GET_FD_RESTAURANTS, fetchFdRestaurants)
  yield takeEvery(ADD_FD_RESTAURANT, onAddNewFdRestaurant)
  yield takeEvery(GET_FD_RESTAURANT, fetchFdRestaurant)
   yield takeEvery(GET_FD_RESTAURANT_POST, fetchFdRestaurantPost)
  yield takeEvery(PUT_FD_RESTAURANT, onPutFdRestaurant)
  yield takeEvery(DELETE_FD_RESTAURANT, onDeleteFdRestaurant)
  yield takeEvery(CLONE_FD_RESTAURANT, onCloneFdRestaurant)
  yield takeEvery(PUT_FD_RESTAURANTS_STATUS, onPutFdRestaurantsStatus)
  yield takeEvery(PUT_FD_RESTAURANT_SETTINGS, onPutSettings)
  yield takeEvery(POST_FD_RESTAURANT_PAY, onPostFdRestaurantPay)
  yield takeEvery(
    POST_FD_RESTAURANT_PAY_ADJUSTMENT,
    onPostFdRestaurantPayAdjustment
  )
  yield takeEvery(GET_FD_RESTAURANT_DOCUMENTS, fetchFdRestaurantDocuments)
  yield takeEvery(POST_FD_RESTAURANT_DOCUMENT, onPostFdRestaurantDocument)
  yield takeEvery(GET_FD_RESTAURANT_DOCUMENT, fetchFdRestaurantDocument)
  yield takeEvery(PUT_FD_RESTAURANT_DOCUMENT, onPutFdRestaurantDocument)
  yield takeEvery(DELETE_FD_RESTAURANT_DOCUMENT, onDeleteFdRestaurantDocument)
  yield takeLatest(EXPORT_FD_RESTAURANTS, onExportFdRestaurants)
  yield takeLatest(IMPORT_FD_RESTAURANTS, onImportFdRestaurants)
  yield takeLatest(
    DELETE_FD_VENDOR_STRIPE_CONNECT,
    onDeleteFdRestaurantStripeConnect
  )
}

export default FdRestaurantsSaga
