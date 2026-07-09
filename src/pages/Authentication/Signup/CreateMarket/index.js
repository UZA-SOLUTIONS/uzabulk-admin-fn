import React, { useRef, useState } from "react"
import { connect } from "react-redux"
import queryString from "query-string"
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete"

import { registerStoreName } from "store/actions"

import PaymentDetails from "./PaymentDetails"

const CreateMarket = props => {
  const {
    setactiveTab,
    fields,
    handleChange,
    storeNameFailed,
    storeNameLoading,
  } = props

  const storeNameTimeout = useRef(null)

  const [addressValue, setAddressValue] = useState(null)

  const onStoreNameChange = e => {
    if (storeNameTimeout.current) {
      clearTimeout(storeNameTimeout.current)
      storeNameTimeout.current = null
    }

    storeNameTimeout.current = setTimeout(() => {
      props?.registerStoreName({ storeName: e?.target?.value })
    }, 1000)

    handleChange("storeName")(e)
  }

  const handleAddressChange = data => {
    setAddressValue(data)

    handleChange("address")({ target: { value: data?.label } })

    if (!data?.value?.place_id) {
      handleChange("lat")({ target: { value: 0 } })
      handleChange("lng")({ target: { value: 0 } })
      return
    }

    geocodeByPlaceId(data.value.place_id)
      .then(results => {
        const result = results[0]

        if (!result) return

        handleChange("lat")({
          target: { value: result.geometry.location.lat() },
        })
        handleChange("lng")({
          target: { value: result.geometry.location.lng() },
        })
      })
      .catch(error => console.error(error))
  }

  return (
    <div className="tab step_3design" id="step3">
      <div className="row" id="step_3design">
        <div className="col-lg-12">
          <h1>{props.t("create_marketplace_heading")}</h1>
        </div>

        <div className="col-lg-12">
          <div className="input-group has-validation position-relative">
            <label>{props.t("store_name")}<span className="text-danger ml-1">*</span></label>
            <input
              className={
                storeNameFailed === null
                  ? ""
                  : !storeNameFailed
                  ? "invalid"
                  : "valid"
              }
              type="text"
              value={fields?.storeName}
              required
              onChange={onStoreNameChange}
            />
            <div class="invalid-tooltip">{storeNameFailed}</div>
          </div>
        </div>

        {props?.plan && props?.plan === "basic" && (
          <div className="col-lg-12">
            <div className="input-group">
              <label>{props.t("address")}</label>

              <GooglePlacesAutocomplete
                apiKey={props?.googleMapKey}
                selectProps={{
                  isClearable: true,
                  inputId: "address-select",
                  className: "w-100",
                  classNamePrefix: "signup-address-selection",
                  value: addressValue,
                  onChange: handleAddressChange,
                  placeholder: props.t("address_placeholder"),
                  components: {
                    IndicatorSeparator: false,
                    DropdownIndicator: false,
                  },
                  styles: {
                    valueContainer: prevStyles => ({
                      ...prevStyles,
                      padding: "0 20px",
                    }),
                  },
                }}
              />
            </div>
          </div>
        )}

        <div className="col-lg-12">
          <div className="input-group">
            <label>{props.t("country")}</label>
            <select
              value={`${fields?.country}-${fields?.countryCode}`}
              onChange={e => {
                const { value } = e.target
                const values = value?.split("-")

                handleChange("country")({
                  target: { value: values[0] },
                })
                handleChange("countryCode")({
                  target: { value: values[1] },
                })
              }}
            >
              <option value="">{props.t("select_country")}</option>
              {props?.countries?.map(option => (
                <option value={`${option?.code}-${option?.cc}`}>
                  {option?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="input-group">
            <label>{props.t("currency")}</label>

            <select
              value={`${fields?.currency?.code}-${fields?.currency?.sign}`}
              onChange={e => {
                const { value } = e.target
                const values = value?.split("-")

                handleChange("currency")({
                  target: { value: { code: values[0], sign: values[1] } },
                })
              }}
            >
              <option value="">{props.t("currency_value")}</option>
              {props?.currencies?.map(currency => (
                <option value={`${currency.code}-${currency.name}`}>
                  {currency.name} {currency.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="input-group">
            <label>{props.t("timezone")}</label>

            <select
              value={fields?.timezone}
              onChange={handleChange("timezone")}
            >
              <option value="">{props.t("select_timezone")}</option>
              {props?.timezones?.map(timezone => (
                <option value={timezone.code}>{timezone.name}</option>
              ))}
            </select>
          </div>
        </div>

        {!!props?.plan && !props.isTrial && <PaymentDetails />}

        <div className="col-lg-12">
          <div className="flex-btn">
            <button
              type="button"
              className="themebtnblack fullwidthbtn"
              id="backstep2"
              onClick={() => setactiveTab(2)}
            >
              {props.t("back")}
            </button>

            <button
              type="submit"
              className="themebtn fullwidthbtn"
              id="nextBtn"
            >
              {props.t("create_marketplace")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ Login, Register,Settings }) => ({
  countries: Login?.countries,
  languages: Login?.languages,
  timezones: Login?.timezones,
  currencies: Login?.currencies,
  storeNameFailed: Register.storeNameValid,
  storeNameLoading: Register.storeNameLoading,
  googleMapKey: process.env.NODE_ENV === "development"
  ? "AIzaSyAxlXaOet7nyJcEJQw_SXFuK2EnRMw0zbg"
  : Settings?.settings?.googleMapKey?.web,
})

export default connect(mapStateToProps, { registerStoreName })(CreateMarket)
