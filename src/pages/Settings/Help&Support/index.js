import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap"

const HelpSupport = props => {
  const { fields, handleChange } = props

  return (
    <Row>
      <Col lg={4}>
        <h4>{props.t("help_support")}</h4>

        <p>
          <small></small>
        </p>
      </Col>

      <Col lg={8}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="formrow-domain">{props.t("mobile")}</Label>

              <Input
                id="formrow-phoneNumber"
                placeholder=""
                value={fields?.mobileNumber}
                onChange={handleChange("mobileNumber")}
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for="formrow-domain">{props.t("email")}</Label>

              <Input
                id="formrow-email"
                placeholder=""
                value={fields?.email}
                onChange={handleChange("email")}
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for="formrow-domain">{props.t("whatsapp_number")}</Label>

              <Input
                id="formrow-phoneNumber"
                type="number"
                placeholder=""
                value={fields?.whatsapp_number}
                onChange={handleChange("whatsapp_number")}
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for="formrow-domain">{props.t("tawk_direct_chat_link")}</Label>

              <Input
                id="formrow-email"
                placeholder=""
                value={fields?.tawk_direct_chat_link}
                onChange={handleChange("tawk_direct_chat_link")}
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("tawk_chat_script")}</Label>

              <Input
                type="textarea"
                placeholder=""
                value={fields?.chatCodeScript}
                onChange={handleChange("chatCodeScript")}
              />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

HelpSupport.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HelpSupport)
)
