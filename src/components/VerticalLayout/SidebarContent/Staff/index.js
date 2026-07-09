import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

// MetisMenu
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

import {
  GET_SERVICE_NAME,
  ADMIN_SERVICE_ROUTE,
  ADMIN_SUB_SERVICES_ROUTE,
  VENDOR_SERVICES_ROUTE,
  SERVICE_ICON,
} from "helpers/contants"

import { API_BASE_URL } from "helpers/api_helper"

const permissionsFilter = item => {
  if (item?.type === "storetypes") return true
  if (item?.type === "configuration") return true
  const _index = item?.permissions?.findIndex(i =>
    ["VIEW", "view", "List", "list"].includes(i.label)
  )

  if (_index !== -1) {
    return item?.permissions[_index]?.value
  }

  return false
}

const SideBarHelper = ({
  storeType,
  permissions,
  linkTo,
  isWave = true,
  serviceRoute,
  singleStore,
  ...props
}) => {
  let _serviceRoute = {}
  console.log("Original  routes", serviceRoute)
  Object.entries(serviceRoute)
    ?.filter(([_, item]) => {
      let filter =
        (props.isBasicPlan
          ? !item.notInBasicPlan || item.onlyInBasicPlan
          : !item.onlyInBasicPlan) &&
        (props.isPremiumPlan
          ? !item.notInPremiumPlan || item.onlyInPremiumPlan
          : props.isBasicPlan
          ? true
          : !item.onlyInPremiumPlan)

      if (item.version && item.version.includes(props.storeVersion)) {
        filter = true
      }
      if (["reviews", "user-order"].includes(item?.key)) {
        // hide review tab, userOrders tab
        filter = false
      }
      if (
        !!item?.isVthree &&
        (props.storeVersion > 2
          ? item.isVthree === "false"
          : item.isVthree === "true")
      ) {
        // console.log(item, "45");
        filter = false
      }

      if (
        (item.notForStore &&
          item.notForStore.includes(singleStore?.storeType?.toUpperCase())) ||
        (item.onlyForStore &&
          !item.onlyForStore.includes(singleStore?.storeType?.toUpperCase()))
      ) {
        filter = false
      }
      // if ((item?.forvthree) && props.storeVersion === "3" ? item?.forvthree === "true" : item?.forvthree === "false") {
      //   filter = false
      // }

      return filter
    })
    .map(([key, value]) => (_serviceRoute[key] = value))
  serviceRoute = { ..._serviceRoute }
  console.log("Final ROutes", serviceRoute)
  return permissions?.filter(permissionsFilter)?.map((item, index) => {
    switch (item.type) {
      /* case "orders":
        item.type = "order"
        break
  
      case "trips":
        item.type = "trip"
        break */
      case "promocode":
        item.type = "promoCode1"
        break
      case "vehicletype":
        item.type = "vehicleType"
        break
      case "dispatch":
        if (!serviceRoute[item.type]) return

        if (
          ["dispatcher", "dispatcher/listing", "dispatcher/mapView"].includes(
            serviceRoute[item.type]?.key
          ) &&
          !props.settings?.hideThings?.find(
            element => element.type === "isDispatcher"
          )?.value
        ) {
          ignore = true
        }
        return SubSideBarHelper({
          title: ADMIN_SERVICE_ROUTE[item.type]?.title,
          icon: ADMIN_SERVICE_ROUTE[item.type]?.icon,
          ...props,
          permissions: Object.keys(
            ADMIN_SERVICE_ROUTE[item.type]?.subItems
          )?.map(type => ({ ...item, type })),
          linkTo: ``,
          isWave: false,
          serviceRoute: ADMIN_SERVICE_ROUTE[item.type]?.subItems,
        })

      case "reports":
        if (!serviceRoute[item.type]) return
        if (
          !props.settings?.hideThings?.find(
            element => element.type === "isReports"
          )?.value
        ) {
          return
        }

        return SubSideBarHelper({
          title: ADMIN_SERVICE_ROUTE[item.type]?.title,
          icon: ADMIN_SERVICE_ROUTE[item.type]?.icon,
          ...props,
          permissions: Object.keys(
            ADMIN_SERVICE_ROUTE[item.type]?.subItems
          )?.map(type => ({ ...item, type })),
          linkTo: ``,
          isWave: false,
          serviceRoute: ADMIN_SERVICE_ROUTE[item.type]?.subItems,
        })

      case "marketing":
        if (!serviceRoute[item.type]) return
        if (
          !props.settings?.hideThings?.find(
            element => element.type === "isMarketing"
          )?.value
        ) {
          return
        }

        return SubSideBarHelper({
          title: ADMIN_SERVICE_ROUTE[item.type]?.title,
          icon: ADMIN_SERVICE_ROUTE[item.type]?.icon,
          ...props,
          permissions: Object.keys(
            ADMIN_SERVICE_ROUTE[item.type]?.subItems
          )?.map(type => ({ ...item, type })),
          linkTo: ``,
          isWave: false,
          serviceRoute: ADMIN_SERVICE_ROUTE[item.type]?.subItems,
        })

      case "accounting":
        if (!serviceRoute[item.type]) return
        return SubSideBarHelper({
          title: ADMIN_SERVICE_ROUTE[item.type]?.title,
          icon: ADMIN_SERVICE_ROUTE[item.type]?.icon,
          ...props,
          permissions: Object.keys(
            ADMIN_SERVICE_ROUTE[item.type]?.subItems
          )?.map(type => ({ ...item, type })),
          linkTo: ``,
          isWave: false,
          serviceRoute: ADMIN_SERVICE_ROUTE[item.type]?.subItems,
        })

      case "catalog":
        return SubSideBarHelper({
          title: ADMIN_SUB_SERVICES_ROUTE[item.type]?.title,
          icon: ADMIN_SUB_SERVICES_ROUTE[item.type]?.icon,
          ...props,
          permissions: Object.keys(
            ADMIN_SUB_SERVICES_ROUTE[item.type]?.subItems
          )?.map(type => ({ ...item, type })),
          linkTo,
          singleStore,
          isWave: false,
          serviceRoute: ADMIN_SUB_SERVICES_ROUTE[item.type]?.subItems,
          storeType,
        })
    }

    if (item.type === "configuration") {
      return SubSideBarHelper({
        title: props.t("configuration"),
        icon: SERVICE_ICON.configuration,
        singleStore,
        ...props,
        permissions: item.permissions,
        linkTo: ``,
        isWave: false,
        serviceRoute: ADMIN_SERVICE_ROUTE.configuration.subItems,
      })
    }

    if (item.type === "storetypes") {
      return item?.storeTypes
        ?.filter(store => {
          // Filter Enabled Store Type
          const _index = storeType?.findIndex(
            s => s.storeType === store.storeType
          )

          return _index !== -1
        })
        ?.map(store => {
          const singleStore =
            storeType[
              storeType?.findIndex(s => s.storeType === store.storeType)
            ]

          const _storetype = props?.STORETYPES?.filter(
            element =>
              element?.storeType?.toLowerCase() ===
              store?.storeType?.toLowerCase()
          )

          let icon = ""

          if (_storetype?.length > 0) {
            icon = _storetype[0]?.icon
          }

          if (props.isBasicPlan || props.isPremiumPlan) {
            let _navigations = []
            let _vendor = []

            store?.navigation?.map(item => {
              _navigations.push(item)

              if (props.isBasicPlan && item.type === "restaurants") {
                Object.entries(VENDOR_SERVICES_ROUTE).map(
                  ([key, serviceVal]) => {
                    _vendor.push({
                      label: props.t(serviceVal.title),
                      type: key,
                      permissions: item.permissions,
                    })
                  }
                )

                _vendor.push({
                  label: props.t("catalogs"),
                  type: "catalog",
                  permissions: item.permissions,
                })
              }
            })

            _navigations.push(..._vendor)

            return SideBarHelper({
              storeType,
              permissions: _navigations,
              linkTo: `/${store.storeType.toLowerCase()}`,
              isWave,
              serviceRoute: ADMIN_SUB_SERVICES_ROUTE,
              singleStore,
              ...props,
            })
          }

          return SubSideBarHelper({
            title:
              singleStore?.label?.toLowerCase() ||
              store?.storeType?.toLowerCase(),
            icon,
            isIconImage: true,
            ...props,
            storeType,
            singleStore,
            permissions: store?.navigation,
            linkTo: `/${store.storeType.toLowerCase()}`,
            isWave: false,
            serviceRoute: ADMIN_SUB_SERVICES_ROUTE,
          })
        })
    }

    if (item.type === "subAdmins") {
      return (
        <li>
          <Link to="/#" className="has-arrow waves-effect">
            <i className="fas fa-user-friends" style={{ fontSize: "1rem" }} />
            <span>{props.t("system_access")}</span>
          </Link>

          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link
                to={`/sub-admins`}
                onClick={() => {
                  props.isMobile && props.tToggle && props.tToggle()
                }}
              >
                <span>{props.t("sub_admins")}</span>
              </Link>
            </li>
          </ul>
        </li>
      )
    }

    if (props?.isPremiumPlan && ["brands", "cuisines"].includes(item.type)) {
      singleStore = { storeType: item.storeType }
    }

    if (!serviceRoute[item.type]) return

    let title = serviceRoute[item.type]?.title
    let link = `/${serviceRoute[item.type]?.key}`
    let icon = serviceRoute[item.type]?.icon

    if (linkTo) {
      link = `${linkTo}/${serviceRoute[item.type]?.key}`
    }

    if (serviceRoute[item.type]?.isTitleDynamic) {
      const name = GET_SERVICE_NAME({
        storeType: singleStore?.storeType,
        name: serviceRoute[item.type]?.key,
        label: singleStore?.label,
      })

      title = name
    }

    if (serviceRoute[item.type]?.isDynamic) {
      const name = GET_SERVICE_NAME({
        storeType: singleStore?.storeType,
        name: serviceRoute[item.type]?.key,
        label: singleStore?.label,
      })

      title = name

      title += "s"
      link += "s"

      if (singleStore && singleStore.storeType?.toLowerCase() === "taxi") {
        link = `/trips`

        if (linkTo) {
          link = `${linkTo}/trips`
        }
      }

      if (
        singleStore?.storeVendorType === "SINGLE" &&
        (item.type === "vendors" || item.type === "restaurants")
      ) {
        // title = "My " + name
        title = singleStore?.singleVendoName || "My " + name

        if (!!singleStore?.singleVendorId) {
          link += "/" + singleStore?.singleVendorId + "/profile"
        } else {
          link += "/add"
        }

        return (
          <>
            <li key={item.type + index} className="text-capitalize">
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

            {SideBarHelper({
              storeType,
              permissions: Object.entries(VENDOR_SERVICES_ROUTE)?.map(
                ([key, value]) => ({
                  ...value,
                  label: value.title,
                  type: key,
                  permissions:
                    key === "transaction"
                      ? props?.accountingPermissions?.permissions
                      : item.permissions,
                })
              ),
              linkTo,
              isWave,
              serviceRoute,
              singleStore,
              ...props,
            })}
          </>
        )
      }
    }

    let ignore = false

    if (
      props?.isBasicPlan &&
      serviceRoute[item.type]?.ignoreIfNoDelivery &&
      !props.isDeliveryType
    ) {
      if (item.key === "vehicle-types") {
        console.log("xyu ,not for delivery")
      }
      ignore = true
    }

    if (serviceRoute[item.type]?.onlyFor) {
      ignore = true

      /* Dynamic ignore no need menu (Like restaurant has add-on but grocery don't) */
      if (singleStore?.storeType == serviceRoute[item.type]?.onlyFor) {
        ignore = false
      } else if (
        singleStore?.storeType !== "FOOD" &&
        serviceRoute[item.type]?.onlyFor === "VENDOR"
      ) {
        ignore = false
      }
    }

    if (serviceRoute[item.type]?.onlyVendor) {
      const name = GET_SERVICE_NAME({
        storeType: singleStore?.storeType,
        name: serviceRoute[item.type]?.key,
        label: singleStore?.label,
      })

      if (
        singleStore?.storeVendorType === "SINGLE" &&
        [
          "transactions",
          "product",
          "promo-codes",
          "category",
          "add-on",
          "attributes",
        ].includes(serviceRoute[item.type]?.key)
      ) {
        // title = "My " + name
        // title = singleStore?.singleVendoName || "My " + name
        title = name

        if (!!singleStore?.singleVendorId) {
          // link += "/" + singleStore?.singleVendorId
        } else {
          ignore = true
        }
      } else {
        title = name + "s"
      }
    }

    if (
      (props?.isBasicPlan || props?.isPremiumPlan) &&
      [
        "restaurant",
        "vendor",
        "promo-codes",
        "transactions",
        "orders",
        "order",
        "trip",
        "trips",
        "requests",
      ].includes(serviceRoute[item.type]?.key)
    ) {
      icon = SERVICE_ICON[serviceRoute[item.type]?.key]
    }

    if (serviceRoute[item.type]?.notForVersion1 && props.storeVersion <= 1) {
      if (item.key === "vehicle-types") {
        console.log("xyu ,not for version1")
      }
      ignore = true
    }

    if (
      serviceRoute[item.type]?.key === "geofencing" &&
      !props.settings?.hideThings?.find(
        element => element.type === "isGeofence"
      )?.value
    ) {
      ignore = true
    }

    if (
      serviceRoute[item.type]?.key === "app-settings" &&
      !props.settings?.hideThings?.find(
        element => element.type === "isAppSettings"
      )?.value
    ) {
      ignore = true
    }

    if (
      serviceRoute[item.type]?.key === "gallery" &&
      !props.settings?.hideThings?.find(element => element.type === "isGallery")
        ?.value
    ) {
      ignore = true
    }

    if (
      serviceRoute[item.type]?.key === "promotions" &&
      !props.settings?.hideThings?.find(
        element => element.type === "isPromotions"
      )?.value
    ) {
      ignore = true
    }

    if (
      serviceRoute[item.type]?.key === "dispute" &&
      !props.settings?.hideThings?.find(element => element.type === "isDispute")
        ?.value
    ) {
      ignore = true
    }

    if (
      serviceRoute[item.type]?.key === "bird-eye-view" &&
      !props.settings?.hideThings?.find(
        element => element.type === "isBirdEyeView"
      )?.value
    ) {
      ignore = true
    }
    if (
      serviceRoute[item.type]?.key === "businessType" &&
      !props.settings?.hideThings?.find(
        element => element.type === "businessType"
      )?.value
    ) {
      ignore = true
    }

    if (
      ["document-templates", "document-templates/:templateId/fields"].includes(
        serviceRoute[item.type]?.key
      ) &&
      !props.settings?.hideThings?.find(
        element => element.type === "isDocumentTemplates"
      )?.value
    ) {
      ignore = true
    }

    if (
      serviceRoute[item.type]?.key === "email-templates" &&
      !props.settings?.hideThings?.find(
        element => element.type === "isEmailTemplates"
      )?.value
    ) {
      ignore = true
    }

    if (
      ["content-pages", "content-pages/:contentPageId/sections"].includes(
        serviceRoute[item.type]?.key
      ) &&
      !props.settings?.hideThings?.find(
        element => element.type === "isContentPages"
      )?.value
    ) {
      ignore = true
    }

    if (
      serviceRoute[item.type]?.key === "faqs" &&
      !props.settings?.hideThings?.find(element => element.type === "isFaq")
        ?.value
    ) {
      ignore = true
    }

    if (
      serviceRoute[item.type]?.key === "terminology" &&
      !props.settings?.hideThings?.find(
        element => element.type === "isTerminology"
      )?.value
    ) {
      ignore = true
    }

    if (
      serviceRoute[item.type]?.key === "theme-settings" &&
      !props.settings?.hideThings?.find(
        element => element.type === "isThemeSettings"
      )?.value
    ) {
      ignore = true
    }

    if (
      ["system-access", "sub-admins", "roles"].includes(
        serviceRoute[item.type]?.key
      ) &&
      !props.settings?.hideThings?.find(
        element => element.type === "isSystemAccess"
      )?.value
    ) {
      ignore = true
    }

    if (
      ["menus", "menus/:menuId/sections"].includes(
        serviceRoute[item.type]?.key
      ) &&
      !props.settings?.hideThings?.find(
        element => element.type === "isWebsiteMenu"
      )?.value
    ) {
      ignore = true
    }

    if (ignore) return <></>

    return (
      <li key={item.type + index} className="text-capitalize">
        <Link
          to={link}
          {...(isWave ? { className: "waves-effect" } : {})}
          onClick={() => {
            props.isMobile && props.tToggle && props.tToggle()
          }}
        >
          {icon && <i className={icon} />}
          <span className="parentsidebar">{props.t(title?.toLowerCase())}</span>
        </Link>
      </li>
    )
  })
}

