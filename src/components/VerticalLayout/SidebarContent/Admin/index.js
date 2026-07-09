import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

// MetisMenu
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
// import Vector from "../../../../../src/assets/images/vector.png"

import {
  GET_SERVICE_NAME,
  ADMIN_SERVICE_ROUTE,
  BASIC_ADMIN_SERVICE_ROUTE_PART1,
  BASIC_ADMIN_SERVICE_ROUTE_PART2,
  ADMIN_SUB_SERVICES_ROUTE,
  SERVICE_ICON,
} from "helpers/contants"

import { API_BASE_URL } from "helpers/api_helper"
import { SLUGS_NAME, isProductBatchEnabled } from "helpers/contants"

const SideBarHelper = ({
  store,
  linkTo,
  isWave = true,
  serviceRoute,
  // hideThings,
  ...props
}) => {
  /* Service Routes defined on contants file */
  console.log(store?.storeVendorType, "store?.storeVendorType")
  return Object.values(serviceRoute)
    ?.filter(item => {
      console.log(item, "ITEM")

      let filter =
        !item?.isNotRequired &&
        (store?.storeVendorType === "SINGLE" ? true : !item.onlyVendor) &&
        (props.isBasicPlan
          ? !item.notInBasicPlan || item.onlyInBasicPlan
          : !item.onlyInBasicPlan) &&
        (props.isPremiumPlan
          ? !item.notInPremiumPlan || item.onlyInPremiumPlan
          : props.isBasicPlan
            ? true
            : !item.onlyInPremiumPlan)

      // if ((item.forvthree) && (props.storeVersion > 2 ? item.forvthree === "false" : item.forvthree === "true")) {
      //   console.log(item, "!");
      //   filter = false
      // }

      //For hiding  attribute in menu in Grocery Profile for version greater than 2
      if (item.version && item.version.includes(props.storeVersion)) {
        filter = true
      }

      if (
        !!item?.isVthree &&
        (props.storeVersion > 2
          ? item.isVthree === "false"
          : item.isVthree === "true")
      ) {
        filter = false
      }
      if (props.isBasicPlan && props.settings.storeTypeEnabled[0].storeType) {
        const activesinglestore = props.settings.storeTypeEnabled[0].storeType

        if (
          (activesinglestore === "TAXI" ||
            activesinglestore === "SERVICEPROVIDER" ||
            activesinglestore === "PICKUPDROP") &&
          item.title === "store_setting"
        ) {
          item.title = "basic_setting"
        }
      }

      if (
        (item.notForStore &&
          item.notForStore.includes(store?.storeType?.toUpperCase())) ||
        (item.onlyForStore &&
          !item.onlyForStore.includes(store?.storeType?.toUpperCase()))
      ) {
        filter = false
      }

      if (
        [
          "settings/bankaccount",
          "settings/pay360merchant",
          "reviews",
          "user-order",
        ].includes(item.key)
      ) {
        //To Hide bank Account option in Configuration
        filter = false
      } // hide review tab

      // if (item.key === "category") {
      //   props.settings.slug == "main-v2" ? (store.storeType !== "FOOD" ? filter = false : "") : filter = false
      // }
      // if (item.key == "reports/drivers") {
      //   filter = false
      // }

      if (item.key == "accounting/settlement") {
        let showSettlement =
          props.settings?.hideThings?.filter(
            element => element.type === "issettelment" && element.value == true
          ).length > 0
        showSettlement ? (filter = true) : (filter = false)

        // console.log(showSettlement, filter, "showSettlement")
      }

      // wallet

      // oneTimeShop

      // if (SLUGS_NAME.oneTimeShop === props.settings.slug) {

      if (item.key == "accounting/wallet") {
        let showWallet =
          props.settings?.hideThings?.filter(
            element =>
              element.type === "usersWalletAccess" && element.value == true
          ).length > 0 && [SLUGS_NAME.oneTimeShop].includes(props.settings.slug)
        showWallet ? (filter = true) : (filter = false)

        // console.log(showWallet, filter, "showWallet")
      }
      //  }

      // wallel

      if (
        props.isBasicPlan &&
        item.key === "vehicle-types" &&
        store.storeType == "SERVICEPROVIDER"
      ) {
        filter = false
      }
      console.log(store.storeType, " store.storeType")
      if (
        props.isBasicPlan &&
        item.key === "drivers" &&
        // item.icon === "bx bx-user-circle",
        store.storeType === "CARRENTAL"
      ) {
        filter = false
      }

      if (
        item.key === "geofencing" &&
        !props.settings?.hideThings?.find(
          element => element.type === "isGeofence"
        )?.value
      ) {
        filter = false
      }
      if (
        item.key === "businessType" &&
        !props.settings?.hideThings?.find(
          element => element.type === "businessType"
        )?.value
      ) {
        filter = false
      }

      if (
        (item.key === "app-settings" ||
          item.key === "app-settings/:contentPageId/sections") &&
        !props.settings?.hideThings?.find(
          element => element.type === "isAppSettings"
        )?.value
      ) {
        filter = false
      }

      if (
        item.key === "gallery" &&
        !props.settings?.hideThings?.find(
          element => element.type === "isGallery"
        )?.value
      ) {
        filter = false
      }

      if (
        item.key === "promotions" &&
        !props.settings?.hideThings?.find(
          element => element.type === "isPromotions"
        )?.value
      ) {
        filter = false
      }

      if (item.key === "product-batch" && !isProductBatchEnabled(props.settings)) {
        filter = false
      }

      if (
        item.key === "promo-codes" &&
        [SLUGS_NAME.taxidi, SLUGS_NAME.kucher].includes(props.settings.slug)
      ) {
        filter = false
      }

      if (
        item.key === "vehicle-types" &&
        SLUGS_NAME.singleStore === props.settings.slug
      ) {
        filter = false
      }

      if (
        ["campaigns", "campaign-templates", "marketing"].includes(item.key) &&
        !props.settings?.hideThings?.find(
          element => element.type === "isMarketing"
        )?.value
      ) {
        filter = false
      }

      if (
        item.key === "dispute" &&
        !props.settings?.hideThings?.find(
          element => element.type === "isDispute"
        )?.value
      ) {
        filter = false
      }

      if (
        item.key === "bird-eye-view" &&
        !props.settings?.hideThings?.find(
          element => element.type === "isBirdEyeView"
        )?.value
      ) {
        filter = false
      }

      if (
        [
          "document-templates",
          "document-templates/:templateId/fields",
        ].includes(item.key) &&
        !props.settings?.hideThings?.find(
          element => element.type === "isDocumentTemplates"
        )?.value
      ) {
        filter = false
      }

      if (
        item.key === "email-templates" &&
        !props.settings?.hideThings?.find(
          element => element.type === "isEmailTemplates"
        )?.value
      ) {
        filter = false
      }

      if (
        ["content-pages", "content-pages/:contentPageId/sections"].includes(
          item.key
        ) &&
        !props.settings?.hideThings?.find(
          element => element.type === "isContentPages"
        )?.value
      ) {
        filter = false
      }

      if (
        item.key === "faqs" &&
        !props.settings?.hideThings?.find(element => element.type === "isFaq")
          ?.value
      ) {
        filter = false
      }

      if (
        item.key === "terminology" &&
        !props.settings?.hideThings?.find(
          element => element.type === "isTerminology"
        )?.value
      ) {
        filter = false
      }

      if (
        item.key === "theme-settings" &&
        !props.settings?.hideThings?.find(
          element => element.type === "isThemeSettings"
        )?.value
      ) {
        filter = false
      }

      if (
        ["system-access", "sub-admins", "roles"].includes(item.key) &&
        !props.settings?.hideThings?.find(
          element => element.type === "isSystemAccess"
        )?.value
      ) {
        filter = false
      }
      if (
        ["blog-tag", "blog", "blog-category", "blogs"].includes(item.key) &&
        !props.settings?.hideThings?.find(
          element => element.type === "showHideBlogs"
        )?.value
      ) {
        filter = false
      }

      if (
        ["service-provider"].includes(item.key) &&
        !props.settings?.hideThings?.find(
          element => element.type === "isSystemAccess"
        )?.value
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
        !props.settings?.hideThings?.find(
          element => element.type === "isReports"
        )?.value
      ) {
        filter = false
      }

      if (item.key == "cuisines" && props.settings.slug == "topup-fuel") {
        filter = false
      }

      if (
        ["dispatcher", "dispatcher/listing", "dispatcher/mapView"].includes(
          item.key
        ) &&
        !props.settings?.hideThings?.find(
          element => element.type === "isDispatcher"
        )?.value
      ) {
        filter = false
      }

      if (
        ["menus", "menus/:menuId/sections"].includes(item.key) &&
        !props.settings?.hideThings?.find(
          element => element.type === "isWebsiteMenu"
        )?.value
      ) {
        filter = false
      }

      if (
        item.key == "package-services" &&
        !props.settings?.hideThings?.find(
          element => element.type === "showHidePackage"
        )?.value
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
      // console.log(store, "STORE");

      let title = item.title
      let link = `/${item?.key}`
      let icon = item?.icon

      // let icon = SERVICE_ICON[item?.key]

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

        if (
          store?.storeType == "FOOD" &&
          item.key == "settings" &&
          SLUGS_NAME.zaza == props.settings.slug
        ) {
          title = "cannabis setting"
        }
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
          (item.key === "vendor" ||
            item.key === "restaurant" ||
            item.key === "provider")
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

      console.log(item, "ITEMITEm")

      const activestoreSlug = props.settings.slug

      if (activestoreSlug == "topup-fuel" && item.title == "restaurant") {
        title = "Provider"
      }

      if (
        [SLUGS_NAME.dewe, SLUGS_NAME.zaza, SLUGS_NAME.topup].includes(
          activestoreSlug
        ) &&
        item.title == "brand"
      ) {
        title = "categories"
      }

      if (
        [SLUGS_NAME.dewe, SLUGS_NAME.zaza].includes(activestoreSlug) &&
        item.title == "restaurant"
      ) {
        title = "store"
      }

      // if(((activestoreSlug == SLUGS_NAME.cannabis ))

      // SLUGS_NAME.dewe

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
        if (store?.storeType == item.onlyFor) {
          ignore = false
        } else if (store?.storeType !== "FOOD" && item.onlyFor === "VENDOR") {
          ignore = false
        }
      }

      /* Manage Routes & Menu only for single vendor */
      if (item.onlyVendor) {
        const name = GET_SERVICE_NAME({
          storeType: store?.storeType,
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
        item.key === "promotions" &&
        SLUGS_NAME.confiLogistics === props.settings.slug
      ) {
        title = "Promos"
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
          "restaurant",
          "requests",
        ].includes(item.key)
      ) {
        icon = SERVICE_ICON[item?.key]
      }

      if (item.notForVersion1 && props.storeVersion <= 1) {
        ignore = true
      }

      // if(item.)

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

const SidebarContent = props => {
  const { storeType, isBasicPlan, isPremiumPlan, isUltimate, settings } = props

  // console.log(props,"POIUYT");

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

      if (isBasicPlan || isPremiumPlan) {
        return (
          <SideBarHelper
            t={props.t}
            storeVersion={props.storeVersion}
            store={store}
            serviceRoute={ADMIN_SUB_SERVICES_ROUTE}
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
      return (
        <>
          <SideBarHelper
            t={props.t}
            storeVersion={props.storeVersion}
            store={store}
            serviceRoute={ADMIN_SUB_SERVICES_ROUTE}
            linkTo={`/${store.storeType.toLowerCase()}`}
            isBasicPlan={isBasicPlan}
            isDeliveryType={props.isDeliveryType}
            isPremiumPlan={isPremiumPlan}
            isMobile={props.isMobile}
            tToggle={props.tToggle}
            settings={settings}
          />


          {/* <li key={store._id}>
            <Link to="/#" className="has-arrow waves-effect">
              <img src={API_BASE_URL + icon} alt="" />
              <span className="text-capitalize">
                {props.settings.slug == SLUGS_NAME.zaza &&
                  (store?.label?.toLowerCase() || store.storeType.toLowerCase()) ==
                  "food"
                  ? props.t("cannabis")
                  : props.t(
                    `${store?.label?.toLowerCase() ||
                    store.storeType.toLowerCase()
                    }`
                  )}
              </span>
            </Link>

            <ul className="sub-menu" aria-expanded="false">
              {console.log("===>",
                props.t,
                props.storeVersion,
                store,
                ADMIN_SUB_SERVICES_ROUTE,
                `/${store.storeType.toLowerCase()}`,
                isBasicPlan,
                props.isDeliveryType,
                isPremiumPlan,
                props.isMobile,
                props.tToggle,
                settings
              )}
              <SideBarHelper
                t={props.t}
                storeVersion={props.storeVersion}
                store={store}
                serviceRoute={ADMIN_SUB_SERVICES_ROUTE}
                linkTo={`/${store.storeType.toLowerCase()}`}
                isBasicPlan={isBasicPlan}
                isDeliveryType={props.isDeliveryType}
                isPremiumPlan={isPremiumPlan}
                isMobile={props.isMobile}
                tToggle={props.tToggle}
                settings={settings}
              />
            </ul>
          </li> */}
        </>
      )
    })

  return (
    <React.Fragment>
      <div id="sidebar-menu" className="pt-0">
        <ul className="metismenu list-unstyled" id="side-menu">
          {settings?.hideThings?.find(
            element => element.type === "isGetStarted"
          )?.value && (
              <li>
                <Link
                  to={"/GetStarted"}
                  onClick={() => {
                    props.isMobile && props.tToggle && props.tToggle()
                  }}
                >
                  <i class="bx bx-church" />
                  <span>{props.t("get_started")}</span>
                </Link>
              </li>
            )}

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

          {isBasicPlan || isPremiumPlan ? (
            <>
              {/* SIngle STore  */}
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
            </>
          ) : (
            <>
              {/* Multi STore  */}
              <SideBarHelper
                t={props.t}
                storeVersion={props.storeVersion}
                store={storeType[0]}
                storeType={storeType}
                serviceRoute={ADMIN_SERVICE_ROUTE}
                isBasicPlan={isBasicPlan}
                isPremiumPlan={isPremiumPlan}
                isDeliveryType={props.isDeliveryType}
                isMobile={props.isMobile}
                tToggle={props.tToggle}
                settings={settings}
              />
              {breakPoint()}
            </>
          )}
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
  // hideThings: Settings.settings?.hideThings,
})

export default connect(mapStateToProps)(withTranslation()(SidebarContent))
