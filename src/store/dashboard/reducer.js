import {
  GET_DASHBOARD_REPORTS,
  GET_DASHBOARD_REPORTS_SUCCESS,
  GET_DASHBOARD_REPORTS_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  data: {
    byOrder: [],
    byOrderStatus: [],
  },
  error: {},
}

const dashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DASHBOARD_REPORTS_SUCCESS:
      return {
        ...state,
        data: { ...action.payload },
      }

    case GET_DASHBOARD_REPORTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default dashboard
