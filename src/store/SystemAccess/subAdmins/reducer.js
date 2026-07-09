import {
  SUB_ADMIN_API_FAIL,
  GET_SUB_ADMINS,
  GET_SUB_ADMINS_FAIL,
  GET_SUB_ADMINS_SUCCESS,
  ADD_SUB_ADMIN,
  ADD_SUB_ADMIN_FAIL,
  ADD_SUB_ADMIN_SUCCESS,
  GET_SUB_ADMIN,
  GET_SUB_ADMIN_FAIL,
  GET_SUB_ADMIN_SUCCESS,
  PUT_SUB_ADMIN,
  PUT_SUB_ADMIN_FAIL,
  PUT_SUB_ADMIN_SUCCESS,
  DELETE_SUB_ADMIN,
  DELETE_SUB_ADMIN_FAIL,
  DELETE_SUB_ADMIN_SUCCESS,
  PUT_SUB_ADMINS_STATUS,
  PUT_SUB_ADMINS_STATUS_FAIL,
  PUT_SUB_ADMINS_STATUS_SUCCESS,
  GET_DRIVER_DISPATCHER_LIST_SUCCESS,
  GET_CUSTOMER_DISPATCHER_LIST_SUCCESS,
  GET_VENDOR_LIST_SUBADMIN_SUCCESS,
  GET_VENDOR_LIST_SUBADMIN,
} from "./actionTypes"

const INIT_STATE = {
  subAdmins: [],
  totalSubAdmins: 0,
  error: "",
  loading: false,
  subAdmin: {},
  driverList: []
}

const SubAdmins = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get SubAdmins */
    case GET_SUB_ADMINS:
      return {
        ...state,
        loading: true,
      }

    case GET_SUB_ADMINS_SUCCESS:
      return {
        ...state,
        subAdmins: action.payload.data || [],
        totalSubAdmins: action.payload.totalcount || 0,
        loading: false,
      }

    case GET_SUB_ADMINS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get SubAdmins END */

    /* Add SubAdmin */
    case ADD_SUB_ADMIN:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_SUB_ADMIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_SUB_ADMIN_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add SubAdmin END */

    /* Get SubAdmin */
    case GET_SUB_ADMIN:
      return {
        ...state,
        error: "",
        loading: true,
        subAdmin: {},
      }

    case GET_SUB_ADMIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        subAdmin: {},
      }

    case GET_SUB_ADMIN_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        subAdmin: action.payload,
      }
    /* Add SubAdmin END */

    /* Update SubAdmin */
    case PUT_SUB_ADMIN:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_SUB_ADMIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_SUB_ADMIN_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update SubAdmin END */

    /* Delete SubAdmin */
    case DELETE_SUB_ADMIN:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_SUB_ADMIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_SUB_ADMIN_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete SubAdmin END */

    /* Update SubAdmins Status */
    case PUT_SUB_ADMINS_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_SUB_ADMINS_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_SUB_ADMINS_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }

    case GET_DRIVER_DISPATCHER_LIST_SUCCESS:
      return {
        ...state,
        driverList: action.payload
      }
    case GET_CUSTOMER_DISPATCHER_LIST_SUCCESS:
      return {
        ...state,
        customerList: action.payload
      }
    /* Update SubAdmins Status END */

    case GET_VENDOR_LIST_SUBADMIN:
      return {
        ...state,
        loading: true
      }

    case GET_VENDOR_LIST_SUBADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        vendorList: action.payload
      }

    case SUB_ADMIN_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }



    default:
      return state
  }
}

export default SubAdmins
