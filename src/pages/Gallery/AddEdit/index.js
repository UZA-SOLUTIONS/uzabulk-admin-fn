import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams, Link } from "react-router-dom"
import { connect } from "react-redux"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Alert,
  Spinner,
} from "reactstrap"
import Dropzone from "react-dropzone"
import FormButton from "components/Common/FormButtons"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { uploadFile, addGallery, getGallery, putGallery } from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

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

const AddGallery = ({
  accessLevel,
  history,
  error,
  onAddGallery,
  onGetGallery,
  onPutGallery,
  onUploadFile,
  gallery,
  loading,
  uploadingFile,
  ...props
}) => {
  const { id } = useParams()
  const didMountRef = useRef(null)

  const [selectedFiles, setselectedFiles] = useState([])
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    type: "storeGallery",
  })

  useEffect(() => {
    if (!accessLevel) {
      const data = {
        canAdd: true,
        canEdit: true,
      }

      return setaccesses(data)
    }

    const data = {
      canAdd: false,
      canEdit: false,
    }

    accessLevel?.map(item => {
      switch (item.label) {
        case "CREATE":
          data.canAdd = item.value
          break

        case "UPDATE":
          data.canEdit = item.value
          break
      }
    })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  useEffect(() => {
    if (id) {
      onGetGallery(id)
    }
  }, [id])

  useEffect(() => {
    if (didMountRef.current) {
      try {
        if (gallery.link) {
          setselectedFiles([{ preview: gallery.link }])
        }
      } catch (err) {
        console.log("parsing error ", err)
      }
    } else didMountRef.current = true
  }, [JSON.stringify(gallery)])

  function handleAcceptedFiles(_files) {
    const files = _files?.filter(file => file.size < 5242880)

    if (files.length < _files.length) {
      return toastr.error(props.t("max_file_size"))
    }

    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return

    if (id) {
      if (!accesses.canEdit) return
      onPutGallery(
        { _id: gallery._id, ...fields, file: selectedFiles[0] },
        history
      )
    } else {
      if (!accesses.canAdd) return
      onAddGallery({ ...fields, file: selectedFiles[0] }, history)
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Galleries"
            breadcrumbItem={
              (id ? props.t("edit") : props.t("add")) + " " + props.t("gallery")
            }
            breadcrumbItems={[
              { title: props.t("gallery"), link: "/gallery" },
              { title: id ? props.t("edit") : props.t("add") },
            ]}
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Form onSubmit={onSubmit} className="spinner-content">
                    {error && typeof error === "string" ? (
                      <Alert color="danger">{error}</Alert>
                    ) : null}

                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="formrow-profile-image-Input">
                            {props.t("image")}
                          </Label>

                          <Dropzone
                            onDrop={acceptedFiles => {
                              handleAcceptedFiles(acceptedFiles)
                            }}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div className="dropzone dropzone-sm">
                                <div
                                  className="dz-message needsclick"
                                  {...getRootProps()}
                                >
                                  <input
                                    {...getInputProps()}
                                    accept="image/*, video/*"
                                    multiple={false}
                                  />
                                  <div className="dz-message needsclick">
                                    <div className="mb-3">
                                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                                    </div>
                                    <h4>{props.t("drop_image")}</h4>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                          <div
                            className="dropzone-previews mt-3"
                            id="file-previews"
                          >
                            {selectedFiles.map((item, index) => (
                              <Card
                                key={index}
                                className="mt-1 mb-0 shadow-none border spinner-content w-25"
                              >
                                {item?.loading && (
                                  <div className="spinner">
                                    <Spinner color="primary" />
                                  </div>
                                )}

                                <div className="p-2">
                                  <img
                                    className="avatar-xl rounded bg-light w-100"
                                    alt={item.name}
                                    src={item.preview}
                                  />
                                </div>
                              </Card>
                            ))}
                          </div>

                          <FormText>{props.t("max_file_size")}</FormText>
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormButton
                      needSubmit={id ? accesses.canEdit : accesses.canAdd}
                      submitDisabled={uploadingFile}
                      goBack={() => history.goBack()}
                    />

                    {loading && (
                      <div className="spinner">
                        <Spinner color="primary" />
                      </div>
                    )}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

AddGallery.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  gallery: PropTypes.object,
  onAddGallery: PropTypes.func,
  onGetGallery: PropTypes.func,
  onPutGallery: PropTypes.func,
}

const mapStateToProps = ({ File, gallery, Billing, Settings }) => ({
  error: gallery.error,
  loading: gallery.loading,
  gallery: gallery.gallery,
  currentPlan: Billing.currentPlan,
  settings: Settings.settings,
  uploadingFile: File.loading,
})

const mapDispatchToProps = dispatch => ({
  onAddGallery: (data, history) => dispatch(addGallery(data, history)),
  onGetGallery: id => dispatch(getGallery(id)),
  onPutGallery: (data, history) => dispatch(putGallery(data, history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddGallery))
)
