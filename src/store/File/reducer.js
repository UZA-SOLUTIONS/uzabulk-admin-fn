import { UPLOAD_FILE, REMOVE_FILE, API_FAIL } from "./actionTypes"

const INIT_STATE = {
  loading: false,
  error: "",
}

const File = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return {
        ...state,
        error: "",
        loading: true
      }

    case REMOVE_FILE:
      return {
        ...state,
        error: "",
      }

    case API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state
  }
}

export default File
