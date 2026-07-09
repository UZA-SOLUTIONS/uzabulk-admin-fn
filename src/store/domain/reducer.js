import {
  GET_DOMAIN_SUCCESS,
  GET_DOMAIN_FAIL,
  BUY_DOMAIN_SUCCESS,
  BUY_DOMAIN_FAIL,
  CLEAR_DOMAIN_SUCCESS
} from "./actionTypes"

const INIT_STATE = {
  domain: {},
  isAvail: false,
  notAvail: false,
  buy: {},
  error: {},
}

const domain = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DOMAIN_SUCCESS:
      return {
        ...state,
        domain: action.payload.data,
      }

    case GET_DOMAIN_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case BUY_DOMAIN_SUCCESS:
      return {
        ...state,
        buy: action.payload,
      }
    case BUY_DOMAIN_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case CLEAR_DOMAIN_SUCCESS:
      return {
        ...INIT_STATE
      }
    default:
      return state
  }
}

export default domain
