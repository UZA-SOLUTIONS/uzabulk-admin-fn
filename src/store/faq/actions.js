import {
  FAQ_API_FAIL,
  GET_FAQS,
  GET_FAQS_FAIL,
  GET_FAQS_SUCCESS,
  ADD_FAQ,
  ADD_FAQ_FAIL,
  ADD_FAQ_SUCCESS,
  GET_FAQ,
  GET_FAQ_FAIL,
  GET_FAQ_SUCCESS,
  PUT_FAQ,
  PUT_FAQ_FAIL,
  PUT_FAQ_SUCCESS,
  DELETE_FAQ,
  DELETE_FAQ_FAIL,
  DELETE_FAQ_SUCCESS,
  PUT_FAQS_STATUS,
  PUT_FAQS_STATUS_FAIL,
  PUT_FAQS_STATUS_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: FAQ_API_FAIL,
  payload: error,
})

/* Get faqs */
export const getFaqs = (data, callback) => ({
  type: GET_FAQS,
  payload: {data, callback},
})

export const getFaqsSuccess = faqs => ({
  type: GET_FAQS_SUCCESS,
  payload: faqs,
})

export const getFaqsFail = error => ({
  type: GET_FAQS_FAIL,
  payload: error,
})
/* Get Faqs END */

/* Add Faq */
export const addFaq = (faq, history) => ({
  type: ADD_FAQ,
  payload: { faq, history },
})

export const addFaqFail = error => ({
  type: ADD_FAQ_FAIL,
  payload: error,
})

export const addFaqSuccess = () => ({
  type: ADD_FAQ_SUCCESS,
})
/* Add Faq END */

/* Get Faq */
export const getFaq = id => ({
  type: GET_FAQ,
  payload: id,
})

export const getFaqFail = error => ({
  type: GET_FAQ_FAIL,
  payload: error,
})

export const getFaqSuccess = faq => ({
  type: GET_FAQ_SUCCESS,
  payload: faq,
})
/* Get Faq END */

/* Update Faq */
export const putFaq = (data, history) => ({
  type: PUT_FAQ,
  payload: { data, history },
})

export const putFaqFail = error => ({
  type: PUT_FAQ_FAIL,
  payload: error,
})

export const putFaqSuccess = () => ({
  type: PUT_FAQ_SUCCESS,
})
/* Update Faq END */

/* Delete Faq */
export const deleteFaq = (data, callback) => ({
  type: DELETE_FAQ,
  payload: { data, callback },
})

export const deleteFaqFail = error => ({
  type: DELETE_FAQ_FAIL,
  payload: error,
})

export const deleteFaqSuccess = () => ({
  type: DELETE_FAQ_SUCCESS,
})
/* Delete Faz END */

/* Update Multi Faqs Status */
export const putFaqsStatus = (data, callback) => ({
  type: PUT_FAQS_STATUS,
  payload: { data, callback },
})

export const putFaqsStatusFail = error => ({
  type: PUT_FAQS_STATUS_FAIL,
  payload: error,
})

export const putFaqsStatusSuccess = () => ({
  type: PUT_FAQS_STATUS_SUCCESS,
})
/* Update Multi Faqs Status END */
