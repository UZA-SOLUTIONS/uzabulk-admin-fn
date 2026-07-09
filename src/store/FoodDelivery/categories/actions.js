import {
  FD_CATEGORY_API_FAIL,
  GET_FD_CATEGORIES,
  GET_FD_CATEGORIES_FAIL,
  GET_FD_CATEGORIES_SUCCESS,
  ADD_FD_CATEGORY,
  ADD_FD_CATEGORY_FAIL,
  ADD_FD_CATEGORY_SUCCESS,
  GET_FD_CATEGORY,
  GET_FD_CATEGORY_FAIL,
  GET_FD_CATEGORY_SUCCESS,
  PUT_FD_CATEGORY,
  PUT_FD_CATEGORY_FAIL,
  PUT_FD_CATEGORY_SUCCESS,
  DELETE_FD_CATEGORY,
  DELETE_FD_CATEGORY_FAIL,
  DELETE_FD_CATEGORY_SUCCESS,
  PUT_FD_CATEGORIES_STATUS,
  PUT_FD_CATEGORIES_STATUS_FAIL,
  PUT_FD_CATEGORIES_STATUS_SUCCESS,
  PUT_FD_CATEGORY_SORT,
  PUT_FD_CATEGORY_SORT_FAIL,
  PUT_FD_CATEGORY_SORT_SUCCESS,
  EXPORT_FD_CATEGORIES,
  EXPORT_FD_CATEGORIES_SUCCESS,
  EXPORT_FD_CATEGORIES_FAIL,
} from "./actionTypes"

export const apiFail = error => ({
  type: FD_CATEGORY_API_FAIL,
  payload: error,
})

/* Get Food Delivery Categories */
export const getFdCategories = (storeType, data, ownLoader = false) => ({
  type: GET_FD_CATEGORIES,
  payload: { storeType, data, ownLoader },
})

export const getFdCategoriesSuccess = fdCategories => ({
  type: GET_FD_CATEGORIES_SUCCESS,
  payload: fdCategories,
})

export const getFdCategoriesFail = error => ({
  type: GET_FD_CATEGORIES_FAIL,
  payload: error,
})
/* Get Food Delivery Categories END */

/* Add Food Delivery Categories */
export const addFdCategory = (storeType, fdCategory, history) => ({
  type: ADD_FD_CATEGORY,
  payload: { storeType, fdCategory, history },
})

export const addFdCategoryFail = error => ({
  type: ADD_FD_CATEGORY_FAIL,
  payload: error,
})

export const addFdCategorySuccess = () => ({
  type: ADD_FD_CATEGORY_SUCCESS,
})
/* Add Food Delivery Categories END */

/* Get Food Delivery Categories */
export const getFdCategory = (storeType, id) => ({
  type: GET_FD_CATEGORY,
  payload: { storeType, id },
})

export const getFdCategoryFail = error => ({
  type: GET_FD_CATEGORY_FAIL,
  payload: error,
})

export const getFdCategorySuccess = fdCategory => ({
  type: GET_FD_CATEGORY_SUCCESS,
  payload: fdCategory,
})
/* Get Food Delivery Categories END */

/* Update Food Delivery Categories */
export const putFdCategory = (storeType, data, history) => ({
  type: PUT_FD_CATEGORY,
  payload: { storeType, data, history },
})

export const putFdCategoryFail = error => ({
  type: PUT_FD_CATEGORY_FAIL,
  payload: error,
})

export const putFdCategorySuccess = () => ({
  type: PUT_FD_CATEGORY_SUCCESS,
})
/* Update Food Delivery Categories END */

/* Delete Food Delivery Categories */
export const deleteFdCategory = (storeType, data, callback) => ({
  type: DELETE_FD_CATEGORY,
  payload: { storeType, data, callback },
})

export const deleteFdCategoryFail = error => ({
  type: DELETE_FD_CATEGORY_FAIL,
  payload: error,
})

export const deleteFdCategorySuccess = () => ({
  type: DELETE_FD_CATEGORY_SUCCESS,
})
/* Delete Food Delivery Categories END */

/* Update Multi Food Delivery Categories Status */
export const putFdCategoriesStatus = (storeType, data, callback) => ({
  type: PUT_FD_CATEGORIES_STATUS,
  payload: { storeType, data, callback },
})

export const putFdCategoriesStatusFail = error => ({
  type: PUT_FD_CATEGORIES_STATUS_FAIL,
  payload: error,
})

export const putFdCategoriesStatusSuccess = () => ({
  type: PUT_FD_CATEGORIES_STATUS_SUCCESS,
})
/* Update Multi Food Delivery Categories Status END */

/* Update category sort order */
export const putFdCategorySort = (storeType, data, filter) => ({
  type: PUT_FD_CATEGORY_SORT,
  payload: { data, filter, storeType },
})

export const putFdCategorySortFail = error => ({
  type: PUT_FD_CATEGORY_SORT_FAIL,
  payload: error,
})

export const putFdCategorySortSuccess = () => ({
  type: PUT_FD_CATEGORY_SORT_SUCCESS,
})
/* Update category sort order */

/* Export categories */
export const exportFdCategories = (storeType, id) => ({
  type: EXPORT_FD_CATEGORIES,
  payload: { storeType, id },
})

export const exportFdCategoriesSuccess = () => ({
  type: EXPORT_FD_CATEGORIES_SUCCESS,
})

export const exportFdCategoriesFail = error => ({
  type: EXPORT_FD_CATEGORIES_FAIL,
  payload: error,
})
/* Export categories END */
