import {
  CAMPAIGN_API_FAIL,
  GET_CAMPAIGNS,
  GET_CAMPAIGNS_FAIL,
  GET_CAMPAIGNS_SUCCESS,
  ADD_CAMPAIGN,
  ADD_CAMPAIGN_FAIL,
  ADD_CAMPAIGN_SUCCESS,
  GET_CAMPAIGN,
  GET_CAMPAIGN_FAIL,
  GET_CAMPAIGN_SUCCESS,
  PUT_CAMPAIGN,
  PUT_CAMPAIGN_FAIL,
  PUT_CAMPAIGN_SUCCESS,
  DELETE_CAMPAIGN,
  DELETE_CAMPAIGN_FAIL,
  DELETE_CAMPAIGN_SUCCESS,
  PUT_CAMPAIGNS_STATUS,
  PUT_CAMPAIGNS_STATUS_FAIL,
  PUT_CAMPAIGNS_STATUS_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: CAMPAIGN_API_FAIL,
  payload: error,
})

/* Get campaigns */
export const getCampaigns = data => ({
  type: GET_CAMPAIGNS,
  payload: data,
})

export const getCampaignsSuccess = campaigns => ({
  type: GET_CAMPAIGNS_SUCCESS,
  payload: campaigns,
})

export const getCampaignsFail = error => ({
  type: GET_CAMPAIGNS_FAIL,
  payload: error,
})
/* Get Campaigns END */

/* Add Campaign */
export const addCampaign = (campaign, history) => ({
  type: ADD_CAMPAIGN,
  payload: { campaign, history },
})

export const addCampaignFail = error => ({
  type: ADD_CAMPAIGN_FAIL,
  payload: error,
})

export const addCampaignSuccess = () => ({
  type: ADD_CAMPAIGN_SUCCESS,
})
/* Add Campaign END */

/* Get Campaign */
export const getCampaign = id => ({
  type: GET_CAMPAIGN,
  payload: id,
})

export const getCampaignFail = error => ({
  type: GET_CAMPAIGN_FAIL,
  payload: error,
})

export const getCampaignSuccess = campaign => ({
  type: GET_CAMPAIGN_SUCCESS,
  payload: campaign,
})
/* Get Campaign END */

/* Update Campaign */
export const putCampaign = (data, history) => ({
  type: PUT_CAMPAIGN,
  payload: { data, history },
})

export const putCampaignFail = error => ({
  type: PUT_CAMPAIGN_FAIL,
  payload: error,
})

export const putCampaignSuccess = () => ({
  type: PUT_CAMPAIGN_SUCCESS,
})
/* Update Campaign END */

/* Delete Campaign */
export const deleteCampaign = (data, callback) => ({
  type: DELETE_CAMPAIGN,
  payload: { data, callback },
})

export const deleteCampaignFail = error => ({
  type: DELETE_CAMPAIGN_FAIL,
  payload: error,
})

export const deleteCampaignSuccess = () => ({
  type: DELETE_CAMPAIGN_SUCCESS,
})
/* Delete Faz END */

/* Update Multi Campaigns Status */
export const putCampaignsStatus = (data, callback) => ({
  type: PUT_CAMPAIGNS_STATUS,
  payload: { data, callback },
})

export const putCampaignsStatusFail = error => ({
  type: PUT_CAMPAIGNS_STATUS_FAIL,
  payload: error,
})

export const putCampaignsStatusSuccess = () => ({
  type: PUT_CAMPAIGNS_STATUS_SUCCESS,
})
/* Update Multi Campaigns Status END */
