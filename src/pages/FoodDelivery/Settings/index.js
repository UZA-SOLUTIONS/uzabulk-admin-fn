import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import toastr from "toastr"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Alert,
  Spinner,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

import { isHideThingTrue, SLUGS_NAME } from "helpers/contants"

// Translations
import { withTranslation } from "react-i18next"

import { getStoreSettings, putStoreSettings } from "store/actions"

// Other Settings
import GeneralSettings from "./General"
import Time from "./Time"
import DeliveryMode from "./DeliveryMode"
import OrderSchedule from "./Schedule"
import DeliveryPlatform from "./DeliveryPlatform"
import RequestType from "./RequestType"
import FreeDelivery from "./FreeDelivery"
import DeliveryFee from "./DeliveryFee"
import TaxSettings from "./TaxSettings"
import Commission from "./Commission"
import CarPool from "./CarPool"
import OtpValidation from "./Otp"
import DriverTripFare from "./DriverTripFare"
import CancellationPolicy from "./CancellationPolicy"
import RideHailing from "./RideHailing"
import CityPricing from "./CityPricing"
import Seo from "./Seo"
import Bidding from "./Bidding/Bidding"
import EnabledDeliveryTimeSlot from "./EnabledDeliveryTimeSlot"
import HourlyTrip from "./HourlyTrip"
import MultiStopTrip from "./MultiStopTrip"
import FirstOrderDiscount from "./FirstOrderDiscount"

import {
  DEFAULT_STORE_TYPE,
  SLUGS_NAME as slugname,
  STORE_SETTINGS_FORM,
} from "helpers/contants"
import HideVendorInfo from "./HideVendorInfo"
import VeganFilterActive from "./VeganFilterActive"
import ReturnType from "./ReturnType"
import MultiDropSetting from "./MultidropSetting"
import GeoFencings from "./GeoFencings"
import PrePayment from "./PrePayment"
import { useShowThings } from "helpers/show-things"
import Automark from "./AutoMarkReady/Automark"
import OrderDeliverySettings from "./OrderDeliverySettings"
import { set } from "lodash"
import UserWallet from "./UserWallet"
import PaymentOptions from "./PaymentOptions"
import ChilRide from "./ChilRide"
import ExchangeRate from "./ExchangeRate"

// import Automark from "../Restaurant/Settings/Profile/AutoMarkReady/Automark"

