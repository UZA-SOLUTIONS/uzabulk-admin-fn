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

const RequestType = props => {
  const { fields, handleRequestChange } = props


  const handlePlatformChange = value => {
    handleRequestChange(value)
  }


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
                <Label className="text-capitalize">{props.t("platform")}</Label>

                <div className="status-switch square-switch">
                  <input
                    className="switcher"
                    type="checkbox"
                    id="request-type"
                    switch="none"
                    checked={fields == "Manual"}
                    onChange={() => {
                      handlePlatformChange(fields == "Manual" ? "Random" : "Manual")
                    }}
                  />
                  <label
                    htmlFor="request-type"
                    data-on-label={props.t("Manual")}
                    data-off-label={props.t("Random")}
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

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RequestType)
)
