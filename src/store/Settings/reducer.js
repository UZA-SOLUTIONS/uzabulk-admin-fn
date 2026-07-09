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
  DELETE_STORE_FAIL,
  DELETE_STORE_SUCCESS,
  GET_PAY360_BANK_ACCOUNT_SUCCESS,
  GET_PAY360_BANK_ACCOUNT_FAILURE,
  GET_PAY360_BANK_ACCOUNT,
  GET_PAY360_MERCHANT,
  GET_PAY360_MERCHANT_SUCCESS,
} from "./actionTypes"

const SETTINGS = {
  settingsDone: false,
  codWalletLimit: "",
  googleMapKey: {
    android: "",
    ios: "",
    web: "",
    server: "",
  },
  themeSettings: {
    primaryColor: "",
    secondaryColor: "",
    fontColor: "",
    font: "",
  },
  appUrl: {
    customer_android_app: "",
    driver_android_app: "",
    customer_ios_app: "",
    driver_ios_app: "",
  },
  storeType: [],
  storeTypeEnabled: [],
  bannerText: "",
  distanceUnit: "",
  tip: [],
  paymentMode: "",
  paymentSettings: [
    {
      payment_method: "stripe",
      status: true,
      sandboxSecretKey: "",
      sandboxPublishabelKey: "",
      liveSecretKey: null,
      livePublishabelKey: null,
    },
  ],
  deliveryMultiStoretype: true,
  _id: "",
  logo: null,
  bannerImage: null,
  storeName: "",
  language: {
    code: "",
    name: "",
  },
  currency: {
    sign: "",
    code: "",
  },
  timezone: "",
  country: "",
  domain: "",
  socialMedia: [],
}

const INIT_STATE = {
  getStarted: {},
  storeLoading: false,
  isStoreFailed: false,
  settings: SETTINGS,
  accessList: [],
  storeTypes: [],
  loading: false,
  starterLoading: false,
  error: "",
  success: "",
  bankAccounts: [],
  merchant: []
}

const Settings = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* Get Global Settings */
    case GET_SETTINGS:
      return {
        ...state,
        loading: true,
        storeLoading: true,
        isStoreFailed: false,
        error: "",
        success: "",
      }

    case GET_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        settings: action.payload,
        isStoreFailed: false,
        storeLoading: false,
        settingsDone: true,
      }

    case GET_SETTINGS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        storeLoading: false,
        isStoreFailed: true,
      }
    /* Get Global Settings END */

    /* Update Global Settings */
    case PUT_SETTINGS:
      return {
        ...state,
        loading: true,
        error: "",
        success: "",
      }

    case PUT_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        success: action.payload,
      }

    case PUT_SETTINGS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Update Global Settings END */

    /* Get Access List */
    case GET_ACCESS_LIST:
      return {
        ...state,
        loading: true,
        error: "",
        success: "",
      }

    case GET_ACCESS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        accessList: action.payload,
      }

    case GET_ACCESS_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Access List END */

    /* Get Store Types */
    case GET_STORE_TYPES:
      return {
        ...state,
        loading: true,
        error: "",
        success: "",
      }

    case GET_STORE_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        storeTypes: action.payload,
      }

    case GET_STORE_TYPES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    /* Get Store Types END */

    /* Get Store Started */
    case GET_STARTED:
      return {
        ...state,
        starterLoading: true,
      }

    case GET_STARTED_SUCCESS:
      return {
        ...state,
        starterLoading: false,
        getStarted: action.payload,
      }

    case GET_STARTED_FAIL:
      return {
        ...state,
        starterLoading: false,
        error: action.payload,
        getStarted: {},
      }
    /* Get Store Started END */

    /* Delete Store */
    case DELETE_STORE:
      return {
        ...state,
        loading: true,
      }

    case DELETE_STORE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case DELETE_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    /* Delete Store END */
    /* pay360  */
    case GET_PAY360_BANK_ACCOUNT:
      return {
        ...state,
        loading: true,
        error: "",
      }

    case GET_PAY360_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        bankAccounts: action.payload.chargeId
      }

    case GET_PAY360_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case GET_PAY360_MERCHANT:
      return {
        ...state,
        loading: true
      }
    case GET_PAY360_MERCHANT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        merchant: action.payload,
      }
    case GET_PAY360_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    /* pay360 End */

    default:
      return state
  }
}

export default Settings
