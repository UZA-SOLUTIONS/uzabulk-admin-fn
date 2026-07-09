import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect, useSelector } from "react-redux"
import Dropzone from "react-dropzone"
import worldCountries from "world-countries"
import { isObject } from "lodash"
import FormButton from "components/Common/FormButtons"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { isHideThingTrue } from "helpers/contants"
import phone from "phone"
import CKEditor from "react-ckeditor-component"

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
  FormText,
  Spinner,
  Button,
  InputGroup,
} from "reactstrap"
import Select from "react-select"

import {
  getCustomer,
  putCustomer,
  addCustomer,
  uploadFile,
  removeFile,
  getDriverDispatcherList,
  getCustomerDispatcherList,
  getVendorListSubAdmin,
  getblogCategories,
  getblogTags,
  addblog,
  getblog,
  putBlog,
} from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

// Images
import avatar4 from "assets/images/logo-placeholder.png"

import Roles from "./Roles"
import { Modal } from "react-bootstrap"
import moment from "moment"

const optionGroup = worldCountries
  .filter(country => !!country.flag && country.name.common && country.idd.root)
  .map(country => ({
    name: country.name.common,
    label: country.idd.root + country.idd.suffixes[0] || "",
    value: country.name.common,
    flag: country.flag,
  }))

const CustomOptionComponent = ({ innerProps, innerRef, data, ...props }) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`country-code-option p-2${
        props.isSelected ? " selected" : ""
      }`}
    >
      <img
        className="flag"
        src={`https://flagcdn.com/16x12/${data.code}.png`}
      />
      <span className="country-code">{data.label}</span>
      <div className="country-name">{data.name}</div>
    </div>
  )
}

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

