import {
  FD_RESTAURANT_API_FAIL,
  GET_FD_RESTAURANTS,
  GET_FD_RESTAURANTS_FAIL,
  GET_FD_RESTAURANTS_SUCCESS,
  ADD_FD_RESTAURANT,
  ADD_FD_RESTAURANT_FAIL,
  ADD_FD_RESTAURANT_SUCCESS,
  GET_FD_RESTAURANT,
  GET_FD_RESTAURANT_FAIL,
  GET_FD_RESTAURANT_SUCCESS,
  PUT_FD_RESTAURANT,
  PUT_FD_RESTAURANT_FAIL,
  PUT_FD_RESTAURANT_SUCCESS,
  DELETE_FD_RESTAURANT,
  DELETE_FD_RESTAURANT_FAIL,
  DELETE_FD_RESTAURANT_SUCCESS,
  CLONE_FD_RESTAURANT,
  CLONE_FD_RESTAURANT_FAIL,
  CLONE_FD_RESTAURANT_SUCCESS,
  PUT_FD_RESTAURANTS_STATUS,
  PUT_FD_RESTAURANTS_STATUS_FAIL,
  PUT_FD_RESTAURANTS_STATUS_SUCCESS,
  PUT_FD_RESTAURANT_SETTINGS,
  PUT_FD_RESTAURANT_SETTINGS_SUCCESS,
  PUT_FD_RESTAURANT_SETTINGS_FAIL,
  POST_FD_RESTAURANT_PAY,
  POST_FD_RESTAURANT_PAY_SUCCESS,
  POST_FD_RESTAURANT_PAY_FAIL,
  POST_FD_RESTAURANT_PAY_ADJUSTMENT,
  POST_FD_RESTAURANT_PAY_ADJUSTMENT_SUCCESS,
  POST_FD_RESTAURANT_PAY_ADJUSTMENT_FAIL,
  EXPORT_FD_RESTAURANTS,
  EXPORT_FD_RESTAURANTS_SUCCESS,
  EXPORT_FD_RESTAURANTS_FAIL,
  IMPORT_FD_RESTAURANTS,
  IMPORT_FD_RESTAURANTS_SUCCESS,
  IMPORT_FD_RESTAURANTS_FAIL,
  DELETE_FD_VENDOR_STRIPE_CONNECT,
  DELETE_FD_VENDOR_STRIPE_CONNECT_SUCCESS,
  DELETE_FD_VENDOR_STRIPE_CONNECT_FAIL,
  GET_FD_RESTAURANT_POST,
  GET_FD_RESTAURANT_POST_FAIL,
  GET_FD_RESTAURANT_POST_SUCCESS,
} from "./actionTypes"
/* Document */
import {
  GET_FD_RESTAURANT_DOCUMENTS,
  GET_FD_RESTAURANT_DOCUMENTS_FAIL,
  GET_FD_RESTAURANT_DOCUMENTS_SUCCESS,
  POST_FD_RESTAURANT_DOCUMENT,
  POST_FD_RESTAURANT_DOCUMENT_FAIL,
  POST_FD_RESTAURANT_DOCUMENT_SUCCESS,
  GET_FD_RESTAURANT_DOCUMENT,
  GET_FD_RESTAURANT_DOCUMENT_FAIL,
  GET_FD_RESTAURANT_DOCUMENT_SUCCESS,
  PUT_FD_RESTAURANT_DOCUMENT,
  PUT_FD_RESTAURANT_DOCUMENT_FAIL,
  PUT_FD_RESTAURANT_DOCUMENT_SUCCESS,
  DELETE_FD_RESTAURANT_DOCUMENT,
  DELETE_FD_RESTAURANT_DOCUMENT_FAIL,
  DELETE_FD_RESTAURANT_DOCUMENT_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: FD_RESTAURANT_API_FAIL,
  payload: error,
})

/* Get Food Delivery Restaurants */
export const getFdRestaurants = (storeType, data) => ({
  type: GET_FD_RESTAURANTS,
  payload: { storeType, data },
})

export const getFdRestaurantsSuccess = fdRestaurants => ({
  type: GET_FD_RESTAURANTS_SUCCESS,
  payload: fdRestaurants,
})

export const getFdRestaurantsFail = error => ({
  type: GET_FD_RESTAURANTS_FAIL,
  payload: error,
})
/* Get Food Delivery Restaurants END */

/* Add Food Delivery Restaurants */
export const addFdRestaurant = (storeType, fdRestaurant, callback) => ({
  type: ADD_FD_RESTAURANT,
  payload: { storeType, fdRestaurant, callback },
})

export const addFdRestaurantFail = error => ({
  type: ADD_FD_RESTAURANT_FAIL,
  payload: error,
})

