import {
  ROLE_API_FAIL,
  GET_ROLES,
  GET_ROLES_FAIL,
  GET_ROLES_SUCCESS,
  ADD_ROLE,
  ADD_ROLE_FAIL,
  ADD_ROLE_SUCCESS,
  GET_ROLE,
  GET_ROLE_FAIL,
  GET_ROLE_SUCCESS,
  PUT_ROLE,
  PUT_ROLE_FAIL,
  PUT_ROLE_SUCCESS,
  DELETE_ROLE,
  DELETE_ROLE_FAIL,
  DELETE_ROLE_SUCCESS,
  PUT_ROLES_STATUS,
  PUT_ROLES_STATUS_FAIL,
  PUT_ROLES_STATUS_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: ROLE_API_FAIL,
  payload: error,
})

/* Get roles */
export const getRoles = data => ({
  type: GET_ROLES,
  payload: data,
})

export const getRolesSuccess = roles => ({
  type: GET_ROLES_SUCCESS,
  payload: roles,
})

export const getRolesFail = error => ({
  type: GET_ROLES_FAIL,
  payload: error,
})
/* Get Roles END */

/* Add Role */
export const addRole = (role, history, vendorrole, lowerCaseStoreType) => ({
  type: ADD_ROLE,
  payload: { role, history, vendorrole, lowerCaseStoreType },
})

export const addRoleFail = error => ({
  type: ADD_ROLE_FAIL,
  payload: error,
})

export const addRoleSuccess = () => ({
  type: ADD_ROLE_SUCCESS,
})
/* Add Role END */

/* Get Role */
export const getRole = id => ({
  type: GET_ROLE,
  payload: id,
})

export const getRoleFail = error => ({
  type: GET_ROLE_FAIL,
  payload: error,
})

export const getRoleSuccess = role => ({
  type: GET_ROLE_SUCCESS,
  payload: role,
})
/* Get Role END */

/* Update Role */
export const putRole = (data, history, vendorrole, lowerCaseStoreType) => ({
  type: PUT_ROLE,
  payload: { data, history, vendorrole, lowerCaseStoreType },
})

export const putRoleFail = error => ({
  type: PUT_ROLE_FAIL,
  payload: error,
})

export const putRoleSuccess = () => ({
  type: PUT_ROLE_SUCCESS,
})
/* Update Role END */

/* Delete Role */
export const deleteRole = (data, callback) => ({
  type: DELETE_ROLE,
  payload: { data, callback },
})

export const deleteRoleFail = error => ({
  type: DELETE_ROLE_FAIL,
  payload: error,
})

export const deleteRoleSuccess = () => ({
  type: DELETE_ROLE_SUCCESS,
})
/* Delete Faz END */

/* Update Multi Roles Status */
export const putRolesStatus = (data, callback) => ({
  type: PUT_ROLES_STATUS,
  payload: { data, callback },
})

export const putRolesStatusFail = error => ({
  type: PUT_ROLES_STATUS_FAIL,
  payload: error,
})

export const putRolesStatusSuccess = () => ({
  type: PUT_ROLES_STATUS_SUCCESS,
})
/* Update Multi Roles Status END */
