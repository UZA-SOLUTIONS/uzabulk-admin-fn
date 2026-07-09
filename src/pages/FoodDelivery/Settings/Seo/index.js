import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

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
} from "reactstrap"

const Seo = props => {
  const { fields, handleSeoChange } = props

  return (
    <Row>
      <Col lg={4}>
        <h4>{props.t("seo_settings")}</h4>
      </Col>

      <Col lg={8}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>{props.t("title")}</Label>

              <Input
                type="text"
                value={fields?.seoSettings?.title}
                onChange={handleSeoChange("title")}
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("meta_keywords")}</Label>

              <Input
                type="textarea"
                rows={2}
                value={fields?.seoSettings?.metaKeywords}
                onChange={handleSeoChange("metaKeywords")}
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("meta_description")}</Label>

              <Input
                type="textarea"
                rows={2}
                value={fields?.seoSettings?.metaDescription}
                onChange={handleSeoChange("metaDescription")}
              />
            </FormGroup>
          </Col>

          <Col xs={12}>
            <h5>{props.t("facebook")}</h5>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("title")}</Label>

              <Input
                type="text"
                value={fields?.seoSettings?.facebook?.title}
                onChange={e =>
                  handleSeoChange("facebook")({
                    target: {
                      value: {
                        ...fields?.seoSettings.facebook,
                        title: e.target.value,
                      },
                    },
                  })
                }
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("description")}</Label>

              <Input
                type="textarea"
                rows={2}
                value={fields?.seoSettings?.facebook?.description}
                onChange={e =>
                  handleSeoChange("facebook")({
                    target: {
                      value: {
                        ...fields?.seoSettings.facebook,
                        description: e.target.value,
                      },
                    },
                  })
                }
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("image_url")}</Label>

              <Input
                type="text"
                value={fields?.seoSettings?.facebook?.image}
                onChange={e =>
                  handleSeoChange("facebook")({
                    target: {
                      value: {
                        ...fields?.seoSettings.facebook,
                        image: e.target.value,
                      },
                    },
                  })
                }
              />
            </FormGroup>
          </Col>

          <Col xs={12}>
            <h5>{props.t("twitter")}</h5>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("username")}</Label>

              <Input
                type="text"
                value={fields?.seoSettings?.twitter?.username}
                onChange={e =>
                  handleSeoChange("twitter")({
                    target: {
                      value: {
                        ...fields?.seoSettings.twitter,
                        username: e.target.value,
                      },
                    },
                  })
                }
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("title")}</Label>

              <Input
                type="text"
                value={fields?.seoSettings?.twitter?.title}
                onChange={e =>
                  handleSeoChange("twitter")({
                    target: {
                      value: {
                        ...fields?.seoSettings.twitter,
                        title: e.target.value,
                      },
                    },
                  })
                }
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("description")}</Label>

              <Input
                type="textarea"
                rows={2}
                value={fields?.seoSettings?.twitter?.description}
                onChange={e =>
                  handleSeoChange("twitter")({
                    target: {
                      value: {
                        ...fields?.seoSettings.twitter,
                        description: e.target.value,
                      },
                    },
                  })
                }
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("image_url")}</Label>

              <Input
                type="text"
                value={fields?.seoSettings?.twitter?.image}
                onChange={e =>
                  handleSeoChange("twitter")({
                    target: {
                      value: {
                        ...fields?.seoSettings.twitter,
                        image: e.target.value,
                      },
                    },
                  })
                }
              />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Seo.propTypes = {}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Seo))
