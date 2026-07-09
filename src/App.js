import PropTypes from "prop-types"
import React, { useEffect } from "react"

import {
  Switch,
  BrowserRouter as Router,
  Route,
  withRouter,
} from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all//
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

import LoginByAdmin from "pages/LoginByAdmin"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"

import { Spinner } from "reactstrap"

import Loader from "pages/Utility/Loader"
import Pages404 from "pages/Utility/pages-404"
import Pages500 from "pages/Utility/pages-500"

// Import scss
// Import css
import "assets/css/style.scss"
import "assets/css/responsive.scss"
import "./assets/scss/theme.scss"
import "./assets/scss/custom.scss"
import "./assets/scss/custom1.scss"

import {
  currentUser,
  getSettings,
  getCurrentPlan,
  reloadOnDemand,
  getLanguages,
  setAppReady,
  getPublicData,
} from "store/actions"

// Import Firebase Configuration file
import { initFirebaseBackend } from "./helpers/firebase_helper"
import { ROLES, USER_AUTH_KEY } from "helpers/contants"
import { usePermissions } from "helpers/permissions"

function LightenDarkenColor(col, amt) {
  var usePound = false

  if (col[0] == "#") {
    col = col.slice(1)
    usePound = true
  }

  var num = parseInt(col, 16)

  var r = (num >> 16) + amt

  if (r > 255) r = 255
  else if (r < 0) r = 0

  var b = ((num >> 8) & 0x00ff) + amt

  if (b > 255) b = 255
  else if (b < 0) b = 0

  var g = (num & 0x0000ff) + amt

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
}

