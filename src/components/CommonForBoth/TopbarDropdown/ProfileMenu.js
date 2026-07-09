import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

import { ROLES, USER_AUTH_KEY } from "helpers/contants"

// users
import avatar4 from "assets/images/users/avatar-9.jpg"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const [username, setusername] = useState("Admin")

  useEffect(() => {
    if (localStorage.getItem(USER_AUTH_KEY)) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem(USER_AUTH_KEY))
        setusername(obj.displayName)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem(USER_AUTH_KEY))
        if (!obj) {
          return setusername("")
        }
        setusername(obj.data.name)
      }
    }
  }, [props.success])
  // console.log(props, "props?.user?.profileImage");

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={
              !!props?.user?.profileImage
                ? props?.user?.profileImage.link
                : avatar4
            }
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ml-2 mr-1">
            {props?.user?.name}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>

        <DropdownMenu right>
          {props.extraData}
          <DropdownItem tag={Link} to="/edit-profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle mr-1" />
            {props.t("profile")}{" "}
          </DropdownItem>

          <DropdownItem tag={Link} to="/change-password">
            {" "}
            <i className="mdi mdi-key align-middle mr-1" />
            {props.t("password")}{" "}
          </DropdownItem>

          {/* {props.settings?.hideThings?.find(
            element => element.type === "isBilling"
          )?.value && props?.user?.role === ROLES.admin && (
              <DropdownItem tag={Link} to="/upgrade">
                <i className="bx bx-receipt font-size-17 align-middle mr-1" />
                {props.t("billing")}
              </DropdownItem>
            )} */}

          {/* <DropdownItem tag="a" href="#">
            <span className="badge badge-success float-right">11</span>
            <i className="bx bx-cog font-size-17 align-middle mr-1" />
            {props.t("Settings")}
          </DropdownItem> */}

          <div className="dropdown-divider" />

          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger" />
            <span>{props.t("logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = ({ Login, Settings }) => ({
  user: Login.user,
  settings: Settings.settings
})

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
