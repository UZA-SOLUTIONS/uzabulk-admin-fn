import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap"
import Instructions from "./Instructions"

const AppUrl = props => {
  const { fields, handleAppUrlChange } = props

  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t} />
      </Col>

      <Col lg={8}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="formrow-customer-app">
                {props.t("customer_app_url")} ({props.t("android")})
              </Label>

              <Input
                id="formrow-customer-app"
                value={fields?.customer_android_app}
                onChange={handleAppUrlChange("customer_android_app")}
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for="formrow-driver-app">
                {props.t("driver_app_url")} ({props.t("android")}) :
              </Label>

              <Input
                id="formrow-driver-app"
                value={fields?.driver_android_app}
                onChange={handleAppUrlChange("driver_android_app")}
              />
            </FormGroup>
          </Col>
        </Row>

        <hr className="mt-0 mb-3" />

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="formrow-customer-app-ios">
                {props.t("customer_app_url")}({props.t("ios")}):
              </Label>

              <Input
                id="formrow-customer-app-ios"
                value={fields?.customer_ios_app}
                onChange={handleAppUrlChange("customer_ios_app")}
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for="formrow-driver-app-ios">
                {props.t("driver_app_url")} ({props.t("ios")}) :
              </Label>

              <Input
                id="formrow-driver-app-ios"
                value={fields?.driver_ios_app}
                onChange={handleAppUrlChange("driver_ios_app")}
              />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

AppUrl.propTypes = {
  fields: PropTypes.object,
  handleAppUrlChange: PropTypes.func,
}

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppUrl)
)
