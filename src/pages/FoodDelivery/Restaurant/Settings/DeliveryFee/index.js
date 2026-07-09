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
  FormText,
} from "reactstrap"
import Instructions from "./Instructions"
import { SLUGS_NAME } from "helpers/contants"

const DeliveryFee = props => {
  const {
    activeStoreType,
    fields,
    handleChange,
    handleChangeNested,
    hideRestaurantName,
    slug,
    deliveryFee,
    CommissionChange,
    stateCommission,
    CommissionChangeStatus,
    t,
  } = props
  let showHideCommisionOnDeliveryType =
    props?.hide?.filter(
      user =>
        user?.type == "showHideCommisionOnDeliveryType" && user?.value == true
    ).length > 0
  console.log(deliveryFee?.freeType, "murga")

  return (
    <Row>
      <Col lg={4}>
        <Instructions
          t={props.t}
          hideRestaurantName={hideRestaurantName}
          slug={slug}
        />
      </Col>

      <Col lg={8}>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label className="text-capitalize">
                  {props.t("delivery_fee_type")}
                </Label>

                <div className={`switch-md square-switch`}>
                  <input
                    type="checkbox"
                    id="deliveryfee-type-switch"
                    switch="none"
                    checked={fields?.deliveryFeeType === "global"}
                    onChange={() => {
                      handleChangeNested &&
                        handleChangeNested("deliveryFeeType")({
                          target: {
                            value:
                              fields?.deliveryFeeType === "global"
                                ? "override"
                                : "global",
                          },
                        })
                    }}
                  />
                  <label
                    className="text-capitalize"
                    htmlFor="deliveryfee-type-switch"
                    data-on-label={props.t("global")}
                    data-off-label={props.t("override")}
                  />
                </div>
              </FormGroup>
            </Col>
            {fields?.deliveryFeeType === "override" && (
              <>
                {activeStoreType?.storeVendorType !== "SINGLE" && (
                  <>
                    <Col md={6}>
                      <FormGroup>
                        {showHideCommisionOnDeliveryType &&
                          [
                            "FOOD",
                            "MEDICINE",
                            "PIZZA",
                            "FLOWER",
                            "HOTEL",
                            "GROCERY",
                            "MEAT",
                            "LEQUQR",
                            "CAR RENTAL",
                          ].includes(activeStoreType.storeType) && (
                            <div className="status-switch square-switch d-flex flex-column">
                              <label>{props.t("free_delivery")}</label>
                              <input
                                type="checkbox"
                                switch="none"
                                id="vegan-commission1"
                                checked={deliveryFee?.isFreeDelivery}
                                onChange={() => {
                                  handleChange &&
                                    handleChange("isFreeDelivery")({
                                      target: {
                                        value: !deliveryFee?.isFreeDelivery,
                                      },
                                    })
                                }}
                              />
                              <label
                                htmlFor="vegan-commission1"
                                data-on-label={props.t("on")}
                                data-off-label={props.t("off")}
                              />
                            </div>
                          )}
                      </FormGroup>
                    </Col>
                  </>
                )}
              </>
            )}
          </Row>
          {fields?.deliveryFeeType === "override" && (
            <Row>
              {deliveryFee?.isFreeDelivery === false &&
              [
                "FOOD",
                "MEDICINE",
                "PIZZA",
                "FLOWER",
                "HOTEL",
                "GROCERY",
                "MEAT",
                "LEQUQR",
                "CAR RENTAL",
              ].includes(activeStoreType.storeType) ? (
                <Row className="align-items-center justify-content-between">
                  <Col xs={6} sm={3} md={4} xl={3} className="pr-0">
                    <FormGroup>
                      <Label>{props.t("discount_type")}</Label>

                      <div className="status-switch square-switch">
                        <input
                          type="checkbox"
                          id="discount-type"
                          switch="none"
                          checked={deliveryFee?.freeType == "flat"}
                          onChange={() => {
                            const value =
                              deliveryFee?.freeType == "flat"
                                ? "percent"
                                : "flat"
                            if (value == "percent") {
                              handleChange("value")({ target: { value: 0 } })
                            }

                            handleChange("freeType")({
                              target: { value },
                            })
                          }}
                        />
                        <label
                          htmlFor="discount-type"
                          data-on-label={props.t("flat")}
                          data-off-label={props.t("percent")}
                        />
                      </div>
                    </FormGroup>
                  </Col>

                  <Col xs={6} sm={9} md={7} xl={7} className="pl-0">
                    <FormGroup>
                      <Label for="formrow-amount-Input">
                        {props.t("amount")}
                        <span className="text-danger ml-1">*</span>
                      </Label>
                      <Input
                        type="number"
                        className="form-control"
                        id="formrow-amount-Input"
                        value={deliveryFee?.value}
                        // onChange={handleChange("value")}
                        onChange={
                          deliveryFee?.freeType == "percent"
                            ? e => {
                                const { value } = e.target

                                if (value > 100) return
                                handleChange("value")(e)
                              }
                            : handleChange("value")
                        }
                        step={0.01}
                        min={0}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
              ) : (
                <>
                  {/* {activeStoreType?.storeVendorType !== "SINGLE" &&
                  activeStoreType?.storeType !== "SERVICEPROVIDER" && (
                    <Col md={4}>
                      <FormGroup>
                        <Label for="formrow-vendor-input">
                          {props.t("vendor")}
                        </Label>

                        <InputGroup>
                          <Input
                            id="formrow-vendor-input"
                            type="number"
                            value={fields?.vendor}
                            onChange={e => {
                              const { value } = e.target

                              if (value > 100) return
                              handleChange("vendor")(e)
                            }}
                            min={0}
                            step={0.01}
                          />

                          <div className="input-group-append">
                            <span className="input-group-text">%</span>
                          </div>
                        </InputGroup>
                        <FormText>
                          {`${100 - fields?.vendor}% ${props.t(
                            "admin_commission"
                          )}`}
                        </FormText>
                      </FormGroup>
                    </Col>
                  )} */}
                  {/* {activeStoreType?.storeType !== "CARRENTAL" && (
                  <Col md={4}>
                    <FormGroup>
                      <Label for="formrow-delivery-boy-input">
                        {activeStoreType?.storeType === "SERVICEPROVIDER"
                          ? props.t("service_provider")
                          : props.t(
                              slug === SLUGS_NAME.caterPlus
                                ? "driver"
                                : "delivery_boy"
                            )}
                      </Label>

                      <InputGroup>
                        <Input
                          id="formrow-delivery-boy-input"
                          type="number"
                          value={fields?.deliveryBoy}
                          onChange={e => {
                            const { value } = e.target

                            if (value > 100) return
                            handleChange("deliveryBoy")(e)
                          }}
                          min={0}
                          step={0.01}
                        />

                        <div className="input-group-append">
                          <span className="input-group-text">%</span>
                        </div>
                      </InputGroup>
                      <FormText>
                        {`${100 - fields?.deliveryBoy}% ${props.t(
                          "admin_commission"
                        )}`}
                      </FormText>
                    </FormGroup>
                  </Col>
                )} */}
                </>
              )}

              {/* <Col md={6}>
              <FormGroup>
                <Label className="text-capitalize">
                  {props.t("commission_transfer")}
                </Label>

                <div className="status-switch square-switch">
                  <input
                    className="switcher"
                    type="checkbox"
                    id="commission-transfer"
                    switch="none"
                    checked={fields?.commissionTransfer === "online"}
                    onChange={() => {
                      handleChange &&
                        handleChange("commissionTransfer")({
                          target: {
                            value: fields?.commissionTransfer === "online" ? "offline" : "online",
                          },
                        })
                    }}
                  />
                  <label
                    htmlFor="commission-transfer"
                    data-on-label={props.t("online")}
                    data-off-label={props.t("offline")}
                  />
                </div>
              </FormGroup>
            </Col>

            {fields?.commissionTransfer === "online" && <Col md={6}>
              <FormGroup>
                <Label className="text-capitalize">
                  {props.t("payout_schedule")}
                </Label>

                <div className="switch-xl square-switch">
                  <input
                    className="switcher"
                    type="checkbox"
                    id="payout-schedule"
                    switch="none"
                    checked={fields?.payoutSchedule === "realtime"}
                    onChange={() => {
                      handleChange &&
                        handleChange("payoutSchedule")({
                          target: {
                            value: fields?.payoutSchedule === "realtime" ? "later" : "realtime",
                          },
                        })
                    }}
                  />
                  <label
                    htmlFor="payout-schedule"
                    data-on-label={props.t("realtime")}
                    data-off-label={props.t("later")}
                  />
                </div>
              </FormGroup>
            </Col>}

            {fields?.commissionTransfer === "online" && fields?.payoutSchedule === "later" && <Col md={6}>
              <FormGroup>
                <Label for="formrow-schedule-days">
                  {props.t("schedule_days")}
                </Label>

                <InputGroup>
                  <Input
                    id="formrow-schedule-days"
                    type="number"
                    value={fields?.scheduleDays}
                    onChange={e => {
                      handleChange("scheduleDays")(e)
                    }}
                  />

                  <div className="input-group-append">
                    <span className="input-group-text">{props.t("days")}</span>
                  </div>
                </InputGroup>
              </FormGroup>
            </Col>} */}
            </Row>
          )}
        </Form>
      </Col>
    </Row>
  )
}

DeliveryFee.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ Settings }) => ({
  slug: Settings?.settings?.slug,

  // hide: Settings?.settings?.hid,
  hide: Settings?.settings?.hideThings,
  Settings: Settings?.storeType,
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeliveryFee)
)
