import React from "react"
import { render } from "react-snapshot"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "./i18n"
import { Provider } from "react-redux"

import store from "./store"

const isSupported = () =>
  "Notification" in window &&
  "serviceWorker" in navigator &&
  "PushManager" in window

if (!isSupported()) {
  var Notification = {}
}

if (process.env.NODE_ENV === "production") {
  console.log = () => {}
  console.error = () => {}
  console.warn = () => {}
  console.info = () => {}
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

render(app, document.getElementById("root"))
serviceWorker.unregister()
