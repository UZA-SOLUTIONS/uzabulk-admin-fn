import {
  API_FAIL,
  GET_CUSTOMERS,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
  ADD_CUSTOMER,
  ADD_CUSTOMER_FAIL,
  ADD_CUSTOMER_SUCCESS,
  GET_CUSTOMER,
  GET_CUSTOMER_FAIL,
  GET_CUSTOMER_SUCCESS,
  PUT_CUSTOMER,
  PUT_CUSTOMER_FAIL,
  PUT_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_ADDRESS,
  ADD_CUSTOMER_ADDRESS_FAIL,
  ADD_CUSTOMER_ADDRESS_SUCCESS,
  GET_CUSTOMER_ADDRESS,
  GET_CUSTOMER_ADDRESS_FAIL,
  GET_CUSTOMER_ADDRESS_SUCCESS,
  PUT_CUSTOMER_ADDRESS,
  PUT_CUSTOMER_ADDRESS_FAIL,
  PUT_CUSTOMER_ADDRESS_SUCCESS,
  DELETE_CUSTOMER_ADDRESS,
  DELETE_CUSTOMER_ADDRESS_FAIL,
  DELETE_CUSTOMER_ADDRESS_SUCCESS,
  PUT_CUSTOMERS_STATUS,
  PUT_CUSTOMERS_STATUS_FAIL,
  PUT_CUSTOMERS_STATUS_SUCCESS,
  EXPORT_CUSTOMERS,
  EXPORT_CUSTOMERS_SUCCESS,
  EXPORT_CUSTOMERS_FAIL,
  IMPORT_CUSTOMERS,
  IMPORT_CUSTOMERS_SUCCESS,
  IMPORT_CUSTOMERS_FAIL,
} from "./actionTypes"

/* Document */
import {
  GET_FD_CUSTOMER_DOCUMENTS,
  GET_FD_CUSTOMER_DOCUMENTS_FAIL,
  GET_FD_CUSTOMER_DOCUMENTS_SUCCESS,
  POST_FD_CUSTOMER_DOCUMENT,
  POST_FD_CUSTOMER_DOCUMENT_FAIL,
  POST_FD_CUSTOMER_DOCUMENT_SUCCESS,
  GET_FD_CUSTOMER_DOCUMENT,
  GET_FD_CUSTOMER_DOCUMENT_FAIL,
  GET_FD_CUSTOMER_DOCUMENT_SUCCESS,
  PUT_FD_CUSTOMER_DOCUMENT,
  PUT_FD_CUSTOMER_DOCUMENT_FAIL,
  PUT_FD_CUSTOMER_DOCUMENT_SUCCESS,
  DELETE_FD_CUSTOMER_DOCUMENT,
  DELETE_FD_CUSTOMER_DOCUMENT_FAIL,
  DELETE_FD_CUSTOMER_DOCUMENT_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  customers: [],
  totalCustomers: 0,
  error: "",
  success: "",
  loading: false,
  customer: {},
  address: {},
  importError: "",
  importSuccess: "",
}

const Customers = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Customers */
    case GET_CUSTOMERS:
      return {
        ...state,
        loading: true,
      }

    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload.data || [],
        totalCustomers: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_CUSTOMERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Customers END */

    /* Add Customer */
    case ADD_CUSTOMER:
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
      }

    case ADD_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
        success: "",
        loading: false,
      }

    case ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        error: "",
        success: action.payload,
        loading: false,
      }
    /* Add Customer END */

    /* Get Customer */
    case GET_CUSTOMER:
      return {
        ...state,
        error: "",
        loading: true,
        customer: {},
      }

    case GET_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        customer: {},
      }

    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        customer: action.payload,
      }
    /* Add Customer END */

    /* Update Customer */
    case PUT_CUSTOMER:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_CUSTOMER_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Customer END */

    /* Delete Customer */
    case DELETE_CUSTOMER:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Customer END */

    /* Add Customer Address */
    case ADD_CUSTOMER_ADDRESS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_CUSTOMER_ADDRESS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_CUSTOMER_ADDRESS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Customer Address END */

    /* Get Customer Address */
    case GET_CUSTOMER_ADDRESS:
      return {
        ...state,
        error: "",
        loading: true,
        address: {},
      }

    case GET_CUSTOMER_ADDRESS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        address: {},
      }

    case GET_CUSTOMER_ADDRESS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        address: action.payload,
      }
    /* Add Customer Address END */

    /* Update Customer Address */
    case PUT_CUSTOMER_ADDRESS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_CUSTOMER_ADDRESS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_CUSTOMER_ADDRESS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Customer Address END */

    /* Delete Customer Address */
    case DELETE_CUSTOMER_ADDRESS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_CUSTOMER_ADDRESS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_CUSTOMER_ADDRESS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Customer Address END */

    /* Update Customers Status */
    case PUT_CUSTOMERS_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_CUSTOMERS_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_CUSTOMERS_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Customers Status END */

    /* Export Customers */
    case EXPORT_CUSTOMERS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case EXPORT_CUSTOMERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case EXPORT_CUSTOMERS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Export Customers END */

    /* Import Customers */
    case IMPORT_CUSTOMERS:
      return {
        ...state,
        importError: "",
        importSuccess: "",
        loading: true,
      }

    case IMPORT_CUSTOMERS_FAIL:
      return {
        ...state,
        importError: action.payload,
        importSuccess: "",
        loading: false,
      }

    case IMPORT_CUSTOMERS_SUCCESS:
      return {
        ...state,
        error: "",
        importError: "",
        importSuccess: action.payload,
        loading: false,
      }
    /* Import Customers END */

    case API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    /* Get Food Delivery CUSTOMER Documents */
    case GET_FD_CUSTOMER_DOCUMENTS:
      return {
        ...state,
        error: "",
        loading: true,
        fdDocuments: [],
      }

    case GET_FD_CUSTOMER_DOCUMENTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fdDocuments: [],
      }

    case GET_FD_CUSTOMER_DOCUMENTS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdDocuments: action.payload,
      }
    /* Get Food Delivery CUSTOMER Document END */

    /* Add Food Delivery CUSTOMER Document */
    case POST_FD_CUSTOMER_DOCUMENT:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case POST_FD_CUSTOMER_DOCUMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case POST_FD_CUSTOMER_DOCUMENT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Food Delivery CUSTOMER Document END */

    /* Get Food Delivery CUSTOMER Document */
    case GET_FD_CUSTOMER_DOCUMENT:
      return {
        ...state,
        error: "",
        loading: true,
        fdDocument: {},
      }

    case GET_FD_CUSTOMER_DOCUMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fdDocument: {},
      }

    case GET_FD_CUSTOMER_DOCUMENT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdDocument: action.payload,
      }
    /* Add Food Delivery CUSTOMER Document END */

    /* Update Food Delivery CUSTOMER Document */
    case PUT_FD_CUSTOMER_DOCUMENT:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_CUSTOMER_DOCUMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_CUSTOMER_DOCUMENT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery CUSTOMER Document END */

    /* Delete Food Delivery CUSTOMER Document */
    case DELETE_FD_CUSTOMER_DOCUMENT:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_FD_CUSTOMER_DOCUMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_FD_CUSTOMER_DOCUMENT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Food Delivery CUSTOMER Document END */
    default:
      return state
  }
}

export default Customers
