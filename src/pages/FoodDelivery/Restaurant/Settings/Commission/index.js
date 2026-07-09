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
import { SLUGS_NAME as slugname } from "helpers/contants"

const TimeSlot = props => {
  const {
    activeStoreType,
    fields,
    handleChange,
    hideRestaurantName,
    slug,

    CommissionChange,
    stateCommission,
    CommissionChangeStatus,
    t,
  } = props
  console.log(fields?.commisionType, "nibbi")
  let showHideCommisionOnDeliveryType =
    props?.hide?.filter(
      user =>
        user?.type == "showHideCommisionOnDeliveryType" && user?.value == true
    ).length > 0
  console.log(activeStoreType, "resss")

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
                  {props.t("commision_type")}
                </Label>

                <div className={`switch-md square-switch`}>
                  <input
                    type="checkbox"
                    id="commision-type-switch"
                    switch="none"
                    checked={fields?.commisionType === "global"}
                    onChange={() => {
                      handleChange &&
                        handleChange("commisionType")({
                          target: {
                            value:
                              fields?.commisionType === "global"
                                ? "override"
                                : "global",
                          },
                        })
                    }}
                  />
                  <label
                    className="text-capitalize"
                    htmlFor="commision-type-switch"
                    data-on-label={props.t("global")}
                    data-off-label={props.t("override")}
                  />
                </div>
              </FormGroup>
            </Col>
            {fields?.commisionType === "override" &&
              [slugname.oneTimeShop].includes(slug) && (
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
                              <div className="status-switch square-switch">
                                <label>{props.t("commission-des")}</label>
                                <input
                                  type="checkbox"
                                  switch="none"
                                  id="vegan-commission"
                                  checked={
                                    stateCommission?.commissionOnDeliveryType
                                      ?.status === true
                                  }
                                  onChange={() =>
                                    CommissionChangeStatus("status")(
                                      !stateCommission?.commissionOnDeliveryType
                                        ?.status
                                    )
                                  }
                                />
                                <label
                                  htmlFor="vegan-commission"
                                  data-on-label={props.t("on")}
                                  data-off-label={props.t("off")}
                                />
                              </div>
                            )}
                        </FormGroup>
                      </Col>
                      {stateCommission?.commissionOnDeliveryType?.status ===
                        false && (
                        <Col md={6}>
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
                                  handleChange("commission")({
                                    target: {
                                      value: {
                                        vendor: value,
                                        deliveryBoy: fields.deliveryBoy,
                                      },
                                    },
                                  })
                                }}
                                min={0}
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
                      )}
                    </>
                  )}
                </>
              )}
          </Row>
          {fields?.commisionType === "override" && (
            <Row>
              {stateCommission?.commissionOnDeliveryType?.status === true &&
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
                ].includes(activeStoreType.storeType) &&
                [slugname.oneTimeShop].includes(slug) && (
                  <Row className="align-items-center">
                    <Col md="4">
                      <label className="d-block m-0 fw-bold">Delivery : </label>
                    </Col>
                    <Col md="4">
                      <label>
                        {props.t("vendor")}

                        <InputGroup>
                          <Input
                            type="number"
                            name="vendor"
                            value={
                              stateCommission.commissionOnDeliveryType.delivery
                                .vendor
                            }
                            onChange={e => {
                              const { value } = e.target

                              if (value > 100) return
                              CommissionChange(e, "delivery")
                            }}
                            step={0.01}
                            min={0}
                          />

                          <div className="input-group-append">
                            <span className="input-group-text">%</span>
                          </div>
                        </InputGroup>
                        <FormText>
                          {`${
                            100 -
                            stateCommission.commissionOnDeliveryType.delivery
                              .vendor
                          }% ${props.t("admin_commission")}`}
                        </FormText>
                      </label>
                    </Col>
                    <Col md="4">
                      <label className="d-block">
                        {props.t("delivery-boy")}

                        <InputGroup>
                          <Input
                            type="number"
                            name="deliveryBoy"
                            value={
                              stateCommission.commissionOnDeliveryType.delivery
                                .deliveryBoy
                            }
                            onChange={e => {
                              const { value } = e.target

                              if (value > 100) return
                              CommissionChange(e, "delivery")
                            }}
                            step={0.01}
                            min={0}
                          />

                          <div className="input-group-append">
                            <span className="input-group-text">%</span>
                          </div>
                        </InputGroup>
                        <FormText>
                          {`${
                            100 -
                            stateCommission.commissionOnDeliveryType.delivery
                              .deliveryBoy
                          }% ${props.t("admin_commission")}`}
                        </FormText>
                      </label>
                    </Col>
                    <Col md="4">
                      <label className="d-block m-0  fw-bold">Takeaway :</label>
                    </Col>
                    <Col md="8">
                      <label>
                        {props.t("vendor")}

                        <InputGroup>
                          <Input
                            type="number"
                            name="vendor"
                            value={
                              stateCommission.commissionOnDeliveryType.takeway
                                .vendor
                            }
                            onChange={e => {
                              const { value } = e.target

                              if (value > 100) return
                              CommissionChange(e, "takeway")
                            }}
                            step={0.01}
                            min={0}
                          />

                          <div className="input-group-append">
                            <span className="input-group-text">%</span>
                          </div>
                        </InputGroup>
                        <FormText>
                          {`${
                            100 -
                            stateCommission.commissionOnDeliveryType.takeway
                              .vendor
                          }%   ${props.t("admin_commission")}`}
                        </FormText>
                      </label>
                    </Col>
                  </Row>
                )}
              {![slugname.oneTimeShop].includes(slug) && (
                <>
                  {activeStoreType?.storeVendorType !== "SINGLE" &&
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
                    )}
                  {activeStoreType?.storeType !== "CARRENTAL" && (
                    <Col md={4}>
                      <FormGroup>
                        <Label for="formrow-delivery-boy-input">
                          {activeStoreType?.storeType === "SERVICEPROVIDER"
                            ? props.t("service_provider")
                            : props.t(
                                slug === slugname.caterPlus
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
                  )}
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

TimeSlot.propTypes = { fields: PropTypes.object, handleChange: PropTypes.func }

const mapStateToProps = ({ Settings }) => ({
  slug: Settings?.settings?.slug,

  // hide: Settings?.settings?.hid,
  hide: Settings?.settings?.hideThings,
  Settings: Settings?.storeType,
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimeSlot)
)
