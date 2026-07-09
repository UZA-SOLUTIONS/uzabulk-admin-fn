import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
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
import Select from "react-select"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

import {
  uploadFile,
  addPromotion,
  getPromotion,
  putPromotion,
} from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

// Images
import avatar4 from "assets/images/logo-placeholder.png"

//
import StoreTypes from "./StoreTypes"
import Categories from "./Categories"
import Vendors from "./Vendors"
import { SLUGS_NAME } from "helpers/contants"
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

const AddPromotion = ({
  accessLevel,
  history,
  error,
  onAddPromotion,
  onGetPromotion,
  onPutPromotion,
  onUploadFile,
  promotion,
  loading,
  uploadingFile,
  activeStoreType: _activeStoreType,
  ...props
}) => {
  const { id } = useParams()
  const didMountRef = useRef(null)

  const [storeType, setstoreType] = useState()
  const [vendor, setvendor] = useState()
  const [selectedFiles, setselectedFiles] = useState([])
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    promotionName: "",
    promotionImage: "",
    type: "singleVendor",
    vendor: "",
    category: null,
    // storeTypeId: "",
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
      onGetPromotion(id)
    }
  }, [id])

  useEffect(() => {
    if (didMountRef.current) {
      try {
        setFields(prevState => ({
          promotionName: promotion?.promotionName,
          promotionImage: promotion?.promotionImage?._id,
          type: prevState.type,
          vendor: promotion?.vendor?._id,
          category: promotion?.category?._id,
          // storeTypeId: promotion.storeTypeId,
          status: promotion?.status || "active",
        }))

        if (promotion.promotionImage && promotion.promotionImage.link) {
          setselectedFiles([{ preview: promotion.promotionImage.link }])
        }

        if (promotion.storeTypeId) {
          let ssFilter = props?.settings?.storeTypeEnabled?.filter(
            store => store._id === promotion.storeTypeId
          )

          if (ssFilter.length > 0) {
            setstoreType({
              label: ssFilter[0].label || ssFilter[0].storeType,
              storeType: ssFilter[0].storeType,
              value: ssFilter[0]._id,
            })
          }
        }

        if (promotion.vendor?._id) {
          setvendor({
            label: promotion.vendor.name,
            value: promotion.vendor._id,
            email: promotion.vendor.email,
          })
        }

      } catch (err) {
        console.log("parsing error ", err)
      }
    } else didMountRef.current = true
  }, [JSON.stringify(promotion)])

  useEffect(() => {
    let type =
      props.currentPlan?.billingPlan?.type === "basic"
        ? "singleVendor"
        : "multiVendor"

    if (props.currentPlan?.billingPlan?.type === "basic") {
      setFields(prevState => ({
        ...prevState,
        type,
        // storeTypeId: props.settings?.storeTypeEnabled[0]?._id,
        vendor: props.settings?.storeTypeEnabled[0]?.singleVendorId,
        activeStoreType: props.settings?.storeTypeEnabled[0],
      }))
    } else if (props.currentPlan?.billingPlan?.type === "premium") {
      setFields(prevState => ({
        ...prevState,
        type,
        // storeTypeId: props.settings?.storeTypeEnabled[0]?._id,
        activeStoreType: props.settings?.storeTypeEnabled[0],
      }))
    } else {
      setFields(prevState => ({ ...prevState, type }))
    }
  }, [props.currentPlan, props.settings])

  const uploadFileSuccess = response => {

    console.log('response', response)
    const { _id: promotionImage } = response.data

    setFields(prevState => ({ ...prevState, promotionImage }))
  }

  function handleAcceptedFiles(_files) {
    if (id && !accesses.canEdit) return

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

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return
    if (uploadingFile) return

    if (id) {
      if (!accesses.canEdit) return
      onPutPromotion({ _id: promotion._id, ...fields }, history)
    } else {
      if (!accesses.canAdd) return
      onAddPromotion({ ...fields }, history)
    }
  }

  const imageFile = selectedFiles[0]
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Promotions"
            breadcrumbItem={
              (id ? props.t("edit") : props.t("add")) +
              " " +
              props.t("promotion")
            }
            breadcrumbItems={[
              {
                title:
                  SLUGS_NAME.confiLogistics === props.settings?.slug
                    ? props.t("promos")
                    : props.t("promotions"),
                link: "/promotions",
              },
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
                      <Col md={6}>
                        <FormGroup>
                          <Label>
                            {props.t("name")}
                            <span className="text-danger ml-1">*</span>
                          </Label>

                          <Input
                            value={fields.promotionName}
                            onChange={handleChange("promotionName")}
                            required
                          />
                        </FormGroup>
                      </Col>

                      {/* <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("store")}</Label>

                          <StoreTypes
                            parentStoreType={storeType}
                            setparentStoreType={data => {
                              setFields(prevState => ({
                                ...prevState,
                                storeTypeId: data?.value,
                              }))
                              setstoreType(data)
                            }}
                          />
                        </FormGroup>
                      </Col> */}
                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("vendor")}</Label>

                          <Vendors
                            t={props.t}
                            activeStoreId={fields.storeTypeId}
                            activeStoreType={fields.activeStoreType}
                            fields={fields}
                            parentStoreType={vendor}
                            setparentStoreType={data => {
                              setFields(prevState => ({
                                ...prevState,
                                vendor: data?.value,
                              }))
                              setvendor(data)
                            }}
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("status")}</Label>

                          <div className="status-switch square-switch">
                            <input
                              type="checkbox"
                              id="square-switch1"
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
                              htmlFor="square-switch1"
                              data-on-label={props.t("active")}
                              data-off-label={props.t("inactive")}
                            />
                          </div>
                        </FormGroup>
                      </Col>

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
                                      !!imageFile ? imageFile.preview : avatar4
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
                            Preview
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
                    </Row>

                    <FormButton
                      needSubmit={id ? accesses.canEdit : accesses.canAdd}
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

AddPromotion.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  promotion: PropTypes.object,
  onAddPromotion: PropTypes.func,
  onGetPromotion: PropTypes.func,
  onPutPromotion: PropTypes.func,
}

const mapStateToProps = ({ File, promotions, Billing, Settings }) => ({
  error: promotions.error,
  loading: promotions.loading,
  promotion: promotions.promotion,
  currentPlan: Billing.currentPlan,
  settings: Settings.settings,
  uploadingFile: File.loading,
})

const mapDispatchToProps = dispatch => ({
  onAddPromotion: (data, history) => dispatch(addPromotion(data, history)),
  onGetPromotion: id => dispatch(getPromotion(id)),
  onPutPromotion: (data, history) => dispatch(putPromotion(data, history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddPromotion))
)
