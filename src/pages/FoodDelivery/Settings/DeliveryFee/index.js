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
  const { fields, handleChange, currency } = props

  return (
    <Row>
      <Col lg={4}>
        <Instructions fields={props?.store} t={props.t} />
      </Col>

      <Col lg={8}>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="formrow-base-price-input">
                  {props.t("base_price")}
                </Label>

                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{currency?.sign || "$"}</InputGroupText>
                  </InputGroupAddon>

                  <Input
                    id="formrow-base-price-input"
                    type="number"
                    value={fields?.base_price}
                    onChange={handleChange("base_price")}
                    step="0.01"
                    min={0}
                  />
                </InputGroup>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label
                  for="per-unit-distance-input"
                  className="text-capitalize"
                >
                  {props.t("price_per_km", {
                    distanceUnit: props?.store?.distanceUnit,
                  })}
                </Label>

                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{currency?.sign || "$"}</InputGroupText>
                  </InputGroupAddon>

                  <Input
                    id="per-unit-distance-input"
                    type="number"
                    value={fields?.per_unit_distance}
                    onChange={handleChange("per_unit_distance")}
                    step="0.01"
                    min={0}
                  />
                </InputGroup>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="per-unit-time-input">
                  {props.t("price_per_minute")}
                </Label>

                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{currency?.sign || "$"}</InputGroupText>
                  </InputGroupAddon>

                  <Input
                    id="per-unit-time-input"
                    type="number"
                    value={fields?.per_unit_time}
                    onChange={handleChange("per_unit_time")}
                    step="0.01"
                    min={0}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

TimeSlot.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ Settings }) => ({
  currency: Settings?.settings?.currency,
  store: Settings?.settings,
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimeSlot)
)
