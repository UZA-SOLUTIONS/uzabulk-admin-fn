import { call, put, takeEvery } from "redux-saga/effects"

// SubAdmin Redux States
import {
  GET_BLOG_CATEGORIES,
  ADD_BLOG_CATEGORY,
  GET_BLOG_CATEGORY,
  PUT_BLOG_CATEGORY,
  DELETE_BLOG_CATEGORY,
  PUT_BLOG_CATEGORIES_STATUS,
} from "./actionTypes"
import {
  getblogCategoriesFail,
  getblogCategoriesSuccess,
  addBlogCategoryFail,
  addBlogCategorySuccess,
  getblogCategoryFail,
  getblogCategorySuccess,
  putBlogCategoryFail,
  putBlogCategorySuccess,
  deleteBlogCategoryFail,
  deleteBlogCategorySuccess,
  putBlogCategoriesStatusSuccess,
  putBlogCategoriesStatusFail,
} from "./actions"

import {
  blogCategories,
  postblogCategory,
  getBlogCategory,
  putBlogCategory,
  deleteBlogCategory,
  putBlogCategoriesStatus,
} from "helpers/backend_helper"

function* fetchBlogCategories({ payload }) {
  try {
    const response = yield call(blogCategories, payload)

    if (response.status == "failure") {
      return yield put(getblogCategoriesFail(response.message))
    }

    yield put(getblogCategoriesSuccess(response))
  } catch (error) {
    yield put(getblogCategoriesFail(error))
  }
}

function* onAddNewBlogCategory({ payload: { category, history } }) {
  try {
    const response = yield call(postblogCategory, category)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addBlogCategoryFail(response.message))
    }

    history && history.replace("/blog-category")

    yield put(addBlogCategorySuccess())
  } catch (error) {
    yield put(addBlogCategoryFail("Internal Error!"))
  }
}

function* fetchBlogCategory({ payload }) {
  try {
    const response = yield call(getBlogCategory, payload)

    if (response.status == "failure") {
      return yield put(getblogCategoryFail(response.message))
    }

    yield put(getblogCategorySuccess(response.data))
  } catch (error) {
    yield put(getblogCategoryFail(error))
  }
}

function* onPutBlogCategory({ payload: { data, history } }) {
  try {
    const response = yield call(putBlogCategory, data)

    if (response.status == "failure") {
      return yield put(putBlogCategoryFail(response.message))
    }

    history && history.replace("/blog-category")

    yield put(putBlogCategorySuccess())
  } catch (error) {
    yield put(putBlogCategoryFail("Internal Error!"))
  }
}

function* onDeleteBlogCategory({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteBlogCategory, data)

    if (response.status == "failure") {
      return yield put(deleteBlogCategoryFail(response.message))
    }

    yield put(deleteBlogCategorySuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteBlogCategoryFail("Internal Error!"))
  }
}

function* onPutBlogCategoryStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putBlogCategoriesStatus, data)

    if (response.status == "failure") {
      return yield put(putBlogCategoriesStatusSuccess(response.message))
    }

    yield put(putBlogCategoriesStatusFail())
    callback && callback()
  } catch (error) {
    yield put(putBlogCategoriesStatusFail("Internal Error!"))
  }
}

function* SubAdminsSaga() {
  yield takeEvery(GET_BLOG_CATEGORIES, fetchBlogCategories)
  yield takeEvery(ADD_BLOG_CATEGORY, onAddNewBlogCategory)
  yield takeEvery(GET_BLOG_CATEGORY, fetchBlogCategory)
  yield takeEvery(PUT_BLOG_CATEGORY, onPutBlogCategory)
  yield takeEvery(DELETE_BLOG_CATEGORY, onDeleteBlogCategory)
  yield takeEvery(PUT_BLOG_CATEGORIES_STATUS, onPutBlogCategoryStatus)
}

export default SubAdminsSaga
