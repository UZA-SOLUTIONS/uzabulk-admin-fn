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
  InputGroup,
  FormText,
} from "reactstrap"
import Instructions from "./Instructions"

const ExchangeRate = props => {
  const {
    fields,
    handleChange,
  } = props


  return (
    <Row>
      <Col lg={4}>
        <Instructions
          t={props.t}
        />
      </Col>

      <Col lg={8}>
        <Form>

          <FormGroup>
            <Label for="formrow-vendor-input">
              {props.t("exchange_rate")}
            </Label>

            <InputGroup>
              <Input
                id="formrow-exchange_symbol-input"
                type="text"
                value={fields?.symbol}
                onChange={handleChange("symbol")}
                placeholder="Symbol"
              />

              <Input
                id="formrow-exchange_rate-input"
                type="number"
                value={fields?.rate}
                onChange={handleChange("rate")}
                placeholder="Rate"
                min={0}
                step={0.01}
              />

              <Input
                id="formrow-exchange_rate-input"
                type="text"
                value={fields?.code}
                onChange={handleChange("code")}
                placeholder="Code"
              />
            </InputGroup>
            <FormText>
              {`${props.t("1_cny")} = ${fields?.exchangeRate || 1} ${fields?.symbol || "¥"}`}
            </FormText>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  )
}

ExchangeRate.propTypes = { fields: PropTypes.object, handleChange: PropTypes.func }

const mapStateToProps = ({ Settings }) => ({
  slug: Settings?.settings?.slug,
  // hide: Settings?.settings?.hid,
  hide: Settings?.settings?.hideThings,
  Settings: Settings?.storeType,
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExchangeRate)
)
