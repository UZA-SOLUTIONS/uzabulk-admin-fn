import {
  API_FAIL,
  GET_CUSTOMERS,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
  ADD_CUSTOMER,
  ADD_CUSTOMER_FAIL,
  ADD_CUSTOMER_SUCCESS,
  GET_CUSTOMER,
  GET_CUSTOMER_FAIL,
  GET_CUSTOMER_SUCCESS,
  PUT_CUSTOMER,
  PUT_CUSTOMER_FAIL,
  PUT_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_ADDRESS,
  ADD_CUSTOMER_ADDRESS_FAIL,
  ADD_CUSTOMER_ADDRESS_SUCCESS,
  GET_CUSTOMER_ADDRESS,
  GET_CUSTOMER_ADDRESS_FAIL,
  GET_CUSTOMER_ADDRESS_SUCCESS,
  PUT_CUSTOMER_ADDRESS,
  PUT_CUSTOMER_ADDRESS_FAIL,
  PUT_CUSTOMER_ADDRESS_SUCCESS,
  DELETE_CUSTOMER_ADDRESS,
  DELETE_CUSTOMER_ADDRESS_FAIL,
  DELETE_CUSTOMER_ADDRESS_SUCCESS,
  PUT_CUSTOMERS_STATUS,
  PUT_CUSTOMERS_STATUS_FAIL,
  PUT_CUSTOMERS_STATUS_SUCCESS,
  EXPORT_CUSTOMERS,
  EXPORT_CUSTOMERS_SUCCESS,
  EXPORT_CUSTOMERS_FAIL,
  IMPORT_CUSTOMERS,
  IMPORT_CUSTOMERS_SUCCESS,
  IMPORT_CUSTOMERS_FAIL,
} from "./actionTypes"

/* Document */
import {
  GET_FD_CUSTOMER_DOCUMENTS,
  GET_FD_CUSTOMER_DOCUMENTS_FAIL,
  GET_FD_CUSTOMER_DOCUMENTS_SUCCESS,
  POST_FD_CUSTOMER_DOCUMENT,
  POST_FD_CUSTOMER_DOCUMENT_FAIL,
  POST_FD_CUSTOMER_DOCUMENT_SUCCESS,
  GET_FD_CUSTOMER_DOCUMENT,
  GET_FD_CUSTOMER_DOCUMENT_FAIL,
  GET_FD_CUSTOMER_DOCUMENT_SUCCESS,
  PUT_FD_CUSTOMER_DOCUMENT,
  PUT_FD_CUSTOMER_DOCUMENT_FAIL,
  PUT_FD_CUSTOMER_DOCUMENT_SUCCESS,
  DELETE_FD_CUSTOMER_DOCUMENT,
  DELETE_FD_CUSTOMER_DOCUMENT_FAIL,
  DELETE_FD_CUSTOMER_DOCUMENT_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: API_FAIL,
  payload: error,
})

/* Get Customers */
export const getCustomers = data => ({
  type: GET_CUSTOMERS,
  payload: data,
})

export const getCustomersSuccess = customers => ({
  type: GET_CUSTOMERS_SUCCESS,
  payload: customers,
})

export const getCustomersFail = error => ({
  type: GET_CUSTOMERS_FAIL,
  payload: error,
})
/* Get Customers END */

/* Add Customer */
export const addCustomer = (customer, history) => ({
  type: ADD_CUSTOMER,
  payload: { customer, history },
})

export const addCustomerFail = error => ({
  type: ADD_CUSTOMER_FAIL,
  payload: error,
})

export const addCustomerSuccess = msg => ({
  type: ADD_CUSTOMER_SUCCESS,
  payload: msg,
})
/* Add Customer END */

/* Get Customer */
export const getCustomer = id => ({
  type: GET_CUSTOMER,
  payload: id,
})

export const getCustomerFail = error => ({
  type: GET_CUSTOMER_FAIL,
  payload: error,
})

export const getCustomerSuccess = customer => ({
  type: GET_CUSTOMER_SUCCESS,
  payload: customer,
})
/* Get Customer END */

/* Update Customer */
export const putCustomer = (data, history) => ({
  type: PUT_CUSTOMER,
  payload: { data, history },
})

export const putCustomerFail = error => ({
  type: PUT_CUSTOMER_FAIL,
  payload: error,
})

export const putCustomerSuccess = () => ({
  type: PUT_CUSTOMER_SUCCESS,
})
/* Update Customer END */

/* Delete Customer */
export const deleteCustomer = (data, callback) => ({
  type: DELETE_CUSTOMER,
  payload: { data, callback },
})

export const deleteCustomerFail = error => ({
  type: DELETE_CUSTOMER_FAIL,
  payload: error,
})

export const deleteCustomerSuccess = () => ({
  type: DELETE_CUSTOMER_SUCCESS,
})
/* Delete Customer END */

/* Add Customer Address */
export const addCustomerAddress = (data, history) => ({
  type: ADD_CUSTOMER_ADDRESS,
  payload: { data, history },
})

export const addCustomerAddressFail = error => ({
  type: ADD_CUSTOMER_ADDRESS_FAIL,
  payload: error,
})

export const addCustomerAddressSuccess = () => ({
  type: ADD_CUSTOMER_ADDRESS_SUCCESS,
})
/* Add Customer Address END */

