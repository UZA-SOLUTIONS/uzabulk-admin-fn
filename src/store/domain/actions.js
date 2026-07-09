import {
  GET_DOMAIN,
  GET_DOMAIN_SUCCESS,
  GET_DOMAIN_FAIL,
  BUY_DOMAIN,
  BUY_DOMAIN_SUCCESS,
  BUY_DOMAIN_FAIL,
  CLEAR_DOMAIN,
  CLEAR_DOMAIN_SUCCESS,
} from "./actionTypes"

export const searchDomain = name => {
  return {
    type: GET_DOMAIN,
    name,
  }
}

export const searhDomainSuccess = domain => ({
  type: GET_DOMAIN_SUCCESS,
  payload: domain,
})

export const searhDomainFail = error => ({
  type: GET_DOMAIN_FAIL,
  payload: error,
})

export const buyDomain = data => {
  return {
    type: BUY_DOMAIN,
    data,
  }
}

export const buyDomainSuccess = domain => ({
  type: BUY_DOMAIN_SUCCESS,
  payload: domain,
})

export const buyDomainFail = error => ({
  type: BUY_DOMAIN_FAIL,
  payload: error,
})

export const clearDomain = () => ({
  type: CLEAR_DOMAIN,
})

export const clearDomainSuccess = () => ({
  type: CLEAR_DOMAIN_SUCCESS,
})
