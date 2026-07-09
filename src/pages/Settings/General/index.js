import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Select, { components } from "react-select"

import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip,
  FormText,
  Button,
} from "reactstrap"

import { registerStoreName } from "store/actions"

import Instructions from "./Instructions"
import GooglePlacesAutocomplete, {
  geocodeByLatLng,
  geocodeByPlaceId,
} from "react-google-places-autocomplete"
import { SLUGS_NAME } from "helpers/contants"

const CustomCountryComponent = props => {
  const { data } = props

  return (
    <components.Option {...props}>
      <div className={`custom-option`}>
        <span className="flag">{data.flag}</span>
        <div className="country-name">{data.value}</div>
      </div>
    </components.Option>
  )
}

const CustomTimezoneComponent = props => {
  const { data } = props

  return (
    <components.Option {...props}>
      <div className={`custom-option`}>
        <div className="flag">{data.value}</div>
        <span className="country-name font-weight-bold">{data.utc}</span>
      </div>
    </components.Option>
  )
}

const CustomCurrencyComponent = props => {
  const { data } = props

  return (
    <components.Option {...props}>
      <div className={`custom-option`}>
        <div className="flag">{data.value}</div>
        <span className="country-name font-weight-bold">{data.label}</span>
      </div>
    </components.Option>
  )
}

