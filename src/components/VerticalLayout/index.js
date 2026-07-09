import PropTypes from "prop-types"
import React, { Component } from "react"

import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  showBillingAlert,
  hideBillingAlert,
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth,
  enableNotification,
} from "store/actions"

// Layout Related Components
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
import Rightbar from "../CommonForBoth/Rightbar"
import { ROLES } from "helpers/contants"

import { getFirebaseBackend } from "helpers/firebase_helper"

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"

//i18n
import { withTranslation } from "react-i18next"

const isSupported = () =>
  "Notification" in window &&
  "serviceWorker" in navigator &&
  "PushManager" in window

let _Notification = {}

if (isSupported()) {
  _Notification = Notification
}

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scripAdded: false,
      isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    }
    this.toggleMenuCallback = this.toggleMenuCallback.bind(this)
  }

  capitalizeFirstLetter = string => {
    return string.charAt(1).toUpperCase() + string.slice(2)
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen(location => {
      this.onLocationChange(location)
    })

    this.addScript()
    if (this.props.isPreloader === true) {
      document.getElementById("preloader").style.display = "block"
      document.getElementById("status").style.display = "block"

      setTimeout(function () {
        document.getElementById("preloader").style.display = "none"
        document.getElementById("status").style.display = "none"
      }, 2500)
    } else {
      document.getElementById("preloader").style.display = "none"
      document.getElementById("status").style.display = "none"
    }

    // Scroll Top to 0
    window.scrollTo(0, 0)
    let currentage = this.capitalizeFirstLetter(this.props.location.pathname)

    document.title = currentage + " | " + this.props.settings?.storeName

    if (this.props.leftSideBarTheme) {
      this.props.changeSidebarTheme(this.props.leftSideBarTheme)
    }

    if (this.props.layoutWidth) {
      this.props.changeLayoutWidth(this.props.layoutWidth)
    }

    if (this.props.leftSideBarType) {
      this.props.changeSidebarType(this.props.leftSideBarType)
    }
    if (this.props.topbarTheme) {
      this.props.changeTopbarTheme(this.props.topbarTheme)
    }

    /* if (this.props.fcmToken) {
      this.listenNotifications()
    } */

    //to send token if changed by firebase
    if (this.props.notificationGranted) {
      this.props.enableNotification()
    }
  }

  componentDidUpdate(prevProps) {
    /* if (prevProps.fcmToken !== this.props.fcmToken) {
      if (this.props.fcmToken) {
        this.listenNotifications()
      }
    } */

    if (
      prevProps.meLoading !== this.props.meLoading ||
      prevProps.storeLoading !== this.props.storeLoading ||
      prevProps.currentPlanLoading !== this.props.currentPlanLoading ||
      prevProps?.billingPlan !== this.props?.billingPlan
    ) {
      if (
        JSON.stringify(this.props?.user) === "{}" &&
        (this.props?.meLoading ||
          this.props?.storeLoading ||
          this.props.currentPlanLoading)
      ) {
        this.props?.history?.replace("/loading", { from: this.props?.location })
      }
    }

    if (
      prevProps?.user?.name !== this?.props?.user?.name ||
      prevProps?.user?.email !== this?.props?.user?.email ||
      prevProps?.isSetupComplete !== this.props?.isSetupComplete
    ) {
      this.addScript()
    }
  }

  componentWillUnmount() {
    this.unlisten()
  }

  onLocationChange = location => {
    if (
      this.props.settings?.hideThings?.find(
        element => element.type === "isBilling"
      )?.value &&
      !["/upgrade", "/logout"].includes(location?.pathname) &&
      this?.props?.currentPlan?.isExpired
    ) {
      // this.props?.showBillingAlert()
      this.props?.history?.replace("/upgrade")
    }
  }

  toggleMenuCallback = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    if (this.props.leftSideBarType === "default") {
      this.props.changeSidebarType("condensed", isMobile)
    } else if (this.props.leftSideBarType === "condensed") {
      this.props.changeSidebarType("default", isMobile)
    }
  }

  addScript = () => {
    const script = document.createElement("script")
    const script2 = document.createElement("script")
  }

  /* listenNotifications = () => {
    const fireBaseBackend = getFirebaseBackend()

    fireBaseBackend
      ?.onMessageListener()
      .then(abc => console.log("example ", abc))
  } */

  render() {
    return (
      <React.Fragment>
        <div id="preloader">
          <div id="status">
            <div className="spinner-chase">
              <div className="chase-dot" />
              <div className="chase-dot" />
              <div className="chase-dot" />
              <div className="chase-dot" />
              <div className="chase-dot" />
              <div className="chase-dot" />
            </div>
          </div>
        </div>

        <div
          id="layout-wrapper"
          // className={
          //   this.props.storeStatus === "gracePeriod" ? "is-grace-period" : ""
          // }
        >
          {/* {this.props.storeStatus === "gracePeriod" && this.props.user?.role !== "VENDOR" &&
            (
              <div className="grace-period">
                <p>
                  Your billing plan has been expired, you are now on grace
                  period, please update your plan otherwise your store will be
                  inactive.{" "}
                 
                </p>
              </div>
            )} */}
          <Header toggleMenuCallback={this.toggleMenuCallback} />
          <Sidebar
            theme={this.props.leftSideBarTheme}
            type={this.props.leftSideBarType}
            isMobile={this.state.isMobile}
          />
          <div className="main-content">
            {!this.props.loading &&
            !this.props.meLoading &&
            !this.props.storeLoading &&
            !this.props.fcmToken ? (
              <div id="notification-container">{this.props.children}</div>
            ) : (
              this.props.children
            )}
          </div>
          {/* <Footer /> */}
        </div>
        {this.props.showRightSidebar ? <Rightbar /> : null}

        {this.props?.billingAlert && (
          <SweetAlert
            custom
            title={this.props.t("no_access_title")}
            onConfirm={() => {
              this.props?.hideBillingAlert()
              this.props?.history?.replace("/upgrade")
            }}
          >
            {this.props.t("no_access_text")}
          </SweetAlert>
        )}
      </React.Fragment>
    )
  }
}

Layout.propTypes = {
  changeLayoutWidth: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  isPreloader: PropTypes.any,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarType: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any,
}

const mapStatetoProps = ({ Layout, Alert, Login, Settings, Billing }) => ({
  ...Layout,
  billingAlert: Alert.billingAlert,
  user: Login?.user,
  loading: Login?.loading,
  meLoading: Login?.meLoading,
  storeLoading: Settings?.storeLoading,
  settings: Settings?.settings,
  domain: Settings?.settings?.domain,
  storeName: Settings?.settings?.storeName,
  storeStatus: Settings?.settings?.status,
  fcmToken: Login?.fcmToken,
  notificationGranted: Login?.notificationGranted,
  currentPlan: Billing?.currentPlan,
  currentPlanLoading: Billing?.currentPlanLoading,
  billingPlan: Billing?.currentPlan?.billingPlan?.type,
  isSetupComplete: Settings?.getStarted?.isSetupComplete,
  isHyperApp: Login.isHyperApp,
})

export default connect(mapStatetoProps, {
  showBillingAlert,
  hideBillingAlert,
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth,
  enableNotification,
})(withRouter(withTranslation()(Layout)))
