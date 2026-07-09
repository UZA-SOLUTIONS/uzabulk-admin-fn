import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import Dropzone from "react-dropzone"
import CKEditor from "react-ckeditor-component"
import { isObject } from "lodash"
import Select from "react-select"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { Row, Col, Form, FormGroup, Label, Input, FormText } from "reactstrap"
import ColorPicker from "@vtaits/react-color-picker"
import "@vtaits/react-color-picker/dist/index.css"

import { uploadFile } from "store/actions"

import { FONT_OPTIONS } from "helpers/contants"

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
  const { fields, handleChange, handleThemeChange, onUploadFile, accesses } =
    props
  const wrapperRef = useRef(null)
  const wrapper_bgColorRef = useRef(null)
  const wrapper_fontColorRef = useRef(null)
  const banner_wrapperRef = useRef(null)
  const font_wrapperRef = useRef(null)
  const seconday_font_wrapperRef = useRef(null)
  const topNavigation_bg_wrapperRef = useRef(null)
  const topNavigation_font_wrapperRef = useRef(null)
  // navigation
  const navigation_bg_wrapperRef = useRef(null)
  const navigation_font_wrapperRef = useRef(null)
  // bodyWrapper
  const bodyWrapper_bg_wrapperRef = useRef(null)
  const bodyWrapper_font_wrapperRef = useRef(null)
  // button
  const button_bg_wrapperRef = useRef(null)
  const button_font_wrapperRef = useRef(null)
  // icons
  const icons_bg_wrapperRef = useRef(null)
  const icons_font_wrapperRef = useRef(null)
  // hyperlink
  const hyperlink_font_wrapperRef = useRef(null)
  // sideMenu
  const sideMenu_bg_wrapperRef = useRef(null)
  const sideMenu_font_wrapperRef = useRef(null)
  // footer Ref
  const footer_bg_wrapperRef = useRef(null)
  const footer_font_wrapperRef = useRef(null)

  const [editorId, seteditorId] = useState()
  const [editorText, setEditorText] = useState("")
  const [showColorPicker, setColorPicker] = useState(false)
  const [showWrapperBgColorPicker, setWrapperBgColorPicker] = useState(false)
  const [showWrapperFontColorPicker, setWrapperFontColorPicker] =
    useState(false)
  const [showBannerColorPicker, setBannerColorPicker] = useState(false)
  const [showFontColorPicker, setFontColorPicker] = useState(false)
  const [showSecondaryFontColorPicker, setSecondaryFontColorPicker] = useState(false)
  const [favIconselectedFiles, setfavIconselectedFiles] = useState([])
  const [logoselectedFiles, setlogoselectedFiles] = useState([])
  const [bannerselectedFiles, setbannerselectedFiles] = useState([])
  const [fontData, setfontData] = useState({})

  const [multiColorPicker, setmultiColorPicker] = useState("")

  useOutside(() => {
    setColorPicker(false)
  }, wrapperRef)

  useOutside(() => {
    setWrapperBgColorPicker(false)
  }, wrapper_bgColorRef)

  useOutside(() => {
    setWrapperFontColorPicker(false)
  }, wrapper_fontColorRef)

  useOutside(() => {
    setBannerColorPicker(false)
  }, banner_wrapperRef)

  useOutside(() => {
    setFontColorPicker(false)
  }, font_wrapperRef)

  useOutside(() => {
    setSecondaryFontColorPicker(false)
  }, seconday_font_wrapperRef)

  useOutside(() => {
    setmultiColorPicker(prevState =>
      prevState === "topNavigation_bg" ? "" : prevState
    )
  }, topNavigation_bg_wrapperRef)

  useOutside(() => {
    setmultiColorPicker(prevState =>
      prevState === "topNavigation_font" ? "" : prevState
    )
  }, topNavigation_font_wrapperRef)

  useOutside(() => {
    setmultiColorPicker(prevState =>
      prevState === "navigation_bg" ? "" : prevState
    )
  }, navigation_bg_wrapperRef)

  useOutside(() => {
    setmultiColorPicker(prevState =>
      prevState === "navigation_font" ? "" : prevState
    )
  }, navigation_font_wrapperRef)

  useOutside(() => {
    setmultiColorPicker(prevState =>
      prevState === "bodyWrapper_bg" ? "" : prevState
    )
  }, bodyWrapper_bg_wrapperRef)

  useOutside(() => {
    setmultiColorPicker(prevState =>
      prevState === "bodyWrapper_font" ? "" : prevState
    )
  }, bodyWrapper_font_wrapperRef)

  useOutside(() => {
    setmultiColorPicker(prevState =>
      prevState === "button_bg" ? "" : prevState
    )
  }, button_bg_wrapperRef)

  useOutside(() => {
    setmultiColorPicker(prevState =>
      prevState === "button_font" ? "" : prevState
    )
  }, button_font_wrapperRef)

  useOutside(() => {
    setmultiColorPicker(prevState =>
      prevState === "icons_bg" ? "" : prevState
    )
  }, icons_bg_wrapperRef)

  useOutside(() => {
    setmultiColorPicker(prevState =>
      prevState === "icons_font" ? "" : prevState
    )
  }, icons_font_wrapperRef)

  useOutside(() => {
    setmultiColorPicker(prevState =>
      prevState === "hyperlink_font" ? "" : prevState
    )
  }, hyperlink_font_wrapperRef)

  useOutside(() => {
    setmultiColorPicker(prevState =>
      prevState === "sideMenu_bg" ? "" : prevState
    )
  }, sideMenu_bg_wrapperRef)

  useOutside(() => {
    setmultiColorPicker(prevState =>
      prevState === "sideMenu_font" ? "" : prevState
    )
  }, sideMenu_font_wrapperRef)

  useOutside(() => {
    setmultiColorPicker(prevState =>
      prevState === "footer_bg" ? "" : prevState
    )
  }, footer_bg_wrapperRef)

  useOutside(() => {
    setmultiColorPicker(prevState =>
      prevState === "footer_font" ? "" : prevState
    )
  }, footer_font_wrapperRef)

  useEffect(() => {
    if (fields?.bannerText !== editorText) {
      seteditorId(`editor-${Math.random()}`)

      setEditorText(fields?.bannerText)
    }
  }, [fields?.bannerText])

  useEffect(() => {
    if (isObject(fields?.favIcon) && !!fields?.favIcon?.link) {
      setfavIconselectedFiles([{ preview: fields?.favIcon?.link }])
    }
  }, [JSON.stringify(fields?.favIcon)])

  useEffect(() => {
    if (isObject(fields?.logo) && !!fields?.logo?.link) {
      setlogoselectedFiles([{ preview: fields?.logo?.link }])
    }
  }, [JSON.stringify(fields?.logo)])

  useEffect(() => {
    if (isObject(fields?.bannerImage) && !!fields?.bannerImage?.link) {
      setbannerselectedFiles([{ preview: fields?.bannerImage?.link }])
    }
  }, [JSON.stringify(fields?.bannerImage)])

  useEffect(() => {
    if (fields?.font && fields?.font !== fontData?.label) {
      const _font = FONT_OPTIONS.filter(item => item.label === fields.font)

      if (_font?.length > 0) {
        setfontData(_font[0])
      }
    }
  }, [fields?.font])

  const uploadFileSuccess = name => response => {
    const { _id } = response.data

    handleChange(name)({ target: { value: _id } })
  }

  const handleAcceptedFiles = name => _files => {
    if (!accesses?.canEdit) return
    const files = _files?.filter(file => file.size < 5242880)

    if (files.length < _files.length) {
      return toastr.error("Maximum upload file size: 5MB")
    }

    onUploadFile({ image: files[0] }, uploadFileSuccess(name))

    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    if (name === "favIcon") {
      setfavIconselectedFiles(files)
    } else if (name === "logo") {
      setlogoselectedFiles(files)
    } else if (name === "bannerImage") {
      setbannerselectedFiles(files)
    }
  }

  function handleFontChange(data) {
    setfontData(data)

    handleThemeChange && handleThemeChange("font")({ target: data })
  }

  const handleColorChanges = (themeName, colorName) => value => {
    handleThemeChange(themeName)({
      target: { value: { ...fields[themeName], [colorName]: value } },
    })
  }


  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t} />
      </Col>

      <Col lg={8}>
        <Row>
          <Col sm={6} md={4} lg={6}>
            <div ref={wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("primary_bg_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.primaryColor}
                  onClick={() => {
                    setColorPicker(!showColorPicker)
                  }}
                  onChange={handleThemeChange("primaryColor")}
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
                        background: fields?.primaryColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {showColorPicker ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.primaryColor}
                  onDrag={color => {
                    handleThemeChange("primaryColor")({
                      target: { value: color },
                    })
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={font_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">{props.t("primary_font_color")}</Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.fontColor}
                  onClick={() => {
                    setFontColorPicker(!showFontColorPicker)
                  }}
                  onChange={handleThemeChange("fontColor")}
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setFontColorPicker(!showFontColorPicker)
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.fontColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {showFontColorPicker ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.fontColor}
                  onDrag={color => {
                    handleThemeChange("fontColor")({
                      target: { value: color },
                    })
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={banner_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("secondary_bg_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.secondaryColor}
                  onClick={() => {
                    setBannerColorPicker(!showBannerColorPicker)
                  }}
                  onChange={handleThemeChange("secondaryColor")}
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
                        background: fields?.secondaryColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {showBannerColorPicker ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.secondaryColor}
                  onDrag={color => {
                    handleThemeChange("secondaryColor")({
                      target: { value: color },
                    })
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={seconday_font_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">{props.t("secondary_font_color")}</Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.secondaryFontColor}
                  onClick={() => {
                    setSecondaryFontColorPicker(!showSecondaryFontColorPicker)
                  }}
                  onChange={handleThemeChange("secondaryFontColor")}
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setSecondaryFontColorPicker(!showSecondaryFontColorPicker)
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.secondaryFontColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {showSecondaryFontColorPicker ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.secondaryFontColor}
                  onDrag={color => {
                    handleThemeChange("secondaryFontColor")({
                      target: { value: color },
                    })
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={wrapper_bgColorRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("wrapper_bg_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.wrapperBackgroundColor}
                  onClick={() => {
                    setWrapperBgColorPicker(!showWrapperBgColorPicker)
                  }}
                  onChange={handleThemeChange("wrapperBackgroundColor")}
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setWrapperBgColorPicker(!showWrapperBgColorPicker)
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.wrapperBackgroundColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {showWrapperBgColorPicker ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.wrapperBackgroundColor}
                  onDrag={color => {
                    handleThemeChange("wrapperBackgroundColor")({
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
                {props.t("wrapper_font_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.wrapperFontColor}
                  onClick={() => {
                    setWrapperFontColorPicker(!showWrapperFontColorPicker)
                  }}
                  onChange={handleThemeChange("wrapperFontColor")}
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setWrapperFontColorPicker(!showWrapperFontColorPicker)
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.wrapperFontColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {showWrapperFontColorPicker ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.wrapperFontColor}
                  onDrag={color => {
                    handleThemeChange("wrapperFontColor")({
                      target: { value: color },
                    })
                  }}
                />
              ) : null}
            </div>
          </Col>

          {/* <Col sm={6} md={4} lg={6}>
            <FormGroup>
              <Label>{props.t("app_theme")}</Label>

              <div className="status-switch square-switch">
                <input
                  type="checkbox"
                  id="isAppDarkTheme"
                  className="switcher"
                  switch="none"
                  checked={fields?.isAppDarkTheme}
                  onChange={() => {
                    handleThemeChange &&
                      handleThemeChange("isAppDarkTheme")({
                        target: { value: !fields?.isAppDarkTheme },
                      })
                  }}
                />
                <label
                  htmlFor="isAppDarkTheme"
                  data-on-label={props.t("dark")}
                  data-off-label={props.t("light")}
                />
              </div>
            </FormGroup>
          </Col> */}
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

const mapStateToProps = ({ Settings }) => ({
  hideThings: Settings.settings.hideThings,
})

const mapDispatchToProps = dispatch => ({
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ThemeSettings)
)
