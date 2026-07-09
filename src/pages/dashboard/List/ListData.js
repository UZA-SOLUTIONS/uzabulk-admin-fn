import React, { Fragment } from "react"
import { Spinner, NavLink, NavItem, Nav } from "reactstrap"
import classnames from "classnames"

const ListData = props => {
  const { toggleTable, customActiveTable, totalCount } = props

  return (
    <Fragment>
      {/* <Nav tabs className="nav-tabs-custom ">
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTable === "1",
            })}
            onClick={() => {
              toggleTable("1", "new")
            }}
          >
            {props.t("new_request")}{" "}
            {customActiveTable === "1" && `(${totalCount})`}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTable === "2",
            })}
            onClick={() => {
              toggleTable("2", "current")
            }}
          >
            {props.t("current_request")}{" "}
            {customActiveTable === "2" && `(${totalCount})`}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            {props?.loading && <Spinner color="primary" size="sm" />}
          </NavLink>
        </NavItem>
      </Nav> */}
    </Fragment>
  )
}

export default ListData