export const addFdRestaurantSuccess = () => ({
  type: ADD_FD_RESTAURANT_SUCCESS,
})
/* Add Food Delivery Restaurants END */

/* Get Food Delivery Restaurants */
export const getFdRestaurant = (storeType, id) => ({
  type: GET_FD_RESTAURANT,
  payload: { storeType, id },
})

export const getFdRestaurantFail = error => ({
  type: GET_FD_RESTAURANT_FAIL,
  payload: error,
})

export const getFdRestaurantSuccess = fdRestaurant => ({
  type: GET_FD_RESTAURANT_SUCCESS,
  payload: fdRestaurant,
})


// For post method purposes only

export const getFdRestaurantPost = (data, id, callback) => ({
  type: GET_FD_RESTAURANT_POST,
  payload: { data, id, callback },
})

export const getFdRestaurantPostFail = error => ({
  type: GET_FD_RESTAURANT_POST_FAIL,
  payload: error,
})

export const getFdRestaurantPostSuccess = fdRestaurant => ({
  type: GET_FD_RESTAURANT_POST_SUCCESS,
  payload: fdRestaurant,
})


/* Get Food Delivery Restaurants END */

/* Update Food Delivery Restaurants */
export const putFdRestaurant = (storeType, data, history) => ({
  type: PUT_FD_RESTAURANT,
  payload: { storeType, data, history },
})

export const putFdRestaurantFail = error => ({
  type: PUT_FD_RESTAURANT_FAIL,
  payload: error,
})

export const putFdRestaurantSuccess = fdRestaurant => ({
  type: PUT_FD_RESTAURANT_SUCCESS,
  payload: fdRestaurant,
})
/* Update Food Delivery Restaurants END */

/* Delete Food Delivery Restaurants */
export const deleteFdRestaurant = (storeType, data, callback) => ({
  type: DELETE_FD_RESTAURANT,
  payload: { storeType, data, callback },
})

export const deleteFdRestaurantFail = error => ({
  type: DELETE_FD_RESTAURANT_FAIL,
  payload: error,
})

export const deleteFdRestaurantSuccess = () => ({
  type: DELETE_FD_RESTAURANT_SUCCESS,
})
/* Delete Food Delivery Restaurants END */

/* Clone Food Delivery Restaurants */
export const cloneFdRestaurant = (storeType, data, callback) => ({
  type: CLONE_FD_RESTAURANT,
  payload: { storeType, data, callback },
})

export const cloneFdRestaurantFail = error => ({
  type: CLONE_FD_RESTAURANT_FAIL,
  payload: error,
})

export const cloneFdRestaurantSuccess = () => ({
  type: CLONE_FD_RESTAURANT_SUCCESS,
})
/* Clone Food Delivery Restaurants END */

/* Update Multi Food Delivery Restaurants Status */
export const putFdRestaurantsStatus = (storeType, data, callback) => ({
  type: PUT_FD_RESTAURANTS_STATUS,
  payload: { storeType, data, callback },
})

export const putFdRestaurantsStatusFail = error => ({
  type: PUT_FD_RESTAURANTS_STATUS_FAIL,
  payload: error,
})

export const putFdRestaurantsStatusSuccess = () => ({
  type: PUT_FD_RESTAURANTS_STATUS_SUCCESS,
})
/* Update Multi Food Delivery Restaurants Status END */

/* Update Food Delivery Vendor Settings */
export const putFdRestaurantSettings = (storeType, data) => ({
  type: PUT_FD_RESTAURANT_SETTINGS,
  payload: { storeType, data },
})

export const putFdRestaurantSettingsSuccess = (data, message) => ({
  type: PUT_FD_RESTAURANT_SETTINGS_SUCCESS,
  payload: { data, message },
})

export const putFdRestaurantSettingsFail = error => ({
  type: PUT_FD_RESTAURANT_SETTINGS_FAIL,
  payload: error,
})
/* Update Food Delivery Vendor Settings END */

/* Post Food Delivery Vendor Pay */
export const postFdRestaurantPay = (data, callback) => ({
  type: POST_FD_RESTAURANT_PAY,
  payload: { data, callback },
})

export const postFdRestaurantPayFail = error => ({
  type: POST_FD_RESTAURANT_PAY_FAIL,
  payload: error,
})

export const postFdRestaurantPaySuccess = () => ({
  type: POST_FD_RESTAURANT_PAY_SUCCESS,
})

export const postFdRestaurantPayAdjustment = (data, callback) => ({
  type: POST_FD_RESTAURANT_PAY_ADJUSTMENT,
  payload: { data, callback },
})

