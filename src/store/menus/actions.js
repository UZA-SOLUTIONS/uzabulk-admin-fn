import {
  MENU_API_FAIL,
  GET_MENUS,
  GET_MENUS_FAIL,
  GET_MENUS_SUCCESS,
  ADD_MENU,
  ADD_MENU_FAIL,
  ADD_MENU_SUCCESS,
  GET_MENU,
  GET_MENU_FAIL,
  GET_MENU_SUCCESS,
  PUT_MENU,
  PUT_MENU_FAIL,
  PUT_MENU_SUCCESS,
  DELETE_MENU,
  DELETE_MENU_FAIL,
  DELETE_MENU_SUCCESS,
  PUT_MENUS_STATUS,
  PUT_MENUS_STATUS_FAIL,
  PUT_MENUS_STATUS_SUCCESS,
} from "./actionTypes"

/* menu files */
import {
  GET_MENU_FIELDS,
  GET_MENU_FIELDS_FAIL,
  GET_MENU_FIELDS_SUCCESS,
  ADD_MENU_FIELD,
  ADD_MENU_FIELD_FAIL,
  ADD_MENU_FIELD_SUCCESS,
  GET_MENU_FIELD,
  GET_MENU_FIELD_FAIL,
  GET_MENU_FIELD_SUCCESS,
  PUT_MENU_FIELD,
  PUT_MENU_FIELD_FAIL,
  PUT_MENU_FIELD_SUCCESS,
  DELETE_MENU_FIELD,
  DELETE_MENU_FIELD_FAIL,
  DELETE_MENU_FIELD_SUCCESS,
  PUT_MENU_FIELD_SORT,
  PUT_MENU_FIELD_SORT_FAIL,
  PUT_MENU_FIELD_SORT_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: MENU_API_FAIL,
  payload: error,
})

/* Get MENUs */
export const getMenus = data => ({
  type: GET_MENUS,
  payload: data,
})

export const getMenusSuccess = menus => ({
  type: GET_MENUS_SUCCESS,
  payload: menus,
})

export const getMenusFail = error => ({
  type: GET_MENUS_FAIL,
  payload: error,
})
/* Get Menus END */

/* Add Menu */
export const addMenu = (menu, history) => ({
  type: ADD_MENU,
  payload: { menu, history },
})

export const addMenuFail = error => ({
  type: ADD_MENU_FAIL,
  payload: error,
})

export const addMenuSuccess = () => ({
  type: ADD_MENU_SUCCESS,
})
/* Add Menu END */

/* Get Menu */
export const getMenu = id => ({
  type: GET_MENU,
  payload: id,
})

export const getMenuFail = error => ({
  type: GET_MENU_FAIL,
  payload: error,
})

export const getMenuSuccess = menu => ({
  type: GET_MENU_SUCCESS,
  payload: menu,
})
/* Get Menu END */

/* Update Menu */
export const putMenu = (data, history) => ({
  type: PUT_MENU,
  payload: { data, history },
})

export const putMenuFail = error => ({
  type: PUT_MENU_FAIL,
  payload: error,
})

export const putMenuSuccess = (data) => ({
  type: PUT_MENU_SUCCESS,
  payload: data
})
/* Update Menu END */

/* Delete Menu */
export const deleteMenu = (data, callback) => ({
  type: DELETE_MENU,
  payload: { data, callback },
})

export const deleteMenuFail = error => ({
  type: DELETE_MENU_FAIL,
  payload: error,
})

export const deleteMenuSuccess = () => ({
  type: DELETE_MENU_SUCCESS,
})
/* Delete Faz END */

/* Update Multi Menus Status */
export const putMenusStatus = (data, callback) => ({
  type: PUT_MENUS_STATUS,
  payload: { data, callback },
})

export const putMenusStatusFail = error => ({
  type: PUT_MENUS_STATUS_FAIL,
  payload: error,
})

export const putMenusStatusSuccess = () => ({
  type: PUT_MENUS_STATUS_SUCCESS,
})
/* Update Multi Menus Status END */

/* 
****************
Fields
****************
*/
/* Get Menu Fields */
export const getMenuFields = (data, callback) => ({
  type: GET_MENU_FIELDS,
  payload: { data, callback }
})

export const getMenuFieldsFail = (error) => ({
  type: GET_MENU_FIELDS_FAIL,
  payload: error
})

export const getMenuFieldsSuccess = (data) => ({
  type: GET_MENU_FIELDS_SUCCESS,
  payload: data
})
/* Get Menu Fields END */

/* Add Menu Field */
export const addMenuField = (menuField, history) => ({
  type: ADD_MENU_FIELD,
  payload: { menuField, history },
})

export const addMenuFieldFail = error => ({
  type: ADD_MENU_FIELD_FAIL,
  payload: error,
})

export const addMenuFieldSuccess = () => ({
  type: ADD_MENU_FIELD_SUCCESS,
})
/* Add Menu END */

/* Get Menu Field */
export const getMenuField = id => ({
  type: GET_MENU_FIELD,
  payload: id,
})

export const getMenuFieldFail = error => ({
  type: GET_MENU_FIELD_FAIL,
  payload: error,
})

export const getMenuFieldSuccess = menu => ({
  type: GET_MENU_FIELD_SUCCESS,
  payload: menu,
})
/* Get Menu Field END */

/* Update Menu Field */
export const putMenuField = (data, history) => ({
  type: PUT_MENU_FIELD,
  payload: { data, history },
})

export const putMenuFieldFail = error => ({
  type: PUT_MENU_FIELD_FAIL,
  payload: error,
})

export const putMenuFieldSuccess = () => ({
  type: PUT_MENU_FIELD_SUCCESS,
})
/* Update Menu Field END */

/* Delete Menu Field */
export const deleteMenuField = (data, callback) => ({
  type: DELETE_MENU_FIELD,
  payload: { data, callback },
})

export const deleteMenuFieldFail = error => ({
  type: DELETE_MENU_FIELD_FAIL,
  payload: error,
})

export const deleteMenuFieldSuccess = () => ({
  type: DELETE_MENU_FIELD_SUCCESS,
})
/* Delete Menu Field END */

/* Update doc template sort order */
export const putMenuFieldSort = (data, id) => ({
  type: PUT_MENU_FIELD_SORT,
  payload: { data, id },
})

export const putMenuFieldSortFail = error => ({
  type: PUT_MENU_FIELD_SORT_FAIL,
  payload: error,
})

export const putMenuFieldSortSuccess = () => ({
  type: PUT_MENU_FIELD_SORT_SUCCESS,
})
/* Update doc template sort order */
