import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Button,
} from "reactstrap"
import Instructions from "./Instructions"
import { useShowThings } from "helpers/show-things"

const TaxSettings = props => {
  const {
    fields,
    handleChange,
    activestore,
    setter,
    allData,
    advancedTaxPrice,
    setAdvancedTaxPrice,
    settings,
  } = props

  //setter  ----> setter of all setting page
  // allData --> state(fields) of  setting page

  const handlePercentageChange = e => {
    handleChange("taxSettings")({
      target: {
        value: {
          ...fields,
          percentage: e.target.value > 100 ? 100 : e.target.value,
        },
      },
    })
  }
  // console.log(fields, "fields");

  const handleStatusChange = label => value => {
    handleChange("taxSettings")({
      target: { value: { ...fields, [label]: value } },
    })
  }

  const handleAdvanceTaxSettings = name => index => e => {
    e.preventDefault()
    var value = e.target.value
    if (name === "percentage") {
      value = Math.abs(value > 100 ? 100 : value)
    }

    setter(prev => ({
      ...prev,
      advanceTaxSettings: [
        ...prev.advanceTaxSettings.slice(0, index),
        { ...prev.advanceTaxSettings[index], [name]: value },
        ...prev.advanceTaxSettings.slice(index + 1),
      ],
    }))
  }

  const addAdvancedSettingHandler = () => {
    setter(pre => ({
      ...pre,
      advanceTaxSettings: [
        ...pre.advanceTaxSettings,
        { name: "", percentage: "" },
      ],
    }))
  }

  const deleteAdvancedSettingHandler = index => {
    console.log("indexdddddddd", index)
    setter(prev => ({
      ...prev,
      advanceTaxSettings: [
        ...prev.advanceTaxSettings.splice(0, index),
        ...prev.advanceTaxSettings.splice(index + 1),
      ],
    }))
  }

  // const _handleRemoveClick = i => {
  //   const list = [...fields.storeLink]
  //   list.splice(i, 1)
  //   setFields(prev => ({
  //     ...prev,
  //     storeLink: list,
  //   }))
  // }

  let advancedsettinglength = allData?.AdvanceTaxSettings?.length

  console.log("advancedsettinglength", advancedsettinglength)
  useEffect(() => {
    setAdvancedTaxPrice(
      allData?.advanceTaxSettings?.reduce(
        (acc, curr) => acc + (curr.percentage || 0),
        0
      )
    )
  }, [allData?.advanceTaxSettings])

  const showThings = useShowThings()

  return (
    activestore?.storeType !== "SERVICEPROVIDER" && (
      <Row>
        <Col lg={4}>
          <Instructions fields={props?.store} t={props.t} />
        </Col>

        <Col lg={8}>
          <Form>
            <Row>
              {props._STORE_SETTINGS_FORM.taxLevel &&
                activestore?.storeType !== "SERVICEPROVIDER" && (
                  <Col sm={6} lg={12} xl={6}>
                    <FormGroup>
                      <Label className="text-capitalize">
                        {props.t("level")}
                      </Label>
                      <div className="status-switch square-switch">
                        <input
                          disabled={true}
                          className="switcher"
                          type="checkbox"
                          id="tax-level"
                          switch="none"
                          checked={fields?.level === "store"}
                          onChange={() => {
                            if (activestore?.storeType === "TAXI") {
                              handleStatusChange("level")("store")
                            } else {
                              handleStatusChange("level")(
                                fields?.level === "store" ? "vendor" : "store"
                              )
                            }
                          }}
                        />
                        <label
                          htmlFor="tax-level"
                          data-on-label={props.t("admin")}
                          data-off-label={props.t("vendor")}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                )}

              {props._STORE_SETTINGS_FORM.taxLevel &&
                fields?.level === "store" && (
                  <Col sm={6} lg={12} xl={6}>
                    <FormGroup>
                      <Label for="formrow-tax-input">
                        {props.t("tax_amount")}
                      </Label>

                      <InputGroup>
                        <Input
                          id="formrow-tax-input"
                          type="number"
                          value={
                            !allData?.isAdvanceTaxSetting
                              ? fields.percentage
                              : advancedTaxPrice
                          }
                          onChange={handlePercentageChange}
                          step={0.01}
                          min={0}
                        />

                        <div className="input-group-append">
                          <span className="input-group-text">%</span>
                        </div>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                )}
              {props._STORE_SETTINGS_FORM.taxLevel &&
                fields?.level === "store" &&
                showThings["isAdvanceTaxSetting"] && (
                  <>
                    <Col md={12} xl={12}>
                      <FormGroup>
                        <Label>{props.t("advance_setting")}</Label>
                        <div className="status-switch square-switch">
                          <input
                            id="advance-setting"
                            type="checkbox"
                            switch="none"
                            checked={allData?.isAdvanceTaxSetting}
                            onChange={() => {
                              handleChange &&
                                handleChange("isAdvanceTaxSetting")({
                                  target: {
                                    value: !allData?.isAdvanceTaxSetting,
                                  },
                                })
                            }}
                          />
                          <label
                            htmlFor="advance-setting"
                            data-on-label={props.t("On")}
                            data-off-label={props.t("Off")}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                  </>
                )}
              {/* {console.log(allData, "ALLDATA")} */}
              {showThings["isAdvanceTaxSetting"] &&
                props._STORE_SETTINGS_FORM.taxLevel &&
                fields?.level === "store" &&
                allData?.isAdvanceTaxSetting && (
                  <>
                    {/* <Label>{props.t("name")}</Label> */}
                    {allData?.advanceTaxSettings?.map((ad, index) => {
                      return (
                        <>
                          <Col md={5} className="mt-2">
                            <Label>
                              {props.t("name")}
                              <span className="text-danger ml-1">*</span>
                            </Label>

                            <Input
                              id="formrow-tax-input"
                              type="text"
                              required
                              onChange={handleAdvanceTaxSettings("name")(index)}
                              value={ad?.name}
                            />
                          </Col>
                          <Col md={5} className="mt-2">
                            {/* </InputGroup> */}
                            <Label>
                              {props.t("percentage")}
                              <span className="text-danger ml-1">*</span>
                            </Label>
                            <InputGroup>
                              <Input
                                id="formrow-tax-input"
                                type="number"
                                required
                                max=""
                                value={ad?.percentage}
                                onChange={handleAdvanceTaxSettings(
                                  "percentage"
                                )(index)}
                              />
                              <div className="input-group-append">
                                <span className="input-group-text">%</span>
                              </div>
                            </InputGroup>
                          </Col>
                          <Col md={2}>
                            <Button
                              color={
                                advancedsettinglength > 1
                                  ? "danger"
                                  : "secondary"
                              }
                              size="sm"
                              className="mt-4"
                              onClick={e => {
                                // e.preventDefault()
                                deleteAdvancedSettingHandler(index)
                              }}
                            >
                              Remove
                            </Button>
                          </Col>
                        </>
                      )
                    })}
                    <Col md={2} lg={2}>
                      <Button
                        className="mt-4"
                        onClick={addAdvancedSettingHandler}
                      >
                        Add
                      </Button>
                    </Col>
                  </>
                )}

              {!props._STORE_SETTINGS_FORM.taxLevel && (
                <Col sm={6} lg={12} xl={6}>
                  <FormGroup>
                    <Label for="formrow-tax-input">
                      {props.t("tax_amount")}
                    </Label>

                    <InputGroup>
                      <Input
                        id="formrow-tax-input"
                        type="number"
                        value={fields?.percentage}
                        onChange={handlePercentageChange}
                        step={0.01}
                        min={0}
                      />

                      <div className="input-group-append">
                        <span className="input-group-text">%</span>
                      </div>
                    </InputGroup>
                  </FormGroup>
                </Col>
              )}
            </Row>
          </Form>
        </Col>
      </Row>
    )
  )
}

TaxSettings.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ Settings }) => ({
  settings: Settings.settings,
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TaxSettings)
)