const GeneralSettings = props => {
  const {
    fields,
    storeTypes,
    storeVendors,
    handleChange,
    handleStoreType,
    handleSingleStoreType,
    handleStoreTypes,
    handleStoreVendors,
    currentPlan,
    storeNameFailed,
    storeNameLoading,
    onStoreName,
    hideThingSettings,
    currentStoreName,
    setFields,
    handleStoreOrder,
    slug,
  } = props
  const storeNameRef = useRef(null)

  const [country, setCountry] = useState({})
  const [timezoneData, settimezoneData] = useState({})
  const [currencyData, setcurrencyData] = useState({})
  const [languageData, setlanguageData] = useState({})

  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }])
  // console.log(hideThingSettings, "hideThingSettings");

  const languageChecker = () => {
    // if superadmin doesnot select languages for it ..it will show all languages

    if (props?.languages.length < 1) {
      return props?.allLanguages
    } else {
      return props?.languages
    }
  }

  const currencyChecker = () => {
    if (props?.currencies.length < 1) {
      return props?.allCurrencies
    } else {
      return props?.currencies
    }
  }

  const isShowStore = hideThingSettings.filter(
    store => store.type === "isShow" && store.value === true
  )
  console.log(isShowStore, "isShowStore")

  useEffect(() => {
    /* Select Country */
    if (fields?.country && fields?.country !== country?.value) {
      const _country = props?.countries.filter(
        item => item.code === fields?.country
      )

      if (_country?.length > 0) {
        setCountry({
          label: _country[0]?.name,
          value: _country[0]?.code,
          cc: _country[0]?.cc,
        })
      }
    }

    /* Select Timezone */
    if (fields?.timezone && fields?.timezone !== timezoneData?.value) {
      const _timezone = props?.timezones?.filter(
        item => item.code === fields.timezone
      )

      if (_timezone?.length > 0) {
        settimezoneData({
          label: _timezone[0]?.name,
          value: _timezone[0]?.code,
        })
      }
    }

    /* Select Currency */
    if (
      fields?.currency &&
      fields?.currency?.code !== currencyData?.value &&
      fields?.currency?.sign !== currencyData?.label
    ) {
      const _currency = currencyChecker()?.filter(
        item => item.code === fields?.currency?.code
      )

      if (_currency?.length > 0) {
        setcurrencyData({
          value: _currency[0]?.code,
          label: _currency[0]?.name,
        })
      }
    }

    /* Select Language */
    if (
      fields?.language &&
      fields?.language?.name !== languageData?.value &&
      fields?.language?.code !== languageData?.label
    ) {
      const _language = languageChecker()?.filter(
        item =>
          item.name === fields?.language?.name &&
          item.code === fields?.language?.code
      )

      if (_language?.length > 0) {
        setlanguageData({
          label: _language[0]?.name,
          value: _language[0]?.code,
        })
      }
    }
  }, [JSON.stringify(fields)])

  function handleStoreName(event) {
    if (!!storeNameRef.current) {
      clearTimeout(storeNameRef.current)
    }

    storeNameRef.current = setTimeout(() => {
      const { value } = event?.target

      onStoreName({ storeName: event?.target?.value, currentStoreName })
    }, 1000)

    handleChange("storeName")(event)
  }

  function handleCountryChange(data) {
    setCountry(data)

    handleChange && handleChange("country")({ target: { value: data.value } })
    handleChange &&
      handleChange("countryCode")({ target: { value: data.countryCode } })
  }

  function handleTimezoneChange(data) {
    settimezoneData(data)

    handleChange && handleChange("timezone")({ target: data })
  }

  function handleCurrencyChange(data) {
    setcurrencyData(data)

    handleChange &&
      handleChange("currency")({
        target: { value: { sign: data?.label, code: data?.value } },
      })
  }

  function handleLanguageChange(data) {
    setlanguageData(data)

    handleChange &&
      handleChange("language")({
        target: { value: { name: data?.label, code: data?.value } },
      })
  }

  const handleAddressChange = data => {
    // handleChange("address")({ target: { value: data?.label } })

    if (!data?.value?.place_id) {
      // handleChange("lat")({ target: { value: 0 } })
      // handleChange("lng")({ target: { value: 0 } })
      setFields(prev => ({
        ...prev,
        address: "",
        lat: 0,
        lng: 0,
      }))
      return
    }

    geocodeByPlaceId(data.value.place_id)
      .then(results => {
        const result = results[0]

        if (!result) return
        setFields(prev => ({
          ...prev,
          address: data?.label,
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
        }))
      })
      .catch(error => console.log(error))
  }

  console.log(props?.allLanguages, "allLanguagesallLanguages")

  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t} />
      </Col>

      <Col lg={8}>
        <Row>
          <Col sm={6} lg={12} xl={6}>
            <FormGroup>
              <Label>{props.t("store_name")}</Label>
              <Input
                valid={
                  !storeNameLoading &&
                  storeNameFailed !== null &&
                  !!storeNameFailed
                }
                invalid={
                  !storeNameLoading &&
                  storeNameFailed !== null &&
                  !storeNameFailed
                }
                placeholder=""
                value={fields?.storeName}
                onChange={handleStoreName}
              />
            </FormGroup>
          </Col>

          <Col sm={6} lg={12} xl={6}>
            <FormGroup>
              <Label>{props.t("country")}</Label>
              <Select
                placeholder=""
                options={props?.countries?.map(option => ({
                  label: option.name,
                  value: option.code,
                  countryCode: option.cc,
                }))}
                classNamePrefix="select2-selection"
                // components={{ Option: CustomCountryComponent }}
                value={country}
                onChange={handleCountryChange}
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup className="ajax-select select2-container">
              <Label>{props.t("address")}</Label>

              <GooglePlacesAutocomplete
                apiKey={props?.googleMapKey}
                selectProps={{
                  isClearable: true,
                  inputId: "address-select",
                  classNamePrefix: "select2-selection",
                  // value: addressValue,
                  onChange: handleAddressChange,
                  placeholder:
                    fields?.address || props.t("address_placeholder"),
                  components: {
                    IndicatorSeparator: false,
                    DropdownIndicator: false,
                  },
                }}
              />
            </FormGroup>
          </Col>

          <Col sm={6} lg={12} xl={6}>
            <FormGroup>
              <Label for="formrow-InputTimezone">{props.t("timezone")}</Label>
              <Select
                placeholder=""
                options={props?.timezones?.map(option => ({
                  label: option.name,
                  value: option.code,
                }))}
                // components={{ Option: CustomTimezoneComponent }}
                classNamePrefix="select2-selection"
                value={timezoneData}
                onChange={handleTimezoneChange}
              />
            </FormGroup>
          </Col>

          {/* <Col sm={6} lg={12} xl={6}>
            <FormGroup>
              <Label>{props.t("delivery_multi_type")}</Label>

              <div className="status-switch square-switch">
                <input
                  type="checkbox"
                  id="square-switch1"
                  switch="none"
                  checked={fields?.deliveryMultiStoretype}
                  onChange={() => {
                    handleChange &&
                      handleChange("deliveryMultiStoretype")({
                        target: { value: !fields?.deliveryMultiStoretype },
                      })
                  }}
                />
                <label
                  htmlFor="square-switch1"
                  data-on-label={props.t("active")}
                  data-off-label={props.t("inactive")}
                />
              </div>
            </FormGroup>
          </Col> */}

          <Col sm={6} lg={12} xl={6}>
            <FormGroup>
              <Label for="formrow-InputCurrency">{props.t("currency")}</Label>
              <Select
                placeholder=""
                options={currencyChecker()?.map(option => ({
                  label: option.name,
                  value: option.code,
                }))}
                classNamePrefix="select2-selection"
                components={{ Option: CustomCurrencyComponent }}
                value={currencyData}
                onChange={handleCurrencyChange}
              />
            </FormGroup>
          </Col>

          <Col sm={6} lg={12} xl={6}>
            <FormGroup>
              <Label for="formrow-InputLanguage">{props.t("language")}</Label>
              <Select
                placeholder=""
                options={languageChecker()?.map(item => ({
                  value: item?.code,
                  label: item?.name,
                }))}
                classNamePrefix="select2-selection"
                value={languageData}
                onChange={handleLanguageChange}
              />
            </FormGroup>
          </Col>

          <Col sm={6} lg={12} xl={6}>
            <FormGroup>
              <Label>{props.t("distnce_unit")}</Label>

              <div className="status-switch square-switch">
                <input
                  className="switcher"
                  type="checkbox"
                  id="distance-unit-switch"
                  switch="none"
                  checked={fields.distanceUnit === "km"}
                  onChange={() => {
                    handleChange &&
                      handleChange("distanceUnit")({
                        target: {
                          value: fields?.distanceUnit === "km" ? "miles" : "km",
                        },
                      })
                  }}
                />
                <label
                  htmlFor="distance-unit-switch"
                  data-on-label={props.t("KM")}
                  data-off-label={props.t("MILES")}
                />
              </div>
            </FormGroup>
          </Col>

          <Col sm={6} lg={12} xl={6}>
            <FormGroup>
              <Label>{props.t("remove_branding")}</Label>

              <div className="status-switch square-switch">
                <input
                  type="checkbox"
                  id="remove-branding-switch"
                  switch="none"
                  checked={fields.removeBranding}
                  onChange={() => {
                    handleChange &&
                      handleChange("removeBranding")({
                        target: {
                          value: !fields?.removeBranding,
                        },
                      })
                  }}
                />
                <label
                  htmlFor="remove-branding-switch"
                  data-on-label={props.t("YES")}
                  data-off-label={props.t("NO")}
                  id={`remove-branding-label`}
                />

                {currentPlan?.isTrial && (
                  <UncontrolledTooltip
                    placement="bottom"
                    target={`remove-branding-label`}
                  >
                    {props.t("upgrade")}
                  </UncontrolledTooltip>
                )}
              </div>
            </FormGroup>
          </Col>
          {/* <Col md={6}>
                <FormGroup>
                  <Label>{props.t("cod_wallet_limit")}</Label>

                  <Input
                    type="number"
                    // value={fields?.codWalletLimit}
                    onChange={handleChange("codWalletLimit")}
                    min={0}
                  />

                  <FormText>
                    {props.t("cod_wallet_limit_guide", {
                      delivery_boy: props.t(
                        // _STORE_SETTINGS_FORM.bookingAreaDriver
                        //   ? "driver"
                          // : 
                          "delivery_boy"
                      ),
                    })}
                  </FormText>
                </FormGroup>
              </Col> */}

          {!["basic"].includes(currentPlan?.billingPlan?.type) && (
            <Col sm={6} lg={12} xl={6}>
              <FormGroup>
                <Label className="text-capitalize">
                  {props.t("allow_vendor_auto_accept")}
                </Label>

                <div className="status-switch square-switch">
                  <input
                    type="checkbox"
                    id="vendor-auto-accept-switch"
                    switch="none"
                    checked={fields.orderAutoApproval}
                    onChange={() => {
                      handleChange &&
                        handleChange("orderAutoApproval")({
                          target: {
                            value: !fields?.orderAutoApproval,
                          },
                        })
                    }}
                  />
                  <label
                    htmlFor="vendor-auto-accept-switch"
                    data-on-label={props.t("YES")}
                    data-off-label={props.t("NO")}
                    id={`remove-branding-label`}
                  />
                </div>
              </FormGroup>
            </Col>
          )}
          {!["basic"].includes(currentPlan?.billingPlan?.type) && (
            <Col sm={6} lg={12} xl={6}>
              <FormGroup>
                <Label className="text-capitalize">
                  {props.t("allow_vendor_auto_cancel")}
                </Label>
                <div className="status-switch square-switch ">
                  <input
                    type="checkbox"
                    switch="none"
                    id="vendor-auto-cancel-switch"
                    checked={fields.orderAutoCancel}
                    onClick={() => {
                      handleChange &&
                        handleChange("orderAutoCancel")({
                          target: {
                            value: !fields?.orderAutoCancel,
                          },
                        })
                    }}
                  />
                  <label
                    htmlFor="vendor-auto-cancel-switch"
                    data-on-label={props.t("YES")}
                    data-off-label={props.t("NO")}
                    id={`remove-branding-label`}
                  />
                </div>
              </FormGroup>
            </Col>
          )}
          <Col md={6}>
            <FormGroup>
              <Label>{props.t("cod_wallet_limit")}</Label>

              <Input
                type="number"
                value={fields?.codWalletLimit}
                onChange={handleChange("codWalletLimit")}
                min={0}
              />

              <FormText>
                {props.t("cod_wallet_limit_guide", {
                  delivery_boy: props.t(
                    // _STORE_SETTINGS_FORM.bookingAreaDriver
                    //   ? "driver"
                    // :

                    slug === SLUGS_NAME.caterPlus
                      ? props.t("driver")
                      : slug === SLUGS_NAME.honeyWay
                      ? props.t("delivery_girl")
                      : props.t("delivery_boy")
                  ),
                })}
              </FormText>
            </FormGroup>
          </Col>
        </Row>
        {isShowStore?.length > 0 &&
          ["premium", "basic"].includes(currentPlan?.billingPlan?.type) &&
          props?.slug !== "topup-fuel" &&
          fields.storeTypeEnabled && (
            <>
              <Row className="mt-4">
                <Col md={12}>
                  <h5 className="text-uppercase">{props.t("store_type")}</h5>
                </Col>
              </Row>

              <hr className="mt-0 mb-3" />

              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label className="text-uppercase">
                      {props
                        .t(fields.storeTypeEnabled[0]?.storeType)
                        .toLowerCase()}
                    </Label>

                    <Input
                      placeholder={
                        fields.storeTypeEnabled[0]?.storeType ||
                        props.t("store_name")
                      }
                      onChange={handleSingleStoreType}
                      value={fields.storeTypeEnabled[0]?.label}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </>
          )}
        {isShowStore?.length > 0 &&
          !["premium", "basic"].includes(currentPlan?.billingPlan?.type) && (
            <>
              <Row className="mt-4">
                <Col md={12}>
                  <h5 className="text-uppercase">{props.t("store_type")}</h5>
                  {/* <small>{props.t("store_type_heading")}</small> */}
                </Col>
              </Row>

              <hr className="mt-0 mb-3" />
              {console.log(fields?.storeType, "fields?.storeType")}

              <Row>
                {fields?.storeType?.map((service, index) => {
                  if (service.hideStoreType == true)
                    return (
                      <Col key={service?._id} md={12}>
                        <FormGroup>
                          <Row className="mb-3 d-flex align-items-end">
                            {[SLUGS_NAME.oneTimeShop].includes(slug) && (
                              <Col xs={2} sm={2} md={2}>
                                <Label className="text-uppercase">
                                  {props.t("Order Number")}
                                </Label>
                                <Input
                                  type="number"
                                  name="orderNumber"
                                  min={1}
                                  max={11}
                                  // placeholder={props.t("Order Number")}
                                  value={service?.orderNumber}
                                  onChange={handleStoreType(
                                    "orderNumber",
                                    index
                                  )}
                                />
                              </Col>
                            )}
                            {[SLUGS_NAME.oneTimeShop].includes(slug) ? (
                              <Col xs={4} sm={4} md={4}>
                                <Label className="text-uppercase">
                                  {props.t(service?.storeType).toLowerCase()}
                                </Label>
                                <Input
                                  name="label"
                                  placeholder={
                                    service?.storeType || props.t("store_name")
                                  }
                                  value={service?.label}
                                  onChange={handleStoreType("label", index)}
                                />
                              </Col>
                            ) : (
                              <Col xs={7} sm={7} md={7}>
                                <Label className="text-uppercase">
                                  {props.t(service?.storeType).toLowerCase()}
                                </Label>
                                <Input
                                  name="label"
                                  placeholder={
                                    service?.storeType || props.t("store_name")
                                  }
                                  value={service?.label}
                                  onChange={handleStoreType("label", index)}
                                />
                              </Col>
                            )}
                            {[SLUGS_NAME.oneTimeShop].includes(slug) && (
                              <Col xs={3} sm={3} md={3}>
                                <Label className="text-uppercase">
                                  {props.t("discount_label")}
                                </Label>
                                <Input
                                  name="storeDiscountLabel"
                                  // placeholder={
                                  //   service?.storeType || props.t("store_name")
                                  // }
                                  value={service?.storeDiscountLabel}
                                  onChange={handleStoreType(
                                    "storeDiscountLabel",
                                    index
                                  )}
                                />
                              </Col>
                            )}
                            <Col xs={3} sm={3} md={3} className="px-lg-1">
                              <div className="status-switch square-switch d-flex">
                                <input
                                  type="checkbox"
                                  id={`square-switch1-${service?._id}`}
                                  switch="none"
                                  checked={storeTypes?.includes(service?._id)}
                                  onChange={() =>
                                    handleStoreTypes &&
                                    handleStoreTypes(
                                      service?._id,
                                      !storeTypes?.includes(service?._id)
                                    )
                                  }
                                />
                                <label
                                  htmlFor={`square-switch1-${service?._id}`}
                                  data-on-label={props.t("enable")}
                                  data-off-label={props.t("disable")}
                                  id={`service-label-${service?._id}`}
                                />

                                {["premium", "basic"].includes(
                                  currentPlan?.billingPlan?.type
                                ) &&
                                  !storeTypes?.includes(service?._id) && (
                                    <UncontrolledTooltip
                                      placement="top"
                                      target={`service-label-${service?._id}`}
                                    >
                                      {props.t("upgrade")}
                                    </UncontrolledTooltip>
                                  )}
                              </div>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    )
                })}
              </Row>
            </>
          )}
      </Col>
    </Row>
  )
}

GeneralSettings.propTypes = {
  fields: PropTypes.object,
  storeTypes: PropTypes.array,
  storeVendors: PropTypes.object,
  handleChange: PropTypes.func,
  handleStoreOrder: PropTypes.func,
  handleStoreType: PropTypes.func,
  handleStoreTypes: PropTypes.func,
  handleStoreVendors: PropTypes.func,
}

const mapStateToProps = ({ Login, Billing, Register, Settings }) => ({
  countries: Login?.countries,
  timezones: Login?.timezones,
  allLanguages: Login?.languages,
  allCurrencies: Login?.currencies,
  languages: Settings?.settings?.storeLanguage,
  currencies: Settings?.settings?.storeCurrency,
  currentPlan: Billing.currentPlan,
  storeNameFailed: Register.storeNameValid,
  storeNameLoading: Register.storeNameLoading,
  googleMapKey:
    process.env.NODE_ENV === "development"
      ? "AIzaSyAxlXaOet7nyJcEJQw_SXFuK2EnRMw0zbg"
      : Settings?.settings?.googleMapKey?.web,
  slug: Settings?.settings?.slug,
})

const mapDispatchToProps = dispatch => ({
  onStoreName: data => dispatch(registerStoreName(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GeneralSettings)
)
