import React from "react"
import { connect } from "react-redux"
import { map } from "lodash"

import { Row, Col } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

import PermissionCard from "../PermissionCard"

const viewHelper = (obj, permissions) => {
  let foundOne = false

  if (!["VIEW", "LIST", "view", "list"].includes(obj.label) && !obj?.value) {
    const _index = permissions?.findIndex(item =>
      ["VIEW", "LIST", "view", "list"].includes(item.label)
    )

    if (_index !== -1) {
      permissions = [
        ...permissions?.slice(0, _index),
        {
          ...permissions[_index],
          value: true,
        },
        ...permissions?.slice(_index + 1),
      ]
    }
  } else if (
    ["VIEW", "LIST", "view", "list"].includes(obj.label) &&
    obj?.value
  ) {
    for (let i = 0; i < permissions?.length; i++) {
      if (permissions[i]?.value === true) {
        foundOne = true
        break
      }
    }
  }

  return { foundOne, permissions }
}

const AccessHelper = props => {
  const { list, handleChange, activeStoreType } = props

  console.log(props?.Login?.user?.role, "hekekeke")
  return map(list, (item, index) => {
    /* Return for basic */
    if (
      ["basic"].includes(props.currentPlan?.billingPlan?.type) &&
      item.type == "cuisines"
    ) {
      return
    }

    if (
      ["basic"].includes(props.currentPlan?.billingPlan?.type) &&
      !props.isDeliveryType &&
      ["drivers", "birdEyeView", "docTemplate"].includes(item.type)
    ) {
      return
    }

    if (
      ["basic"].includes(props.currentPlan?.billingPlan?.type) &&
      ["restaurants", "vendors", "vendor", "restaurant"].includes(item.type)
    ) {
      item.label = props.t("delivery_settings")
      item.permissions = item.permissions?.filter(per =>
        ["VIEW", "UPDATE"].includes(per.label)
      )
    }

    if (
      ["basic", "premium"].includes(props.currentPlan?.billingPlan?.type) &&
      ["storeTypeSetting"].includes(item.type)
    ) {
      if (props.storeType && ["TAXI", "PICKUPDROP"].includes(props.storeType)) {
        item.label = props.t("trip_settings")
      } else {
        item.label = props.t("order_settings")
      }
    }

    if (item?.type === "storetypes") {
      return map(item?.storeTypes, (store, storeIndex) => {
        console.log(store?.storeType, "hfhfiuf")
        if (
          props?.Login?.user?.role == "VENDOR" &&
          store?.storeType !== activeStoreType?.storeType
        ) {
          return null
        }

        const _handleChange = navIndex => navItem => {
          const navigation = [
            ...item.storeTypes[storeIndex]?.navigation.slice(0, navIndex),
            navItem,
            ...item.storeTypes[storeIndex]?.navigation.slice(navIndex + 1),
          ]

          const storetype = [
            ...item.storeTypes?.slice(0, storeIndex),
            {
              ...item.storeTypes[storeIndex],
              navigation,
            },
            ...item.storeTypes?.slice(storeIndex + 1),
          ]

          handleChange &&
            handleChange(index)({ ...item, storeTypes: storetype })
        }

        const _store = props?.storeType?.filter(
          element =>
            element?.storeType?.toLowerCase() ===
            store?.storeType?.toLowerCase()
        )[0]

        return (
          <React.Fragment key={store?.type + "-" + storeIndex}>
            {!["basic", "premium"].includes(
              props.currentPlan?.billingPlan?.type
            ) &&
              props?.Login?.user?.role !== "VENDOR" && (
                <Col xs={12}>
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0 font-size-18">{`${props.t(
                      _store?.label || store?.storeType
                    )} ${props.t("permissions")}`}</h4>
                  </div>
                </Col>
              )}

            {AccessHelper({
              list: store?.navigation,
              storeType: store?.storeType,
              handleChange: _handleChange,
              currentPlan: props.currentPlan,
              t: props.t,
            })}
          </React.Fragment>
        )
      })
    }

    const _handleChange = (objIndex, obj) => {
      // console.log(index, objIndex, obj)
      let permissions = [
        ...item.permissions?.slice(0, objIndex),
        {
          label: obj?.label,
          value: !obj?.value,
        },
        ...item.permissions?.slice(objIndex + 1),
      ]

      const helper = viewHelper(obj, permissions)
      if (helper.foundOne) return

      handleChange &&
        handleChange(index)({ ...item, permissions: helper.permissions })
    }

    const _handleAllChange = value => {
      handleChange &&
        handleChange(index)({
          ...item,
          permissions: item?.permissions?.map(({ label }) => ({
            label,
            value,
          })),
        })
    }

    if (
      item?.type === "geofencing" &&
      !props.settings?.hideThings?.find(
        element => element.type === "isGeofence"
      )?.value
    ) {
      return <></>
    }

    if (
      item?.type === "gallery" &&
      !props.settings?.hideThings?.find(element => element.type === "isGallery")
        ?.value
    ) {
      return <></>
    }

    if (
      item?.type === "promotion" &&
      !props.settings?.hideThings?.find(
        element => element.type === "isPromotions"
      )?.value
    ) {
      return <></>
    }

    if (
      item?.type === "marketing" &&
      !props.settings?.hideThings?.find(
        element => element.type === "isMarketing"
      )?.value
    ) {
      return <></>
    }

    if (
      item?.type === "dispute" &&
      !props.settings?.hideThings?.find(element => element.type === "isDispute")
        ?.value
    ) {
      return <></>
    }

    if (
      item?.type === "birdEyeView" &&
      !props.settings?.hideThings?.find(
        element => element.type === "isBirdEyeView"
      )?.value
    ) {
      return <></>
    }

    if (
      item?.type === "docTemplate" &&
      !props.settings?.hideThings?.find(
        element => element.type === "isDocumentTemplates"
      )?.value
    ) {
      return <></>
    }

    if (
      item?.type === "emailTemplate" &&
      !props.settings?.hideThings?.find(
        element => element.type === "isEmailTemplates"
      )?.value
    ) {
      return <></>
    }

    if (
      item?.type === "contentPages" &&
      !props.settings?.hideThings?.find(
        element => element.type === "isContentPages"
      )?.value
    ) {
      return <></>
    }

    if (
      item?.type === "faq" &&
      !props.settings?.hideThings?.find(element => element.type === "isFaq")
        ?.value
    ) {
      return <></>
    }

    if (
      item?.type === "reports" &&
      !props.settings?.hideThings?.find(element => element.type === "isReports")
        ?.value
    ) {
      return <></>
    }

    if (
      item?.type === "dispatch" &&
      !props.settings?.hideThings?.find(
        element => element.type === "isDispatcher"
      )?.value
    ) {
      return <></>
    }

    return (
      <Col key={item?.type + "-" + index} xs={12} sm={6} md={4} lg={4}>
        <PermissionCard
          unique={Math.floor(Math.random() * Math.floor(9999))}
          type={item?.type}
          title={item?.label}
          permissions={item?.permissions || []}
          handleChange={_handleChange}
          handleAllChange={_handleAllChange}
        />
      </Col>
    )
  })
}

const mapStateToProps = ({ Settings, Login }) => ({
  Login: Login,
  settings: Settings.settings,
})

export default withTranslation()(connect(mapStateToProps)(AccessHelper))
