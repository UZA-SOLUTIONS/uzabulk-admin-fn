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

const IconAdd = props => {
  const {
    fields,
    handleChange,
    onUploadFile,
    currentPlan,
    _STORE_SETTINGS_FORM,
    activestore,
  } = props

  const [codMethod, setcodMethod] = useState({})
  const [selectedFiles, setselectedFiles] = useState([])
  const [editorId, seteditorId] = useState("")
  const [editorText, setEditorText] = useState("")
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const imageFile = selectedFiles[0]

  // useEffect(() => {
  //   let method = props.store?.paymentSettings.filter(
  //     method => method.payment_method === "cod"
  //   )

  //   if (method.length > 0) {
  //     setcodMethod(method[0])
  //   }
  // }, [props.store])

  useEffect(() => {
    if (isObject(fields?.storeTypeIcon) && !!fields?.storeTypeIcon?.link) {
      setselectedFiles([{ preview: fields?.storeTypeIcon?.link }])
    } else if (!fields?.storeTypeIcon) {
      setselectedFiles([])
    }
  }, [JSON.stringify(fields?.storeTypeIcon)])

  useEffect(() => {
    /* if (fields?.storeText !== editorText) {
      seteditorId(`editor-${Math.random()}`)
      setEditorText(isEmpty(fields?.storeText) ? "" : fields?.storeText)
    } */
  }, [fields?.storeText])

  const uploadFileSuccess = name => response => {
    console.log("response11111111", response)

    const { _id } = response?.data
    console.log("_iddddddddddddd", _id)

    handleChange(name)({ target: { value: _id } })
  }

  function handleAcceptedFiles(_files) {
    const files = _files?.filter(file => file.size < 5242880)

    if (files.length < _files.length) {
      return toastr.error(props.t("max_file_size"))
    }

    onUploadFile({ image: files[0] }, uploadFileSuccess("storeTypeIcon"))

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
    <Form>
      {!["basic", "premium"].includes(currentPlan?.billingPlan?.type) && (
        <FormGroup>
          <Label>{props.t("Store Background Image")}</Label>

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
                    id="formrow-profile-image-Input-icons"
                    multiple={false}
                  />

                  <img
                    className="rounded avatar-xl"
                    style={{ height: "auto" }}
                    alt={!!imageFile && imageFile.name ? imageFile.name : "uza"}
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

          <a className="border-0 p-0 ml-2  d-inline-flex" onClick={handleShow}>
            {props.t("preview")}
          </a>

          <Modal className="transparent-pop" show={show} onHide={handleClose}>
            <img
              alt={!!imageFile && imageFile.name ? imageFile.name : "uza"}
              src={!!imageFile ? imageFile.preview : avatar4}
            />
          </Modal>
        </FormGroup>
      )}
    </Form>
  )
}

IconAdd.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IconAdd))
