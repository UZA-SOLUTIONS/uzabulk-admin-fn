import React from "react"
import { connect } from "react-redux"

// MetisMenu
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

import {
  GET_SERVICE_NAME,
  BASIC_ADMIN_SERVICE_ROUTE_PART1,
  BASIC_ADMIN_SERVICE_ROUTE_PART2,
  SERVICE_ICON,
  ADMIN_BASIC_SUB_SERVICES_ROUTE,
  isProductBatchEnabled,
} from "helpers/contants"

const SideBarHelper = ({
  store,
  linkTo,
  isWave = true,
  serviceRoute,
  ...props
}) => {
  console.warn("serviceRoute", serviceRoute);
  /* Service Routes defined on contants file */
  return Object.values(serviceRoute)
    ?.filter(item => {
      let filter = item
        // !item?.isNotRequired &&
        // (store?.storeVendorType === "SINGLE" ? true : !item.onlyVendor) &&

        if (item.onlyForStore &&
            !item.onlyForStore.includes(store?.storeType?.toUpperCase())
        ) {
          filter = false
        }

     
      const hide = props.settings?.hideThings?.filter(
        hidething => hidething.value === true
      )

      
      let hidething = []

      hide.map(obj => {
        hidething.push(obj.type)
      })


      if (
        item.key === "geofencing" && !hidething.includes("isGeofence")   )  
      {
        filter = false
      }
      

      
      if (
        (item.key === "app-settings" ||
          item.key === "app-settings/:contentPageId/sections") &&
        !hidething.includes("isAppSettings")
      ) {
        filter = false
      }

      if (item.key === "gallery" && !hidething.includes("isGallery")) {
        filter = false
      }

      if (item.key === "promotions" && !hidething.includes("isPromotions")) {
        filter = false
      }

      if (
        item.key === "product-batch" &&
        !isProductBatchEnabled(props.settings)
      ) {
        filter = false
      }

      if (
        ["campaigns", "campaign-templates", "marketing"].includes(item.key) &&
        !hidething.includes("isMarketing")
      ) {
        filter = false
      }

      if (item.key === "dispute" && !hidething.includes("isDispute")) {
        filter = false
      }

      if (
        item.key === "bird-eye-view" &&
        !hidething.includes("isBirdEyeView")
      ) {
        filter = false
      }

      if (
        [
          "document-templates",
          "document-templates/:templateId/fields",
        ].includes(item.key) &&
        !hidething.includes("isDocumentTemplates")
      ) {
        filter = false
      }

      if (
        item.key === "email-templates" &&
        !hidething.includes("isEmailTemplates")
      ) {
        filter = false
      }

      if (
        ["content-pages", "content-pages/:contentPageId/sections"].includes(
          item.key
        ) &&
        !hidething.includes("isContentPages")
      ) {
        filter = false
      }

      if (item.key === "faqs" && !hidething.includes("isFaq")) {
        filter = false
      }

      if (item.key === "terminology" && !hidething.includes("isTerminology")) {
        filter = false
      }

      if (
        item.key === "theme-settings" &&
        !hidething.includes("isThemeSettings")
      ) {
        filter = false
      }

      if (
        ["system-access", "sub-admins", "roles"].includes(item.key) &&
        !hidething.includes("isSystemAccess")
      ) {
        filter = false
      }

      if (
        [
          "reports",
          "reports/orders",
          "reports/bookings",
          "reports/users",
        ].includes(item.key) &&
        !hidething.includes("isReports")
      ) {
        filter = false
      }

      if (
        ["dispatcher", "dispatcher/listing", "dispatcher/mapView"].includes(
          item.key
        ) &&
        !hidething.includes("isDispatcher")
      ) {
        filter = false
      }

      if (
        ["menus", "menus/:menuId/sections"].includes(item.key) &&
        !hidething.includes("isWebsiteMenu")
      ) {
        filter = false
      }

      return filter
    })
    ?.map((item, index) => {

      /* Side menu for sub items (Like Configurations) */
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
                store,
                linkTo,
                isWave: false,
                serviceRoute: item.subItems,
              })}
            </ul>
          </li>
        )
      }
      // console.log(item.title, "IIUYTR");
      // console.log(store,"STORE");

      let title = item.title
      let link = `/${item?.key}`
      let icon = item?.icon
      

      /* Prefix link if needed (Like Store Type Routes (food/ or grocery/)) */
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
      
      /* Dynamic Menu Title & Link */
      if (item?.isDynamic) {
      const name = GET_SERVICE_NAME({
          storeType: store?.storeType,
          name: item.key,
          label: store?.label,
        })
      

        link = `${linkTo ? linkTo : ""}/${name?.toLowerCase()}s`
        title = name + "s"

        /* For single vendors remove listing (My Restaurant or Vendor name) */
        if (
          store?.storeVendorType === "SINGLE" &&
          (item.key === "vendor" || item.key === "restaurant")
        ) {
          // title = "My " + name
          title = store?.singleVendoName || "My " + name
          

          /* Direct open Vendor profile Or Go to ad */
          if (!!store?.singleVendorId) {
            link += "/" + store?.singleVendorId + "/profile"
          } else {
            link += "/add"
          }
        }
      }

      /* Used to ignore side menu (Like if no vendor then He not able to access promo-codes/attribues etc...) */
      let ignore = false

      if (
        props?.isBasicPlan &&
        item.ignoreIfNoDelivery &&
        !props.isDeliveryType
      ) {
        ignore = true
      }

      if (item.onlyFor) {
        ignore = true

        /* Dynamic ignore no need menu (Like restaurant has add-on but grocery don't) */
        if (store.storeType == item.onlyFor) {
          ignore = false
        } else if (store.storeType !== "FOOD" && item.onlyFor === "VENDOR") {
          ignore = false
        }
      }

      /* Manage Routes & Menu only for single vendor */
      if (item.onlyVendor) {
        const name = GET_SERVICE_NAME({
          storeType: store.storeType,
          name: item.key,
          label: store?.label,
        })

        if (
          store?.storeVendorType === "SINGLE" &&
          [
            "transactions",
            "product",
            "promo-codes",
            "category",
            "add-on",
            "attributes",
          ].includes(item.key)
        ) {
          // title = "My " + name
          // title = store?.singleVendoName || "My " + name
          title = name

          if (!!store?.singleVendorId) {
            // link += "/" + store?.singleVendorId
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
          "vendor",
          "promo-codes",
          "transactions",
          "orders",
          "order",
          "trip",
          "trips",
          "requests",
        ].includes(item.key)
      ) {
        icon = SERVICE_ICON[item?.key]
      }

      if (item.notForVersion1 && props.storeVersion <= 1) {
        ignore = true
      }

      if (ignore) return <></>

      return (
        <>
          {/* {(props?.isBasicPlan || props?.isPremiumPlan) &&
            item.isBreakPoint &&
            props?.returnBreakPoint()} */}

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
        </>
      )
    })
}

