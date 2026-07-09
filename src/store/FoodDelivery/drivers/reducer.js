import {
  FD_DRIVER_API_FAIL,
  GET_FD_DRIVERS,
  GET_FD_DRIVERS_FAIL,
  GET_FD_DRIVERS_SUCCESS,
  ADD_FD_DRIVER,
  ADD_FD_DRIVER_FAIL,
  ADD_FD_DRIVER_SUCCESS,
  GET_FD_DRIVER,
  GET_FD_DRIVER_FAIL,
  GET_FD_DRIVER_SUCCESS,
  PUT_FD_DRIVER,
  PUT_FD_DRIVER_FAIL,
  PUT_FD_DRIVER_SUCCESS,
  DELETE_FD_DRIVER,
  DELETE_FD_DRIVER_FAIL,
  DELETE_FD_DRIVER_SUCCESS,
  PUT_FD_DRIVERS_STATUS,
  PUT_FD_DRIVERS_STATUS_FAIL,
  PUT_FD_DRIVERS_STATUS_SUCCESS,
  POST_FD_DRIVER_PAY,
  POST_FD_DRIVER_PAY_SUCCESS,
  POST_FD_DRIVER_PAY_FAIL,
  POST_FD_DRIVER_PAY_ADJUSTMENT,
  POST_FD_DRIVER_PAY_ADJUSTMENT_SUCCESS,
  POST_FD_DRIVER_PAY_ADJUSTMENT_FAIL,
  EXPORT_DRIVERS,
  EXPORT_DRIVERS_SUCCESS,
  EXPORT_DRIVERS_FAIL,
  IMPORT_DRIVERS,
  IMPORT_DRIVERS_SUCCESS,
  IMPORT_DRIVERS_FAIL,
  EDIT_DRIVER_VEHICLE_INFO,
  EDIT_DRIVER_VEHICLE_INFO_SUCCESS,
  EDIT_DRIVER_VEHICLE_INFO_FAIL,
  DRIVER_VEHICLE_LIST,
  DRIVER_VEHICLE_LIST_SUCCESS,
  DRIVER_VEHICLE_LIST_FAIL,
  DRIVER_BANK_INFO,
  DRIVER_BANK_INFO_SUCCESS,
  DRIVER_BANK_INFO_FAIL,
  ADD_DRIVER_SERVICES,
  ADD_DRIVER_SERVICES_SUCCESS,
  ADD_DRIVER_SERVICES_FAIL,
  DELETE_DRIVER_SERVICES,
  DELETE_DRIVER_SERVICES_SUCCESS,
  DELETE_DRIVER_SERVICES_FAIL,
  DELETE_VIRTUAL_ACCOUNT,
  DELETE_VIRTUAL_ACCOUNT_SUCCESS,
  DELETE_VIRTUAL_ACCOUNT_FAIL,
} from "./actionTypes"
/* Document */
import {
  GET_FD_DRIVER_DOCUMENTS,
  GET_FD_DRIVER_DOCUMENTS_FAIL,
  GET_FD_DRIVER_DOCUMENTS_SUCCESS,
  POST_FD_DRIVER_DOCUMENT,
  POST_FD_DRIVER_DOCUMENT_FAIL,
  POST_FD_DRIVER_DOCUMENT_SUCCESS,
  GET_FD_DRIVER_DOCUMENT,
  GET_FD_DRIVER_DOCUMENT_FAIL,
  GET_FD_DRIVER_DOCUMENT_SUCCESS,
  PUT_FD_DRIVER_DOCUMENT,
  PUT_FD_DRIVER_DOCUMENT_FAIL,
  PUT_FD_DRIVER_DOCUMENT_SUCCESS,
  DELETE_FD_DRIVER_DOCUMENT,
  DELETE_FD_DRIVER_DOCUMENT_FAIL,
  DELETE_FD_DRIVER_DOCUMENT_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  fdDrivers: [],
  totalFdDrivers: 0,
  error: "",
  loading: false,
  fdDriver: {},
  fdDocuments: [],
  fdDocument: {},
  importError: "",
  importSuccess: "",
  driverVehicleInfo: {},
  drivervehicleList: [],
}

