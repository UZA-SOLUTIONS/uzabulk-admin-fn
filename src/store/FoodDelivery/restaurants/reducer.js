import {
  FD_RESTAURANT_API_FAIL,
  GET_FD_RESTAURANTS,
  GET_FD_RESTAURANTS_FAIL,
  GET_FD_RESTAURANTS_SUCCESS,
  ADD_FD_RESTAURANT,
  ADD_FD_RESTAURANT_FAIL,
  ADD_FD_RESTAURANT_SUCCESS,
  GET_FD_RESTAURANT,
  GET_FD_RESTAURANT_FAIL,
  GET_FD_RESTAURANT_SUCCESS,
  PUT_FD_RESTAURANT,
  PUT_FD_RESTAURANT_FAIL,
  PUT_FD_RESTAURANT_SUCCESS,
  DELETE_FD_RESTAURANT,
  DELETE_FD_RESTAURANT_FAIL,
  DELETE_FD_RESTAURANT_SUCCESS,
  CLONE_FD_RESTAURANT,
  CLONE_FD_RESTAURANT_FAIL,
  CLONE_FD_RESTAURANT_SUCCESS,
  PUT_FD_RESTAURANTS_STATUS,
  PUT_FD_RESTAURANTS_STATUS_FAIL,
  PUT_FD_RESTAURANTS_STATUS_SUCCESS,
  PUT_FD_RESTAURANT_SETTINGS,
  PUT_FD_RESTAURANT_SETTINGS_SUCCESS,
  PUT_FD_RESTAURANT_SETTINGS_FAIL,
  POST_FD_RESTAURANT_PAY,
  POST_FD_RESTAURANT_PAY_SUCCESS,
  POST_FD_RESTAURANT_PAY_FAIL,
  POST_FD_RESTAURANT_PAY_ADJUSTMENT,
  POST_FD_RESTAURANT_PAY_ADJUSTMENT_SUCCESS,
  POST_FD_RESTAURANT_PAY_ADJUSTMENT_FAIL,
  EXPORT_FD_RESTAURANTS,
  EXPORT_FD_RESTAURANTS_SUCCESS,
  EXPORT_FD_RESTAURANTS_FAIL,
  IMPORT_FD_RESTAURANTS,
  IMPORT_FD_RESTAURANTS_SUCCESS,
  IMPORT_FD_RESTAURANTS_FAIL,
  DELETE_FD_VENDOR_STRIPE_CONNECT,
  DELETE_FD_VENDOR_STRIPE_CONNECT_SUCCESS,
  DELETE_FD_VENDOR_STRIPE_CONNECT_FAIL,
} from "./actionTypes"
/* Document */
import {
  GET_FD_RESTAURANT_DOCUMENTS,
  GET_FD_RESTAURANT_DOCUMENTS_FAIL,
  GET_FD_RESTAURANT_DOCUMENTS_SUCCESS,
  POST_FD_RESTAURANT_DOCUMENT,
  POST_FD_RESTAURANT_DOCUMENT_FAIL,
  POST_FD_RESTAURANT_DOCUMENT_SUCCESS,
  GET_FD_RESTAURANT_DOCUMENT,
  GET_FD_RESTAURANT_DOCUMENT_FAIL,
  GET_FD_RESTAURANT_DOCUMENT_SUCCESS,
  PUT_FD_RESTAURANT_DOCUMENT,
  PUT_FD_RESTAURANT_DOCUMENT_FAIL,
  PUT_FD_RESTAURANT_DOCUMENT_SUCCESS,
  DELETE_FD_RESTAURANT_DOCUMENT,
  DELETE_FD_RESTAURANT_DOCUMENT_FAIL,
  DELETE_FD_RESTAURANT_DOCUMENT_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  fdRestaurants: [],
  totalFdRestaurants: 0,
  error: "",
  success: "",
  loading: false,
  fdRestaurant: {},
  fdDocument: {},
  importError: "",
  importSuccess: "",
}

