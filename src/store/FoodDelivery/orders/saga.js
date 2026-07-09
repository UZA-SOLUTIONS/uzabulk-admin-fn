import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"

// Food Delivery Orders Redux States
import {
  GET_FD_ORDERS,
  GET_FD_ORDER,
  POST_FD_ORDER_REFUND,
  POST_ACCEPT_FD_ORDER,
  POST_REJECT_FD_ORDER,
  POST_INPROCESS_FD_ORDER,
  POST_FD_ORDER_STATUS,
  EXPORT_ORDER_PDF,
  GET_FD_ORDERS_POST,
  EXPORT_ORDER_REPORT,
} from "./actionTypes"
import {
  getFdOrdersFail,
  getFdOrdersSuccess,
  getFdOrderFail,
  getFdOrderSuccess,
  postFdOrderRefundFail,
  postFdOrderRefundSuccess,
  postAcceptFdOrderFail,
  postAcceptFdOrderSuccess,
  postRejectFdOrderFail,
  postRejectFdOrderSuccess,
  postInprocessFdOrderFail,
  postInprocessFdOrderSuccess,
  postFdOrderStatusFail,
  postFdOrderStatusSuccess,
  exportPdfOrderSuccess,
  exportPdfOrderFail,
  getFdOrdersPostSuccess,
  getFdOrdersPostFail,
  exportOrderReportFail,
  exportOrderReportSuccess,
} from "./actions"

import {
  getFdOrders,
  getFdOrder,
  postRefund,
  postAcceptFdOrder,
  postRejectFdOrder,
  postInprocessFdOrder,
  postFdOrderStatus,
  downloadOrderPdf,
  getFdOrdersPost,
  exportFdOrderReport,
} from "helpers/backend_helper"

function* fetchFdOrders({ payload: { query, data } }) {
  try {
    const response = yield call(getFdOrders, data, query)

    if (response.status == "failure") {
      return yield put(getFdOrdersFail(response.message))
    }

    yield put(getFdOrdersSuccess(response))
  } catch (error) {
    yield put(getFdOrdersFail(error))
  }
}

// Post Method PurPose Base
// function* fetchFdOrdersPost({ payload: { query, data, callback } }) {
//   try {
//     const response = yield call(getFdOrdersPost, data, query)
//     callback && callback(response)
//     if (response.status == "failure") {
//       return yield put(getFdOrdersPostFail(response.message))
//     }

//     yield put(getFdOrdersPostSuccess(response))
//   } catch (error) {
//     yield put(getFdOrdersPostFail(error))
//   }
// }

function* fetchFdOrder({ payload }) {
  try {
    Nprogress.start()

    const response = yield call(getFdOrder, payload)

    if (response.status == "failure") {
      Nprogress.done()
      return yield put(getFdOrderFail(response.message))
    }

    yield put(getFdOrderSuccess(response.data))
    Nprogress.done()
  } catch (error) {
    yield put(getFdOrderFail(error))
  }
}

function* onPostFdOrderRefund({ payload: { data, callback } }) {
  try {
    const response = yield call(postRefund, data)

    if (response.status == "failure") {
      return yield put(postFdOrderRefundFail(response.message))
    }

    callback && callback()
    yield put(postFdOrderRefundSuccess(response.data))
  } catch (error) {
    yield put(postFdOrderRefundFail(error))
  }
}

function* onPostAcceptFdOrder({ payload: { data, callback } }) {
  try {
    let version

    const storeVersion = yield select(
      state => state.Settings?.settings?.storeVersion
    )

    if (storeVersion) {
      version = `/api/v` + storeVersion
    }

    const response = yield call(postAcceptFdOrder, data, version)

    if (response.status == "failure") {
      return yield put(postAcceptFdOrderFail(response.message))
    }

    callback && callback()
    yield put(postAcceptFdOrderSuccess(response.data))
  } catch (error) {
    yield put(postAcceptFdOrderFail(error))
  }
}

function* onPostRejectFdOrder({ payload: { data, callback } }) {
  try {
    let version

    const storeVersion = yield select(
      state => state.Settings?.settings?.storeVersion
    )

    if (storeVersion) {
      version = `/api/v` + storeVersion
    }

    const response = yield call(postRejectFdOrder, data, version)

    if (response.status == "failure") {
      return yield put(postRejectFdOrderFail(response.message))
    }

    callback && callback()
    yield put(postRejectFdOrderSuccess(response.data))
  } catch (error) {
    yield put(postRejectFdOrderFail(error))
  }
}

