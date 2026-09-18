import {
    PRODUCTS_BATCH_API_FAIL,
    GET_PRODUCTS_BATCH,
    GET_PRODUCTS_BATCH_SUCCESS,
    GET_PRODUCTS_BATCH_FAIL,
    ADD_PRODUCTS_BATCH,
    ADD_PRODUCTS_BATCH_SUCCESS,
    ADD_PRODUCTS_BATCH_FAIL,
    GET_PRODUCTS_BATCH_DETAIL,
    GET_PRODUCTS_BATCH_DETAIL_SUCCESS,
    GET_PRODUCTS_BATCH_DETAIL_FAIL

} from "./actionTypes"

export const apiFail = error => ({
    type: PRODUCTS_BATCH_API_FAIL,
    payload: error,
})

/* Get Products Batch */
export const getProductBatch = data => ({
    type: GET_PRODUCTS_BATCH,
    payload: data,
})

export const getProductBatchSuccess = promotions => ({
    type: GET_PRODUCTS_BATCH_SUCCESS,
    payload: promotions,
})

export const getProductBatchFail = error => ({
    type: GET_PRODUCTS_BATCH_FAIL,
    payload: error,
})

// Add Batch
export const addProductBatch = (promotion, filter, onSuccess) => ({
    type: ADD_PRODUCTS_BATCH,
    payload: { promotion, filter, onSuccess },
})

export const addProductBatchFail = error => ({
    type: ADD_PRODUCTS_BATCH_FAIL,
    payload: error,
})

export const addProductBatchSuccess = () => ({
    type: ADD_PRODUCTS_BATCH_SUCCESS,
})

// Add View
export const getProductBatchDetail = (id) => ({
    type: GET_PRODUCTS_BATCH_DETAIL,
    payload: id,
})

export const getProductBatchDetailFail = error => ({
    type: GET_PRODUCTS_BATCH_DETAIL_FAIL,
    payload: error,
})

export const getProductBatchDetailSuccess = (data) => ({
    type: GET_PRODUCTS_BATCH_DETAIL_SUCCESS,
    result: data
})
