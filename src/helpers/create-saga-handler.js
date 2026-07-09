import { call, put } from "redux-saga/effects"

export default function createSagaHandler({
  service,
  requested,
  succeeded,
  failed,
}) {
  if (!service) {
    throw new Error("Service is required")
  } else if (!requested) {
    throw new Error("Requested is required")
  } else if (!succeeded) {
    throw new Error("Succeded required")
  } else if (!failed) {
    throw new Error("Failed is required")
  }

  return function* (action) {
    try {
      if (!action.payload) {
        throw new Error("Payload not defined in action => " + action.type)
      }
      yield put(requested(action.payload))
      console.log("Before service")
      const response = yield call(service, ...[action.payload.data])
      console.log("After service", response)
      const payload = { ...action.payload, response }
      if (response?.status === "failure") {
        throw { error: { response } }
      }
      yield put(succeeded(payload))
      ;``
      //callback
      try {
        if (typeof action.payload.onSuccess === "function") {
          action.payload.onSuccess(payload)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        //callback
        try {
          if (typeof action.payload.onEnd === "function") {
            action.payload.onEnd(payload)
          }
        } catch (ex) {
          console.error(ex)
        }
      }
    } catch (ex) {
      console.error(ex)
      const payload = { ...action.payload, ...ex }
      yield put(failed(payload))

      //callback
      try {
        if (typeof action.payload.onFail === "function") {
          action.payload.onFail(payload)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        //callback
        try {
          if (typeof action.payload.onEnd === "function") {
            action.payload.onEnd(payload)
          }
        } catch (ex) {
          console.error(ex)
        }
      }
    }
  }
}
