import { UPLOAD_FILE, REMOVE_FILE, API_FAIL } from "./actionTypes"

export const apiFail = error => ({
  type: API_FAIL,
  payload: error,
})

export const uploadFile = (data, callback) => ( console.log('data1111', data),{
  type: UPLOAD_FILE,
  payload: { data, callback },
})

export const removeFile = fileId => ({
  type: REMOVE_FILE,
  payload: fileId,
})
