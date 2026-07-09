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
  FormText,
} from "reactstrap"

const GeneralSettings = props => {
  const {
    minOrderAmont,
    pricePerPerson,
    handleChange,
    storeType,
    orderAutoApproval,
    orderAutoCancel,
    storeOrderAutoApproval,
    storeOrderAutoCancel,
  } = props

  console.log(props.settings.slug, "settings");

  return (
    <Row>
      <Col lg={4}>
        <h4>{props.t("vendor_general_heading")}</h4>
      </Col>

      <Col lg={8}>
        <Form>
          <Row>
            {props?.settings?.slug !== "topup-fuel" &&
              <Col md={6}>
                <FormGroup>
                  <Label>{props.t("min_order_amount")}</Label>

                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        {props?.settings?.currency?.sign}
                      </InputGroupText>
                    </InputGroupAddon>

                    <Input
                      type="number"
                      value={minOrderAmont}
                      onChange={handleChange("minOrderAmont")}
                      min={0}
                      step="0.01"
                    />
                  </InputGroup>
                  <FormText>{props.t("min_order_amount_guide")}</FormText>
                </FormGroup>
              </Col>
            }


            {storeType === "FOOD" && props?.settings?.slug !== "topup-fuel" && (
              <Col md={6}>
                <FormGroup>
                  <Label>{props.t("avg_order_amount")}</Label>

                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        {props?.settings?.currency?.sign}
                      </InputGroupText>
                    </InputGroupAddon>

                    <Input
                      type="number"
                      value={pricePerPerson}
                      onChange={handleChange("pricePerPerson")}
                      step="0.01"
                      min={0}
                    />
                  </InputGroup>
                  <FormText>{props.t("avg_order_amount_guide")}</FormText>
                </FormGroup>
              </Col>
            )}

            {storeOrderAutoApproval && (
              <Col md={6}>
                <FormGroup>
                  <Label className="text-capitalize">
                    {props.t("enable_auto_accept")}
                  </Label>

                  <div className="status-switch square-switch">
                    <input
                      type="checkbox"
                      id="vendor-auto-accept-switch"
                      switch="none"
                      checked={orderAutoApproval}
                      onChange={() => {
                        handleChange &&
                          handleChange("orderAutoApproval")({
                            target: { value: !orderAutoApproval },
                          })
                      }}
                    />
                    <label
                      htmlFor="vendor-auto-accept-switch"
                      data-on-label={props.t("YES")}
                      data-off-label={props.t("NO")}
                      id={`remove-branding-label`}
                    />
                  </div>
                </FormGroup>
              </Col>
            )}

            {storeOrderAutoCancel && <Col>
              <FormGroup>
                <Label>
                  {props.t("enable_auto_cancel")}
                </Label>

                <div className="status-switch  square-switch">
                  <input
                    type="checkbox"
                    id="vendor-auto-cancel-switch"
                    switch="none"
                    checked={orderAutoCancel}
                    onChange={() => {
                      handleChange && handleChange("orderAutoCancel")({
                        target: { value: !orderAutoCancel },
                      })
                    }}
                  />
                  <label
                    htmlFor="vendor-auto-cancel-switch"
                    data-on-label={props.t("YES")}
                    data-off-label={props.t("NO")}
                  />
                </div>
              </FormGroup>
            </Col>}


          </Row>
        </Form>
      </Col>
    </Row>
  )
}

GeneralSettings.propTypes = {
  minOrderAmont: PropTypes.number,
  pricePerPerson: PropTypes.number,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ Settings }) => ({
  settings: Settings.settings,
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GeneralSettings)
)
