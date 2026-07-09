import {
  BLOG_API_FAIL,
  GET_BLOGS,
  GET_BLOGS_FAIL,
  GET_BLOGS_SUCCESS,
  ADD_BLOG,
  ADD_BLOG_FAIL,
  ADD_BLOG_SUCCESS,
  GET_BLOG,
  GET_BLOG_FAIL,
  GET_BLOG_SUCCESS,
  PUT_BLOG,
  PUT_BLOG_FAIL,
  PUT_BLOG_SUCCESS,
  DELETE_BLOG,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_SUCCESS,
  PUT_BLOGS_STATUS,
  PUT_BLOGS_STATUS_FAIL,
  PUT_BLOGS_STATUS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  blogs: [],
  totalblog: 0,
  error: "",
  loading: false,
  blog: {},
}

const Blog = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Blogs */
    case GET_BLOGS:
      return {
        ...state,
        loading: true,
      }

    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: action.payload.data || [],
        totalblog: action.payload.totalcount || 0,
        loading: false,
      }

    case GET_BLOGS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Blogs END */

    /* Add Blog */
    case ADD_BLOG:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_BLOG_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_BLOG_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Blog END */

    /* Get Blog */
    case GET_BLOG:
      return {
        ...state,
        error: "",
        loading: true,
        blog: {},
      }

    case GET_BLOG_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        blog: {},
      }

    case GET_BLOG_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        blog: action.payload,
      }
    /* Get Blog END */

    /* Update Blog */
    case PUT_BLOG:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_BLOG_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_BLOG_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Blog  END */

    /* Delete Blog */
    case DELETE_BLOG:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_BLOG_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Blog END */

    /* Update Blog Status */
    case PUT_BLOGS_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_BLOGS_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_BLOGS_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }

    case BLOG_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Blog