/* Get Address */
export const getCustomerAddress = id => ({
  type: GET_CUSTOMER_ADDRESS,
  payload: id,
})

export const getCustomerAddressFail = error => ({
  type: GET_CUSTOMER_ADDRESS_FAIL,
  payload: error,
})

export const getCustomerAddressSuccess = address => ({
  type: GET_CUSTOMER_ADDRESS_SUCCESS,
  payload: address,
})
/* Get Address END */

/* Update Address */
export const putCustomerAddress = (data, history) => ({
  type: PUT_CUSTOMER_ADDRESS,
  payload: { data, history },
})

export const putCustomerAddressFail = error => ({
  type: PUT_CUSTOMER_ADDRESS_FAIL,
  payload: error,
})

export const putCustomerAddressSuccess = () => ({
  type: PUT_CUSTOMER_ADDRESS_SUCCESS,
})
/* Update Address END */

/* Delete Address */
export const deleteCustomerAddress = (data, callback) => ({
  type: DELETE_CUSTOMER_ADDRESS,
  payload: { data, callback },
})

export const deleteCustomerAddressFail = error => ({
  type: DELETE_CUSTOMER_ADDRESS_FAIL,
  payload: error,
})

export const deleteCustomerAddressSuccess = () => ({
  type: DELETE_CUSTOMER_ADDRESS_SUCCESS,
})
/* Delete Address END */

/* Update Multi Customers Status */
export const putCustomersStatus = (data, callback) => ({
  type: PUT_CUSTOMERS_STATUS,
  payload: { data, callback },
})

export const putCustomersStatusFail = error => ({
  type: PUT_CUSTOMERS_STATUS_FAIL,
  payload: error,
})

export const putCustomersStatusSuccess = () => ({
  type: PUT_CUSTOMERS_STATUS_SUCCESS,
})
/* Update Multi Customers Status END */

/* Export customers */
export const exportCustomers = () => ({
  type: EXPORT_CUSTOMERS,
})

export const exportCustomersSuccess = () => ({
  type: EXPORT_CUSTOMERS_SUCCESS,
})

export const exportCustomersFail = error => ({
  type: EXPORT_CUSTOMERS_FAIL,
  payload: error,
})
/* Export customers END */

/* Import customers */
export const importCustomers = (data, callback) => ({
  type: IMPORT_CUSTOMERS,
  payload: { data, callback },
})

export const importCustomersSuccess = success => ({
  type: IMPORT_CUSTOMERS_SUCCESS,
  payload: success,
})

export const importCustomersFail = error => ({
  type: IMPORT_CUSTOMERS_FAIL,
  payload: error,
})
/* Import customers END */


/* Document */
/* Get Food Delivery Customers Documents */
export const getFdCustomerDocuments = data => ({
  type: GET_FD_CUSTOMER_DOCUMENTS,
  payload: data,
})

export const getFdCustomerDocumentsFail = error => ({
  type: GET_FD_CUSTOMER_DOCUMENTS_FAIL,
  payload: error,
})

export const getFdCustomerDocumentsSuccess = documents => ({
  type: GET_FD_CUSTOMER_DOCUMENTS_SUCCESS,
  payload: documents,
})
/* Get Food Delivery Customers END */

/* Add Food Delivery Customer Document */
export const postFdCustomerDocument = (document, history) => ({
  type: POST_FD_CUSTOMER_DOCUMENT,
  payload: { document, history },
})

export const postFdCustomerDocumentFail = error => ({
  type: POST_FD_CUSTOMER_DOCUMENT_FAIL,
  payload: error,
})

export const postFdCustomerDocumentSuccess = () => ({
  type: POST_FD_CUSTOMER_DOCUMENT_SUCCESS,
})
/* Add Food Delivery Customers END */

/* Get Food Delivery Customers */
export const getFdCustomerDocument = data => ({
  type: GET_FD_CUSTOMER_DOCUMENT,
  payload: { data },
})

export const getFdCustomerDocumentFail = error => ({
  type: GET_FD_CUSTOMER_DOCUMENT_FAIL,
  payload: error,
})

export const getFdCustomerDocumentSuccess = document => ({
  type: GET_FD_CUSTOMER_DOCUMENT_SUCCESS,
  payload: document,
})
/* Get Food Delivery Customers END */

/* Update Food Delivery Customers */
export const putFdCustomerDocument = (data, history) => ({
  type: PUT_FD_CUSTOMER_DOCUMENT,
  payload: { data, history },
})

export const putFdCustomerDocumentFail = error => ({
  type: PUT_FD_CUSTOMER_DOCUMENT_FAIL,
  payload: error,
})

export const putFdCustomerDocumentSuccess = () => ({
  type: PUT_FD_CUSTOMER_DOCUMENT_SUCCESS,
})
/* Update Food Delivery Customers END */

/* Delete Food Delivery Customers */
export const deleteFdCustomerDocument = (data, callback) => ({
  type: DELETE_FD_CUSTOMER_DOCUMENT,
  payload: { data, callback },
})

export const deleteFdCustomerDocumentFail = error => ({
  type: DELETE_FD_CUSTOMER_DOCUMENT_FAIL,
  payload: error,
})

export const deleteFdCustomerDocumentSuccess = () => ({
  type: DELETE_FD_CUSTOMER_DOCUMENT_SUCCESS,
})
/* Delete Food Delivery Customers END */