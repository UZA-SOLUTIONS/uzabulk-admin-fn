import {
  TRANSACTION_API_FAIL,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_FAIL,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTION,
  GET_TRANSACTION_FAIL,
  GET_TRANSACTION_SUCCESS,
  EXPORT_TRANSACTIONS,
  EXPORT_TRANSACTIONS_SUCCESS,
  EXPORT_TRANSACTIONS_FAIL,
  GET_SETTLEMENT_LIST,
  GET_SETTLEMENT_LIST_SUCCESS,
  GET_SETTLEMENT_LIST_FAIL,
  WALLET_TRANSACTIONS,
  WALLET_TRANSACTIONS_SUCCESS,
  WALLET_TRANSACTIONS_FAIL,
  EXPORT_WALLET_TRANSACTIONS,
  EXPORT_WALLET_TRANSACTIONS_SUCCESS,
  EXPORT_WALLET_TRANSACTIONS_FAIL,
} from "./actionTypes"

export const apiFail = error => ({
  type: TRANSACTION_API_FAIL,
  payload: error,
})

/* Get TRANSACTIONs */
export const getTransactions = data => ({
  type: GET_TRANSACTIONS,
  payload: data,
})

export const getTransactionsSuccess = transactions => ({
  type: GET_TRANSACTIONS_SUCCESS,
  payload: transactions,
})

export const getTransactionsFail = error => ({
  type: GET_TRANSACTIONS_FAIL,
  payload: error,
})
/* Get Transactions END */

/* Get Transaction */
export const getTransaction = id => ({
  type: GET_TRANSACTION,
  payload: id,
})

export const getTransactionFail = error => ({
  type: GET_TRANSACTION_FAIL,
  payload: error,
})

export const getTransactionSuccess = transaction => ({
  type: GET_TRANSACTION_SUCCESS,
  payload: transaction,
})
/* Get Transaction END */

/* Export Transactions */
export const exportTransactions = query => ({
  type: EXPORT_TRANSACTIONS,
  payload: query,
})

export const exportTransactionsSuccess = () => ({
  type: EXPORT_TRANSACTIONS_SUCCESS,
})

export const exportTransactionsFail = error => ({
  type: EXPORT_TRANSACTIONS_FAIL,
  payload: error,
})
/* Export Transactions END */

/* Get SettleMent List */
export const SettlementList = data => ({
  type: GET_SETTLEMENT_LIST,
  payload: data,
})

export const SettlementListSuccess = data => ({
  type: GET_SETTLEMENT_LIST_SUCCESS,
  payload: data,
})

// export const SettlementListFail = error => ({
//   type: GET_SETTLEMENT_LIST_FAIL,
//   payload: error,
// })


export const walletTransactions = (data) => ( {
  type: WALLET_TRANSACTIONS,
  payload: data,
  
})

export const walletTransactionsSuccess = data => ({
  type: WALLET_TRANSACTIONS_SUCCESS,
  payload: data,
})

export const walletTransactionsFail = error => ({
  type: WALLET_TRANSACTIONS_FAIL,
  payload: error,
})


// wallet transation export

export const exportWalletTransactions = query => ({
  type: EXPORT_WALLET_TRANSACTIONS,
  payload: query,
})

export const exportWalletTransactionsSuccess = () => ({
  type: EXPORT_WALLET_TRANSACTIONS_SUCCESS,
})

export const exportWalletTransactionsFail = error => ({
  type: EXPORT_WALLET_TRANSACTIONS_FAIL,
  payload: error,
})