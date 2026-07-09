import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import "flatpickr/dist/themes/material_blue.css"

import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormText,
} from "reactstrap"
import { SLUGS_NAME as slugname, } from "helpers/contants"
import Instructions from "./Instructions"

const TimeSlot = props => {
  const { fields, handleChange, _STORE_SETTINGS_FORM, activestore, orderstatus } = props

  const handleLabel = () => {
    if (props.settings.slug == "topup-fuel") return "vendor_wait_time"
    if ([slugname.dewe, slugname.zaza, slugname.lemonee].includes(props.settings.slug)) return "store_wait_time"
    if (["LIQUOR"].includes(activestore?.storeType)) return "store_wait_time"

    return "resturant_wait_time"
  }

  // console.log(props.settings.slug, "props.settings.slug");

  return (
    <>
      {(_STORE_SETTINGS_FORM.foodgrocery ?
        orderstatus : true) &&
        <Row>
          <Col lg={4}>
            <Instructions t={props.t} _STORE_SETTINGS_FORM={_STORE_SETTINGS_FORM} hide={activestore?.storeType} />
          </Col>

          <Col lg={8}>
            <Form>
              <Row>
                {_STORE_SETTINGS_FORM.restaurantWaitTime && (
                  <Col md={6}>
                    <FormGroup>
                      <Label>{props.t(handleLabel())}</Label>

                      <InputGroup>
                        <Input
                          type="number"
                          value={fields?.vendorWaitTime}
                          onChange={handleChange("vendorWaitTime")}
                          min={0}
                        />

                        <InputGroupAddon addonType="append">
                          <InputGroupText>{props.t("minutes")}</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                )}

                <Col md={6}>
                  <FormGroup>
                    {activestore?.storeType !== "SERVICEPROVIDER" && <Label>{props.t("driver_wait_time")}</Label>}
                    {activestore?.storeType === "SERVICEPROVIDER" && <Label>{props.t("serviceprovider_wait_time")}</Label>}

                    <InputGroup>
                      <Input
                        type="number"
                        value={fields?.driverWaitTime}
                        onChange={handleChange("driverWaitTime")}
                        min={0}
                      />

                      <InputGroupAddon addonType="append">
                        <InputGroupText>{props.t("minutes")}</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>}
    </>
  )
}

TimeSlot.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ Settings }) => ({
  settings: Settings?.settings
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimeSlot)
)
