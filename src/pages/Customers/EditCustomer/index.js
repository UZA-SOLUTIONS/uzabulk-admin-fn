import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect } from "react-redux"
import Dropzone from "react-dropzone"
import worldCountries from "world-countries"
import queryString from "query-string"
import FormButton from "components/Common/FormButtons"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import phone from "phone"

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
  Button,
} from "reactstrap"
import Select from "react-select"

import { getCustomer, putCustomer, uploadFile, removeFile } from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

// Images
import avatar4 from "assets/images/users/avatar-9.jpg"
import { Modal } from "react-bootstrap"
import { SLUGS_NAME } from "helpers/contants"

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
      className={`country-code-option p-2${props.isSelected ? " selected" : ""
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

const EditCustomer = props => {
  const {
    accessLevel,
    history,
    location,
    error,
    onGetCustomer,
    onPutCustomer,
    loading,
    onUploadFile,
    onRemoveFile,
    customer,
    uploadingFile,
    settings,
  } = props
  const { id } = useParams()
  const { customer_name } = queryString.parse(props?.location?.search)

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    name: "",
    fname: "",
    lname: "",
    mobileNumber: "",
    countryCode: "",
    profileImage: {},
    address: "",
    email: "",
    status: "active",
  })
  const [countryCodeData, setCountryCode] = useState({})
  const [selectedFiles, setselectedFiles] = useState([])
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  console.log('fields', fields.fname)
  const setDefaultCode = function () {
    let defaultCode = props?.countries?.find(c => c.code == props?.storeCountry)

    setCountryCode({ label: defaultCode?.cc, value: defaultCode?.cc })
    setFields(prev => ({
      ...prev,
      countryCode: defaultCode?.cc,
    }))
  }

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
      if (!accesses.canEdit) return
      onGetCustomer(id)
    } else {
      history.replace("/customers")
    }
  }, [id, accesses])

  /* Update Field State on Customer Reducer Change */

  useEffect(() => {

    console.log('props.settings?.slug', props.settings?.slug)
    var fname_lname_Array = customer?.name?.split(" ")

    console.log("fname_lname_Array", fname_lname_Array?.[0])

    let newobject = {
      _id: customer._id || "",
      name: customer.name || "",
      fname: fname_lname_Array?.[0] || "",
      lname: fname_lname_Array?.[1] || "",
      mobileNumber: customer.mobileNumber || "",
      countryCode: customer.countryCode || "",
      profileImage: customer.profileImage || {},
      address: customer.address || "",
      email: customer.email || "",
      status: customer.status || "active",
    }

    if (SLUGS_NAME.purposeDeliveryService === props.settings?.slug) {
      setFields(newobject)
    } else {


      setFields({
        _id: customer._id || "",
        name: customer.name || "",
        mobileNumber: customer.mobileNumber || "",
        countryCode: customer.countryCode || "",
        profileImage: customer.profileImage || {},
        address: customer.address || "",
        email: customer.email || "",
        status: customer.status || "active",
      })
    }


    const optionGroupIndex = optionGroup.findIndex(
      data => data.label === customer.countryCode || ""
    )

    if (optionGroupIndex > -1) {
      setCountryCode(optionGroup[optionGroupIndex])
    } else {
      setDefaultCode()
    }

    if (customer.profileImage && customer.profileImage.link) {
      setselectedFiles([{ preview: customer.profileImage.link }])
    }
  }, [JSON.stringify(customer)])

  /* Hit Update Customer API on Image Upload Success */
  const uploadFileSuccess = response => {
    // onPutCustomer({ _id: customer._id, profileImage: response.data._id })

    setFields(prevState => ({ ...prevState, profileImage: response.data }))
  }

  /* Function to Accept Files in Dropzone */
  function handleAcceptedFiles(_files) {
    if (!accesses.canEdit) return
    const files = _files?.filter(file => file.size < 5242880)

    if (files.length < _files.length) {
      return toastr.error(props.t("max_file_size"))
    }

    setFields(prevState => ({ ...prevState, profileImage: files[0] }))
    onUploadFile({ image: files[0] }, uploadFileSuccess)

    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
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

  /* Handle Input onChange */
  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  /* Handle Form Submit */
  const onSubmit = event => {
    event.preventDefault()

    if (loading || uploadingFile) return

    if (checkValidity(fields)) {
      let newFields = { ...fields, name: fields.fname + " " + fields.lname }
      delete newFields.fname, delete newFields.lname
      if (SLUGS_NAME.purposeDeliveryService === props.settings?.slug) {
        onPutCustomer(
          { ...newFields, profileImage: fields.profileImage._id },
          history
        )
      } else {
        onPutCustomer(
          { ...fields, profileImage: fields.profileImage._id },
          history
        )


      }
    }
  }

  function checkValidity(fields) {
    var errors = []

    if (
      typeof fields.countryCode !== "string" ||
      !fields.countryCode?.length > 2
    ) {
      errors.push("Mobile country code is required")
    }

    if (!phone(fields.countryCode + "" + fields.mobileNumber).isValid) {
      errors.push("Enter a valid mobile number")
    }

    if (errors.length > 0) {
      errors.forEach(error => {
        toastr.error(error)
      })
      return false
    }

    return true
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
    setFields(prevState => ({ ...prevState, countryCode: data?.label }))
    setCountryCode(data)
  }

  const imageFile = selectedFiles[0]
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Customers"
            breadcrumbItem={props.t("Edit") + " " + props.t("Customer")}
            breadcrumbItems={[
              { title: props.t("customers"), link: "/customers" },
              {
                title: customer_name || props.t("profile"),
                link: `/customers/${id}/profile`,
              },
              { title: props.t("edit") },
            ]}
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Form
                    onSubmit={onSubmit}
                    className="spinner-content"
                    autocomplete="off"
                  >
                    {error && typeof error === "string" ? (
                      <Alert color="danger">{error}</Alert>
                    ) : null}

                    <Row>
                      {SLUGS_NAME.purposeDeliveryService === settings.slug ? (
                        <>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="formrow-firstname-Input">
                                {props.t("firstname")}
                                <span className="text-danger ml-1">*</span>
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="formrow-firstname-Input"
                                value={fields.fname}
                                onChange={e =>
                                  handleChange("fname")({
                                    target: {
                                      value: e.target.value.replace(
                                        /[^a-zA-Z ]/g,
                                        ""
                                      ),
                                    },
                                  })
                                }
                                required
                              />
                            </FormGroup>
                          </Col>

                          <Col md={6}>
                            <FormGroup>
                              <Label for="formrow-lastname-Input">
                                {props.t("lastname")}
                                <span className="text-danger ml-1">*</span>
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="formrow-lastname-Input"
                                value={fields.lname}
                                onChange={e =>
                                  handleChange("lname")({
                                    target: {
                                      value: e.target.value.replace(
                                        /[^a-zA-Z ]/g,
                                        ""
                                      ),
                                    },
                                  })
                                }
                                required
                              />
                            </FormGroup>
                          </Col>
                        </>
                      ) : (
                        <Col md={6}>
                          <FormGroup>
                            <Label for="formrow-name-Input">
                              {props.t("name")}
                              <span className="text-danger ml-1">*</span>
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="formrow-name-Input"
                              value={fields.name}
                              onChange={e =>
                                handleChange("name")({
                                  target: {
                                    value: e.target.value.replace(
                                      /[^a-zA-Z ]/g,
                                      ""
                                    ),
                                  },
                                })
                              }
                              required
                            />
                          </FormGroup>
                        </Col>
                      )}

                      <Col md={6}>
                        <FormGroup>
                          <Row>
                            <Col
                              sm={5}
                              md={4}
                              lg={5}
                              xl={4}
                              className="pr-xs-2 pr-sm-0 mb-2 mb-sm-0"
                            >
                              <Label for="formrow-mobilenumber-Input">
                                {props.t("code")}
                              </Label>
                              <Select
                                isClearable={true}
                                placeholder=""
                                options={props?.countries?.map(
                                  ({ name, cc, code }) => ({
                                    label: cc,
                                    name,
                                    value: name,
                                    code: code?.toLowerCase(),
                                  })
                                )}
                                classNamePrefix="select2-selection"
                                components={{
                                  Option: CustomOptionComponent,
                                  IndicatorSeparator: false,
                                  DropdownIndicator: false,
                                }}
                                inputId={"country-code-select"}
                                styles={{
                                  clearIndicator: provided => ({
                                    ...provided,
                                    padding: "4px",
                                  }),
                                  dropdownIndicator: provided => ({
                                    ...provided,
                                    padding: "4px",
                                  }),
                                  menu: provided => {
                                    return {
                                      ...provided,
                                      minWidth: "200px",
                                    }
                                  },
                                }}
                                onChange={handleCountryCode}
                                value={countryCodeData}
                              />
                            </Col>

                            <Col sm={7} md={8} lg={7} xl={8}>
                              <Label for="formrow-mobilenumber-Input">
                                {props.t("mobile")}
                                <span className="text-danger ml-1">*</span>
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="formrow-mobilenumber-Input"
                                value={fields.mobileNumber || ""}
                                onChange={handleChange("mobileNumber")}
                                required
                              />
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                      {/* </Row> */}

                      {/* <Row> */}
                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-email-Input">
                            {props.t("email")}
                            <span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                            type="email"
                            className="form-control"
                            id="formrow-email-Input"
                            value={fields.email || ""}
                            onChange={handleChange("email")}
                            required
                          />
                        </FormGroup>
                      </Col>

                      {/* <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-address-Input">
                            {props.t("address")}
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-address-Input"
                            value={fields.address || ""}
                            onChange={handleChange("address")}
                          />
                        </FormGroup>
                      </Col> */}
                    </Row>

                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>{props.t("status")}</Label>

                          <select onChange={(e) => {
                            console.log(e.target?.querySelector("option:selected"));
                            console.log(e.target.value);
                          }}>
                            <option value={"1"} data-attr="va"></option>
                            <option value={"12"} data-attr="va2"></option>
                          </select>

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
                            {props.t("profile_image")}
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
                                    className="rounded-circle avatar-xl"
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
                    </Row>

                    <FormButton
                      needSubmit={accesses.canEdit}
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
  t: PropTypes.any,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onGetCustomer: PropTypes.func,
  onPutCustomer: PropTypes.func,
  onUploadFile: PropTypes.func,
  onRemoveFile: PropTypes.func,
}

const mapStateToProps = ({ File, customers, Login, Settings }) => ({
  error: customers.error,
  loading: customers.loading,
  customer: customers.customer,
  uploadingFile: File.loading,
  countries: Login?.countries,
  settings: Settings.settings,
  storeCountry: Settings?.settings?.country,
})

const mapDispatchToProps = dispatch => ({
  onGetCustomer: id => dispatch(getCustomer(id)),
  onPutCustomer: (customer, history) =>
    dispatch(putCustomer(customer, history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
  onRemoveFile: data => dispatch(removeFile(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(EditCustomer))
)
