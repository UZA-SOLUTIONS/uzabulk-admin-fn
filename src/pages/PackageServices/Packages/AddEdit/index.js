import React, {
  Fragment,
  useRef,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useParams, withRouter, Link } from "react-router-dom"
import { connect } from "react-redux"
import {
  Card,
  CardTitle,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  Alert,
  Spinner,
  FormText,
  FormFeedback,
} from "reactstrap"
import { withTranslation } from "react-i18next"
import validationSchema from "./validations"
import { Formik } from "formik"
import Breadcrumbs from "components/Common/Breadcrumb2"
import FormButton from "components/Common/FormButtons"
import { feature } from "caniuse-lite"
import getDynamicImage from "helpers/get-dynamic-image"
import Dropzone from "react-dropzone"
import placeholder from "assets/images/logo-placeholder.png"
import {
  addPackageServicePackage,
  getPackageServicePackage,
  putPackageServicePackage,
} from "store/PackageServices/Packages/actions"
import { getPackageServiceVendorList } from "store/PackageServices/Vendors/actions"
import Select from "react-select"
import toastr from "toastr"
import { uploadFile, getFdVehicles } from "store/actions"
import { Modal } from "react-bootstrap"
import { findIndex } from "lodash"

function AddEditForm({
  PackageServicePackage,
  addPackageServicePackage,
  getPackageServicePackage,
  putPackageServicePackage,
  PackageServiceVendor,
  getPackageServiceVendorList,
  getFdVehicles,
  fdVehicles,
  uploadImage,
  error,
  loading,
  history,
  t,
}) {
  const { id } = useParams()

  

  const { packageServicePackage } = PackageServicePackage
  console.log("billo ", PackageServicePackage)
  const { list } = PackageServiceVendor
  const vendorList =
    list?.map(item => ({ label: item.name, value: item._id })) ?? []

  const vehicleList =
    fdVehicles
      ?.filter(item => item.type !== "pool")
      ?.map(item => ({ label: item.name, value: item._id })) ?? []

  const initialValues =
    id && id === packageServicePackage?._id
      ? {
          name: packageServicePackage?.name,
          price: packageServicePackage?.price,
          vendor: {
            label: packageServicePackage?.vendor?.name,
            value: packageServicePackage?.vendor?._id,
          },
          vehicleType: {
            label:
              packageServicePackage?.vehicleType?.name ??
              vehicleList.find(
                item => item.value === packageServicePackage?.vehicleType
              )?.label,
            value: packageServicePackage?.vehicleType,
          },
          description: packageServicePackage?.description,
          duration: packageServicePackage?.duration,
          features: packageServicePackage?.features,
          images: Array.isArray(packageServicePackage?.image)
            ? packageServicePackage?.image
            : [],
          tempImage: null,
        }
      : {
          name: "",
          price: "",
          vendor: {
            label: "",
            value: "",
          },
          vehicleType: {
            label: "",
            value: "",
          },
          description: "",
          duration: "",
          features: [""],
          images: [],
          tempImage: null,
        }

  const onFetchVendorList = useCallback(filter => {
    console.log("Fetch Vendor List", filter)

    function onSuccess(payload) {
      console.log("Success payload", payload)
    }
    function onFail(payload) {
      console.log("Error payload", payload)
      toastr.error(payload.error?.message)
    }
    function onEnd(payload) {
      console.log("Final payload", payload)
    }

    getPackageServiceVendorList({
      data: filter,
      onSuccess,
      onFail,
      onEnd,
      showLoader: true,
    })
  }, [])
  useEffect(() => {
    onFetchVendorList({
      orderBy: "date_created_utc",
      order: -1,
      page: 0,
      limit: 200,
      search: "",
      fields: [
        {
          fieldName: "type",
          fieldValue: "",
        },
      ],
    })
  }, [])

  useEffect(() => {
    getFdVehicles({
      storeTypeId: "",
      orderBy: "date_created_utc",
      order: -1,
      page: 0,
      limit: 20,
      search: "",
      fields: [
        {
          fieldName: "",
          fieldValue: "",
        },
      ],
    })
  }, [])

  const onCreate = useCallback(values => {
    console.log("Create", values)

    function onSuccess(payload) {
      console.log("Success payload", payload)

      history.push("/package-services/packages")
      toastr.success("Package created successfully")
    }
    function onFail(payload) {
      console.log("Error payload", payload)
      toastr.error(payload?.error?.response?.message ?? "Error occured")
    }
    function onEnd(payload) {
      console.log("Final payload", payload)
    }

    addPackageServicePackage({
      data: { ...values },
      onSuccess,
      onFail,
      onEnd,
      showLoader: true,
    })
  }, [])

  const onUpdate = useCallback(values => {
    console.log("Update", values)

    function onSuccess(payload) {
      console.log("Success payload", payload)
      toastr.success("Package updated successfully")
    }
    function onFail(payload) {
      console.log("Error payload", payload)
      toastr.error(payload?.error?.response?.message ?? "Error occured")
    }
    function onEnd(payload) {
      console.log("Final payload", payload)
    }

    putPackageServicePackage({
      data: { ...values },
      onSuccess,
      onFail,
      onEnd,
      showLoader: true,
    })
  }, [])

  const onGet = useCallback(values => {
    console.log("Fetch ", values)

    function onSuccess(payload) {
      console.log("Success payload", payload)
    }
    function onFail(payload) {
      console.log("Error payload", payload)
      toastr.error(payload?.error?.response?.message ?? "Error occured")
    }
    function onEnd(payload) {
      console.log("Final payload", payload)
    }

    getPackageServicePackage({
      data: {
        id: values.id,
      },
      onSuccess,
      onFail,
      onEnd,
      showLoader: true,
    })
  }, [])
  useEffect(() => {
    if (id) {
      onGet({ id })
    }
  }, [])

  const onUploadImage = useCallback((file, setFieldValue, values) => {
    console.log("upload Image ", file)

    function onSuccess(payload) {
      console.log("Success payload", payload)
      toastr.success("Image uploaded successfully")
      setFieldValue("tempImage", null)
      const images = Array.isArray(values.images) ? values.images : []
      setFieldValue(`images[${images.length}]`, payload.data)
    }

    uploadImage({ image: file }, onSuccess)
  }, [])

  function onSubmit(values) {
    console.log("Values  ", values)

    if (values.tempImage?.link instanceof File) {
      toastr.warning("Image not uploaded")
      return
    }

    const data = {
      name: values.name,
      price: values.price,
      vendor: values.vendor?.value,
      vehicleType: values.vehicleType?.value,
      description: values.description,
      duration: values.duration,
      features: values.features,
      image: values.images?.map(item => item._id),
    }

    if (id) {
      data._id = id
      onUpdate(data)
    } else {
      onCreate(data)
    }
  }

  // image preview

  const [show, setShow] = useState(-1)

  const handleClose = () => setShow(-1)

  const handleShow = index => {
    console.log("index1111", index)

    setShow(index)
  }

  //

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItems={[
            {
              title: t("package_service"),
              link: `/package-services/packages`,
            },
            {
              title: id ? t("edit") : t("add"),
              link: `/package-services/packages/add`,
            },
          ]}
        ></Breadcrumbs>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {function FormikForm({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit: formikSubmit,
            isSubmitting,
            validateForm,
            setFieldValue,
            setFieldTouched,
          }) {
            const handleSubmit = async e => {
              e.preventDefault()
              const errors = await validateForm()
              //notifyErrors(errors);
              formikSubmit(e)
            }

            const handleAddFeature = () => {
              setFieldValue(`features[${values.features?.length}]`, "")
            }
            const handleRemoveFeature = index => {
              const list = values.features
              list.splice(index, 1)
              setFieldValue("features", list)
            }
            const imageRef = useRef()
            const handleImage = e => {
              if (e && e.target.files?.length > 0) {
                if (e.target.files[0].size > 5242880) {
                  toastr.error("Max file size limit is 5mb")
                  return
                }
                setFieldValue("tempImage.link", e.target.files[0])
                onUploadImage(e.target.files[0], setFieldValue, values)
              } else if (!e.target.files) {
                imageRef.current.click()
              }
            }

            const handleDeleteImage = index => {
              var images = values.images
              console.log("dokar1", images)
              images.splice(index, 1)
              console.log("dokar2", images)
              setFieldValue("images", images)
            }
            const image = getDynamicImage(values?.tempImage?.link, placeholder)
            console.log("ERRVAL ", values)
            return (
              <Fragment>
                <Form onSubmit={handleSubmit} className="spinner-content">
                  {error && typeof error === "string" && (
                    <Alert color="danger">{error}</Alert>
                  )}
                  <Card>
                    <CardBody>
                      <Row>
                        <Col lg="4" className="my-2">
                          <label htmlFor="" className="form-label2 m-0">
                            Name
                          </label>
                          <InputGroup>
                            <Input
                              type="text"
                              name="name"
                              placeholder=""
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                            />
                            {errors.name && touched.name && (
                              <FormFeedback invalid className={"d-block"}>
                                {errors.name}
                              </FormFeedback>
                            )}
                          </InputGroup>
                        </Col>
                        <Col lg="4" className="my-2">
                          <label htmlFor="" className="form-label2 m-0">
                            Price
                          </label>
                          <InputGroup>
                            <Input
                              type="number"
                              name="price"
                              placeholder=""
                              onChange={e =>
                                setFieldValue("price", Math.abs(e.target.value))
                              }
                              onBlur={handleBlur}
                              value={values.price}
                              min={0}
                            />
                            {errors.price && touched.price && (
                              <FormFeedback invalid className={"d-block"}>
                                {errors.price}
                              </FormFeedback>
                            )}
                          </InputGroup>
                        </Col>
                        <Col lg="4" className="my-2">
                          <label htmlFor="" className="form-label2 m-0">
                            Duration (in hours)
                          </label>
                          <InputGroup>
                            <Input
                              type="number"
                              name="duration"
                              placeholder=""
                              onChange={e =>
                                setFieldValue(
                                  "duration",
                                  Math.abs(e.target.value)
                                )
                              }
                              onBlur={handleBlur}
                              value={values.duration}
                            />
                            {errors.duration && touched.duration && (
                              <FormFeedback invalid className={"d-block"}>
                                {errors.duration}
                              </FormFeedback>
                            )}
                          </InputGroup>
                        </Col>
                        <Col lg="4" className="my-2">
                          <label htmlFor="" className="form-label2 m-0">
                            Vendor
                          </label>
                          <InputGroup>
                            <Select
                              value={values.vendor}
                              options={[
                                ...vendorList,
                                {
                                  label: "None",
                                  value: "",
                                },
                              ]}
                              onChange={item => setFieldValue("vendor", item)}
                              className="w-100"
                            />
                            {errors.vendor?.value && touched.vendor?.value && (
                              <FormFeedback invalid className={"d-block"}>
                                {errors.vendor?.value}
                              </FormFeedback>
                            )}
                          </InputGroup>
                        </Col>
                        <Col lg="4" className="my-2">
                          <label htmlFor="" className="form-label2 m-0">
                            Vehicle Type
                          </label>
                          <InputGroup>
                            <Select
                              value={values.vehicleType}
                              options={[
                                ...vehicleList,
                                {
                                  label: "None",
                                  value: "",
                                },
                              ]}
                              onChange={item =>
                                setFieldValue("vehicleType", item)
                              }
                              className="w-100"
                            />
                            {errors.vehicleType?.value &&
                              touched.vehicleType?.value && (
                                <FormFeedback invalid className={"d-block"}>
                                  {errors.vehicleType?.value}
                                </FormFeedback>
                              )}
                          </InputGroup>
                        </Col>
                        <Col lg="12" className="my-2">
                          <label htmlFor="" className="form-label2 m-0">
                            Description
                          </label>
                          <InputGroup>
                            <Input
                              type="textarea"
                              name="description"
                              placeholder=""
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.description}
                              rows="4"
                              maxLength={200}
                            />
                            {errors.description && touched.description && (
                              <FormFeedback invalid className={"d-block"}>
                                {errors.description}
                              </FormFeedback>
                            )}
                          </InputGroup>
                        </Col>
                        <Col xs={12}>
                          <Card className="mb-3 bg-light">
                            <CardBody className="py-2">
                              <CardTitle>{t("features")}</CardTitle>

                              {values.features?.map((item, index) => (
                                <React.Fragment key={index}>
                                  <Row className="mb-3 mb-sm-2">
                                    <Col xs={6} className="pb-3">
                                      <InputGroup>
                                        <Input
                                          type="text"
                                          name={`features[${index}]`}
                                          placeholder=""
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={item}
                                        />
                                        {errors.features?.[index] &&
                                          touched.features?.[index] && (
                                            <FormFeedback
                                              invalid
                                              className={"d-block"}
                                            >
                                              {errors.features?.[index]}
                                            </FormFeedback>
                                          )}
                                      </InputGroup>
                                    </Col>

                                    <Col xs={6} className="pb-3">
                                      <div className="d-flex align-items-center">
                                        <Link
                                          to={`#`}
                                          href="#"
                                          className={"text-danger"}
                                          onClick={() =>
                                            handleRemoveFeature(index)
                                          }
                                        >
                                          <i className="bx bx-trash font-size-22" />
                                        </Link>
                                      </div>
                                    </Col>
                                  </Row>
                                </React.Fragment>
                              ))}
                              <Row>
                                <Col xs={12} className="pb-3">
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to={`#`}
                                      href="#"
                                      className="mr-3 text-primary"
                                      onClick={() => handleAddFeature()}
                                    >
                                      <i className="bx bx-plus font-size-22" />
                                    </Link>
                                  </div>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col xs={12}>
                          <Row>
                            <Col xs={12}>
                              <Label for="formrow-profile-image-Input">
                                {t("images")}
                              </Label>
                            </Col>
                            {values.images?.map((item, index) => (
                              <Col md={2} className="" key={index}>
                                <FormGroup>
                                  <div className="dropzone-single-image avatar-xl spinner-content">
                                    <img
                                      className="rounded avatar-xl"
                                      alt={item._id || "uza"}
                                      src={item?.link}
                                    />
                                    <div
                                      className="edit"
                                      onClick={() => handleDeleteImage(index)}
                                    >
                                      <i className="bx bx-trash"></i>
                                    </div>
                                    {/* <FormText className="d-inline-flex">
                                      {props.t("max_file_size")}
                                    </FormText> */}

                                    <a
                                      className="border-0 p-0 ml-2  d-inline-flex"
                                      onClick={() => handleShow(index)}
                                    >
                                      {t("preview")}
                                    </a>
                                    <Modal
                                      className="transparent-pop"
                                      show={show == index}
                                      onHide={() => handleClose(index)}
                                    >
                                      <img
                                        className="transparent-pop"
                                        alt={item._id || "uza"}
                                        src={item?.link}
                                      />
                                    </Modal>
                                  </div>
                                </FormGroup>
                              </Col>
                            ))}

                            <Col md={2} className="">
                              <FormGroup>
                                <Dropzone
                                  onDrop={acceptedFiles => {
                                    handleImage({
                                      target: { files: acceptedFiles },
                                    })
                                  }}
                                >
                                  {({ getRootProps, getInputProps }) => {
                                    return (
                                      <div
                                        className="dropzone-single-image avatar-xl spinner-content"
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
                                            values.tempImage instanceof File
                                              ? values.tempImage?.name
                                              : "uza"
                                          }
                                          src={image}
                                        />

                                        <div className="edit">
                                          <i className="bx bx-cloud-upload"></i>
                                        </div>
                                        {values.tempImage?.link instanceof
                                          File && (
                                          <div className="spinner">
                                            <Spinner color="primary" />
                                          </div>
                                        )}
                                      </div>
                                    )
                                  }}
                                </Dropzone>

                                <FormText>{t("max_file_size")}</FormText>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>

                        <Col xs="12">
                          <FormButton
                            needSubmit={true}
                            goBack={() => history.goBack()}
                          />
                        </Col>
                        {loading && (
                          <div className="spinner">
                            <Spinner color="primary" />
                          </div>
                        )}
                      </Row>
                    </CardBody>
                  </Card>
                </Form>
              </Fragment>
            )
          }}
        </Formik>
      </Container>
    </div>
  )
}

AddEditForm.propTypes = {}

const mapStateToProps = ({
  PackageServicePackage,
  PackageServiceVendor,
}) => ({
  PackageServicePackage,
  PackageServiceVendor,

})

const mapDispatchToProps = {
  getPackageServiceVendorList,
  addPackageServicePackage,
  getPackageServicePackage,
  putPackageServicePackage,
  uploadImage: uploadFile,
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddEditForm))
)
