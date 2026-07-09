import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

// Promo Code Redux States
import {
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  EXPORT_TRANSACTIONS,
  GET_SETTLEMENT_LIST,
  WALLET_TRANSACTIONS,
  EXPORT_WALLET_TRANSACTIONS,
} from "./actionTypes"
import {
  getTransactionsFail,
  getTransactionsSuccess,
  getTransactionFail,
  getTransactionSuccess,
  exportTransactionsFail,
  exportTransactionsSuccess,
  // SettlementListFail,
  SettlementListSuccess,
  walletTransactionsFail,
  walletTransactionsSuccess,
  exportWalletTransactionsFail,
  exportWalletTransactionsSuccess,
} from "./actions"

import {
  getTransactions,
  // getTransaction,
  exportTransactions,
  getSettlementList,
  getWalletTransactions,
  exportWalletTransactions,
} from "helpers/backend_helper"

function* fetchTransactions({ payload }) {
  try {
    const response = yield call(getTransactions, payload)

    if (response.status == "failure") {
      return yield put(getTransactionsFail(response.message))
    }

    yield put(getTransactionsSuccess(response))
  } catch (error) {
    yield put(getTransactionsFail(error))
  }
}

function* fetchTransaction({ payload }) {
  try {
    // const response = yield call(getTransaction, payload)

    if (response.status == "failure") {
      return yield put(getTransactionFail(response.message))
    }

    yield put(getTransactionSuccess(response.data))
  } catch (error) {
    yield put(getTransactionFail(error))
  }
}

function* onExportTransactions({ payload }) {
  try {
    const response = yield call(exportTransactions, payload)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(exportTransactionsFail(response.message))
    }

    var hiddenElement = document.createElement("a")
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(response)
    hiddenElement.target = "_blank"
    hiddenElement.download = "transactions.csv"
    hiddenElement.click()

    yield put(exportTransactionsSuccess())
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(exportTransactionsFail("Internal Error!"))
  }
}






function* fetchSettlementList({ payload }) {
  try {
    const response = yield call(getSettlementList, payload)

    if (response.status == "failure") {
      return yield put(getTransactionFail(response.message))
    }

    yield put(SettlementListSuccess(response))
  } catch (error) {
    yield put(getTransactionFail(error))
  }
}

function* fetchWallet({ payload }) {

  
  try {
    const response = yield call(getWalletTransactions, payload)

console.log('response11111', response)



    if (response.status == "failure") {
      return yield put(walletTransactionsFail(response.message))
    }

    yield put(walletTransactionsSuccess(response))
  } catch (error) {
    yield put(walletTransactionsFail(error))
  }
}



function* onExportWalletTransactions({ payload }) {
  try {
    const response = yield call(exportWalletTransactions, payload)

    if (response.status == "failure") {
      toastr.error(response.message)
      return yield put(exportWalletTransactionsFail(response.message))
    }

    var hiddenElement = document.createElement("a")
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(response)
    hiddenElement.target = "_blank"
    hiddenElement.download = "transactions.csv"
    hiddenElement.click()

    yield put(exportWalletTransactionsSuccess())
  } catch (error) {
    console.log("error ", error)
    toastr.error("Internal Error!")
    yield put(exportWalletTransactionsFail("Internal Error!"))
  }
}
function* TransactionsSaga() {
  yield takeEvery(GET_TRANSACTIONS, fetchTransactions)
  yield takeEvery(GET_SETTLEMENT_LIST, fetchSettlementList)
  yield takeLatest(EXPORT_TRANSACTIONS, onExportTransactions)
   yield takeEvery(EXPORT_WALLET_TRANSACTIONS, onExportWalletTransactions)
  yield takeEvery(WALLET_TRANSACTIONS, fetchWallet)
}

export default TransactionsSaga
