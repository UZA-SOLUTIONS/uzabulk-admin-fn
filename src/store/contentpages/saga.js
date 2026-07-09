import { call, put, takeEvery } from "redux-saga/effects"
import toastr from "toastr"

// Promo Code Redux States
import {
  GET_CONTENT_PAGES,
  ADD_CONTENT_PAGE,
  GET_CONTENT_PAGE,
  PUT_CONTENT_PAGE,
  DELETE_CONTENT_PAGE,
  PUT_CONTENT_PAGES_STATUS,
} from "./actionTypes"
import {
  getContentPagesFail,
  getContentPagesSuccess,
  addContentPageFail,
  addContentPageSuccess,
  getContentPageFail,
  getContentPageSuccess,
  putContentPageFail,
  putContentPageSuccess,
  deleteContentPageFail,
  deleteContentPageSuccess,
  putContentPagesStatusFail,
  putContentPagesStatusSuccess,
} from "./actions"

import {
  getContentPages,
  postContentPage,
  getContentPage,
  putContentPage,
  deleteContentPage,
  putContentPagesStatus,
} from "helpers/backend_helper"

/* 
****************
Fields
****************
*/
import {
  ADD_CONTENT_PAGE_FIELD,
  GET_CONTENT_PAGE_FIELD,
  PUT_CONTENT_PAGE_FIELD,
  DELETE_CONTENT_PAGE_FIELD,
  PUT_CONTENT_PAGE_FIELD_SORT,
} from "./actionTypes"
import {
  getContentPage as getContentPageAction,
  addContentPageFieldFail,
  addContentPageFieldSuccess,
  getContentPageFieldFail,
  getContentPageFieldSuccess,
  putContentPageFieldFail,
  putContentPageFieldSuccess,
  deleteContentPageFieldFail,
  deleteContentPageFieldSuccess,
  putContentPageFieldSortFail,
  putContentPageFieldSortSuccess,
} from "./actions"
import {
  postContentPageField,
  getContentPageField,
  putContentPageField,
  deleteContentPageField,
  putContentPageFieldSort,
} from "helpers/backend_helper"

function* fetchContentPages({ payload }) {
  try {
    const response = yield call(getContentPages, payload)

    if (response.status == "failure") {
      return yield put(getContentPagesFail(response.message))
    }

    yield put(getContentPagesSuccess(response))
  } catch (error) {
    yield put(getContentPagesFail(error))
  }
}

function* onAddNewContentPage({ payload: { contentPage, history } }) {
  try {
    const response = yield call(postContentPage, contentPage)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addContentPageFail(response.message))
    }

    history && history.replace("/promo-codes")

    yield put(addContentPageSuccess())
  } catch (error) {
    yield put(addContentPageFail("Internal Error!"))
  }
}

function* fetchContentPage({ payload }) {
  try {
    const response = yield call(getContentPage, payload)

    if (response.status == "failure") {
      return yield put(getContentPageFail(response.message))
    }

    yield put(getContentPageSuccess(response.data))
  } catch (error) {
    yield put(getContentPageFail(error))
  }
}

function* onPutContentPage({ payload: { data, history } }) {
  try {
    const response = yield call(putContentPage, data)
    console.log(response,"RESPONSE");

    if (response.status == "failure") {
      return yield put(putContentPageFail(response.message))
    }

    if (!data.isFields) {
      history && history.replace("/content-pages")
    } else {
      history &&
        history.replace(
          history.location.pathname + "?content_name=" + response.data?.label
        )
    }
    toastr.success(response.message)
    yield put(putContentPageSuccess(response.data))
  } catch (error) {
    yield put(putContentPageFail("Internal Error!"))
  }
}

function* onDeleteContentPage({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteContentPage, data)

    if (response.status == "failure") {
      return yield put(deleteContentPageFail(response.message))
    }

    yield put(deleteContentPageSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteContentPageFail("Internal Error!"))
  }
}

function* onPutContentPagesStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putContentPagesStatus, data)
    if (response.status == "failure") {
      return yield put(putContentPagesStatusFail(response.message))
    }
    toastr.success(response.message)
    yield put(putContentPagesStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putContentPagesStatusFail("Internal Error!"))
  }
}

/* 
****************
Fields
****************
*/
function* onAddNewContentPageField({ payload: { contentPageField, history } }) {
  try {
    const response = yield call(postContentPageField, contentPageField)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addContentPageFieldFail(response.message))
    }

    history && history.goBack()

    yield put(addContentPageFieldSuccess())
  } catch (error) {
    yield put(addContentPageFieldFail("Internal Error!"))
  }
}

function* fetchContentPageField({ payload }) {
  try {
    const response = yield call(getContentPageField, payload)

    if (response.status == "failure") {
      return yield put(getContentPageFieldFail(response.message))
    }

    yield put(getContentPageFieldSuccess(response.data))
  } catch (error) {
    yield put(getContentPageFieldFail(error))
  }
}

function* onPutContentPageField({ payload: { data, history } }) {
  try {
    const response = yield call(putContentPageField, data)

    if (response.status == "failure") {
      return yield put(putContentPageFieldFail(response.message))
    }

    history && history.goBack()

    yield put(putContentPageFieldSuccess())
  } catch (error) {
    yield put(putContentPageFailField("Internal Error!"))
  }
}

function* onDeleteContentPageField({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteContentPageField, data)

    if (response.status == "failure") {
      return yield put(deleteContentPageFieldFail(response.message))
    }

    yield put(deleteContentPageFieldSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteContentPageFieldFail("Internal Error!"))
  }
}

function* onPutContentPageSort({ payload: { data, id } }) {
  try {
    const response = yield call(putContentPageFieldSort, data)

    if (response.status == "failure") {
      return yield put(putContentPageFieldSortFail(response.message))
    }

    yield put(getContentPageAction(id))
    yield put(putContentPageFieldSortSuccess())
  } catch (error) {
    console.log("erro ", error)
    yield put(putContentPageFieldSortFail("Internal Error!"))
  }
}

/* Main Function */
function* ContentPagesSaga() {
  yield takeEvery(GET_CONTENT_PAGES, fetchContentPages)
  yield takeEvery(ADD_CONTENT_PAGE, onAddNewContentPage)
  yield takeEvery(GET_CONTENT_PAGE, fetchContentPage)
  yield takeEvery(PUT_CONTENT_PAGE, onPutContentPage)
  yield takeEvery(DELETE_CONTENT_PAGE, onDeleteContentPage)
  yield takeEvery(PUT_CONTENT_PAGES_STATUS, onPutContentPagesStatus)

  /* 
  ****************
  Fields
  ****************
  */
  yield takeEvery(ADD_CONTENT_PAGE_FIELD, onAddNewContentPageField)
  yield takeEvery(GET_CONTENT_PAGE_FIELD, fetchContentPageField)
  yield takeEvery(PUT_CONTENT_PAGE_FIELD, onPutContentPageField)
  yield takeEvery(DELETE_CONTENT_PAGE_FIELD, onDeleteContentPageField)
  yield takeEvery(PUT_CONTENT_PAGE_FIELD_SORT, onPutContentPageSort)
}

export default ContentPagesSaga
