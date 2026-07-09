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

export const apiFail = error => ({
  type: BLOG_TAG_API_FAIL,
  payload: error,
})

/* Get blogTags */
export const getblogTags = data => ({
  type: GET_BLOG_TAGS,
  payload: data,
})

export const getblogTagsSuccess = blogTags => ({
  type: GET_BLOG_TAGS_SUCCESS,
  payload: blogTags,
})

export const getblogTagsFail = error => ({
  type: GET_BLOG_TAGS_FAIL,
  payload: error,
})
/* Get BlogTags END */

/* Add blogTag */
export const addblogTag = (tag, history) => ({
  type: ADD_BLOG_TAG,
  payload: { tag, history },
})

export const addblogTagFail = error => ({
  type: ADD_BLOG_TAG_FAIL,
  payload: error,
})

export const addblogTagSuccess = () => ({
  type: ADD_BLOG_TAG_SUCCESS,
})
/* Add BlogTag END */

/* Get BlogTag */
export const getblogTag = id => ({
  type: GET_BLOG_TAG,
  payload: id,
})

export const getblogTagFail = error => ({
  type: GET_BLOG_TAG_FAIL,
  payload: error,
})

export const getblogTagSuccess = category => ({
  type: GET_BLOG_TAG_SUCCESS,
  payload: category,
})
/* Get BlogTag END */

/* Update BlogTag */
export const putBlogTag = (data, history) => ({
  type: PUT_BLOG_TAG,
  payload: { data, history },
})

export const putBlogTagFail = error => ({
  type: PUT_BLOG_TAG_FAIL,
  payload: error,
})

export const putBlogTagSuccess = () => ({
  type: PUT_BLOG_TAG_SUCCESS,
})
/* Update BlogTag END */

/* Delete BlogTag */
export const deleteBlogTag = (data, callback) => ({
  type: DELETE_BLOG_TAG,
  payload: { data, callback },
})

export const deleteBlogTagFail = error => ({
  type: DELETE_BLOG_TAG_FAIL,
  payload: error,
})

export const deleteBlogTagSuccess = () => ({
  type: DELETE_BLOG_TAG_SUCCESS,
})
/* Delete BlogTag END */

/* Update Multi BlogTag Status */
export const putBlogTagsStatus = (data, callback) => ({
  type: PUT_BLOG_TAGS_STATUS,
  payload: { data, callback },
})

export const putBlogTagsStatusFail = error => ({
  type: PUT_BLOG_TAGS_STATUS_FAIL,
  payload: error,
})

export const putBlogTagsStatusSuccess = () => ({
  type: PUT_BLOG_TAGS_STATUS_SUCCESS,
})
/* Update Multi BlogTag Status END */
