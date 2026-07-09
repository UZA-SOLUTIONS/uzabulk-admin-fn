import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

import { Row, Col, Form, Label, FormGroup } from "reactstrap"

import { WEEK_NAMES } from "helpers/contants"

const TimeSlot = props => {
  const { fields, timeSlot, handleChange } = props

  const handleSlotChange = (name, index) => event => {
    const value = [
      ...timeSlot.slice(0, index),
      { ...timeSlot[index], [name]: event.target.value },
      ...timeSlot.slice(index + 1),
    ]
    handleChange("timeSlot")({ target: { value } })
  }


  return (
    <Row>
      {/* <Col lg={4}>
        <h4>{props.t("time_slot")}</h4>
        <p>
          <small>{props.t("time_slot_int", {
            store: props.hideRestaurantName ? props.t("Store") : "Store/Restaurant"
          })}</small>
        </p>
      </Col>

      <Col lg={8}>
        <Row className="mb-3">
          <Col md={6}>
            <FormGroup>
              <Label className="text-capitalize">
                {props.t("accept_order")}
              </Label>

              <div
                className={`switch-${fields?.isVendorAvailable ? "xl" : "sm"
                  } square-switch`}
              >
                <input
                  type="checkbox"
                  id="vendor-available-switch"
                  switch="none"
                  checked={fields?.isVendorAvailable}
                  onChange={() => {
                    handleChange &&
                      handleChange("isVendorAvailable")({
                        target: { value: !fields?.isVendorAvailable },
                      })
                  }}
                />
                <label
                  htmlFor="vendor-available-switch"
                  data-on-label={props.t("available")}
                  data-off-label={props.t("busy")}
                />
              </div>
            </FormGroup>
          </Col>

          <Col md={12}>
            <table style={{ width: "100%" }}>
              <tbody>
                {WEEK_NAMES?.filter((_, index) => !!timeSlot[index]).map(
                  (week, index) => {
                    const slot = timeSlot[index]

                    return (
                      <tr
                        id={week.toLowerCase() + "-" + index}
                        key={week.toLowerCase() + "-" + index}
                      >
                        <td>
                          <Row className="mb-2 align-items-center">
                            <Col xs={6} md={2} lg={6} className="order-0">
                              <Label className="text-capitalize">
                                {props.t(week?.toLowerCase())}
                              </Label>
                            </Col>

                            <Col className="order-2 order-md-1 order-lg-2">
                              <input
                                className="form-control d-block"
                                type="time"
                                defaultValue="00:00"
                                id={`time-input-${week.toLowerCase()}-start`}
                                value={slot?.startTime}
                                onChange={handleSlotChange("startTime", index)}
                              />
                            </Col>

                            <Col
                              xs={1}
                              className="p-0 text-center order-3 order-md-2 order-lg-3"
                            >
                              {props.t("to")}
                            </Col>

                            <Col className="order-4 order-md-3 order-lg-4">
                              <input
                                className="form-control d-block"
                                type="time"
                                defaultValue="23:59"
                                id={`time-input-${week.toLowerCase()}-end`}
                                value={slot?.endTime}
                                onChange={handleSlotChange("endTime", index)}
                              />
                            </Col>

                            <Col
                              xs={6}
                              md={2}
                              lg={6}
                              className="order-1 order-md-4 order-lg-1 text-right text-md-center text-lg-right"
                            >
                              <div className="switch-xsm square-switch">
                                <input
                                  type="checkbox"
                                  id={`time-slot-${week}`}
                                  switch="none"
                                  defaultChecked={true}
                                  checked={slot?.dayStatus === "yes"}
                                  onChange={() => {
                                    handleSlotChange(
                                      "dayStatus",
                                      index
                                    )({
                                      target: {
                                        value:
                                          slot?.dayStatus === "yes"
                                            ? "no"
                                            : "yes",
                                      },
                                    })
                                  }}
                                />
                                <label
                                  htmlFor={`time-slot-${week}`}
                                  data-on-label="ON"
                                  data-off-label="OFF"
                                />
                              </div>
                            </Col>
                          </Row>

                          <hr />
                        </td>
                      </tr>
                    )
                  }
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Col> */}
    </Row>
  )
}

TimeSlot.propTypes = {}

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimeSlot)
)
