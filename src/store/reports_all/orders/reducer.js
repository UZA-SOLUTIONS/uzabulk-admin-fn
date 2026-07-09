import {
  GET_ORDERS_REPORTS,
  GET_ORDERS_REPORTS_SUCCESS,
  GET_ORDERS_REPORTS_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  data: {
    byOrder: [],
    byOrderStatus: [],
  },
  error: {},
}

const reports_Orders = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ORDERS_REPORTS_SUCCESS:
      return {
        ...state,
        data: { ...action.payload },
      }

    case GET_ORDERS_REPORTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default reports_Orders
