import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import toastr from "toastr"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import "toastr/build/toastr.min.css"

// Food Delivery Products Redux States
import {
  GET_FD_PRODUCTS,
  ADD_FD_PRODUCT,
  GET_FD_PRODUCT,
  PUT_FD_PRODUCT,
  DELETE_FD_PRODUCT,
  PUT_FD_PRODUCTS_STATUS,
  EXPORT_FD_PRODUCTS,
  IMPORT_FD_PRODUCTS,
  IMPORT_FD_PRODUCTS_VARIATIONS,
  IMPORT_FD_PRODUCTS_COMBINE,
} from "./actionTypes"
import {
  getFdProductsFail,
  getFdProductsSuccess,
  addFdProductFail,
  addFdProductSuccess,
  getFdProductFail,
  getFdProductSuccess,
  putFdProductFail,
  putFdProductSuccess,
  deleteFdProductFail,
  deleteFdProductSuccess,
  putFdProductsStatusFail,
  putFdProductsStatusSuccess,
  exportFdProductsFail,
  exportFdProductsSuccess,
  importFdProductsFail,
  importFdProductsSuccess,
  importFdProductsVariationsFail,
  importFdProductsVariationsSuccess,
  importFdProductsCombineFail,
  importFdProductsCombineSuccess,
} from "./actions"

import {
  getFdProducts,
  postFdProduct,
  getFdProduct,
  putFdProduct,
  deleteFdProduct,
  putFdProductsStatus,
  exportFdProducts,
  importFdProducts,
  importFdProductsVariations,
  importFdProductsCombine,
} from "helpers/backend_helper"

function* fetchFdProducts({ payload: { storeType, data } }) {
  try {
    const response = yield call(getFdProducts, storeType, data)

    if (response.status == "failure") {
      return yield put(getFdProductsFail(response.message))
    }

    yield put(getFdProductsSuccess(response))
  } catch (error) {
    yield put(getFdProductsFail(error))
  }
}

function* onAddNewFdProduct({ payload: { storeType, fdProduct, history } }) {
  try {
    if (!fdProduct.isFeaturedOnly && !fdProduct.featured_image) {
      return yield put(addFdProductFail("image_required"))
    } else {
      yield put(addFdProductFail(""))
    }

    const response = yield call(postFdProduct, storeType, fdProduct)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addFdProductFail(response.message))
    }

    history && history.goBack()

    yield put(addFdProductSuccess())
  } catch (error) {
    yield put(addFdProductFail("Internal Error!"))
  }
}

function* fetchFdProduct({ payload: { storeType, id } }) {
  try {
    Nprogress.start()

    const response = yield call(getFdProduct, storeType, id)

    if (response.status == "failure") {
      Nprogress.done()
      return yield put(getFdProductFail(response.message))
    }

    yield put(getFdProductSuccess(response.data))
    Nprogress.done()
  } catch (error) {
    yield put(getFdProductFail(error))
  }
}

function* onPutFdProduct({ payload: { storeType, data, history } }) {
  try {
    if (!data.isFeaturedOnly && !data.featured_image) {
      window.scrollTo(0, 0)
      return yield put(addFdProductFail("image_required"))
    } else {
      yield put(addFdProductFail(""))
    }

    const response = yield call(putFdProduct, storeType, data)

    if (response.status == "failure") {
      return yield put(putFdProductFail(response.message))
    }

    history && history.goBack()

    yield put(putFdProductSuccess())
  } catch (error) {
    yield put(putFdProductFail("Internal Error!"))
  }
}

function* onDeleteFdProduct({ payload: { storeType, data, callback } }) {
  try {
    const response = yield call(deleteFdProduct, storeType, data)

    if (response.status == "failure") {
      return yield put(deleteFdProductFail(response.message))
    }

    yield put(deleteFdProductSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteFdProductFail("Internal Error!"))
  }
}

function* onPutFdProductsStatus({ payload: { storeType, data, callback } }) {
  try {
    const response = yield call(putFdProductsStatus, storeType, data)

    if (response.status == "failure") {
      return yield put(putFdProductsStatusFail(response.message))
    }

    yield put(putFdProductsStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putFdProductsStatusFail("Internal Error!"))
  }
}

function* onExportFdProducts({ payload: { storeType, id } }) {
  try {
    const response = yield call(exportFdProducts, storeType, id)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(exportFdProductsFail(response.message))
    }

    var hiddenElement = document.createElement("a")
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(response)
    hiddenElement.target = "_blank"
    hiddenElement.download = "products.csv"
    hiddenElement.click()

    yield put(exportFdProductsSuccess())
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(exportFdProductsFail("Internal Error!"))
  }
}

function* onImportFdProducts({ payload: { data, callback } }) {
  try {
    const response = yield call(importFdProducts, data)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(importFdProductsFail(response.message))
    }

    callback && callback(response)

    var hiddenElement = document.createElement("a")
    hiddenElement.href = "data:csv;charset=utf-8," + encodeURI(response)
    hiddenElement.target = "_blank"
    hiddenElement.download = "import-completed-products.csv"
    hiddenElement.click()
    yield put(importFdProductsSuccess(response.message))
  } catch (error) {
    console.log("error ", error)
    // toastr.error("Internal Error!")
    // yield put(importFdProductsFail("Internal Error!"))
  }
}

function* onImportFdProductsVariations({ payload: { data, callback } }) {
  try {
    const response = yield call(importFdProductsVariations, data)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(importFdProductsVariationsFail(response.message))
    }

    callback && callback(response)
    yield put(importFdProductsVariationsSuccess(response.message))
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(importFdProductsVariationsFail("Internal Error!"))
  }
}

function* onImportFdProductsCombine({ payload: { data, callback } }) {
  try {
    const response = yield call(importFdProductsCombine, data)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(importFdProductsCombineFail(response.message))
    }

    callback && callback(response)
    yield put(importFdProductsCombineSuccess(response.message))
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(importFdProductsCombineFail("Internal Error!"))
  }
}

function* FdProductsSaga() {
  yield takeEvery(GET_FD_PRODUCTS, fetchFdProducts)
  yield takeEvery(ADD_FD_PRODUCT, onAddNewFdProduct)
  yield takeEvery(GET_FD_PRODUCT, fetchFdProduct)
  yield takeEvery(PUT_FD_PRODUCT, onPutFdProduct)
  yield takeEvery(DELETE_FD_PRODUCT, onDeleteFdProduct)
  yield takeEvery(PUT_FD_PRODUCTS_STATUS, onPutFdProductsStatus)
  yield takeLatest(EXPORT_FD_PRODUCTS, onExportFdProducts)
  yield takeLatest(IMPORT_FD_PRODUCTS, onImportFdProducts)
  yield takeLatest(IMPORT_FD_PRODUCTS_VARIATIONS, onImportFdProductsVariations)
  yield takeLatest(IMPORT_FD_PRODUCTS_COMBINE, onImportFdProductsCombine)
}

export default FdProductsSaga
