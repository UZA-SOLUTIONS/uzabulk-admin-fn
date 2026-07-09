import {
  PROMOTION_API_FAIL,
  GET_PROMOTIONS,
  GET_PROMOTIONS_FAIL,
  GET_PROMOTIONS_SUCCESS,
  ADD_PROMOTION,
  ADD_PROMOTION_FAIL,
  ADD_PROMOTION_SUCCESS,
  GET_PROMOTION,
  GET_PROMOTION_FAIL,
  GET_PROMOTION_SUCCESS,
  PUT_PROMOTION,
  PUT_PROMOTION_FAIL,
  PUT_PROMOTION_SUCCESS,
  DELETE_PROMOTION,
  DELETE_PROMOTION_FAIL,
  DELETE_PROMOTION_SUCCESS,
  PUT_PROMOTIONS_STATUS,
  PUT_PROMOTIONS_STATUS_FAIL,
  PUT_PROMOTIONS_STATUS_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: PROMOTION_API_FAIL,
  payload: error,
})

/* Get PROMOTIONs */
export const getPromotions = data => ({
  type: GET_PROMOTIONS,
  payload: data,
})

export const getPromotionsSuccess = promotions => ({
  type: GET_PROMOTIONS_SUCCESS,
  payload: promotions,
})

export const getPromotionsFail = error => ({
  type: GET_PROMOTIONS_FAIL,
  payload: error,
})
/* Get Promotions END */

/* Add Promotion */
export const addPromotion = (promotion, history) => ({
  type: ADD_PROMOTION,
  payload: { promotion, history },
})

export const addPromotionFail = error => ({
  type: ADD_PROMOTION_FAIL,
  payload: error,
})

export const addPromotionSuccess = () => ({
  type: ADD_PROMOTION_SUCCESS,
})
/* Add Promotion END */

/* Get Promotion */
export const getPromotion = id => ({
  type: GET_PROMOTION,
  payload: id,
})

export const getPromotionFail = error => ({
  type: GET_PROMOTION_FAIL,
  payload: error,
})

export const getPromotionSuccess = promotion => ({
  type: GET_PROMOTION_SUCCESS,
  payload: promotion,
})
/* Get Promotion END */

/* Update Promotion */
export const putPromotion = (data, history) => ({
  type: PUT_PROMOTION,
  payload: { data, history },
})

export const putPromotionFail = error => ({
  type: PUT_PROMOTION_FAIL,
  payload: error,
})

export const putPromotionSuccess = () => ({
  type: PUT_PROMOTION_SUCCESS,
})
/* Update Promotion END */

/* Delete Promotion */
export const deletePromotion = (data, callback) => ({
  type: DELETE_PROMOTION,
  payload: { data, callback },
})

export const deletePromotionFail = error => ({
  type: DELETE_PROMOTION_FAIL,
  payload: error,
})

export const deletePromotionSuccess = () => ({
  type: DELETE_PROMOTION_SUCCESS,
})
/* Delete Faz END */

/* Update Multi Promotions Status */
export const putPromotionsStatus = (data, callback) => ({
  type: PUT_PROMOTIONS_STATUS,
  payload: { data, callback },
})

export const putPromotionsStatusFail = error => ({
  type: PUT_PROMOTIONS_STATUS_FAIL,
  payload: error,
})

export const putPromotionsStatusSuccess = () => ({
  type: PUT_PROMOTIONS_STATUS_SUCCESS,
})
/* Update Multi Promotions Status END */