const FdDrivers = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Food Delivery Drivers */
    case GET_FD_DRIVERS:
      return {
        ...state,
        loading: true,
      }

    case GET_FD_DRIVERS_SUCCESS:
      return {
        ...state,
        fdDrivers: action.payload.data || [],
        totalFdDrivers: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_FD_DRIVERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Food Delivery Drivers END */

    /* Add Food Delivery Drivers */
    case ADD_FD_DRIVER:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_FD_DRIVER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_FD_DRIVER_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Food Delivery Drivers END */

    /* Get Food Delivery Drivers */
    case GET_FD_DRIVER:
      return {
        ...state,
        error: "",
        loading: true,
        fdDriver: {},
      }

    case GET_FD_DRIVER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fdDriver: {},
      }

    case GET_FD_DRIVER_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdDriver: action.payload,
      }
    /* Add Food Delivery Drivers END */

    /* Update Food Delivery Drivers */
    case PUT_FD_DRIVER:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_DRIVER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_DRIVER_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Drivers END */

    /* Delete Food Delivery Drivers */
    case DELETE_FD_DRIVER:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_FD_DRIVER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_FD_DRIVER_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Food Delivery Drivers END */

    /* Update Food Delivery Drivers Status */
    case PUT_FD_DRIVERS_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_DRIVERS_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_DRIVERS_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Drivers Status END */

    /* Post Food Delivery Vendor Pay */
    case POST_FD_DRIVER_PAY:
    case POST_FD_DRIVER_PAY_ADJUSTMENT:
      return {
        ...state,
        loading: true,
      }

    case POST_FD_DRIVER_PAY_SUCCESS:
    case POST_FD_DRIVER_PAY_ADJUSTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case POST_FD_DRIVER_PAY_FAIL:
    case POST_FD_DRIVER_PAY_ADJUSTMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Post Food Delivery Vendor Pay END */

    /* Get Food Delivery Driver Documents */
    case GET_FD_DRIVER_DOCUMENTS:
      return {
        ...state,
        error: "",
        loading: true,
        fdDocuments: [],
      }

    case GET_FD_DRIVER_DOCUMENTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fdDocuments: [],
      }

    case GET_FD_DRIVER_DOCUMENTS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdDocuments: action.payload,
      }
    /* Get Food Delivery Driver Document END */

    /* Add Food Delivery Driver Document */
    case POST_FD_DRIVER_DOCUMENT:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case POST_FD_DRIVER_DOCUMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case POST_FD_DRIVER_DOCUMENT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Food Delivery Driver Document END */

    /* Get Food Delivery Driver Document */
    case GET_FD_DRIVER_DOCUMENT:
      return {
        ...state,
        error: "",
        loading: true,
        fdDocument: {},
      }

    case GET_FD_DRIVER_DOCUMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fdDocument: {},
      }

    case GET_FD_DRIVER_DOCUMENT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdDocument: action.payload,
      }
    /* Add Food Delivery Driver Document END */

    /* Update Food Delivery Driver Document */
    case PUT_FD_DRIVER_DOCUMENT:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_DRIVER_DOCUMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_DRIVER_DOCUMENT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Driver Document END */

    /* Delete Food Delivery Driver Document */
    case DELETE_FD_DRIVER_DOCUMENT:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_FD_DRIVER_DOCUMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_FD_DRIVER_DOCUMENT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Food Delivery Driver Document END */

    /* Export Drivers */
    case EXPORT_DRIVERS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case EXPORT_DRIVERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case EXPORT_DRIVERS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Export Drivers END */

    /* Import Drivers */
    case IMPORT_DRIVERS:
      return {
        ...state,
        importError: "",
        importSuccess: "",
        loading: true,
      }

    case IMPORT_DRIVERS_FAIL:
      return {
        ...state,
        importError: action.payload,
        importSuccess: "",
        loading: false,
      }

    case IMPORT_DRIVERS_SUCCESS:
      return {
        ...state,
        importError: "",
        importSuccess: action.payload,
        loading: false,
      }
    /* Import Drivers END */

    case FD_DRIVER_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case EDIT_DRIVER_VEHICLE_INFO:
      return {
        ...state,
        loading: true,
      }

    case EDIT_DRIVER_VEHICLE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        driverVehicleInfo: action.payload,
      }

    case EDIT_DRIVER_VEHICLE_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case DRIVER_VEHICLE_LIST:
      return {
        ...state,
        loading: true,
      }
    case DRIVER_VEHICLE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        drivervehicleList: action.payload,
      }

    case DRIVER_VEHICLE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case DRIVER_BANK_INFO:
      return {
        ...state,
        loading: true,
      }
    case DRIVER_BANK_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        driverbankInfo: action.payload,
      }

    case DRIVER_BANK_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case ADD_DRIVER_SERVICES:
      return {
        ...state,
        loading: true,
      }
    case ADD_DRIVER_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        driverbankInfo: action.payload,
      }

    case ADD_DRIVER_SERVICES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case DELETE_DRIVER_SERVICES:
      return {
        ...state,
        loading: true,
      }
    case DELETE_DRIVER_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        driverbankInfo: action.payload,
      }

    case DELETE_DRIVER_SERVICES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case DELETE_VIRTUAL_ACCOUNT:
      return {
        ...state,
        loading: true,
      }
    case DELETE_VIRTUAL_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        driverbankInfo: action.payload,
      }

    case DELETE_VIRTUAL_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default FdDrivers
