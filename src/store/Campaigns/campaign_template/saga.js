import { call, put, takeEvery } from "redux-saga/effects"

// CampaignTemplate Redux States
import {
  GET_CAMPAIGN_TEMPLATES,
  ADD_CAMPAIGN_TEMPLATE,
  GET_CAMPAIGN_TEMPLATE,
  PUT_CAMPAIGN_TEMPLATE,
  DELETE_CAMPAIGN_TEMPLATE,
  PUT_CAMPAIGN_TEMPLATES_STATUS,
} from "./actionTypes"
import {
  getCampaignTemplatesFail,
  getCampaignTemplatesSuccess,
  addCampaignTemplateFail,
  addCampaignTemplateSuccess,
  getCampaignTemplateFail,
  getCampaignTemplateSuccess,
  putCampaignTemplateFail,
  putCampaignTemplateSuccess,
  deleteCampaignTemplateFail,
  deleteCampaignTemplateSuccess,
  putCampaignTemplatesStatusFail,
  putCampaignTemplatesStatusSuccess,
} from "./actions"

import {
  getCampaignTemplates,
  postCampaignTemplate,
  getCampaignTemplate,
  putCampaignTemplate,
  deleteCampaignTemplate,
  putCampaignTemplatesStatus,
} from "helpers/backend_helper"

function* fetchCampaignTemplates({ payload }) {
  try {
    const response = yield call(getCampaignTemplates, payload)

    if (response.status == "failure") {
      return yield put(getCampaignTemplatesFail(response.message))
    }

    yield put(getCampaignTemplatesSuccess(response))
  } catch (error) {
    yield put(getCampaignTemplatesFail(error))
  }
}

function* onAddNewCampaignTemplate({ payload: { campaignTemplate, history } }) {
  try {
    const response = yield call(postCampaignTemplate, campaignTemplate)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addCampaignTemplateFail(response.message))
    }

    history && history.goBack()

    yield put(addCampaignTemplateSuccess())
  } catch (error) {
    yield put(addCampaignTemplateFail("Internal Error!"))
  }
}

function* fetchCampaignTemplate({ payload }) {
  try {
    const response = yield call(getCampaignTemplate, payload)

    if (response.status == "failure") {
      return yield put(getCampaignTemplateFail(response.message))
    }

    yield put(getCampaignTemplateSuccess(response.data))
  } catch (error) {
    yield put(getCampaignTemplateFail(error))
  }
}

function* onPutCampaignTemplate({ payload: { data, history } }) {
  try {
    const response = yield call(putCampaignTemplate, data)

    if (response.status == "failure") {
      return yield put(putCampaignTemplateFail(response.message))
    }

    history && history.goBack()

    yield put(putCampaignTemplateSuccess())
  } catch (error) {
    yield put(putCampaignTemplateFail("Internal Error!"))
  }
}

function* onDeleteCampaignTemplate({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteCampaignTemplate, data)

    if (response.status == "failure") {
      return yield put(deleteCampaignTemplateFail(response.message))
    }

    yield put(deleteCampaignTemplateSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteCampaignTemplateFail("Internal Error!"))
  }
}

function* onPutCampaignTemplatesStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putCampaignTemplatesStatus, data)

    if (response.status == "failure") {
      return yield put(putCampaignTemplatesStatusFail(response.message))
    }

    yield put(putCampaignTemplatesStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putCampaignTemplatesStatusFail("Internal Error!"))
  }
}

function* CampaignTemplateSaga() {
  yield takeEvery(GET_CAMPAIGN_TEMPLATES, fetchCampaignTemplates)
  yield takeEvery(ADD_CAMPAIGN_TEMPLATE, onAddNewCampaignTemplate)
  yield takeEvery(GET_CAMPAIGN_TEMPLATE, fetchCampaignTemplate)
  yield takeEvery(PUT_CAMPAIGN_TEMPLATE, onPutCampaignTemplate)
  yield takeEvery(DELETE_CAMPAIGN_TEMPLATE, onDeleteCampaignTemplate)
  yield takeEvery(PUT_CAMPAIGN_TEMPLATES_STATUS, onPutCampaignTemplatesStatus)
}

export default CampaignTemplateSaga
