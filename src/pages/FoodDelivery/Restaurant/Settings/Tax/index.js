import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

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
} from "reactstrap"

const TimeSlot = props => {
  const { taxAmount, handleChange } = props

  return (
    <Row>
      <Col lg={4}>
        <h4>{props.t("tax")}</h4>
        <p>
          <small>{props.t("tax_guide")}</small>
        </p>
      </Col>

      <Col lg={8}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="formrow-tax-input">{props.t("tax_amount")}</Label>

              <InputGroup>
                <Input
                  id="formrow-tax-input"
                  type="number"
                  value={taxAmount}
                  onChange={handleChange}
                  step={0.01}
                  min={0}
                />

                <div className="input-group-append">
                  <span className="input-group-text">%</span>
                </div>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

TimeSlot.propTypes = {}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimeSlot)
)
