import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import ColorPicker from "@vtaits/react-color-picker"
import "@vtaits/react-color-picker/dist/index.css"
import Select from "react-select"

import { Row, Col, Form, FormGroup, Label, Input, InputGroup } from "reactstrap"
import Instructions from "./Instructions"

function useOutside(callback, ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback && callback()
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}

const CookiePolicy = props => {
  const { fields, handleChange, currency } = props

  const wrapper_bgColorRef = useRef(null)
  const wrapper_fontColorRef = useRef(null)
  const wrapper_buttonbgColorRef = useRef(null)
  const wrapper_buttonfontColorRef = useRef(null)
  const wrapper_linkfontColorRef = useRef(null)

  const [showWrapperBgColorPicker, setWrapperBgColorPicker] = useState(false)
  const [showWrapperFontColorPicker, setWrapperFontColorPicker] =
    useState(false)
  const [showWrapperButtonBgColorPicker, setWrapperButtonBgColorPicker] =
    useState(false)
  const [showWrapperButtonFontColorPicker, setWrapperButtonFontColorPicker] =
    useState(false)
  const [showWrapperLinkFontColorPicker, setWrapperLinkFontColorPicker] =
    useState(false)

  const [bodyStyle, setBodyStyle] = useState()
  const [bodyStyleLocal, setbodyStyleLocal] = useState(false)

  useOutside(() => {
    setWrapperBgColorPicker(false)
  }, wrapper_bgColorRef)

  useOutside(() => {
    setWrapperFontColorPicker(false)
  }, wrapper_fontColorRef)

  useOutside(() => {
    setWrapperButtonBgColorPicker(false)
  }, wrapper_buttonbgColorRef)

  useOutside(() => {
    setWrapperButtonFontColorPicker(false)
  }, wrapper_buttonfontColorRef)

  useOutside(() => {
    setWrapperLinkFontColorPicker(false)
  }, wrapper_linkfontColorRef)

  useEffect(() => {
    if (!!bodyStyle && !bodyStyleLocal && bodyStyle.value === fields.bodyStyle)
      return

    switch (fields.bodyStyle) {
      case "horizontalBar":
        setBodyStyle({ label: "horizontal_bar", value: "horizontalBar" })
        break

      default:
        setBodyStyle({ label: "box_style", value: "boxStyle" })
        break
    }
  }, [fields.bodyStyle])

  const handleCookieChange = name => e => {
    handleChange("cookiePolicy")({
      target: { value: { ...fields, [name]: e.target.value } },
    })
  }  

  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t} />
      </Col>

      <Col lg={8}>
        <Row>
          <Col xs={12} className="mt-3">
            <div className="d-flex">
              <h5 className="text-uppercase">{props.t("cookie_policy")}</h5>

              <div className="square-switch ml-2">
                <input
                  type="checkbox"
                  id={`cookie-policy-status-switch`}
                  switch="none"
                  checked={fields?.status == "yes"}
                  onChange={() =>
                    handleChange &&
                    handleChange("cookiePolicy")({
                      target: {
                        value: {
                          ...fields,
                          status: fields?.status === "yes" ? "no" : "yes",
                        },
                      },
                    })
                  }
                />
                <label
                  htmlFor={`cookie-policy-status-switch`}
                  data-on-label={props.t("on")}
                  data-off-label={props.t("off")}
                />
              </div>
            </div>

            <hr />
          </Col>

          <Col xs={12}>
            <FormGroup>
              <Label>{props.t("heading")}</Label>

              <Input
                onChange={handleCookieChange("heading")}
                value={fields.heading}
              />
            </FormGroup>
          </Col>

          <Col xs={12}>
            <div className="form-group">
              <Label className="text-truncate">{props.t("description")}</Label>

              <Input
                type="textarea"
                onChange={handleCookieChange("description")}
                value={fields.description}
                rows={6}
              />
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={wrapper_bgColorRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("body_background_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.bodyBackgroundColor}
                  onClick={() => {
                    setWrapperBgColorPicker(prevState => !prevState)
                  }}
                  onChange={handleCookieChange("bodyBackgroundColor")}
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setWrapperBgColorPicker(prevState => !prevState)
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.bodyBackgroundColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {showWrapperBgColorPicker ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.bodyBackgroundColor}
                  onDrag={color => {
                    handleCookieChange("bodyBackgroundColor")({
                      target: { value: color },
                    })
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={wrapper_fontColorRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("body_font_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.bodyFontColor}
                  onClick={() => {
                    setWrapperFontColorPicker(prevState => !prevState)
                  }}
                  onChange={handleCookieChange("bodyFontColor")}
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setWrapperFontColorPicker(prevState => !prevState)
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.bodyFontColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {showWrapperFontColorPicker ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.bodyFontColor}
                  onDrag={color => {
                    handleCookieChange("bodyFontColor")({
                      target: { value: color },
                    })
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <FormGroup>
              <Label className="text-capitalize">{props.t("body_style")}</Label>

              <Select
                options={[
                  { label: "box_style", value: "boxStyle" },
                  { label: "horizontal_bar", value: "horizontalBar" },
                ]}
                getOptionLabel={data => props.t(data.label)}
                value={bodyStyle}
                onChange={data => {
                  setBodyStyle(data)
                  setbodyStyleLocal(true)
                  handleCookieChange("bodyStyle")({
                    target: data,
                  })
                }}
              />
            </FormGroup>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <FormGroup>
              <Label>{props.t("button_label")}</Label>

              <Input
                onChange={handleCookieChange("buttonLabel")}
                value={fields.buttonLabel}
              />
            </FormGroup>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={wrapper_buttonbgColorRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("button_background_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.buttonBackgroundColor}
                  onClick={() => {
                    setWrapperButtonBgColorPicker(prevState => !prevState)
                  }}
                  onChange={handleCookieChange("buttonBackgroundColor")}
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setWrapperButtonBgColorPicker(prevState => !prevState)
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.buttonBackgroundColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {showWrapperButtonBgColorPicker ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.buttonBackgroundColor}
                  onDrag={color => {
                    handleCookieChange("buttonBackgroundColor")({
                      target: { value: color },
                    })
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={wrapper_buttonfontColorRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("button_font_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.buttonFontColor}
                  onClick={() => {
                    setWrapperButtonFontColorPicker(prevState => !prevState)
                  }}
                  onChange={handleCookieChange("buttonFontColor")}
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setWrapperButtonFontColorPicker(prevState => !prevState)
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.buttonFontColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {showWrapperButtonFontColorPicker ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.buttonFontColor}
                  onDrag={color => {
                    handleCookieChange("buttonFontColor")({
                      target: { value: color },
                    })
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <FormGroup>
              <Label>{props.t("link_label")}</Label>

              <Input
                onChange={handleCookieChange("linkLabel")}
                value={fields.linkLabel}
              />
            </FormGroup>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <FormGroup>
              <Label>{props.t("link_url")}</Label>

              <Input
                onChange={handleCookieChange("linkUrl")}
                value={fields.linkUrl}
              />
            </FormGroup>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={wrapper_linkfontColorRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("link_font_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.linkFontColor}
                  onClick={() => {
                    setWrapperLinkFontColorPicker(prevState => !prevState)
                  }}
                  onChange={handleCookieChange("linkFontColor")}
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setWrapperLinkFontColorPicker(prevState => !prevState)
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.linkFontColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {showWrapperLinkFontColorPicker ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.linkFontColor}
                  onDrag={color => {
                    handleCookieChange("linkFontColor")({
                      target: { value: color },
                    })
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <FormGroup>
              <Label>{props.t("link_target")}</Label>

              <div className="switch-xl square-switch">
                <input
                  type="checkbox"
                  id="link-target-switch"
                  className="switcher"
                  switch="none"
                  checked={fields.linkTarget == "_self"}
                  onChange={() => {
                    const value =
                      fields.linkTarget == "_self" ? "_blank" : "_self"

                    handleCookieChange("linkTarget")({ target: { value } })
                  }}
                />
                <label
                  htmlFor="link-target-switch"
                  data-on-label={props.t("_self")}
                  data-off-label={props.t("_blank")}
                />
              </div>
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

CookiePolicy.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CookiePolicy)
)