function* onPostInprocessFdOrder({ payload: { data, callback } }) {
  try {
    let version

    const storeVersion = yield select(
      state => state.Settings?.settings?.storeVersion
    )

    if (storeVersion) {
      version = `/api/v` + storeVersion
    }

    const response = yield call(postInprocessFdOrder, data, version)

    if (response.status == "failure") {
      return yield put(postInprocessFdOrderFail(response.message))
    }

    callback && callback()
    yield put(postInprocessFdOrderSuccess(response.data))
  } catch (error) {
    yield put(postInprocessFdOrderFail(error))
  }
}

function* onPostFdOrderStatus({ payload: { data, callback } }) {
  try {
    const response = yield call(postFdOrderStatus, data)

    if (response.status == "failure") {
      return yield put(postFdOrderStatusFail(response.message))
    }

    callback && callback()
    yield put(postFdOrderStatusSuccess(response.data))
  } catch (error) {
    yield put(postFdOrderStatusFail(error))
  }
}

function* onExportOrderPdf({ payload }) {
  try {
    const response = yield call(downloadOrderPdf, payload)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(exportPdfOrderFail(response.message))
    }

    var hiddenElement = document.createElement("a")
    // hiddenElement.href = "data:pdf;charset=utf-8," + encodeURI(response)

    let url = window.URL.createObjectURL(
      new Blob([response], { type: "application/pdf" })
    )

    console.log(url, "URL")
    hiddenElement.href = url
    // hiddenElement.target = "_blank"
    hiddenElement.download = "orderslip.pdf"
    hiddenElement.click()

    console.log(hiddenElement, "hiddenElement")
    yield put(exportPdfOrderSuccess())
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(exportPdfOrderFail("Internal Error!"))
  }
}

// export order report

// function* onExportOrderReport({ payload }) {
//   try {
//     const response = yield call(exportFdOrderReport)

//     if (response.status == "failure") {
//       toastr.error(response.message)
//       return yield put(exportOrderReportFail(response.message))
//     }

//     var hiddenElement = document.createElement("a")
//     hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(response)
//     hiddenElement.target = "_blank"
//     hiddenElement.download = "Order-Reports.xlsx"
//     hiddenElement.click()

//     yield put(exportOrderReportSuccess())
//   } catch (error) {
//     console.log("error ", error)
//     toastr.error("Internal Error!")
//     yield put(exportOrderReportFail("Internal Error!"))
//   }
// }

function* onExportOrderReport({ payload }) {
  try {
    console.log("click")
    const response = yield call(exportFdOrderReport)
    console.log("click2")
    console.log(response, "RESPONSE")

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(exportOrderReportFail(response.message))
    }
    const aElement = document.createElement("a")
    aElement.setAttribute("download", "Order-Reports.xlsx")
    const href = URL.createObjectURL(response)
    aElement.href = href
    aElement.setAttribute("target", "_blank")
    aElement.click()
    URL.revokeObjectURL(href)

    yield put(exportOrderReportSuccess())
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(exportOrderReportFail("Internal Error!"))
  }
}









function* FdOrdersSaga() {
  yield takeEvery(GET_FD_ORDERS, fetchFdOrders)
  yield takeEvery(EXPORT_ORDER_REPORT, onExportOrderReport)
  yield takeEvery(GET_FD_ORDER, fetchFdOrder)
  yield takeEvery(POST_FD_ORDER_REFUND, onPostFdOrderRefund)
  yield takeLatest(POST_ACCEPT_FD_ORDER, onPostAcceptFdOrder)
  yield takeLatest(POST_REJECT_FD_ORDER, onPostRejectFdOrder)
  yield takeLatest(POST_INPROCESS_FD_ORDER, onPostInprocessFdOrder)
  yield takeLatest(POST_FD_ORDER_STATUS, onPostFdOrderStatus)
  yield takeLatest(EXPORT_ORDER_PDF, onExportOrderPdf)
}

export default FdOrdersSaga
