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

const CarPool = props => {
  const {
    activeStoreType,
    fields,
    handleChange,
    manageIndividualPoolTripField,
    handleManageIndividualPoolTripField,
    poolDriverRadius,
    handleManagePoolDriverRadiusField,
  } = props

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
                  {props.t("enable_car_pooling_vehicles")}
                </Label>

                <div className="status-switch square-switch">
                  <input
                    type="checkbox"
                    id="enable-car-pool-status"
                    switch="none"
                    checked={fields}
                    onChange={() => {
                      handleChange &&
                        handleChange({
                          target: {
                            value: !fields,
                          },
                        })
                    }}
                  />
                  <label
                    htmlFor="enable-car-pool-status"
                    data-on-label={props.t("on")}
                    data-off-label={props.t("off")}
                  />
                </div>
              </FormGroup>
            </Col>

            {fields && (
              <>
                {/* not fully implemented so hidden
            <Col md={6}>
              <FormGroup>
                <Label className="text-capitalize">
                  {props.t("any_individual_pickup")}
                </Label>

                <div className="status-switch square-switch">
                  <input
                    type="checkbox"
                    id="any_individual_pickup-status"
                    switch="none"
                    checked={manageIndividualPoolTripField}
                    onChange={() => {
                      handleManageIndividualPoolTripField({
                        target: {
                          value: !manageIndividualPoolTripField,
                        },
                      })
                    }}
                  />
                  <label
                    htmlFor="any_individual_pickup-status"
                    data-on-label={props.t("on")}
                    data-off-label={props.t("off")}
                  />
                </div>
              </FormGroup>
              </Col>*/}

                <Col md={6}>
                  <FormGroup>
                    <Label>{props.t("pool_driver_radius")}</Label>

                    <InputGroup>
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        value={poolDriverRadius}
                        onChange={e => {
                          if (e.target.value === "") {
                            e.target.value = ""
                          } else if (e.target.value < 1) {
                            e.target.value = 1
                          } else if (e.target.value > 100) {
                            e.target.value = 100
                          }

                          handleManagePoolDriverRadiusField(e)
                        }}
                      />

                      <div className="input-group-append">
                        <span className="input-group-text">
                          {props?.store?.distanceUnit}
                        </span>
                      </div>
                    </InputGroup>
                  </FormGroup>
                </Col>
              </>
            )}
            {/* {fields?.status && (
              <Col md={6}>
                <FormGroup>
                  <Label for="formrow-request-time">
                    {props.t("request_time")}
                  </Label>

                  <InputGroup>
                    <Input
                      id="formrow-request-time"
                      type="number"
                      min="1"
                      value={fields?.vendorRequestTime}
                      onChange={e => {
                        handleChange("vendorRequestTime")(e)
                      }}
                    />

                    <div className="input-group-append">
                      <span className="input-group-text">
                        {props.t("minutes")}
                      </span>
                    </div>
                  </InputGroup>
                </FormGroup>
              </Col>
            )} */}
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

CarPool.propTypes = { fields: PropTypes.object, handleChange: PropTypes.func }

const mapStateToProps = ({ Settings }) => ({
  store: Settings?.settings,
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarPool))
