import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap"
import Instructions from "./Instructions"

const SocialMediaSignup = props => {
  const { fields, handleChange, handleSocialMediaChange } = props

  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t} />
      </Col>

      <Col lg={8}>
        {fields?.socialMediaLoginSignUp?.map((row, index) => {
          const switchId = `switch-${row?._id}-${index}-social-media`

          return (
            <React.Fragment key={`${row._id}-${index}`}>
              <Row>
                <Col md={12}>
                  <div className="d-flex">
                    <h5 className="text-uppercase mr-3">
                      {props.t(row?.type)}
                    </h5>

                    <div className="square-switch">
                      <input
                        type="checkbox"
                        id={switchId}
                        switch="none"
                        checked={row?.status}
                        onChange={() =>
                          handleSocialMediaChange &&
                          handleSocialMediaChange(
                            "socialMediaLoginSignUp",
                            index,
                            "status"
                          )({
                            target: {
                              value: !row?.status,
                            },
                          })
                        }
                      />
                      <label
                        htmlFor={switchId}
                        data-on-label={props.t("on")}
                        data-off-label={props.t("off")}
                      />
                    </div>
                  </div>
                </Col>

                {row?.status && Object.keys(row?.keys || {}).map(item => {
                  const liveInputId = `input-social-media-${row?.type}-${item}`

                  return (
                    <Col md={6}>
                      <FormGroup>
                        <Label for={liveInputId} className="text-uppercase">
                          {props.t(item)}
                        </Label>

                        <Input
                          id={liveInputId}
                          value={
                            (item === "callbackUrl"
                              ? "https://" + props.domain
                              : "") + (row?.keys[item] || "")
                          }
                          onChange={e => {
                            handleSocialMediaChange(
                              "socialMediaLoginSignUp",
                              index,
                              "keys"
                            )({
                              target: {
                                value: { ...row?.keys, [item]: e.target.value },
                              },
                            })
                          }}
                          readOnly={item === "callbackUrl"}
                        />
                      </FormGroup>
                    </Col>
                  )
                })}
              </Row>

              {index !== fields?.socialMediaLoginSignUp?.length - 1 && (
                <hr className="my-3" />
              )}
            </React.Fragment>
          )
        })}
      </Col>
    </Row>
  )
}

SocialMediaSignup.propTypes = {
  fields: PropTypes.object,
  handleSocialMediaChange: PropTypes.func,
}

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SocialMediaSignup)
)
