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

const EnabledDeliveryTimeSlot = props => {
  const { fields, handleChange } = props

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
                <Label className="text-capitalize">{props.t("status")}</Label>

                <div className="status-switch square-switch">
                  <input
                    type="checkbox"
                    id="schedule-status-deliveryTimeSlot"
                    switch="none"
                    checked={fields}
                    onChange={() => {
                      handleChange("isEnableDeliveryTimeSlot")({
                        target: {
                          value: !fields,
                        },
                      })
                    }}
                  />
                  <label
                    htmlFor="schedule-status-deliveryTimeSlot"
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

EnabledDeliveryTimeSlot.propTypes = { fields: PropTypes.object, handleChange: PropTypes.func }

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EnabledDeliveryTimeSlot)
)
