import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Row, Col, Form, FormGroup, Label, Input, InputGroup } from "reactstrap"
import Instructions from "./Instructions"

const Loyalty = props => {
  const { fields, handleChange, currency } = props

  const handleEarningCriteriaChange = name => event => {
    const { value } = event.target

    handleChange("earningCriteria")({
      target: { value: { ...fields?.earningCriteria, [name]: value } },
    })
  }

  const handleRedemptionCriteriaChange = name => event => {
    const { value } = event.target

    handleChange("redemptionCriteria")({
      target: { value: { ...fields?.redemptionCriteria, [name]: value } },
    })
  }

  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t} />
      </Col>

      <Col lg={8}>
        <Row>
          <Col md={12}>
            <div className="d-flex">
              <h5 className="mr-3">{props.t("loyalty_points")}</h5>

              <div className="square-switch">
                <input
                  type="checkbox"
                  id={`switch-loyalty-points`}
                  switch="none"
                  checked={fields?.status}
                  onChange={() =>
                    handleChange &&
                    handleChange("status")({
                      target: {
                        value: !fields?.status,
                      },
                    })
                  }
                />
                <label
                  htmlFor={`switch-loyalty-points`}
                  data-on-label={props.t("on")}
                  data-off-label={props.t("off")}
                />
              </div>
            </div>
          </Col>
        </Row>

        <hr className="mb-3" />
        {fields?.status &&
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label>{props.t("earning_criteria")}</Label>

                <Row>
                  <Col xs={5} sm={5} className="pr-0 pr-sm-3">
                    <InputGroup>
                      <div className="input-group-append">
                        <span className="input-group-text">{currency?.sign}</span>
                      </div>

                      <Input
                        type="number"
                        className="form-control"
                        value={fields?.earningCriteria?.value}
                        onChange={handleEarningCriteriaChange("value")}
                        min={0}
                        step={0.01}
                      />
                    </InputGroup>
                  </Col>

                  <Col
                    xs={1}
                    sm={2}
                    className="text-center align-self-center pl-0 pl-md-0 pr-0 pr-md-3"
                  >
                    =
                  </Col>

                  <Col xs={6} sm={5} className="pl-0 pl-sm-3">
                    <InputGroup>
                      <Input
                        type="number"
                        className="form-control"
                        value={fields?.earningCriteria?.points}
                        onChange={handleEarningCriteriaChange("points")}
                        min={0}
                      />

                      <div className="input-group-append">
                        <span className="input-group-text">Points</span>
                      </div>
                    </InputGroup>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col md={12}>
              <FormGroup>
                <Label>{props.t("redemption_criteria")}</Label>

                <Row>
                  <Col xs={6} sm={5} className="pr-0 pr-sm-3">
                    <InputGroup>
                      <Input
                        type="number"
                        className="form-control"
                        value={fields?.redemptionCriteria?.points}
                        onChange={handleRedemptionCriteriaChange("points")}
                        min={0}
                      />

                      <div className="input-group-append">
                        <span className="input-group-text">
                          {props.t("points")}
                        </span>
                      </div>
                    </InputGroup>
                  </Col>

                  <Col
                    xs={1}
                    sm={2}
                    className="text-center align-self-center pl-0 pl-md-0 pr-0 pr-md-3"
                  >
                    =
                  </Col>

                  <Col xs={5} sm={5} className="pl-0 pl-sm-3">
                    <InputGroup>
                      <div className="input-group-append">
                        <span className="input-group-text">{currency?.sign}</span>
                      </div>

                      <Input
                        type="number"
                        className="form-control"
                        value={fields?.redemptionCriteria?.value}
                        onChange={handleRedemptionCriteriaChange("value")}
                        min={0}
                        step="0.01"
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>{props.t("max_redemption")}</Label>

                <InputGroup>
                  <Input
                    type="number"
                    className="form-control"
                    value={fields?.maxRedemptionPercentage}
                    onChange={handleChange("maxRedemptionPercentage")}
                    min={0}
                    step={0.01}
                  />

                  <div className="input-group-append">
                    <span className="input-group-text">%</span>
                  </div>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
        }
      </Col>
    </Row>
  )
}

Loyalty.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Loyalty))
