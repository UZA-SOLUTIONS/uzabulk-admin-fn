import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap"

const DomainSettings = props => {
  const { fields, handleChange } = props

  return (
    <Row>
      <Col lg={4}>
        <h4>{props.t("domain_settings")}</h4>

        <p>
          <small>{props.t("domain_settings_int")}</small>
        </p>
      </Col>

      <Col lg={8}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <div className="d-flex justify-content-between flex-column flex-sm-row w-100">
                <Label for="formrow-domain">{props.t("domain")}</Label>

                {!props?.currentPlan?.isTrial && (
                  <div className="d-flex d-sm-block flex-column text-right">
                    <Link
                      to="#"
                      onClick={e => e.preventDefault()}
                      className="support_chatbox_int mr-sm-2"
                    >
                      {props.t("already_have_domain")}
                    </Link>
                    <Link to="/domains">{props.t("buy_now")}</Link>
                  </div>
                )}
              </div>

              <Input
                disabled
                id="formrow-domain"
                placeholder="https://"
                value={fields?.domain}
                onChange={handleChange("domain")}
              />

              <small>
                <a href={"https://" + fields?.domain} target="_blank">
                  {props.t("preview")}
                </a>
              </small>
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

DomainSettings.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ Billing }) => ({
  currentPlan: Billing.currentPlan,
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DomainSettings)
)
