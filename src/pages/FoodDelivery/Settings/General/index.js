import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Dropzone from "react-dropzone"
/* import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic" */
import { isObject, isEmpty } from "lodash"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  FormText,
} from "reactstrap"

import { uploadFile } from "store/actions"

// Images
import avatar4 from "assets/images/store/file.png"
import Instructions from "./Instructions"
import { Modal } from "react-bootstrap"
import IconAdd from "../IconAdd"
import { SLUGS_NAME } from "helpers/contants"

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

const GeneralSettings = props => {
  const {
    fields,

    handleChange,
    onUploadFile,
    currentPlan,
    _STORE_SETTINGS_FORM,
    activestore,
    slug,
  } = props

  const [codMethod, setcodMethod] = useState({})
  const [selectedFiles, setselectedFiles] = useState([])
  const [editorId, seteditorId] = useState("")
  const [editorText, setEditorText] = useState("")
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const imageFile = selectedFiles[0]

  useEffect(() => {
    let method = props.store?.paymentSettings.filter(
      method => method.payment_method === "cod"
    )

    if (method.length > 0) {
      setcodMethod(method[0])
    }
  }, [props.store])

  useEffect(() => {
    if (isObject(fields?.storeTypeImage) && !!fields?.storeTypeImage?.link) {
      setselectedFiles([{ preview: fields?.storeTypeImage?.link }])
    } else if (!fields?.storeTypeImage) {
      setselectedFiles([])
    }
  }, [JSON.stringify(fields?.storeTypeImage)])

  useEffect(() => {
    /* if (fields?.storeText !== editorText) {
      seteditorId(`editor-${Math.random()}`)
      setEditorText(isEmpty(fields?.storeText) ? "" : fields?.storeText)
    } */
  }, [fields?.storeText])

  const uploadFileSuccess = name => response => {
    const { _id } = response?.data

    handleChange(name)({ target: { value: _id } })
  }

  function handleAcceptedFiles(_files) {
    const files = _files?.filter(file => file.size < 5242880)

    if (files.length < _files.length) {
      return toastr.error(props.t("max_file_size"))
    }

    onUploadFile({ image: files[0] }, uploadFileSuccess("storeTypeImage"))

    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
  }

  // console.log(_STORE_SETTINGS_FORM, "_STORE_SETTINGS_FORM");
  return (
    <Row>
      <Col lg={4}>
        <Instructions
          fields={props?.store}
          t={props.t}
          _STORE_SETTINGS_FORM={_STORE_SETTINGS_FORM}
          storeType={activestore?.storeType}
          plan={currentPlan?.billingPlan?.type}
        />
      </Col>

      <Col lg={8}>
        <Form>
          <Row>
            {!["basic", "premium"].includes(currentPlan?.billingPlan?.type) && (
              <Col md={6}>
                <FormGroup>
                  <Label>{props.t("store_image")}</Label>

                  <Dropzone
                    onDrop={acceptedFiles => {
                      handleAcceptedFiles(acceptedFiles)
                    }}
                  >
                    {({ getRootProps, getInputProps }) => {
                      const imageFile = selectedFiles[0]

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
                            style={{ height: "auto" }}
                            alt={
                              !!imageFile && imageFile.name
                                ? imageFile.name
                                : "uza"
                            }
                            src={!!imageFile ? imageFile.preview : avatar4}
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
                    onClick={handleShow}
                  >
                    {props.t("preview")}
                  </a>

                  <Modal
                    className="transparent-pop"
                    show={show}
                    onHide={handleClose}
                  >
                    <img
                      alt={
                        !!imageFile && imageFile.name ? imageFile.name : "uza"
                      }
                      src={!!imageFile ? imageFile.preview : avatar4}
                    />
                  </Modal>
                </FormGroup>
              </Col>
            )}
            {/* {[SLUGS_NAME.oneTimeShop].includes(slug) &&  */}

            <Col md={6}>
              <IconAdd
                handleChange={handleChange}
                fields={{
                  storeTypeIcon: fields?.storeTypeIcon || "",
                }}
                t={props.t}
              />
            </Col>
            {/* }{" "} */}
            {/* <Col md={8}>
              <FormGroup>
                <Label>Store Type Text</Label>

                <CKEditor
                  id={editorId}
                  editor={ClassicEditor}
                  data={fields?.storeText}
                  config={{
                    toolbar: ["heading", "|", "bold", "italic", "link"],
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData()

                    setEditorText(data)
                    handleChange("storeText")({
                      target: { value: data },
                    })
                  }}
                />
              </FormGroup>
            </Col> */}
            {/* {_STORE_SETTINGS_FORM.deliveryAreaVendor && (
              <Col md={6}>
                <FormGroup>
                  <Label>
                    {props.t("delivery_area_vendor")} ({props.t("delivery")})
                  </Label>

                  <InputGroup>
                    <Input
                      type="number"
                      value={fields?.deliveryAreaVendor}
                      onChange={handleChange("deliveryAreaVendor")}
                      min={0}
                    />

                    <div className="input-group-append">
                      <span className="input-group-text">
                        {props?.store?.distanceUnit}
                      </span>
                    </div>
                  </InputGroup>
                </FormGroup>
              </Col>
            )} */}
            {/* {_STORE_SETTINGS_FORM.deliveryAreaVendorTakeaway && (
              <Col md={6}>
                <FormGroup>
                  <Label>
                    {props.t("delivery_area_vendor", {
                      store:
                        activestore?.storeType === "LIQUOR"
                          ? props.t("store")
                          : props.t("vendor"),
                    })}{" "}
                    ({props.t("takeaway")})
                  </Label>

                  <InputGroup>
                    <Input
                      type="number"
                      value={fields?.deliveryAreaVendorTakeaway}
                      onChange={handleChange("deliveryAreaVendorTakeaway")}
                      min={0}
                    />

                    <div className="input-group-append">
                      <span className="input-group-text">
                        {props?.store?.distanceUnit}
                      </span>
                    </div>
                  </InputGroup>
                </FormGroup>
              </Col>
            )}
            {_STORE_SETTINGS_FORM.deliveryAreaDriver && (
              <Col md={6}>
                <FormGroup>
                  {activestore?.storeType === "SERVICEPROVIDER" && (
                    <Label>{props.t("service_provider_area")}</Label>
                  )}
                  {activestore?.storeType !== "SERVICEPROVIDER" && (
                    <Label>{props.t("delivery_area_driver")}</Label>
                  )}

                  <InputGroup>
                    <Input
                      type="number"
                      value={fields?.deliveryAreaDriver}
                      onChange={handleChange("deliveryAreaDriver")}
                      min={0}
                    />

                    <div className="input-group-append">
                      <span className="input-group-text">
                        {props?.store?.distanceUnit}
                      </span>
                    </div>
                  </InputGroup>
                </FormGroup>
              </Col>
            )} */}
            {/* {_STORE_SETTINGS_FORM.bookingAreaDriver && (
              <Col md={6}>
                <FormGroup>
                  <Label>{props.t("booking_area_driver")}</Label>

                  <InputGroup>
                    <Input
                      type="number"
                      value={fields?.deliveryAreaDriver}
                      onChange={handleChange("deliveryAreaDriver")}
                      min={0}
                    />

                    <div className="input-group-append">
                      <span className="input-group-text">
                        {props?.store?.distanceUnit}
                      </span>
                    </div>
                  </InputGroup>
                </FormGroup>
              </Col>
            )}
            {_STORE_SETTINGS_FORM.driverPerRequest && (
              <Col md={6}>
                <FormGroup>
                  {activestore?.storeType !== "SERVICEPROVIDER" && (
                    <Label>{props.t("driver_per_request")}</Label>
                  )}
                  {activestore?.storeType === "SERVICEPROVIDER" && (
                    <Label>{props.t("service_per_request")}</Label>
                  )}

                  <Input
                    type="number"
                    value={fields?.noOfDriversPerRequest}
                    onChange={handleChange("noOfDriversPerRequest")}
                    min={0}
                  />
                </FormGroup>
              </Col>
            )} */}
            {/* {codMethod?.status && (
              <Col md={6}>
                <FormGroup>
                  <Label>{props.t("cod_wallet_limit")}</Label>

                  <Input
                    type="number"
                    value={fields?.codWalletLimit}
                    onChange={handleChange("codWalletLimit")}
                    min={0}
                  />

                  <FormText>
                    {props.t("cod_wallet_limit_guide", {
                      delivery_boy: props.t(
                        _STORE_SETTINGS_FORM.bookingAreaDriver
                          ? "driver"
                          : "delivery_boy"
                      ),
                    })}
                  </FormText>
                </FormGroup>
              </Col>
            )}  */}
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

GeneralSettings.propTypes = {
  store: PropTypes.object,
  fields: PropTypes.object,
  handleChange: PropTypes.func,
  onUploadFile: PropTypes.func,
}

const mapStateToProps = ({ Settings, Billing }) => ({
  store: Settings?.settings,
  currentPlan: Billing.currentPlan,
})

const mapDispatchToProps = dispatch => ({
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GeneralSettings)
)
