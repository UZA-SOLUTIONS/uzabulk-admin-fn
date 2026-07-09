import {
  CAMPAIGN_TEMPLATE_API_FAIL,
  GET_CAMPAIGN_TEMPLATES,
  GET_CAMPAIGN_TEMPLATES_FAIL,
  GET_CAMPAIGN_TEMPLATES_SUCCESS,
  ADD_CAMPAIGN_TEMPLATE,
  ADD_CAMPAIGN_TEMPLATE_FAIL,
  ADD_CAMPAIGN_TEMPLATE_SUCCESS,
  GET_CAMPAIGN_TEMPLATE,
  GET_CAMPAIGN_TEMPLATE_FAIL,
  GET_CAMPAIGN_TEMPLATE_SUCCESS,
  PUT_CAMPAIGN_TEMPLATE,
  PUT_CAMPAIGN_TEMPLATE_FAIL,
  PUT_CAMPAIGN_TEMPLATE_SUCCESS,
  DELETE_CAMPAIGN_TEMPLATE,
  DELETE_CAMPAIGN_TEMPLATE_FAIL,
  DELETE_CAMPAIGN_TEMPLATE_SUCCESS,
  PUT_CAMPAIGN_TEMPLATES_STATUS,
  PUT_CAMPAIGN_TEMPLATES_STATUS_FAIL,
  PUT_CAMPAIGN_TEMPLATES_STATUS_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: CAMPAIGN_TEMPLATE_API_FAIL,
  payload: error,
})

/* Get campaignTemplates */
export const getCampaignTemplates = data => ({
  type: GET_CAMPAIGN_TEMPLATES,
  payload: data,
})

export const getCampaignTemplatesSuccess = campaignTemplates => ({
  type: GET_CAMPAIGN_TEMPLATES_SUCCESS,
  payload: campaignTemplates,
})

export const getCampaignTemplatesFail = error => ({
  type: GET_CAMPAIGN_TEMPLATES_FAIL,
  payload: error,
})
/* Get CampaignTemplate END */

/* Add CampaignTemplate */
export const addCampaignTemplate = (campaignTemplate, history) => ({
  type: ADD_CAMPAIGN_TEMPLATE,
  payload: { campaignTemplate, history },
})

export const addCampaignTemplateFail = error => ({
  type: ADD_CAMPAIGN_TEMPLATE_FAIL,
  payload: error,
})

export const addCampaignTemplateSuccess = () => ({
  type: ADD_CAMPAIGN_TEMPLATE_SUCCESS,
})
/* Add CampaignTemplate END */

/* Get CampaignTemplate */
export const getCampaignTemplate = id => ({
  type: GET_CAMPAIGN_TEMPLATE,
  payload: id,
})

export const getCampaignTemplateFail = error => ({
  type: GET_CAMPAIGN_TEMPLATE_FAIL,
  payload: error,
})

export const getCampaignTemplateSuccess = campaignTemplate => ({
  type: GET_CAMPAIGN_TEMPLATE_SUCCESS,
  payload: campaignTemplate,
})
/* Get CampaignTemplate END */

/* Update CampaignTemplate */
export const putCampaignTemplate = (data, history) => ({
  type: PUT_CAMPAIGN_TEMPLATE,
  payload: { data, history },
})

export const putCampaignTemplateFail = error => ({
  type: PUT_CAMPAIGN_TEMPLATE_FAIL,
  payload: error,
})

export const putCampaignTemplateSuccess = () => ({
  type: PUT_CAMPAIGN_TEMPLATE_SUCCESS,
})
/* Update CampaignTemplate END */

/* Delete CampaignTemplate */
export const deleteCampaignTemplate = (data, callback) => ({
  type: DELETE_CAMPAIGN_TEMPLATE,
  payload: { data, callback },
})

export const deleteCampaignTemplateFail = error => ({
  type: DELETE_CAMPAIGN_TEMPLATE_FAIL,
  payload: error,
})

export const deleteCampaignTemplateSuccess = () => ({
  type: DELETE_CAMPAIGN_TEMPLATE_SUCCESS,
})
/* Delete Faz END */

/* Update Multi CampaignTemplate Status */
export const putCampaignTemplatesStatus = (data, callback) => ({
  type: PUT_CAMPAIGN_TEMPLATES_STATUS,
  payload: { data, callback },
})

export const putCampaignTemplatesStatusFail = error => ({
  type: PUT_CAMPAIGN_TEMPLATES_STATUS_FAIL,
  payload: error,
})

export const putCampaignTemplatesStatusSuccess = () => ({
  type: PUT_CAMPAIGN_TEMPLATES_STATUS_SUCCESS,
})
/* Update Multi CampaignTemplate Status END */
