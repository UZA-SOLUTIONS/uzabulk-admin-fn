import {
  FD_PRODUCT_API_FAIL,
  GET_FD_PRODUCTS,
  GET_FD_PRODUCTS_FAIL,
  GET_FD_PRODUCTS_SUCCESS,
  ADD_FD_PRODUCT,
  ADD_FD_PRODUCT_FAIL,
  ADD_FD_PRODUCT_SUCCESS,
  GET_FD_PRODUCT,
  GET_FD_PRODUCT_FAIL,
  GET_FD_PRODUCT_SUCCESS,
  PUT_FD_PRODUCT,
  PUT_FD_PRODUCT_FAIL,
  PUT_FD_PRODUCT_SUCCESS,
  DELETE_FD_PRODUCT,
  DELETE_FD_PRODUCT_FAIL,
  DELETE_FD_PRODUCT_SUCCESS,
  PUT_FD_PRODUCTS_STATUS,
  PUT_FD_PRODUCTS_STATUS_FAIL,
  PUT_FD_PRODUCTS_STATUS_SUCCESS,
  EXPORT_FD_PRODUCTS,
  EXPORT_FD_PRODUCTS_SUCCESS,
  EXPORT_FD_PRODUCTS_FAIL,
  IMPORT_FD_PRODUCTS,
  IMPORT_FD_PRODUCTS_SUCCESS,
  IMPORT_FD_PRODUCTS_FAIL,
  IMPORT_FD_PRODUCTS_VARIATIONS,
  IMPORT_FD_PRODUCTS_VARIATIONS_SUCCESS,
  IMPORT_FD_PRODUCTS_VARIATIONS_FAIL,
  IMPORT_FD_PRODUCTS_COMBINE,
  IMPORT_FD_PRODUCTS_COMBINE_SUCCESS,
  IMPORT_FD_PRODUCTS_COMBINE_FAIL,
} from "./actionTypes"

export const apiFail = error => ({
  type: FD_PRODUCT_API_FAIL,
  payload: error,
})

/* Get Food Delivery Products */
export const getFdProducts = (storeType, data) => ({
  type: GET_FD_PRODUCTS,
  payload: { storeType, data },
})

export const getFdProductsSuccess = fdProducts => ({
  type: GET_FD_PRODUCTS_SUCCESS,
  payload: fdProducts,
})

export const getFdProductsFail = error => ({
  type: GET_FD_PRODUCTS_FAIL,
  payload: error,
})
/* Get Food Delivery Products END */

/* Add Food Delivery Products */
export const addFdProduct = (storeType, fdProduct, history) => ({
  type: ADD_FD_PRODUCT,
  payload: { storeType, fdProduct, history },
})

export const addFdProductFail = error => ({
  type: ADD_FD_PRODUCT_FAIL,
  payload: error,
})

export const addFdProductSuccess = () => ({
  type: ADD_FD_PRODUCT_SUCCESS,
})
/* Add Food Delivery Products END */

/* Get Food Delivery Products */
export const getFdProduct = (storeType, id) => ({
  type: GET_FD_PRODUCT,
  payload: { storeType, id },
})

export const getFdProductFail = error => ({
  type: GET_FD_PRODUCT_FAIL,
  payload: error,
})

export const getFdProductSuccess = fdProduct => ({
  type: GET_FD_PRODUCT_SUCCESS,
  payload: fdProduct,
})
/* Get Food Delivery Products END */

/* Update Food Delivery Products */
export const putFdProduct = (storeType, data, history) => ({
  type: PUT_FD_PRODUCT,
  payload: { storeType, data, history },
})

export const putFdProductFail = error => ({
  type: PUT_FD_PRODUCT_FAIL,
  payload: error,
})

export const putFdProductSuccess = () => ({
  type: PUT_FD_PRODUCT_SUCCESS,
})
/* Update Food Delivery Products END */

/* Delete Food Delivery Products */
export const deleteFdProduct = (storeType, data, callback) => ({
  type: DELETE_FD_PRODUCT,
  payload: { storeType, data, callback },
})

export const deleteFdProductFail = error => ({
  type: DELETE_FD_PRODUCT_FAIL,
  payload: error,
})

export const deleteFdProductSuccess = () => ({
  type: DELETE_FD_PRODUCT_SUCCESS,
})
/* Delete Food Delivery Products END */

/* Update Multi Food Delivery Products Status */
export const putFdProductsStatus = (storeType, data, callback) => ({
  type: PUT_FD_PRODUCTS_STATUS,
  payload: { storeType, data, callback },
})

export const putFdProductsStatusFail = error => ({
  type: PUT_FD_PRODUCTS_STATUS_FAIL,
  payload: error,
})

export const putFdProductsStatusSuccess = () => ({
  type: PUT_FD_PRODUCTS_STATUS_SUCCESS,
})
/* Update Multi Food Delivery Products Status END */

/* Export products */
export const exportFdProducts = (storeType, id) => ({
  type: EXPORT_FD_PRODUCTS,
  payload: { storeType, id },
})

export const exportFdProductsSuccess = () => ({
  type: EXPORT_FD_PRODUCTS_SUCCESS,
})

export const exportFdProductsFail = error => ({
  type: EXPORT_FD_PRODUCTS_FAIL,
  payload: error,
})
/* Export products END */

/* Import restaurants */
export const importFdProducts = (data, callback) => ({
  type: IMPORT_FD_PRODUCTS,
  payload: { data, callback },
})

export const importFdProductsSuccess = success => ({
  type: IMPORT_FD_PRODUCTS_SUCCESS,
  payload: success,
})

export const importFdProductsFail = error => ({
  type: IMPORT_FD_PRODUCTS_FAIL,
  payload: error,
})
/* Import restaurants END */

/* Import restaurants Variations */
export const importFdProductsVariations = (data, callback) => ({
  type: IMPORT_FD_PRODUCTS_VARIATIONS,
  payload: { data, callback },
})

export const importFdProductsVariationsSuccess = success => ({
  type: IMPORT_FD_PRODUCTS_VARIATIONS_SUCCESS,
  payload: success,
})

export const importFdProductsVariationsFail = error => ({
  type: IMPORT_FD_PRODUCTS_VARIATIONS_FAIL,
  payload: error,
})
/* Import restaurants END */

/* Import restaurants Combine */
export const importFdProductsCombine = (data, callback) => ({
  type: IMPORT_FD_PRODUCTS_COMBINE,
  payload: { data, callback },
})

export const importFdProductsCombineSuccess = success => ({
  type: IMPORT_FD_PRODUCTS_COMBINE_SUCCESS,
  payload: success,
})

export const importFdProductsCombineFail = error => ({
  type: IMPORT_FD_PRODUCTS_COMBINE_FAIL,
  payload: error,
})
/* Import restaurants Combine END */
