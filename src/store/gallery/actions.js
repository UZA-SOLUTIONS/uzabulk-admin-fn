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

export const apiFail = error => ({
  type: GALLERY_API_FAIL,
  payload: error,
})

/* Get GALLERYs */
export const getGalleries = data => ({
  type: GET_GALLERIES,
  payload: data,
})

export const getGalleriesSuccess = galleries => ({
  type: GET_GALLERIES_SUCCESS,
  payload: galleries,
})

export const getGalleriesFail = error => ({
  type: GET_GALLERIES_FAIL,
  payload: error,
})
/* Get Galleries END */

/* Add Gallery */
export const addGallery = (gallery, history) => ({
  type: ADD_GALLERY,
  payload: { gallery, history },
})

export const addGalleryFail = error => ({
  type: ADD_GALLERY_FAIL,
  payload: error,
})

export const addGallerySuccess = () => ({
  type: ADD_GALLERY_SUCCESS,
})
/* Add Gallery END */

/* Get Gallery */
export const getGallery = id => ({
  type: GET_GALLERY,
  payload: id,
})

export const getGalleryFail = error => ({
  type: GET_GALLERY_FAIL,
  payload: error,
})

export const getGallerySuccess = gallery => ({
  type: GET_GALLERY_SUCCESS,
  payload: gallery,
})
/* Get Gallery END */

/* Update Gallery */
export const putGallery = (data, history) => ({
  type: PUT_GALLERY,
  payload: { data, history },
})

export const putGalleryFail = error => ({
  type: PUT_GALLERY_FAIL,
  payload: error,
})

export const putGallerySuccess = () => ({
  type: PUT_GALLERY_SUCCESS,
})
/* Update Gallery END */

/* Delete Gallery */
export const deleteGallery = (data, callback) => ({
  type: DELETE_GALLERY,
  payload: { data, callback },
})

export const deleteGalleryFail = error => ({
  type: DELETE_GALLERY_FAIL,
  payload: error,
})

export const deleteGallerySuccess = () => ({
  type: DELETE_GALLERY_SUCCESS,
})
/* Delete Faz END */

/* Update Multi Galleries Status */
export const putGalleriesStatus = (data, callback) => ({
  type: PUT_GALLERIES_STATUS,
  payload: { data, callback },
})

export const putGalleriesStatusFail = error => ({
  type: PUT_GALLERIES_STATUS_FAIL,
  payload: error,
})

export const putGalleriesStatusSuccess = () => ({
  type: PUT_GALLERIES_STATUS_SUCCESS,
})
/* Update Multi Galleries Status END */
