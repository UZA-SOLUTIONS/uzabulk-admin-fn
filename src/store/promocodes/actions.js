import {
  PROMO_CODE_API_FAIL,
  GET_PROMO_CODES,
  GET_PROMO_CODES_FAIL,
  GET_PROMO_CODES_SUCCESS,
  ADD_PROMO_CODE,
  ADD_PROMO_CODE_FAIL,
  ADD_PROMO_CODE_SUCCESS,
  GET_PROMO_CODE,
  GET_PROMO_CODE_FAIL,
  GET_PROMO_CODE_SUCCESS,
  PUT_PROMO_CODE,
  PUT_PROMO_CODE_FAIL,
  PUT_PROMO_CODE_SUCCESS,
  DELETE_PROMO_CODE,
  DELETE_PROMO_CODE_FAIL,
  DELETE_PROMO_CODE_SUCCESS,
  PUT_PROMO_CODES_STATUS,
  PUT_PROMO_CODES_STATUS_FAIL,
  PUT_PROMO_CODES_STATUS_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: PROMO_CODE_API_FAIL,
  payload: error,
})

/* Get PROMO_CODEs */
export const getPromoCodes = data => ({
  type: GET_PROMO_CODES,
  payload: data,
})

export const getPromoCodesSuccess = promoCodes => ({
  type: GET_PROMO_CODES_SUCCESS,
  payload: promoCodes,
})

export const getPromoCodesFail = error => ({
  type: GET_PROMO_CODES_FAIL,
  payload: error,
})
/* Get PromoCodes END */

/* Add PromoCode */
export const addPromoCode = (promoCode, history) => ({
  type: ADD_PROMO_CODE,
  payload: { promoCode, history },
})

export const addPromoCodeFail = error => ({
  type: ADD_PROMO_CODE_FAIL,
  payload: error,
})

export const addPromoCodeSuccess = () => ({
  type: ADD_PROMO_CODE_SUCCESS,
})
/* Add PromoCode END */

/* Get PromoCode */
export const getPromoCode = id => ({
  type: GET_PROMO_CODE,
  payload: id,
})

export const getPromoCodeFail = error => ({
  type: GET_PROMO_CODE_FAIL,
  payload: error,
})

export const getPromoCodeSuccess = promoCode => ({
  type: GET_PROMO_CODE_SUCCESS,
  payload: promoCode,
})
/* Get PromoCode END */

/* Update PromoCode */
export const putPromoCode = (data, history) => ({
  type: PUT_PROMO_CODE,
  payload: { data, history },
})

export const putPromoCodeFail = error => ({
  type: PUT_PROMO_CODE_FAIL,
  payload: error,
})

export const putPromoCodeSuccess = () => ({
  type: PUT_PROMO_CODE_SUCCESS,
})
/* Update PromoCode END */

/* Delete PromoCode */
export const deletePromoCode = (data, callback) => ({
  type: DELETE_PROMO_CODE,
  payload: { data, callback },
})

export const deletePromoCodeFail = error => ({
  type: DELETE_PROMO_CODE_FAIL,
  payload: error,
})

export const deletePromoCodeSuccess = () => ({
  type: DELETE_PROMO_CODE_SUCCESS,
})
/* Delete Faz END */

/* Update Multi PromoCodes Status */
export const putPromoCodesStatus = (data, callback) => ({
  type: PUT_PROMO_CODES_STATUS,
  payload: { data, callback },
})

export const putPromoCodesStatusFail = error => ({
  type: PUT_PROMO_CODES_STATUS_FAIL,
  payload: error,
})

export const putPromoCodesStatusSuccess = () => ({
  type: PUT_PROMO_CODES_STATUS_SUCCESS,
})
/* Update Multi PromoCodes Status END */
