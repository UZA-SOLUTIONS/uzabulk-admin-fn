import {
  BLOG_TAG_API_FAIL,
  GET_BLOG_TAGS,
  GET_BLOG_TAGS_FAIL,
  GET_BLOG_TAGS_SUCCESS,
  ADD_BLOG_TAG,
  ADD_BLOG_TAG_FAIL,
  ADD_BLOG_TAG_SUCCESS,
  GET_BLOG_TAG,
  GET_BLOG_TAG_FAIL,
  GET_BLOG_TAG_SUCCESS,
  PUT_BLOG_TAG,
  PUT_BLOG_TAG_FAIL,
  PUT_BLOG_TAG_SUCCESS,
  DELETE_BLOG_TAG,
  DELETE_BLOG_TAG_FAIL,
  DELETE_BLOG_TAG_SUCCESS,
  PUT_BLOG_TAGS_STATUS,
  PUT_BLOG_TAGS_STATUS_FAIL,
  PUT_BLOG_TAGS_STATUS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  blogTags: [],
  totalblogTag: 0,
  error: "",
  loading: false,
  blogtag: {},
}

const BlogTag = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get BlogTags */
    case GET_BLOG_TAGS:
      return {
        ...state,
        loading: true,
      }

    case GET_BLOG_TAGS_SUCCESS:
      return {
        ...state,
        blogTags: action.payload.data || [],
        totalblogTag: action.payload.totalcount || 0,
        loading: false,
      }

    case GET_BLOG_TAGS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get BlogTags END */

    /* Add BlogTag */
    case ADD_BLOG_TAG:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_BLOG_TAG_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_BLOG_TAG_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add BlogTag END */

    /* Get BlogTag */
    case GET_BLOG_TAG:
      return {
        ...state,
        error: "",
        loading: true,
        blogtag: {},
      }

    case GET_BLOG_TAG_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        blogCategory: {},
      }

    case GET_BLOG_TAG_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        blogtag: action.payload,
      }
    /* Get BlogTag END */

    /* Update BlogTag */
    case PUT_BLOG_TAG:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_BLOG_TAG_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_BLOG_TAG_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Blog tag END */

    /* Delete BlogTag */
    case DELETE_BLOG_TAG:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_BLOG_TAG_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_BLOG_TAG_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete BlogTag END */

    /* Update Blogtag Status */
    case PUT_BLOG_TAGS_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_BLOG_TAGS_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_BLOG_TAGS_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }

    case BLOG_TAG_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default BlogTag
