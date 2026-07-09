import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { connect } from "react-redux"
import Dropzone from "react-dropzone"
import worldCountries from "world-countries"
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
  UncontrolledTooltip,
  FormText,
  Button,
  // Modal,
} from "reactstrap"
import Select from "react-select"

import {
  addCustomer,
  addCustomerSuccess,
  uploadFile,
  removeFile,
} from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

// Images
import avatar4 from "assets/images/users/avatar-9.jpg"
import { SLUGS_NAME } from "helpers/contants"
import phone from "phone"
import { Modal } from "react-bootstrap"

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

const AddCustomer = props => {
  const {
    accessLevel,
    history,
    error,
    success,
    onAddCustomer,
    loading,
    onUploadFile,
    onRemoveFile,
    uploadingFile,
    settings,
  } = props
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
    profileImage: null,
    address: "",
    email: "",
    password: "",
    status: "active",
    role: "USER",
  })
  const [countryCodeData, setCountryCode] = useState({})

  const [selectedFiles, setselectedFiles] = useState([])

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const setDefaultCode = function () {
    let defaultCode = props?.countries?.find(c => c.code == props?.storeCountry)

    setCountryCode({ label: defaultCode?.cc, value: defaultCode?.cc })
    setFields(prev => ({
      ...prev,
      countryCode: defaultCode?.cc,
    }))
  }

  useEffect(() => {
    setDefaultCode()
    props.onAddCustomerSuccess("")
  }, [])

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

  const uploadFileSuccess = response => {
    const { _id: profileImage } = response.data

    setFields(prevState => ({ ...prevState, profileImage }))
  }

  function handleAcceptedFiles(_files) {
    if (!accesses.canAdd) return

    const files = _files?.filter(file => file.size < 5242880)

    if (files.length < _files.length) {
      return toastr.error(props.t("max_file_size"))
    }

    if (selectedFiles.length > 0) {
      if (fields.profileImage) {
        onRemoveFile({ _id: fields.profileImage })

        setFields(prevState => ({ ...prevState, profileImage: null }))
      }
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

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading || uploadingFile) return

    if (!accesses.canAdd) return

    if (checkValidity(fields)) {
      if (SLUGS_NAME.purposeDeliveryService === settings.slug) {
        let newFields = { ...fields, name: fields.fname + " " + fields.lname }
        delete newFields.fname, delete newFields.lname
        onAddCustomer(newFields, history)
      } else {
        onAddCustomer(fields, history)
      }
    }
  }

  function checkValidity(fields) {
    let errors = []

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

  const removeSelectedFiles = () => {
    const { profileImage } = fields

    if (profileImage) {
      onRemoveFile({ _id: profileImage })

      setFields(prevState => ({ ...prevState, profileImage: null }))
    }

    setselectedFiles([])
  }

  const handleCountryCode = data => {
    console.log("dooba ", data)
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
            breadcrumbItem={props.t("Add") + " " + props.t("Customer")}
            breadcrumbItems={[
              { title: props.t("customers"), link: "/customers" },
              { title: props.t("add") },
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

                    {success && typeof success === "string" ? (
                      <Alert color="success">{success}</Alert>
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
                                type="number"
                                className="form-control"
                                id="formrow-mobilenumber-Input"
                                value={fields.mobileNumber}
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
                            value={fields.email}
                            onChange={handleChange("email")}
                            required
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-password-Input">
                            {props.t("password")}
                            <span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                            type="password"
                            className="form-control"
                            id="formrow-password-Input"
                            value={fields.password}
                            onChange={handleChange("password")}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      {/* <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-address-Input">
                            {props.t("Address")}
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-address-Input"
                            value={fields.address}
                            onChange={handleChange("address")}
                          />
                        </FormGroup>
                      </Col> */}
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

                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-role-Input">
                            {props.t("role")}
                            <span className="text-danger ml-1">*</span>
                          </Label>
                          <select
                            name="role"
                            className="form-control"
                            id="formrow-role-Input"
                            value={fields.role}
                            onChange={handleChange("role")}
                            required
                          >
                            <option value={"USER"}>User</option>
                            <option value={"WHOLESALER"}>Wholesaler</option>
                          </select>
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
                            onClick={handleClose}
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
                      needSubmit={accesses.canAdd}
                      submitDisabled={uploadingFile || loading}
                      goBack={() => history.goBack()}
                      submitId="submittooltip"
                      submitContent={
                        uploadingFile && (
                          <UncontrolledTooltip
                            placement="bottom"
                            target="submittooltip"
                          >
                            {props.t("image_upload_wait")}
                          </UncontrolledTooltip>
                        )
                      }
                    />

                    {(uploadingFile || loading) && (
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

AddCustomer.propTypes = {
  t: PropTypes.any,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onAddCustomer: PropTypes.func,
  onUploadFile: PropTypes.func,
  onRemoveFile: PropTypes.func,
}

const mapStateToProps = ({ File, customers, Login, Settings }) => ({
  success: customers.success,
  error: customers.error,
  loading: customers.loading,
  uploadingFile: File.loading,
  countries: Login?.countries,
  storeCountry: Settings?.settings?.country,
  settings: Settings.settings,
})

const mapDispatchToProps = dispatch => ({
  onAddCustomer: (data, history) => dispatch(addCustomer(data, history)),
  onAddCustomerSuccess: msg => dispatch(addCustomerSuccess(msg)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
  onRemoveFile: data => dispatch(removeFile(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddCustomer))
)
