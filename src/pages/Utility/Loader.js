import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import loaderLogo from "assets/images/loaderlogo.png"
import { ROLES } from "helpers/contants"

// Translation
import { withTranslation } from "react-i18next"

const Loader = props => {
  const {
    isSuperAdmin,
    superLoading,
    superError,
    meLoading,
    isMeFailed,
    storeLoading,
    starterLoading,
    isStoreFailed,
    getStarted,
    currentPlan,
    currentPlanLoading,
    currentPlanFailed,
    isHyperApp,
  } = props

  const [pageLoaded, setpageLoaded] = useState(false)

  useEffect(() => {
    document.querySelector("body").classList.add("auth-body")

    setpageLoaded(true)

    return () => {
      document.querySelector("body").classList.remove("auth-body")
    }
  }, [])

  useEffect(() => {
    if (JSON.stringify(props?.user) !== "{}") {
      if (
        (isSuperAdmin ? !superLoading : true) &&
        !meLoading &&
        !storeLoading &&
        !starterLoading &&
        !currentPlanLoading
      ) {
        if (
          (isSuperAdmin ? superError : false) ||
          isMeFailed ||
          isStoreFailed ||
          (currentPlanFailed && props?.user?.role === ROLES.admin)
        ) {
          props?.history?.replace("/pages-500")
        } else {
          const favicon = document.getElementById("favicon")

          if (favicon) {
            favicon.href = props.settings?.favIcon?.link
          }
          if (props?.user?.role === ROLES.admin) {
            if (currentPlan.isExpired) {
              if (
                !props.settings?.hideThings?.find(
                  element => element.type === "isBilling"
                )?.value
              )
                return defaultNavigate()

              return props?.history?.replace("/upgrade")
            }

            if (!getStarted?.isSetupComplete && props?.fromLogin) {
              if (
                !props.settings?.hideThings?.find(
                  element => element.type === "isGetStarted"
                )?.value
              )
                return defaultNavigate()

              return props?.history?.replace("/GetStarted")
            }
          }

          defaultNavigate()
        }
      }
    } else if (isMeFailed || isStoreFailed) {
      props?.history?.replace("/pages-500")
    } else if (isSuperAdmin && superError) {
      props?.history?.replace("/pages-500")
    }
  }, [
    isSuperAdmin,
    superLoading,
    superError,
    meLoading,
    isMeFailed,
    storeLoading,
    isStoreFailed,
    starterLoading,
    currentPlanLoading,
  ])

  const defaultNavigate = () => {
    if (props?.location?.state?.from) {
      props?.history?.replace(props?.location?.state?.from)
    } else {
      props?.history?.replace("/dashboard")
    }
  }

  if (!pageLoaded) return <div className="icon cloudy"></div>

  return (
    <div className="icon cloudy">
      {isHyperApp && !props.settings?.removeBranding && (
        <>
          <img src={loaderLogo} className="loader-img" />

          <div className="cloud"></div>
        </>
      )}

      <h4 className="loadingtext">{props.t("loading_wait")}</h4>

      <label className="loading">
        <input type="checkbox" />

        <div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </label>
    </div>
  )
}

const _Loading = withTranslation()(Loader)

const mapStateToProps = ({ Login, Settings, Billing }) => ({
  fromLogin: Login.fromLogin,
  isSuperAdmin: Login?.isSuperAdmin,
  superError: Login?.superError,
  superLoading: Login?.superError,
  user: Login?.user,
  meLoading: Login?.meLoading,
  isMeFailed: Login?.isMeFailed,
  settings: Settings?.settings,
  storeLoading: Settings?.storeLoading,
  starterLoading: Settings?.starterLoading,
  isStoreFailed: Settings?.isStoreFailed,
  getStarted: Settings?.getStarted,
  currentPlan: Billing?.currentPlan,
  currentPlanLoading: Billing?.currentPlanLoading,
  currentPlanFailed: Billing?.currentPlanFailed,
  isHyperApp: Login.isHyperApp,
})

export default connect(mapStateToProps)(withRouter(_Loading))
