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
  Table,
} from "reactstrap"

import { SERVICE_REFUND_TYPE } from "helpers/contants"

const CancellationPolicy = props => {
  const {
    fields,
    handleChange,
    cancellationPolicyRefundType,
    _STORE_SETTINGS_FORM,
  } = props
  const handleTypeChange = (index, name) => event => {
    const { value } = event.target

    handleChange("cancellationPolicy")({
      target: {
        value: [
          ...fields?.cancellationPolicy?.slice(0, index),
          { ...fields?.cancellationPolicy[index], [name]: value },
          ...fields?.cancellationPolicy?.slice(index + 1),
        ],
      },
    })
  }

  return (
    <Row>
      <Col lg={4}>
        <h4>{props.t("cancellation_policy")}</h4>
        <p>
          <small>
            {props.t("cancellation_policy_int", {
              order: _STORE_SETTINGS_FORM.dynamicCancelPolicy
                ? props.t("booking")
                : props.t("order"),
            })}
          </small>
        </p>
      </Col>

      <Col lg={8}>
        <Form>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label>{props.t("partial_refund_amount")}</Label>

                <InputGroup>
                  <Input
                    type="number"
                    value={fields?.cancellationPartialRefundAmount}
                    onChange={handleChange("cancellationPartialRefundAmount")}
                    step={0.01}
                    min={0}
                  />

                  <div className="input-group-append">
                    <span className="input-group-text">%</span>
                  </div>
                </InputGroup>
                <FormText>
                  {props.t(
                    _STORE_SETTINGS_FORM.dynamicCancelPolicy
                      ? "tax_partial_refund_amount_int"
                      : "partial_refund_amount_int",
                    {
                      order: _STORE_SETTINGS_FORM.dynamicCancelPolicy
                        ? props.t("booking")
                        : props.t("order"),
                    }
                  )}
                </FormText>
              </FormGroup>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={12}>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr id="addrMain" key="">
                      <td>
                        <h5>
                          {props.t(
                            _STORE_SETTINGS_FORM.dynamicCancelPolicy
                              ? "booking_staus"
                              : "order_status"
                          )}
                        </h5>
                      </td>

                      <td>
                        <h5>{props.t("refund_type")}</h5>
                      </td>

                      <td>
                        <h5>{props.t("description")}</h5>
                      </td>

                      <td>
                        <h5>{props.t("status")}</h5>
                      </td>
                    </tr>
                  </thead>

                  <tbody>
                    {fields?.cancellationPolicy?.map(
                      (
                        { orderStatus, status, refundType, description },
                        index
                      ) => (
                        <tr
                          id={orderStatus.toLowerCase() + "-" + index}
                          key={orderStatus.toLowerCase() + "-" + index}
                        >
                          <td>
                            <Label className="text-capitalize text-break">
                              {orderStatus}
                            </Label>
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={refundType}
                              onChange={handleTypeChange(index, "refundType")}
                            >
                              <option value="">
                                Select
                              </option>
                              {cancellationPolicyRefundType.map(
                                ({ label, refundType }, index) => (
                                  <option key={index} value={refundType}>
                                    {label}
                                  </option>
                                )
                              )}
                            </select>
                          </td>

                          <td>
                            <input
                              className="form-control"
                              value={description}
                              onChange={handleTypeChange(index, "description")}
                            />
                          </td>

                          <td>
                            <div className="status-switch square-switch">
                              <input
                                type="checkbox"
                                id={`${orderStatus}-status`}
                                switch="none"
                                checked={status}
                                onChange={() => {
                                  handleTypeChange && handleTypeChange(index, "status")({ target: { value: !status, }, })
                                }}
                              />
                              <label
                                htmlFor={`${orderStatus}-status`}
                                data-on-label={props.t("enable")}
                                data-off-label={props.t("disable")}
                              />
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

CancellationPolicy.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ Login }) => ({
  cancellationPolicyRefundType: Login.cancellationPolicyRefundType,
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CancellationPolicy)
)
