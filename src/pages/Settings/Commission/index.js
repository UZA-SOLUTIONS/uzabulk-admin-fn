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

const TimeSlot = props => {
  const { activeStoreType, fields, handleChange: _handleChange } = props

  const handleChange = name => event => {
    _handleChange("commissionTransfer")({
      target: { value: { ...fields, [name]: event.target.value } },
    })
  }

  console.log("indata", fields);

  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t} />
      </Col>

      <Col lg={8}>
        <Form>
          <Row>
            <Col md={6}>
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
                    checked={fields?.status === "online"}
                    onChange={() => {
                      handleChange &&
                        handleChange("status")({
                          target: {
                            value:
                              fields?.status === "online"
                                ? "offline"
                                : "online",
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

            {fields?.status === "online" && (
              <Col md={6}>
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
                      checked={fields?.payoutSchedule === "realTime"}
                      onChange={() => {
                        handleChange &&
                          handleChange("payoutSchedule")({
                            target: {
                              value:
                                fields?.payoutSchedule === "realTime"
                                  ? "later"
                                  : "realTime",
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
              </Col>
            )}

            {fields?.status === "online" && fields?.payoutSchedule === "later" && (
              <Col md={6}>
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
                      <span className="input-group-text">
                        {props.t("days")}
                      </span>
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
}

TimeSlot.propTypes = { fields: PropTypes.object, handleChange: PropTypes.func }

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimeSlot)
)
