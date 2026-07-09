import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import queryString from "query-string"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

import {
  ROLES,
  GET_SERVICE_NAME,
  VENDOR_SERVICES_ROUTE,
  SIDEBAR_WHITELIST_ROUTE,
} from "helpers/contants"

import { toggleSidebarType } from "store/actions"

// import AdminContent from "./Admin/index2"
// import StaffContent from "./Staff"
// import VendorContent from "./Vendor"
import AdminContent from "./Admin"
import StaffContent from "./Staff"
import VendorContent from "./Vendor"
import SubVendorContent from "./SubVendor"

const SidebarContent = props => {
  const { user, storeType, role, accessLevel, vendorStoreType, currentPlan } =
    props

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const { vendor: queryHasVendor } = queryString.parse(
      props?.location?.search
    )
    let pathName = props.location.pathname
    const pathNameArr = pathName.split("/")
    pathName = pathNameArr.slice(0, 2).join("/")

    /* Manage pathname for storetype routes */
    let filterStoreType

    if (role === ROLES.vendor) {
      filterStoreType = vendorStoreType.filter(
        store => pathNameArr[1] === `${store?.storeType?.toLowerCase()}`
      )
    } else {
      filterStoreType = storeType.filter(
        store => pathNameArr[1] === `${store?.storeType?.toLowerCase()}`
      )
    }

    /* Store Type Details Object */
    if (filterStoreType?.length > 0) {
      const vendor_services = Object.values(VENDOR_SERVICES_ROUTE).map(
        element => element.key
      )

      // Manage vendor inner routes
      if (
        vendor_services?.includes(pathNameArr[2]) &&
        ([
          "orders",
          "promo-codes",
          "geofencing",
          "product",
          "category",
          "add-on",
        ].includes(pathNameArr[2])
          ? !!queryHasVendor
          : true)
      ) {
        let title =
          GET_SERVICE_NAME({
            storeType: filterStoreType[0]?.storeType,
          })?.toLowerCase() + "s"

        pathName += "/" + title
      } else {
        pathName = pathNameArr.slice(0, 3).join("/")
      }

      // Manage single vendor
      if (
        filterStoreType[0]?.storeVendorType === "SINGLE" ||
        role === ROLES.vendor
      ) {
        // Manage Store Type inner routes for SINGLE VENDOR
        if (["restaurants", "vendors"]?.includes(pathNameArr[2])) {
          if (!!filterStoreType[0]?.singleVendorId && role !== ROLES.vendor) {
            pathName += "/" + filterStoreType[0]?.singleVendorId + "/profile"
          } else if (role === ROLES.vendor) {
            pathName += "/" + user?._id + "/profile"
          } else {
            pathName += "/add"
          }
        }

        // Manage vendor inner routes for SINGLE VENDOR
        if (
          vendor_services?.includes(pathNameArr[2]) &&
          (pathNameArr[2] === "orders" ? !!queryHasVendor : true)
        ) {
          pathName = pathNameArr.slice(0, 3).join("/")
        }
      }
    }

    // Manage whitelist routes
    if (SIDEBAR_WHITELIST_ROUTE.includes(props.location.pathname)) {
      pathName = pathNameArr.slice(0, 3).join("/")
    }

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show")

        const parent3 = parent2.parentElement

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement
          if (parent4) {
            parent4.classList.add("mm-active")
          }
        }
      }
      return false
    }
    return false
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  function tToggle() {
    let isMobile2 = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    props.showSidebarF(!props.showSidebar, isMobile2)
  }

  if (ROLES.admin === role) {
    return (
      <AdminContent
        storeVersion={props.storeVersion}
        storeType={storeType}
        STORETYPES={props?.STORETYPES}
        isBasicPlan={currentPlan?.billingPlan?.type === "basic"}
        isPremiumPlan={currentPlan?.billingPlan?.type === "premium"}
        isUltimatePlan={currentPlan?.billingPlan?.type === "ultimate"}
        isDeliveryType={
          storeType[0] &&
          ["TAXI", "PICKUPDROP", "SERVICEPROVIDER"].includes(
            storeType[0].storeType
          )
            ? true
            : props?.vendor?.deliveryType?.includes("DELIVERY")
        }
        isMobile={isMobile}
        tToggle={tToggle}
      />
    )
  }

  if (ROLES.staff === role) {
    return (
      <StaffContent
        storeVersion={props.storeVersion}
        storeType={storeType}
        STORETYPES={props?.STORETYPES}
        accessLevel={accessLevel}
        isBasicPlan={currentPlan?.billingPlan?.type === "basic"}
        isPremiumPlan={currentPlan?.billingPlan?.type === "premium"}
        isDeliveryType={
          storeType[0] &&
          ["TAXI", "PICKUPDROP"].includes(storeType[0].storeType)
            ? true
            : props?.vendor?.deliveryType?.includes("DELIVERY")
        }
        isMobile={isMobile}
        tToggle={tToggle}
      />
    )
  }

  console.log("beggin 1", user)
  console.log("beggin 2", vendorStoreType)
  console.log("beggin 3", props?.STORETYPES)
  console.log("beggin 4", accessLevel)
  if (ROLES.vendor === role) {
    return (
      <VendorContent
        user={user}
        storeType={vendorStoreType}
        STORETYPES={props?.STORETYPES}
        isMobile={isMobile}
        tToggle={tToggle}
      />
    )
  }
  if (ROLES.subVendor === role) {
    return (
      <SubVendorContent
        user={user}
        // storeType={[
        //   {
        //     markReadySetting: {
        //       status: true,
        //       time: [1, 2, 2, 4],
        //     },
        //     status: "active",
        //     _id: "619376c0b2a795a3b1276001",
        //     storeType: "FOOD",
        //   },
        // ]}
        storeType={vendorStoreType}
        accessLevel={accessLevel?.permissions || []}
        STORETYPES={props?.STORETYPES}
        isMobile={isMobile}
        tToggle={tToggle}
      />
    )
  }

  return (
    <React.Fragment>
      <div id="sidebar-menu" className="pt-0">
        <ul className="metismenu list-unstyled" id="side-menu"></ul>
      </div>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  storeType: PropTypes.array,
  role: PropTypes.string,
}

