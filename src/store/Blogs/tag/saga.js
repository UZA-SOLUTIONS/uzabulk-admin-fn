import { call, put, takeEvery } from "redux-saga/effects"

// SubAdmin Redux States
import {
  GET_BLOG_TAGS,
  ADD_BLOG_TAG,
  GET_BLOG_TAG,
  PUT_BLOG_TAG,
  DELETE_BLOG_TAG,
  PUT_BLOG_TAGS_STATUS,
} from "./actionTypes"
import {
  getblogTagsFail,
  getblogTagsSuccess,
  addblogTagFail,
  addblogTagSuccess,
  getblogTagFail,
  getblogTagSuccess,
  putBlogTagFail,
  putBlogTagSuccess,
  deleteBlogTagFail,
  deleteBlogTagSuccess,
  putBlogTagsStatusSuccess,
  putBlogTagsStatusFail,
} from "./actions"

import {
  blogTags,
  postblogTag,
  getBlogTag,
  putBlogTag,
  deleteBlogTag,
  putBlogTagsStatus,
} from "helpers/backend_helper"

function* fetchBlogTags({ payload }) {
  try {
    const response = yield call(blogTags, payload)

    if (response.status == "failure") {
      return yield put(getblogTagsFail(response.message))
    }

    yield put(getblogTagsSuccess(response))
  } catch (error) {
    yield put(getblogTagsFail(error))
  }
}

function* onAddNewBlogTag({ payload: { tag, history } }) {
  try {
    const response = yield call(postblogTag, tag)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addblogTagFail(response.message))
    }

    history && history.replace("/blog-tag")

    yield put(addblogTagSuccess())
  } catch (error) {
    yield put(addblogTagFail("Internal Error!"))
  }
}

function* fetchBlogTag({ payload }) {
  try {
    const response = yield call(getBlogTag, payload)

    if (response.status == "failure") {
      return yield put(getblogTagFail(response.message))
    }

    yield put(getblogTagSuccess(response.data))
  } catch (error) {
    yield put(getblogTagFail(error))
  }
}

function* onPutBlogTag({ payload: { data, history } }) {
  try {
    const response = yield call(putBlogTag, data)

    if (response.status == "failure") {
      return yield put(putBlogTagFail(response.message))
    }

    history && history.replace("/blog-tag")

    yield put(putBlogTagSuccess())
  } catch (error) {
    yield put(putBlogTagFail("Internal Error!"))
  }
}

function* onDeleteBlogTag({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteBlogTag, data)

    if (response.status == "failure") {
      return yield put(deleteBlogTagFail(response.message))
    }

    yield put(deleteBlogTagSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteBlogTagFail("Internal Error!"))
  }
}

function* onPutBlogtagStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putBlogTagsStatus, data)

    if (response.status == "failure") {
      return yield put(putBlogTagsStatusSuccess(response.message))
    }

    yield put(putBlogTagsStatusFail())
    callback && callback()
  } catch (error) {
    yield put(putBlogTagsStatusFail("Internal Error!"))
  }
}

function* BlogTagSaga() {
  yield takeEvery(GET_BLOG_TAGS, fetchBlogTags)
  yield takeEvery(ADD_BLOG_TAG, onAddNewBlogTag)
  yield takeEvery(GET_BLOG_TAG, fetchBlogTag)
  yield takeEvery(PUT_BLOG_TAG, onPutBlogTag)
  yield takeEvery(DELETE_BLOG_TAG, onDeleteBlogTag)
  yield takeEvery(PUT_BLOG_TAGS_STATUS, onPutBlogtagStatus)
}

export default BlogTagSaga