const App = props => {
  usePermissions()
  useEffect(() => {
    if (props?.settings?._id && props?.settings?.firebase) {
      const firebaseConfig = {
        apiKey: props?.settings?.firebase.FCM_APIKEY,
        authDomain: props?.settings?.firebase.FCM_AUTHDOMAIN,
        databaseURL: props?.settings?.firebase.FCM_DATABASEURL,
        projectId: props?.settings?.firebase.FCM_PROJECTID,
        storageBucket: props?.settings?.firebase.FCM_STORAGEBUCKET,
        messagingSenderId: props?.settings?.firebase.FCM_MESSAGINGSENDERID,
        appId: props?.settings?.firebase.FCM_APPID,
        measurementId: props?.settings?.firebase.FCM_MEASUREMENTID,
      }

      // init firebase backend
      initFirebaseBackend(firebaseConfig, props?.settings?._id)
    }
  }, [props.settings])

  useEffect(() => {
    const root = document.documentElement
    if (props.settings?.themeSettings?.adminPrimaryBackgroundColor) {
      root.style.setProperty(
        "--primary",
        props.settings?.themeSettings?.adminPrimaryBackgroundColor
      )

      root.style.setProperty(
        "--primary-hover",
        LightenDarkenColor(
          props.settings?.themeSettings?.adminPrimaryBackgroundColor,
          -11
        )
      )
    }

    if (props.settings?.themeSettings?.adminPrimaryFontColor) {
      root.style.setProperty(
        "--primary-font-color",
        props.settings.themeSettings.adminPrimaryFontColor
      )

      root.style.setProperty(
        "--primary-font-color-hover",
        LightenDarkenColor(
          props.settings.themeSettings.adminPrimaryFontColor,
          11
        )
      )
    }
  }, [
    props.settings?.themeSettings?.adminPrimaryBackgroundColor,
    props.settings?.themeSettings?.adminPrimaryFontColor,
  ])

  useEffect(() => {
    props?.getLanguages()

    if (!!props.authToken) {
      props?.currentUser && props.currentUser()
      props?.getSettings && props.getSettings()

      const authUser = JSON.parse(localStorage.getItem(USER_AUTH_KEY) || "{}")

      switch (authUser?.data?.role) {
        case ROLES.admin:
        case ROLES.staff:
          props?.getCurrentPlan && props.getCurrentPlan()
          break

        default:
          break
      }
    } else {
      if (!props.isHyperApp) {
        props.getPublicData({
          domain:
            window.location
              .hostname /* "main.uza-staging.com" */ /* window.location.hostname */,
        })
      }
    }
  }, [props.authToken, props?.isSuperAdmin])

  useEffect(() => {
    console.log(props?.socket, "props?.socket")
    if (
      props?.socket &&
      (props?.user?.role === ROLES?.vendor ||
        props?.user?.role === ROLES?.subVendor)
    ) {
      console.log("murga")
      props?.socket.on("connect", order => {
        console.log("connect for ", order)
        props?.socket.emit(
          "restaurantsocket",
          {
            restaurantId:
              props?.user?.role === ROLES?.vendor
                ? props?.user?._id
                : props?.user?.vendor,
          },
          () => {}
        )
      })

      props?.socket.on("order_vendor_socket", data => {
        console.log("murga1", data)
        if (data?.notificationSound) {
          let chatAudio = document.querySelector(`#${data?.notificationSound}`)
          if (chatAudio) {
            chatAudio.play()
          }
        }
      })
    } else if (props?.socket && props?.user?.role === ROLES?.staff) {
      console.log("connect socket 233")
      props?.socket.on("connect", order => {
        console.log("connect for ", order)
        props?.socket.emit(
          "subadminsocket", //Vendor SubAdmin Socket
          { adminId: props?.user?._id },
          () => {
            console.log("kajukatli")
          }
        )
      })

      props?.socket.on("SubAdminNotification", data => {
        console.log("kajudata567", data)
        if (!document.hidden) {
          var notification = new Notification(
            data?.title || "New Notification",
            {
              ...data,
              body: data?.body || data?.message,
            }
          )

          notification.onclick = function (event) {
            event.preventDefault() // prevent the browser from focusing the Notification's tab
            //window.open(payload.notifica.on(tion.click_action, "_blank");
            notification.close()
          }
        }
        let chatAudio = document.querySelector(
          `#${data?.notificationSound || "oh-really"}`
        )
        if (chatAudio) {
          chatAudio.play()
        }
      })
    } else if (
      props?.socket &&
      props?.user?.role === ROLES?.admin &&
      props?.settings?._id
    ) {
      console.log("chunnu 0", props?.socket)
      console.log("chunnu 1", props?.user?.role)
      console.log("chunnu 2", props?.settings?._id)

      props?.socket.emit(
        "storesocket",
        { storeId: props?.settings?._id },
        payload => {
          console.log("storesocket connected", payload)
        }
      )

      props?.socket.on("storeNotification", data => {
        try {
          console.log("storeListen received", data)

          if (!document.hidden) {
            var notification = new Notification(
              data?.title || "New Notification",
              {
                ...data,
                body: data?.body || data?.message,
              }
            )

            notification.onclick = function (event) {
              event.preventDefault() // prevent the browser from focusing the Notification's tab
              //window.open(payload.notifica.on(tion.click_action, "_blank");
              notification.close()
            }
          }
          const audio = data?.notificationSound || "oh-really"
          if (audio) {
            let chatAudio = document.querySelector(`#${audio}`)
            if (chatAudio) {
              chatAudio.play()
            }
          }
        } catch (error) {
          console.error(error)
        }
      })
    }
  }, [props?.socket, props?.user, props?.settings])

  function getLayout() {
    let layoutCls = VerticalLayout

    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/loading" component={Loader} />
          <Route path="/pages-500" component={Pages500} />

          <Route path="/login-by-admin/:token" component={LoginByAdmin} />

          {!props.authToken &&
            authRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
              />
            ))}
          {props.authToken && (
            <Switch>
              {userRoutes(
                props?.user?.role,
                props?.user?.accessLevel,
                props?.storeType,
                props?.vendorStoreType,
                props?.currentPlan?.billingPlan
              ).map((route, idx) => {
                return (
                  <Authmiddleware
                    path={route?.path}
                    layout={Layout}
                    component={route.component}
                    key={idx}
                    exact
                  />
                )
              })}

              <Route component={Pages404} />
            </Switch>
          )}
        </Switch>
      </Router>

      {props?.alert && (
        <SweetAlert
          custom
          title="Access Denied!"
          onConfirm={props.reloadOnDemand}
        >
          You not have access! Reload Now!
        </SweetAlert>
      )}

      {!props?.isAppReady && (
        <SweetAlert
          title="Store is in progress!"
          onConfirm={() => props.setAppReady(true)}
        >
          <p>Please wait your store setup is in progress</p>

          <div>
            <Spinner
              style={{ width: "4rem", height: "4rem" }}
              color="primary"
            />
          </div>
        </SweetAlert>
      )}
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
  authToken: PropTypes.string,
  currentUser: PropTypes.func,
  getSettings: PropTypes.func,
  user: PropTypes.object,
}

const mapStateToProps = ({ Layout, Alert, Login, Settings, Billing }) => ({
  isAppReady: Login?.isAppReady,
  isSuperAdmin: Login?.isSuperAdmin,
  layout: Layout,
  alert: Alert.alert,
  authToken: Login.authToken,
  user: Login.user,
  settings: Settings?.settings,
  storeType: Settings?.settings?.storeTypeEnabled,
  vendorStoreType: Login?.user?.storeType || [],
  socket: Login?.socket,
  currentPlan: Billing.currentPlan,
  isHyperApp: Login.isHyperApp,
})

export default connect(mapStateToProps, {
  currentUser,
  getSettings,
  getCurrentPlan,
  reloadOnDemand,
  getLanguages,
  setAppReady,
  getPublicData,
})(withRouter(App))
