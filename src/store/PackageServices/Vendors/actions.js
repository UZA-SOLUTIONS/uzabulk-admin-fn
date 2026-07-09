import * as TYPE from "./actionTypes"

export const getPackageServiceVendorList = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_VENDOR_LIST,
  payload,
})
export const getPackageServiceVendorListRequested = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_VENDOR_LIST_REQUESTED,
  payload,
})
export const getPackageServiceVendorListSuccess = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_VENDOR_LIST_SUCCESS,
  payload,
})
export const getPackageServiceVendorListFail = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_VENDOR_LIST_FAIL,
  payload,
})

export const addPackageServiceVendor = payload => ({
  type: TYPE.ADD_PACKAGE_SERVICE_VENDOR,
  payload,
})
export const addPackageServiceVendorRequested = payload => ({
  type: TYPE.ADD_PACKAGE_SERVICE_VENDOR_REQUESTED,
  payload,
})
export const addPackageServiceVendorSuccess = payload => ({
  type: TYPE.ADD_PACKAGE_SERVICE_VENDOR_SUCCESS,
  payload,
})
export const addPackageServiceVendorFail = payload => ({
  type: TYPE.ADD_PACKAGE_SERVICE_VENDOR_FAIL,
  payload,
})

export const getPackageServiceVendor = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_VENDOR,
  payload,
})
export const getPackageServiceVendorRequested = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_VENDOR_REQUESTED,
  payload,
})
export const getPackageServiceVendorSuccess = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_VENDOR_SUCCESS,
  payload,
})
export const getPackageServiceVendorFail = payload => ({
  type: TYPE.GET_PACKAGE_SERVICE_VENDOR_FAIL,
  payload,
})

export const putPackageServiceVendor = payload => ({
  type: TYPE.PUT_PACKAGE_SERVICE_VENDOR,
  payload,
})
export const putPackageServiceVendorRequested = payload => ({
  type: TYPE.PUT_PACKAGE_SERVICE_VENDOR_REQUESTED,
  payload,
})
export const putPackageServiceVendorSuccess = payload => ({
  type: TYPE.PUT_PACKAGE_SERVICE_VENDOR_SUCCESS,
  payload,
})
export const putPackageServiceVendorFail = payload => ({
  type: TYPE.PUT_PACKAGE_SERVICE_VENDOR_FAIL,
  payload,
})

export const deletePackageServiceVendor = payload => ({
  type: TYPE.DELETE_PACKAGE_SERVICE_VENDOR,
  payload,
})
export const deletePackageServiceVendorRequested = payload => ({
  type: TYPE.DELETE_PACKAGE_SERVICE_VENDOR_REQUESTED,
  payload,
})
export const deletePackageServiceVendorSuccess = payload => ({
  type: TYPE.DELETE_PACKAGE_SERVICE_VENDOR_SUCCESS,
  payload,
})
export const deletePackageServiceVendorFail = payload => ({
  type: TYPE.DELETE_PACKAGE_SERVICE_VENDOR_FAIL,
  payload,
})
