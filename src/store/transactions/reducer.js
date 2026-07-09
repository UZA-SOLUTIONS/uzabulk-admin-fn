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
  GET_SETTLEMENT_LIST_FAIL,
  GET_SETTLEMENT_LIST,
  GET_SETTLEMENT_LIST_SUCCESS,
  WALLET_TRANSACTIONS,
  WALLET_TRANSACTIONS_SUCCESS,
  EXPORT_WALLET_TRANSACTIONS,
  EXPORT_WALLET_TRANSACTIONS_FAIL,
  EXPORT_WALLET_TRANSACTIONS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  transactions: [],

  totalTransactions: 0,
  error: "",
  loading: false,
  transaction: {},

  totalcount: 0
}

const Transaction = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Transactions */
    case GET_TRANSACTIONS:
      return {
        ...state,
        loading: true,
      }

    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload.data || [],
        totalTransactions: action.payload.totalcount || 0,
        loading: false,
      }

    case GET_TRANSACTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Transactions END */

    /* Get Promo Code */
    case GET_TRANSACTION:
      return {
        ...state,
        error: "",
        loading: true,
        transaction: {},
      }

    case GET_TRANSACTION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        transaction: {},
      }

    case GET_TRANSACTION_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        transaction: action.payload,
      }
    /* Add Promo Code END */

    /* Export Transactions */
    case EXPORT_TRANSACTIONS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case EXPORT_TRANSACTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case EXPORT_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    /* Export Transactions END */

    /* GET SETTLEMENT LIST */
    case GET_SETTLEMENT_LIST:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case GET_SETTLEMENT_LIST_SUCCESS:
      return {
        ...state,
        settlementList: action.payload.data,
        totalcount: action.payload.totalcount,
        loading: false,
      }

    case TRANSACTION_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    // wallet
    case WALLET_TRANSACTIONS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case WALLET_TRANSACTIONS_SUCCESS:
      console.log("action1111111", action?.payload)
      return {
        ...state,
        walletList: action.payload.data,
        totalcounts: action.payload.totalcount,
        loading: false,
      }

    case EXPORT_WALLET_TRANSACTIONS:
      return {
        ...state,
        error: "",
        loading: true,
      }

    case EXPORT_WALLET_TRANSACTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case EXPORT_WALLET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      }
    default:
      return state
  }
}

export default Transaction
