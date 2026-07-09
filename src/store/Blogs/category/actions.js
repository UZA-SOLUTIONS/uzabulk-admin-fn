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

export const apiFail = error => ({
  type: BLOG_CATEGORY_API_FAIL,
  payload: error,
})

/* Get blogCategories */
export const getblogCategories = data => ({
  type: GET_BLOG_CATEGORIES,
  payload: data,
})

export const getblogCategoriesSuccess = blogCategories => ({
  type: GET_BLOG_CATEGORIES_SUCCESS,
  payload: blogCategories,
})

export const getblogCategoriesFail = error => ({
  type: GET_BLOG_CATEGORIES_FAIL,
  payload: error,
})
/* Get BlogCategories END */

/* Add blogCategory */
export const addBlogCategory = (category, history) => ({
  type: ADD_BLOG_CATEGORY,
  payload: { category, history },
})

export const addBlogCategoryFail = error => ({
  type: ADD_BLOG_CATEGORY_FAIL,
  payload: error,
})

export const addBlogCategorySuccess = () => ({
  type: ADD_BLOG_CATEGORY_SUCCESS,
})
/* Add BlogCategory END */

/* Get BlogCAtegory */
export const getblogCategory = id => ({
  type: GET_BLOG_CATEGORY,
  payload: id,
})

export const getblogCategoryFail = error => ({
  type: GET_BLOG_CATEGORY_FAIL,
  payload: error,
})

export const getblogCategorySuccess = category => ({
  type: GET_BLOG_CATEGORY_SUCCESS,
  payload: category,
})
/* Get BlogCAtegory END */

/* Update BlogCategory */
export const putBlogCategory = (data, history) => ({
  type: PUT_BLOG_CATEGORY,
  payload: { data, history },
})

export const putBlogCategoryFail = error => ({
  type: PUT_BLOG_CATEGORY_FAIL,
  payload: error,
})

export const putBlogCategorySuccess = () => ({
  type: PUT_BLOG_CATEGORY_SUCCESS,
})
/* Update BlogCategory END */

/* Delete BlogCategory */
export const deleteBlogCategory = (data, callback) => ({
  type: DELETE_BLOG_CATEGORY,
  payload: { data, callback },
})

export const deleteBlogCategoryFail = error => ({
  type: DELETE_BLOG_CATEGORY_FAIL,
  payload: error,
})

export const deleteBlogCategorySuccess = () => ({
  type: DELETE_BLOG_CATEGORY_SUCCESS,
})
/* Delete BlogCategory END */

/* Update Multi BlogCategory Status */
export const putBlogCategoriesStatus = (data, callback) => ({
  type: PUT_BLOG_CATEGORIES_STATUS,
  payload: { data, callback },
})

export const putBlogCategoriesStatusFail = error => ({
  type: PUT_BLOG_CATEGORIES_STATUS_FAIL,
  payload: error,
})

export const putBlogCategoriesStatusSuccess = () => ({
  type: PUT_BLOG_CATEGORIES_STATUS_SUCCESS,
})
/* Update Multi BlogCategory Status END */
