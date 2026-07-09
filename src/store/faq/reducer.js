import {
  FAQ_API_FAIL,
  GET_FAQS,
  GET_FAQS_FAIL,
  GET_FAQS_SUCCESS,
  ADD_FAQ,
  ADD_FAQ_FAIL,
  ADD_FAQ_SUCCESS,
  GET_FAQ,
  GET_FAQ_FAIL,
  GET_FAQ_SUCCESS,
  PUT_FAQ,
  PUT_FAQ_FAIL,
  PUT_FAQ_SUCCESS,
  DELETE_FAQ,
  DELETE_FAQ_FAIL,
  DELETE_FAQ_SUCCESS,
  PUT_FAQS_STATUS,
  PUT_FAQS_STATUS_FAIL,
  PUT_FAQS_STATUS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  faqs: [],
  totalFaqs: 0,
  error: "",
  loading: false,
  faq: {},
}

const Faqs = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Faqs */
    case GET_FAQS:
      return {
        ...state,
        loading: true,
      }

    case GET_FAQS_SUCCESS:
      return {
        ...state,
        faqs: action.payload.data || [],
        totalFaqs: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_FAQS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Faqs END */

    /* Add Faq */
    case ADD_FAQ:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_FAQ_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_FAQ_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Faq END */

    /* Get Faq */
    case GET_FAQ:
      return {
        ...state,
        error: "",
        loading: true,
        faq: {},
      }

    case GET_FAQ_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        faq: {},
      }

    case GET_FAQ_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        faq: action.payload,
      }
    /* Add Faq END */

    /* Update Faq */
    case PUT_FAQ:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FAQ_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FAQ_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Faq END */

    /* Delete Faq */
    case DELETE_FAQ:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_FAQ_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_FAQ_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Faq END */

    /* Update Faqs Status */
    case PUT_FAQS_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FAQS_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FAQS_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Faqs Status END */

    case FAQ_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Faqs
