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

const UserWalletDeduct = props => {
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
                <div className="status-switch square-switch">
                  <input
                    type="checkbox"
                    id="user-wallet-deductions-status"
                    switch="none"
                    checked={fields?.status}
                    onChange={() => {
                      handleChange &&
                        handleChange("status")({
                          target: {
                            value: !fields?.status,
                          },
                        })
                    }}
                  />
                  <label
                    htmlFor="user-wallet-deductions-status"
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

UserWalletDeduct.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserWalletDeduct)
)
