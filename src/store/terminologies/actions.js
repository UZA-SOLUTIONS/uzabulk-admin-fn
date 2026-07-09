import {
  TERMINOLOGY_API_FAIL,
  GET_TERMINOLOGIES,
  GET_TERMINOLOGIES_FAIL,
  GET_TERMINOLOGIES_SUCCESS,
  PUT_TERMINOLOGY,
  PUT_TERMINOLOGY_FAIL,
  PUT_TERMINOLOGY_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: TERMINOLOGY_API_FAIL,
  payload: error,
})

/* Get terminologies */
export const getTerminologies = data => ({
  type: GET_TERMINOLOGIES,
  payload: data,
})

export const getTerminologiesSuccess = terminologies => ({
  type: GET_TERMINOLOGIES_SUCCESS,
  payload: terminologies || {},
})

export const getTerminologiesFail = error => ({
  type: GET_TERMINOLOGIES_FAIL,
  payload: error,
})
/* Get Terminologies END */

/* Update Terminology */
export const putTerminology = (data, history) => ({
  type: PUT_TERMINOLOGY,
  payload: { data, history },
})

export const putTerminologyFail = error => ({
  type: PUT_TERMINOLOGY_FAIL,
  payload: error,
})

export const putTerminologySuccess = success => ({
  type: PUT_TERMINOLOGY_SUCCESS,
  payload: success,
})
/* Update Terminology END */
