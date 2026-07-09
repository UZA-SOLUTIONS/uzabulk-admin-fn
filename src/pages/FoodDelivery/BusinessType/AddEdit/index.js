import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams, Link } from "react-router-dom"
import { connect } from "react-redux"
import AnimateHeight from "react-animate-height"
import FormButton from "components/Common/FormButtons"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner,
  FormText,
  UncontrolledTooltip,
  CardTitle,
} from "reactstrap"
import Dropzone from "react-dropzone"

import {
  ROLES,
  GET_SERVICE_NAME,
  SLUGS_NAME as slugname,
} from "helpers/contants"

import {
  addFdbusinesstype,
  getFdBusinesstype,
  putFdBusinesstype,
  uploadFile,
} from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

// Images
import avatar4 from "assets/images/logo-placeholder.png"
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

const AddCuisine = ({
  accessLevel,
  role,
  vendorId,
  history,
  error,
  onAddFdBusinesstype,
  onGetFdBusinessType,
  onPutFdBusinessType,
  onUploadFile,
  fdCuisine,
  loading,
  uploadingFile,
  activeStoreId,
  activeStoreType,
  ...props
}) => {
  if (["premium"].includes(props?.currentPlan?.billingPlan?.type)) {
    activeStoreType = props?.storeTypeEnabled[0]

    if (activeStoreType) {
      activeStoreId = activeStoreType._id
    }
  }

  console.log(fdCuisine, "activeStoreType")

  const { id, vendorId: vendorIdParam } = useParams()
  const didMountRef = useRef(null)

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [selectedFiles, setselectedFiles] = useState([])
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const imageFile = selectedFiles[0]
  const [fields, setFields] = useState({
    storeTypeId: "",
    name: "",
    status: "active",
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
      if (!activeStoreId) return
      onGetFdBusinessType(activeStoreId, id)
    }
  }, [id, activeStoreId])

  useEffect(() => {
    if ([ROLES.admin, ROLES.staff].includes(role)) {
      setFields({
        ...fields,
        storeTypeId: activeStoreId,
        vendor: vendorIdParam,
      })
    } else if (role === ROLES.vendor) {
      setFields({ ...fields, storeTypeId: activeStoreId, vendor: vendorId })
    }
  }, [activeStoreId, role, vendorId, vendorIdParam])

  useEffect(() => {
    if (didMountRef.current) {
      try {
        setFields({
          _id: fdCuisine._id,
          name: fdCuisine.name || "",
          status: fdCuisine.status || "active",
          image: fdCuisine.image?._id,
        })

        if (fdCuisine.image && fdCuisine.image.link) {
          setselectedFiles([{ preview: fdCuisine.image.link }])
        }
      } catch (err) {
        console.log("parsing error ", err)
      }
    } else didMountRef.current = true
  }, [JSON.stringify(fdCuisine)])

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return
    if (uploadingFile) return
    if (!activeStoreType?.storeType?.toLowerCase()) return

    if (id) {
      onPutFdBusinessType(
        activeStoreType?.storeType?.toLowerCase(),
        { _id: fdCuisine._id, storeTypeId: activeStoreId, ...fields },
        history
      )
    } else {
      onAddFdBusinesstype(
        activeStoreType?.storeType?.toLowerCase(),
        fields,
        history
      )
    }
  }

  const uploadFileSuccess = response => {
    const { _id: image } = response.data

    setFields(prevState => ({ ...prevState, image }))
  }

  function handleAcceptedFiles(_files) {
    const files = _files?.filter(file => file.size < 5242880)

    if (files.length < _files.length) {
      return toastr.error(props.t("max_file_size"))
    }

    onUploadFile({ image: files[0] }, uploadFileSuccess)

    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
  }
  // [slugname.dewe, slugname.zaza].includes(props?.slug)

  const breadcrumtitle = [
    slugname.dewe,
    slugname.zaza,
    slugname.topup,
  ].includes(props?.slug)
    ? "Category"
    : props.t(
        GET_SERVICE_NAME({
          storeType: activeStoreType?.storeType,
          name: "cuisine",
        }) + "s"
      )

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col sm={1} lg={2}></Col>
            <Col sm={10} lg={8}>
              <Breadcrumbs
                title="Bisiness type"
                breadcrumbItem={props.t("Add") + " " + props.t("businessType")}
                breadcrumbItems={[
                  {
                    title: props.t("businessType"),
                    link: "/grocery/businesstype",
                  },
                  {
                    title: id ? props.t("edit") : props.t("add"),
                  },
                ]}
              />
            </Col>
            <Col sm={1} lg={2}></Col>
          </Row>

          <Row>
            <Col sm={1} lg={2}></Col>
            <Col sm={10} lg={8}>
              <Card>
                <CardBody>
                  <Form onSubmit={onSubmit} className="spinner-content">
                    {error && typeof error === "string" ? (
                      <Alert color="danger">{error}</Alert>
                    ) : null}

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-firstname-Input">
                            {props.t("name")}
                            <span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            value={fields.name || ""}
                            onChange={handleChange("name")}
                            required
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("status")}</Label>

                          <div className="switch-xl square-switch">
                            <input
                              type="checkbox"
                              id="status-switch1"
                              switch="none"
                              checked={fields.status == "active"}
                              onChange={() => {
                                const value =
                                  fields.status == "active"
                                    ? "inactive"
                                    : "active"

                                handleChange("status")({ target: { value } })
                              }}
                            />
                            <label
                              htmlFor="status-switch1"
                              data-on-label={props.t("active")}
                              data-off-label={props.t("inactive")}
                            />
                          </div>
                        </FormGroup>
                      </Col>

                      {activeStoreType.storeType !== "CARRENTAL" && (
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
                              {({ getRootProps, getInputProps }) => {
                                const imageFile = selectedFiles[0]

                                return (
                                  <div
                                    className="dropzone-single-image avatar-xl"
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
                                        !!imageFile && imageFile.name
                                          ? imageFile.name
                                          : "uza"
                                      }
                                      src={
                                        !!imageFile
                                          ? imageFile.preview
                                          : avatar4
                                      }
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
                                  !!imageFile && imageFile.name
                                    ? imageFile.name
                                    : "uza"
                                }
                                src={!!imageFile ? imageFile.preview : avatar4}
                              />
                            </Modal>
                          </FormGroup>
                        </Col>
                      )}
                    </Row>

                    <FormButton
                      needSubmit={id ? accesses.canEdit : accesses.canAdd}
                      submitDisabled={uploadingFile || loading}
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
            <Col sm={1} lg={2}></Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

AddCuisine.propTypes = {
  role: PropTypes.string,
  vendorId: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  fdCuisine: PropTypes.object,
  onAddFdBusinesstype: PropTypes.func,
  onGetFdBusinessType: PropTypes.func,
  onPutFdBusinessType: PropTypes.func,
}

const mapStateToProps = ({
  Login,
  Billing,
  Settings,
  FD_Businesstypes,
  File,
}) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "",
  error: FD_Businesstypes.error,
  loading: FD_Businesstypes.loading,
  fdCuisine: FD_Businesstypes.fdBusinesstype,
  currentPlan: Billing.currentPlan,
  storeTypeEnabled: Settings?.settings?.storeTypeEnabled,
  slug: Settings?.settings?.slug,
  uploadingFile: File.loading,
})

const mapDispatchToProps = dispatch => ({
  onAddFdBusinesstype: (storeType, data, history) =>
    dispatch(addFdbusinesstype(storeType, data, history)),
  onGetFdBusinessType: (storeType, id) =>
    dispatch(getFdBusinesstype(storeType, id)),
  onPutFdBusinessType: (storeType, data, history) =>
    dispatch(putFdBusinesstype(storeType, data, history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddCuisine))
)
