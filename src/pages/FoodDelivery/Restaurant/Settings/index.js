import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, useParams } from "react-router-dom"
import { isObject } from "lodash"
import queryString from "query-string"
import { usePermissions } from "helpers/permissions"
import { useShowThings } from "helpers/show-things"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Alert,
  Spinner,
  Form,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

// Translation
import { withTranslation } from "react-i18next"

import {
  GET_SERVICE_NAME,
  ROLES,
  WEEK_NAMES,
  DEFAULT_STORE_TYPE,
  VENDOR_SETTINGS_FORM,
  SLUGS_NAME as slugname,
  SLUGS_NAME,
} from "helpers/contants"

import {
  getStoreSettings,
  getFdRestaurant,
  putFdRestaurantSettings,
  getMerchantAccount,
} from "store/actions"

// Other Settings
import Profile from "./Profile"
import BankDetails from "./BankDetails"
import General from "./General"
import TimeSlot from "./TimeSlot"
import Time from "./Time"
import DeliveryMode from "./DeliveryMode"
import Tax from "./Tax"
import Cuisine from "./Cuisines"
import Commission from "./Commission"
import Notifications from "./Notification"
import GeoFencing from "./GeoFencings"
import Seo from "./Seo"
import PaySplit from "./PaySplit"
import Automark from "./Profile/AutoMarkReady/Automark"
import OrderDeliverySettings from "./OrderDeliverySettings"
import DeliveryFee from "./DeliveryFee"
import Businesstype from "./Businesstype"
import AboutUs from "./AboutUs"

const mixBankFields = (template, fields) => {
  const _fields = []

  if (!template || !fields) return _fields

  template?.map(item => {
    const fieldsIndex = fields?.findIndex(field => field.key === item.key)

    if (fieldsIndex !== -1) {
      _fields.push(fields[fieldsIndex])
    } else {
      _fields.push(item)
    }
  })

  return _fields
}