const EditCustomer = props => {
  const {
    accessLevel,
    history,
    location,
    error,
    onGetCustomer,
    onPutCustomer,
    onAddCustomer,
    loading,
    onUploadFile,
    onRemoveFile,
    customer,
    uploadingFile,
    driverlist,
    customerList,
    user,
  } = props

  console.log(user, "user")
  const { id } = useParams()
  const User = useSelector(s => s?.Login?.user)
  const vendorrole = User?.role || ""
  const didMountRef = useRef(null)
  // console.log(user, "hgdgdsgs")
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    title: "",
    slug: "",
    authorName: "",
    type: "BLOG",
    deviceType: "web",
    images: null,
    content: "",
    status: "active",
    seoSettings: {},
    content: "",
    publishDate: moment(),
  })
  console.log(fields, "guccci")
  const [countryCodeData, setCountryCode] = useState({})
  const [selectedFiles, setselectedFiles] = useState([])

  const [selectedDrivers, setSelectedDriver] = useState([])
  const [driversList, setDriversList] = useState([])

  const [selectedCustomers, setSelectedCustomers] = useState([])
  const [customersList, setCustomersList] = useState([])

  const [selectedVendors, setSelectedVendors] = useState([])
  const [vendorList, setVendorList] = useState([])

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  let data = {
    limit: 24,
    orderBy: "date_created_utc",
    sortOrder: -1,
    paged: 1,
    fieldName: "",
    fieldValue: "",
    search: "",
  }

  //driver selecting for dispatcher start

  useEffect(() => {
    props?.ongetDriverDispatcherList(data)
    props?.ongetCustomerDispatcherList(data)
  }, [])

  useEffect(() => {
    setDriversList(
      driverlist?.map(({ name, _id }) => ({
        label: name,
        value: _id,
      }))
    )
  }, [driverlist])

  useEffect(() => {
    setCustomersList(
      customerList?.map(({ name, _id }) => ({
        label: name,
        value: _id,
      }))
    )
  }, [customerList])

  const onDriverSelect = data => {
    setSelectedDriver(data)
  }
  const onCustomerSelect = data => {
    setSelectedCustomers(data)
  }
  const onVendorSelect = data => {
    setSelectedVendors(data)
  }

  // end driver selecting for dispatcher

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

  /* Get Customer on Router State Change */
  useEffect(() => {
    if (id) {
      onGetCustomer(id)
    }
  }, [id])

  /* Update Field State on Customer Reducer Change */
  useEffect(() => {
    if (didMountRef.current) {
      setFields({
        _id: customer._id || "",
        title: customer?.title || "",
        authorName: customer?.authorName || "",
        publishDate: customer.publishDate || moment(),
        slug: customer?.slug || "",
        type: customer?.type || "",
        deviceType: customer?.deviceType || "",
        content: customer?.content || "",
        images: customer?.images || null,
        status: customer?.status || "active",
        seoSettings: customer?.seoSettings || "",
      })
      setSelectedDriver(
        customer?.category?.map(({ name, _id }) => ({
          label: name,
          value: _id,
        }))
      )
      setSelectedCustomers(
        customer?.tag?.map(({ name, _id }) => ({
          label: name,
          value: _id,
        }))
      )

      const optionGroupIndex = optionGroup.findIndex(
        data => data.label === customer.countryCode || ""
      )

      if (optionGroupIndex > -1) {
        setCountryCode(optionGroup[optionGroupIndex])
      }

      if (customer.images && customer.images.link) {
        setselectedFiles([{ preview: customer.images.link }])
      }

      if (isObject(customer?.accessLevel)) {
        setFields(prevState => ({
          ...prevState,
          accessLevel: {
            label: customer?.accessLevel?.name,
            value: customer?.accessLevel?._id,
          },
        }))
      }
    } else didMountRef.current = true
  }, [JSON.stringify(customer)])

  /* Hit Update Customer API on Image Upload Success */
  const uploadFileSuccess = response => {
    // onPutCustomer({ _id: customer._id, profileImage: response.data._id })

    setFields(prevState => ({ ...prevState, images: response.data._id }))
  }

  /* Function to Accept Files in Dropzone */
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

  /* Handle Input onChange */
  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  /* Handle Form Submit */
  const onSubmit = event => {
    event.preventDefault()

    if (loading || uploadingFile) return

    let category = selectedDrivers?.map(driver => driver.value) || null
    let tag = selectedCustomers?.map(customer => customer.value) || null

    if (id) {
      if (!accesses.canEdit) return
      onPutCustomer(
        {
          ...fields,
          images: fields?.images,
          category,
          tag,
        },
        history
      )
    } else {
      if (!accesses.canAdd) return
      onAddCustomer(
        {
          ...fields,
          category,
          tag,
        },
        history
      )
    }
  }

  /* Handle Remove File from State */
  const removeSelectedFiles = event => {
    event.preventDefault()
    const { profileImage } = fields

    if (profileImage && profileImage._id) {
      onRemoveFile({ _id: profileImage._id })
      onPutCustomer({ _id: customer._id, profileImage: null })

      setFields(prevState => ({ ...prevState, profileImage: {} }))
    }

    setselectedFiles([])
  }

  const handleCountryCode = data => {
    setFields(prevState => ({ ...prevState, countryCode: data.label }))
    setCountryCode(data)
  }

  let showDriverAssign = isHideThingTrue(
    props?.hideThings,
    "driverlistdispatcher"
  )

  let showCustomerAssign = isHideThingTrue(
    props?.hideThings,
    "customerlistdispatcher"
  )
  let showVendorAssign = isHideThingTrue(
    props?.hideThings,
    "vendorlistdispatcher"
  )

  const imageFile = selectedFiles[0]

  const handleSeoChange = name => event => {
    setFields(prevState => ({
      ...prevState,
      seoSettings: { ...prevState.seoSettings, [name]: event.target.value },
    }))
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Customers"
            breadcrumbItem={
              (id ? props.t("edit") : props.t("add")) + " " + props.t("blog")
            }
            breadcrumbItems={[
              {
                title: props.t("blog"),

                link: "/blog",
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
                          <Label for="formrow-firstname-Input">
                            {props.t("title")}
                            <span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            value={fields.title || ""}
                            onChange={handleChange("title")}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-firstname-Input">
                            {props.t("slug")}
                            <span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            value={fields?.slug || ""}
                            onChange={handleChange("slug")}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-firstname-Input">
                            {props.t("authorName")}
                            <span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            value={fields?.authorName || ""}
                            onChange={handleChange("authorName")}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("publish_date")}</Label>

                          <InputGroup>
                            <Input
                              value={moment(fields?.publishDate).format(
                                "YYYY-MM-DD HH:mm"
                              )}
                              type="datetime-local"
                              onChange={handleChange("publishDate")}
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("category")}</Label>
                          <span className="text-danger ml-1">*</span>

                          <Select
                            options={driversList}
                            onChange={onDriverSelect}
                            isMulti={true}
                            value={selectedDrivers}
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("tag")}</Label>
                          <span className="text-danger ml-1">*</span>

                          <Select
                            options={customersList}
                            onChange={onCustomerSelect}
                            isMulti={true}
                            value={selectedCustomers}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="formrow-content-Input">
                            {props.t("content")}
                          </Label>
                          <span className="text-danger ml-1">*</span>

                          <CKEditor
                            content={fields.content}
                            events={{
                              change: evt => {
                                const data = evt?.editor?.getData()

                                handleChange("content")({
                                  target: { value: data },
                                })
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
                                ],
                              ],
                              extraAllowedContent: "iframe[*]",
                            }}
                            scriptUrl="https://cdn.ckeditor.com/4.16.0/full/ckeditor.js"
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
                    </Row>

                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="formrow-profile-image-Input">
                            {props.t("blog_image")}
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

                    <Row>
                      <Col xs={12}>
                        <h5>{props.t("seo_settings")}</h5>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("title")}</Label>

                          <Input
                            type="text"
                            value={fields?.seoSettings?.title}
                            onChange={handleSeoChange("title")}
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("meta_keywords")}</Label>

                          <Input
                            type="textarea"
                            rows={2}
                            value={fields?.seoSettings?.metaKeywords}
                            onChange={handleSeoChange("metaKeywords")}
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("meta_description")}</Label>

                          <Input
                            type="textarea"
                            rows={2}
                            value={fields?.seoSettings?.metaDescription}
                            onChange={handleSeoChange("metaDescription")}
                          />
                        </FormGroup>
                      </Col>

                      <Col xs={12}>
                        <h5>{props.t("facebook")}</h5>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("title")}</Label>

                          <Input
                            type="text"
                            value={fields?.seoSettings?.facebook?.title}
                            onChange={e =>
                              handleSeoChange("facebook")({
                                target: {
                                  value: {
                                    ...fields?.seoSettings.facebook,
                                    title: e.target.value,
                                  },
                                },
                              })
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("description")}</Label>

                          <Input
                            type="textarea"
                            rows={2}
                            value={fields?.seoSettings?.facebook?.description}
                            onChange={e =>
                              handleSeoChange("facebook")({
                                target: {
                                  value: {
                                    ...fields?.seoSettings.facebook,
                                    description: e.target.value,
                                  },
                                },
                              })
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("image_url")}</Label>

                          <Input
                            type="text"
                            value={fields?.seoSettings?.facebook?.image}
                            onChange={e =>
                              handleSeoChange("facebook")({
                                target: {
                                  value: {
                                    ...fields?.seoSettings.facebook,
                                    image: e.target.value,
                                  },
                                },
                              })
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col xs={12}>
                        <h5>{props.t("twitter")}</h5>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("username")}</Label>

                          <Input
                            type="text"
                            value={fields?.seoSettings?.twitter?.username}
                            onChange={e =>
                              handleSeoChange("twitter")({
                                target: {
                                  value: {
                                    ...fields?.seoSettings.twitter,
                                    username: e.target.value,
                                  },
                                },
                              })
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("title")}</Label>

                          <Input
                            type="text"
                            value={fields?.seoSettings?.twitter?.title}
                            onChange={e =>
                              handleSeoChange("twitter")({
                                target: {
                                  value: {
                                    ...fields?.seoSettings.twitter,
                                    title: e.target.value,
                                  },
                                },
                              })
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("description")}</Label>

                          <Input
                            type="textarea"
                            rows={2}
                            value={fields?.seoSettings?.twitter?.description}
                            onChange={e =>
                              handleSeoChange("twitter")({
                                target: {
                                  value: {
                                    ...fields?.seoSettings.twitter,
                                    description: e.target.value,
                                  },
                                },
                              })
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("image_url")}</Label>

                          <Input
                            type="text"
                            value={fields?.seoSettings?.twitter?.image}
                            onChange={e =>
                              handleSeoChange("twitter")({
                                target: {
                                  value: {
                                    ...fields?.seoSettings.twitter,
                                    image: e.target.value,
                                  },
                                },
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormButton
                      needSubmit={id ? accesses.canEdit : accesses.canAdd}
                      submitDisabled={uploadingFile || loading}
                      goBack={() => history.goBack()}
                    />

                    {(loading || uploadingFile) && (
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

EditCustomer.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  onGetCustomer: PropTypes.func,
  onPutCustomer: PropTypes.func,
  onUploadFile: PropTypes.func,
  onRemoveFile: PropTypes.func,
}

const mapStateToProps = ({
  File,
  Login,
  customers,
  Blog,
  subAdmins,
  Settings,
  roles,
  BlogCategory,
  BlogTag,
}) => ({
  error: Blog.error,
  loading: Blog.loading,
  customer: Blog.blog,
  onAddCustomer: PropTypes.func,
  uploadingFile: File.loading,
  countries: Login?.countries,
  user: Login?.user,
  driverlist: BlogCategory.blogCategories,
  customerList: BlogTag.blogTags,
  hideThings: Settings.settings.hideThings,
  vendorList: subAdmins?.vendorList,
  roles: roles.roles,
})

const mapDispatchToProps = dispatch => ({
  onGetCustomer: id => dispatch(getblog(id)),
  onAddCustomer: (data, history) => dispatch(addblog(data, history)),
  onPutCustomer: (customer, history) => dispatch(putBlog(customer, history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
  onRemoveFile: data => dispatch(removeFile(data)),
  ongetDriverDispatcherList: data => dispatch(getblogCategories(data)),
  ongetCustomerDispatcherList: data => dispatch(getblogTags(data)),
  ongetVendorListSubAdmin: data => dispatch(getVendorListSubAdmin(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(EditCustomer))
)
