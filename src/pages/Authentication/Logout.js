import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { logoutUser } from "store/actions"
import loaderLogo from "assets/images/loaderlogo.png"

const Logout = props => {
  useEffect(() => {
    props.logoutUser(props.history, props?.role)

    const header = document.querySelector("#page-topbar")
    const menu = document.querySelector(".vertical-menu")

    header?.classList?.add("d-none")
    menu?.classList?.add("d-none")

    document.querySelector("body").classList.add("auth-body")

    return () => {
      header?.classList?.remove("d-none")
      menu?.classList?.remove("d-none")

      document.querySelector("body").classList.remove("auth-body")
    }
  }, [])

  return (
    <div className="icon cloudy">
      {props.isHyperApp && !props.settings?.removeBranding && (
        <>
          <img src={loaderLogo} className="loader-img" />

          <div className="cloud"></div>
        </>
      )}

      <h4 className="loadingtext">Logout please wait...</h4>

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

Logout.propTypes = {
  history: PropTypes.object,
  logoutUser: PropTypes.func,
}

const mapStateToProps = ({ Login, Settings }) => ({
  role: Login?.user?.role,
  settings: Settings.settings,
  isHyperApp: Login.isHyperApp,
})

export default withRouter(connect(mapStateToProps, { logoutUser })(Logout))