const mapStateToProps = ({
  Layout,
  Login,
  Settings,
  Billing,
  FD_Restaurants,
}) => ({
  ...Layout,
  storeVersion: Settings?.settings?.storeVersion || 1,
  storeType: Settings?.settings?.storeTypeEnabled || [],
  STORETYPES: Settings?.settings?.STORETYPES || [],
  user: Login?.user,
  role: Login?.user?.role || "",
  accessLevel: Login?.user?.accessLevel,
  vendorStoreType: Login?.user?.storeType || [],
  currentPlan: Billing.currentPlan,
  vendor: FD_Restaurants.fdRestaurant,
})

export default withRouter(
  connect(mapStateToProps, { showSidebarF: toggleSidebarType })(
    withTranslation()(SidebarContent)
  )
)

// const subPermissions = [
//   {
//     type: "geofencing",
//     label: "Geofencing",
//     permissions: [
//       {
//         label: "VIEW",
//         value: true,
//       },
//       {
//         label: "CREATE",
//         value: false,
//       },
//       {
//         label: "UPDATE",
//         value: false,
//       },
//       {
//         label: "DELETE",
//         value: false,
//       },
//     ],
//   },
//   {
//     type: "reports",
//     label: "Reports",
//     permissions: [
//       {
//         label: "VIEW",
//         value: false,
//       },
//     ],
//   },
//   {
//     type: "notifications",
//     label: "Notification",
//     permissions: [
//       {
//         label: "PLACEORDER",
//         value: false,
//       },
//     ],
//   },
//   {
//     label: "Store Types",
//     type: "storetypes",
//     storeTypes: [
//       {
//         storeType: "FOOD",
//         navigation: [
//           {
//             type: "orders",
//             label: "Orders",
//             permissions: [
//               {
//                 label: "VIEW",
//                 value: true,
//               },
//               {
//                 label: "UPDATE",
//                 value: true,
//               },
//             ],
//           },
//           {
//             type: "product",
//             label: "Product",
//             permissions: [
//               {
//                 label: "VIEW",
//                 value: false,
//               },
//               {
//                 label: "CREATE",
//                 value: false,
//               },
//               {
//                 label: "UPDATE",
//                 value: false,
//               },
//               {
//                 label: "DELETE",
//                 value: false,
//               },
//             ],
//           },
//           {
//             type: "category",
//             label: "categories",
//             permissions: [
//               {
//                 label: "VIEW",
//                 value: true,
//               },
//               {
//                 label: "CREATE",
//                 value: true,
//               },
//               {
//                 label: "UPDATE",
//                 value: true,
//               },
//               {
//                 label: "DELETE",
//                 value: true,
//               },
//             ],
//           },
//           {
//             type: "addon",
//             label: "Addons",
//             permissions: [
//               {
//                 label: "VIEW",
//                 value: false,
//               },
//               {
//                 label: "CREATE",
//                 value: false,
//               },
//               {
//                 label: "UPDATE",
//                 value: false,
//               },
//               {
//                 label: "DELETE",
//                 value: false,
//               },
//             ],
//           },
//           {
//             type: "storeTypeSetting",
//             label: "Setting",
//             permissions: [
//               {
//                 label: "VIEW",
//                 value: false,
//               },
//               {
//                 label: "UPDATE",
//                 value: false,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         storeType: "GROCERY",
//         navigation: [
//           {
//             type: "orders",
//             label: "Orders",
//             permissions: [
//               {
//                 label: "VIEW",
//                 value: false,
//               },
//               {
//                 label: "UPDATE",
//                 value: false,
//               },
//             ],
//           },
//           {
//             type: "product",
//             label: "Product",
//             permissions: [
//               {
//                 label: "VIEW",
//                 value: false,
//               },
//               {
//                 label: "CREATE",
//                 value: false,
//               },
//               {
//                 label: "UPDATE",
//                 value: false,
//               },
//               {
//                 label: "DELETE",
//                 value: false,
//               },
//             ],
//           },
//           {
//             type: "category",
//             label: "Categories",
//             permissions: [
//               {
//                 label: "VIEW",
//                 value: false,
//               },
//               {
//                 label: "CREATE",
//                 value: false,
//               },
//               {
//                 label: "UPDATE",
//                 value: false,
//               },
//               {
//                 label: "DELETE",
//                 value: false,
//               },
//             ],
//           },
//           {
//             type: "attribute",
//             label: "Attributes",
//             permissions: [
//               {
//                 label: "VIEW",
//                 value: false,
//               },
//               {
//                 label: "CREATE",
//                 value: false,
//               },
//               {
//                 label: "UPDATE",
//                 value: false,
//               },
//               {
//                 label: "DELETE",
//                 value: false,
//               },
//             ],
//           },
//           {
//             type: "storeTypeSetting",
//             label: "Setting",
//             permissions: [
//               {
//                 label: "VIEW",
//                 value: false,
//               },
//               {
//                 label: "UPDATE",
//                 value: false,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ]
