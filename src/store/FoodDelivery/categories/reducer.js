import {
  FD_CATEGORY_API_FAIL,
  GET_FD_CATEGORIES,
  GET_FD_CATEGORIES_FAIL,
  GET_FD_CATEGORIES_SUCCESS,
  ADD_FD_CATEGORY,
  ADD_FD_CATEGORY_FAIL,
  ADD_FD_CATEGORY_SUCCESS,
  GET_FD_CATEGORY,
  GET_FD_CATEGORY_FAIL,
  GET_FD_CATEGORY_SUCCESS,
  PUT_FD_CATEGORY,
  PUT_FD_CATEGORY_FAIL,
  PUT_FD_CATEGORY_SUCCESS,
  DELETE_FD_CATEGORY,
  DELETE_FD_CATEGORY_FAIL,
  DELETE_FD_CATEGORY_SUCCESS,
  PUT_FD_CATEGORIES_STATUS,
  PUT_FD_CATEGORIES_STATUS_FAIL,
  PUT_FD_CATEGORIES_STATUS_SUCCESS,
  PUT_FD_CATEGORY_SORT,
  PUT_FD_CATEGORY_SORT_FAIL,
  PUT_FD_CATEGORY_SORT_SUCCESS,
  EXPORT_FD_CATEGORIES,
  EXPORT_FD_CATEGORIES_SUCCESS,
  EXPORT_FD_CATEGORIES_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  fdCategories: [],
  totalFdCategories: 0,
  error: "",
  loading: false,
  categoriesLoading: false,
  fdCategory: {},
}

const FdCategories = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Food Delivery Categories */
    case GET_FD_CATEGORIES:
      return {
        ...state,
        ...(action.payload.ownLoader
          ? { categoriesLoading: true }
          : { loading: true }),
      }

    case GET_FD_CATEGORIES_SUCCESS:
      return {
        ...state,
        fdCategories: action.payload.data || [],
        totalFdCategories: action.payload.totalcount || 0,
        loading: false,
        categoriesLoading: false,
        error: "",
      }

    case GET_FD_CATEGORIES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        categoriesLoading: false,
      }
    /* Get Food Delivery Categories END */

    /* Add Food Delivery Categories */
    case ADD_FD_CATEGORY:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_FD_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_FD_CATEGORY_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Food Delivery Categories END */

    /* Get Food Delivery Categories */
    case GET_FD_CATEGORY:
      return {
        ...state,
        error: "",
        loading: true,
        fdCategory: {},
      }

    case GET_FD_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fdCategory: {},
      }

    case GET_FD_CATEGORY_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdCategory: action.payload,
      }
    /* Add Food Delivery Categories END */

    /* Update Food Delivery Categories */
    case PUT_FD_CATEGORY:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_CATEGORY_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Categories END */

    /* Delete Food Delivery Categories */
    case DELETE_FD_CATEGORY:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_FD_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_FD_CATEGORY_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Food Delivery Categories END */

    /* Update Food Delivery Categories Status */
    case PUT_FD_CATEGORIES_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_CATEGORIES_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_CATEGORIES_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Categories Status END */

    /* Update Food Delivery Categories Sort Order */
    case PUT_FD_CATEGORY_SORT:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_CATEGORY_SORT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_CATEGORY_SORT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Categories Sort Order END */

    /* Export FdCategories */
    case EXPORT_FD_CATEGORIES:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case EXPORT_FD_CATEGORIES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case EXPORT_FD_CATEGORIES_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Export FdCategories END */

    case FD_CATEGORY_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default FdCategories
