import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import moment from "moment"

import { connect } from "react-redux"
// import { Row, Col } from "reactstrap"

import { Link } from "react-router-dom"
import { Badge, DropdownItem } from "reactstrap"

// Import menuDropdown
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown"
import NotificationEnableButton from "../CommonForBoth/TopbarDropdown/NotificationEnableButton"

import { DEFAULT_APP_LOGO } from "helpers/contants"

//i18n
import { withTranslation } from "react-i18next"

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
  setAppReady,
} from "store/actions"

import { API_BASE_URL } from "helpers/api_helper"

const Header = props => {
  const appReadyTimeout = useRef(null)
  const [isAppReady, setAppReady] = useState(false)

  useEffect(() => {
    const isAppReady = moment(props?.date_created_utc).isBefore(
      moment().subtract(2, "minutes")
    )
    setAppReady(isAppReady)

    if (!isAppReady) {
      appReadyTimeout.current = setTimeout(() => {
        props.setAppReady(true)
        setAppReady(true)

        if (appReadyTimeout.current) {
          clearTimeout(appReadyTimeout.current)
          appReadyTimeout.current = null
        }
      }, 120 * 1000)
    }

    return () => {
      if (appReadyTimeout.current) {
        clearTimeout(appReadyTimeout.current)
        appReadyTimeout.current = null
      }
    }
  }, [props?.date_created_utc])

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

  function tToggle() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    props.toggleLeftmenu(!props.leftMenu)
    if (props.leftSideBarType === "default") {
      props.changeSidebarType("condensed", isMobile)
    } else if (props.leftSideBarType === "condensed") {
      props.changeSidebarType("default", isMobile)
    }
  }

  return (
    <React.Fragment>
      <audio id="alarm-buzzer">
        <source
          src={API_BASE_URL + "/images/alarm-buzzer.mp3"}
          type="audio/mp3"
        />
      </audio>
      {/* <audio id="chimes-glassy"><source src={chimes} type="audio/mp3" /></audio>
      <audio id="credulous"><source src={credulous} type="audio/mp3" /></audio> */}
      <audio id="oh-really">
        <source src={API_BASE_URL + "/images/oh-really.mp3"} type="audio/mp3" />
      </audio>

      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo navbar-brand-logo">
                <img
                  src={DEFAULT_APP_LOGO}
                  alt=""
                  className="navbar-brand-logo-img"
                />
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle()
              }}
              className="btn btn-sm px-3 font-size-16 header-item waves-effect d-lg-none"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>

          <div className="d-flex align-items-center">
            <div className="dropdown d-none d-sm-inline-block ml-1">
              {props.settings?.hideThings?.find(
                element => element.type === "isPreviewed"
              )?.value && (
                  <>
                    {isAppReady ? (
                      <a
                        href={"https://" + props?.settings?.domain}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="header-preview-link"
                      >
                        {props.t("preview")}
                      </a>
                    ) : (
                      <a
                        href={"#"}
                        onClick={() => props.setAppReady(false)}
                        className="header-preview-link"
                      >
                        {props.t("preview")}
                      </a>
                    )}
                  </>
                )}

              {/* <span className="ml-1">
                {props.t("store_id")}:{" "}
                <span className="font-size-13 badge-soft-success">
                  {props?.storeID}
                </span>
              </span> */}
            </div>
            <LanguageDropdown />

            <NotificationEnableButton />

            {/* <div className="dropdown d-none d-lg-inline-block ml-1">
              <Link to="/settings">
                <button
                  type="button"
                  className="btn header-item noti-icon waves-effect"
                  data-toggle="fullscreen"
                >
                  <i class="fas fa-language"></i>
                </button>
              </Link>
            </div> */}

            <div className="dropdown d-none d-lg-inline-block ml-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen()
                }}
                className="btn header-item noti-icon waves-effect"
                data-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen" />
              </button>
            </div>
            {/* {props?.role !== ROLES.vendor && <NotificationDropdown />} */}
            <ProfileMenu
              extraData={
                <DropdownItem className="dropdown d-sm-none ml-1">
                  <div>
                    {props.settings?.hideThings?.find(
                      element => element.type === "isPreviewed"
                    )?.value && (
                        <>
                          {isAppReady ? (
                            <a
                              href={"https://" + props?.settings?.domain}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="header-preview-link"
                            >
                              {props.t("preview")}
                            </a>
                          ) : (
                            <a
                              href={"#"}
                              onClick={() => props.setAppReady(false)}
                              className="header-preview-link"
                            >
                              {props.t("preview")}
                            </a>
                          )}
                        </>
                      )}

                    {/* <span className="ml-1">
                      {props.t("store_id")}:{" "}
                      <span className="font-size-13 badge-soft-success">
                        {props?.storeID}
                      </span>
                    </span> */}
                  </div>

                  <div className="dropdown-divider" />
                </DropdownItem>
              }
            />
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
}

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout
  return {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
    role: state?.Login?.user?.role || "",
    date_created_utc: state?.Login?.user?.date_created_utc,
    storeID: state?.Settings?.settings?.slug || "#",
    settings: state.Settings.settings,
  }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
  setAppReady,
})(withTranslation()(Header))
