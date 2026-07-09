import React, { useEffect, useState, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap"

import { DELIVERY_MODES } from "helpers/contants"

const TimeSlot = props => {
  const {
    storeDeliveryType,
    activeStoreType,
    deliveryType,
    handleChange,
    fields,
    handleNestedChange,
    weekendDayDeliveryTimeSlotFields,
    handleWeekendDayDeliveryTimeSlot,
    isDeliveryTimeSlotEnabled,
  } = props

  const handleTypeChange = (value, isTrue) => {
    if (isTrue) {
      handleChange({
        target: { value: deliveryType?.filter(item => item !== value) },
      })
    } else {
      handleChange({
        target: { value: [...deliveryType, value] },
      })
    }
  }

  return (
    <Row>
      {/* <Col lg={4}>
        <h4>{props.t("delivery_mode")}</h4>
        <p>
          <small>{props.t("delivery_mode_guide")}</small>
        </p>
      </Col>

      <Col lg={8}>
        <Row>
          {DELIVERY_MODES?.filter(({ value }) =>
            storeDeliveryType?.includes(value)
          )?.map(({ label: mode, value }, index) => (
            <Col key={`${mode}-${index}`} xs={6}>
              <div className="custom-control custom-checkbox custom-checkbox-primary">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={`${mode.toLowerCase()}-checkbox`}
                  checked={deliveryType?.includes(value)}
                  onChange={() =>
                    handleTypeChange(value, deliveryType?.includes(value))
                  }
                />

                <label
                  className="custom-control-label text-capitalize"
                  for={`${mode.toLowerCase()}-checkbox`}
                >
                  {props.t(mode)}
                </label>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
      {isDeliveryTimeSlotEnabled && (
        <Fragment>
          <Col sm={12}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="text-capitalize">
                    {props.t("monday_friday_slot")}
                  </Label>

                  <div className="status-switch square-switch">
                    <input
                      type="checkbox"
                      id="schedule-status-deliveryTimeSlot-status"
                      switch="none"
                      checked={fields?.status}
                      onChange={e => {
                        handleNestedChange("status")({
                          target: {
                            value: !fields?.status,
                          },
                        })
                      }}
                    />
                    <label
                      htmlFor="schedule-status-deliveryTimeSlot-status"
                      data-on-label={props.t("on")}
                      data-off-label={props.t("off")}
                    />
                  </div>
                </FormGroup>
              </Col>
              {fields?.status && (
                <Col md={4}>
                  <FormGroup>
                    <Label className="text-capitalize">
                      {props.t("start_time")}
                    </Label>

                    <Input
                      type="time"
                      value={fields?.startTime}
                      onChange={e => handleNestedChange("startTime")(e)}
                    />
                  </FormGroup>
                </Col>
              )}
              {fields?.status && (
                <Col md={4}>
                  <FormGroup>
                    <Label className="text-capitalize">
                      {props.t("end_time")}
                    </Label>

                    <Input
                      type="time"
                      value={fields?.endTime}
                      onChange={e => handleNestedChange("endTime")(e)}
                    />
                  </FormGroup>
                </Col>
              )}
            </Row>
          </Col>
          <Col sm={12}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="text-capitalize">
                    {props.t("saturday_slot")}
                  </Label>

                  <div className="status-switch square-switch">
                    <input
                      type="checkbox"
                      id="schedule-status-weekendDayDeliveryTimeSlot-saturday-status"
                      switch="none"
                      checked={
                        weekendDayDeliveryTimeSlotFields?.saturdaySlot?.status
                      }
                      onChange={e =>
                        handleWeekendDayDeliveryTimeSlot(
                          "saturdaySlot",
                          "status"
                        )({
                          target: {
                            value:
                              !weekendDayDeliveryTimeSlotFields?.saturdaySlot
                                ?.status,
                          },
                        })
                      }
                    />
                    <label
                      htmlFor="schedule-status-weekendDayDeliveryTimeSlot-saturday-status"
                      data-on-label={props.t("on")}
                      data-off-label={props.t("off")}
                    />
                  </div>
                </FormGroup>
              </Col>
              {weekendDayDeliveryTimeSlotFields?.saturdaySlot?.status && (
                <Col md={4}>
                  <FormGroup>
                    <Label className="text-capitalize">
                      {props.t("start_time")}
                    </Label>

                    <Input
                      type="time"
                      value={
                        weekendDayDeliveryTimeSlotFields?.saturdaySlot
                          ?.startTime
                      }
                      onChange={e =>
                        handleWeekendDayDeliveryTimeSlot(
                          "saturdaySlot",
                          "startTime"
                        )(e)
                      }
                    />
                  </FormGroup>
                </Col>
              )}
              {weekendDayDeliveryTimeSlotFields?.saturdaySlot?.status && (
                <Col md={4}>
                  <FormGroup>
                    <Label className="text-capitalize">
                      {props.t("end_time")}
                    </Label>

                    <Input
                      type="time"
                      value={
                        weekendDayDeliveryTimeSlotFields?.saturdaySlot?.endTime
                      }
                      onChange={e =>
                        handleWeekendDayDeliveryTimeSlot(
                          "saturdaySlot",
                          "endTime"
                        )(e)
                      }
                    />
                  </FormGroup>
                </Col>
              )}
            </Row>
          </Col>
          <Col sm={12}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="text-capitalize">
                    {props.t("sunday_slot")}
                  </Label>

                  <div className="status-switch square-switch">
                    <input
                      type="checkbox"
                      id="schedule-status-weekendDayDeliveryTimeSlot-sunday-status"
                      switch="none"
                      checked={
                        weekendDayDeliveryTimeSlotFields?.sundaySlot?.status
                      }
                      onChange={e => {
                        handleWeekendDayDeliveryTimeSlot(
                          "sundaySlot",
                          "status"
                        )({
                          target: {
                            value:
                              !weekendDayDeliveryTimeSlotFields?.sundaySlot
                                ?.status,
                          },
                        })
                      }}
                    />
                    <label
                      htmlFor="schedule-status-weekendDayDeliveryTimeSlot-sunday-status"
                      data-on-label={props.t("on")}
                      data-off-label={props.t("off")}
                    />
                  </div>
                </FormGroup>
              </Col>
              {weekendDayDeliveryTimeSlotFields?.sundaySlot?.status && (
                <Col md={4}>
                  <FormGroup>
                    <Label className="text-capitalize">
                      {props.t("start_time")}
                    </Label>

                    <Input
                      type="time"
                      value={
                        weekendDayDeliveryTimeSlotFields?.sundaySlot?.startTime
                      }
                      onChange={e =>
                        handleWeekendDayDeliveryTimeSlot(
                          "sundaySlot",
                          "startTime"
                        )(e)
                      }
                    />
                  </FormGroup>
                </Col>
              )}
              {weekendDayDeliveryTimeSlotFields?.sundaySlot?.status && (
                <Col md={4}>
                  <FormGroup>
                    <Label className="text-capitalize">
                      {props.t("end_time")}
                    </Label>

                    <Input
                      type="time"
                      value={
                        weekendDayDeliveryTimeSlotFields?.sundaySlot?.endTime
                      }
                      onChange={e =>
                        handleWeekendDayDeliveryTimeSlot(
                          "sundaySlot",
                          "endTime"
                        )(e)
                      }
                    />
                  </FormGroup>
                </Col>
              )}
            </Row>
          </Col>
        </Fragment>
      )} */}
    </Row>
  )
}

TimeSlot.propTypes = {
  activeStoreType: PropTypes.object,
  deliveryType: PropTypes.array,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimeSlot)
)
