import { call, put, takeEvery } from "redux-saga/effects"

// Promo Code Redux States
import {
    GET_PRODUCTS_BATCH,
    ADD_PRODUCTS_BATCH,
    GET_PRODUCTS_BATCH_DETAIL,
} from "./actionTypes"
import {
    getProductBatchSuccess,
    getProductBatchFail,
    addProductBatchFail,
    addProductBatchSuccess,
    getProductBatch as getProductBatchLIst,
    getProductBatchDetailFail,
    getProductBatchDetailSuccess

} from "./actions"

import {
    getProductBatch,
    addProductBatch,
    getProductBatchDetails
} from "helpers/backend_helper"

function* fetchBatch({ payload }) {
    try {
        const response = yield call(getProductBatch, payload)

        if (response.status == "failure") {
            return yield put(getProductBatchFail(response.message))
        }

        yield put(getProductBatchSuccess(response))
    } catch (error) {
        yield put(getProductBatchFail(error))
    }
};

function* addNewBatch({ payload: { promotion, filter, onComplete } }) {
    try {
        const response = yield call(addProductBatch, promotion)

        if (response.status == "failure") {
            window.scrollTo(0, 0)
            if (onComplete) {
                onComplete(response)
            }
            return yield put(addProductBatchFail(response))
        }

        yield put(addProductBatchSuccess(response.data || {}))
        if (onComplete) {
            onComplete(response)
        }
        yield put(getProductBatchLIst(filter));
    } catch (error) {
        const failure = { status: "failure", message: "Internal Error!" }
        if (onComplete) {
            onComplete(failure)
        }
        yield put(addProductBatchFail(failure))
    }
};

function* fetchBatchDetails({ payload }) {
    try {
        const response = yield call(getProductBatchDetails, payload)

        if (response.status == "failure") {
            return yield put(getProductBatchDetailFail(response.message))
        }

        yield put(getProductBatchDetailSuccess(response))
    } catch (error) {
        yield put(getProductBatchDetailFail(error))
    }
};

function* BatchProductSaga() {
    yield takeEvery(GET_PRODUCTS_BATCH, fetchBatch)
    yield takeEvery(ADD_PRODUCTS_BATCH, addNewBatch)
    yield takeEvery(GET_PRODUCTS_BATCH_DETAIL, fetchBatchDetails)

}

export default BatchProductSaga
