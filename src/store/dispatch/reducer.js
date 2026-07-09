const {
  GET_DISPATCH,
  GET_DISPATCH_SUCCESS,
  GET_DISPATCH_FAIL,
  POST_REQUEST_DRIVERS,
  POST_REQUEST_DRIVERS_SUCCESS,
  POST_REQUEST_DRIVERS_FAIL,
  GET_DISPATCH_REQUESTS,
  GET_DISPATCH_REQUESTS_SUCCESS,
  GET_DISPATCH_REQUESTS_FAIL,
  PUT_ASSIGN_DRIVER,
  PUT_ASSIGN_DRIVER_SUCCESS,
  PUT_ASSIGN_DRIVER_FAIL,
  POST_DISPATCH_REQUEST,
  POST_DISPATCH_REQUEST_SUCCESS,
  POST_DISPATCH_REQUEST_FAIL,
  GET_DISPATCH_FARE,
  GET_DISPATCH_FARE_SUCCESS,
  GET_DISPATCH_FARE_FAIL,
} = require("./actionTypes")

const initialState = {
  data: {},
  loading: false,
  error: "",
  list: [],
  listcount: 0,
  drivers: [],
  fare: null,
}

const Dispatch = (state = initialState, action) => {
  switch (action.type) {
    case GET_DISPATCH:
      return {
        ...state,
        loading: true,
      }
    case GET_DISPATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case GET_DISPATCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case POST_REQUEST_DRIVERS:
      return {
        ...state,
        loading: true,
      }
    case POST_REQUEST_DRIVERS_SUCCESS:
      return {
        ...state,
        loading: false,
        drivers: action.payload,
      }
    case POST_REQUEST_DRIVERS_FAIL:
      return {
        ...state,
        loading: false,
        drivers: action.payload,
      }

    /* Get Dispatch Requests */
    case GET_DISPATCH_REQUESTS:
      return {
        ...state,
        loading: true,
      }
    case GET_DISPATCH_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data,
        listcount: action.payload.totalcount,
      }
    case GET_DISPATCH_REQUESTS_FAIL:
      return {
        ...state,
        laoding: false,
        error: action.payload,
      }
    /* Get Dispatch Requests END */

    case PUT_ASSIGN_DRIVER:
      return {
        ...state,
        loading: true,
      }
    case PUT_ASSIGN_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case PUT_ASSIGN_DRIVER_FAIL:
      return {
        ...state,
        loading: false,
      }

    /* Create Dispute Request */
    case POST_DISPATCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      }

    case POST_DISPATCH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        fare: null,
      }

    case POST_DISPATCH_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    /* Create Dispute Request END */

    /* Get Dispute Request Fare */
    case GET_DISPATCH_FARE:
      return {
        ...state,
        loading: true,
        fare: null,
        error: "",
      }

    case GET_DISPATCH_FARE_SUCCESS:
      return {
        ...state,
        loading: false,
        fare: action.payload,
      }

    case GET_DISPATCH_FARE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    /* Get Dispute Request Fare END */
    default:
      return state
  }
}
export default Dispatch