const FdRestaurants = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Food Delivery Restaurants */
    case GET_FD_RESTAURANTS:
      return {
        ...state,
        loading: true,
        success: "",
      }

    case GET_FD_RESTAURANTS_SUCCESS:
      return {
        ...state,
        fdRestaurants: action.payload.data || [],
        totalFdRestaurants: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_FD_RESTAURANTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Food Delivery Restaurants END */

    /* Add Food Delivery Restaurants */
    case ADD_FD_RESTAURANT:
      return {
        ...state,
        error: "",
        loading: true,
        success: "",
      }

    case ADD_FD_RESTAURANT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_FD_RESTAURANT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Food Delivery Restaurants END */

    /* Get Food Delivery Restaurants */
    case GET_FD_RESTAURANT:
      return {
        ...state,
        error: "",
        loading: true,
        success: "",
      }

    case GET_FD_RESTAURANT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_FD_RESTAURANT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdRestaurant: action.payload,
      }
    /* Add Food Delivery Restaurants END */

    /* Update Food Delivery Restaurants */
    case PUT_FD_RESTAURANT:
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
      }

    case PUT_FD_RESTAURANT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_RESTAURANT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdRestaurant: action.payload,
      }
    /* Update Food Delivery Restaurants END */

    /* Delete Food Delivery Restaurants */
    case DELETE_FD_RESTAURANT:
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
      }

    case DELETE_FD_RESTAURANT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_FD_RESTAURANT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Food Delivery Restaurants END */

    /* Clone Food Delivery Restaurants */
    case CLONE_FD_RESTAURANT:
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
      }

    case CLONE_FD_RESTAURANT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case CLONE_FD_RESTAURANT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Clone Food Delivery Restaurants END */

    /* Update Food Delivery Restaurants Status */
    case PUT_FD_RESTAURANTS_STATUS:
      return {
        ...state,
        success: "",
        error: "",
        loading: true,
      }

    case PUT_FD_RESTAURANTS_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_RESTAURANTS_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Restaurants Status END */

    /* Update Food Delivery Vendor Settings */
    case PUT_FD_RESTAURANT_SETTINGS:
      return {
        ...state,
        loading: true,
        error: "",
        success: "",
      }

    case PUT_FD_RESTAURANT_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        success: action.payload.message,
        fdRestaurant: { ...state.fdRestaurant, ...action.payload.data },
      }

    case PUT_FD_RESTAURANT_SETTINGS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Update Food Delivery Vendor Settings ENd */

    /* Post Food Delivery Vendor Pay */
    case POST_FD_RESTAURANT_PAY:
    case POST_FD_RESTAURANT_PAY_ADJUSTMENT:
      return {
        ...state,
        loading: true,
        success: "",
      }

    case POST_FD_RESTAURANT_PAY_SUCCESS:
    case POST_FD_RESTAURANT_PAY_ADJUSTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case POST_FD_RESTAURANT_PAY_FAIL:
    case POST_FD_RESTAURANT_PAY_ADJUSTMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Post Food Delivery Vendor Pay END */

    /* Get Food Delivery FdRestaurant Documents */
    case GET_FD_RESTAURANT_DOCUMENTS:
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
        fdDocuments: [],
      }

    case GET_FD_RESTAURANT_DOCUMENTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fdDocuments: [],
      }

    case GET_FD_RESTAURANT_DOCUMENTS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdDocuments: action.payload,
      }
    /* Get Food Delivery FdRestaurant Document END */

    /* Add Food Delivery Restaurant Document */
    case POST_FD_RESTAURANT_DOCUMENT:
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
      }

    case POST_FD_RESTAURANT_DOCUMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case POST_FD_RESTAURANT_DOCUMENT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Food Delivery Restaurant Document END */

    /* Get Food Delivery Restaurant Document */
    case GET_FD_RESTAURANT_DOCUMENT:
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
        fdDocument: {},
      }

    case GET_FD_RESTAURANT_DOCUMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fdDocument: {},
      }

    case GET_FD_RESTAURANT_DOCUMENT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdDocument: action.payload,
      }
    /* Add Food Delivery Restaurant Document END */

    /* Update Food Delivery Restaurant Document */
    case PUT_FD_RESTAURANT_DOCUMENT:
      return {
        ...state,
        success: "",
        error: "",
        loading: true,
      }

    case PUT_FD_RESTAURANT_DOCUMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_RESTAURANT_DOCUMENT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Restaurant Document END */

    /* Delete Food Delivery Restaurant Document */
    case DELETE_FD_RESTAURANT_DOCUMENT:
      return {
        ...state,
        error: "",
        success: "",
        loading: true,
      }

    case DELETE_FD_RESTAURANT_DOCUMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_FD_RESTAURANT_DOCUMENT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Food Delivery Restaurant Document END */

    /* Export FdRestaurants */
    case EXPORT_FD_RESTAURANTS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case EXPORT_FD_RESTAURANTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case EXPORT_FD_RESTAURANTS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Export FdRestaurants END */

    /* Import FdRestaurants */
    case IMPORT_FD_RESTAURANTS:
      return {
        ...state,
        importError: "",
        importSuccess: "",
        loading: true,
      }

    case IMPORT_FD_RESTAURANTS_FAIL:
      return {
        ...state,
        importError: action.payload,
        importSuccess: "",
        loading: false,
      }

    case IMPORT_FD_RESTAURANTS_SUCCESS:
      return {
        ...state,
        importError: "",
        importSuccess: action.payload,
        loading: false,
      }
    /* Import FdRestaurants END */

    /* Delete Stripe Connect */
    case DELETE_FD_VENDOR_STRIPE_CONNECT:
      return {
        ...state,
        loading: true,
      }

    case DELETE_FD_VENDOR_STRIPE_CONNECT_FAIL:
      return {
        ...state,
        loading: false,
      }

    case DELETE_FD_VENDOR_STRIPE_CONNECT_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    /* Delete Stripe Connect END */

    case FD_RESTAURANT_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default FdRestaurants
