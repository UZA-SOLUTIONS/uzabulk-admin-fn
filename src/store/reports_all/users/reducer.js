import {
  GET_CUSTOMERS_REPORTS,
  GET_CUSTOMERS_REPORTS_SUCCESS,
  GET_CUSTOMERS_REPORTS_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  data: {
    byUser: [],
    byUserStatus: [],
  },
  error: {},
}

const reports_Customers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_REPORTS_SUCCESS:
      return {
        ...state,
        data: { ...action.payload },
      }

    case GET_CUSTOMERS_REPORTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default reports_Customers
