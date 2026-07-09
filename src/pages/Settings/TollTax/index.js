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

const TollTaxguru = props => {
  const { fields, handleChange } = props
  return (
    <Row>
      <Col md={4}>
        {" "}
        <h4>{props.t("toll_tax")}</h4>{" "}
      </Col>
      <Col md={8}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>{props.t("status")}</Label>
              <div className="status-switch square-switch">
                <input
                  type="checkbox"
                  id="square-switch-toll-tax"
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
                  htmlFor="square-switch-toll-tax"
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
                  <Label>{props.t("apiKey")}</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      onChange={handleChange}
                      value={fields?.apiKey}
                      name="apiKey"
                    />
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

export default TollTaxguru
