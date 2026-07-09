import * as TYPE from "./actionTypes"

export const getPackageServicePackageList = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_PACKAGE_LIST,
  payload,
})
export const getPackageServicePackageListRequested = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_PACKAGE_LIST_REQUESTED,
  payload,
})
export const getPackageServicePackageListSuccess = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_PACKAGE_LIST_SUCCESS,
  payload,
})
export const getPackageServicePackageListFail = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_PACKAGE_LIST_FAIL,
  payload,
})

export const addPackageServicePackage = payload => ({
  type: TYPE.ADD_PACKAGE_SERVICE_PACKAGE,
  payload,
})
export const addPackageServicePackageRequested = payload => ({
  type: TYPE.ADD_PACKAGE_SERVICE_PACKAGE_REQUESTED,
  payload,
})
export const addPackageServicePackageSuccess = payload => ({
  type: TYPE.ADD_PACKAGE_SERVICE_PACKAGE_SUCCESS,
  payload,
})
export const addPackageServicePackageFail = payload => ({
  type: TYPE.ADD_PACKAGE_SERVICE_PACKAGE_FAIL,
  payload,
})

export const getPackageServicePackage = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_PACKAGE,
  payload,
})
export const getPackageServicePackageRequested = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_PACKAGE_REQUESTED,
  payload,
})
export const getPackageServicePackageSuccess = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_PACKAGE_SUCCESS,
  payload,
})
export const getPackageServicePackageFail = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_PACKAGE_FAIL,
  payload,
})

export const putPackageServicePackage = payload => ({
  type: TYPE.PUT_PACKAGE_SERVICE_PACKAGE,
  payload,
})
export const putPackageServicePackageRequested = payload => ({
  type: TYPE.PUT_PACKAGE_SERVICE_PACKAGE_REQUESTED,
  payload,
})
export const putPackageServicePackageSuccess = payload => ({
  type: TYPE.PUT_PACKAGE_SERVICE_PACKAGE_SUCCESS,
  payload,
})
export const putPackageServicePackageFail = payload => ({
  type: TYPE.PUT_PACKAGE_SERVICE_PACKAGE_FAIL,
  payload,
})

export const deletePackageServicePackage = payload => ({
  type: TYPE.DELETE_PACKAGE_SERVICE_PACKAGE,
  payload,
})
export const deletePackageServicePackageRequested = payload => ({
  type: TYPE.DELETE_PACKAGE_SERVICE_PACKAGE_REQUESTED,
  payload,
})
export const deletePackageServicePackageSuccess = payload => ({
  type: TYPE.DELETE_PACKAGE_SERVICE_PACKAGE_SUCCESS,
  payload,
})
export const deletePackageServicePackageFail = payload => ({
  type: TYPE.DELETE_PACKAGE_SERVICE_PACKAGE_FAIL,
  payload,
})
