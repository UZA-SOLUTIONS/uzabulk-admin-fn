import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

// MetisMenu
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

import {
  GET_SERVICE_NAME,
  ADMIN_SUB_SERVICES_ROUTE,
  SERVICE_ICON,
} from "helpers/contants"

const SideBarHelper = ({
  user,
  store,
  linkTo,
  isWave = true,
  serviceRoute,
  permissions,
  ...props
}) => {
  return Object.values(serviceRoute)
    ?.filter(item => {
      console.log(item, "heelllll")
      let filter = !item?.isNotRequired && !item?.notInVendor
      // console.log(item, "PO");
      if (
        !!item?.isVthree &&
        (props.settings.storeVersion > 2
          ? item.isVthree === "false"
          : item.isVthree === "true")
      ) {
        filter = false
      }
      if (
        (item.notForStore &&
          item.notForStore.includes(store.storeType?.toUpperCase())) ||
        (item.onlyForStore &&
          !item.onlyForStore.includes(store.storeType?.toUpperCase()))
      ) {
        filter = false
      }

      if (["reviews", "user-order"].includes(item?.key)) {
        // hide review tab
        filter = false
      }

      console.log("pengu", item)
      if (permissions?.[item?.key] === false) {
        filter = false
      }

      return filter
    })
    ?.map((item, index) => {
      if (item.subItems) {
        return (
          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <i className={item.icon} />
              <span className="text-capitalize">
                {props.t(`${item.title}`)}
              </span>
            </Link>

            <ul className="sub-menu" aria-expanded="false">
              {SideBarHelper({
                ...props,
                linkTo,
                isWave: false,
                serviceRoute: item.subItems,
              })}
            </ul>
          </li>
        )
      }

      let title = item.title
      let link = `/${item?.key}`
      let icon = SERVICE_ICON[item?.key]

      if (linkTo) {
        link = `${linkTo}/${item?.key}`
      }

      /* Dynamic Menu Title using Store Type Key */

      if (item?.isTitleDynamic) {
        const name = GET_SERVICE_NAME({
          storeType: store?.storeType,
          name: item.key,
          label: store?.label,
        })

        title = name
      }

      if (item?.isDynamic) {
        console.log(item, "INTHERE")
        const name = GET_SERVICE_NAME({
          storeType: store.storeType,
          name: item.key,
          label: store.label,
        })
        console.log(name, "ITEm", store)
        link = `${linkTo}/${name?.toLowerCase()}s`
        title = name + "s"

        if (item.key === "vendor" || item.key === "restaurant") {
          // title = "My " + name
          title = user?.name || "My " + name
          link += "/" + user?._id + "/profile"
        }
      }

      let ignore = false

      if (item.onlyFor) {
        if (store.storeType === "FOOD") {
          if (item.onlyFor !== "FOOD") {
            ignore = true
          }
        } else {
          if (item.onlyFor === "FOOD") {
            ignore = true
          }
        }
      }

      if (
        [
          "reports",
          "reports/orders",
          "reports/bookings",
          "reports/users",
        ].includes(item.key) &&
        !props.settings?.hideThings?.find(
          element => element.type === "isReports"
        )?.value
      ) {
        ignore = true
      }
      if (
        item.key === "geofencing" &&
        !props.settings?.hideThings?.find(
          element => element.type === "isGeofence"
        )?.value
      ) {
        ignore = true
      }

      if (ignore) return <></>

      return (
        <li key={item.key + index} className="text-capitalize">
          <Link
            to={link}
            {...(isWave ? { className: "waves-effect" } : {})}
            onClick={() => {
              props.isMobile && props.tToggle && props.tToggle()
            }}
          >
            {icon && <i className={icon} />}
            <span>{props.t(title?.toLowerCase())}</span>
          </Link>
        </li>
      )
    })
}

const SidebarContent = props => {
  const { user, storeType, accessLevel } = props
  console.log(user, "hgdfhgffgh")
  console.log("begginx1 ", accessLevel)
  console.log("begginx2 ", storeType)

  //collecting list or view permission;
  const permissions = {}
  accessLevel.forEach(item => {
    var key = item.type
    var value = false

    item?.permissions?.forEach(itm => {
      if (["view", "list"]?.includes(itm?.label?.toLowerCase()) && itm?.value) {
        value = true
      }
    })
    permissions[key] = value

    //adding permissions for storetypes
    if (item?.storeTypes) {
      const storePermissions = item?.storeTypes?.find(
        itm => itm.storeType === storeType?.[0]?.storeType
      )?.navigation
      storePermissions?.forEach(itx => {
        var key = itx.type
        var value = false
        itx?.permissions?.forEach(itm => {
          if (
            ["view", "list"]?.includes(itm?.label?.toLowerCase()) &&
            itm?.value
          ) {
            value = true
          }
        })

        permissions[key] = value
      })
    }
  })
  //mapping for api different names start
  permissions["add-on"] = permissions?.["addon"]
  permissions["requests"] = permissions?.["orders"]
  permissions["attributes"] = permissions?.["attribute"]
  permissions["system-access"] = false

  //mapping for api different names end

  console.log("View/List Permissions", permissions)

  return (
    <React.Fragment>
      <div id="sidebar-menu" className="pt-0">
        <ul className="metismenu list-unstyled" id="side-menu">
          {/* <li>
            <Link
              to={"/dashboard"}
              onClick={() => {
                props.isMobile && props.tToggle && props.tToggle()
              }}
            >
              <i class="bx bx-home-circle" />
              <span>{props.t("dashboard")}</span>
            </Link>
          </li> */}

          {props.settings?.hideThings?.find(
            element => element.type === "isReports"
          )?.value &&
            permissions["reports"] && (
              <li>
                <Link
                  to={"/reports/orders"}
                  onClick={() => {
                    props.isMobile && props.tToggle && props.tToggle()
                  }}
                >
                  <i class="far fa-chart-bar" />
                  <span>{props.t("reports")}</span>
                </Link>
              </li>
            )}
          {console.log("KingPin", ADMIN_SUB_SERVICES_ROUTE)}
          {storeType.map(store => (
            <SideBarHelper
              user={user}
              t={props.t}
              store={store}
              serviceRoute={ADMIN_SUB_SERVICES_ROUTE}
              linkTo={`/${store.storeType.toLowerCase()}`}
              isMobile={props.isMobile}
              tToggle={props.tToggle}
              settings={props.settings}
              permissions={permissions}
            />
          ))}
        </ul>
      </div>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  t: PropTypes.any,
  storeType: PropTypes.array,
  role: PropTypes.string,
}

const mapStateToProps = ({ Settings }) => ({
  settings: Settings.settings,
  storeVersion: Settings.settings.storeVersion,
})

export default connect(mapStateToProps)(withTranslation()(SidebarContent))
