import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect, useDispatch } from "react-redux"
import { withRouter } from "react-router-dom"
import toastr from "toastr"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
  Alert,
  Form,
} from "reactstrap"

//Import Breadcrumb
import { isHideThingTrue } from "helpers/contants"

import {
  getSettings,
  putSettings,
  deleteStore,
  uploadFile,
} from "store/actions"

// Other Settings
import GeneralSettings from "./General"
import PaymentMethod from "./PaymentMethod"
import AppUrl from "./AppUrl"
import SocialMedia from "./SocialMedia"
import SocialMediaSignup from "./SocialMediaSignup"
import ApiKeys from "./ApiKeys"
import BankAccountFields from "./BankAccountFields"
import HelpSupport from "./Help&Support"
import NotificationSettings from "./Notification"

import ConfirmModal from "./ConfirmModal"

//i18n
import { withTranslation } from "react-i18next"
import { ROLES } from "helpers/contants"
import StoreLink from "./StoreLink/Storelink"

const storeLinkItem = { label: "", image: "", status: false, link: "" }

const _NegHandle = value => {
  return value > 0 ? value : 0
}

const Settings = props => {
  const {
    accessLevel,
    onPutSettings,
    loading,
    error,
    success,
    currentPlan,
    storeNameFailed,
    storeNameLoading,
    onDeleteStore,
    uploadingFile,
    directPaymentGetway,
  } = props

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
  })
  const [isDelete, setIsDelete] = useState(false)
  const [fields, setFields] = useState({
    country: "",
    codWalletLimit: "",
    countryCode: "",
    timezone: "",
    removeBranding: false,
    currency: {
      sign: "",
      code: "",
    },
    smsOptionsEnabled: {
      twilio: true,
    },
    storeLink: [{ label: "", image: "", status: false, link: "" }],
    logo: "",
    favIcon: "",
    bannerImage: "",
    bannerText: "",
    deliveryMultiStoretype: true,
    language: {
      code: "",
      name: "",
    },
    notificationSound: true,
    distanceUnit: "",
    paymentMode: "",
    paymentSettings: [],
    appUrl: {
      customer_android_app: "",
      driver_android_app: "",
      customer_ios_app: "",
      driver_ios_app: "",
    },
    socialMedia: [],
    tip: [""],
    bankFields: [{ label: "" }],
    googleMapKey: {
      android: "",
      ios: "",
      web: "",
      server: "",
    },
    referredUserCommission: {
      User: { referredEarningAmount: "", status: false },
      Driver: { referredEarningAmount: "", status: false },
    },
    versionSetting: {
      androidUser: { forceUpdateStatus: false, forceVersion: 3 },
      androidDriver: { forceUpdateStatus: false, forceVersion: 3 },
      iosDriver: { forceUpdateStatus: false, forceVersion: 3 },
      iosUser: { forceUpdateStatus: false, forceVersion: 3 },
    },

    avoidFraudSetting: {
      status: false,
      numOfOrderCancel: "",
      driverBlockTime: "",
    },

    tollGuru: {
      status: false,
      apiKey: "",
    },

    isEnabledWalletToWallet: false,
  })
  console.log(fields?.tollGuru, "tollGuru")
  const [storeTypes, setStoreTypes] = useState([])
  const [storeVendors, setStoreVendors] = useState({})

  const [isDuplicateValue, setIsDuplicate] = useState("")
  const dispatch = useDispatch()

  console.log("fieldsfieldsfields", fields)

  const isMultiplePaymentMethodEnable = isHideThingTrue(
    props?.settings?.hideThings,
    "isEnableMultiplePaymentMethod"
  )

  console.log("fields111111111", fields)
  useEffect(() => {
    if (!accessLevel) {
      const data = {
        canAdd: true,
        canEdit: true,
        canDelete: true,
      }

      return setaccesses(data)
    }

    const data = {
      canAdd: false,
      canEdit: false,
      canDelete: false,
    }

    accessLevel?.map(item => {
      switch (item.label) {
        case "CREATE":
          data.canAdd = item.value
          break

        case "UPDATE":
          data.canEdit = item.value
          break

        case "DELETE":
          data.canDelete = item.value
      }
    })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])


  useEffect(() => {
    if (props?.role === ROLES.admin) {
      console.log("hey")
      // onGetSettings()
    }
  }, [props?.role])

  useEffect(() => {
    console.log("murga", props?.settings)
    if (props?.settings) {
      const {
        themeSettings,
        tip,
        bankFields,
        mailgun,
        twilio,
        firebase,
        commissionTransfer,
        tawk_direct_chat_link,
        whatsapp_number,
        referredUserCommission,
        versionSetting,
        isEnabledWalletToWallet,
        avoidFraudSetting,
        tollGuru,
        activePaymentMethodForAddCard,
        storeLink,
        smsOptionsEnabled,
        smsLive247,
        vonage,
        smsBulkNigeria,
        ...store
      } = props?.settings

      console.log("storeLink", storeLink)

      let googleMapKeyLength = {
        android: store?.googleMapKey?.android?.length || 0,
        ios: store?.googleMapKey?.ios?.length || 0,
        web: store?.googleMapKey?.web?.length || 0,
        server: store?.googleMapKey?.server?.length || 0,
      }

      let googleMapKeyStars = {
        android: "*".repeat(_NegHandle(googleMapKeyLength.android - 4)),
        ios: "*"?.repeat(_NegHandle(googleMapKeyLength.ios - 4)),
        web: "*"?.repeat(_NegHandle(googleMapKeyLength.web - 4)),
        server: "*"?.repeat(_NegHandle(googleMapKeyLength.server - 4)),
      }

      let googleMapKeyLast4 = {
        android: store?.googleMapKey?.android?.slice(
          googleMapKeyStars.android.length
        ),
        ios: store?.googleMapKey?.ios?.slice(googleMapKeyStars.ios.length),
        web: store?.googleMapKey?.web?.slice(googleMapKeyStars.web.length),
        server: store?.googleMapKey?.server?.slice(
          googleMapKeyStars.server.length
        ),
      }

      let mailgunStars = {
        MAILGUN_API_KEY: "*"?.repeat(
          _NegHandle(mailgun?.MAILGUN_API_KEY?.length - 4 || 0)
        ),
        MAILGUN_DOMAIN: "*"?.repeat(
          _NegHandle(mailgun?.MAILGUN_DOMAIN?.length - 12 || 0)
        ),
        MAILGUN_FROM: "*"?.repeat(
          _NegHandle(mailgun?.MAILGUN_FROM?.length - 12 || 0)
        ),
      }

      let mailgunLast4 = {
        MAILGUN_API_KEY: mailgun?.MAILGUN_API_KEY?.slice(
          mailgunStars.MAILGUN_API_KEY.length
        ),
        MAILGUN_DOMAIN: mailgun?.MAILGUN_DOMAIN?.slice(
          mailgunStars.MAILGUN_DOMAIN.length
        ),
        MAILGUN_FROM: mailgun?.MAILGUN_FROM?.slice(
          mailgunStars.MAILGUN_FROM.length
        ),
      }

      let twilioStars = {
        accountSid: "*"?.repeat(
          _NegHandle(twilio?.accountSid?.length - 4 || 0)
        ),
        authToken: "*"?.repeat(_NegHandle(twilio?.authToken?.length - 4 || 0)),
        twilioFrom: "*"?.repeat(
          _NegHandle(twilio?.twilioFrom?.length - 4 || 0)
        ),
      }

      let twilioLast4 = {
        accountSid: twilio?.accountSid?.slice(twilioStars.accountSid.length),
        authToken: twilio?.authToken?.slice(twilioStars.authToken.length),
        twilioFrom: twilio?.twilioFrom?.slice(twilioStars.twilioFrom.length),
      }

      let firebaseStars = {
        FCM_APIKEY: "*"?.repeat(
          _NegHandle(firebase?.FCM_APIKEY?.length - 4 || 0)
        ),
        FCM_APPID: "*"?.repeat(
          _NegHandle(firebase?.FCM_APPID?.length - 4 || 0)
        ),
        FCM_AUTHDOMAIN: "*"?.repeat(
          _NegHandle(firebase?.FCM_AUTHDOMAIN?.length - 4 || 0)
        ),
        FCM_CLIENT_EMAIL: "*"?.repeat(
          _NegHandle(firebase?.FCM_CLIENT_EMAIL?.length - 4 || 0)
        ),
        FCM_DATABASEURL: "*"?.repeat(
          _NegHandle(firebase?.FCM_DATABASEURL?.length - 4 || 0)
        ),
        FCM_MEASUREMENTID: "*"?.repeat(
          _NegHandle(firebase?.FCM_MEASUREMENTID?.length - 4 || 0)
        ),
        FCM_MESSAGINGSENDERID: "*"?.repeat(
          _NegHandle(firebase?.FCM_MESSAGINGSENDERID?.length - 4 || 0)
        ),
        FCM_PRIVATE_KEY: "*"?.repeat(
          _NegHandle(firebase?.FCM_PRIVATE_KEY?.length - 4 || 0)
        ),
        FCM_PROJECTID: "*"?.repeat(
          _NegHandle(firebase?.FCM_PROJECTID?.length - 4 || 0)
        ),
        FCM_STORAGEBUCKET: "*"?.repeat(
          _NegHandle(firebase?.FCM_STORAGEBUCKET?.length - 4 || 0)
        ),
        FCM_DATABASEURL: "*"?.repeat(
          _NegHandle(firebase?.FCM_DATABASEURL?.length - 4 || 0)
        ),
        FCM_MEASUREMENTID: "*"?.repeat(
          _NegHandle(firebase?.FCM_MEASUREMENTID?.length - 4 || 0)
        ),
      }

      let firebaseLast4 = {
        FCM_APIKEY: firebase?.FCM_APIKEY?.slice(
          firebaseStars.FCM_APIKEY.length
        ),
        FCM_APPID: firebase?.FCM_APPID?.slice(firebaseStars.FCM_APPID.length),
        FCM_AUTHDOMAIN: firebase?.FCM_AUTHDOMAIN?.slice(
          firebaseStars.FCM_AUTHDOMAIN.length
        ),
        FCM_CLIENT_EMAIL: firebase?.FCM_CLIENT_EMAIL?.slice(
          firebaseStars.FCM_CLIENT_EMAIL.length
        ),
        FCM_DATABASEURL: firebase?.FCM_DATABASEURL?.slice(
          firebaseStars.FCM_DATABASEURL.length
        ),
        FCM_MEASUREMENTID: firebase?.FCM_MEASUREMENTID?.slice(
          firebaseStars.FCM_MEASUREMENTID.length
        ),
        FCM_MESSAGINGSENDERID: firebase?.FCM_MESSAGINGSENDERID?.slice(
          firebaseStars.FCM_MESSAGINGSENDERID.length
        ),
        FCM_PRIVATE_KEY: firebase?.FCM_PRIVATE_KEY?.slice(
          firebaseStars.FCM_PRIVATE_KEY.length
        ),
        FCM_PROJECTID: firebase?.FCM_PROJECTID?.slice(
          firebaseStars.FCM_PROJECTID.length
        ),
        FCM_STORAGEBUCKET: firebase?.FCM_STORAGEBUCKET?.slice(
          firebaseStars.FCM_STORAGEBUCKET.length
        ),
      }

      // storeLink: [{ label: "", image: "", status: false, link: "" }],

      setFields(prevState => ({
        ...prevState,
        ...store,
        tip: (tip || [])?.length !== 0 ? tip : [""],
        tawk_direct_chat_link: tawk_direct_chat_link,
        whatsapp_number: whatsapp_number,

        storeLink:
          storeLink?.map(item => ({
            label: item.label,
            link: item.link,
            imageFile: item.imageFile,
            status: item.status,
          })) || [],

        bankFields:
          (bankFields || [])?.length !== 0
            ? bankFields
            : [{ label: "", value: "" }],
        commissionTransfer: commissionTransfer,
        smsOptionsEnabled: smsOptionsEnabled || { twilio: true },
        referredUserCommission,
        versionSetting,
        avoidFraudSetting: avoidFraudSetting ?? fields.avoidFraudSetting,
        tollGuru: tollGuru ?? fields.tollGuru,

        googleMapKey: {
          android: googleMapKeyStars.android + googleMapKeyLast4.android,
          ios: googleMapKeyStars.ios + googleMapKeyLast4.ios,
          web: googleMapKeyStars.web + googleMapKeyLast4.web,
          server: googleMapKeyStars.server + googleMapKeyLast4.server,
        },
        mailgun: {
          MAILGUN_API_KEY:
            mailgunStars.MAILGUN_API_KEY + mailgunLast4.MAILGUN_API_KEY,
          MAILGUN_DOMAIN:
            mailgunStars.MAILGUN_DOMAIN + mailgunLast4.MAILGUN_DOMAIN,
          MAILGUN_FROM: mailgunStars.MAILGUN_FROM + mailgunLast4.MAILGUN_FROM,
        },
        twilio: {
          accountSid: twilioStars.accountSid + twilioLast4.accountSid,
          authToken: twilioStars.authToken + twilioLast4.authToken,
          twilioFrom: twilioStars.twilioFrom + twilioLast4.twilioFrom,
        },

        smsLive247: {
          apiKey: smsLive247?.apiKey,
          senderID: smsLive247?.senderID,
        },
        vonage: {
          apiKey: vonage?.apiKey,
          apiSecret: vonage?.apiSecret,
          from: vonage?.from,
        },
        smsBulkNigeria: {
          from: smsBulkNigeria?.from,
          apiToken: smsBulkNigeria?.apiToken,
        },
        isEnabledWalletToWallet,
        firebase: {
          FCM_APIKEY: firebaseStars.FCM_APIKEY + firebaseLast4.FCM_APIKEY,
          FCM_APPID: firebaseStars.FCM_APPID + firebaseLast4.FCM_APPID,
          FCM_AUTHDOMAIN:
            firebaseStars.FCM_AUTHDOMAIN + firebaseLast4.FCM_AUTHDOMAIN,
          FCM_CLIENT_EMAIL:
            firebaseStars.FCM_CLIENT_EMAIL + firebaseLast4.FCM_CLIENT_EMAIL,
          FCM_DATABASEURL:
            firebaseStars.FCM_DATABASEURL + firebaseLast4.FCM_DATABASEURL,
          FCM_MEASUREMENTID:
            firebaseStars.FCM_MEASUREMENTID + firebaseLast4.FCM_MEASUREMENTID,
          FCM_MESSAGINGSENDERID:
            firebaseStars.FCM_MESSAGINGSENDERID +
            firebaseLast4.FCM_MESSAGINGSENDERID,
          FCM_PRIVATE_KEY:
            firebaseStars.FCM_PRIVATE_KEY + firebaseLast4.FCM_PRIVATE_KEY,
          FCM_PROJECTID:
            firebaseStars.FCM_PROJECTID + firebaseLast4.FCM_PROJECTID,
          FCM_STORAGEBUCKET:
            firebaseStars.FCM_STORAGEBUCKET + firebaseLast4.FCM_STORAGEBUCKET,
        },
        activePaymentMethodForAddCard,
      }))

    }
  }, [JSON.stringify(props?.settings)])


  useEffect(() => {
    setFields(prevFields => ({
      ...prevFields,
      storeType: props.settings?.storeType,
      address: props.settings?.address || "",
      storeTypeEnabled: props.settings?.storeTypeEnabled,
    }))

    /* Store Types Enabled */
    if (props.settings?.storeTypeEnabled) {
      const storeTypeVendor = {}
      const enTypes = props.settings?.storeTypeEnabled?.map(service => {
        storeTypeVendor[service?._id] = service?.storeVendorType
        return service?._id
      })

      setStoreTypes(enTypes)
      setStoreVendors(storeTypeVendor)
    }
  }, [JSON.stringify(props?.settings?.storeTypeEnabled)])

  const toggleDelete = () => {
    setIsDelete(!isDelete)
  }

  const onDeleteConfirm = () => {
    onDeleteStore(props?.history)
    toggleDelete()
  }

  const handleChange = name => event => {
    const { value } = event.target
    console.log(name, value, "VALUE")

    if (name === "removeBranding") {
      if (currentPlan?.isTrial) {
        return setFields(prevFields => ({ ...prevFields, [name]: false }))
      }
    }

    setFields(prevFields => ({ ...prevFields, [name]: value }))
  }


  const handlePaymentChange = (index, name) => event => {
    const { value } = event.target

    setFields(prevState => ({
      ...prevState,
      paymentSettings: [
        ...prevState?.paymentSettings?.slice(0, index),
        {
          ...prevState?.paymentSettings[index],
          [name]: value,
        },
        ...prevState?.paymentSettings?.slice(index + 1),
      ],
    }))
  }
  const handleMultiPaymentStatusChange = (index, name) => event => {
    const { value } = event.target

    // if (fields?.activePaymentMethodForAddCard == name) return toastr.error("Please First Select Another Add Card Button")

    setFields(prevState => ({
      ...prevState,
      activePaymentMethodForAddCard:
        prevState?.activePaymentMethodForAddCard == name
          ? ""
          : prevState?.activePaymentMethodForAddCard,
      paymentSettings: [
        ...prevState?.paymentSettings?.slice(0, index),
        {
          ...prevState?.paymentSettings[index],
          status: value,
        },
        ...prevState?.paymentSettings?.slice(index + 1),
      ],
    }))
  }

  const paymentMethodForCard = () => event => {
    const { value } = event.target
    setFields(pre => ({
      ...pre,
      activePaymentMethodForAddCard:
        pre.activePaymentMethodForAddCard == value ? "" : value,
    }))
  }

  const handlePaymentStatusChange = (index, name) => event => {
    const { value } = event.target
    if (
      name === "wallet" ||
      name === "moncash" ||
      name === "cod" ||
      name === "braintree" ||
      name === "razorpay" ||
      name === "cardOnDelivery"
    ) {
      setFields(prevState => ({
        ...prevState,
        paymentSettings: [
          ...prevState?.paymentSettings?.slice(0, index),
          {
            ...prevState?.paymentSettings[index],
            status: value,
          },
          ...prevState?.paymentSettings?.slice(index + 1),
        ],
      }))
    } else {
      const changedValue = fields.paymentSettings.map(obj => {
        if (
          obj.payment_method === "cod" ||
          obj.payment_method === "cardOnDelivery" ||
          obj.payment_method === "moncash" ||
          obj.payment_method === "wallet" ||
          obj.payment_method === "braintree" ||
          obj.payment_method === "razorpay"
        ) {
          return obj
        }
        return { ...obj, status: false }
      })
      setFields(prevState => ({
        ...prevState,
        paymentSettings: changedValue,
      }))

      setFields(prevState => ({
        ...prevState,
        paymentSettings: [
          ...prevState?.paymentSettings?.slice(0, index),
          {
            ...prevState?.paymentSettings[index],
            status: value,
          },
          ...prevState?.paymentSettings?.slice(index + 1),
        ],
      }))
    }
  }

  const handleAppUrlChange = name => event => {
    const { value } = event.target

    setFields(prevState => ({
      ...prevState,
      appUrl: { ...prevState.appUrl, [name]: value },
    }))
  }

  const handleApiKeysChange = (fieldName, name) => event => {
    const { value } = event.target

    setFields(prevState => ({
      ...prevState,
      [fieldName]: { ...prevState[fieldName], [name]: value },
    }))
  }

  const handleSocialMediaChange = (keyname, index, name) => event => {
    const { value } = event.target

    setFields(prevState => ({
      ...prevState,
      [keyname]: [
        ...prevState[keyname]?.slice(0, index),
        { ...prevState[keyname][index], [name]: value },
        ...prevState[keyname]?.slice(index + 1),
      ],
    }))
  }

  const handleStoreType =
    (name, serviceIndex, min, max) =>
      ({ target }) => {
        const { value } = target
        console.log(name, "murga")
        if (name === "orderNumber") {
          if (value > 11) {
            toastr.error("Please enter a maximum value of 11")
          } else if (value < 1) {
            toastr.error("Please enter a minimum value of 1")
          } else if (isDuplicate(serviceIndex, value)) {
            // setErrors(1)
            toastr.error("Duplicate value found")
            setIsDuplicate(true)
          } else {
            setIsDuplicate(false)
          }
        }

        setFields(prevState => ({
          ...prevState,
          storeTypeEnabled: [
            ...prevState.storeTypeEnabled?.slice(0, serviceIndex),
            { ...prevState.storeTypeEnabled[serviceIndex], [name]: value },
            ...prevState.storeTypeEnabled?.slice(serviceIndex + 1),
          ],
          storeType: [
            ...prevState.storeType?.slice(0, serviceIndex),
            { ...prevState.storeType[serviceIndex], [name]: value },
            ...prevState.storeType?.slice(serviceIndex + 1),
          ],
        }))

      }



  const isDuplicate = (index, value) => {
    console.log("value", value)
    let isSame = false

    fields.storeType.map((item, i) => {
      if (Number(item.orderNumber) == Number(value)) {
        console.log("item======", item)
        isSame = true
      }
    })

    return isSame
  }

  const handleSingleStoreType = ({ target }) => {
    const { value } = target

    const serviceIndex = 0

    setFields(prevState => {
      let index = prevState.storeType.findIndex(
        item => item.storeType === prevState.storeTypeEnabled[0]?.storeType
      )
      return {
        ...prevState,
        storeTypeEnabled: [
          ...prevState.storeTypeEnabled?.slice(0, serviceIndex),
          { ...prevState.storeTypeEnabled[serviceIndex], label: value },
          ...prevState.storeTypeEnabled?.slice(serviceIndex + 1),
        ],
        storeType: [
          ...prevState.storeType?.slice(0, index),
          { ...prevState.storeType[index], label: value },
          ...prevState.storeType?.slice(index + 1),
        ],
      }
    })
  }

  function handleStoreTypes(serviceId, status) {
    // console.log(serviceId, "serviceId", status, "status")
    if (status) {
      const _storeType = props?.settings?.storeType?.filter(
        service => service?._id === serviceId
      )

      if (_storeType?.length > 0) {
        const storeTypeVendor = storeVendors

        storeTypeVendor[serviceId] = _storeType[0]?.storeVendorType

        if (currentPlan?.billingPlan?.type === "basic") {
          storeTypeVendor[serviceId] = "SINGLE"
        }

        if (
          ["premium", "basic"].includes(currentPlan?.billingPlan?.type) &&
          (props?.settings?.storeTypeEnabled?.length > 0 ||
            storeTypes?.length > 0) &&
          !props?.settings?.storeTypeEnabled
            ?.map(({ _id }) => _id)
            .includes(serviceId)
        ) {
        } else {
          setStoreTypes(prevState => [...prevState, serviceId])
        }

        setStoreVendors(storeTypeVendor)
      }
    } else {
      const _index = storeTypes?.findIndex(service => service === serviceId)

      if (_index !== -1) {
        setStoreTypes(prevState => [
          ...prevState.slice(0, _index),
          ...prevState.slice(_index + 1),
        ])
      }
    }
  }

  function handleStoreVendors(serviceId, type) {
    if (currentPlan?.billingPlan?.type === "basic" && type === "AGGREAGATOR")
      return
    setStoreVendors(prevState => ({ ...prevState, [serviceId]: type }))
  }

  function submit(e) {
    e.preventDefault()

    if (!accesses.canEdit) return

    if (storeNameFailed) return
    if (storeNameLoading || uploadingFile) return

    if (
      isMultiplePaymentMethodEnable &&
      fields?.activePaymentMethodForAddCard == ""
    ) {
      return toastr.error("Please Select One Method for Add Card")
    }

    console.log("babl1", fields.storeLink)
    console.log(
      "babl2",
      fields?.storeLink?.some(
        item => !item.label || !item.imageFile || !item.link
      )
    )
    if (
      fields?.storeLink?.some(
        item => !item.label || !item.imageFile || !item.link
      )
    ) {
      return toastr.error("Please fill all fields of store links")
    }

    const { themeSettings, storeType, storeTypeEnabled, ...rest } = fields
    const data = rest

    data.storeType = storeType?.map((store, index) => {
      return {
        _id: store._id,
        orderNumber: store.orderNumber,
        storeType: store.storeType,
        label: store.label,
        storeDiscountLabel: store?.storeDiscountLabel,
        status: storeTypes?.includes(store._id) ? "active" : "inactive",
        storeVendorType:
          currentPlan?.billingPlan?.type === "basic"
            ? "SINGLE"
            : currentPlan?.billingPlan?.type === "ultimate"
              ? "AGGREAGATOR"
              : storeVendors[store._id],
      }
    })

    if (fields?.googleMapKey?.android?.includes("*")) {
      fields.googleMapKey.android = props?.settings?.googleMapKey?.android
    }

    if (fields?.googleMapKey?.ios?.includes("*")) {
      fields.googleMapKey.ios = props?.settings?.googleMapKey?.ios
    }

    if (fields?.googleMapKey?.web?.includes("*")) {
      fields.googleMapKey.web = props?.settings?.googleMapKey?.web
    }

    if (fields?.googleMapKey?.server?.includes("*")) {
      fields.googleMapKey.server = props?.settings?.googleMapKey?.server
    }

    if (fields?.mailgun?.MAILGUN_API_KEY?.includes("*")) {
      fields.mailgun.MAILGUN_API_KEY = props?.settings?.mailgun?.MAILGUN_API_KEY
    }
    if (fields?.mailgun?.MAILGUN_DOMAIN?.includes("*")) {
      fields.mailgun.MAILGUN_DOMAIN = props?.settings?.mailgun?.MAILGUN_DOMAIN
    }
    if (fields?.mailgun?.MAILGUN_FROM?.includes("*")) {
      fields.mailgun.MAILGUN_FROM = props?.settings?.mailgun?.MAILGUN_FROM
    }

    if (fields?.twilio?.accountSid?.includes("*")) {
      fields.twilio.accountSid = props?.settings?.twilio?.accountSid
    }
    if (fields?.twilio?.authToken?.includes("*")) {
      fields.twilio.authToken = props?.settings?.twilio?.authToken
    }
    if (fields?.twilio?.twilioFrom?.includes("*")) {
      fields.twilio.twilioFrom = props?.settings?.twilio?.twilioFrom
    }

    if (fields?.firebase?.FCM_APIKEY?.includes("*")) {
      fields.firebase.FCM_APIKEY = props?.settings?.firebase?.FCM_APIKEY
    }
    if (fields?.firebase?.FCM_APPID?.includes("*")) {
      fields.firebase.FCM_APPID = props?.settings?.firebase?.FCM_APPID
    }
    if (fields?.firebase?.FCM_AUTHDOMAIN?.includes("*")) {
      fields.firebase.FCM_AUTHDOMAIN = props?.settings?.firebase?.FCM_AUTHDOMAIN
    }
    if (fields?.firebase?.FCM_CLIENT_EMAIL?.includes("*")) {
      fields.firebase.FCM_CLIENT_EMAIL =
        props?.settings?.firebase?.FCM_CLIENT_EMAIL
    }
    if (fields?.firebase?.FCM_DATABASEURL?.includes("*")) {
      fields.firebase.FCM_DATABASEURL =
        props?.settings?.firebase?.FCM_DATABASEURL
    }
    if (fields?.firebase?.FCM_MEASUREMENTID?.includes("*")) {
      fields.firebase.FCM_MEASUREMENTID =
        props?.settings?.firebase?.FCM_MEASUREMENTID
    }
    if (fields?.firebase?.FCM_MESSAGINGSENDERID?.includes("*")) {
      fields.firebase.FCM_MESSAGINGSENDERID =
        props?.settings?.firebase?.FCM_MESSAGINGSENDERID
    }
    if (fields?.firebase?.FCM_PRIVATE_KEY?.includes("*")) {
      fields.firebase.FCM_PRIVATE_KEY =
        props?.settings?.firebase?.FCM_PRIVATE_KEY
    }
    if (fields?.firebase?.FCM_PROJECTID?.includes("*")) {
      fields.firebase.FCM_PROJECTID = props?.settings?.firebase?.FCM_PROJECTID
    }
    if (fields?.firebase?.FCM_STORAGEBUCKET?.includes("*")) {
      fields.firebase.FCM_STORAGEBUCKET =
        props?.settings?.firebase?.FCM_STORAGEBUCKET
    }

    // if (errors == 1) {
    //   toastr.error("Duplicate value found")
    // } else {
    if (isDuplicateValue == true) {
      toastr.error("Duplicate value found")
    } else {
      onPutSettings(data)
    }
  }

  useEffect(() => {
    //showing only enabled payment methods from super admin
    if (props?.storepaymentMethod?.length > 0) {
      setFields(prevState => ({
        ...prevState,
        paymentSettings: [
          ...prevState?.paymentSettings?.filter(obj1 => {
            return props?.storepaymentMethod?.some(obj2 => {
              return obj1.payment_method == obj2.value
            })
          }),
        ],
      }))
    }
  }, [props?.storepaymentMethod])


  let isStripeActive = fields?.paymentSettings.filter(
    payment => payment?.payment_method == "stripe"
  )[0]?.status

  useEffect(() => {
    if (isStripeActive == false) {
      setFields(prevState => {
        return {
          ...prevState,
          commissionTransfer: {
            ...prevState.commissionTransfer,
            status: "offline",
          },
        }
      })
    }

  }, [fields.paymentSettings])

  useEffect(() => { }, [JSON.stringify(props?.settings)])




  const _handleStoreSwicth = (value, index) => {
    const list = [...fields.storeLink]
    list[index]["status"] = value
    setFields(prev => ({
      ...prev,
      storeLink: list,
    }))
    //    setInputList(list)
  }

  const _handleStoreInputChange = (e, i) => {
    const { name, value } = e.target
    const list = [...fields.storeLink]
    list[i][name] = value
    setFields(prev => ({
      ...prev,
      storeLink: list,
    }))
  }

  const _handleRemoveClick = i => {
    const list = [...fields.storeLink]
    list.splice(i, 1)
    setFields(prev => ({
      ...prev,
      storeLink: list,
    }))
  }

  const _handleClick = e => {
    const list = [...fields.storeLink, { ...storeLinkItem }]

    setFields(prev => ({
      ...prev,
      storeLink: list,
    }))
  }

  // image upload
  const [selectedFiles, setselectedFiles] = useState([])

  const uploadFileSuccess = (response, i) => {
    console.log("response111", response)
    const { _id: image, link: imageFile } = response.data


    const list = [...fields.storeLink]
    list[i]["image"] = image
    list[i]["imageFile"] = imageFile

    setFields(prev => ({
      ...prev,
      storeLink: list,
    }))
  }

  function handleAcceptedFiles(_files, i) {
    const files = _files?.filter(file => file.size < 5242880)


    if (files.length < _files.length) {
      return toastr.error(props.t("max_file_size"))
    }

    dispatch(
      uploadFile({ image: files[0] }, response =>
        uploadFileSuccess(response, i)
      )
    )

    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files[i])
  }
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }


  return (
    <div className="page-content">
      <ConfirmModal
        isOpen={isDelete}
        toggle={toggleDelete}
        onConfirm={onDeleteConfirm}
      />

      <Container fluid>
        {/* <Breadcrumbs title="Settings" breadcrumbItem="Settings" /> */}
        <Form onSubmit={submit}>
          <Row>
            <Col lg={1} xl={2} className="d-xs-none d-sm-block"></Col>

            <Col lg={10} xl={8}>
              <Card className="store-settings">
                <CardBody className="spinner-content needs-validation">
                  {error && typeof error === "string" ? (
                    <Alert color="danger">{error}</Alert>
                  ) : null}
                  {success && typeof success === "string" ? (
                    <Alert color="success">{success}</Alert>
                  ) : null}
                  {storeNameFailed && typeof storeNameFailed === "string" && (
                    <Alert color="danger">{storeNameFailed}</Alert>
                  )}

                  {(loading || uploadingFile) && (
                    <div className="spinner"></div>
                  )}

                  <GeneralSettings
                    t={props.t}
                    currentStoreName={props?.settings?.storeName}
                    storeTypes={storeTypes}
                    storeVendors={storeVendors}
                    handleChange={handleChange}
                    handleStoreType={handleStoreType}
                    handleSingleStoreType={handleSingleStoreType}
                    handleStoreTypes={handleStoreTypes}
                    handleStoreVendors={handleStoreVendors}
                    hideThingSettings={props?.settings?.hideThings}
                    slug={props?.settings?.slug}
                    setFields={setFields}
                    fields={fields}
                  />

                  <hr className="my-3" />

                  {/* temprary  */}

                  <StoreLink
                    handleStoreInputChange={(e, i) =>
                      _handleStoreInputChange(e, i)
                    }
                    handleStoreSwitch={(val, index) =>
                      _handleStoreSwicth(val, index)
                    }
                    handleaddClick={_handleClick}
                    handleRemoveClick={i => _handleRemoveClick(i)}
                    inputList={fields.storeLink}
                    selectedFiles={selectedFiles}
                    imageupload={(_files, i) =>
                      handleAcceptedFiles(_files, i)
                    }
                    t={props.t}
                  />

                  <PaymentMethod
                    t={props.t}
                    fields={{
                      paymentMode: fields.paymentMode,
                      paymentSettings: fields.paymentSettings,
                      activePaymentMethodForAddCard:
                        fields?.activePaymentMethodForAddCard,
                    }}
                    handleChange={handleChange}
                    handlePaymentChange={handlePaymentChange}
                    handlePaymentStatusChange={
                      isMultiplePaymentMethodEnable
                        ? handleMultiPaymentStatusChange
                        : handlePaymentStatusChange
                    }
                    // mutlipaymentoption={mutlipaymentoption || []}
                    isMultiplePaymentMethodEnable={
                      isMultiplePaymentMethodEnable
                    }
                    paymentMethodForCard={paymentMethodForCard}
                  />

                  <hr className="my-3" />



                  <AppUrl
                    t={props.t}
                    fields={{
                      ...fields?.appUrl,
                    }}
                    handleAppUrlChange={handleAppUrlChange}
                  />

                  <hr className="my-3" />

                  <SocialMedia
                    t={props.t}
                    fields={{
                      socialMedia: fields?.socialMedia,
                    }}
                    handleSocialMediaChange={handleSocialMediaChange}
                    handleChange={handleChange}
                  />

                  <hr className="my-3" />

                  <SocialMediaSignup
                    t={props.t}
                    domain={fields?.domain}
                    fields={{
                      socialMediaLoginSignUp: fields?.socialMediaLoginSignUp,
                    }}
                    handleSocialMediaChange={handleSocialMediaChange}
                    handleChange={handleChange}
                  />

                  <hr className="my-3" />

                  <ApiKeys
                    t={props.t}
                    fields={{
                      googleMapKey: fields?.googleMapKey,
                      mailgun: fields?.mailgun,
                      twilio: fields.twilio,
                      firebase: fields.firebase,
                      smsLive247: fields?.smsLive247,
                      vonage: fields?.vonage,
                      smsBulkNigeria: fields?.smsBulkNigeria,
                    }}
                    smsOptionsEnabled={fields?.smsOptionsEnabled}
                    handleChange={handleChange}
                    handleApiKeysChange={handleApiKeysChange}
                  />

                  <hr className="my-3" />

                  <BankAccountFields
                    t={props.t}
                    fields={{ bankFields: fields?.bankFields }}
                    handleChange={handleChange}
                  />

                  <hr className="my-3" />

                  <HelpSupport
                    t={props.t}
                    fields={{
                      mobileNumber: fields?.mobileNumber,
                      email: fields?.email,
                      chatCodeScript: fields?.chatCodeScript,
                      whatsapp_number: fields?.whatsapp_number,
                      tawk_direct_chat_link: fields?.tawk_direct_chat_link,
                    }}
                    handleChange={handleChange}
                  />

                  <hr className="my-3" />

                  <NotificationSettings
                    t={props.t}
                    fields={{
                      notificationSound: fields?.notificationSound,
                      notifications: fields?.notifications,
                      twilio: fields.twilio,
                      smsLive247: fields?.smsLive247,
                      vonage: fields?.vonage,
                      smsBulkNigeria: fields?.smsBulkNigeria,
                    }}
                    handleChange={handleChange}
                    handleApiKeysChange={handleApiKeysChange}
                    slug={props?.settings?.slug}
                  />


                  <hr className="my-3" />


                  <Row className="store-settings">
                    <Col sm={6} className="mb-2">
                      {accesses.canDelete && (
                        <Button
                          color="danger"
                          onClick={toggleDelete}
                          className=""
                        >
                          {props.t("delete_store")}
                        </Button>
                      )}
                    </Col>

                    <Col sm={6} className="text-sm-right mb-2">
                      {(loading || uploadingFile) && (
                        <Spinner
                          color="primary"
                          className="mr-2 d-none d-sm-block"
                        />
                      )}

                      {accesses.canEdit && (
                        <Button
                          type="submit"
                          disabled={uploadingFile || loading}
                          color="primary"
                          className=""
                        >
                          {props.t("save_changes")}
                        </Button>
                      )}
                    </Col>

                    <Col xs={12} className="d-sm-none text-center">
                      {(loading || uploadingFile) && (
                        <Spinner color="primary" className="mr-2" />
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
  loading: PropTypes.bool,
  error: PropTypes.string,
  onGetSettings: PropTypes.func,
  onPutSettings: PropTypes.func,
}

const mapStateToProps = ({ Login, File, Settings, Billing, Register }) => ({
  role: Login?.user?.role,
  settings: Settings.settings,
  loading: Settings.loading,
  error: Settings.error,
  success: Settings.success,
  currentPlan: Billing.currentPlan,
  storeNameFailed: Register.registrationError,
  storeNameLoading: Register.storeNameLoading,
  uploadingFile: File.loading,
  storepaymentMethod: Settings.settings.storepaymentMethod,
  directPaymentGetway: Login?.directPaymentGetway,
})

const mapDispatchToProps = dispatch => ({
  onGetSettings: () => dispatch(getSettings()),
  onPutSettings: data => dispatch(putSettings(data)),
  onDeleteStore: history => dispatch(deleteStore(history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Settings))
)