const Basic = props => {
    const { storeType,isBasicPlan,isPremiumPlan,isUltimatePlan, settings } = props


  const breakPoint = () =>
    storeType.map(store => {
      {
        /* Store Type (food/grocery/etc...) */
      }
      const _storetype = props?.STORETYPES?.filter(
        element =>
          element?.storeType?.toLowerCase() === store?.storeType?.toLowerCase()
      )
      let icon = ""
      
      if (_storetype?.length > 0) {
        icon = _storetype[0]?.icon
      }
 
        return (
          <SideBarHelper
            t={props.t}
            storeVersion={props.storeVersion}
            store={store}
            serviceRoute={ADMIN_BASIC_SUB_SERVICES_ROUTE}
            linkTo={`/${store.storeType.toLowerCase()}`}
            isBasicPlan={isBasicPlan}
            isDeliveryType={props.isDeliveryType}
            isPremiumPlan={isPremiumPlan}
            isMobile={props.isMobile}
            tToggle={props.tToggle}
            settings={settings}
          />
        )
      }

      
    )

  return (
    <React.Fragment>

              <SideBarHelper
                t={props.t}
                storeVersion={props.storeVersion}
                store={storeType[0]}
                storeType={storeType}
                serviceRoute={BASIC_ADMIN_SERVICE_ROUTE_PART1}
                isBasicPlan={isBasicPlan}
                isPremiumPlan={isPremiumPlan}
                isDeliveryType={props.isDeliveryType}
                isMobile={props.isMobile}
                tToggle={props.tToggle}
                settings={settings}
              />

              {breakPoint()}

              <SideBarHelper
                t={props.t}
                storeVersion={props.storeVersion}
                store={storeType[0]}
                storeType={storeType}
                serviceRoute={BASIC_ADMIN_SERVICE_ROUTE_PART2}
                isBasicPlan={isBasicPlan}
                isPremiumPlan={isPremiumPlan}
                isDeliveryType={props.isDeliveryType}
                isMobile={props.isMobile}
                tToggle={props.tToggle}
                settings={settings}
              />
           
         
     
    </React.Fragment>
  )
}

// SidebarContent.propTypes = {
//   t: PropTypes.any,
//   storeType: PropTypes.array,
//   role: PropTypes.string,
// }

const mapStateToProps = ({ Settings }) => ({
  settings: Settings.settings,
})

export default connect(mapStateToProps)(withTranslation()(Basic))
