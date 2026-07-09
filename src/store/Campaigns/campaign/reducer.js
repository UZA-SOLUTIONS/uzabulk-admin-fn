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

const INIT_STATE = {
  campaigns: [],
  totalCampaigns: 0,
  error: "",
  loading: false,
  campaign: {},
}

const Campaigns = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Campaigns */
    case GET_CAMPAIGNS:
      return {
        ...state,
        loading: true,
      }

    case GET_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        campaigns: action.payload.data || [],
        totalCampaigns: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_CAMPAIGNS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Campaigns END */

    /* Add Campaign */
    case ADD_CAMPAIGN:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_CAMPAIGN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_CAMPAIGN_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Campaign END */

    /* Get Campaign */
    case GET_CAMPAIGN:
      return {
        ...state,
        error: "",
        loading: true,
        campaign: {},
      }

    case GET_CAMPAIGN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        campaign: {},
      }

    case GET_CAMPAIGN_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        campaign: action.payload,
      }
    /* Add Campaign END */

    /* Update Campaign */
    case PUT_CAMPAIGN:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_CAMPAIGN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_CAMPAIGN_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Campaign END */

    /* Delete Campaign */
    case DELETE_CAMPAIGN:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_CAMPAIGN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Campaign END */

    /* Update Campaigns Status */
    case PUT_CAMPAIGNS_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_CAMPAIGNS_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_CAMPAIGNS_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Campaigns Status END */

    case CAMPAIGN_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Campaigns
