import {
  GEO_FENCING_API_FAIL,
  GET_GEO_FENCINGS,
  GET_GEO_FENCINGS_FAIL,
  GET_GEO_FENCINGS_SUCCESS,
  ADD_GEO_FENCING,
  ADD_GEO_FENCING_FAIL,
  ADD_GEO_FENCING_SUCCESS,
  GET_GEO_FENCING,
  GET_GEO_FENCING_FAIL,
  GET_GEO_FENCING_SUCCESS,
  PUT_GEO_FENCING,
  PUT_GEO_FENCING_FAIL,
  PUT_GEO_FENCING_SUCCESS,
  DELETE_GEO_FENCING,
  DELETE_GEO_FENCING_FAIL,
  DELETE_GEO_FENCING_SUCCESS,
  PUT_GEO_FENCINGS_STATUS,
  PUT_GEO_FENCINGS_STATUS_FAIL,
  PUT_GEO_FENCINGS_STATUS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  geoFencings: [],
  totalGeoFencings: 0,
  error: "",
  loading: false,
  geoFencing: {},
}

const GeoFencings = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get GeoFencings */
    case GET_GEO_FENCINGS:
      return {
        ...state,
        loading: true,
      }

    case GET_GEO_FENCINGS_SUCCESS:
      return {
        ...state,
        geoFencings: action.payload.data || [],
        totalGeoFencings: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_GEO_FENCINGS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get GeoFencings END */

    /* Add GeoFencings */
    case ADD_GEO_FENCING:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_GEO_FENCING_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_GEO_FENCING_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add GeoFencings END */

    /* Get GeoFencings */
    case GET_GEO_FENCING:
      return {
        ...state,
        error: "",
        loading: true,
        geoFencing: {},
      }

    case GET_GEO_FENCING_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        geoFencing: {},
      }

    case GET_GEO_FENCING_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        geoFencing: action.payload,
      }
    /* Add GeoFencings END */

    /* Update GeoFencings */
    case PUT_GEO_FENCING:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_GEO_FENCING_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_GEO_FENCING_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update GeoFencings END */

    /* Delete GeoFencings */
    case DELETE_GEO_FENCING:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_GEO_FENCING_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_GEO_FENCING_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete GeoFencings END */

    /* Update GeoFencings Status */
    case PUT_GEO_FENCINGS_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_GEO_FENCINGS_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_GEO_FENCINGS_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update GeoFencings Status END */

    case GEO_FENCING_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default GeoFencings
