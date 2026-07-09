import { call, put, takeEvery } from "redux-saga/effects"

// SubAdmin Redux States
import {
  GET_SUB_ADMINS,
  ADD_SUB_ADMIN,
  GET_SUB_ADMIN,
  PUT_SUB_ADMIN,
  DELETE_SUB_ADMIN,
  PUT_SUB_ADMINS_STATUS,
  GET_DRIVER_DISPATCHER_LIST,
  GET_CUSTOMER_DISPATCHER_LIST,
  GET_VENDOR_LIST_SUBADMIN,
} from "./actionTypes"
import {
  getSubAdminsFail,
  getSubAdminsSuccess,
  addSubAdminFail,
  addSubAdminSuccess,
  getSubAdminFail,
  getSubAdminSuccess,
  putSubAdminFail,
  putSubAdminSuccess,
  deleteSubAdminFail,
  deleteSubAdminSuccess,
  putSubAdminsStatusFail,
  putSubAdminsStatusSuccess,
  getDriverDispatcherListFail,
  getDriverDispatcherListSuccess,
  getCustomerDispatcherListSuccess,
  getVendorListSubAdminSuccess,
} from "./actions"

import {
  getSubAdmins,
  postSubAdmin,
  getSubAdmin,
  putSubAdmin,
  deleteSubAdmin,
  putSubAdminsStatus,
  getDriverDispatcherList,
  getCustomerDispatcherList,
  getVendorList,
} from "helpers/backend_helper"

function* fetchSubAdmins({ payload }) {
  try {
    const response = yield call(getSubAdmins, payload)

    if (response.status == "failure") {
      return yield put(getSubAdminsFail(response.message))
    }

    yield put(getSubAdminsSuccess(response))
  } catch (error) {
    yield put(getSubAdminsFail(error))
  }
}

function* onAddNewSubAdmin({ payload: { subAdmin, history } }) {
  try {
    const response = yield call(postSubAdmin, subAdmin)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addSubAdminFail(response.message))
    }

    history && history.replace("/subAdmins")

    yield put(addSubAdminSuccess())
  } catch (error) {
    yield put(addSubAdminFail("Internal Error!"))
  }
}

function* fetchSubAdmin({ payload }) {
  try {
    const response = yield call(getSubAdmin, payload)

    if (response.status == "failure") {
      return yield put(getSubAdminFail(response.message))
    }

    yield put(getSubAdminSuccess(response.data))
  } catch (error) {
    yield put(getSubAdminFail(error))
  }
}

function* onPutSubAdmin({ payload: { data, history } }) {
  try {
    const response = yield call(putSubAdmin, data)

    if (response.status == "failure") {
      return yield put(putSubAdminFail(response.message))
    }

    history && history.replace("/subAdmins")

    yield put(putSubAdminSuccess())
  } catch (error) {
    yield put(putSubAdminFail("Internal Error!"))
  }
}

function* onDeleteSubAdmin({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteSubAdmin, data)

    if (response.status == "failure") {
      return yield put(deleteSubAdminFail(response.message))
    }

    yield put(deleteSubAdminSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteSubAdminFail("Internal Error!"))
  }
}

function* onPutSubAdminsStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putSubAdminsStatus, data)

    if (response.status == "failure") {
      return yield put(putSubAdminsStatusFail(response.message))
    }

    yield put(putSubAdminsStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putSubAdminsStatusFail("Internal Error!"))
  }
}

function* onpostDriverDispactherList({ payload: { data } }) {
  console.log(data, "GAGA")
  try {
    const response = yield call(getDriverDispatcherList, data)

    if (response.status == "failure") {
      return yield put(putSubAdminsStatusFail(response.message))
    }

    yield put(getDriverDispatcherListSuccess(response.data))
  } catch (error) {
    yield put(getDriverDispatcherListFail("Internal Error!"))
  }
}

function* onpostCustomerDispactherList({ payload: { data } }) {
  try {
    const response = yield call(getCustomerDispatcherList, data)

    if (response.status == "failure") {
      return yield put(putSubAdminsStatusFail(response.message))
    }

    yield put(getCustomerDispatcherListSuccess(response.data))
  } catch (error) {
    yield put(getDriverDispatcherListFail("Internal Error!"))
  }
}


function* fetchSubAdminsVendorList({ payload }) {

  console.log(payload, "DATAT")
  try {
    const response = yield call(getVendorList, payload)
    console.log(response, "7777777")
    if (response.status == "failure") {
      return yield put(getSubAdminsFail(response.message))
    }
    yield put(getVendorListSubAdminSuccess(response.data))
  } catch (error) {
    yield put(getSubAdminsFail("Internal Error"))
  }
}

function* SubAdminsSaga() {
  yield takeEvery(GET_SUB_ADMINS, fetchSubAdmins)
  yield takeEvery(GET_VENDOR_LIST_SUBADMIN, fetchSubAdminsVendorList)
  yield takeEvery(ADD_SUB_ADMIN, onAddNewSubAdmin)
  yield takeEvery(GET_SUB_ADMIN, fetchSubAdmin)
  yield takeEvery(PUT_SUB_ADMIN, onPutSubAdmin)
  yield takeEvery(DELETE_SUB_ADMIN, onDeleteSubAdmin)
  yield takeEvery(PUT_SUB_ADMINS_STATUS, onPutSubAdminsStatus),
    yield takeEvery(GET_DRIVER_DISPATCHER_LIST, onpostDriverDispactherList),
    yield takeEvery(GET_CUSTOMER_DISPATCHER_LIST, onpostCustomerDispactherList)
}

export default SubAdminsSaga
