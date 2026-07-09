import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// menu Redux States
import {
  GET_MENUS,
  ADD_MENU,
  GET_MENU,
  PUT_MENU,
  DELETE_MENU,
  PUT_MENUS_STATUS,
} from "./actionTypes"
import {
  getMenusFail,
  getMenusSuccess,
  addMenuFail,
  addMenuSuccess,
  getMenuFail,
  getMenuSuccess,
  putMenuFail,
  putMenuSuccess,
  deleteMenuFail,
  deleteMenuSuccess,
  putMenusStatusFail,
  putMenusStatusSuccess,
} from "./actions"

import {
  getMenus,
  postMenu,
  getMenu,
  putMenu,
  deleteMenu,
  putMenusStatus,
} from "helpers/backend_helper"

/* 
****************
Fields
****************
*/
import {
  GET_MENU_FIELDS,
  ADD_MENU_FIELD,
  GET_MENU_FIELD,
  PUT_MENU_FIELD,
  DELETE_MENU_FIELD,
  PUT_MENU_FIELD_SORT,
} from "./actionTypes"
import {
  getMenu as getMenuAction,
  getMenuFieldsFail,
  getMenuFieldsSuccess,
  addMenuFieldFail,
  addMenuFieldSuccess,
  getMenuFieldFail,
  getMenuFieldSuccess,
  putMenuFieldFail,
  putMenuFieldSuccess,
  deleteMenuFieldFail,
  deleteMenuFieldSuccess,
  putMenuFieldSortFail,
  putMenuFieldSortSuccess,
} from "./actions"
import {
  getMenuFields,
  postMenuField,
  getMenuField,
  putMenuField,
  deleteMenuField,
  putMenuFieldSort,
} from "helpers/backend_helper"

function* fetchMenus({ payload }) {
  try {
    const response = yield call(getMenus, payload)

    if (response.status == "failure") {
      return yield put(getMenusFail(response.message))
    }

    yield put(getMenusSuccess(response))
  } catch (error) {
    yield put(getMenusFail(error))
  }
}

function* onAddNewMenu({ payload: { menu, history } }) {
  try {
    const response = yield call(postMenu, menu)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addMenuFail(response.message))
    }

    history && history.replace("/promo-codes")

    yield put(addMenuSuccess())
  } catch (error) {
    yield put(addMenuFail("Internal Error!"))
  }
}

function* fetchMenu({ payload }) {
  try {
    const response = yield call(getMenu, payload)

    if (response.status == "failure") {
      return yield put(getMenuFail(response.message))
    }

    yield put(getMenuSuccess(response.data))
  } catch (error) {
    yield put(getMenuFail(error))
  }
}

function* onPutMenu({ payload: { data, history } }) {
  try {
    const response = yield call(putMenu, data)

    if (response.status == "failure") {
      return yield put(putMenuFail(response.message))
    }

    if (!data.isFields) {
      history && history.replace("/menus")
    } else {
      history &&
        history.replace(
          history.location.pathname + "?content_name=" + response.data?.label
        )
    }

    yield put(putMenuSuccess(response.data))
  } catch (error) {
    yield put(putMenuFail("Internal Error!"))
  }
}

function* onDeleteMenu({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteMenu, data)

    if (response.status == "failure") {
      return yield put(deleteMenuFail(response.message))
    }

    yield put(deleteMenuSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteMenuFail("Internal Error!"))
  }
}

function* onPutMenusStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putMenusStatus, data)

    if (response.status == "failure") {
      return yield put(putMenusStatusFail(response.message))
    }

    yield put(putMenusStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putMenusStatusFail("Internal Error!"))
  }
}

/* 
****************
Fields
****************
*/
function* onGetMenuFields({ payload: { data, callback } }) {
  try {
    const response = yield call(getMenuFields, data)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(getMenuFieldsFail(response.message))
    }

    callback && callback(response)

    yield put(getMenuFieldsSuccess(response.data))
  } catch (error) {
    yield put(getMenuFieldsFail("Internal Error!"))
  }
}

function* onAddNewMenuField({ payload: { menuField, history } }) {
  try {
    const response = yield call(postMenuField, menuField)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(addMenuFieldFail(response.message))
    }

    history && history.goBack()

    yield put(addMenuFieldSuccess())
  } catch (error) {
    yield put(addMenuFieldFail("Internal Error!"))
  }
}

function* fetchMenuField({ payload }) {
  try {
    const response = yield call(getMenuField, payload)

    if (response.status == "failure") {
      return yield put(getMenuFieldFail(response.message))
    }

    yield put(getMenuFieldSuccess(response.data))
  } catch (error) {
    yield put(getMenuFieldFail(error))
  }
}

function* onPutMenuField({ payload: { data, history } }) {
  try {
    const response = yield call(putMenuField, data)

    if (response.status == "failure") {
      return yield put(putMenuFieldFail(response.message))
    }

    history && history.goBack()

    yield put(putMenuFieldSuccess())
  } catch (error) {
    yield put(putMenuFailField("Internal Error!"))
  }
}

function* onDeleteMenuField({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteMenuField, data)

    if (response.status == "failure") {
      return yield put(deleteMenuFieldFail(response.message))
    }

    yield put(deleteMenuFieldSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteMenuFieldFail("Internal Error!"))
  }
}

function* onPutMenuSort({ payload: { data, id } }) {
  try {
    const response = yield call(putMenuFieldSort, data)

    if (response.status == "failure") {
      return yield put(putMenuFieldSortFail(response.message))
    }

    yield put(getMenuAction(id))
    yield put(putMenuFieldSortSuccess())
  } catch (error) {
    console.log("erro ", error)
    yield put(putMenuFieldSortFail("Internal Error!"))
  }
}

/* Main Function */
function* MenusSaga() {
  yield takeEvery(GET_MENUS, fetchMenus)
  yield takeEvery(ADD_MENU, onAddNewMenu)
  yield takeEvery(GET_MENU, fetchMenu)
  yield takeEvery(PUT_MENU, onPutMenu)
  yield takeEvery(DELETE_MENU, onDeleteMenu)
  yield takeEvery(PUT_MENUS_STATUS, onPutMenusStatus)

  /* 
  ****************
  Fields
  ****************
  */
  yield takeLatest(GET_MENU_FIELDS, onGetMenuFields)
  yield takeEvery(ADD_MENU_FIELD, onAddNewMenuField)
  yield takeEvery(GET_MENU_FIELD, fetchMenuField)
  yield takeEvery(PUT_MENU_FIELD, onPutMenuField)
  yield takeEvery(DELETE_MENU_FIELD, onDeleteMenuField)
  yield takeEvery(PUT_MENU_FIELD_SORT, onPutMenuSort)
}

export default MenusSaga
