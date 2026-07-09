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

const INIT_STATE = {
  emailTemplates: [],
  totalEmailTemplates: 0,
  error: "",
  loading: false,
  emailTemplate: {},
}

const EmailTemplate = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get EmailTemplates */
    case GET_EMAIL_TEMPLATES:
      return {
        ...state,
        loading: true,
      }

    case GET_EMAIL_TEMPLATES_SUCCESS:
      return {
        ...state,
        emailTemplates: action.payload.data || [],
        totalEmailTemplates: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_EMAIL_TEMPLATES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get EmailTemplates END */

    /* Get Email Template */
    case GET_EMAIL_TEMPLATE:
      return {
        ...state,
        error: "",
        loading: true,
        emailTemplate: {},
      }

    case GET_EMAIL_TEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        emailTemplate: {},
      }

    case GET_EMAIL_TEMPLATE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        emailTemplate: action.payload,
      }
    /* Add Email Template END */

    /* Update Email Template */
    case PUT_EMAIL_TEMPLATE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_EMAIL_TEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_EMAIL_TEMPLATE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Email Template END */

    /* Rest Email Template */
    case POST_RESET_EMAIL_TEMPLATE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case POST_RESET_EMAIL_TEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case POST_RESET_EMAIL_TEMPLATE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        emailTemplate: {
          ...state.emailTemplate,
          ...action.payload,
        },
      }
    /* Rest Email Template END */

    case EMAIL_TEMPLATE_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default EmailTemplate
