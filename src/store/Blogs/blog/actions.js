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

export const apiFail = error => ({
  type: BLOG_API_FAIL,
  payload: error,
})

/* Get blogs */
export const getblogs = data => ({
  type: GET_BLOGS,
  payload: data,
})

export const getblogsSuccess = blogTags => ({
  type: GET_BLOGS_SUCCESS,
  payload: blogTags,
})

export const getblogsFail = error => ({
  type: GET_BLOGS_FAIL,
  payload: error,
})
/* Get Blogs END */

/* Add blog */
export const addblog = (tag, history) => ({
  type: ADD_BLOG,
  payload: { tag, history },
})

export const addblogFail = error => ({
  type: ADD_BLOG_FAIL,
  payload: error,
})

export const addblogSuccess = () => ({
  type: ADD_BLOG_SUCCESS,
})
/* Add Blog END */

/* Get Blog */
export const getblog = id => ({
  type: GET_BLOG,
  payload: id,
})

export const getblogFail = error => ({
  type: GET_BLOG_FAIL,
  payload: error,
})

export const getblogSuccess = category => ({
  type: GET_BLOG_SUCCESS,
  payload: category,
})
/* Get Blog END */

/* Update Blog */
export const putBlog = (data, history) => ({
  type: PUT_BLOG,
  payload: { data, history },
})

export const putBlogFail = error => ({
  type: PUT_BLOG_FAIL,
  payload: error,
})

export const putBlogSuccess = () => ({
  type: PUT_BLOG_SUCCESS,
})
/* Update Blog END */

/* Delete Blog */
export const deleteBlog = (data, callback) => ({
  type: DELETE_BLOG,
  payload: { data, callback },
})

export const deleteBlogFail = error => ({
  type: DELETE_BLOG_FAIL,
  payload: error,
})

export const deleteBlogSuccess = () => ({
  type: DELETE_BLOG_SUCCESS,
})
/* Delete Blog END */

/* Update Multi Blog Status */
export const putBlogsStatus = (data, callback) => ({
  type: PUT_BLOGS_STATUS,
  payload: { data, callback },
})

export const putBlogsStatusFail = error => ({
  type: PUT_BLOGS_STATUS_FAIL,
  payload: error,
})

export const putBlogsStatusSuccess = () => ({
  type: PUT_BLOGS_STATUS_SUCCESS,
})
/* Update Multi Blog Status END */
