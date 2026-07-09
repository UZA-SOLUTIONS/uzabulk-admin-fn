import { GET_USER_ORDERS, GET_USER_ORDERS_FAIL, GET_USER_ORDERS_SUCCESS, GET_USER_REVIEWS, GET_USER_REVIEWS_FAIL, GET_USER_REVIEWS_SUCCESS } from "./actionTypes"

const INIT_STATE = {
    loading: false,
    reviewsList: [],
    orderList: [],
    error: "",
    totalReview: 0,
    totalOrder: 0
}

const reviewSaga = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_USER_REVIEWS:
            return {
                ...state,
                loading: true,
            }
        case GET_USER_REVIEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                reviewsList: action.payload.data,
                totalReview: action.payload.totalcount
            }
        case GET_USER_REVIEWS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_USER_ORDERS:
            return {
                ...state,
                loading: true,
            }
        case GET_USER_ORDERS_SUCCESS:
            console.log(action.payload, "action.payloadaction.payload")
            return {
                ...state,
                loading: false,
                orderList: action.payload.data,
                totalOrder: action.payload.totalcount
            }
        case GET_USER_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }

}

export default reviewSaga