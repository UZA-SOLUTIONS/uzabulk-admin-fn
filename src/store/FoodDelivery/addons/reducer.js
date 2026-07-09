import {
  FD_ADDON_API_FAIL,
  GET_FD_ADDONS,
  GET_FD_ADDONS_FAIL,
  GET_FD_ADDONS_SUCCESS,
  ADD_FD_ADDON,
  ADD_FD_ADDON_FAIL,
  ADD_FD_ADDON_SUCCESS,
  GET_FD_ADDON,
  GET_FD_ADDON_FAIL,
  GET_FD_ADDON_SUCCESS,
  PUT_FD_ADDON,
  PUT_FD_ADDON_FAIL,
  PUT_FD_ADDON_SUCCESS,
  DELETE_FD_ADDON,
  DELETE_FD_ADDON_FAIL,
  DELETE_FD_ADDON_SUCCESS,
  PUT_FD_ADDONS_STATUS,
  PUT_FD_ADDONS_STATUS_FAIL,
  PUT_FD_ADDONS_STATUS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  fdAddons: [],
  totalFdAddons: 0,
  error: "",
  loading: false,
  fdAddon: {},
}

const FdAddons = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Food Delivery Addons */
    case GET_FD_ADDONS:
      return {
        ...state,
        loading: true,
      }

    case GET_FD_ADDONS_SUCCESS:
      return {
        ...state,
        fdAddons: action.payload.data || [],
        totalFdAddons: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_FD_ADDONS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Food Delivery Addons END */

    /* Add Food Delivery Addons */
    case ADD_FD_ADDON:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_FD_ADDON_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_FD_ADDON_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Food Delivery Addons END */

    /* Get Food Delivery Addons */
    case GET_FD_ADDON:
      return {
        ...state,
        error: "",
        loading: true,
        fdAddon: {},
      }

    case GET_FD_ADDON_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fdAddon: {},
      }

    case GET_FD_ADDON_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdAddon: action.payload,
      }
    /* Add Food Delivery Addons END */

    /* Update Food Delivery Addons */
    case PUT_FD_ADDON:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_ADDON_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_ADDON_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Addons END */

    /* Delete Food Delivery Addons */
    case DELETE_FD_ADDON:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_FD_ADDON_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_FD_ADDON_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Food Delivery Addons END */

    /* Update Food Delivery Addons Status */
    case PUT_FD_ADDONS_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_ADDONS_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_ADDONS_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Addons Status END */

    case FD_ADDON_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default FdAddons
