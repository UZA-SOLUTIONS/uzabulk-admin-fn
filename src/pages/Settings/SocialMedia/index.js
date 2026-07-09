import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap"
import Instructions from "./Instructions"

const SocialMedia = props => {
  const { fields, handleChange, handleSocialMediaChange } = props

  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t} />
      </Col>

      <Col lg={8}>
        <Row>
          <Col md={12}>
            <FormGroup className="inner-repeater">
              <Label>{props.t("social_media_url")}</Label>

              {fields?.socialMedia?.map((row, index) => {
                return (
                  <Row key={"soc-me" + index} className="mb-2">
                    <span className="col-md-3 col-form-label text-capitalize">
                      {row?.type}:
                    </span>

                    <Col md="9">
                      <Input
                        type="text"
                        className="inner form-control"
                        placeholder={props.t("enter_url")}
                        value={row?.link}
                        onChange={handleSocialMediaChange(
                          "socialMedia",
                          index,
                          "link"
                        )}
                      />
                    </Col>
                  </Row>
                )
              })}
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

SocialMedia.propTypes = {
  fields: PropTypes.object,
  handleSocialMediaChange: PropTypes.func,
}

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SocialMedia)
)
