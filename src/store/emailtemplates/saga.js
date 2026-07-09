import { call, put, takeEvery } from "redux-saga/effects"

// Promo Code Redux States
import {
  GET_EMAIL_TEMPLATES,
  GET_EMAIL_TEMPLATE,
  PUT_EMAIL_TEMPLATE,
  POST_RESET_EMAIL_TEMPLATE,
} from "./actionTypes"
import {
  getEmailTemplatesFail,
  getEmailTemplatesSuccess,
  getEmailTemplateFail,
  getEmailTemplateSuccess,
  putEmailTemplateFail,
  putEmailTemplateSuccess,
  postResetEmailTemplateFail,
  postResetEmailTemplateSuccess,
} from "./actions"

import {
  getEmailTemplates,
  getEmailTemplate,
  putEmailTemplate,
  postResetEmailTemplate,
} from "helpers/backend_helper"

function* fetchEmailTemplates({ payload }) {
  try {
    const response = yield call(getEmailTemplates, payload)

    if (response.status == "failure") {
      return yield put(getEmailTemplatesFail(response.message))
    }

    yield put(getEmailTemplatesSuccess(response))
  } catch (error) {
    yield put(getEmailTemplatesFail(error))
  }
}

function* fetchEmailTemplate({ payload }) {
  try {
    const response = yield call(getEmailTemplate, payload)

    if (response.status == "failure") {
      return yield put(getEmailTemplateFail(response.message))
    }

    yield put(getEmailTemplateSuccess(response.data))
  } catch (error) {
    yield put(getEmailTemplateFail(error))
  }
}

function* onPutEmailTemplate({ payload: { data, history } }) {
  try {
    const response = yield call(putEmailTemplate, data)

    if (response.status == "failure") {
      return yield put(putEmailTemplateFail(response.message))
    }

    history && history.goBack()

    yield put(putEmailTemplateSuccess())
  } catch (error) {
    yield put(putEmailTemplateFail("Internal Error!"))
  }
}

function* postRestEmailTemplate({ payload }) {
  try {
    const response = yield call(postResetEmailTemplate, payload)

    if (response.status == "failure") {
      return yield put(postResetEmailTemplateFail(response.message))
    }

    yield put(postResetEmailTemplateSuccess(response.data))
  } catch (error) {
    yield put(postResetEmailTemplateFail(error))
  }
}

function* EmailTemplatesSaga() {
  yield takeEvery(GET_EMAIL_TEMPLATES, fetchEmailTemplates)
  yield takeEvery(GET_EMAIL_TEMPLATE, fetchEmailTemplate)
  yield takeEvery(PUT_EMAIL_TEMPLATE, onPutEmailTemplate)
  yield takeEvery(POST_RESET_EMAIL_TEMPLATE, postRestEmailTemplate)
}

export default EmailTemplatesSaga
