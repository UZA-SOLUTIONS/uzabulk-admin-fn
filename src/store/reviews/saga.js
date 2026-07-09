import { postUserReviews, postUserOrders } from "helpers/backend_helper"
import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { getUserOrderFail, getUserOrderSuccess, getUserReviewFail, getUserReviewSuccess } from "./actions"
import { GET_USER_ORDERS, GET_USER_REVIEWS } from "./actionTypes"

function* ongetUserReviews({ payload: { data, query } }) {
    try {

        const response = yield call(postUserReviews, data, query)
        if (response.status == "failure") {

            yield put(getUserReviewFail(response.message))
        }


        return yield put(getUserReviewSuccess(response))
    } catch (error) {
        yield put(getUserReviewFail(error))
    }

}

function* ongetUserOrders({ payload: { data, query } }) {
    try {

        const response = yield call(postUserOrders, data, query)
        if (response.status == "failure") {
            yield put(getUserOrderFail(response.message))
        }

        return yield put(getUserOrderSuccess(response))
    } catch (error) {
        yield put(getUserOrderFail(error))
    }

}

function* reviewsSaga() {
    yield takeEvery(GET_USER_REVIEWS, ongetUserReviews)
    yield takeEvery(GET_USER_ORDERS, ongetUserOrders)
}

export default reviewsSaga



