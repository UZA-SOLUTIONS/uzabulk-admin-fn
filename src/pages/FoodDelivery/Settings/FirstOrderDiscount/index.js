import React, { useEffect, useState, Fragment } from "react"
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
  Button,
} from "reactstrap"
import Instructions from "./Instructions"

const FirstOrderDiscountSettings = props => {
  const { fields, setFields, settings, activestore } = props

  console.log("babby", fields)
  console.log("babby2", settings.currency)

  return (
    <Row>
      <Col lg={4}>
        <Instructions fields={props?.store} t={props.t} />
      </Col>

      <Col lg={8}>
        <Form>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <Label className="text-capitalize">{props.t("status")}</Label>

                <div className="status-switch square-switch">
                  <input
                    className="switcher"
                    type="checkbox"
                    id="first-time-discount-status-settings"
                    switch="none"
                    checked={fields?.status}
                    onChange={() => setFields("status", !fields?.status)}
                  />
                  <label
                    htmlFor="first-time-discount-status-settings"
                    data-on-label={props.t("on")}
                    data-off-label={props.t("off")}
                  />
                </div>
              </FormGroup>
            </Col>
            {fields?.status && (
              <Fragment>
                <Col xs={6} sm={3} md={4} xl={3} className="pr-0">
                  <FormGroup>
                    <Label>{props.t("discount_type")}</Label>

                    <div className="status-switch square-switch">
                      <input
                        type="checkbox"
                        id="firstOrderDiscountType"
                        switch="none"
                        checked={fields?.discountType === "flat"}
                        onChange={() =>
                          setFields(
                            "discountType",
                            fields?.discountType === "flat" ? "percent" : "flat"
                          )
                        }
                      />
                      <label
                        htmlFor="firstOrderDiscountType"
                        data-on-label={props.t("flat")}
                        data-off-label={props.t("percent")}
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col sm={6} lg={12} xl={6}>
                  <FormGroup>
                    <Label for="formrow-tax-input">
                      {props.t("discount_amount")}
                    </Label>

                    <InputGroup>
                      <Input
                        id="formrow-tax-inpueet"
                        type="number"
                        step={0.01}
                        min={0}
                        onChange={e =>
                          setFields("discountAmount", e.target.value)
                        }
                        value={fields?.discountAmount}
                      />

                      <div className="input-group-append">
                        <span className="input-group-text">
                          {fields?.discountType === "flat"
                            ? settings?.currency?.sign
                            : "%"}
                        </span>
                      </div>
                    </InputGroup>
                  </FormGroup>
                </Col>

                <Col xs={12} className="pr-0">
                  <FormGroup>
                    <Label>{props.t("for_verified_user_only")}</Label>

                    <div className="status-switch square-switch">
                      <input
                        type="checkbox"
                        id="for_verified_user_only"
                        switch="none"
                        checked={fields?.isForProfileVerifiedUser}
                        onChange={() =>
                          setFields(
                            "isForProfileVerifiedUser",
                            !fields?.isForProfileVerifiedUser
                          )
                        }
                      />
                      <label
                        htmlFor="for_verified_user_only"
                        data-on-label={props.t("Yes")}
                        data-off-label={props.t("No")}
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Fragment>
            )}
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

FirstOrderDiscountSettings.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ Settings }) => ({
  settings: Settings.settings,
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FirstOrderDiscountSettings)
)
