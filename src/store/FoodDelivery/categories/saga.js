import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

// Food Delivery Drivers Redux States
import {
  GET_FD_CATEGORIES,
  ADD_FD_CATEGORY,
  GET_FD_CATEGORY,
  PUT_FD_CATEGORY,
  DELETE_FD_CATEGORY,
  PUT_FD_CATEGORIES_STATUS,
  PUT_FD_CATEGORY_SORT,
  EXPORT_FD_CATEGORIES,
} from "./actionTypes"
import {
  getFdCategories as getFdCategoriesAction,
  getFdCategoriesFail,
  getFdCategoriesSuccess,
  addFdCategoryFail,
  addFdCategorySuccess,
  getFdCategoryFail,
  getFdCategorySuccess,
  putFdCategoryFail,
  putFdCategorySuccess,
  deleteFdCategoryFail,
  deleteFdCategorySuccess,
  putFdCategoriesStatusFail,
  putFdCategoriesStatusSuccess,
  putFdCategorySortFail,
  putFdCategorySortSuccess,
  exportFdCategoriesFail,
  exportFdCategoriesSuccess,
} from "./actions"

import {
  getFdCategories,
  postFdCategory,
  getFdCategory,
  putFdCategory,
  deleteFdCategory,
  putFdCategoriesStatus,
  putFdCategorySort,
  exportFdCategories,
} from "helpers/backend_helper"

function* fetchFdCategories({ payload: { storeType, data } }) {
  try {
    const response = yield call(getFdCategories, storeType, data)

    if (response.status == "failure") {
      return yield put(getFdCategoriesFail(response.message))
    }

    yield put(getFdCategoriesSuccess(response))
  } catch (error) {
    yield put(getFdCategoriesFail(error))
  }
}

function* onAddNewFdCategory({ payload: { storeType, fdCategory, history } }) {
  try {
    const response = yield call(postFdCategory, storeType, fdCategory)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addFdCategoryFail(response.message))
    }

    history && history.goBack()

    yield put(addFdCategorySuccess())
  } catch (error) {
    yield put(addFdCategoryFail("Internal Error!"))
  }
}

function* fetchFdCategory({ payload: { storeType, id } }) {
  try {
    const response = yield call(getFdCategory, storeType, id)

    if (response.status == "failure") {
      return yield put(getFdCategoryFail(response.message))
    }

    yield put(getFdCategorySuccess(response.data))
  } catch (error) {
    yield put(getFdCategoryFail(error))
  }
}

function* onPutFdCategory({ payload: { storeType, data, history } }) {
  try {
    const response = yield call(putFdCategory, storeType, data)

    if (response.status == "failure") {
      return yield put(putFdCategoryFail(response.message))
    }

    history && history.goBack()

    yield put(putFdCategorySuccess())
  } catch (error) {
    yield put(putFdCategoryFail("Internal Error!"))
  }
}

function* onDeleteFdCategory({ payload: { storeType, data, callback } }) {
  try {
    const response = yield call(deleteFdCategory, storeType, data)

    if (response.status == "failure") {
      return yield put(deleteFdCategoryFail(response.message))
    }

    yield put(deleteFdCategorySuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteFdCategoryFail("Internal Error!"))
  }
}

function* onPutFdCategoriesStatus({ payload: { storeType, data, callback } }) {
  try {
    const response = yield call(putFdCategoriesStatus, storeType, data)

    if (response.status == "failure") {
      return yield put(putFdCategoriesStatusFail(response.message))
    }

    yield put(putFdCategoriesStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putFdCategoriesStatusFail("Internal Error!"))
  }
}

function* onPutFdCategorySort({ payload: { data, filter, storeType } }) {
  try {
    const response = yield call(putFdCategorySort, data)

    if (response.status == "failure") {
      return yield put(putFdCategorySortFail(response.message))
    }

    yield put(getFdCategoriesAction(storeType, filter))
    yield put(putFdCategorySortSuccess())
  } catch (error) {
    yield put(putFdCategorySortFail("Internal Error!"))
  }
}

function* onExportFdCategories({ payload: { storeType, id } }) {
  try {
    const response = yield call(exportFdCategories, storeType, id)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(exportFdCategoriesFail(response.message))
    }

    var hiddenElement = document.createElement("a")
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(response)
    hiddenElement.target = "_blank"
    hiddenElement.download = "categories.csv"
    hiddenElement.click()

    yield put(exportFdCategoriesSuccess())
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(exportFdCategoriesFail("Internal Error!"))
  }
}

function* FdCategoriesSaga() {
  yield takeEvery(GET_FD_CATEGORIES, fetchFdCategories)
  yield takeEvery(ADD_FD_CATEGORY, onAddNewFdCategory)
  yield takeEvery(GET_FD_CATEGORY, fetchFdCategory)
  yield takeEvery(PUT_FD_CATEGORY, onPutFdCategory)
  yield takeEvery(DELETE_FD_CATEGORY, onDeleteFdCategory)
  yield takeEvery(PUT_FD_CATEGORIES_STATUS, onPutFdCategoriesStatus)
  yield takeEvery(PUT_FD_CATEGORY_SORT, onPutFdCategorySort)
  yield takeLatest(EXPORT_FD_CATEGORIES, onExportFdCategories)
}

export default FdCategoriesSaga
