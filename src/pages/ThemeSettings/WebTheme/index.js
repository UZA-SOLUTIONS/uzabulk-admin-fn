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

import { Row, Col, Form, FormGroup, Label, Input, FormText,  } from "reactstrap"
import ColorPicker from "@vtaits/react-color-picker"
import "@vtaits/react-color-picker/dist/index.css"

import { uploadFile } from "store/actions"

import { FONT_OPTIONS, TOP_BAR_ICONS } from "helpers/contants"

import Instructions from "./Instructions"

// Images
import logo_placeholder from "assets/images/logo-placeholder.png"
import left_header from "assets/images/header-left.jpg"
import center_header from "assets/images/header-center.jpg"
import { Modal } from "react-bootstrap"

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
  const wrapper_fontColorRef = useRef(null)
  const banner_wrapperRef = useRef(null)
  const font_wrapperRef = useRef(null)
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
  const [showWrapperFontColorPicker, setWrapperFontColorPicker] =
    useState(false)
  const [showBannerColorPicker, setBannerColorPicker] = useState(false)
  const [showFontColorPicker, setFontColorPicker] = useState(false)
  const [favIconselectedFiles, setfavIconselectedFiles] = useState([])
  const [logoselectedFiles, setlogoselectedFiles] = useState([]) 
  const [bannerselectedFiles, setbannerselectedFiles] = useState([])
  const [fontData, setfontData] = useState({})
  const [headerStyle, setHeaderStyle] = useState()
  const [headerStyleLocal, setheaderStyleLocal] = useState(false)

  const [multiColorPicker, setmultiColorPicker] = useState("")

  const [show, setShow] = useState(-1)

  const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)

  useOutside(() => {
    setColorPicker(false)
  }, wrapperRef)

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

  useEffect(() => {
    if (
      !!headerStyle &&
      !headerStyleLocal &&
      headerStyle.value === fields.headerStyle
    )
      return
    switch (fields.headerStyle) {
      case "leftLogo":
        setHeaderStyle({ label: "left_logo", value: "leftLogo" })
        break

      default:
        setHeaderStyle({ label: "center_logo", value: "centerLogo" })
        break
    }
  }, [fields.headerStyle])

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
  const imageFile = favIconselectedFiles[0]
  const imageFile1 = logoselectedFiles[0]

  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t} />
      </Col>

      <Col lg={8}>
        <Row>
          <Col sm={6} md={4} lg={6} xl={4}>
            <FormGroup>
              <Label>{props.t("fav_icon")}</Label>

              <Dropzone
                onDrop={acceptedFiles => {
                  handleAcceptedFiles("favIcon")(acceptedFiles)
                }}
              >
                {({ getRootProps, getInputProps }) => {
                  const imageFile = favIconselectedFiles[0]

                  return (
                    <div
                      className="dropzone-single-image avatar-xl border"
                      {...getRootProps()}
                    >
                      <input
                        {...getInputProps()}
                        id="formrow-profile-image-Input"
                        multiple={false}
                      />

                      <img
                        className="rounded avatar-xl"
                        alt={
                          !!imageFile && imageFile.name ? imageFile.name : "uza"
                        }
                        src={!!imageFile ? imageFile.preview : logo_placeholder}
                      />

                      <div className="edit">
                        <i className="bx bx-pencil"></i>
                      </div>
                    </div>
                  )
                }}
              </Dropzone>

              <FormText className="d-inline-flex">
                {props.t("max_file_size")}
              </FormText>

              <a
                className="border-0 p-0 ml-2  d-inline-flex"
                onClick={() => setShow(1)}
              >
                {props.t("preview")}
              </a>

              <Modal
                className="transparent-pop"
                show={show ==1}
                onHide={handleClose}
              >
                <img
                  alt={!!imageFile && imageFile.name ? imageFile.name : "uza"}
                  src={!!imageFile ? imageFile.preview : logo_placeholder}
                />
              </Modal>
            </FormGroup>
          </Col>

          <Col sm={6} md={4} lg={6} xl={4}>
            <FormGroup>
              <Label>{props.t("logo")}</Label>

              <Dropzone
                onDrop={acceptedFiles => {
                  handleAcceptedFiles("logo")(acceptedFiles)
                }}
              >
                {({ getRootProps, getInputProps }) => {
                  const imageFile1 = logoselectedFiles[0]

                  return (
                    <div
                      className="dropzone-single-image avatar-xl border"
                      {...getRootProps()}
                    >
                      <input
                        {...getInputProps()}
                        id="formrow-profile-image-Input"
                        multiple={false}
                      />

                      <img
                        className="rounded avatar-xl"
                        alt={
                          !!imageFile1 && imageFile1.name ? imageFile1.name : "uza"
                        }
                        src={!!imageFile1 ? imageFile1.preview : logo_placeholder}
                      />

                      <div className="edit">
                        <i className="bx bx-pencil"></i>
                      </div>
                    </div>
                  )
                }}
              </Dropzone>

              <FormText className="d-inline-flex">
                {props.t("max_file_size")}
              </FormText>

              <a
                className="border-0 p-0 ml-2  d-inline-flex"
                onClick={() => setShow(2)}
              >
                {props.t("preview")}
              </a>

              <Modal
                className="transparent-pop"
                show={show == 2}
                onHide={handleClose}
              >
                <img
                  alt={!!imageFile1 && imageFile1.name ? imageFile1.name : "uza"}
                  src={!!imageFile1 ? imageFile1.preview : logo_placeholder}
                />
              </Modal>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col sm={6} md={4} lg={6} xl={4}>
            <FormGroup>
              <Label className="text-capitalize">
                {props.t("header_style")}
              </Label>

              <Select
                options={[
                  { label: "left_logo", value: "leftLogo" },
                  { label: "center_logo", value: "centerLogo" },
                ]}
                getOptionLabel={data => props.t(data.label)}
                value={headerStyle}
                onChange={data => {
                  setHeaderStyle(data)
                  setheaderStyleLocal(true)
                  handleThemeChange("headerStyle")({
                    target: data,
                  })
                }}
              />
            </FormGroup>
          </Col>

          <Col xs={12}>
            <img
              className="img-fluid card-img"
              src={
                fields?.headerStyle === "leftLogo" ? left_header : center_header
              }
              alt=""
            />
          </Col>
        </Row>

        <Row>
          {/* Top Bar */}
          <Col xs={12} className="mt-3">
            <div className="d-flex">
              <h5 className="text-uppercase">{props.t("top_bar")}</h5>

              <div className="square-switch ml-2">
                <input
                  type="checkbox"
                  id={`top-navigation-switch`}
                  switch="none"
                  checked={fields?.topNavigation?.status}
                  onChange={() =>
                    handleColorChanges &&
                    handleColorChanges(
                      "topNavigation",
                      "status"
                    )(!fields?.topNavigation?.status)
                  }
                />
                <label
                  htmlFor={`top-navigation-switch`}
                  data-on-label={props.t("on")}
                  data-off-label={props.t("off")}
                />
              </div>
            </div>

            <hr />
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={topNavigation_bg_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("background_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.topNavigation?.backgroundColor}
                  onClick={() => {
                    setmultiColorPicker(
                      multiColorPicker === "topNavigation_bg"
                        ? ""
                        : "topNavigation_bg"
                    )
                  }}
                  onChange={e =>
                    handleColorChanges(
                      "topNavigation",
                      "backgroundColor"
                    )(e.target.value)
                  }
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setmultiColorPicker(
                        multiColorPicker === "topNavigation_bg"
                          ? ""
                          : "topNavigation_bg"
                      )
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.topNavigation?.backgroundColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {multiColorPicker === "topNavigation_bg" ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.topNavigation?.backgroundColor}
                  onDrag={color => {
                    handleColorChanges(
                      "topNavigation",
                      "backgroundColor"
                    )(color)
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div
              ref={topNavigation_font_wrapperRef}
              className="form-group m-b-0"
            >
              <Label className="text-truncate">{props.t("font_color")}</Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.topNavigation?.fontColor}
                  onClick={() => {
                    setmultiColorPicker(
                      multiColorPicker === "topNavigation_font"
                        ? ""
                        : "topNavigation_font"
                    )
                  }}
                  onChange={e =>
                    handleColorChanges(
                      "topNavigation",
                      "fontColor"
                    )(e.target.value)
                  }
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setmultiColorPicker(
                        multiColorPicker === "topNavigation_font"
                          ? ""
                          : "topNavigation_font"
                      )
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.topNavigation?.fontColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {multiColorPicker === "topNavigation_font" ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.topNavigation?.fontColor}
                  onDrag={color => {
                    handleColorChanges("topNavigation", "fontColor")(color)
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col xs={12}>
            <FormGroup>
              <Label>{props.t("content")}</Label>

              <CKEditor
                content={fields?.topNavigation?.content}
                events={{
                  change: evt => {
                    const data = evt?.editor?.getData()

                    handleColorChanges("topNavigation", "content")(data)
                  },
                }}
                config={{
                  height: 250,
                  toolbar: [
                    [
                      "Undo",
                      "Redo",
                      "Font",
                      "FontSize",
                      "Styles",
                      "Format",
                      "-",
                      "Maximize",
                      "-",
                      "Source",
                    ],
                    [
                      "Bold",
                      "Italic",
                      "Underline",
                      "Strike",
                      "-",
                      "RemoveFormat",
                      "-",
                      "NumberedList",
                      "BulletedList",
                    ],
                    [
                      "Link",
                      "Unlink",
                      "-",
                      "JustifyLeft",
                      "JustifyCenter",
                      "JustifyRight",
                      "JustifyBlock",
                      "-",
                      "Outdent",
                      "Indent",
                      "-",
                      "TextColor",
                      "BGColor",
                    ],
                    [
                      "Image",
                      "Table",
                      "HorizontalRule",
                      "SpecialChar",
                      "-",
                      "Blockquote",
                      "ckeditorfa",
                    ],
                  ],
                }}
                scriptUrl="https://cdn.ckeditor.com/4.16.0/full/ckeditor.js"
              />
            </FormGroup>
          </Col>

          {/* <Col xs={12}>
            <FormGroup>
              <Label>
                {props.t("use_icons")}
                <div>
                  <small>{props.t("use_icons_int")}</small>
                </div>
              </Label>

              <Row>
                {TOP_BAR_ICONS.map((item, key) => (
                  <Col key={key} xs={4} className="mb-3">
                    <Link
                      className=""
                      onClick={e => {
                        e.preventDefault()

                        handleColorChanges(
                          "topNavigation",
                          "content"
                        )((fields?.topNavigation?.content || "") + item.value)
                      }}
                    >
                      <div className="font-size-22">{item.value}</div>
                      {item.label}
                    </Link>
                  </Col>
                ))}
              </Row>
            </FormGroup>
          </Col> */}

          {/* Navigation */}
          <Col xs={12} className="mt-3">
            <h5 className="text-uppercase">{props.t("navigation")}</h5>

            <hr />
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={navigation_bg_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("background_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.navigation?.backgroundColor}
                  onClick={() => {
                    setmultiColorPicker(
                      multiColorPicker === "navigation_bg"
                        ? ""
                        : "navigation_bg"
                    )
                  }}
                  onChange={e =>
                    handleColorChanges(
                      "navigation",
                      "backgroundColor"
                    )(e.target.value)
                  }
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setmultiColorPicker(
                        multiColorPicker === "navigation_bg"
                          ? ""
                          : "navigation_bg"
                      )
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.navigation?.backgroundColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {multiColorPicker === "navigation_bg" ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.navigation?.backgroundColor}
                  onDrag={color => {
                    handleColorChanges("navigation", "backgroundColor")(color)
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={navigation_font_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">{props.t("font_color")}</Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.navigation?.fontColor}
                  onClick={() => {
                    setmultiColorPicker(
                      multiColorPicker === "navigation_font"
                        ? ""
                        : "navigation_font"
                    )
                  }}
                  onChange={e =>
                    handleColorChanges(
                      "navigation",
                      "fontColor"
                    )(e.target.value)
                  }
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setmultiColorPicker(
                        multiColorPicker === "navigation_font"
                          ? ""
                          : "navigation_font"
                      )
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.navigation?.fontColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {multiColorPicker === "navigation_font" ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.navigation?.fontColor}
                  onDrag={color => {
                    handleColorChanges("navigation", "fontColor")(color)
                  }}
                />
              ) : null}
            </div>
          </Col>

          {/* bodyWrapper */}
          <Col xs={12} className="mt-3">
            <h5 className="text-uppercase">{props.t("body_wrapper")}</h5>

            <hr />
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={bodyWrapper_bg_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("background_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.bodyWrapper?.backgroundColor}
                  onClick={() => {
                    setmultiColorPicker(
                      multiColorPicker === "bodyWrapper_bg"
                        ? ""
                        : "bodyWrapper_bg"
                    )
                  }}
                  onChange={e =>
                    handleColorChanges(
                      "bodyWrapper",
                      "backgroundColor"
                    )(e.target.value)
                  }
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setmultiColorPicker(
                        multiColorPicker === "bodyWrapper_bg"
                          ? ""
                          : "bodyWrapper_bg"
                      )
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.bodyWrapper?.backgroundColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {multiColorPicker === "bodyWrapper_bg" ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.bodyWrapper?.backgroundColor}
                  onDrag={color => {
                    handleColorChanges("bodyWrapper", "backgroundColor")(color)
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={bodyWrapper_font_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">{props.t("font_color")}</Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.bodyWrapper?.fontColor}
                  onClick={() => {
                    setmultiColorPicker(
                      multiColorPicker === "bodyWrapper_font"
                        ? ""
                        : "bodyWrapper_font"
                    )
                  }}
                  onChange={e =>
                    handleColorChanges(
                      "bodyWrapper",
                      "fontColor"
                    )(e.target.value)
                  }
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setmultiColorPicker(
                        multiColorPicker === "bodyWrapper_font"
                          ? ""
                          : "bodyWrapper_font"
                      )
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.bodyWrapper?.fontColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {multiColorPicker === "bodyWrapper_font" ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.bodyWrapper?.fontColor}
                  onDrag={color => {
                    handleColorChanges("bodyWrapper", "fontColor")(color)
                  }}
                />
              ) : null}
            </div>
          </Col>

          {/* button */}
          <Col xs={12} className="mt-3">
            <h5 className="text-uppercase">{props.t("button")}</h5>

            <hr />
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={button_bg_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("background_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.button?.backgroundColor}
                  onClick={() => {
                    setmultiColorPicker(
                      multiColorPicker === "button_bg" ? "" : "button_bg"
                    )
                  }}
                  onChange={e =>
                    handleColorChanges(
                      "button",
                      "backgroundColor"
                    )(e.target.value)
                  }
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setmultiColorPicker(
                        multiColorPicker === "button_bg" ? "" : "button_bg"
                      )
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.button?.backgroundColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {multiColorPicker === "button_bg" ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.button?.backgroundColor}
                  onDrag={color => {
                    handleColorChanges("button", "backgroundColor")(color)
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={button_font_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">{props.t("font_color")}</Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.button?.fontColor}
                  onClick={() => {
                    setmultiColorPicker(
                      multiColorPicker === "button_font" ? "" : "button_font"
                    )
                  }}
                  onChange={e =>
                    handleColorChanges("button", "fontColor")(e.target.value)
                  }
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setmultiColorPicker(
                        multiColorPicker === "button_font" ? "" : "button_font"
                      )
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.button?.fontColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {multiColorPicker === "button_font" ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.button?.fontColor}
                  onDrag={color => {
                    handleColorChanges("button", "fontColor")(color)
                  }}
                />
              ) : null}
            </div>
          </Col>

          {/* icons */}
          <Col xs={12} className="mt-3">
            <h5 className="text-uppercase">{props.t("icons")}</h5>

            <hr />
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={icons_bg_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("background_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.icons?.backgroundColor}
                  onClick={() => {
                    setmultiColorPicker(
                      multiColorPicker === "icons_bg" ? "" : "icons_bg"
                    )
                  }}
                  onChange={e =>
                    handleColorChanges(
                      "icons",
                      "backgroundColor"
                    )(e.target.value)
                  }
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setmultiColorPicker(
                        multiColorPicker === "icons_bg" ? "" : "icons_bg"
                      )
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.icons?.backgroundColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {multiColorPicker === "icons_bg" ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.icons?.backgroundColor}
                  onDrag={color => {
                    handleColorChanges("icons", "backgroundColor")(color)
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={icons_font_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">{props.t("font_color")}</Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.icons?.fontColor}
                  onClick={() => {
                    setmultiColorPicker(
                      multiColorPicker === "icons_font" ? "" : "icons_font"
                    )
                  }}
                  onChange={e =>
                    handleColorChanges("icons", "fontColor")(e.target.value)
                  }
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setmultiColorPicker(
                        multiColorPicker === "icons_font" ? "" : "icons_font"
                      )
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.icons?.fontColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {multiColorPicker === "icons_font" ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.icons?.fontColor}
                  onDrag={color => {
                    handleColorChanges("icons", "fontColor")(color)
                  }}
                />
              ) : null}
            </div>
          </Col>

          {/* hyperlink */}
          <Col xs={12} className="mt-3">
            <h5 className="text-uppercase">{props.t("hyperlink")}</h5>

            <hr />
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={hyperlink_font_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">{props.t("font_color")}</Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.hyperlink?.fontColor}
                  onClick={() => {
                    setmultiColorPicker(
                      multiColorPicker === "hyperlink_font"
                        ? ""
                        : "hyperlink_font"
                    )
                  }}
                  onChange={e =>
                    handleColorChanges("hyperlink", "fontColor")(e.target.value)
                  }
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setmultiColorPicker(
                        multiColorPicker === "hyperlink_font"
                          ? ""
                          : "hyperlink_font"
                      )
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.hyperlink?.fontColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {multiColorPicker === "hyperlink_font" ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.hyperlink?.fontColor}
                  onDrag={color => {
                    handleColorChanges("hyperlink", "fontColor")(color)
                  }}
                />
              ) : null}
            </div>
          </Col>

          {/* sideMenu */}
          <Col xs={12} className="mt-3">
            <h5 className="text-uppercase">{props.t("side_menu")}</h5>

            <hr />
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={sideMenu_bg_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("background_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.sideMenu?.backgroundColor}
                  onClick={() => {
                    setmultiColorPicker(
                      multiColorPicker === "sideMenu_bg" ? "" : "sideMenu_bg"
                    )
                  }}
                  onChange={e =>
                    handleColorChanges(
                      "sideMenu",
                      "backgroundColor"
                    )(e.target.value)
                  }
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setmultiColorPicker(
                        multiColorPicker === "sideMenu_bg" ? "" : "sideMenu_bg"
                      )
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.sideMenu?.backgroundColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {multiColorPicker === "sideMenu_bg" ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.sideMenu?.backgroundColor}
                  onDrag={color => {
                    handleColorChanges("sideMenu", "backgroundColor")(color)
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={sideMenu_font_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">{props.t("font_color")}</Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.sideMenu?.fontColor}
                  onClick={() => {
                    setmultiColorPicker(
                      multiColorPicker === "sideMenu_font"
                        ? ""
                        : "sideMenu_font"
                    )
                  }}
                  onChange={e =>
                    handleColorChanges("sideMenu", "fontColor")(e.target.value)
                  }
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setmultiColorPicker(
                        multiColorPicker === "sideMenu_font"
                          ? ""
                          : "sideMenu_font"
                      )
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.sideMenu?.fontColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {multiColorPicker === "sideMenu_font" ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.sideMenu?.fontColor}
                  onDrag={color => {
                    handleColorChanges("sideMenu", "fontColor")(color)
                  }}
                />
              ) : null}
            </div>
          </Col>

          {/* footer */}
          <Col xs={12} className="mt-3">
            <h5 className="text-uppercase">{props.t("footer")}</h5>

            <hr />
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={footer_bg_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">
                {props.t("background_color")}
              </Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.footer?.backgroundColor}
                  onClick={() => {
                    setmultiColorPicker(
                      multiColorPicker === "footer_bg" ? "" : "footer_bg"
                    )
                  }}
                  onChange={e =>
                    handleColorChanges(
                      "footer",
                      "backgroundColor"
                    )(e.target.value)
                  }
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setmultiColorPicker(
                        multiColorPicker === "footer_bg" ? "" : "footer_bg"
                      )
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.footer?.backgroundColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {multiColorPicker === "footer_bg" ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.footer?.backgroundColor}
                  onDrag={color => {
                    handleColorChanges("footer", "backgroundColor")(color)
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <div ref={footer_font_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">{props.t("font_color")}</Label>

              <div
                className="input-group colorpicker-default mb-1"
                title="Using format option"
              >
                <Input
                  type="text"
                  className="colorpicker-rgba form-control"
                  value={fields?.footer?.fontColor}
                  onClick={() => {
                    setmultiColorPicker(
                      multiColorPicker === "footer_font" ? "" : "footer_font"
                    )
                  }}
                  onChange={e =>
                    handleColorChanges("footer", "fontColor")(e.target.value)
                  }
                />

                <span className="input-group-append">
                  <span
                    className="input-group-text colorpicker-input-addon"
                    onClick={() => {
                      setmultiColorPicker(
                        multiColorPicker === "footer_font" ? "" : "footer_font"
                      )
                    }}
                  >
                    <i
                      style={{
                        height: "16px",
                        width: "16px",
                        background: fields?.footer?.fontColor,
                      }}
                    />
                  </span>
                </span>
              </div>

              {multiColorPicker === "footer_font" ? (
                <ColorPicker
                  saturationHeight={100}
                  saturationWidth={120}
                  value={fields?.footer?.fontColor}
                  onDrag={color => {
                    handleColorChanges("footer", "fontColor")(color)
                  }}
                />
              ) : null}
            </div>
          </Col>

          <Col xs={12}>
            <div className="form-group">
              <Label className="text-truncate">{props.t("custom_css")}</Label>

              <Input
                type="textarea"
                onChange={handleThemeChange("customCss")}
                value={fields.customCss}
                rows={6}
              />

              <FormText>{props.t("custom_css_int")}</FormText>
            </div>
          </Col>

          <Col xs={12}>
            <div className="form-group">
              <Label className="text-truncate">{props.t("custom_js")}</Label>

              <Input
                type="textarea"
                onChange={handleThemeChange("customJs")}
                value={fields.customJs}
                rows={6}
              />

              <FormText>{props.t("custom_js_int")}</FormText>
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

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ThemeSettings)
)
