import React from "react"
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

const ReferredUserCommision = props => {
  const { fields, referredUserCommission, currency } = props

  return (
    <Row>
      <Col md={4}>
        {" "}
        <h4>{props.t("referred_user_commision")}</h4>{" "}
      </Col>
      <Col md={8}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>
                {props.t("user")} {props.t("status")}
              </Label>
              <div className="status-switch square-switch">
                <input
                  type="checkbox"
                  id="square-switch-refer-status"
                  switch="none"
                  checked={fields?.User?.status}
                  onChange={() =>
                    referredUserCommission("User")("status")({
                      target: {
                        value: !fields?.User?.status,
                      },
                    })
                  }
                />
                <label
                  htmlFor="square-switch-refer-status"
                  data-on-label="On"
                  data-off-label="Off"
                />
              </div>
            </FormGroup>
          </Col>
          {fields?.User?.status && (
            <Col md={6}>
              <FormGroup>
                <Label>
                  {" "}
                  {props.t("user")} {props.t("referred_earning_amount")}
                </Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{currency?.sign || "$"}</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="number"
                    onChange={referredUserCommission("User")(
                      "referredEarningAmount"
                    )}
                    value={fields?.User?.referredEarningAmount}
                    min="0"
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          )}
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>
                {props.t("driver")} {props.t("status")}
              </Label>
              <div className="status-switch square-switch">
                <input
                  type="checkbox"
                  id="square-switch-refer-status-driver"
                  switch="none"
                  checked={fields?.Driver?.status}
                  onChange={() =>
                    referredUserCommission("Driver")("status")({
                      target: {
                        value: !fields?.Driver?.status,
                      },
                    })
                  }
                />
                <label
                  htmlFor="square-switch-refer-status-driver"
                  data-on-label="On"
                  data-off-label="Off"
                />
              </div>
            </FormGroup>
          </Col>
          {fields?.Driver?.status && (
            <Col md={6}>
              <FormGroup>
                <Label>
                  {props.t("driver")} {props.t("referred_earning_amount")}
                </Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{currency?.sign || "$"}</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="number"
                    onChange={referredUserCommission("Driver")(
                      "referredEarningAmount"
                    )}
                    value={fields?.Driver?.referredEarningAmount}
                    min="0"
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default ReferredUserCommision
