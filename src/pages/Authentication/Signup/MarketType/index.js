import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import { API_BASE_URL } from "helpers/api_helper"
import { LEARN_MORE_LINK, INTERVAL } from "helpers/contants"

import Select from "react-select"

const Market = props => {
  const { setactiveTab, storeTypes, fields, handleChange, apiError } = props

  const [markets, setmarkets] = useState([])
  const [storeVendorType, setstoreVendorType] = useState("SINGLE")

  useEffect(() => {
    if (props?.planType === "premium") {
      setstoreVendorType("AGGREAGATOR")
    } else if (props?.planType === "ultimate") {
      setstoreVendorType("MULTI-AGGREAGATOR")
    } else {
      setstoreVendorType("SINGLE")
    }
  }, [props?.planType])

  useEffect(() => {
    let value = ""

    switch (storeVendorType) {
      case "AGGREAGATOR":
        value = "premium"
        break

      case "MULTI-AGGREAGATOR":
        value = "ultimate"
        break

      default:
        value = "basic"
        break
    }

    handleChange("storeTypeSelect")({ target: { value } })
  }, [storeVendorType])

  useEffect(() => {
    let value = ""

    switch (storeVendorType) {
      case "AGGREAGATOR":
        value = "premium"
        break

      case "MULTI-AGGREAGATOR":
        value = "ultimate"
        break

      default:
        value = "basic"
        break
    }

    handleChange("storeTypeSelect")({ target: { value } })
  }, [storeVendorType])

  useEffect(() => {
    if (fields?.storeType) {
      if (Object.entries(fields?.storeType)?.length > 1) {
        setstoreVendorType("MULTI-AGGREAGATOR")
      } else if (Object.entries(fields?.storeType)?.length > 0) {
        setstoreVendorType(Object.entries(fields?.storeType)[0][1])
      }

      setmarkets(
        Object.entries(fields?.storeType)?.map(([key]) => ({
          label: key,
          value: key,
        }))
      )
    }
  }, [])

  const handleMarketChange = markets => {
    const value = {}

    markets?.map(market => { value[market.value] = storeVendorType === "MULTI-AGGREAGATOR"
          ? "AGGREAGATOR" : storeVendorType
    })
    handleChange("storeType")({
      target: { value },
    })

    setmarkets(markets)
  }

  


  function handleStoreVendor(vendorType) {
    setstoreVendorType(vendorType)

    handleMarketChange([])
  }

  function handleNext() {
    if (markets?.length <= 0) {
      window.scrollTo(0, 0)
      return apiError(props.t("marketplace_required"))
    }

    if (props?.planType) {
      if (
        ["premium", "basic"].includes(props.planType) &&
        markets?.length > 1
      ) {
        window.scrollTo(0, 0)
        return apiError(props.t("only_1_store_allowed"))
      }

      if (props?.planType === "basic" && storeVendorType !== "SINGLE") {
        window.scrollTo(0, 0)
        return apiError(props.t("only_single_vendor_allowed"))
      }
    }

    apiError("")

    setactiveTab(3)
  }

  return (
    <div className="tab" id="step2">
      <div className="row">
        <div className="col-lg-12">
          <h1>{props.t("marketplace_heading")}</h1>
        </div>

        <div className="col-lg-12">
          <div className="input-group">
            <label className="flex">
              {props.t("marketplace_type")}{" "}
              <a href={LEARN_MORE_LINK} target="_blank">
                {props.t("learn_more")}
              </a>
            </label>

            <div className="invisible-checkboxes" id="after_newdesign">
              {props.product === "store" &&
                (props.planType ? props.planType === "basic" : true) && (
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="marketplacelist ">
                        <input
                          type="radio"
                          name="rGroup"
                          value="1"
                          id="r1"
                          checked={storeVendorType === "SINGLE"}
                          onChange={() => handleStoreVendor("SINGLE")}
                        />
                        <label className="checkbox-alias" for="r1">
                          <div className="topslider" id="toggleslide1">
                            <h3>
                              {props.t("basic")}{" "}
                              {props.price &&
                                "$" +
                                  (Number(props.price) +
                                    Number(props.setupFee || 0))}{" "}
                              {INTERVAL[props.interval]}
                            </h3>
                            <p>{props.t("basic_heading")}</p>
                          </div>

                          <div className="hidden-list" id="hiddenlist1">
                            <div className="customer_selectbox react-select">
                              <Select
                                classNamePrefix="store-type"
                                options={storeTypes?.map(store => ({
                                  label: store?.storeType,
                                  value: store?.storeType,
                                }))}
                                value={markets}
                                onChange={data => handleMarketChange([data])}
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

              {props.product === "marketplace" && (
                <>
                  {(props?.planType ? props?.planType === "premium" : true) && (
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="marketplacelist">
                          <div className="fruits-div">
                            <input
                              type="radio"
                              name="rGroup"
                              value="2"
                              id="r2"
                              checked={storeVendorType === "AGGREAGATOR"}
                              onChange={() => handleStoreVendor("AGGREAGATOR")}
                            />
                            <label className="checkbox-alias" for="r2">
                              <div className="topslider" id="toggleslide2">
                                <h3>
                                  {props.t("premium")}{" "}
                                  {props?.price &&
                                    "$" +
                                      (Number(props.price) +
                                        Number(props.setupFee || 0))}{" "}
                                  {INTERVAL[props.interval]}
                                </h3>
                                <p>{props.t("premium_heading")}</p>
                              </div>
                              <div className="hidden-list" id="hiddenlist2">
                                <div className="customer_selectbox react-select">
                                  <Select
                                    classNamePrefix="store-type"
                                    options={storeTypes?.map(store => ({
                                      label: store?.storeType,
                                      value: store?.storeType,
                                    }))}
                                    value={markets}
                                    onChange={data =>
                                      handleMarketChange([data])
                                    }
                                  />
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {(props?.planType
                    ? props?.planType === "ultimate"
                    : true) && (
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="marketplacelist ">
                          <input
                            type="radio"
                            name="rGroup"
                            value="3"
                            id="r3"
                            checked={storeVendorType === "MULTI-AGGREAGATOR"}
                            onChange={() =>
                              handleStoreVendor("MULTI-AGGREAGATOR")
                            }
                          />
                          <label className="checkbox-alias" for="r3">
                            <div className="topslider" id="toggleslide3">
                              <h3>
                                {props.t("ultimate")}{" "}
                                {props?.price &&
                                  "$" +
                                    (Number(props.price) +
                                      Number(props.setupFee || 0))}{" "}
                                {INTERVAL[props.interval]}
                              </h3>
                              <p>{props.t("ultimate_heading")}</p>
                            </div>
                            <div className="hidden-list" id="hiddenlist3">
                              <div className="customer_selectbox react-select">
                                <Select
                                  isMulti
                                  classNamePrefix="store-type"
                                  options={storeTypes?.map(store => ({
                                    label: store?.storeType,
                                    value: store?.storeType,
                                  }))}
                                  value={markets}
                                  onChange={data => handleMarketChange(data)}
                                />
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <p>{props.t("change_marketplace_text")}</p>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="flex-btn">
            <button
              type="button"
              className="themebtnblack fullwidthbtn"
              onClick={() => setactiveTab(1)}
            >
              {props.t("back")}
            </button>

            <button
              type="button"
              className="themebtn fullwidthbtn"
              onClick={handleNext}
            >
              {props.t("next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ Settings }) => ({
  loading: Settings.loading,
  storeTypes: Settings.storeTypes,
})

export default connect(mapStateToProps)(Market)
