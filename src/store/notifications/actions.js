import {
  NOTIFICATION_API_FAIL,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_SUCCESS,
  POST_NOTIFICATION,
  POST_NOTIFICATION_FAIL,
  POST_NOTIFICATION_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: NOTIFICATION_API_FAIL,
  payload: error,
})

/* Get NOTIFICATIONs */
export const getNotifications = data => ({
  type: GET_NOTIFICATIONS,
  payload: data,
})

export const getNotificationsSuccess = notification => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  payload: notification,
})

export const getNotificationsFail = error => ({
  type: GET_NOTIFICATIONS_FAIL,
  payload: error,
})
/* Get Notifications END */

/* Send Notification */
export const postNotification = (data, history) => ({
  type: POST_NOTIFICATION,
  payload: { data, history },
})

export const postNotificationFail = error => ({
  type: POST_NOTIFICATION_FAIL,
  payload: error,
})

export const postNotificationSuccess = () => ({
  type: POST_NOTIFICATION_SUCCESS,
})
/* Send Notification END */
