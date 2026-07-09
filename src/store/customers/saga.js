import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import toastr from "toastr"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import "toastr/build/toastr.min.css"

// Customer Redux States
import {
  GET_CUSTOMERS,
  ADD_CUSTOMER,
  GET_CUSTOMER,
  PUT_CUSTOMER,
  DELETE_CUSTOMER,
  ADD_CUSTOMER_ADDRESS,
  GET_CUSTOMER_ADDRESS,
  PUT_CUSTOMER_ADDRESS,
  DELETE_CUSTOMER_ADDRESS,
  PUT_CUSTOMERS_STATUS,
  EXPORT_CUSTOMERS,
  IMPORT_CUSTOMERS,
} from "./actionTypes"
import {
  GET_FD_CUSTOMER_DOCUMENTS,
  POST_FD_CUSTOMER_DOCUMENT,
  GET_FD_CUSTOMER_DOCUMENT,
  PUT_FD_CUSTOMER_DOCUMENT,
  DELETE_FD_CUSTOMER_DOCUMENT,
} from "./actionTypes"
import {
  getCustomersFail,
  getCustomersSuccess,
  addCustomerFail,
  addCustomerSuccess,
  getCustomerFail,
  getCustomerSuccess,
  putCustomerFail,
  putCustomerSuccess,
  deleteCustomerFail,
  deleteCustomerSuccess,
  addCustomerAddressFail,
  addCustomerAddressSuccess,
  getCustomerAddressFail,
  getCustomerAddressSuccess,
  putCustomerAddressFail,
  putCustomerAddressSuccess,
  deleteCustomerAddressFail,
  deleteCustomerAddressSuccess,
  putCustomersStatusFail,
  putCustomersStatusSuccess,
  exportCustomersFail,
  exportCustomersSuccess,
  importCustomersFail,
  importCustomersSuccess,
} from "./actions"
import {
  getFdCustomerDocumentsFail,
  getFdCustomerDocumentsSuccess,
  postFdCustomerDocumentFail,
  postFdCustomerDocumentSuccess,
  getFdCustomerDocumentFail,
  getFdCustomerDocumentSuccess,
  putFdCustomerDocumentFail,
  putFdCustomerDocumentSuccess,
  deleteFdCustomerDocumentFail,
  deleteFdCustomerDocumentSuccess,
} from "./actions"

import {
  getCustomers,
  postCustomer,
  getCustomer,
  putCustomer,
  deleteCustomer,
  postCustomerAddress,
  getCustomerAddress,
  putCustomerAddress,
  deleteCustomerAddress,
  putCustomersStatus,
  exportCustomers,
  importCustomers,
} from "helpers/backend_helper"
import {
  getDocuments,
  postDocument,
  getDocument,
  putDocument,
  deleteDocument,
} from "helpers/backend_helper"

function* fetchCustomers({ payload }) {
  try {
    const response = yield call(getCustomers, payload)

    if (response.status == "failure") {
      return yield put(getCustomersFail(response.message))
    }

    yield put(getCustomersSuccess(response))
  } catch (error) {
    yield put(getCustomersFail(error))
  }
}

function* onAddNewCustomer({ payload: { customer, history } }) {
  try {
    const response = yield call(postCustomer, customer)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      toastr.error(response.message || "Error Occured")
      return yield put(addCustomerFail(response.message))
    }

    if (customer.role === "STAFF") {
      toastr.success("Sub-Admin Added")
    } else {
      toastr.success("New Customer Added")
    }
    history && history.goBack()

    yield put(addCustomerSuccess(response.message))
  } catch (error) {
    yield put(addCustomerFail("Internal Error!"))
  }
}

function* fetchCustomer({ payload }) {
  try {
    Nprogress.start()

    const response = yield call(getCustomer, payload)

    if (response.status == "failure") {
      Nprogress.done()
      return yield put(getCustomerFail(response.message))
    }

    yield put(getCustomerSuccess(response.data))
    Nprogress.done()
  } catch (error) {
    yield put(getCustomerFail(error))
  }
}

function* onPutCustomer({ payload: { data, history } }) {
  try {
    const response = yield call(putCustomer, data)

    if (response.status == "failure") {
      toastr.error(response.message || "Error Occured")
      return yield put(putCustomerFail(response.message))
    }

    if (data.role === "STAFF") {
      toastr.success("Sub-Admin Updated")
    } else {
      toastr.success("Customer Updated")
    }

    history && history.goBack()

    yield put(putCustomerSuccess())
  } catch (error) {
    yield put(putCustomerFail("Internal Error!"))
  }
}

function* onDeleteCustomer({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteCustomer, data)
    callback && callback(response)
    if (response.status == "failure") {
      return yield put(deleteCustomerFail(response.message))
    }

    yield put(deleteCustomerSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteCustomerFail("Internal Error!"))
  }
}

function* onAddCustomerAddress({ payload: { data, history } }) {
  try {
    const response = yield call(postCustomerAddress, data)

    if (response.status == "failure") {
      return yield put(addCustomerAddressFail(response.message))
    }

    yield put(addCustomerAddressSuccess())
    toastr.success("Address added")
    history && history.goBack()
  } catch (error) {
    yield put(addCustomerAddressFail("Internal Error!"))
  }
}

function* fetchCustomerAddress({ payload }) {
  try {
    const response = yield call(getCustomerAddress, payload)

    if (response.status == "failure") {
      return yield put(getCustomerAddressFail(response.message))
    }

    yield put(getCustomerAddressSuccess(response.data))
  } catch (error) {
    yield put(getCustomerAddressFail(error))
  }
}

