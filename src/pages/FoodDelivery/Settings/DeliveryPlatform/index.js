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
  const { fields, handleChange } = props

  const handlePlatformChange = e => {
    handleChange("deliveryPlatform")({
      target: { value: { ...fields, platform: e.target.value } },
    })
  }

  const handleProviderStatusChange = value => {
    handleChange("deliveryPlatform")({
      target: { value: { ...fields, deliveryProviderType: value } },
    })
  }

  const handleProviderKeysChange = (index, name) => event => {
    const { value } = event.target

    handleChange("deliveryPlatform")({
      target: {
        value: {
          ...fields,
          deliveryProvider: [
            ...fields?.deliveryProvider?.slice(0, index),
            {
              ...fields?.deliveryProvider[index],
              keys: {
                ...fields?.deliveryProvider[index]?.keys,
                [name]: event.target.value
              }
            },
            ...fields?.deliveryProvider?.slice(index + 1),
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
        <Form>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <Label className="text-capitalize">{props.t("platform")}</Label>

                <div className="status-switch square-switch">
                  <input
                    className="switcher"
                    type="checkbox"
                    id="delivery-platform"
                    switch="none"
                    checked={fields?.platform === "other"}
                    onChange={() => {
                      handlePlatformChange({
                        target: {
                          value:
                            fields?.platform === "other" ? "self" : "other",
                        },
                      })
                    }}
                  />
                  <label
                    htmlFor="delivery-platform"
                    data-on-label={props.t("other")}
                    data-off-label={props.t("self")}
                  />
                </div>
              </FormGroup>
            </Col>

            {fields?.platform === "other" &&
              fields?.deliveryProvider?.map((provider, index) => {
                const switchId = `switch-${provider?.type?.toLowerCase()}`

                return (
                  <React.Fragment key={`${provider}-${index}`}>
                    <Col md={12}>
                      <hr className="my-3" />

                      <div className="d-flex">
                        <h5 className="text-uppercase mr-3">
                          {props.t(provider?.type)}
                        </h5>

                        {fields?.deliveryProvider.length > 1 && (
                          <div className="square-switch">
                            <input
                              type="checkbox"
                              id={switchId}
                              switch="none"
                              checked={fields.deliveryProviderType === provider}
                              onChange={() =>
                                handleProviderStatusChange(provider)
                              }
                            />
                            <label
                              htmlFor={switchId}
                              data-on-label={props.t("on")}
                              data-off-label={props.t("off")}
                            />
                          </div>
                        )}
                      </div>
                    </Col>

                    {Object.keys(provider.keys).map(item => {
                      const liveInputId = `input-${provider.type?.toLowerCase()}-${item}`

                      return (
                        <Col sm={6} lg={12} xl={6}>
                          <FormGroup>
                            <Label
                              for={liveInputId}
                              className="text-uppercase text-truncate"
                            >
                              {props.t(item)}
                            </Label>

                            <Input
                              id={liveInputId}
                              value={provider.keys[item] || ""}
                              onChange={handleProviderKeysChange(index, item)}
                            />
                          </FormGroup>
                        </Col>
                      )
                    })}
                  </React.Fragment>
                )
              })}
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

DeliveryPlatform.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeliveryPlatform)
)
