import * as COSNT from './actionTypes'
const init = {
    loading: false,
    error: "",
    Data: [],
    Dispute: {},
    textInfo: {},
    totalCount: 0,
}

const Disputes = (state = init, action) => {
    switch (action.type) {
        case COSNT.GET_DISPUTES:
            return {
                ...state,
                loading: true
            }
        case COSNT.GET_DISPUTES_SUCCESS:
            return {
                ...state,
                loading: false,
                Data: action.payload

            }
        case COSNT.GET_DISPUTES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case COSNT.GET_DISPUTE:
            return {
                ...state,
                loading: true,
            }
        case COSNT.GET_DISPUTE_SUCCESS:
            return {
                ...state,
                loading: false,
                Dispute: action.payload
            }
        case COSNT.GET_DISPUTE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case COSNT.POST_DISPUTE_REPLY:
            return {
                ...state,
            }

        case COSNT.POST_DISPUTE_REPLY_SUCCESS:
            return {
                ...state,
                textInfo: action.payload
            }

        case COSNT.POST_DISPUTE_REPLY_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case COSNT.DELETE_DISPUTE_REPLY:
            return {
                ...state,

            }
        case COSNT.DELETE_DISPUTE_REPLY_SUCCESS:
            return {
                ...state,
                textInfo: action.payload

            }
        case COSNT.DELETE_DISPUTE_REPLY_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case COSNT.PUT_DISPUTE_STATUS:
            return {
                ...state
            }
        case COSNT.PUT_DISPUTE_STATUS_SUCCESS:
            return {
                ...state,
                Dispute: action.payload
            }
        case COSNT.PUT_DISPUTE_STATUS_FAILED:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state
    }
}
export default Disputes

