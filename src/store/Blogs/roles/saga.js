import { call, put, takeEvery } from "redux-saga/effects"

// Role Redux States
import {
  GET_ROLES,
  ADD_ROLE,
  GET_ROLE,
  PUT_ROLE,
  DELETE_ROLE,
  PUT_ROLES_STATUS,
} from "./actionTypes"
import {
  getRolesFail,
  getRolesSuccess,
  addRoleFail,
  addRoleSuccess,
  getRoleFail,
  getRoleSuccess,
  putRoleFail,
  putRoleSuccess,
  deleteRoleFail,
  deleteRoleSuccess,
  putRolesStatusFail,
  putRolesStatusSuccess,
} from "./actions"

import {
  getRoles,
  postRole,
  getRole,
  putRole,
  deleteRole,
  putRolesStatus,
} from "helpers/backend_helper"

function* fetchRoles({ payload }) {
  try {
    const response = yield call(getRoles, payload)

    if (response.status == "failure") {
      return yield put(getRolesFail(response.message))
    }

    yield put(getRolesSuccess(response))
  } catch (error) {
    yield put(getRolesFail(error))
  }
}

function* onAddNewRole({
  payload: { role, history, vendorrole, lowerCaseStoreType },
}) {
  try {
    const response = yield call(postRole, role)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addRoleFail(response.message))
    }

    if (vendorrole !== "VENDOR") {
      history && history.replace("/roles")
    } else {
      history && history.replace(`/${lowerCaseStoreType}/roles`)
    }

    yield put(addRoleSuccess())
  } catch (error) {
    yield put(addRoleFail("Internal Error!"))
  }
}

function* fetchRole({ payload }) {
  try {
    const response = yield call(getRole, payload)

    if (response.status == "failure") {
      return yield put(getRoleFail(response.message))
    }

    yield put(getRoleSuccess(response.data))
  } catch (error) {
    yield put(getRoleFail(error))
  }
}

function* onPutRole({
  payload: { data, history, vendorrole, lowerCaseStoreType },
}) {
  console.log(vendorrole, lowerCaseStoreType, "vendorrole")

  try {
    const response = yield call(putRole, data)

    if (response.status == "failure") {
      return yield put(putRoleFail(response.message))
    }

    if (vendorrole !== "VENDOR") {
      history && history.replace("/roles")
    } else {
      history && history.replace(`/${lowerCaseStoreType}/roles`)
    }
    yield put(putRoleSuccess())
  } catch (error) {
    yield put(putRoleFail("Internal Error!"))
  }
}

function* onDeleteRole({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteRole, data)

    if (response.status == "failure") {
      return yield put(deleteRoleFail(response.message))
    }

    yield put(deleteRoleSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteRoleFail("Internal Error!"))
  }
}

function* onPutRolesStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putRolesStatus, data)

    if (response.status == "failure") {
      return yield put(putRolesStatusFail(response.message))
    }

    yield put(putRolesStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putRolesStatusFail("Internal Error!"))
  }
}

function* RolesSaga() {
  yield takeEvery(GET_ROLES, fetchRoles)
  yield takeEvery(ADD_ROLE, onAddNewRole)
  yield takeEvery(GET_ROLE, fetchRole)
  yield takeEvery(PUT_ROLE, onPutRole)
  yield takeEvery(DELETE_ROLE, onDeleteRole)
  yield takeEvery(PUT_ROLES_STATUS, onPutRolesStatus)
}

export default RolesSaga
