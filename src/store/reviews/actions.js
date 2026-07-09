import { GET_USER_ORDERS, GET_USER_ORDERS_FAIL, GET_USER_ORDERS_SUCCESS, GET_USER_REVIEWS, GET_USER_REVIEWS_FAIL, GET_USER_REVIEWS_SUCCESS } from "./actionTypes"

export const getUserReview = (data, query) => ({
    type: GET_USER_REVIEWS,
    payload: { data, query }
})
export const getUserReviewSuccess = (data) => ({
    type: GET_USER_REVIEWS_SUCCESS,
    payload: data
})
export const getUserReviewFail = (err) => ({
    type: GET_USER_REVIEWS_FAIL,
    payload: err
})

export const getUserOrder = (data, query) => ({
    type: GET_USER_ORDERS,
    payload: { data, query }
})
export const getUserOrderSuccess = (data) => ({
    type: GET_USER_ORDERS_SUCCESS,
    payload: data
})
export const getUserOrderFail = (err) => ({
    type: GET_USER_ORDERS_FAIL,
    payload: err
})