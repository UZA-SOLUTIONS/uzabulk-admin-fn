import React, { Fragment } from "react"
import {
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap"

const AvoidFraud = props => {
  const { fields, handleChange } = props
  return (
    <Row>
      <Col md={4}>
        {" "}
        <h4>{props.t("avoid_fraud")}</h4>{" "}
      </Col>
      <Col md={8}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>{props.t("status")}</Label>
              <div className="status-switch square-switch">
                <input
                  type="checkbox"
                  id="square-switch-avoid-fraud"
                  switch="none"
                  checked={fields?.status}
                  onChange={() =>
                    handleChange({
                      target: {
                        name: "status",
                        value: !fields?.status,
                      },
                    })
                  }
                />
                <label
                  htmlFor="square-switch-avoid-fraud"
                  data-on-label="On"
                  data-off-label="Off"
                />
              </div>
            </FormGroup>
          </Col>
          {fields?.status && (
            <Fragment>
              <Col md={6}>
                <FormGroup>
                  <Label>{props.t("number_of_order_cancels")}</Label>
                  <InputGroup>
                    <Input
                      type="number"
                      onChange={handleChange}
                      value={fields?.numOfOrderCancel}
                      min="0"
                      name="numOfOrderCancel"
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>{props.t("driver_block_time")}</Label>
                  <InputGroup>
                    <Input
                      type="number"
                      onChange={handleChange}
                      value={fields?.driverBlockTime}
                      min="0"
                      name="driverBlockTime"
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>{props.t("hours")}</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
            </Fragment>
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default AvoidFraud
