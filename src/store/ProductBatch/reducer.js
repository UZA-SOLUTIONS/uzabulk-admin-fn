import {
    PRODUCTS_BATCH_API_FAIL,
    GET_PRODUCTS_BATCH,
    GET_PRODUCTS_BATCH_SUCCESS,
    GET_PRODUCTS_BATCH_FAIL,
    ADD_PRODUCTS_BATCH,
    ADD_PRODUCTS_BATCH_FAIL,
    ADD_PRODUCTS_BATCH_SUCCESS,
    GET_PRODUCTS_BATCH_DETAIL,
    GET_PRODUCTS_BATCH_DETAIL_SUCCESS,
    GET_PRODUCTS_BATCH_DETAIL_FAIL
} from "./actionTypes"

const INIT_STATE = {
    batch: [],
    totalCount: 0,
    error: "",
    loading: false,
    promotion: {},
    details: {}
}

const ProductBatch = (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_PRODUCTS_BATCH:
            return {
                ...state,
                loading: true,
            }

        case GET_PRODUCTS_BATCH_SUCCESS:
            return {
                ...state,
                batch: action.payload.data || [],
                totalCount: action.payload.totalcount || 0,
                loading: false,
            }

        case GET_PRODUCTS_BATCH_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }


        case PRODUCTS_BATCH_API_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }

        case ADD_PRODUCTS_BATCH:
            return {
                ...state,
                error: "",
                loading: true,
            }

        case ADD_PRODUCTS_BATCH_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }

        case ADD_PRODUCTS_BATCH_SUCCESS:
            return {
                ...state,
                error: "",
                loading: false,
            }

        case GET_PRODUCTS_BATCH_DETAIL:
            return {
                ...state,
                loading: true,
            }

        case GET_PRODUCTS_BATCH_DETAIL_SUCCESS:
            console.log("reducerrrr",action.result?.data)
            return {
                ...state,
                details: action.result.data || {},
                loading: false,
            }

        case GET_PRODUCTS_BATCH_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }


        default:
            return state
    }
}

export default ProductBatch
