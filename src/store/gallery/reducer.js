import {
  GALLERY_API_FAIL,
  GET_GALLERIES,
  GET_GALLERIES_FAIL,
  GET_GALLERIES_SUCCESS,
  ADD_GALLERY,
  ADD_GALLERY_FAIL,
  ADD_GALLERY_SUCCESS,
  GET_GALLERY,
  GET_GALLERY_FAIL,
  GET_GALLERY_SUCCESS,
  PUT_GALLERY,
  PUT_GALLERY_FAIL,
  PUT_GALLERY_SUCCESS,
  DELETE_GALLERY,
  DELETE_GALLERY_FAIL,
  DELETE_GALLERY_SUCCESS,
  PUT_GALLERIES_STATUS,
  PUT_GALLERIES_STATUS_FAIL,
  PUT_GALLERIES_STATUS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  galleries: [],
  totalGalleries: 0,
  error: "",
  loading: false,
  gallery: {},
}

const Gallery = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Galleries */
    case GET_GALLERIES:
      return {
        ...state,
        loading: true,
      }

    case GET_GALLERIES_SUCCESS:
      return {
        ...state,
        galleries: action.payload.data || [],
        totalGalleries: action.payload.totalcount || 0,
        loading: false,
      }

    case GET_GALLERIES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Galleries END */

    /* Add Promo Code */
    case ADD_GALLERY:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_GALLERY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_GALLERY_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Promo Code END */

    /* Get Promo Code */
    case GET_GALLERY:
      return {
        ...state,
        error: "",
        loading: true,
        gallery: {},
      }

    case GET_GALLERY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        gallery: {},
      }

    case GET_GALLERY_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        gallery: action.payload,
      }
    /* Add Promo Code END */

    /* Update Promo Code */
    case PUT_GALLERY:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_GALLERY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_GALLERY_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Promo Code END */

    /* Delete Promo Code */
    case DELETE_GALLERY:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_GALLERY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_GALLERY_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Promo Code END */

    /* Update Promo Codes Status */
    case PUT_GALLERIES_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_GALLERIES_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_GALLERIES_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Promo Codes Status END */

    case GALLERY_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Gallery
