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

const OrderDeliverySetting = props => {
  const { orderDeliveryFields, handleChange, handleOrderCountChange } = props

  console.log("orderDeliveryFields", orderDeliveryFields)

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
                    id="order-delivery-setting"
                    switch="none"
                    checked={
                      orderDeliveryFields?.orderDeliverySettings
                        ?.multiOrderAcceptance?.status
                    }
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="order-delivery-setting"
                    data-on-label={props.t("on")}
                    data-off-label={props.t("off")}
                  />
                </div>
              </FormGroup>
            </Col>
            {orderDeliveryFields?.orderDeliverySettings?.multiOrderAcceptance
              .status && (
              <Col sm={6} lg={12} xl={6}>
                <FormGroup>
                  <Label className="text-capitalize">
                    {props.t("Multi Order Acceptance Count")}
                  </Label>
                  <Input
                    type="number"
                    max={5}
                    min={0}
                    required
                    value={
                      orderDeliveryFields?.orderDeliverySettings
                        ?.multiOrderAcceptance?.acceptedOrderCount
                    }
                    onChange={handleOrderCountChange}
                  />
                </FormGroup>
              </Col>
            )}
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

OrderDeliverySetting.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderDeliverySetting)
)
