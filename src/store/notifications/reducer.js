import {
  NOTIFICATION_API_FAIL,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_SUCCESS,
  POST_NOTIFICATION,
  POST_NOTIFICATION_FAIL,
  POST_NOTIFICATION_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  notifications: [],
  totalNotifications: 0,
  error: "",
  loading: false,
}

const Notification = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Notifications */
    case GET_NOTIFICATIONS:
      return {
        ...state,
        loading: true,
      }

    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload.data || [],
        totalNotifications: action.payload.totalcount || 0,
        loading: false,
      }

    case GET_NOTIFICATIONS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Notifications END */

    /* Send Promo Code */
    case POST_NOTIFICATION:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case POST_NOTIFICATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case POST_NOTIFICATION_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Send Promo Code END */

    case NOTIFICATION_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Notification
