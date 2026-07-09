import {
  EMAIL_TEMPLATE_API_FAIL,
  GET_EMAIL_TEMPLATES,
  GET_EMAIL_TEMPLATES_FAIL,
  GET_EMAIL_TEMPLATES_SUCCESS,
  GET_EMAIL_TEMPLATE,
  GET_EMAIL_TEMPLATE_FAIL,
  GET_EMAIL_TEMPLATE_SUCCESS,
  PUT_EMAIL_TEMPLATE,
  PUT_EMAIL_TEMPLATE_FAIL,
  PUT_EMAIL_TEMPLATE_SUCCESS,
  POST_RESET_EMAIL_TEMPLATE,
  POST_RESET_EMAIL_TEMPLATE_FAIL,
  POST_RESET_EMAIL_TEMPLATE_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: EMAIL_TEMPLATE_API_FAIL,
  payload: error,
})

/* Get EMAIL_TEMPLATEs */
export const getEmailTemplates = data => ({
  type: GET_EMAIL_TEMPLATES,
  payload: data,
})

export const getEmailTemplatesSuccess = emailTemplates => ({
  type: GET_EMAIL_TEMPLATES_SUCCESS,
  payload: emailTemplates,
})

export const getEmailTemplatesFail = error => ({
  type: GET_EMAIL_TEMPLATES_FAIL,
  payload: error,
})
/* Get EmailTemplates END */

/* Get EmailTemplate */
export const getEmailTemplate = id => ({
  type: GET_EMAIL_TEMPLATE,
  payload: id,
})

export const getEmailTemplateFail = error => ({
  type: GET_EMAIL_TEMPLATE_FAIL,
  payload: error,
})

export const getEmailTemplateSuccess = emailTemplate => ({
  type: GET_EMAIL_TEMPLATE_SUCCESS,
  payload: emailTemplate,
})
/* Get EmailTemplate END */

/* Update EmailTemplate */
export const putEmailTemplate = (data, history) => ({
  type: PUT_EMAIL_TEMPLATE,
  payload: { data, history },
})

export const putEmailTemplateFail = error => ({
  type: PUT_EMAIL_TEMPLATE_FAIL,
  payload: error,
})

export const putEmailTemplateSuccess = () => ({
  type: PUT_EMAIL_TEMPLATE_SUCCESS,
})
/* Update EmailTemplate END */

/* Reset EmailTemplate */
export const postResetEmailTemplate = data => ({
  type: POST_RESET_EMAIL_TEMPLATE,
  payload: data,
})

export const postResetEmailTemplateFail = error => ({
  type: POST_RESET_EMAIL_TEMPLATE_FAIL,
  payload: error,
})

export const postResetEmailTemplateSuccess = emailTemplate => ({
  type: POST_RESET_EMAIL_TEMPLATE_SUCCESS,
  payload: emailTemplate,
})
/* Reset EmailTemplate END */
