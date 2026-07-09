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

const DeliveryPlatform = props => {
  const { fields, handleChange, currency } = props

  const handlePlatformChange = e => {
    handleChange("freeDeliverySettings")({
      target: { value: { ...fields, status: e.target.value } },
    })
  }

  const handleProviderKeysChange = (index, name) => event => {
    const { value } = event.target

    handleChange("freeDeliverySettings")({
      target: {
        value: {
          ...fields,
          range: [
            ...fields?.range?.slice(0, index),
            {
              ...fields?.range[index],
              [name]: value,
            },
            ...fields?.range?.slice(index + 1),
          ],
        },
      },
    })
  }

  function addNewOption(event) {
    event.preventDefault()

    handleChange("freeDeliverySettings")({
      target: {
        value: {
          ...fields,
          range: [...fields.range, { minOrderValue: "", maxOrderValue: "" }],
        },
      },
    })
  }

  function removeOption(e, index) {
    e.preventDefault()

    handleChange("freeDeliverySettings")({
      target: {
        value: {
          ...fields,
          range: [
            ...fields?.range?.slice(0, index),
            ...fields?.range?.slice(index + 1),
          ],
        },
      },
    })
  }

  return (
    <Row>
      <Col lg={4}>
        <Instructions fields={props?.store} t={props.t} />
      </Col>

      <Col lg={8}>
        <Row>
          <Col xs={12}>
            <FormGroup>
              <Label className="text-capitalize">{props.t("status")}</Label>

              <div className="status-switch square-switch">
                <input
                  className="switcher"
                  type="checkbox"
                  id="free-delivery-settings"
                  switch="none"
                  checked={fields?.status}
                  onChange={() => {
                    handlePlatformChange({
                      target: {
                        value: !fields?.status,
                      },
                    })
                  }}
                />
                <label
                  htmlFor="free-delivery-settings"
                  data-on-label={props.t("on")}
                  data-off-label={props.t("off")}
                />
              </div>
            </FormGroup>
          </Col>
        </Row>

        {fields?.status &&
          fields?.range?.map((range, index) => {
            const liveInputId = `input-${range._id}-${index}`

            return (
              <>
                <Row>
                  <Col sm={5} lg={12} xl={5}>
                    <FormGroup>
                      <Label
                        for={liveInputId + "-min-value"}
                        className="text-uppercase text-truncate"
                      >
                        {props.t("min_order_value")}
                      </Label>

                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {currency?.sign || "$"}
                          </InputGroupText>
                        </InputGroupAddon>

                        <Input
                          id={liveInputId + "-max-value"}
                          value={range.minOrderValue || ""}
                          onChange={handleProviderKeysChange(
                            index,
                            "minOrderValue"
                          )}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>

                  <Col sm={5} lg={12} xl={5}>
                    <FormGroup>
                      <Label
                        for={liveInputId + "-max-value"}
                        className="text-uppercase text-truncate"
                      >
                        {props.t("max_order_value")}
                      </Label>

                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {currency?.sign || "$"}
                          </InputGroupText>
                        </InputGroupAddon>

                        <Input
                          id={liveInputId + "-max-value"}
                          value={range.maxOrderValue || ""}
                          onChange={handleProviderKeysChange(
                            index,
                            "maxOrderValue"
                          )}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  
                  {/*<Col
                    sm={2}
                    lg={12}
                    xl={2}
                    className="d-flex align-items-center"
                  >
                    {index === fields?.range.length - 1 && (
                      <Link
                        to={`#`}
                        onClick={addNewOption}
                        className="text-secondary"
                      >
                        <i className="fas fa-plus mr-3" />
                      </Link>
                    )}

                    <Link
                      disabled={fields?.range?.length === 1}
                      to={`#`}
                      onClick={e => {
                        e.preventDefault()

                        fields?.range?.length > 1 && removeOption(e, index)
                      }}
                      className={
                        fields?.range?.length === 1
                          ? "text-secondary"
                          : "text-secondary"
                      }
                    >
                      <i className="fas fa-trash-alt mr-3" />
                    </Link>
                    </Col>*/}
                </Row>

                <hr className="d-sm-none d-lg-block d-xl-none" />
              </>
            )
          })}
      </Col>
    </Row>
  )
}

DeliveryPlatform.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ Settings }) => ({
  currency: Settings?.settings?.currency,
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeliveryPlatform)
)
