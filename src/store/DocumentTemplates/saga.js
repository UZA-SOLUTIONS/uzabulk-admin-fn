import { call, put, takeEvery } from "redux-saga/effects"

// DocTemplate Redux States
import {
  GET_DOCUMENT_TEMPLATES,
  ADD_DOCUMENT_TEMPLATE,
  GET_DOCUMENT_TEMPLATE,
  PUT_DOCUMENT_TEMPLATE,
  DELETE_DOCUMENT_TEMPLATE,
  PUT_DOCUMENT_TEMPLATES_STATUS,
  GET_EDIT_DOCUMENT_TEMPLATE_FIELD,
} from "./actionTypes"
import {
  getDocTemplate as getDocTemplateAction,
  getDocTemplatesFail,
  getDocTemplatesSuccess,
  addDocTemplateFail,
  addDocTemplateSuccess,
  getDocTemplateFail,
  getDocTemplateSuccess,
  putDocTemplateFail,
  putDocTemplateSuccess,
  deleteDocTemplateFail,
  deleteDocTemplateSuccess,
  putDocTemplatesStatusFail,
  putDocTemplatesStatusSuccess,
  getEditDocTemplateFieldFail,
  getEditDocTemplateFieldSuccess,
  getEditDocTemplateField,
} from "./actions"

import {
  getDocTemplates,
  postDocTemplate,
  getDocTemplate,
  putDocTemplate,
  deleteDocTemplate,
  putDocTemplatesStatus,
} from "helpers/backend_helper"

/* 
****************
Fields
****************
*/
import {
  ADD_DOCUMENT_TEMPLATE_FIELD,
  GET_DOCUMENT_TEMPLATE_FIELD,
  PUT_DOCUMENT_TEMPLATE_FIELD,
  DELETE_DOCUMENT_TEMPLATE_FIELD,
  PUT_DOCUMENT_TEMPLATE_FIELD_SORT,
} from "./actionTypes"
import {
  addDocTemplateFieldFail,
  addDocTemplateFieldSuccess,
  getDocTemplateFieldFail,
  getDocTemplateFieldSuccess,
  putDocTemplateFieldFail,
  putDocTemplateFieldSuccess,
  deleteDocTemplateFieldFail,
  deleteDocTemplateFieldSuccess,
  putDocTemplateFieldSortFail,
  putDocTemplateFieldSortSuccess,
} from "./actions"
import {
  postDocTemplateField,
  getDocTemplateField,
  putDocTemplateField,
  deleteDocTemplateField,
  putDocTemplateFieldSort,
} from "helpers/backend_helper"

function* fetchDocTemplates({ payload }) {
  try {
    const response = yield call(getDocTemplates, payload)

    if (response.status == "failure") {
      return yield put(getDocTemplatesFail(response.message))
    }

    yield put(getDocTemplatesSuccess(response))
  } catch (error) {
    yield put(getDocTemplatesFail(error))
  }
}

function* onAddNewDocTemplate({ payload: { documentTemplate, history } }) {
  try {
    const response = yield call(postDocTemplate, documentTemplate)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addDocTemplateFail(response.message))
    }

    history && history.goBack()

    yield put(addDocTemplateSuccess())
  } catch (error) {
    yield put(addDocTemplateFail("Internal Error!"))
  }
}

function* fetchDocTemplate({ payload }) {
  try {
    const response = yield call(getDocTemplate, payload)

    if (response.status == "failure") {
      return yield put(getDocTemplateFail(response.message))
    }

    yield put(getDocTemplateSuccess(response.data))
  } catch (error) {
    yield put(getDocTemplateFail(error))
  }
}

function* onPutDocTemplate({ payload: { data, history } }) {
  try {
    const response = yield call(putDocTemplate, data)

    if (response.status == "failure") {
      return yield put(putDocTemplateFail(response.message))
    }

    history && history.goBack()

    yield put(putDocTemplateSuccess())
  } catch (error) {
    yield put(putDocTemplateFail("Internal Error!"))
  }
}

function* onDeleteDocTemplate({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteDocTemplate, data)

    if (response.status == "failure") {
      return yield put(deleteDocTemplateFail(response.message))
    }

    yield put(deleteDocTemplateSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteDocTemplateFail("Internal Error!"))
  }
}

function* onPutDocTemplatesStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putDocTemplatesStatus, data)

    if (response.status == "failure") {
      return yield put(putDocTemplatesStatusFail(response.message))
    }

    yield put(putDocTemplatesStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putDocTemplatesStatusFail("Internal Error!"))
  }
}

/* 
****************
Fields
****************
*/
function* onAddNewDocTemplateField({
  payload: { documentTemplateField, history },
}) {
  try {
    const response = yield call(postDocTemplateField, documentTemplateField)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addDocTemplateFieldFail(response.message))
    }

    history && history.goBack()

    yield put(addDocTemplateFieldSuccess())
  } catch (error) {
    yield put(addDocTemplateFieldFail("Internal Error!"))
  }
}

function* fetchDocTemplateField({ payload }) {
  try {
    const response = yield call(getDocTemplateField, payload)

    if (response.status == "failure") {
      return yield put(getDocTemplateFieldFail(response.message))
    }

    yield put(getDocTemplateFieldSuccess(response.data))
  } catch (error) {
    yield put(getDocTemplateFieldFail(error))
  }
}

function* onPutDocTemplateField({ payload: { data, history } }) {
  try {
    const response = yield call(putDocTemplateField, data)

    if (response.status == "failure") {
      return yield put(putDocTemplateFieldFail(response.message))
    }

    history && history.goBack()

    yield put(putDocTemplateFieldSuccess())
  } catch (error) {
    yield put(putDocTemplateFailField("Internal Error!"))
  }
}

function* onDeleteDocTemplateField({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteDocTemplateField, data)

    if (response.status == "failure") {
      return yield put(deleteDocTemplateFieldFail(response.message))
    }

    yield put(deleteDocTemplateFieldSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteDocTemplateFieldFail("Internal Error!"))
  }
}

function* onPutDocTemplateSort({ payload: { data, id } }) {
  try {
    const response = yield call(putDocTemplateFieldSort, data)

    if (response.status == "failure") {
      return yield put(putDocTemplateFieldSortFail(response.message))
    }

    yield put(getDocTemplateAction(id))
    yield put(putDocTemplateFieldSortSuccess())
  } catch (error) {
    yield put(putDocTemplateFieldSortFail("Internal Error!"))
  }
}

// function* fetchEditDocTemplateField({ payload }) {
//   try {
//     const response = yield call(getEditDocTemplateField, payload)

//     if (response.status == "failure") {
//       return yield put(getEditDocTemplateFieldFail(response.message))
//     }

//     yield put(getEditDocTemplateFieldSuccess(response.data))
//   } catch (error) {
//     yield put(getEditDocTemplateFieldFail(error))
//   }
// }

/* Main Function */

function* DocTemplatesSaga() {
  yield takeEvery(GET_DOCUMENT_TEMPLATES, fetchDocTemplates)
  yield takeEvery(ADD_DOCUMENT_TEMPLATE, onAddNewDocTemplate)

  yield takeEvery(GET_DOCUMENT_TEMPLATE, fetchDocTemplate)
  yield takeEvery(PUT_DOCUMENT_TEMPLATE, onPutDocTemplate)
  yield takeEvery(DELETE_DOCUMENT_TEMPLATE, onDeleteDocTemplate)

  yield takeEvery(PUT_DOCUMENT_TEMPLATES_STATUS, onPutDocTemplatesStatus)

  /* 
****************
Fields
****************
*/
  yield takeEvery(ADD_DOCUMENT_TEMPLATE_FIELD, onAddNewDocTemplateField)
  yield takeEvery(GET_DOCUMENT_TEMPLATE_FIELD, fetchDocTemplateField),
    // yield takeEvery(GET_EDIT_DOCUMENT_TEMPLATE_FIELD, fetchEditDocTemplateField),
    yield takeEvery(PUT_DOCUMENT_TEMPLATE_FIELD, onPutDocTemplateField)
  yield takeEvery(DELETE_DOCUMENT_TEMPLATE_FIELD, onDeleteDocTemplateField)
  yield takeEvery(PUT_DOCUMENT_TEMPLATE_FIELD_SORT, onPutDocTemplateSort)
}

export default DocTemplatesSaga