export const postFdRestaurantPayAdjustmentFail = error => ({
  type: POST_FD_RESTAURANT_PAY_ADJUSTMENT_FAIL,
  payload: error,
})

export const postFdRestaurantPayAdjustmentSuccess = () => ({
  type: POST_FD_RESTAURANT_PAY_ADJUSTMENT_SUCCESS,
})
/* Post Food Delivery Vendor Pay END */

/* Document */
/* Get Food Delivery Restaurants Documents */
export const getFdRestaurantDocuments = data => ({
  type: GET_FD_RESTAURANT_DOCUMENTS,
  payload: data,
})

export const getFdRestaurantDocumentsFail = error => ({
  type: GET_FD_RESTAURANT_DOCUMENTS_FAIL,
  payload: error,
})

export const getFdRestaurantDocumentsSuccess = documents => ({
  type: GET_FD_RESTAURANT_DOCUMENTS_SUCCESS,
  payload: documents,
})
/* Get Food Delivery Restaurants END */

/* Add Food Delivery Restaurant Document */
export const postFdRestaurantDocument = (document, history) => ({
  type: POST_FD_RESTAURANT_DOCUMENT,
  payload: { document, history },
})

export const postFdRestaurantDocumentFail = error => ({
  type: POST_FD_RESTAURANT_DOCUMENT_FAIL,
  payload: error,
})

export const postFdRestaurantDocumentSuccess = () => ({
  type: POST_FD_RESTAURANT_DOCUMENT_SUCCESS,
})
/* Add Food Delivery Restaurants END */

/* Get Food Delivery Restaurants */
export const getFdRestaurantDocument = id => ({
  type: GET_FD_RESTAURANT_DOCUMENT,
  payload: { id },
})

export const getFdRestaurantDocumentFail = error => ({
  type: GET_FD_RESTAURANT_DOCUMENT_FAIL,
  payload: error,
})

export const getFdRestaurantDocumentSuccess = document => ({
  type: GET_FD_RESTAURANT_DOCUMENT_SUCCESS,
  payload: document,
})
/* Get Food Delivery Restaurants END */

/* Update Food Delivery Restaurants */
export const putFdRestaurantDocument = (data, history) => ({
  type: PUT_FD_RESTAURANT_DOCUMENT,
  payload: { data, history },
})

export const putFdRestaurantDocumentFail = error => ({
  type: PUT_FD_RESTAURANT_DOCUMENT_FAIL,
  payload: error,
})

export const putFdRestaurantDocumentSuccess = () => ({
  type: PUT_FD_RESTAURANT_DOCUMENT_SUCCESS,
})
/* Update Food Delivery Restaurants END */

/* Delete Food Delivery Restaurants */
export const deleteFdRestaurantDocument = (data, callback) => ({
  type: DELETE_FD_RESTAURANT_DOCUMENT,
  payload: { data, callback },
})

export const deleteFdRestaurantDocumentFail = error => ({
  type: DELETE_FD_RESTAURANT_DOCUMENT_FAIL,
  payload: error,
})

export const deleteFdRestaurantDocumentSuccess = () => ({
  type: DELETE_FD_RESTAURANT_DOCUMENT_SUCCESS,
})
/* Delete Food Delivery Restaurants END */

/* Export restaurants */
export const exportFdRestaurants = storeType => ({
  type: EXPORT_FD_RESTAURANTS,
  payload: storeType,
})

export const exportFdRestaurantsSuccess = () => ({
  type: EXPORT_FD_RESTAURANTS_SUCCESS,
})

export const exportFdRestaurantsFail = error => ({
  type: EXPORT_FD_RESTAURANTS_FAIL,
  payload: error,
})
/* Export restaurants END */

/* Import restaurants */
export const importFdRestaurants = (data, callback) => ({
  type: IMPORT_FD_RESTAURANTS,
  payload: { data, callback },
})

export const importFdRestaurantsSuccess = success => ({
  type: IMPORT_FD_RESTAURANTS_SUCCESS,
  payload: success,
})

export const importFdRestaurantsFail = error => ({
  type: IMPORT_FD_RESTAURANTS_FAIL,
  payload: error,
})
/* Import restaurants END */

/* Delete Strip Connect */
export const deleteFdRestaurantStripeConnect = (id, callback) => ({
  type: DELETE_FD_VENDOR_STRIPE_CONNECT,
  payload: { id, callback },
})

export const deleteFdRestaurantStripeConnectSuccess = () => ({
  type: DELETE_FD_VENDOR_STRIPE_CONNECT_SUCCESS,
})

export const deleteFdRestaurantStripeConnectFail = error => ({
  type: DELETE_FD_VENDOR_STRIPE_CONNECT_FAIL,
  payload: error,
})
/* Delete Stripe Connect END */
