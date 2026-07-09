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

const CityPricing = props => {
  const { activeStoreType, fields, handleChange } = props

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
                  {props.t("city_pricing")}
                </Label>

                <div className="status-switch square-switch">
                  <input
                    type="checkbox"
                    id="city-pricing-status"
                    switch="none"
                    checked={fields?.cityPricingSettings}
                    onChange={() => {
                      handleChange &&
                        handleChange("cityPricingSettings")({
                          target: {
                            value: !fields?.cityPricingSettings,
                          },
                        })
                    }}
                  />
                  <label
                    htmlFor="city-pricing-status"
                    data-on-label={props.t("on")}
                    data-off-label={props.t("off")}
                  />
                </div>
              </FormGroup>
            </Col>

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

CityPricing.propTypes = { fields: PropTypes.object, handleChange: PropTypes.func }

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CityPricing)
)