function* onPutCustomerAddress({ payload: { data, history } }) {
  try {
    const response = yield call(putCustomerAddress, data)

    if (response.status == "failure") {
      return yield put(putCustomerAddressFail(response.message))
    }

    toastr.success("Address updated")
    history && history.goBack()

    yield put(putCustomerAddressSuccess())
  } catch (error) {
    yield put(putCustomerAddressFail("Internal Error!"))
  }
}

function* onDeleteCustomerAddress({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteCustomerAddress, data)

    if (response.status == "failure") {
      return yield put(deleteCustomerAddressFail(response.message))
    }

    yield put(deleteCustomerAddressSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteCustomerAddressFail("Internal Error!"))
  }
}

function* onPutCustomerStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(putCustomersStatus, data)

    if (response.status == "failure") {
      return yield put(putCustomersStatusFail(response.message))
    }

    yield put(putCustomersStatusSuccess())
    callback && callback()
  } catch (error) {
    yield put(putCustomersStatusFail("Internal Error!"))
  }
}

function* onExportCustomers({ payload }) {
  try {
    console.log("click")
    const response = yield call(exportCustomers)
    console.log("click2")
    console.log(response, "RESPONSE")

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(exportCustomersFail(response.message))
    }

    var hiddenElement = document.createElement("a")
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(response)
    hiddenElement.target = "_blank"
    hiddenElement.download = "customers.csv"
    hiddenElement.click()

    yield put(exportCustomersSuccess())
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(exportCustomersFail("Internal Error!"))
  }
}

function* onImportCustomers({ payload: { data, callback } }) {
  try {
    const response = yield call(importCustomers, data)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(importCustomersFail(response.message))
    }

    toastr.success(response.message)

    callback && callback(response)
    yield put(importCustomersSuccess())
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(importCustomersFail("Internal Error!"))
  }
}

function* fetchFdCustomerDocuments({ payload }) {
  try {
    const response = yield call(getDocuments, payload)

    if (response.status == "failure") {
      return yield put(getFdCustomerDocumentsFail(response.message))
    }

    yield put(getFdCustomerDocumentsSuccess(response?.data))
  } catch (error) {
    yield put(getFdCustomerDocumentsFail(error))
  }
}

function* onPostFdCustomerDocument({ payload: { fdDocument, history } }) {
  try {
    const response = yield call(postDocument, fdDocument)

    if (response.status == "failure") {
      window.scrollTo(0, 0)

      return yield put(postFdCustomerDocumentFail(response.message))
    }

    history && history.goBack()

    yield put(postFdCustomerDocumentSuccess())
  } catch (error) {
    yield put(postFdCustomerDocumentFail("Internal Error!"))
  }
}

function* fetchFdCustomerDocument({ payload: { data } }) {
  try {
    const response = yield call(getDocument, data)

    if (response.status == "failure") {
      return yield put(getFdCustomerDocumentFail(response.message))
    }

    yield put(getFdCustomerDocumentSuccess(response.data))
  } catch (error) {
    yield put(getFdCustomerDocumentFail(error))
  }
}

function* onPutFdCustomerDocument({ payload: { data, history } }) {
  try {
    const response = yield call(putDocument, data)

    if (response.status == "failure") {
      return yield put(putFdCustomerDocumentFail(response.message))
    }

    history && history.goBack()

    yield put(putFdCustomerDocumentSuccess())
  } catch (error) {
    yield put(putFdCustomerDocumentFail("Internal Error!"))
  }
}

function* onDeleteFdCustomerDocument({ payload: { data, callback } }) {
  try {
    const response = yield call(deleteDocument, data)

    if (response.status == "failure") {
      return yield put(deleteFdCustomerDocumentFail(response.message))
    }

    yield put(deleteFdCustomerDocumentSuccess())
    callback && callback()
  } catch (error) {
    yield put(deleteFdCustomerDocumentFail("Internal Error!"))
  }
}

function* customersSaga() {
  yield takeEvery(GET_CUSTOMERS, fetchCustomers)
  yield takeEvery(ADD_CUSTOMER, onAddNewCustomer)
  yield takeEvery(GET_CUSTOMER, fetchCustomer)
  yield takeEvery(PUT_CUSTOMER, onPutCustomer)
  yield takeEvery(DELETE_CUSTOMER, onDeleteCustomer)
  yield takeEvery(ADD_CUSTOMER_ADDRESS, onAddCustomerAddress)
  yield takeEvery(GET_CUSTOMER_ADDRESS, fetchCustomerAddress)
  yield takeEvery(PUT_CUSTOMER_ADDRESS, onPutCustomerAddress)
  yield takeEvery(DELETE_CUSTOMER_ADDRESS, onDeleteCustomerAddress)
  yield takeEvery(PUT_CUSTOMERS_STATUS, onPutCustomerStatus)
  yield takeLatest(EXPORT_CUSTOMERS, onExportCustomers)
  yield takeLatest(IMPORT_CUSTOMERS, onImportCustomers)

  yield takeEvery(GET_FD_CUSTOMER_DOCUMENTS, fetchFdCustomerDocuments)
  yield takeEvery(POST_FD_CUSTOMER_DOCUMENT, onPostFdCustomerDocument)
  yield takeEvery(GET_FD_CUSTOMER_DOCUMENT, fetchFdCustomerDocument)
  yield takeEvery(PUT_FD_CUSTOMER_DOCUMENT, onPutFdCustomerDocument)
  yield takeEvery(DELETE_FD_CUSTOMER_DOCUMENT, onDeleteFdCustomerDocument)
}

export default customersSaga
