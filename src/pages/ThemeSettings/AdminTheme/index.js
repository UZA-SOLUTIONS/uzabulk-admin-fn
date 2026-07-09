import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Row, Col, Label, Input } from "reactstrap"
import ColorPicker from "@vtaits/react-color-picker"
import "@vtaits/react-color-picker/dist/index.css"

import { uploadFile } from "store/actions"

import Instructions from "./Instructions"

/**
 * Formats the size
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

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

const ThemeSettings = props => {
  const { fields, handleChange, handleThemeChange } = props
  const wrapperRef = useRef(null)
  const banner_wrapperRef = useRef(null)

  const [showColorPicker, setColorPicker] = useState(false)
  const [showBannerColorPicker, setBannerColorPicker] = useState(false)

  useOutside(() => {
    setColorPicker(false)
  }, wrapperRef)

  useOutside(() => {
    setBannerColorPicker(false)
  }, banner_wrapperRef)

  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t} />
      </Col>

      <Col lg={8}>
        <Row>
          <Col sm={6} md={4} lg={6} xl={4}>
            <div ref={wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("primary_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.adminPrimaryBackgroundColor}
                  onClick={() => {
                    setColorPicker(!showColorPicker)
                  }}
                  onChange={handleThemeChange("adminPrimaryBackgroundColor")}
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setColorPicker(!showColorPicker)
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.adminPrimaryBackgroundColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {showColorPicker ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.adminPrimaryBackgroundColor}
                  onDrag={color => {
                    handleThemeChange("adminPrimaryBackgroundColor")({
                      target: { value: color },
                    })
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6} xl={4}>
            <div ref={banner_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("primary_font_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.adminPrimaryFontColor}
                  onClick={() => {
                    setBannerColorPicker(!showBannerColorPicker)
                  }}
                  onChange={handleThemeChange("adminPrimaryFontColor")}
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setBannerColorPicker(!showBannerColorPicker)
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.adminPrimaryFontColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {showBannerColorPicker ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.adminPrimaryFontColor}
                  onDrag={color => {
                    handleThemeChange("adminPrimaryFontColor")({
                      target: { value: color },
                    })
                  }}
                />
              ) : null}
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

ThemeSettings.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
  handleThemeChange: PropTypes.func,
  onUploadFile: PropTypes.func,
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ThemeSettings)
)
