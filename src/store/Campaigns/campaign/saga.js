import { call, put, takeEvery } from "redux-saga/effects"

// Campaign Redux States
import {
  GET_CAMPAIGNS,
  ADD_CAMPAIGN,
  GET_CAMPAIGN,
  PUT_CAMPAIGN,
  DELETE_CAMPAIGN,
  PUT_CAMPAIGNS_STATUS,
} from "./actionTypes"
import {
  getCampaignsFail,
  getCampaignsSuccess,
  addCampaignFail,
  addCampaignSuccess,
  getCampaignFail,
  getCampaignSuccess,
  putCampaignFail,
  putCampaignSuccess,
  deleteCampaignFail,
  deleteCampaignSuccess,
  putCampaignsStatusFail,
  putCampaignsStatusSuccess,
} from "./actions"

import {
  getCampaigns,
  postCampaign,
  getCampaign,
  putCampaign,
  deleteCampaign,
  putCampaignsStatus,
} from "helpers/backend_helper"

function* fetchCampaigns({ payload }) {
  try {
    const response = yield call(getCampaigns, payload)

    if (response.status == "failure") {
      return yield put(getCampaignsFail(response.message))
    }

    yield put(getCampaignsSuccess(response))
  } catch (error) {
    yield put(getCampaignsFail(error))
  }
}

function* onAddNewCampaign({ payload: { campaign, history } }) {
  try {
    if (!campaign.template) {
      return yield put(addCampaignFail("template_is_required"))
    }

    const response = yield call(postCampaign, campaign)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addCampaignFail(response.message))
    }

    history && history.goBack()

    yield put(addCampaignSuccess())
  } catch (error) {
    yield put(addCampaignFail("Internal Error!"))
  }
}

function* fetchCampaign({ payload }) {
  try {
    const response = yield call(getCampaign, payload)

    if (response.status == "failure") {
      return yield put(getCampaignFail(response.message))
    }

    yield put(getCampaignSuccess(response.data))
  } catch (error) {
    yield put(getCampaignFail(error))
  }
}

function* onPutCampaign({ payload: { data, history } }) {
  try {
    if (!data.template) {
      return yield put(addCampaignFail("template_is_required"))
    }

    const response = yield call(putCampaign, data)

    if (response.status == "failure") {
      return yield put(putCampaignFail(response.message))
    }

    history && history.goBack()

    yield put(putCampaignSuccess())
  } catch (error) {
    yield put(putCampaignFail("Internal Error!"))
  }
}

function* onDeleteCampaign({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteCampaign, data)

    if (response.status == "failure") {
      return yield put(deleteCampaignFail(response.message))
    }

    yield put(deleteCampaignSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteCampaignFail("Internal Error!"))
  }
}

function* onPutCampaignsStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putCampaignsStatus, data)

    if (response.status == "failure") {
      return yield put(putCampaignsStatusFail(response.message))
    }

    yield put(putCampaignsStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putCampaignsStatusFail("Internal Error!"))
  }
}

function* CampaignsSaga() {
  yield takeEvery(GET_CAMPAIGNS, fetchCampaigns)
  yield takeEvery(ADD_CAMPAIGN, onAddNewCampaign)
  yield takeEvery(GET_CAMPAIGN, fetchCampaign)
  yield takeEvery(PUT_CAMPAIGN, onPutCampaign)
  yield takeEvery(DELETE_CAMPAIGN, onDeleteCampaign)
  yield takeEvery(PUT_CAMPAIGNS_STATUS, onPutCampaignsStatus)
}

export default CampaignsSaga
