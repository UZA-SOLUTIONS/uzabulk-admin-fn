import {
  FD_ATTRIBUTE_API_FAIL,
  GET_FD_ATTRIBUTES,
  GET_FD_ATTRIBUTES_FAIL,
  GET_FD_ATTRIBUTES_SUCCESS,
  ADD_FD_ATTRIBUTE,
  ADD_FD_ATTRIBUTE_FAIL,
  ADD_FD_ATTRIBUTE_SUCCESS,
  GET_FD_ATTRIBUTE,
  GET_FD_ATTRIBUTE_FAIL,
  GET_FD_ATTRIBUTE_SUCCESS,
  PUT_FD_ATTRIBUTE,
  PUT_FD_ATTRIBUTE_FAIL,
  PUT_FD_ATTRIBUTE_SUCCESS,
  DELETE_FD_ATTRIBUTE,
  DELETE_FD_ATTRIBUTE_FAIL,
  DELETE_FD_ATTRIBUTE_SUCCESS,
  PUT_FD_ATTRIBUTES_STATUS,
  PUT_FD_ATTRIBUTES_STATUS_FAIL,
  PUT_FD_ATTRIBUTES_STATUS_SUCCESS,
  POST_FD_TERM_IN_ATTRIBUTE,
  POST_FD_TERM_IN_ATTRIBUTE_FAIL,
  POST_FD_TERM_IN_ATTRIBUTE_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: FD_ATTRIBUTE_API_FAIL,
  payload: error,
})

/* Get Food Delivery Attributes */
export const getFdAttributes = data => ({
  type: GET_FD_ATTRIBUTES,
  payload: data,
})

export const getFdAttributesSuccess = fdAttributes => ({
  type: GET_FD_ATTRIBUTES_SUCCESS,
  payload: fdAttributes,
})

export const getFdAttributesFail = error => ({
  type: GET_FD_ATTRIBUTES_FAIL,
  payload: error,
})
/* Get Food Delivery Attributes END */

/* Add Food Delivery Attributes */
export const addFdAttribute = (fdAttribute, history) => ({
  type: ADD_FD_ATTRIBUTE,
  payload: { fdAttribute, history },
})

export const addFdAttributeFail = error => ({
  type: ADD_FD_ATTRIBUTE_FAIL,
  payload: error,
})

export const addFdAttributeSuccess = () => ({
  type: ADD_FD_ATTRIBUTE_SUCCESS,
})
/* Add Food Delivery Attributes END */

/* Get Food Delivery Attributes */
export const getFdAttribute = (storeType, id) => ({
  type: GET_FD_ATTRIBUTE,
  payload: { storeType, id },
})

export const getFdAttributeFail = error => ({
  type: GET_FD_ATTRIBUTE_FAIL,
  payload: error,
})

export const getFdAttributeSuccess = fdAttribute => ({
  type: GET_FD_ATTRIBUTE_SUCCESS,
  payload: fdAttribute,
})
/* Get Food Delivery Attributes END */

/* Update Food Delivery Attributes */
export const putFdAttribute = (data, history) => ({
  type: PUT_FD_ATTRIBUTE,
  payload: { data, history },
})

export const putFdAttributeFail = error => ({
  type: PUT_FD_ATTRIBUTE_FAIL,
  payload: error,
})

export const putFdAttributeSuccess = () => ({
  type: PUT_FD_ATTRIBUTE_SUCCESS,
})
/* Update Food Delivery Attributes END */

/* Delete Food Delivery Attributes */
export const deleteFdAttribute = (data, callback) => ({
  type: DELETE_FD_ATTRIBUTE,
  payload: { data, callback },
})

export const deleteFdAttributeFail = error => ({
  type: DELETE_FD_ATTRIBUTE_FAIL,
  payload: error,
})

export const deleteFdAttributeSuccess = () => ({
  type: DELETE_FD_ATTRIBUTE_SUCCESS,
})
/* Delete Food Delivery Attributes END */

/* Update Multi Food Delivery Attributes Status */
export const putFdAttributesStatus = (data, callback) => ({
  type: PUT_FD_ATTRIBUTES_STATUS,
  payload: { data, callback },
})

export const putFdAttributesStatusFail = error => ({
  type: PUT_FD_ATTRIBUTES_STATUS_FAIL,
  payload: error,
})

export const putFdAttributesStatusSuccess = () => ({
  type: PUT_FD_ATTRIBUTES_STATUS_SUCCESS,
})
/* Update Multi Food Delivery Attributes Status END */

/* Add Term in Attribute */
export const postFdTermInAttribute = (data, callback) => ({
  type: POST_FD_TERM_IN_ATTRIBUTE,
  payload: { data, callback },
})

export const postFdTermInAttributeFail = error => ({
  type: POST_FD_TERM_IN_ATTRIBUTE_FAIL,
  payload: error,
})

export const postFdTermInAttributeSuccess = (attributeId, data) => ({
  type: POST_FD_TERM_IN_ATTRIBUTE_SUCCESS,
  payload: { attributeId, data },
})
/* Add Term in Attribute */
