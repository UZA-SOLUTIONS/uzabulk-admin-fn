import {
  CONTENT_PAGE_API_FAIL,
  GET_CONTENT_PAGES,
  GET_CONTENT_PAGES_FAIL,
  GET_CONTENT_PAGES_SUCCESS,
  ADD_CONTENT_PAGE,
  ADD_CONTENT_PAGE_FAIL,
  ADD_CONTENT_PAGE_SUCCESS,
  GET_CONTENT_PAGE,
  GET_CONTENT_PAGE_FAIL,
  GET_CONTENT_PAGE_SUCCESS,
  PUT_CONTENT_PAGE,
  PUT_CONTENT_PAGE_FAIL,
  PUT_CONTENT_PAGE_SUCCESS,
  DELETE_CONTENT_PAGE,
  DELETE_CONTENT_PAGE_FAIL,
  DELETE_CONTENT_PAGE_SUCCESS,
  PUT_CONTENT_PAGES_STATUS,
  PUT_CONTENT_PAGES_STATUS_FAIL,
  PUT_CONTENT_PAGES_STATUS_SUCCESS,
} from "./actionTypes"

/* 
****************
Fields
****************
*/
import {
  ADD_CONTENT_PAGE_FIELD,
  ADD_CONTENT_PAGE_FIELD_FAIL,
  ADD_CONTENT_PAGE_FIELD_SUCCESS,
  GET_CONTENT_PAGE_FIELD,
  GET_CONTENT_PAGE_FIELD_FAIL,
  GET_CONTENT_PAGE_FIELD_SUCCESS,
  PUT_CONTENT_PAGE_FIELD,
  PUT_CONTENT_PAGE_FIELD_FAIL,
  PUT_CONTENT_PAGE_FIELD_SUCCESS,
  DELETE_CONTENT_PAGE_FIELD,
  DELETE_CONTENT_PAGE_FIELD_FAIL,
  DELETE_CONTENT_PAGE_FIELD_SUCCESS,
  PUT_CONTENT_PAGE_FIELD_SORT,
  PUT_CONTENT_PAGE_FIELD_SORT_FAIL,
  PUT_CONTENT_PAGE_FIELD_SORT_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  contentPages: [],
  totalContentPages: 0,
  error: "",
  loading: false,
  contentPage: {},
  contentPage: {},
  contentPageField: {},
}

const ContentPage = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get ContentPages */
    case GET_CONTENT_PAGES:
      return {
        ...state,
        loading: true,
      }

    case GET_CONTENT_PAGES_SUCCESS:
      return {
        ...state,
        contentPages: action.payload.data || [],
        totalContentPages: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_CONTENT_PAGES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get ContentPages END */

    /* Add Promo Code */
    case ADD_CONTENT_PAGE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_CONTENT_PAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_CONTENT_PAGE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Promo Code END */

    /* Get Promo Code */
    case GET_CONTENT_PAGE:
      return {
        ...state,
        error: "",
        loading: true,
        // contentPage: {},
      }

    case GET_CONTENT_PAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        contentPage: {},
      }

    case GET_CONTENT_PAGE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        contentPage: action.payload,
      }
    /* Add Promo Code END */

    /* Update Promo Code */
    case PUT_CONTENT_PAGE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_CONTENT_PAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_CONTENT_PAGE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        contentPage: {
          ...state.contentPage,
          title: action.payload?.title
        },
      }
    /* Update Promo Code END */

    /* Delete Promo Code */
    case DELETE_CONTENT_PAGE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_CONTENT_PAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_CONTENT_PAGE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Promo Code END */

    /* Update Promo Codes Status */
    case PUT_CONTENT_PAGES_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_CONTENT_PAGES_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_CONTENT_PAGES_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Promo Codes Status END */

    case CONTENT_PAGE_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    /* 
    ****************
    Fields
    ****************
    */
    /* Add ContentPage Field */
    case ADD_CONTENT_PAGE_FIELD:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_CONTENT_PAGE_FIELD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_CONTENT_PAGE_FIELD_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add ContentPage Field END */

    /* Get ContentPage */
    case GET_CONTENT_PAGE_FIELD:
      return {
        ...state,
        error: "",
        loading: true,
        contentPageField: {},
      }

    case GET_CONTENT_PAGE_FIELD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        contentPageField: {},
      }

    case GET_CONTENT_PAGE_FIELD_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        contentPageField: action.payload,
      }
    /* Get ContentPage END */

    /* Update ContentPage */
    case PUT_CONTENT_PAGE_FIELD:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_CONTENT_PAGE_FIELD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_CONTENT_PAGE_FIELD_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update ContentPage END */

    /* Delete ContentPage Field */
    case DELETE_CONTENT_PAGE_FIELD:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_CONTENT_PAGE_FIELD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_CONTENT_PAGE_FIELD_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete ContentPage END */

    /* Update ContentPage Sort Order */
    case PUT_CONTENT_PAGE_FIELD_SORT:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_CONTENT_PAGE_FIELD_SORT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_CONTENT_PAGE_FIELD_SORT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update ContentPage Sort Order END */

    default:
      return state
  }
}

export default ContentPage
