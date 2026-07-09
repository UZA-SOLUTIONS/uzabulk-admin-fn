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

const INIT_STATE = {
  roles: [],
  totalRoles: 0,
  error: "",
  loading: false,
  role: {},
}

const Roles = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Roles */
    case GET_ROLES:
      return {
        ...state,
        loading: true,
      }

    case GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload.data || [],
        totalRoles: action.payload.totalcount || 0,
        loading: false,
      }

    case GET_ROLES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Roles END */

    /* Add Role */
    case ADD_ROLE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_ROLE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_ROLE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Role END */

    /* Get Role */
    case GET_ROLE:
      return {
        ...state,
        error: "",
        loading: true,
        role: {},
      }

    case GET_ROLE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        role: {},
      }

    case GET_ROLE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        role: action.payload,
      }
    /* Add Role END */

    /* Update Role */
    case PUT_ROLE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_ROLE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_ROLE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Role END */

    /* Delete Role */
    case DELETE_ROLE:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_ROLE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Role END */

    /* Update Roles Status */
    case PUT_ROLES_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_ROLES_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_ROLES_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Roles Status END */

    case ROLE_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Roles
