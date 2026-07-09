import { takeLatest } from "redux-saga/effects"
import * as TYPE from "./actionTypes"
import * as actions from "./actions"
import createSagaHandler from "helpers/create-saga-handler"

import {
  getPackageServiceVendorList,
  addPackageServiceVendor,
  getPackageServiceVendor,
  putPackageServiceVendor,
  deletePackageServiceVendor,
} from "helpers/backend_helper"

function* saga() {
  const {
    getPackageServiceVendorListRequested,
    getPackageServiceVendorListSuccess,
    getPackageServiceVendorListFail,
    addPackageServiceVendorRequested,
    addPackageServiceVendorSuccess,
    addPackageServiceVendorFail,
    getPackageServiceVendorRequested,
    getPackageServiceVendorSuccess,
    getPackageServiceVendorFail,
    putPackageServiceVendorRequested,
    putPackageServiceVendorSuccess,
    putPackageServiceVendorFail,
    deletePackageServiceVendorRequested,
    deletePackageServiceVendorSuccess,
    deletePackageServiceVendorFail,
  } = actions
  try {
    yield takeLatest(
      TYPE.GET_PACKAGE_SERVICE_VENDOR_LIST,
      createSagaHandler({
        service: getPackageServiceVendorList,
        requested: getPackageServiceVendorListRequested,
        succeeded: getPackageServiceVendorListSuccess,
        failed: getPackageServiceVendorListFail,
      })
    )
    yield takeLatest(
      TYPE.ADD_PACKAGE_SERVICE_VENDOR,
      createSagaHandler({
        service: addPackageServiceVendor,
        requested: addPackageServiceVendorRequested,
        succeeded: addPackageServiceVendorSuccess,
        failed: addPackageServiceVendorFail,
      })
    )
    yield takeLatest(
      TYPE.GET_PACKAGE_SERVICE_VENDOR,
      createSagaHandler({
        service: getPackageServiceVendor,
        requested: getPackageServiceVendorRequested,
        succeeded: getPackageServiceVendorSuccess,
        failed: getPackageServiceVendorFail,
      })
    )
    yield takeLatest(
      TYPE.PUT_PACKAGE_SERVICE_VENDOR,
      createSagaHandler({
        service: putPackageServiceVendor,
        requested: putPackageServiceVendorRequested,
        succeeded: putPackageServiceVendorSuccess,
        failed: putPackageServiceVendorFail,
      })
    )
    yield takeLatest(
      TYPE.DELETE_PACKAGE_SERVICE_VENDOR,
      createSagaHandler({
        service: deletePackageServiceVendor,
        requested: deletePackageServiceVendorRequested,
        succeeded: deletePackageServiceVendorSuccess,
        failed: deletePackageServiceVendorFail,
      })
    )
  } catch (ex) {
    console.error(ex)
  }
}

export default saga()
