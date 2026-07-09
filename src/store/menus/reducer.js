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

/* 
****************
Fields
****************
*/
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

const INIT_STATE = {
  menus: [],
  totalMenus: 0,
  error: "",
  loading: false,
  menu: {},
  menuFields: [],
  menuField: {},
}

const Menu = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Menus */
    case GET_MENUS:
      return {
        ...state,
        loading: true,
      }

    case GET_MENUS_SUCCESS:
      return {
        ...state,
        menus: action.payload.data || [],
        totalMenus: action.payload.totalcount || 0,
        loading: false,
        error: "",
      }

    case GET_MENUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Menus END */

    /* Add Promo Code */
    case ADD_MENU:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_MENU_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_MENU_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Promo Code END */

    /* Get Promo Code */
    case GET_MENU:
      return {
        ...state,
        error: "",
        loading: true,
        // menu: {},
      }

    case GET_MENU_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        menu: {},
      }

    case GET_MENU_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        menu: action.payload,
      }
    /* Add Promo Code END */

    /* Update Promo Code */
    case PUT_MENU:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_MENU_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_MENU_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        menu: {
          ...state.menu,
          title: action.payload?.title
        },
      }
    /* Update Promo Code END */

    /* Delete Promo Code */
    case DELETE_MENU:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_MENU_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_MENU_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Promo Code END */

    /* Update Promo Codes Status */
    case PUT_MENUS_STATUS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_MENUS_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_MENUS_STATUS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Promo Codes Status END */

    case MENU_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    /* 
    ****************
    Fields
    ****************
    */
    /* Get Menu Fields */
    case GET_MENU_FIELDS:
      return {
        ...state,
        error: "",
        loading: false
      }

    case GET_MENU_FIELDS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case GET_MENU_FIELDS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        menuFields: action.payload
      }
    /* Get Menu Fields END */

    /* Add Menu Field */
    case ADD_MENU_FIELD:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case ADD_MENU_FIELD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_MENU_FIELD_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Add Menu Field END */

    /* Get Menu */
    case GET_MENU_FIELD:
      return {
        ...state,
        error: "",
        loading: true,
        menuField: {},
      }

    case GET_MENU_FIELD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        menuField: {},
      }

    case GET_MENU_FIELD_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        menuField: action.payload,
      }
    /* Get Menu END */

    /* Update Menu */
    case PUT_MENU_FIELD:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_MENU_FIELD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_MENU_FIELD_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Menu END */

    /* Delete Menu Field */
    case DELETE_MENU_FIELD:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case DELETE_MENU_FIELD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_MENU_FIELD_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Delete Menu END */

    /* Update Menu Sort Order */
    case PUT_MENU_FIELD_SORT:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case PUT_MENU_FIELD_SORT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_MENU_FIELD_SORT_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Update Menu Sort Order END */

    default:
      return state
  }
}

export default Menu
