import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Dropzone from "react-dropzone"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
// import ClassicEditor from "plugins/ckeditor/build/ckeditor"
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

// Images
import logo_placeholder from "assets/images/logo-placeholder.png"

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
  const {
    fields,
    handleChange,
    handleThemeChange,
    onUploadFile,
    accesses,
  } = props
  const wrapperRef = useRef(null)
  const banner_wrapperRef = useRef(null)
  const font_wrapperRef = useRef(null)

  const [editorId, seteditorId] = useState()
  const [editorText, setEditorText] = useState("")
  const [showColorPicker, setColorPicker] = useState(false)
  const [showBannerColorPicker, setBannerColorPicker] = useState(false)
  const [showFontColorPicker, setFontColorPicker] = useState(false)
  const [favIconselectedFiles, setfavIconselectedFiles] = useState([])
  const [logoselectedFiles, setlogoselectedFiles] = useState([])
  const [bannerselectedFiles, setbannerselectedFiles] = useState([])
  const [fontData, setfontData] = useState({})

  useOutside(() => {
    setColorPicker(false)
  }, wrapperRef)

  useOutside(() => {
    setBannerColorPicker(false)
  }, banner_wrapperRef)

  useOutside(() => {
    setFontColorPicker(false)
  }, font_wrapperRef)

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

  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t} />
      </Col>

      <Col lg={8}>
        <Row>
          <Col sm={6} md={4} lg={6} xl={4}>
            <div ref={wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">{props.t("primary_color")}</Label>

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

          <Col sm={6} md={4} lg={6} xl={4}>
            <div ref={banner_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">{props.t("secondary_color")}</Label>

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

          <Col sm={6} md={4} lg={6} xl={4}>
            <div ref={font_wrapperRef} className="form-group m-b-0">
              <Label className="text-truncate">{props.t("font_color")}</Label>

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
        </Row>

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

              <FormText>{props.t("max_file_size")}</FormText>
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
                  const imageFile = logoselectedFiles[0]

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

              <FormText>{props.t("max_file_size")}</FormText>
            </FormGroup>
          </Col>

          {/* <Col sm={6} md={4} lg={6} xl={4}>
              <FormGroup>
                <Label>{props.t("banner_200_500")}</Label>

                <Dropzone
                  onDrop={acceptedFiles => {
                    handleAcceptedFiles("bannerImage")(acceptedFiles)
                  }}
                >
                  {({ getRootProps, getInputProps }) => {
                    const imageFile = bannerselectedFiles[0]

                    return (
                      <div
                        className="dropzone-single-image"
                        {...getRootProps()}
                        style={{
                          width: "9.5rem",
                        }}
                      >
                        <div
                          style={{
                            width: "9.5rem",
                          }}
                          className="avatar-xl d-flex align-items-center border"
                        >
                          <input
                            {...getInputProps()}
                            id="formrow-profile-image-Input"
                            multiple={false}
                          />

                          <img
                            className="rounded avatar-xl"
                            style={{
                              width: "9.5rem",
                              objectFit: "cover",
                              height: "5rem",
                            }}
                            alt={
                              !!imageFile && imageFile.name
                                ? imageFile.name
                                : "uza"
                            }
                            src={
                              !!imageFile ? imageFile.preview : logo_placeholder
                            }
                          />
                        </div>

                        <div className="edit">
                          <i className="bx bx-pencil"></i>
                        </div>
                      </div>
                    )
                  }}
                </Dropzone>

                <FormText>{props.t("max_file_size")}</FormText>
              </FormGroup>
            </Col> */}

          {/* <Col md={4}>
              <FormGroup>
                <Label for="formrow-InputFonts">Fonts</Label>
                <Select
                  placeholder=""
                  options={FONT_OPTIONS}
                  classNamePrefix="select2-selection"
                  value={fontData}
                  onChange={handleFontChange}
                />
              </FormGroup>
            </Col> */}

          {/* <Col md={12} lg={12}>
              <FormGroup>
                <Label>{props.t("banner_text")}</Label>

                <CKEditor
                  id={editorId}
                  editor={ClassicEditor}
                  data={editorText}
                  config={{
                    toolbar: ["heading", "|", "bold", "italic", "link", "FontBackgroundColor", "FontColor"],
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData()

                    setEditorText(data)
                    handleChange("bannerText")({
                      target: { value: data },
                    })
                  }}
                />
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

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ThemeSettings)
)
