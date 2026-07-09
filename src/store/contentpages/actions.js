import {
  CONTENT_PAGE_API_FAIL,
  GET_CONTENT_PAGES,
  GET_CONTENT_PAGES_FAIL,
  GET_CONTENT_PAGES_SUCCESS,
  ADD_CONTENT_PAGE,
  ADD_CONTENT_PAGE_FAIL,
  ADD_CONTENT_PAGE_SUCCESS,
  GET_CONTENT_PAGE,
  GET_CONTENT_PAGE_FAIL,
  GET_CONTENT_PAGE_SUCCESS,
  PUT_CONTENT_PAGE,
  PUT_CONTENT_PAGE_FAIL,
  PUT_CONTENT_PAGE_SUCCESS,
  DELETE_CONTENT_PAGE,
  DELETE_CONTENT_PAGE_FAIL,
  DELETE_CONTENT_PAGE_SUCCESS,
  PUT_CONTENT_PAGES_STATUS,
  PUT_CONTENT_PAGES_STATUS_FAIL,
  PUT_CONTENT_PAGES_STATUS_SUCCESS,
} from "./actionTypes"

/* Document template files */
import {
  ADD_CONTENT_PAGE_FIELD,
  ADD_CONTENT_PAGE_FIELD_FAIL,
  ADD_CONTENT_PAGE_FIELD_SUCCESS,
  GET_CONTENT_PAGE_FIELD,
  GET_CONTENT_PAGE_FIELD_FAIL,
  GET_CONTENT_PAGE_FIELD_SUCCESS,
  PUT_CONTENT_PAGE_FIELD,
  PUT_CONTENT_PAGE_FIELD_FAIL,
  PUT_CONTENT_PAGE_FIELD_SUCCESS,
  DELETE_CONTENT_PAGE_FIELD,
  DELETE_CONTENT_PAGE_FIELD_FAIL,
  DELETE_CONTENT_PAGE_FIELD_SUCCESS,
  PUT_CONTENT_PAGE_FIELD_SORT,
  PUT_CONTENT_PAGE_FIELD_SORT_FAIL,
  PUT_CONTENT_PAGE_FIELD_SORT_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: CONTENT_PAGE_API_FAIL,
  payload: error,
})

/* Get CONTENT_PAGEs */
export const getContentPages = data => ({
  type: GET_CONTENT_PAGES,
  payload: data,
})

export const getContentPagesSuccess = contentPages => ({
  type: GET_CONTENT_PAGES_SUCCESS,
  payload: contentPages,
})

export const getContentPagesFail = error => ({
  type: GET_CONTENT_PAGES_FAIL,
  payload: error,
})
/* Get ContentPages END */

/* Add ContentPage */
export const addContentPage = (contentPage, history) => ({
  type: ADD_CONTENT_PAGE,
  payload: { contentPage, history },
})

export const addContentPageFail = error => ({
  type: ADD_CONTENT_PAGE_FAIL,
  payload: error,
})

export const addContentPageSuccess = () => ({
  type: ADD_CONTENT_PAGE_SUCCESS,
})
/* Add ContentPage END */

/* Get ContentPage */
export const getContentPage = id => ({
  type: GET_CONTENT_PAGE,
  payload: id,
})

export const getContentPageFail = error => ({
  type: GET_CONTENT_PAGE_FAIL,
  payload: error,
})

export const getContentPageSuccess = contentPage => ({
  type: GET_CONTENT_PAGE_SUCCESS,
  payload: contentPage,
})
/* Get ContentPage END */

/* Update ContentPage */
export const putContentPage = (data, history) => ({
  type: PUT_CONTENT_PAGE,
  payload: { data, history },
})

export const putContentPageFail = error => ({
  type: PUT_CONTENT_PAGE_FAIL,
  payload: error,
})

export const putContentPageSuccess = (data) => ({
  type: PUT_CONTENT_PAGE_SUCCESS,
  payload: data
})
/* Update ContentPage END */

/* Delete ContentPage */
export const deleteContentPage = (data, callback) => ({
  type: DELETE_CONTENT_PAGE,
  payload: { data, callback },
})

export const deleteContentPageFail = error => ({
  type: DELETE_CONTENT_PAGE_FAIL,
  payload: error,
})

export const deleteContentPageSuccess = () => ({
  type: DELETE_CONTENT_PAGE_SUCCESS,
})
/* Delete Faz END */

/* Update Multi ContentPages Status */
export const putContentPagesStatus = (data, callback) => ({
  type: PUT_CONTENT_PAGES_STATUS,
  payload: { data, callback },
})

export const putContentPagesStatusFail = error => ({
  type: PUT_CONTENT_PAGES_STATUS_FAIL,
  payload: error,
})

export const putContentPagesStatusSuccess = () => ({
  type: PUT_CONTENT_PAGES_STATUS_SUCCESS,
})
/* Update Multi ContentPages Status END */

/* 
****************
Fields
****************
*/
/* Add ContentPage Field */
export const addContentPageField = (contentPageField, history) => ({
  type: ADD_CONTENT_PAGE_FIELD,
  payload: { contentPageField, history },
})

export const addContentPageFieldFail = error => ({
  type: ADD_CONTENT_PAGE_FIELD_FAIL,
  payload: error,
})

export const addContentPageFieldSuccess = () => ({
  type: ADD_CONTENT_PAGE_FIELD_SUCCESS,
})
/* Add ContentPage END */

/* Get ContentPage Field */
export const getContentPageField = id => ({
  type: GET_CONTENT_PAGE_FIELD,
  payload: id,
})

export const getContentPageFieldFail = error => ({
  type: GET_CONTENT_PAGE_FIELD_FAIL,
  payload: error,
})

export const getContentPageFieldSuccess = contentPage => ({
  type: GET_CONTENT_PAGE_FIELD_SUCCESS,
  payload: contentPage,
})
/* Get ContentPage Field END */

/* Update ContentPage Field */
export const putContentPageField = (data, history) => ({
  type: PUT_CONTENT_PAGE_FIELD,
  payload: { data, history },
})

export const putContentPageFieldFail = error => ({
  type: PUT_CONTENT_PAGE_FIELD_FAIL,
  payload: error,
})

export const putContentPageFieldSuccess = () => ({
  type: PUT_CONTENT_PAGE_FIELD_SUCCESS,
})
/* Update ContentPage Field END */

/* Delete ContentPage Field */
export const deleteContentPageField = (data, callback) => ({
  type: DELETE_CONTENT_PAGE_FIELD,
  payload: { data, callback },
})

export const deleteContentPageFieldFail = error => ({
  type: DELETE_CONTENT_PAGE_FIELD_FAIL,
  payload: error,
})

export const deleteContentPageFieldSuccess = () => ({
  type: DELETE_CONTENT_PAGE_FIELD_SUCCESS,
})
/* Delete ContentPage Field END */

/* Update doc template sort order */
export const putContentPageFieldSort = (data, id) => ({
  type: PUT_CONTENT_PAGE_FIELD_SORT,
  payload: { data, id },
})

export const putContentPageFieldSortFail = error => ({
  type: PUT_CONTENT_PAGE_FIELD_SORT_FAIL,
  payload: error,
})

export const putContentPageFieldSortSuccess = () => ({
  type: PUT_CONTENT_PAGE_FIELD_SORT_SUCCESS,
})
/* Update doc template sort order */
