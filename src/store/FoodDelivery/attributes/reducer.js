import {
  FD_ATTRIBUTE_API_FAIL,
  GET_FD_ATTRIBUTES,
  GET_FD_ATTRIBUTES_FAIL,
  GET_FD_ATTRIBUTES_SUCCESS,
  ADD_FD_ATTRIBUTE,
  ADD_FD_ATTRIBUTE_FAIL,
  ADD_FD_ATTRIBUTE_SUCCESS,
  GET_FD_ATTRIBUTE,
  GET_FD_ATTRIBUTE_FAIL,
  GET_FD_ATTRIBUTE_SUCCESS,
  PUT_FD_ATTRIBUTE,
  PUT_FD_ATTRIBUTE_FAIL,
  PUT_FD_ATTRIBUTE_SUCCESS,
  DELETE_FD_ATTRIBUTE,
  DELETE_FD_ATTRIBUTE_FAIL,
  DELETE_FD_ATTRIBUTE_SUCCESS,
  PUT_FD_ATTRIBUTES_STATUS,
  PUT_FD_ATTRIBUTES_STATUS_FAIL,
  PUT_FD_ATTRIBUTES_STATUS_SUCCESS,
  POST_FD_TERM_IN_ATTRIBUTE,
  POST_FD_TERM_IN_ATTRIBUTE_FAIL,
  POST_FD_TERM_IN_ATTRIBUTE_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  fdAttributes: [],
  totalFdAttributes: 0,
  error: "",
  loading: false,
  fdAttribute: {},
}

const FdAttributes = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Food Delivery Attributes */
    case GET_FD_ATTRIBUTES:
      return {
        ...state,
        loading: true,
      }

    case GET_FD_ATTRIBUTES_SUCCESS:
      return {
        ...state,
        fdAttributes: action.payload.data || [],
        totalFdAttributes: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_FD_ATTRIBUTES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Food Delivery Attributes END */

    /* Add Food Delivery Attributes */
    case ADD_FD_ATTRIBUTE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_FD_ATTRIBUTE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_FD_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Food Delivery Attributes END */

    /* Get Food Delivery Attributes */
    case GET_FD_ATTRIBUTE:
      return {
        ...state,
        error: "",
        loading: true,
        fdAttribute: {},
      }

    case GET_FD_ATTRIBUTE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fdAttribute: {},
      }

    case GET_FD_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        fdAttribute: action.payload,
      }
    /* Add Food Delivery Attributes END */

    /* Update Food Delivery Attributes */
    case PUT_FD_ATTRIBUTE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_ATTRIBUTE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Attributes END */

    /* Delete Food Delivery Attributes */
    case DELETE_FD_ATTRIBUTE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_FD_ATTRIBUTE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_FD_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Food Delivery Attributes END */

    /* Update Food Delivery Attributes Status */
    case PUT_FD_ATTRIBUTES_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_FD_ATTRIBUTES_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_FD_ATTRIBUTES_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Food Delivery Attributes Status END */

    /* Add term in attribute */
    case POST_FD_TERM_IN_ATTRIBUTE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case POST_FD_TERM_IN_ATTRIBUTE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case POST_FD_TERM_IN_ATTRIBUTE_SUCCESS: {
      const _attributeIndex = state.fdAttributes?.findIndex(
        item => item._id === action?.payload?.attributeId
      )

      let _fdAttributes = state.fdAttributes

      if (_attributeIndex !== -1) {
        const _attribute = state.fdAttributes[_attributeIndex]

        const _termIndex = _attribute?.terms?.findIndex(
          item => item._id === action?.payload?.data?._id
        )

        if (_termIndex === -1) {
          _attribute.terms = [..._attribute.terms, action.payload.data]
        }

        _fdAttributes = [
          ...state.fdAttributes?.slice(0, _attributeIndex),
          _attribute,
          ...state.fdAttributes?.slice(_attributeIndex + 1),
        ]
      }

      return {
        ...state,
        error: "",
        loading: false,
        fdAttributes: _fdAttributes,
      }
    }
    /* Add term in attribute END */

    case FD_ATTRIBUTE_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default FdAttributes