const SubSideBarHelper = ({ icon, isIconImage, title, ...props }) => {
  if (
    props?.permissions?.filter(element => {
      return element?.permissions?.filter(item => item?.value)?.length > 0
    })?.length <= 0
  )
    return <></>

  return (
    <li>
      <Link to="/#" className="has-arrow waves-effect text-capitalize">
        {isIconImage ? (
          <img src={API_BASE_URL + icon} alt="" />
        ) : (
          <i className={icon} />
        )}

        <span className="text-capitalize">{props.t(title?.toLowerCase())}</span>
      </Link>

      <ul className="sub-menu" aria-expanded="false">
        {SideBarHelper({ ...props })}
      </ul>
    </li>
  )
}

const SidebarContent = props => {
  const { storeType, accessLevel, isBasicPlan, isPremiumPlan } = props

  let accounting = accessLevel?.permissions?.filter(
    item => item.type === "accounting"
  )[0]

  let permissions = accessLevel?.permissions
  let singleStore

  if (isBasicPlan || isPremiumPlan) {
    singleStore = storeType[0]

    let _new_permissions = []
    let configurations = []
    let storeSettings = []

    let _level = accessLevel?.permissions
      ?.slice(0, permissions?.length - 1)
      ?.filter(permissionsFilter)

    let renderBreakpoint = item => {
      let storeTypes = accessLevel?.permissions[permissions?.length - 1] || {}

      _new_permissions.push(storeTypes)

      if (isPremiumPlan) {
        let cuisine = storeTypes?.storeTypes[0]?.navigation.filter(
          nav => nav.type === "cuisines"
        )[0]
        cuisine &&
          configurations.push({
            ...cuisine,
            storeType: storeTypes?.storeTypes[0]?.storeType,
          })
      }

      let storeTypeSetting = storeTypes?.storeTypes[0]?.navigation.filter(
        nav => nav.type === "storeTypeSetting"
      )[0]

      if (!!storeTypeSetting) {
        if (
          ["TAXI", "PICKUPDROP"].includes(storeTypes?.storeTypes[0]?.storeType)
        ) {
          storeSettings.push({
            ...storeTypeSetting,
            label: "Trip Setting",
            type: "tripSetting",
            storeType: storeTypes?.storeTypes[0]?.storeType,
          })
        } else {
          storeSettings.push({
            ...storeTypeSetting,
            label: "Order Setting",
            type: "orderSetting",
            storeType: storeTypes?.storeTypes[0]?.storeType,
          })
        }
      }

      if (isBasicPlan) {
        let restaurants = storeTypes?.storeTypes[0]?.navigation.filter(
          nav => nav.type === "restaurants"
        )[0]

        restaurants &&
          storeSettings.push({
            ...restaurants,
            label: "Delivery Setting",
            type: "deliverySetting",
            storeType: storeTypes?.storeTypes[0]?.storeType,
          })
      }
    }

    if (
      _level?.filter(item => ADMIN_SERVICE_ROUTE[item.type]?.isBreakPoint)
        .length <= 0
    ) {
      renderBreakpoint()
    }

    _level?.map(item => {
      if (ADMIN_SERVICE_ROUTE[item.type]?.isBreakPoint) {
        renderBreakpoint()
      }

      switch (item.type) {
        case "gallery":
        case "faq":
        case "contentPages":
        case "menus":
        case "emailTemplate":
        case "docTemplate":
        case "globalSetting":
        case "geofencing":
          configurations.push(item)
          break

        default:
          _new_permissions.push(item)
          break
      }
    })

    configurations.push(...storeSettings)

    _new_permissions.push({
      label: "Configuration",
      permissions: configurations,
      type: "configuration",
    })

    permissions = _new_permissions
  } else {
    let _new_permissions = []
    let configurations = []

    accessLevel?.permissions
      ?.slice(0, permissions?.length - 1)
      ?.filter(permissionsFilter)
      ?.map(item => {
        console.log(item.type, "SIMBHU")
        switch (item.type) {
          case "gallery":
          case "faq":
          case "contentPages":
          case "menus":
          case "emailTemplate":
          case "docTemplate":
          case "themeSetting":
          case "globalSetting":
          case "geofencing":
            configurations.push(item)
            break

          default:
            _new_permissions.push(item)
            break
        }
      })

    _new_permissions.push({
      label: "Configuration",
      permissions: configurations,
      type: "configuration",
    })
    _new_permissions.push(accessLevel?.permissions[permissions?.length - 1])

    permissions = _new_permissions
  }

  return (
    <React.Fragment>
      <div id="sidebar-menu" className="pt-0">
        <ul className="metismenu list-unstyled" id="side-menu">
          <li>
            <Link
              to={"/dashboard"}
              onClick={() => {
                props.isMobile && props.tToggle && props.tToggle()
              }}
            >
              <i class="bx bx-home-circle" />
              <span>{props.t("dashboard")}</span>
            </Link>
          </li>

          <SideBarHelper
            t={props.t}
            accountingPermissions={accounting}
            storeVersion={props.storeVersion}
            storeType={storeType}
            singleStore={singleStore}
            permissions={permissions}
            serviceRoute={ADMIN_SERVICE_ROUTE}
            STORETYPES={props.STORETYPES}
            isBasicPlan={isBasicPlan}
            isDeliveryType={props.isDeliveryType}
            isPremiumPlan={isPremiumPlan}
            isMobile={props.isMobile}
            tToggle={props.tToggle}
            settings={props.settings}
          />
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
  storeVersion: Settings?.settings?.storeVersion,
})

export default connect(mapStateToProps)(withTranslation()(SidebarContent))
