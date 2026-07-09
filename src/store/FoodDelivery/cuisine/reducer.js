import {
  FD_CUISINE_API_FAIL,
  GET_FD_CUISINES,
  GET_FD_CUISINES_FAIL,
  GET_FD_CUISINES_SUCCESS,
  ADD_FD_CUISINE,
  ADD_FD_CUISINE_FAIL,
  ADD_FD_CUISINE_SUCCESS,
  GET_FD_CUISINE,
  GET_FD_CUISINE_FAIL,
  GET_FD_CUISINE_SUCCESS,
  PUT_FD_CUISINE,
  PUT_FD_CUISINE_FAIL,
  PUT_FD_CUISINE_SUCCESS,
  DELETE_FD_CUISINE,
  DELETE_FD_CUISINE_FAIL,
  DELETE_FD_CUISINE_SUCCESS,
  PUT_FD_CUISINES_STATUS,
  PUT_FD_CUISINES_STATUS_FAIL,
  PUT_FD_CUISINES_STATUS_SUCCESS,
  EXPORT_FD_CUISINES,
  EXPORT_FD_CUISINES_SUCCESS,
  EXPORT_FD_CUISINES_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  fdCuisines: [],
  totalFdCuisines: 0,
  error: "",
  loading: false,
  fdCuisine: {},
}

const FdCuisines = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Food Delivery Cuisines */
    case GET_FD_CUISINES:
      return {
        ...state,
        loading: true,
      }

    case GET_FD_CUISINES_SUCCESS:
      return {
        ...state,
        fdCuisines: action.payload.data || [],
        totalFdCuisines: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_FD_CUISINES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Food Delivery Cuisines END */

    /* Add Food Delivery Cuisines */
    case ADD_FD_CUISINE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_FD_CUISINE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_FD_CUISINE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Food Delivery Cuisines END */

    /* Get Food Delivery Cuisines */
    case GET_FD_CUISINE:
      return {
        ...state,
        error: "",
        loading: true,
        fdCuisine: {},
      }

    case GET_FD_CUISINE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fdCuisine: {},
      }

    case GET_FD_CUISINE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdCuisine: action.payload,
      }
    /* Add Food Delivery Cuisines END */

    /* Update Food Delivery Cuisines */
    case PUT_FD_CUISINE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_CUISINE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_CUISINE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Cuisines END */

    /* Delete Food Delivery Cuisines */
    case DELETE_FD_CUISINE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_FD_CUISINE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_FD_CUISINE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Food Delivery Cuisines END */

    /* Update Food Delivery Cuisines Status */
    case PUT_FD_CUISINES_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_CUISINES_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_CUISINES_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Cuisines Status END */

    /* Export FdCuisines */
    case EXPORT_FD_CUISINES:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case EXPORT_FD_CUISINES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case EXPORT_FD_CUISINES_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Export FdCuisines END */

    case FD_CUISINE_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default FdCuisines
