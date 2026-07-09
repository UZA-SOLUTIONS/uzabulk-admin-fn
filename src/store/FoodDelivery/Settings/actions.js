import {
  GET_MERCHANT_ACCOUNT,
  GET_MERCHANT_ACCOUNT_FAILURE,
  GET_MERCHANT_ACCOUNT_SUCCESS,
  GET_STORE_SETTINGS,
  GET_STORE_SETTINGS_FAIL,
  GET_STORE_SETTINGS_SUCCESS,
  PUT_STORE_SETTINGS,
  PUT_STORE_SETTINGS_FAIL,
  PUT_STORE_SETTINGS_SUCCESS,
} from "./actionTypes"

export const getStoreSettings = (storeType, id) => ({
  type: GET_STORE_SETTINGS,
  payload: { storeType, id },
})

export const getStoreSettingsSuccess = data => ({
  type: GET_STORE_SETTINGS_SUCCESS,
  payload: data,
})

export const getStoreSettingsFail = error => ({
  type: GET_STORE_SETTINGS_FAIL,
  payload: error,
})

export const putStoreSettings = (storeType, data) => ({
  type: PUT_STORE_SETTINGS,
  payload: { storeType, data },
})

export const putStoreSettingsSuccess = data => ({
  type: PUT_STORE_SETTINGS_SUCCESS,
  payload: data,
})

export const putStoreSettingsFail = error => ({
  type: PUT_STORE_SETTINGS_FAIL,
  payload: error,
})


export const getMerchantAccount = (id) => ({
  type: GET_MERCHANT_ACCOUNT,
  payload: { id }

})
export const getMerchantAccountSuccess = (data) => ({
  type: GET_MERCHANT_ACCOUNT_SUCCESS,
  payload: data

})
export const getMerchantAccountFailure = (err) => ({
  type: GET_MERCHANT_ACCOUNT_FAILURE,
  payload: err

})