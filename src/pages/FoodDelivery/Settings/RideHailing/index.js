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

const RideHailing = props => {
  const { activeStoreType, fields, handleChange } = props

  console.log(fields, "fieldssidhant");

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
                  {props.t("ride_hailing")}
                </Label>

                <div className="status-switch square-switch">
                  <input
                    type="checkbox"
                    id="ride-hailing-status"
                    switch="none"
                    checked={fields?.rideHailingSettings?.status}
                    onChange={() => {
                      handleChange &&
                        handleChange("status")({
                          target: {
                            value: !fields?.rideHailingSettings?.status,
                          },
                        })
                    }}
                  />
                  <label
                    htmlFor="ride-hailing-status"
                    data-on-label={props.t("on")}
                    data-off-label={props.t("off")}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

RideHailing.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RideHailing)
)