const Settings = props => {
  const {
    accessLevel,
    activeStoreType: _activeStoreType,
    activeStoreId: _activeStoreId,
    onGetSettings,
    onPutSettings,
    loading,
    error,
    success,
    settings,
    uploadingFile,
    fdVehicles,
    cancellationPolicyOrderStatus,
    hideThings,
  } = props
  // console.log(props.main_settings.orderAutoCancel, "settingssettings");
  const [activeStoreType, setactiveStoreType] = useState({})
  const [inputFields, setInputFields] = useState({
    time: [""],
    status: false,
  })

  const [_STORE_SETTINGS_FORM, set_STORE_SETTINGS_FORM] = useState(
    (STORE_SETTINGS_FORM[_activeStoreType?.storeType]
      ? STORE_SETTINGS_FORM[_activeStoreType?.storeType]
      : DEFAULT_STORE_TYPE["STORE_SETTINGS_FORM"]) || {}
  )
  console.log(_STORE_SETTINGS_FORM, "_STORE_SETTINGS_FORM")
  const [activeStoreId, setactiveStoreId] = useState(null)
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [advancedTaxPrice, setAdvancedTaxPrice] = useState()

  // order delivery setting

  console.log("activeStoreType1111111158698", activeStoreType)

  const [orderDeliveryFields, setOrderDeliveryFields] = useState({
    orderDeliverySettings: {
      multiOrderAcceptance: {
        status: false,
        acceptedOrderCount: "",
      },
    },
  })

  const [fields, setFields] = useState({})
  const [isbasicplan, setisbasicplan] = useState(false)
  const [isDeliveryType, setisDeliveryType] = useState(false)
  const showThings = useShowThings()
  console.log(showThings, "showThings")

  // console.log(fields?.cancellationPolicy, "cancellation")
  const hasStatusTrue = fields?.cancellationPolicy?.some(
    item => item?.status === true
  )
  console.log(hasStatusTrue, "hasStatusTrue")
  useEffect(() => {
    setisbasicplan(props.currentPlan?.billingPlan?.type === "basic")
  }, [props.currentPlan])
  useEffect(() => {
    if (props?.vendor?.deliveryType?.length > 0) {
      setisDeliveryType(props.vendor.deliveryType.includes("DELIVERY"))
    } else {
      setisDeliveryType(true)
    }
  }, [props.vendor])
  console.log(fields?.childRideEnabled, "")
  const handleChildChange = name => event => {
    const { value } = event.target
    console.log("name22222222", name)

    setFields(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }
  useEffect(() => {
    if (["basic", "premium"].includes(props.currentPlan?.billingPlan?.type)) {
      if (
        props.main_settings?.storeTypeEnabled &&
        props.main_settings.storeTypeEnabled[0]
      ) {
        let __id = props.main_settings.storeTypeEnabled[0] || {}

        set_STORE_SETTINGS_FORM(
          (STORE_SETTINGS_FORM[__id?.storeType]
            ? STORE_SETTINGS_FORM[__id?.storeType]
            : DEFAULT_STORE_TYPE["STORE_SETTINGS_FORM"]) || {}
        )

        setactiveStoreType(__id)
        setactiveStoreId(props.main_settings.storeTypeEnabled[0]._id)
      }
    } else {
      set_STORE_SETTINGS_FORM(
        (STORE_SETTINGS_FORM[_activeStoreType?.storeType]
          ? STORE_SETTINGS_FORM[_activeStoreType?.storeType]
          : DEFAULT_STORE_TYPE["STORE_SETTINGS_FORM"]) || {}
      )
      setactiveStoreType(_activeStoreType)
      setactiveStoreId(_activeStoreId)
    }
  }, [props.main_settings, props.currentPlan, _activeStoreId])

  useEffect(() => {
    if (!accessLevel) {
      const data = {
        canAdd: true,
        canEdit: true,
      }

      return setaccesses(data)
    }

    const data = {
      canAdd: false,
      canEdit: false,
    }

    accessLevel?.map(item => {
      switch (item.label) {
        case "CREATE":
          data.canAdd = item.value
          break

        case "UPDATE":
          data.canEdit = item.value
          break
      }
    })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  useEffect(() => {
    if (!activeStoreType?.storeType?.toLowerCase()) return
    onGetSettings(activeStoreType?.storeType?.toLowerCase(), activeStoreId)
  }, [activeStoreId])

  console.log(fields?.userWalletDeduct, "userWalletDeduct")
  useEffect(() => {
    if (!hasStatusTrue) {
      // Update the status to false when hasStatus is false
      setFields(prevFields => ({
        ...prevFields,
        userWalletDeduct: {
          ...prevFields.userWalletDeduct,
          status: false,
        },
      }))
    }
  }, [hasStatusTrue])

  useEffect(() => {
    const {
      vehicleType,
      requestType,
      freeDeliverySettings,
      cancellationPolicy,
      isVeganFilterActive,
      hideVendorInfo,
      isEnableDeliveryTimeSlot,
      multiStopsTripSettings,
      hourlyTripSettings,
      ...rest
    } = settings
    // console.log(isVeganFilterActive, "isVeganFilterActive");
    console.log("settingsb", settings)
    setFields({
      ...rest,
      isAdvanceTaxSetting: settings?.isAdvanceTaxSetting,
      advanceTaxSettings: settings?.advanceTaxSettings || [
        {
          name: "",
          percentage: "",
        },
      ],
      hourlyTripSettings: hourlyTripSettings || {
        status: false,
        duration: [
          {
            hours: 0,
            unit: "miles",
            distance: 0,
          },
        ],
      },
      multiStopsTripSettings: settings?.multiStopsTripSettings || {
        status: false,
        maxStops: 0,
        waitingTime: 0,
      },
      userWalletDeduct: settings?.userWalletDeduct,
      paymentOptions: settings?.paymentOptions,
      requestType: settings?.requestType,
      isVeganFilterActive: isVeganFilterActive,
      isEnableDeliveryTimeSlot: isEnableDeliveryTimeSlot,
      hideVendorInfo: hideVendorInfo,
      vehicleType: vehicleType?.map(item => ({
        label: item?.name,
        value: item?._id,
      })),
      freeDeliverySettings:
        freeDeliverySettings?.range?.length > 0
          ? freeDeliverySettings
          : {
            status: false,
            range: {
              minOrderValue: "",
              maxOrderValue: "",
            },
          },

      cancellationPolicy:
        cancellationPolicy && cancellationPolicy.length > 0
          ? cancellationPolicy
          : cancellationPolicyOrderStatus.map(({ orderStatus }) => ({
            orderStatus,
            status: false,
            refundType: "",
            description: "",
          })),
      paymentSettings: settings?.paymentSettings,
      isEnableCarPool: settings?.isEnableCarPool,
      currency: settings?.currency || {
        symbol: "¥",
        code: "CNY",
        rate: 1,
      },
    })

    setInputFields(prev => ({
      ...prev,
      status: settings?.markReadySetting?.status,
      time: settings?.markReadySetting?.time.map(item => item) || [],
    }))

    if (settings?.geoFence) {
      setFields(prev => ({
        ...prev,
        geoFence: settings?.geoFence?.map(geo => ({
          label: geo?.label,
          value: geo?._id,
        })),
      }))
    }

    setOrderDeliveryFields(prev => ({
      ...prev,
      orderDeliverySettings: {
        multiOrderAcceptance: {
          status: settings?.orderDeliverySettings?.multiOrderAcceptance?.status,
          acceptedOrderCount:
            settings?.orderDeliverySettings?.multiOrderAcceptance
              ?.acceptedOrderCount,
        },
      },
    }))
  }, [settings])

  console.log("settings1111111", settings?.storeType == "FOOD")

  const handleChange = name => event => {
    const { value } = event.target
    console.log(value, "dhdhgh")
    setFields(prevState => ({
      ...prevState,
      ...(name == "isEnableCarPool" &&
        value == true && {
        multiStopsTripSettings: {
          ...prevState.multiStopsTripSettings,
          status: false,
        },
      }),
      [name]: value,
    }))

    // ["isEnableCarPool", "multiStopsTripSettings"].includes(name) && handleCarPoolingMultiDrop(name , val)
  }

  const handleToogleFilter = namefield => value => {
    // console.log(namefield, "-- >", value);
    setFields(pre => ({ ...pre, [namefield]: value }))
  }

  const handleRequestTypeChange = value => {
    setFields(prevState => ({
      ...prevState,
      requestType: value,
    }))
  }

  const handleSeoChange = name => event => {
    setFields(prevState => ({
      ...prevState,
      seoSettings: { ...prevState.seoSettings, [name]: event.target.value },
    }))
  }

  const handleNestedChange = nestName => name => event => {
    const { value } = event.target
    console.log(nestName, name, "NAME")

    setFields(prevState => ({
      ...prevState,
      ...(nestName == "multiStopsTripSettings" &&
        value == true && { isEnableCarPool: false }),
      [nestName]: { ...prevState[nestName], [name]: value },
    }))
  }

  const defaultBidStatus = {
    status: "true",
    percentage: 10,
  }

  const handlePrePayment = value => {
    setFields(pre => ({
      ...pre,
      paymentSettings: {
        isPrePayment: value,
      },
    }))
  }

  let showVendorInfo = isHideThingTrue(hideThings, "showHideVendorInfo")
  let showCarPool = isHideThingTrue(hideThings, "isTaxiPoolRide")
  console.log("Fields ", fields)

  const handleDynamicObjectArray =
    nestName =>
      (nName, name = null, ind = null) =>
        e => {
          let value = name == "unit" ? e.value : e.target.value

          setFields(prev => ({
            ...prev,
            [nestName]: {
              ...prev?.[nestName],
              ...([nName] == "status" && { status: value }),
              ...([nName] != "status" && {
                [nName]: [
                  ...prev?.[nestName]?.[nName]?.slice(0, ind),
                  { ...prev?.[nestName]?.[nName][ind], [name]: value },
                  ...prev?.[nestName]?.[nName]?.slice(ind + 1),
                ],
              }),
            },
          }))
        }
  const addHourlyType = () => {
    setFields(pre => ({
      ...pre,
      hourlyTripSettings: {
        ...pre.hourlyTripSettings,
        duration: [
          ...pre?.hourlyTripSettings?.duration,
          {
            hours: 0,
            unit: "miles",
            distance: 0,
          },
        ],
      },
    }))
  }
  const removeHourlyType = index => {
    setFields(pre => ({
      ...pre,
      hourlyTripSettings: {
        ...pre.hourlyTripSettings,
        duration: [
          ...pre?.hourlyTripSettings?.duration?.slice(0, index),
          ...pre?.hourlyTripSettings?.duration?.slice(index + 1),
        ],
      },
    }))
  }

  let isHourlyModuleActive = isHideThingTrue(hideThings, "showHideHourly")
  let isMultiStoptripActive = isHideThingTrue(hideThings, "showHideMultiStops")

  // Commission on basis of delivery mode

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

  console.log("stateCommission", stateCommission)

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

  useEffect(() => {
    setStateCommission({
      commissionOnDeliveryType: {
        delivery: {
          deliveryBoy: fields?.commissionOnDeliveryType?.delivery?.deliveryBoy,

          vendor: fields?.commissionOnDeliveryType?.delivery?.vendor,
        },

        status: fields?.commissionOnDeliveryType?.status,
        takeway: {
          deliveryBoy: fields?.commissionOnDeliveryType?.takeway?.deliveryBoy,

          vendor: fields?.commissionOnDeliveryType?.takeway?.vendor,
        },
      },
    })
  }, [fields])

  console.log("fields11111111", fields)

  // auto Time Ready

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

  // oderDeliverySetting

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

  console.log(
    "orderDeliveryFields11111111",
    fields?.deliveryPlatform?.deliveryProvider[0]?.keys?.authenticationKey
  )

  function onSubmit(event) {
    event.preventDefault()
    const newData = JSON.parse(JSON.stringify(stateCommission))
    console.log("newData", newData)

    if (!accesses.canEdit) return
    if (!activeStoreType?.storeType?.toLowerCase()) return
    const { geoFence, ...data } = fields

    if (geoFence) {
      data.geoFence = geoFence?.map(geo => geo.value)
    }
    if (orderDeliveryFields.orderDeliverySettings) {
      data.orderDeliverySettings = orderDeliveryFields?.orderDeliverySettings
    }

    if (
      fields?.deliveryPlatform?.platform == "other" &&
      fields?.deliveryPlatform?.deliveryProvider[0]?.keys?.authenticationKey ==
      "" &&
      fields?.deliveryPlatform?.deliveryProvider[0]?.keys?.customerId == ""
    ) {
      toastr.error("Please fill Authentication Key & CustomerId")
      return
    }

    onPutSettings(activeStoreType?.storeType?.toLowerCase(), {
      ...data,

      markReadySetting: inputFields,
      commissionOnDeliveryType: newData.commissionOnDeliveryType,

      // requestType:fields?.requestType,
      vehicleType: data.vehicleType?.map(item => item.value),
      taxSettings: {
        ...data?.taxSettings,
        level: _STORE_SETTINGS_FORM.taxLevel
          ? data?.taxSettings?.level
          : "store",
        percentage: data.isAdvanceTaxSetting
          ? advancedTaxPrice
          : data.taxSettings.percentage,
      },
    })
  }

  console.log("fields?.userWalletDeduct", fields?.userWalletDeduct)

  return (
    <div className={`page-content ${props?.custom ? "pt-0" : ""}`}>
      <Container fluid>
        {props?.custom && (
          <Row>
            <Col sm={1} lg={2}></Col>

            <Col sm={10} lg={8}>
              <Breadcrumbs breadcrumbItems={[{ title: "Order Settings" }]} />
            </Col>

            <Col sm={1} lg={2}></Col>
          </Row>
        )}

        <Row>
          <Col sm={1} lg={2}></Col>

          <Col sm={10} lg={8}>
            <Card>
              <CardBody className="spinner-content">
                {error && typeof error === "string" ? (
                  <Alert color="danger">{error}</Alert>
                ) : null}
                {success && typeof success === "string" ? (
                  <Alert color="success">{success}</Alert>
                ) : null}
                {loading && <div className="spinner"></div>}
                <GeneralSettings
                  fields={{
                    storeId: fields?._id || "",
                    storeTypeImage: fields?.storeTypeImage || "",
                    storeTypeIcon: fields?.storeTypeIcon || "",
                    storeText: fields?.storeText || "",
                    deliveryAreaVendor: fields?.deliveryAreaVendor || "",
                    deliveryAreaDriver: fields?.deliveryAreaDriver || "",
                    deliveryAreaVendorTakeaway:
                      fields?.deliveryAreaVendorTakeaway || "",
                    noOfDriversPerRequest: fields?.noOfDriversPerRequest || "",
                    codWalletLimit: fields?.codWalletLimit || "",
                  }}
                  handleChange={handleChange}
                  activestore={activeStoreType}
                  t={props.t}
                  slug={props?.slug}
                  _STORE_SETTINGS_FORM={_STORE_SETTINGS_FORM}
                />

                <hr className="my-3" />

                {_STORE_SETTINGS_FORM.geofence &&
                  props.main_settings?.hideThings?.find(
                    element => element.type === "geofenceTaxi"
                  )?.value && (
                    <>
                      <GeoFencings
                        geoFence={fields?.geoFence || []}
                        handleChange={handleChange("geoFence")}
                        t={props.t}
                        setFields={setFields}
                      />

                      <hr className="my-3" />
                    </>
                  )}
                {_STORE_SETTINGS_FORM.prePayment &&
                  props.main_settings?.hideThings?.find(
                    element => element.type === "prePaymentForTaxi"
                  )?.value && (
                    <>
                      <PrePayment
                        t={props.t}
                        handlePrePayment={handlePrePayment}
                        handleChange={handleChange("paymentSettings")}
                        fields={fields?.paymentSettings || {}}
                      />
                      <hr className="my-3" />
                    </>
                  )}

                {
                  // props.currentPlan?.billingPlan?.type !== "basic"
                  // &&
                  _STORE_SETTINGS_FORM.taxLevel && (
                    // slugname?.switch === props?.slug &&
                    <>
                      <TaxSettings
                        fields={fields?.taxSettings}
                        setter={setFields}
                        allData={fields}
                        handleChange={handleChange}
                        activestore={activeStoreType}
                        setAdvancedTaxPrice={setAdvancedTaxPrice}
                        advancedTaxPrice={advancedTaxPrice}
                        t={props.t}
                        _STORE_SETTINGS_FORM={_STORE_SETTINGS_FORM}
                      />

                      <hr className="my-3" />
                    </>
                  )
                }

                <Commission
                  activeStoreType={activeStoreType}
                  fields={{
                    ...(fields?.commission || {
                      vendor: "",
                      per_product: "",
                      deliveryBoy: "",
                      commissionTransfer: "offline",
                      payoutSchedule: "later",
                      scheduleDays: "",
                    }),
                  }}
                  handleChange={handleNestedChange("commission")}
                  t={props.t}
                  hideRestaurantName={
                    [
                      slugname.dewe,
                      slugname.lemonee,
                      slugname.zaza,
                    ].includes(props?.main_settings?.slug) ||
                    ["LIQUOR"].includes(activeStoreType?.storeType)
                  }
                  CommissionChange={CommissionChange}
                  stateCommission={stateCommission}
                  CommissionChangeStatus={CommissionChangeStatus}
                  settings={settings}
                />

                <hr className="my-3" />

                <ExchangeRate
                  fields={{
                    ...(fields?.currency || {
                      symbol: "¥",
                      code: "CNY",
                      rate: 1,
                    }),
                  }}
                  handleChange={handleNestedChange("currency")}
                  t={props.t}
                />

                <hr className="my-3" />

                {_STORE_SETTINGS_FORM.carPool && showCarPool && (
                  <>
                    <CarPool
                      fields={fields?.isEnableCarPool}
                      handleChange={handleChange("isEnableCarPool")}
                      manageIndividualPoolTripField={
                        fields?.isManageIndividualPoolTrip
                      }
                      handleManageIndividualPoolTripField={handleChange(
                        "isManageIndividualPoolTrip"
                      )}
                      poolDriverRadius={fields?.poolDriverRadius}
                      handleManagePoolDriverRadiusField={handleChange(
                        "poolDriverRadius"
                      )}
                      t={props.t}
                    />
                    <hr className="my-3" />
                  </>
                )}

                {_STORE_SETTINGS_FORM.firstOrderDiscount &&
                  [slugname.kontaktem].includes(props?.main_settings?.slug) && (
                    <>
                      <FirstOrderDiscount
                        fields={fields?.firstOrderDiscountSetting}
                        setFields={(name, value) => {
                          set(
                            fields,
                            `firstOrderDiscountSetting.${name}`,
                            value
                          )
                          setFields(prev => ({ ...prev }))
                        }}
                        activestore={activeStoreType}
                        t={props.t}
                        settings={settings}
                      />
                      <hr className="my-3" />
                    </>
                  )}

                {_STORE_SETTINGS_FORM.otpValidation && (
                  <>
                    <OtpValidation
                      fields={fields.otpSettings}
                      handleChange={handleNestedChange("otpSettings")}
                      t={props.t}
                    />

                    <hr className="my-3" />
                  </>
                )}
                {showThings["showHideChildRide"] &&
                  _STORE_SETTINGS_FORM.showchildRide && (
                    <>
                      <ChilRide
                        fields={fields?.childRideEnabled}
                        handleChange={handleChildChange("childRideEnabled")}
                        t={props.t}
                      />
                      <hr className="my-3" />
                    </>
                  )}

                {[slugname.oneTimeShop].includes(props?.main_settings?.slug) &&
                  _STORE_SETTINGS_FORM.paymentoptions && (
                    <>
                      <PaymentOptions
                        fields={fields?.paymentOptions}
                        handleChange={handleNestedChange("paymentOptions")}
                        t={props.t}
                      />
                      <hr className="my-3" />
                    </>
                  )}

                {_STORE_SETTINGS_FORM.veganFilterActive && showVendorInfo && (
                  <>
                    <HideVendorInfo
                      fields={fields?.hideVendorInfo}
                      t={props.t}
                      handleToogleFilter={handleToogleFilter}
                    />
                    <hr className="my-3" />
                  </>
                )}
                {_STORE_SETTINGS_FORM.vendorInfo &&
                  ![slugname.topup, slugname.lemonee, slugname.zaza].includes(
                    props?.main_settings?.slug
                  ) && (
                    <>
                      <VeganFilterActive
                        t={props.t}
                        fields={fields?.isVeganFilterActive}
                        handleToogleFilter={handleToogleFilter}
                      />
                      <hr className="my-3" />
                      {/* vegan_filter_active */}
                    </>
                  )}
                {_STORE_SETTINGS_FORM.hourlyModule && isHourlyModuleActive && (
                  <>
                    <HourlyTrip
                      addHourlyType={addHourlyType}
                      removeHourlyType={removeHourlyType}
                      setFields={setFields}
                      fields={fields?.hourlyTripSettings}
                      handleChange={handleDynamicObjectArray(
                        "hourlyTripSettings"
                      )}
                      t={props.t}
                    />
                    <hr className="my-3" />
                  </>
                )}
                {showThings["showHideDriverTripFareSettings"] &&
                  _STORE_SETTINGS_FORM.driverFareSetting && (
                    <>
                      <DriverTripFare
                        fields={fields?.driverTripFareSettings}
                        handleChange={handleNestedChange(
                          "driverTripFareSettings"
                        )}
                        t={props.t}
                      />
                      <hr className="my-3" />
                    </>
                  )}
                {_STORE_SETTINGS_FORM.multiStopModule &&
                  isMultiStoptripActive && (
                    <>
                      <MultiStopTrip
                        setFields={setFields}
                        fields={fields?.multiStopsTripSettings}
                        t={props.t}
                        handleChange={handleNestedChange(
                          "multiStopsTripSettings"
                        )}
                      />
                      <hr className="my-3" />
                    </>
                  )}
                {_STORE_SETTINGS_FORM.cancelPolicy &&
                  props.storeVersion > 1 && (
                    <>
                      <CancellationPolicy
                        fields={{
                          cancellationPartialRefundAmount:
                            fields?.cancellationPartialRefundAmount || "",
                          cancellationPolicy: fields?.cancellationPolicy || [],
                        }}
                        t={props.t}
                        handleChange={handleChange}
                        _STORE_SETTINGS_FORM={_STORE_SETTINGS_FORM}
                      />{" "}
                      <hr className="my-3" />
                    </>
                  )}
                {_STORE_SETTINGS_FORM.userWalletDeductions &&
                  [slugname.oneTimeShop].includes(props?.main_settings?.slug) &&
                  hasStatusTrue && (
                    <>
                      <UserWallet
                        fields={fields?.userWalletDeduct}
                        handleChange={handleNestedChange("userWalletDeduct")}
                        t={props.t}
                      />
                      <hr className="my-3" />
                    </>
                  )}
                {props.main_settings?.hideThings?.find(
                  element => element.type === "isTaxiRideHailing"
                )?.value &&
                  _STORE_SETTINGS_FORM.rideHailing && (
                    <>
                      <RideHailing
                        fields={{
                          rideHailingSettings: fields?.rideHailingSettings,
                        }}
                        t={props.t}
                        handleChange={handleNestedChange("rideHailingSettings")}
                        _STORE_SETTINGS_FORM={_STORE_SETTINGS_FORM}
                      />

                      <hr className="my-3" />
                    </>
                  )}
                {props.main_settings?.hideThings?.find(
                  element => element.type === "isTaxiCityPricing"
                )?.value &&
                  _STORE_SETTINGS_FORM.cityPricing && (
                    <>
                      <CityPricing
                        fields={{
                          cityPricingSettings: fields?.cityPricingSettings,
                        }}
                        t={props.t}
                        handleChange={handleChange}
                        _STORE_SETTINGS_FORM={_STORE_SETTINGS_FORM}
                      />

                      <hr className="my-3" />
                    </>
                  )}
                {props.currentPlan?.billingPlan?.type !== "basic" && (
                  <>
                    <Seo
                      fields={fields}
                      handleSeoChange={handleSeoChange}
                      t={props.t}
                    />

                    <hr className="my-3" />
                  </>
                )}
                {/* {activeStoreType?.storeType === "SERVICEPROVIDER" && (
                  <RequestType
                    fields={fields?.requestType}
                    handleRequestChange={handleRequestTypeChange}
                    t={props.t}
                  />
                )} */}
                <Row>
                  <Col className="d-flex justify-content-end">
                    {(uploadingFile || loading) && (
                      <Spinner color="primary" className="mr-2" />
                    )}

                    {accesses.canEdit && (
                      <Button
                        disabled={uploadingFile}
                        color="success"
                        className="btn-rounded waves-effect waves-light mb-2 mr-2"
                        onClick={onSubmit}
                      >
                        {props.t("save_changes")}
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col sm={1} lg={2}></Col>
        </Row>
      </Container>
    </div>
  )
}

Settings.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  onGetSettings: PropTypes.func,
  onPutSettings: PropTypes.func,
  uploadingFile: PropTypes.bool,
}

const mapStateToProps = ({
  File,
  Settings,
  Billing,
  FD_Settings,
  Login,
  FD_Restaurants,
}) => ({
  storeVersion: Settings?.settings?.storeVersion || 1,
  settings: FD_Settings.settings,
  loading: FD_Settings.loading,
  error: FD_Settings.error,
  success: FD_Settings.success,
  uploadingFile: File.loading,
  main_settings: Settings.settings,
  currentPlan: Billing.currentPlan,
  cancellationPolicyOrderStatus: Login.cancellationPolicyOrderStatus,
  vendor: FD_Restaurants.fdRestaurant,
  slug: Settings?.settings?.slug,
  hideThings: Settings?.settings?.hideThings,
})

const mapDispatchToProps = dispatch => ({
  onGetSettings: (storeType, id) => dispatch(getStoreSettings(storeType, id)),
  onPutSettings: (storeType, data) =>
    dispatch(putStoreSettings(storeType, data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Settings))
)
