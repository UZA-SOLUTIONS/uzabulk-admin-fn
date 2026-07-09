
import { call,put,takEvery,takeLatest, takeEvery } from "redux-saga/effects";
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import { error } from "jquery";
import { deleteDisputeReply, getDispute, getDisputes, postDisputeReply, putDisputeStatus } from "helpers/backend_helper";
import { DELETE_DISPUTE_REPLY, GET_DISPUTE, GET_DISPUTES, POST_DISPUTE_REPLY, PUT_DISPUTE_STATUS } from "./actionTypes";
import { deleteDisputeReplyFailed, deleteDisputeReplySuccess, getDisputeFailed, getDisputesSuccess, getDisputeSuccess, postDisputeReplyFailed, postDisputeReplySuccess, putDisputeStatusFailure, putDisputeStatusSuccess } from "./actions";

function* onGetDisputes({ payload: { storeType, data } }){ 
    try {
        Nprogress.start()
        const response =  yield call(getDisputes,data)
        console.log(response, "DISPUTE CHECK");   
        if (response.status == "failure") {
            Nprogress.done()
            console.log("fail1");
          return yield put(getDisputeFailed(response.message))
          
        }
        Nprogress.done()
        yield put(getDisputesSuccess(response))
        console.log("success");
      } catch (error) {
        console.log("fail end");
        console.log(error, "error");
        yield put(getDisputeFailed(error))       
      }
}

function* onGetDispute({payload}){
  console.log(payload, "SAGA ID");
  try {
    const response = yield call(getDispute, payload)
    console.log("working");
    console.log(response, "SINGLE DISPUTE RESPONSE");

    if(response.status =="failure"){
      
      return yield put(getDisputeFailed(response.message))
    }
    yield put(getDisputeSuccess(response.data))
  } catch (error) {
    yield put(getDisputeFailed(error))
  }
}

function * onPostDisputeReply({payload: {data, callBack}}){
  try {
   const response = yield call(postDisputeReply, data)
   console.log(response, "RESPONSE TEXT");

   if(response.status =="failure"){
     return yield put(postDisputeReplyFailed(response))
   }

   callBack && callBack();
   yield put(postDisputeReplySuccess(response))
   

  } catch (error) {
    yield put(postDisputeReplyFailed(error))
  }
}

function * onDeleteDisputeReply({payload: {data, callBack}}){
  try {
    const response = yield call(deleteDisputeReply, data)
    console.log(response , "Updated after delete");

    if(response.status == "failure"){
      return yield put(deleteDisputeReplyFailed(error))
    }
    callBack && callBack();
    yield put(deleteDisputeReplySuccess(response))
  } catch (error) {
    yield put(deleteDisputeReplyFailed(error))
  }
}

function * onPutDisputeStatus({payload: {data, callBack}}){
  try {
    const response = yield call(putDisputeStatus, data)

    if(response.status == "failure"){
      return yield put(putDisputeStatusFailure(error))
    }
    callBack && callBack()
    yield put(putDisputeStatusSuccess(response))
    console.log("Changed");
  } catch (error) {
    yield put(putDisputeStatusFailure(error))
    console.log("failed");
  }
}


function * DisputeSaga (){
    yield takeEvery(GET_DISPUTES, onGetDisputes)
    yield takeEvery(GET_DISPUTE, onGetDispute)
    yield takeEvery(POST_DISPUTE_REPLY, onPostDisputeReply)
    yield takeEvery(DELETE_DISPUTE_REPLY, onDeleteDisputeReply)
    yield takeEvery(PUT_DISPUTE_STATUS, onPutDisputeStatus)
}

export default DisputeSaga