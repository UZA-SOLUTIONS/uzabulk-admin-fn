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

const INIT_STATE = {
  campaignTemplates: [],
  totalCampaignTemplate: 0,
  error: "",
  loading: false,
  campaignTemplate: {},
}

const CampaignTemplate = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get CampaignTemplate */
    case GET_CAMPAIGN_TEMPLATES:
      return {
        ...state,
        loading: true,
      }

    case GET_CAMPAIGN_TEMPLATES_SUCCESS:
      return {
        ...state,
        campaignTemplates: action.payload.data || [],
        totalCampaignTemplate: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_CAMPAIGN_TEMPLATES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get CampaignTemplate END */

    /* Add CampaignTemplate */
    case ADD_CAMPAIGN_TEMPLATE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_CAMPAIGN_TEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_CAMPAIGN_TEMPLATE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add CampaignTemplate END */

    /* Get CampaignTemplate */
    case GET_CAMPAIGN_TEMPLATE:
      return {
        ...state,
        error: "",
        loading: true,
        campaignTemplate: {},
      }

    case GET_CAMPAIGN_TEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        campaignTemplate: {},
      }

    case GET_CAMPAIGN_TEMPLATE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        campaignTemplate: action.payload,
      }
    /* Add CampaignTemplate END */

    /* Update CampaignTemplate */
    case PUT_CAMPAIGN_TEMPLATE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_CAMPAIGN_TEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_CAMPAIGN_TEMPLATE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update CampaignTemplate END */

    /* Delete CampaignTemplate */
    case DELETE_CAMPAIGN_TEMPLATE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_CAMPAIGN_TEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_CAMPAIGN_TEMPLATE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete CampaignTemplate END */

    /* Update CampaignTemplate Status */
    case PUT_CAMPAIGN_TEMPLATES_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_CAMPAIGN_TEMPLATES_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_CAMPAIGN_TEMPLATES_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update CampaignTemplate Status END */

    case CAMPAIGN_TEMPLATE_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default CampaignTemplate
