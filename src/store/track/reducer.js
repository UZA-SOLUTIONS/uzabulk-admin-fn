import {
  SET_MAP_VIEW_CENTER_SUCCESS,
  SET_MAP_VIEW_BOUNDS_SUCCESS,
  GET_MAP_VIEW,
  GET_MAP_VIEW_SUCCESS,
  GET_MAP_VIEW_FAIL,
  ASSIGN_DRIVER_SUCCESS,
  ASSIGN_DRIVER_FAIL,
  MAP_POPUP_DRIVER_LOCATION,
  MAP_POPUP_DRIVER_LOCATION_SUCCESS,
  MAP_POPUP_DRIVER_LOCATION_FAIL,
} from "./actionTypes"

const Loading = {
  loading: false,
  isSearch: false,
  isBoundChange: false,
  isCenterChange: false,
  isApiCall: false,
}

const INIT_STATE = {
  locations: {
    available: [],
    busy: [],
  },
  query: {
    location: {
      lat: "",
      lng: "",
    },
    bounds: {
      ne: {
        lat: "",
        lng: "",
      },
      sw: {
        lat: "",
        lng: "",
      },
    },
    address: "",
  },
  driverPopup: {
    name: "Test Driver",
    Status: "On Trip",
    mobileNumber: 96396393,
  },
  assignDriver: {},
  ...Loading,
}

const mapView = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_MAP_VIEW_CENTER_SUCCESS:
      return {
        ...state,
        query: { ...state.query, ...action.payload },
        loading: true,
        ...Loading,
        isSearch: true,
      }

    case SET_MAP_VIEW_BOUNDS_SUCCESS:
      return {
        ...state,
        query: action.payload,
        ...Loading,
        loading: true,
        isBoundChange: true,
      }
    case GET_MAP_VIEW_SUCCESS:
      return {
        ...state,
        locations: {
          ...action.payload,
        },
        ...Loading,
      }

    case GET_MAP_VIEW_FAIL:
      return {
        ...INIT_STATE,
        ...Loading,
      }
    case ASSIGN_DRIVER_SUCCESS:
      return {
        ...state,
        assignDriver: action.payload,
        ...Loading,
      }
    case ASSIGN_DRIVER_FAIL:
      return {
        ...state,
        assignDriver: action.payload,
        ...Loading,
      }
    case MAP_POPUP_DRIVER_LOCATION_SUCCESS:
      return {
        ...state,
        driverPopup: action.payload,
        ...Loading,
      }
    case MAP_POPUP_DRIVER_LOCATION_FAIL:
      return {
        ...state,
        driverPopup: {},
        ...Loading,
      }

    default:
      return state
  }
}

export default mapView
