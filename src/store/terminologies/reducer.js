import {
  TERMINOLOGY_API_FAIL,
  GET_TERMINOLOGIES,
  GET_TERMINOLOGIES_FAIL,
  GET_TERMINOLOGIES_SUCCESS,
  PUT_TERMINOLOGY,
  PUT_TERMINOLOGY_FAIL,
  PUT_TERMINOLOGY_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  terminologies: {},
  totalTerminologies: 0,
  error: "",
  success: "",
  loading: false,
  terminology: {},
}

const Terminologies = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Terminologies */
    case GET_TERMINOLOGIES:
      return {
        ...state,
        loading: true,
      }

    case GET_TERMINOLOGIES_SUCCESS:
      return {
        ...state,
        terminologies: action.payload.data || [],
        totalTerminologies: action.payload.totalcount || 0,
        loading: false,
        error: "",
        success: "",
      }

    case GET_TERMINOLOGIES_FAIL:
      return {
        ...state,
        success: "",
        error: action.payload,
        loading: false,
      }
    /* Get Terminologies END */

    /* Update Terminology */
    case PUT_TERMINOLOGY:
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
      }

    case PUT_TERMINOLOGY_FAIL:
      return {
        ...state,
        error: action.payload,
        success: "",
        loading: false,
      }

    case PUT_TERMINOLOGY_SUCCESS:
      return {
        ...state,
        success: action.payload,
        error: "",
        loading: false,
      }
    /* Update Terminology END */

    case TERMINOLOGY_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Terminologies
