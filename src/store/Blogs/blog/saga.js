import { call, put, takeEvery } from "redux-saga/effects"

// SubAdmin Redux States
import {
  GET_BLOGS,
  ADD_BLOG,
  GET_BLOG,
  PUT_BLOG,
  DELETE_BLOG,
  PUT_BLOGS_STATUS,
} from "./actionTypes"
import {
  getblogsFail,
  getblogsSuccess,
  addblogFail,
  addblogSuccess,
  getblogFail,
  getblogSuccess,
  putBlogFail,
  putBlogSuccess,
  deleteBlogFail,
  deleteBlogSuccess,
  putBlogsStatusSuccess,
  putBlogsStatusFail,
} from "./actions"

import {
  blogs,
  postblog,
  getBlog,
  putBlog,
  deleteBlog,
  putBlogsStatus,
} from "helpers/backend_helper"

function* fetchBlogs({ payload }) {
  try {
    const response = yield call(blogs, payload)

    if (response.status == "failure") {
      return yield put(getblogsFail(response.message))
    }

    yield put(getblogsSuccess(response))
  } catch (error) {
    yield put(getblogsFail(error))
  }
}

function* onAddNewBlog({ payload: { tag, history } }) {
  try {
    const response = yield call(postblog, tag)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addblogFail(response.message))
    }

    history && history.replace("/blog")

    yield put(addblogSuccess())
  } catch (error) {
    yield put(addblogFail("Internal Error!"))
  }
}

function* fetchBlog({ payload }) {
  try {
    const response = yield call(getBlog, payload)

    if (response.status == "failure") {
      return yield put(getblogFail(response.message))
    }

    yield put(getblogSuccess(response.data))
  } catch (error) {
    yield put(getblogFail(error))
  }
}

function* onPutBlog({ payload: { data, history } }) {
  try {
    const response = yield call(putBlog, data)

    if (response.status == "failure") {
      return yield put(putBlogFail(response.message))
    }

    history && history.replace("/blog")

    yield put(putBlogSuccess())
  } catch (error) {
    yield put(putBlogFail("Internal Error!"))
  }
}

function* onDeleteBlog({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteBlog, data)

    if (response.status == "failure") {
      return yield put(deleteBlogFail(response.message))
    }

    yield put(deleteBlogSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteBlogFail("Internal Error!"))
  }
}

function* onPutBlogStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putBlogsStatus, data)

    if (response.status == "failure") {
      return yield put(putBlogsStatusSuccess(response.message))
    }

    yield put(putBlogsStatusFail())
    callback && callback()
  } catch (error) {
    yield put(putBlogsStatusFail("Internal Error!"))
  }
}

function* BlogSaga() {
  yield takeEvery(GET_BLOGS, fetchBlogs)
  yield takeEvery(ADD_BLOG, onAddNewBlog)
  yield takeEvery(GET_BLOG, fetchBlog)
  yield takeEvery(PUT_BLOG, onPutBlog)
  yield takeEvery(DELETE_BLOG, onDeleteBlog)
  yield takeEvery(PUT_BLOGS_STATUS, onPutBlogStatus)
}

export default BlogSaga
