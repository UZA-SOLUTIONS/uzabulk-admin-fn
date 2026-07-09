import {
  DOCUMENT_TEMPLATE_API_FAIL,
  GET_DOCUMENT_TEMPLATES,
  GET_DOCUMENT_TEMPLATES_FAIL,
  GET_DOCUMENT_TEMPLATES_SUCCESS,
  ADD_DOCUMENT_TEMPLATE,
  ADD_DOCUMENT_TEMPLATE_FAIL,
  ADD_DOCUMENT_TEMPLATE_SUCCESS,
  GET_DOCUMENT_TEMPLATE,
  GET_DOCUMENT_TEMPLATE_FAIL,
  GET_DOCUMENT_TEMPLATE_SUCCESS,
  PUT_DOCUMENT_TEMPLATE,
  PUT_DOCUMENT_TEMPLATE_FAIL,
  PUT_DOCUMENT_TEMPLATE_SUCCESS,
  DELETE_DOCUMENT_TEMPLATE,
  DELETE_DOCUMENT_TEMPLATE_FAIL,
  DELETE_DOCUMENT_TEMPLATE_SUCCESS,
  PUT_DOCUMENT_TEMPLATES_STATUS,
  PUT_DOCUMENT_TEMPLATES_STATUS_FAIL,
  PUT_DOCUMENT_TEMPLATES_STATUS_SUCCESS,
} from "./actionTypes"

/* 
****************
Fields
****************
*/
import {
  ADD_DOCUMENT_TEMPLATE_FIELD,
  ADD_DOCUMENT_TEMPLATE_FIELD_FAIL,
  ADD_DOCUMENT_TEMPLATE_FIELD_SUCCESS,
  GET_DOCUMENT_TEMPLATE_FIELD,
  GET_DOCUMENT_TEMPLATE_FIELD_FAIL,
  GET_DOCUMENT_TEMPLATE_FIELD_SUCCESS,
  PUT_DOCUMENT_TEMPLATE_FIELD,
  PUT_DOCUMENT_TEMPLATE_FIELD_FAIL,
  PUT_DOCUMENT_TEMPLATE_FIELD_SUCCESS,
  DELETE_DOCUMENT_TEMPLATE_FIELD,
  DELETE_DOCUMENT_TEMPLATE_FIELD_FAIL,
  DELETE_DOCUMENT_TEMPLATE_FIELD_SUCCESS,
  PUT_DOCUMENT_TEMPLATE_FIELD_SORT,
  PUT_DOCUMENT_TEMPLATE_FIELD_SORT_FAIL,
  PUT_DOCUMENT_TEMPLATE_FIELD_SORT_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  documentTemplates: [],
  totalTemplates: 0,
  error: "",
  loading: false,
  documentTemplate: {},
  documentTemplateField: {},
}

const DocTemplates = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get DocTemplates */
    case GET_DOCUMENT_TEMPLATES:
      return {
        ...state,
        loading: true,
      }

    case GET_DOCUMENT_TEMPLATES_SUCCESS:
      return {
        ...state,
        documentTemplates: action.payload.data || [],
        totalDocTemplates: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_DOCUMENT_TEMPLATES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get DocTemplates END */

    /* Add DocTemplate */
    case ADD_DOCUMENT_TEMPLATE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_DOCUMENT_TEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_DOCUMENT_TEMPLATE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add DocTemplate END */

    /* Get DocTemplate */
    case GET_DOCUMENT_TEMPLATE:
      return {
        ...state,
        error: "",
        loading: true,
        documentTemplate: {},
      }

    case GET_DOCUMENT_TEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        documentTemplate: {},
      }

    case GET_DOCUMENT_TEMPLATE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        documentTemplate: action.payload,
      }
    /* Add DocTemplate END */

    /* Update DocTemplate */
    case PUT_DOCUMENT_TEMPLATE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_DOCUMENT_TEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_DOCUMENT_TEMPLATE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update DocTemplate END */

    /* Delete DocTemplate */
    case DELETE_DOCUMENT_TEMPLATE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_DOCUMENT_TEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_DOCUMENT_TEMPLATE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete DocTemplate END */

    /* Update DocTemplates Status */
    case PUT_DOCUMENT_TEMPLATES_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_DOCUMENT_TEMPLATES_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_DOCUMENT_TEMPLATES_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update DocTemplates Status END */

    case DOCUMENT_TEMPLATE_API_FAIL:
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
    /* Add DocTemplate Field */
    case ADD_DOCUMENT_TEMPLATE_FIELD:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_DOCUMENT_TEMPLATE_FIELD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_DOCUMENT_TEMPLATE_FIELD_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add DocTemplate Field END */

    /* Get DocTemplate */
    case GET_DOCUMENT_TEMPLATE_FIELD:
      return {
        ...state,
        error: "",
        loading: true,
        documentTemplateField: {},
      }

    case GET_DOCUMENT_TEMPLATE_FIELD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        documentTemplateField: {},
      }

    case GET_DOCUMENT_TEMPLATE_FIELD_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        documentTemplateField: action.payload,
      }
    /* Get DocTemplate END */

    /* Update DocTemplate */
    case PUT_DOCUMENT_TEMPLATE_FIELD:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_DOCUMENT_TEMPLATE_FIELD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_DOCUMENT_TEMPLATE_FIELD_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update DocTemplate END */

    /* Delete DocTemplate Field */
    case DELETE_DOCUMENT_TEMPLATE_FIELD:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_DOCUMENT_TEMPLATE_FIELD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_DOCUMENT_TEMPLATE_FIELD_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete DocTemplate END */

    /* Update DocTemplate Sort Order */
    case PUT_DOCUMENT_TEMPLATE_FIELD_SORT:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_DOCUMENT_TEMPLATE_FIELD_SORT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_DOCUMENT_TEMPLATE_FIELD_SORT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update DocTemplate Sort Order END */

    default:
      return state
  }
}

export default DocTemplates
