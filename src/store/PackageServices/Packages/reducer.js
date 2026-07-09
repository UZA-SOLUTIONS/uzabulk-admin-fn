import * as TYPE from "./actionTypes"
import { API_STATUS as status } from "helpers/contants"

const initialState = {
  list: null,
  listCount: null,
  listFilter: null,
  packageServicePackage: null,
  status: status.IDLE,
  showLoader: false,
}

const Reducer = (reduxState = initialState, action) => {
  const state = {}
  switch (action.type) {
    case TYPE.CLEAR_PACKAGE_SERVICE_PACKAGE_STORE:
      return initialState

    case TYPE.GET_PACKAGE_SERVICE_PACKAGE_LIST_REQUESTED:
      state.status = status.LOADING
      state.showLoader = !!action.payload?.showLoader
      break
    case TYPE.GET_PACKAGE_SERVICE_PACKAGE_LIST_SUCCESS:
      if (Array.isArray(action.payload.response.data)) {
        state.list = action.payload.response.data
        state.listCount = action.payload.response.totalcount
        state.status = status.SUCCEDED
      } else {
        console.error(action.type + " : List is not array")
        state.list = initialState.list
        state.listCount = initialState.listCount
        state.status = status.FAILED
      }
      state.showLoader = false
      break
    case TYPE.GET_PACKAGE_SERVICE_PACKAGE_LIST_FAIL:
      state.list = initialState.list
      state.listCount = initialState.totalCount
      state.status = status.FAILED
      state.showLoader = false
      break
    case TYPE.GET_PACKAGE_SERVICE_PACKAGE_REQUESTED:
      state.status = status.LOADING
      state.showLoader = !!action.payload?.showLoader
      break
    case TYPE.GET_PACKAGE_SERVICE_PACKAGE_SUCCESS:
      state.packageServicePackage = action.payload.response.data
      state.status = status.SUCCEDED
      state.showLoader = false
      break
    case TYPE.GET_PACKAGE_SERVICE_PACKAGE_FAIL:
      state.packageServicePackage = initialState.packageServicePackage
      state.status = status.FAILED
      state.showLoader = false
      break
    case TYPE.PUT_PACKAGE_SERVICE_PACKAGE_REQUESTED:
      state.status = status.LOADING
      state.showLoader = !!action.payload.showLoader
      break
    case TYPE.PUT_PACKAGE_SERVICE_PACKAGE_SUCCESS:
      //state.packageServicePackage = action.payload.response.data
      state.status = status.SUCCEDED
      state.showLoader = false
      break
    case TYPE.PUT_PACKAGE_SERVICE_PACKAGE_FAIL:
      state.status = status.FAILED
      state.showLoader = false
      break
    case TYPE.ADD_PACKAGE_SERVICE_PACKAGE_REQUESTED:
      state.status = status.LOADING
      state.showLoader = !!action.payload?.showLoader
      break
    case TYPE.ADD_PACKAGE_SERVICE_PACKAGE_SUCCESS:
      state.packageServicePackage = action.payload.response.data
      state.status = status.SUCCEDED
      state.showLoader = false
      break
    case TYPE.ADD_PACKAGE_SERVICE_PACKAGE_FAIL:
      state.status = status.FAILED
      state.showLoader = false
      break
    case TYPE.DELETE_PACKAGE_SERVICE_PACKAGE_REQUESTED:
      state.status = status.LOADING
      state.showLoader = !!action.payload?.showLoader
      break
    case TYPE.DELETE_PACKAGE_SERVICE_PACKAGE_SUCCESS:
      state.packageServicePackage = initialState.packageServicePackage
      state.status = status.SUCCEDED
      state.showLoader = false
      break
    case TYPE.DELETE_PACKAGE_SERVICE_PACKAGE_FAIL:
      state.status = status.FAILED
      state.showLoader = false
      break
    default:
  }
  return {
    ...reduxState,
    ...state,
  }
}

export default Reducer
