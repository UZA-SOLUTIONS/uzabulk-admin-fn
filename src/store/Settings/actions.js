import {
  GET_SETTINGS,
  GET_SETTINGS_FAIL,
  GET_SETTINGS_SUCCESS,
  PUT_SETTINGS,
  PUT_SETTINGS_FAIL,
  PUT_SETTINGS_SUCCESS,
  GET_ACCESS_LIST,
  GET_ACCESS_LIST_SUCCESS,
  GET_ACCESS_LIST_FAIL,
  GET_STORE_TYPES,
  GET_STORE_TYPES_SUCCESS,
  GET_STORE_TYPES_FAIL,
  GET_STARTED,
  GET_STARTED_SUCCESS,
  GET_STARTED_FAIL,
  DELETE_STORE,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_FAIL,
  ADD_PAY360_BANK_ACCOUNT,
  ADD_PAY360_BANK_ACCOUNT_SUCCESS,
  ADD_PAY360_BANK_ACCOUNT_FAILURE,
  ADD_PAY360_MERCHANT,
  ADD_PAY360_MERCHANT_FAILURE,
  ADD_PAY360_MERCHANT_SUCCESS,
  GET_PAY360_BANK_ACCOUNT,
  GET_PAY360_BANK_ACCOUNT_SUCCESS,
  GET_PAY360_BANK_ACCOUNT_FAILURE,
  GET_PAY360_MERCHANT,
  GET_PAY360_MERCHANT_SUCCESS,
  GET_PAY360_MERCHANT_FAILURE
} from "./actionTypes"

/* Get Global Settings */
export const getSettings = () => ({
  type: GET_SETTINGS,
})

export const getSettingsSuccess = data => ({
  type: GET_SETTINGS_SUCCESS,
  payload: data,
})

export const getSettingsFail = error => ({
  type: GET_SETTINGS_FAIL,
  payload: error,
})
/* Get Global Settings END */

/* Update Global Settings */
export const putSettings = data => ({
  type: PUT_SETTINGS,
  payload: data,
})

export const putSettingsSuccess = data => ({
  type: PUT_SETTINGS_SUCCESS,
  payload: data,
})

export const putSettingsFail = error => ({
  type: PUT_SETTINGS_FAIL,
  payload: error,
})
/* Update Global Settings END */

/* Get Access List */
export const getAccessList = () => ({
  type: GET_ACCESS_LIST,
})

export const getAccessListSuccess = data => ({
  type: GET_ACCESS_LIST_SUCCESS,
  payload: data,
})

export const getAccessListFail = error => ({
  type: GET_ACCESS_LIST_FAIL,
  payload: error,
})
/* Get Access List END */

/* Get Store Types */
export const getStoreTypes = () => ({
  type: GET_STORE_TYPES,
})

export const getStoreTypesSuccess = data => ({
  type: GET_STORE_TYPES_SUCCESS,
  payload: data,
})

export const getStoreTypesFail = error => ({
  type: GET_STORE_TYPES_FAIL,
  payload: error,
})
/* Get Store Types END */

/* Get Store Started */
export const getStarted = () => ({
  type: GET_STARTED,
})

export const getStartedSuccess = data => ({
  type: GET_STARTED_SUCCESS,
  payload: data,
})

export const getStartedFail = error => ({
  type: GET_STARTED_FAIL,
  payload: error,
})
/* Get Store Started END */

/* Delete Store */
export const deleteStore = (history) => ({
  type: DELETE_STORE,
  payload: { history }
})

export const deleteStoreSuccess = () => ({
  type: DELETE_STORE_SUCCESS
})

export const deleteStoreFail = (error) => ({
  type: DELETE_STORE_FAIL,
  payload: error
})
/* Delete Store END */

/* PAY 360 Bank Account  */

export const addBankAccount = (data, callback) => {
  return {
    type: ADD_PAY360_BANK_ACCOUNT,
    payload: { data, callback }
  }
}

export const addBankAccountSuccess = (data) => {
  return {
    type: ADD_PAY360_BANK_ACCOUNT_SUCCESS,
    payload: data
  }
}

export const addBankAccountFaiure = (err) => {
  return {
    type: ADD_PAY360_BANK_ACCOUNT_FAILURE,
    payload: err
  }
}

export const getBankAccount = () => {
  return {
    type: GET_PAY360_BANK_ACCOUNT
  }
}

export const getBankAccountSuccess = (data) => {
  return {
    type: GET_PAY360_BANK_ACCOUNT_SUCCESS,
    payload: data
  }
}

export const getBankAccountFaiure = (err) => {
  return {
    type: GET_PAY360_BANK_ACCOUNT_FAILURE,
    payload: err
  }
}
/* PAY 360 Bank Account End */

/* Pay360 Merchant */
export const addMerchant = (data, callback) => {
  return {
    type: ADD_PAY360_MERCHANT,
    payload: { data, callback }
  }
}

export const addMerchantSuccess = (data) => {
  return {
    type: ADD_PAY360_MERCHANT_SUCCESS,
    payload: data
  }
}

export const addMerchantFaiure = (err) => {
  return {
    type: ADD_PAY360_MERCHANT_FAILURE,
    payload: err
  }
}

export const getMerchant = (data) => {
  return {
    type: GET_PAY360_MERCHANT,
    payload: data
  }
}

export const getMerchantSuccess = (data) => {
  return {
    type: GET_PAY360_MERCHANT_SUCCESS,
    payload: data
  }
}

export const getMerchantFaiure = (err) => {
  return {
    type: GET_PAY360_MERCHANT_FAILURE,
    payload: err
  }
}


/* Pay360 Merchant ENd */ 