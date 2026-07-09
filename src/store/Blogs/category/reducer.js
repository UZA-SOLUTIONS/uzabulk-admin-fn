import {
  BLOG_CATEGORY_API_FAIL,
  GET_BLOG_CATEGORIES,
  GET_BLOG_CATEGORIES_FAIL,
  GET_BLOG_CATEGORIES_SUCCESS,
  ADD_BLOG_CATEGORY,
  ADD_BLOG_CATEGORY_FAIL,
  ADD_BLOG_CATEGORY_SUCCESS,
  GET_BLOG_CATEGORY,
  GET_BLOG_CATEGORY_FAIL,
  GET_BLOG_CATEGORY_SUCCESS,
  PUT_BLOG_CATEGORY,
  PUT_BLOG_CATEGORY_FAIL,
  PUT_BLOG_CATEGORY_SUCCESS,
  DELETE_BLOG_CATEGORY,
  DELETE_BLOG_CATEGORY_FAIL,
  DELETE_BLOG_CATEGORY_SUCCESS,
  PUT_BLOG_CATEGORIES_STATUS,
  PUT_BLOG_CATEGORIES_STATUS_FAIL,
  PUT_BLOG_CATEGORIES_STATUS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  blogCategories: [],
  totalblogCategory: 0,
  error: "",
  loading: false,
  blogCategory: {},
}

const BlogCategory = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get BlogCategories */
    case GET_BLOG_CATEGORIES:
      return {
        ...state,
        loading: true,
      }

    case GET_BLOG_CATEGORIES_SUCCESS:
      return {
        ...state,
        blogCategories: action.payload.data || [],
        totalblogCategory: action.payload.totalcount || 0,
        loading: false,
      }

    case GET_BLOG_CATEGORIES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get BlogCategories END */

    /* Add BlogCategory */
    case ADD_BLOG_CATEGORY:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_BLOG_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_BLOG_CATEGORY_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add BlogCategory END */

    /* Get BlogCategory */
    case GET_BLOG_CATEGORY:
      return {
        ...state,
        error: "",
        loading: true,
        subAdmin: {},
      }

    case GET_BLOG_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        blogCategory: {},
      }

    case GET_BLOG_CATEGORY_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        blogCategory: action.payload,
      }
    /* Get BlogCategory END */

    /* Update BlogCategory */
    case PUT_BLOG_CATEGORY:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_BLOG_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_BLOG_CATEGORY_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Blog Category END */

    /* Delete BlogCAtegory */
    case DELETE_BLOG_CATEGORY:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_BLOG_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_BLOG_CATEGORY_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete BlogCategory END */

    /* Update BlogCategory Status */
    case PUT_BLOG_CATEGORIES_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_BLOG_CATEGORIES_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_BLOG_CATEGORIES_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }

    case BLOG_CATEGORY_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default BlogCategory
