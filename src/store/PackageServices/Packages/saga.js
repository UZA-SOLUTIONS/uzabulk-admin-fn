import { takeLatest } from "redux-saga/effects"
import * as TYPE from "./actionTypes"
import * as actions from "./actions"
import createSagaHandler from "helpers/create-saga-handler"

import {
  getPackageServicePackageList,
  addPackageServicePackage,
  getPackageServicePackage,
  putPackageServicePackage,
  deletePackageServicePackage,
} from "helpers/backend_helper"

function* saga() {
  const {
    getPackageServicePackageListRequested,
    getPackageServicePackageListSuccess,
    getPackageServicePackageListFail,
    addPackageServicePackageRequested,
    addPackageServicePackageSuccess,
    addPackageServicePackageFail,
    getPackageServicePackageRequested,
    getPackageServicePackageSuccess,
    getPackageServicePackageFail,
    putPackageServicePackageRequested,
    putPackageServicePackageSuccess,
    putPackageServicePackageFail,
    deletePackageServicePackageRequested,
    deletePackageServicePackageSuccess,
    deletePackageServicePackageFail,
  } = actions
  try {
    yield takeLatest(
      TYPE.GET_PACKAGE_SERVICE_PACKAGE_LIST,
      createSagaHandler({
        service: getPackageServicePackageList,
        requested: getPackageServicePackageListRequested,
        succeeded: getPackageServicePackageListSuccess,
        failed: getPackageServicePackageListFail,
      })
    )
    yield takeLatest(
      TYPE.ADD_PACKAGE_SERVICE_PACKAGE,
      createSagaHandler({
        service: addPackageServicePackage,
        requested: addPackageServicePackageRequested,
        succeeded: addPackageServicePackageSuccess,
        failed: addPackageServicePackageFail,
      })
    )
    yield takeLatest(
      TYPE.GET_PACKAGE_SERVICE_PACKAGE,
      createSagaHandler({
        service: getPackageServicePackage,
        requested: getPackageServicePackageRequested,
        succeeded: getPackageServicePackageSuccess,
        failed: getPackageServicePackageFail,
      })
    )
    yield takeLatest(
      TYPE.PUT_PACKAGE_SERVICE_PACKAGE,
      createSagaHandler({
        service: putPackageServicePackage,
        requested: putPackageServicePackageRequested,
        succeeded: putPackageServicePackageSuccess,
        failed: putPackageServicePackageFail,
      })
    )
    yield takeLatest(
      TYPE.DELETE_PACKAGE_SERVICE_PACKAGE,
      createSagaHandler({
        service: deletePackageServicePackage,
        requested: deletePackageServicePackageRequested,
        succeeded: deletePackageServicePackageSuccess,
        failed: deletePackageServicePackageFail,
      })
    )
  } catch (ex) {
    console.error(ex)
  }
}

export default saga()
