import {
  FD_PRODUCT_API_FAIL,
  GET_FD_PRODUCTS,
  GET_FD_PRODUCTS_FAIL,
  GET_FD_PRODUCTS_SUCCESS,
  ADD_FD_PRODUCT,
  ADD_FD_PRODUCT_FAIL,
  ADD_FD_PRODUCT_SUCCESS,
  GET_FD_PRODUCT,
  GET_FD_PRODUCT_FAIL,
  GET_FD_PRODUCT_SUCCESS,
  PUT_FD_PRODUCT,
  PUT_FD_PRODUCT_FAIL,
  PUT_FD_PRODUCT_SUCCESS,
  DELETE_FD_PRODUCT,
  DELETE_FD_PRODUCT_FAIL,
  DELETE_FD_PRODUCT_SUCCESS,
  PUT_FD_PRODUCTS_STATUS,
  PUT_FD_PRODUCTS_STATUS_FAIL,
  PUT_FD_PRODUCTS_STATUS_SUCCESS,
  EXPORT_FD_PRODUCTS,
  EXPORT_FD_PRODUCTS_SUCCESS,
  EXPORT_FD_PRODUCTS_FAIL,
  IMPORT_FD_PRODUCTS,
  IMPORT_FD_PRODUCTS_SUCCESS,
  IMPORT_FD_PRODUCTS_FAIL,
  IMPORT_FD_PRODUCTS_VARIATIONS,
  IMPORT_FD_PRODUCTS_VARIATIONS_SUCCESS,
  IMPORT_FD_PRODUCTS_VARIATIONS_FAIL,
  IMPORT_FD_PRODUCTS_COMBINE,
  IMPORT_FD_PRODUCTS_COMBINE_SUCCESS,
  IMPORT_FD_PRODUCTS_COMBINE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  fdProducts: [],
  totalFdProducts: 0,
  error: "",
  loading: false,
  fdProduct: {},
  importError: "",
  importSuccess: "",
  importVariationError: "",
  importVariationSuccess: "",
  importCombineError: "",
  importCombineSuccess: "",
}

const FdProducts = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Food Delivery Products */
    case GET_FD_PRODUCTS:
      return {
        ...state,
        loading: true,
      }

    case GET_FD_PRODUCTS_SUCCESS:
      return {
        ...state,
        fdProducts: action.payload.data || [],
        totalFdProducts: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_FD_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Food Delivery Products END */

    /* Add Food Delivery Products */
    case ADD_FD_PRODUCT:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_FD_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_FD_PRODUCT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Food Delivery Products END */

    /* Get Food Delivery Products */
    case GET_FD_PRODUCT:
      return {
        ...state,
        error: "",
        loading: true,
        fdProduct: {},
      }

    case GET_FD_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fdProduct: {},
      }

    case GET_FD_PRODUCT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdProduct: action.payload,
      }
    /* Add Food Delivery Products END */

    /* Update Food Delivery Products */
    case PUT_FD_PRODUCT:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_PRODUCT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Products END */

    /* Delete Food Delivery Products */
    case DELETE_FD_PRODUCT:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_FD_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_FD_PRODUCT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Food Delivery Products END */

    /* Update Food Delivery Products Status */
    case PUT_FD_PRODUCTS_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_PRODUCTS_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_PRODUCTS_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Products Status END */

    /* Export FdProducts */
    case EXPORT_FD_PRODUCTS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case EXPORT_FD_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case EXPORT_FD_PRODUCTS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Export FdProducts END */

    /* Import FdProducts */
    case IMPORT_FD_PRODUCTS:
      return {
        ...state,
        error: "",
        importError: "",
        importSuccess: "",
        loading: true,
      }

    case IMPORT_FD_PRODUCTS_FAIL:
      return {
        ...state,
        importError: action.payload,
        importSuccess: "",
        loading: false,
      }

    case IMPORT_FD_PRODUCTS_SUCCESS:
      return {
        ...state,
        importError: "",
        importSuccess: action.payload,
        loading: false,
      }
    /* Import FdProducts END */

    /* Import FdProducts Variations */
    case IMPORT_FD_PRODUCTS_VARIATIONS:
      return {
        ...state,
        importVariationError: "",
        importVariationSuccess: "",
        loading: true,
      }

    case IMPORT_FD_PRODUCTS_VARIATIONS_FAIL:
      return {
        ...state,
        importVariationError: action.payload,
        importVariationSuccess: "",
        loading: false,
      }

    case IMPORT_FD_PRODUCTS_VARIATIONS_SUCCESS:
      return {
        ...state,
        importVariationError: "",
        importVariationSuccess: action.payload,
        loading: false,
      }
    /* Import FdProducts END */

    /* Import FdProducts Combine */
    case IMPORT_FD_PRODUCTS_COMBINE:
      return {
        ...state,
        importCombineError: "",
        importCombineSuccess: "",
        loading: true,
      }

    case IMPORT_FD_PRODUCTS_COMBINE_FAIL:
      return {
        ...state,
        importCombineError: action.payload,
        importCombineSuccess: "",
        loading: false,
      }

    case IMPORT_FD_PRODUCTS_COMBINE_SUCCESS:
      return {
        ...state,
        importCombineError: "",
        importCombineSuccess: action.payload,
        loading: false,
      }
    /* Import FdProducts END */

    case FD_PRODUCT_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default FdProducts