const Settings = props => {
  const {
    accessLevel,
    role,
    onGetSettings,
    vendorId,
    fdRestaurant,
    onGetFdRestaurant,
    onPutFdRestaurantSettings,
    loading,
    error,
    success,
    activeStoreType: _activeStoreType,
    activeStoreId: _activeStoreId,
    storeDeliveryType,
    uploadingFile,
    currentPlan,
    settings,
  } = props
  const { id: _vendorIdParam } = useParams()
  const { vendor_name } = queryString.parse(props?.location?.search)
  const showThings = useShowThings()

  console.log(showThings, "_vendorIdParam_vendorIdParam")

  const didMountRef = useRef(null)

  const [activeStoreType, setactiveStoreType] = useState({})
  const [activeStoreId, setactiveStoreId] = useState(null)
  const [vendorIdParam, setvendorIdParam] = useState()
  const [accesses, setaccesses] = useState({
    canEdit: false,
  })
  const hasPermission = usePermissions(activeStoreType?.storeType)
  const [inputFields, setInputFields] = useState({
    time: [""],
    status: false,
  })
  const [fields, setFields] = useState({
    name: "",
    email: "",
    fname: "",
    lname: "",
    countryCode: "",
    mobileNumber: "",
    profileImage: null,
    bannerImage: null,
    bankFields: props.bankFields,
    password: "",
    address: "",
    lat: 0,
    lng: 0,
    status: "approved",
    pricePerPerson: 0,
    minOrderAmont: 0,
    orderPreparationTime: 0,
    deliveryType: [],
    timeSlot: [],
    cuisine: [],
    businessType: [],
    taxAmount: "",
    notificationSound: "",
    notifications: [],
    storeOrderAutoApproval: false,
    storeOrderAutoCancel: false,
    orderAutoApproval: false,
    orderAutoCancel: false,
    commisionType: "global",
    deliveryFeeType: "global",

    commission: {
      vendor: "",
      deliveryBoy: "",
    },
    deliveryTimeSlot: {
      status: false,
      startTime: "",
      endTime: "",
    },
    deliveryFee: {
      freeType: "percent",
      isFreeDelivery: true,
      value: 0,
    },
    weekendDayDeliveryTimeSlot: {
      saturdaySlot: {
        status: false,
        startTime: "",
        endTime: "",
      },
      sundaySlot: {
        status: false,
        startTime: "",
        endTime: "",
      },
    },
    seoSettings: {},
  })
  console.log(fields?.website, fields?.member, "bbcbcbcv")
  const [stateCommission, setStateCommission] = useState({
    commissionOnDeliveryType: {
      status: false,
      delivery: {
        vendor: "",
        deliveryBoy: "",
      },
      takeway: {
        vendor: "",
        deliveryBoy: "",
      },
    },
  })
  // useEffect(() => {
  //   setFields(pre => ({
  //     ...pre,
  //     commisionType: fields?.commission?.commisionType,
  //   }))
  // }, [fields?.commission])

  console.log(
    !["basic"].includes(currentPlan?.billingPlan?.type),
    VENDOR_SETTINGS_FORM[activeStoreType?.storeType],
    VENDOR_SETTINGS_FORM[activeStoreType?.storeType],
    DEFAULT_STORE_TYPE["VENDOR_SETTINGS_FORM"],
    "stateCommission"
  )
  const CommissionChangeStatus = field => value => {
    setStateCommission(prevState => ({
      ...prevState,
      commissionOnDeliveryType: {
        ...prevState.commissionOnDeliveryType,
        [field]: value,
      },
    }))
  }

  const CommissionChange = (e, objName) => {
    console.log("objName", objName)
    const { name, value } = e.target
    setStateCommission(pre => ({
      ...pre,
      commissionOnDeliveryType: {
        ...pre.commissionOnDeliveryType,
        [objName]: {
          ...pre.commissionOnDeliveryType[objName],
          [name]: value,
        },
      },
    }))
  }

  const handleDeliveryNestedChange = nestName => name => event => {
    const { value } = event.target

    setFields(prevState => ({
      ...prevState,
      ...(nestName == "multiStopsTripSettings" &&
        value == true && { isEnableCarPool: false }),
      [nestName]: { ...prevState[nestName], [name]: value },
    }))
  }
  useEffect(() => {
    setStateCommission({
      commissionOnDeliveryType: {
        delivery: {
          deliveryBoy:
            fdRestaurant?.commissionOnDeliveryType?.delivery?.deliveryBoy || 0,

          vendor: fdRestaurant?.commissionOnDeliveryType?.delivery?.vendor || 0,
        },

        status: fdRestaurant?.commissionOnDeliveryType?.status,
        takeway: {
          deliveryBoy:
            fdRestaurant?.commissionOnDeliveryType?.takeway?.deliveryBoy || 0,

          vendor: fdRestaurant?.commissionOnDeliveryType?.takeway?.vendor || 0,
        },
      },
    })
  }, [fdRestaurant])

  useEffect(() => {
    if (["basic"].includes(props.currentPlan?.billingPlan?.type)) {
      if (
        props.main_settings?.storeTypeEnabled &&
        props.main_settings.storeTypeEnabled[0]
      ) {
        setactiveStoreType(props.main_settings.storeTypeEnabled[0] || {})
        setactiveStoreId(props.main_settings.storeTypeEnabled[0]._id)
      }
    } else {
      setactiveStoreType(_activeStoreType)
      setactiveStoreId(_activeStoreId)
    }
  }, [props.main_settings, props.currentPlan, _activeStoreId])

  useEffect(() => {
    if (!accessLevel) {
      const data = {
        canEdit: true,
      }

      return setaccesses(data)
    }

    const data = {
      canEdit: false,
    }

    accessLevel?.map(item => {
      switch (item.label) {
        case "UPDATE":
          data.canEdit = item.value
          break
      }
    })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  const pay360status = props?.main_settings?.paymentSettings.filter(
    pay => pay?.payment_method === "pay360" && pay?.status === true
  )

  // console.log(pay360status, "isval");

  // console.log(props?.main_settings?.paymentSettings, "PPP")
  console.log(activeStoreType?.storeType, "bugs")
  useEffect(() => {
    const {
      pricePerPerson,
      minOrderAmont,
      orderPreparationTime,
      deliveryType,
      timeSlot,
      bankFields,
      aboutUs,
      website,
      member,
    } = fdRestaurant

    const _bankFields = mixBankFields(props.bankFields, bankFields)

    let timeslots = timeSlot

    if (!!timeSlot && timeSlot.length <= 0) {
      timeslots = WEEK_NAMES?.map((_, index) => ({
        day: index,
        dayStatus: "no",
        endTime: "22:00",
        startTime: "09:00",
      }))
    }


    setFields({
      bankFields: _bankFields || [],
      pricePerPerson: pricePerPerson || 0,
      minOrderAmont: minOrderAmont || 0,
      aboutUs: aboutUs || "",
      website: website || "",
      member: member || "",
      orderPreparationTime: orderPreparationTime || 0,
      deliveryType: deliveryType || [],
      isVendorAvailable: fdRestaurant.isVendorAvailable,
      timeSlot: timeslots,
      geoFence: fdRestaurant.geoFence,
      name: fdRestaurant.name || "",
      email: fdRestaurant.email || "",
      countryCode: fdRestaurant.countryCode || "",
      mobileNumber: fdRestaurant.mobileNumber || "",
      profileImage: fdRestaurant.profileImage || null,
      bannerImage: fdRestaurant.bannerImage || null,
      address: fdRestaurant.address || "",
      lat: fdRestaurant?.userLocation?.coordinates[1],
      lng: fdRestaurant?.userLocation?.coordinates[0],
      status: fdRestaurant.status || "approved",
      taxAmount: fdRestaurant.taxAmount || "",
      notificationSound: fdRestaurant.notificationSound,
      notifications: fdRestaurant.notifications || [],
      orderAutoApproval: fdRestaurant.orderAutoApproval,
      orderAutoCancel: fdRestaurant.orderAutoCancel,
      storeOrderAutoApproval: fdRestaurant.storeOrderAutoApproval,
      storeOrderAutoCancel: fdRestaurant.storeOrderAutoCancel,
      commisionType: fdRestaurant.commisionType || "global",
      deliveryFeeType: fdRestaurant.deliveryFeeType || "global",
      commission: fdRestaurant.commission,
      seoSettings: fdRestaurant.seoSettings,
      pay360Split: fdRestaurant.pay360Split || {},
      deliveryTimeSlot: fdRestaurant?.deliveryTimeSlot,
      deliveryFee: fdRestaurant?.deliveryFee,
      weekendDayDeliveryTimeSlot:
        fdRestaurant?.weekendDayDeliveryTimeSlot || {},
    })

    setInputFields(prev => ({
      ...prev,
      status: fdRestaurant?.markReadySetting?.status,
      time: fdRestaurant?.markReadySetting?.time.map(item => item) || [],
    }))

    if (fdRestaurant.cuisines) {
      setFields(prevState => ({
        ...prevState,
        cuisines: fdRestaurant?.cuisines
          ?.filter(item => isObject(item))
          .map(item => ({
            label: item?.name,
            value: item?._id,
          })),
      }))
    }
    if (fdRestaurant?.businessType) {
      setFields(prevState => ({
        ...prevState,
        businessType: fdRestaurant?.businessType
          ?.filter(item => isObject(item))
          .map(item => ({
            label: item?.name,
            value: item?._id,
          })),
      }))
    }

    if (fdRestaurant.geoFence) {
      setFields(prevState => ({
        ...prevState,
        geoFence: fdRestaurant?.geoFence
          ?.filter(item => isObject(item))
          .map(item => ({ label: item.label, value: item._id })),
      }))
    }

    setOrderDeliveryFields(prev => ({
      ...prev,
      orderDeliverySettings: {
        multiOrderAcceptance: {
          status:
            fdRestaurant?.orderDeliverySettings?.multiOrderAcceptance?.status,
          acceptedOrderCount:
            fdRestaurant?.orderDeliverySettings?.multiOrderAcceptance
              ?.acceptedOrderCount,
        },
      },
    }))
  }, [JSON.stringify(fdRestaurant), props.bankFields])

  useEffect(() => {
    getRestaurantDetails()
  }, [role, vendorId, _vendorIdParam, activeStoreId])

  const getRestaurantDetails = () => {
    let vendor = ""

    if ([ROLES.admin, ROLES.staff].includes(role)) {
      vendor =
        activeStoreType?.storeVendorType === "SINGLE"
          ? activeStoreType?.singleVendorId
          : _vendorIdParam
    } else if (role === ROLES.vendor || role === ROLES.subVendor) {
      vendor = vendorId
    }

    setvendorIdParam(vendor)

    if (!activeStoreId) return

    switch (role) {
      case ROLES.admin:
      case ROLES.staff:
      case ROLES.vendor:
        onGetFdRestaurant(activeStoreId, vendor)
        break
      case ROLES.subVendor:
        onGetFdRestaurant(activeStoreId, vendor)
        break

      default:
        console.log("No role found")
        break
    }
  }
  const getBankAccount = () => {
    if (_vendorIdParam) {
      props?.ongetMerchantAccount(_vendorIdParam)
    } else {
      props?.ongetMerchantAccount()
    }

    setTimeout(() => {
      getRestaurantDetails()
    }, 2000)
  }
  const handleChange = name => event => {
    const { value } = event.target
    console.log(value, "nibbi2")

    setFields(prevState => ({ ...prevState, [name]: value }))
  }

  const handleCommissionChange = nestName => name => event => {
    const { value } = event.target
    console.log(nestName, name, value, "gucci")

    setFields(prevState => ({
      ...prevState,
      ...(nestName == "multiStopsTripSettings" &&
        value == true && { isEnableCarPool: false }),
      [nestName]: { ...prevState[nestName], [name]: value },
      [name]: value,
    }))
  }
  const handleNestedChange = name => event => {
    const { value } = event?.target

    console.log(name, value, "NESTED")
    setFields(prev => ({
      ...prev,
      deliveryTimeSlot: { ...prev.deliveryTimeSlot, [name]: value },
    }))
  }

  const handleWeekendDayDeliveryTimeSlot = (child, name) => event => {
    const { value } = event?.target

    setFields(prev => ({
      ...prev,
      weekendDayDeliveryTimeSlot: {
        ...prev.weekendDayDeliveryTimeSlot,
        [child]: {
          ...prev.weekendDayDeliveryTimeSlot[child],
          [name]: value,
        },
      },
    }))
  }

  const handleSeoChange = name => event => {
    setFields(prevState => ({
      ...prevState,
      seoSettings: { ...prevState.seoSettings, [name]: event.target.value },
    }))
  }

  function onSubmit(e) {
    e.preventDefault()
    const newData = JSON.parse(JSON.stringify(stateCommission))

    if (!accesses.canEdit) return
    let vendor = ""

    if ([ROLES.admin, ROLES.staff].includes(role)) {
      vendor =
        activeStoreType?.storeVendorType === "SINGLE"
          ? activeStoreType?.singleVendorId
          : _vendorIdParam
    } else if (role === ROLES.vendor || role === ROLES.subVendor) {
      vendor = vendorId
    }

    const { cuisines, businessType, geoFence, ...data } = fields

    if (orderDeliveryFields.orderDeliverySettings) {
      data.orderDeliverySettings = orderDeliveryFields?.orderDeliverySettings
    }

    if (cuisines) {
      data.cuisines = cuisines?.map(item => item.value)
    }
    if (businessType) {
      data.businessType = businessType?.map(item => item.value)
    }

    if (geoFence) {
      data.geoFence = geoFence?.map(item => item.value)
    }

    if (!activeStoreType?.storeType?.toLowerCase()) return

    switch (role) {
      case ROLES.admin:
      case ROLES.staff:
      case ROLES.vendor:
      case ROLES.subVendor:
        onPutFdRestaurantSettings(activeStoreType?.storeType?.toLowerCase(), {
          vendor,
          storeTypeId: activeStoreId,
          ...data,
          markReadySetting: inputFields,
          commissionOnDeliveryType: newData.commissionOnDeliveryType,
        })
        break

      default:
        console.log("No role found")
        break
    }
  }

  const pageHeader =
    [slugname.dewe, slugname.lemonee, slugname.zaza].includes(props?.slug) ||
      ["LIQUOR"].includes(activeStoreType?.storeType)
      ? props.t("store")
      : GET_SERVICE_NAME({
        storeType: activeStoreType?.storeType,
      })

  let isDeliveryTimeSlotEnabled =
    fdRestaurant?.storeType?.[0]?.isEnableDeliveryTimeSlot

  console.log(isDeliveryTimeSlotEnabled, "fdRestaurant")

  // Time Ready

  console.log("inputFields=======>", inputFields)

  const handleTimeReady = (event, index, type) => {
    const { value, name } = event.target

    if (type == "selector") {
      setInputFields(pre => ({
        ...pre,
        time: [
          ...pre.time.slice(0, index),
          parseInt(value),
          ...pre.time.slice(index + 1),
        ],
      }))
    } else {
      setInputFields(pre => ({ ...pre, [name]: value }))
    }
  }

  const handleAddField = () => {
    setInputFields(pre => ({
      ...pre,
      time: [...pre.time, ""],
    }))
  }

  const handleRemoveField = index => {
    setInputFields(pre => ({
      ...pre,
      time: pre.time.filter((d, indx) => indx !== index),
    }))
  }

  const handleStoreSwitch = value => {
    setInputFields(prev => ({ ...prev, status: value }))
  }

  // OrderDeliverySetting

  const [orderDeliveryFields, setOrderDeliveryFields] = useState({
    orderDeliverySettings: {
      multiOrderAcceptance: {
        status: false,
        acceptedOrderCount: "",
      },
    },
  })

  const handleOrderSetting = () => {
    setOrderDeliveryFields(prevState => ({
      ...prevState,
      orderDeliverySettings: {
        multiOrderAcceptance: {
          ...prevState.orderDeliverySettings.multiOrderAcceptance,
          status: !prevState.orderDeliverySettings.multiOrderAcceptance.status,
        },
      },
    }))
  }

  const handleOrderCountChange = e => {
    const newCount = e.target.value
    setOrderDeliveryFields(prevState => ({
      ...prevState,
      orderDeliverySettings: {
        multiOrderAcceptance: {
          ...prevState.orderDeliverySettings.multiOrderAcceptance,
          acceptedOrderCount: newCount,
        },
      },
    }))
  }

  return (
    <div className={`page-content ${props?.custom ? "pt-0" : ""}`}>
      <Container fluid>
        <Form onSubmit={onSubmit} disabled={uploadingFile || loading}>
          <Row>
            <Col lg={1} xl={2} className="d-xs-none d-sm-block"></Col>

            <Col lg={10} xl={8}>
              <Breadcrumbs
                title="Settings"
                breadcrumbItem="Settings"
                breadcrumbItems={
                  ["basic"].includes(props.currentPlan?.billingPlan?.type)
                    ? []
                    : [
                      ...(activeStoreType?.storeVendorType !== "SINGLE" &&
                        props?.role !== ROLES.vendor
                        ? [
                          {
                            title: pageHeader + "s",
                            link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                              {
                                storeType: activeStoreType?.storeType,
                              }
                            ).toLowerCase()}s`,
                          },
                        ]
                        : []),
                      {
                        title:
                          (props?.role === ROLES.vendor
                            ? props.vendor_name
                            : vendor_name) || props.t("profile"),
                        link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                          {
                            storeType: activeStoreType?.storeType,
                          }
                        ).toLowerCase()}s/${props?.role === ROLES.vendor
                            ? props?.vendorId
                            : vendorIdParam
                          }/profile`,
                      },
                      {
                        title: props.t("settings"),
                      },
                    ]
                }
              />
            </Col>

            <Col lg={1} xl={2} className="d-xs-none d-sm-block"></Col>
          </Row>

          <Row>
            <Col lg={1} xl={2} className="d-xs-none d-sm-block"></Col>

            <Col lg={10} xl={8}>
              <Card>
                <CardBody className="spinner-content">
                  {error && typeof error === "string" ? (
                    <Alert color="danger">{error}</Alert>
                  ) : null}
                  {success && typeof success === "string" ? (
                    <Alert color="success">{success}</Alert>
                  ) : null}

                  {loading && <div className="spinner"></div>}

                  <Profile
                    activeStoreType={activeStoreType}
                    fields={fields}
                    setFields={setFields}
                    accesses={accesses}
                    t={props.t}
                    isBasic={["basic"].includes(currentPlan?.billingPlan?.type)}
                    hideRestaurantName={
                      [slugname.dewe, slugname.lemonee, slugname.zaza].includes(
                        props?.slug
                      ) || ["LIQUOR"].includes(activeStoreType.storeType)
                    }
                  //  hideRestaurantName -> to replace restaurant with store in description
                  />

                  <hr className="my-3" />


                  <BankDetails
                    _id={fdRestaurant?._id}
                    bankFields={fields?.bankFields}
                    handleChange={handleChange}
                    commissionTransfer={fdRestaurant?.commissionTransfer}
                    stripeConnect={fdRestaurant?.stripeConnect}
                    t={props.t}
                    getRestaurantDetails={getRestaurantDetails}
                  />

                  <hr className="my-3" />

                  <PaySplit
                    pay360Split={fields?.pay360Split}
                    t={props.t}
                    handleChange={handleChange}
                    setFields={setFields}
                    getBankAccount={getBankAccount}
                  />
                  <hr className="my-3" />


                  <General
                    minOrderAmont={fields?.minOrderAmont}
                    pricePerPerson={fields?.pricePerPerson}
                    handleChange={handleChange}
                    storeType={activeStoreType?.storeType}
                    t={props.t}
                    orderAutoApproval={fields?.orderAutoApproval}
                    orderAutoCancel={fields?.orderAutoCancel}
                    storeOrderAutoApproval={
                      fields?.storeOrderAutoApproval
                    }
                    storeOrderAutoCancel={fields?.storeOrderAutoCancel}
                  />

                  <hr className="my-3" />

                  <TimeSlot
                    fields={{
                      isVendorAvailable: fields?.isVendorAvailable,
                    }}
                    timeSlot={fields?.timeSlot || []}
                    handleChange={handleChange}
                    t={props.t}
                    hideRestaurantName={
                      [
                        slugname.dewe,
                        slugname.lemonee,
                        slugname.zaza,
                      ].includes(props?.slug) ||
                      ["LIQUOR"].includes(activeStoreType.storeType)
                    }
                  />

                  <hr className="my-3" />

                  <Time
                    activeStoreType={activeStoreType}
                    orderPreparationTime={
                      fields?.orderPreparationTime || 0
                    }
                    handleChange={handleChange("orderPreparationTime")}
                    t={props.t}
                  />

                  <hr className="my-3" />
                  <br />

                  <DeliveryMode
                    storeDeliveryType={storeDeliveryType}
                    activeStoreType={activeStoreType}
                    deliveryType={fields?.deliveryType || []}
                    handleChange={handleChange("deliveryType")}
                    t={props.t}
                    isDeliveryTimeSlotEnabled={isDeliveryTimeSlotEnabled}
                    fields={fields?.deliveryTimeSlot}
                    handleNestedChange={handleNestedChange}
                    weekendDayDeliveryTimeSlotFields={
                      fields?.weekendDayDeliveryTimeSlot
                    }
                    handleWeekendDayDeliveryTimeSlot={
                      handleWeekendDayDeliveryTimeSlot
                    }
                  />

                  <hr className="my-3" />

                  <OrderDeliverySettings
                    handleChange={handleOrderSetting}
                    handleOrderCountChange={handleOrderCountChange}
                    orderDeliveryFields={orderDeliveryFields}
                    t={props.t}
                  />

                  <hr className="my-3" />

                  <Tax
                    taxAmount={fields?.taxAmount}
                    handleChange={handleChange("taxAmount")}
                    t={props.t}
                  />

                  <hr className="my-3" />

                  <Cuisine
                    activeStoreId={activeStoreId}
                    cuisines={fields?.cuisines || []}
                    handleChange={handleChange("cuisines")}
                    storeType={activeStoreType?.storeType?.toLowerCase()}
                    t={props.t}
                    pageHeader={pageHeader}
                  />

                  <hr className="my-3" />

                  <Businesstype
                    activeStoreId={activeStoreId}
                    cuisines={fields?.businessType || []}
                    handleChange={handleChange("businessType")}
                    storeType={activeStoreType?.storeType?.toLowerCase()}
                    t={props.t}
                    pageHeader={pageHeader}
                  />

                  <hr className="my-3" />

                  <Commission
                    activeStoreType={activeStoreType}
                    fields={{
                      commisionType: fields?.commisionType || "global",
                      ...(fields?.commission || {
                        vendor: "",
                        deliveryBoy: "",
                      }),
                    }}
                    handleChange={handleCommissionChange("commission")}
                    t={props.t}
                    hideRestaurantName={
                      [
                        slugname.dewe,
                        slugname.zaza,
                        slugname.lemonee,
                      ].includes(props?.slug) ||
                      ["LIQUOR"].includes(activeStoreType?.storeType)
                    }
                    CommissionChange={CommissionChange}
                    stateCommission={stateCommission}
                    CommissionChangeStatus={CommissionChangeStatus}
                    settings={settings}
                  />

                  <hr className="my-3" />

                  <DeliveryFee
                    activeStoreType={activeStoreType}
                    fields={{
                      deliveryFeeType: fields.deliveryFeeType || "global",
                      ...(fields?.commission || {
                        vendor: "",
                        deliveryBoy: "",
                      }),
                    }}
                    handleChange={handleDeliveryNestedChange(
                      "deliveryFee"
                    )}
                    handleChangeNested={handleChange}
                    t={props.t}
                    hideRestaurantName={
                      [
                        slugname.dewe,
                        slugname.zaza,
                        slugname.lemonee,
                      ].includes(props?.slug) ||
                      ["LIQUOR"].includes(activeStoreType?.storeType)
                    }
                    CommissionChange={CommissionChange}
                    stateCommission={stateCommission}
                    deliveryFee={fields?.deliveryFee}
                    CommissionChangeStatus={CommissionChangeStatus}
                    settings={settings}
                  />

                  <hr className="my-3" />


                  <Notifications
                    fields={fields}
                    handleChange={handleChange}
                    t={props.t}
                  />
                  <hr className="my-3" />

                  <GeoFencing
                    geoFence={fields?.geoFence || []}
                    handleChange={handleChange("geoFence")}
                    t={props.t}
                  />

                  <hr className="my-3" />

                  <Seo
                    fields={fields}
                    handleSeoChange={handleSeoChange}
                    t={props.t}
                  />

                  <hr className="my-3" />


                  <AboutUs
                    fields={fields}
                    handleChange={handleChange}
                    t={props.t}
                  />

                  <Row>
                    <Col className="d-flex justify-content-end">
                      {(loading || uploadingFile) && (
                        <Spinner color="primary" className="mr-2" />
                      )}

                      {accesses.canEdit &&
                        hasPermission("STORE.storeTypeSetting.UPDATE") && (
                          <Button
                            disabled={uploadingFile || loading}
                            color="success"
                            className="btn-rounded waves-effect waves-light mb-2 mr-2"
                            type="submit"
                          >
                            {props.t("save_changes")}
                          </Button>
                        )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col lg={1} xl={2} className="d-xs-none d-sm-block"></Col>
          </Row>
        </Form>
      </Container>
    </div>
  )
}

Settings.propTypes = {
  role: PropTypes.string,
  vendorId: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onGetFdRestaurant: PropTypes.func,
  onPutFdRestaurantSettings: PropTypes.func,
}

const mapStateToProps = ({
  File,
  Settings,
  Login,
  FD_Restaurants,
  FD_Settings,
  Billing,
}) => ({
  storeDeliveryType: FD_Restaurants?.fdRestaurant?.storeTypeDeliveryType || [],
  bankFields: Settings?.settings?.bankFields || [],
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "",
  vendor_name: Login?.user?.name,
  loading: FD_Restaurants.loading,
  fdRestaurant: FD_Restaurants.fdRestaurant,
  error: FD_Restaurants.error,
  success: FD_Restaurants.success,
  uploadingFile: File.loading,
  main_settings: Settings.settings,
  currentPlan: Billing.currentPlan,
  slug: Settings?.settings?.slug,
  settings: Settings.settings,

  hideThings: Settings.settings?.hideThings,
})

const mapDispatchToProps = dispatch => ({
  onGetSettings: (storeType, id) => dispatch(getStoreSettings(storeType, id)),
  onGetFdRestaurant: (storeType, data) =>
    dispatch(getFdRestaurant(storeType, data)),
  onPutFdRestaurantSettings: (storeType, data) =>
    dispatch(putFdRestaurantSettings(storeType, data)),
  ongetMerchantAccount: id => dispatch(getMerchantAccount(id)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Settings))
)
