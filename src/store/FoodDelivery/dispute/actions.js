

import { GET_DISPUTES, GET_DISPUTES_FAILED, GET_DISPUTES_SUCCESS, GET_DISPUTE, GET_DISPUTE_SUCCESS, GET_DISPUTE_FAILED, POST_DISPUTE_REPLY, POST_DISPUTE_REPLY_SUCCESS, POST_DISPUTE_REPLY_FAILED, DELETE_DISPUTE_REPLY, DELETE_DISPUTE_REPLY_SUCCESS, DELETE_DISPUTE_REPLY_FAILED, PUT_DISPUTE_STATUS, PUT_DISPUTE_STATUS_SUCCESS, PUT_DISPUTE_STATUS_FAILED, } from "./actionTypes";

export const getDisputes = (data) => ({
    type: GET_DISPUTES,
    payload: {data },

})
export const getDisputesFailed = error => ({
    type: GET_DISPUTES_FAILED,
    payload: error
})
export const getDisputesSuccess = dispute => ({
    type: GET_DISPUTES_SUCCESS,
    payload: dispute
})
export const getDispute = (data) => ({
    type: GET_DISPUTE,
    payload: data,
})
export const getDisputeSuccess = dispute => ({
    type: GET_DISPUTE_SUCCESS,
    payload: dispute
})
export const getDisputeFailed = error => ({
    type: GET_DISPUTE_FAILED,
    payload: error
})

export const postDisputeReply = (data, callBack) => ({
    type: POST_DISPUTE_REPLY,
    payload: { data, callBack },
})

export const postDisputeReplySuccess = message => ({
    type: POST_DISPUTE_REPLY_SUCCESS,
    payload: message
})

export const postDisputeReplyFailed = error => ({
    type: POST_DISPUTE_REPLY_FAILED,
    payload: error
})

export const deleteDisputeReply = (data,callBack) => ({
    type: DELETE_DISPUTE_REPLY,
    payload:{data, callBack}
})
export const deleteDisputeReplySuccess = response => ({
    type: DELETE_DISPUTE_REPLY_SUCCESS,
    payload: response
})
export const deleteDisputeReplyFailed = error => ({
    type: DELETE_DISPUTE_REPLY_FAILED,
    payload: error
})
export const putDisputeStatus = (data , callBack) => ({
    type: PUT_DISPUTE_STATUS,
    payload:{data, callBack}
})
export const putDisputeStatusSuccess = response => ({
    type: PUT_DISPUTE_STATUS_SUCCESS,
    payload:response
})
export const putDisputeStatusFailure = error => ({
    type: PUT_DISPUTE_STATUS_FAILED,
    payload:error
})