import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect } from "react-redux"
import Dropzone from "react-dropzone"
import worldCountries from "world-countries"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
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

import { currentUser, editProfile, uploadFile } from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

// Images
import avatar4 from "assets/images/users/avatar-9.jpg"
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

const AddDriver = ({
  history,
  error,
  success,
  onGetCurrentUser,
  onPutProfile,
  admin,
  loading,
  onUploadFile,
  fileLoading,
  ...props
}) => {
  const [fields, setFields] = useState({
    name: "",
    mobileNumber: "",
    countryCode: "",
    profileImage: null,
    address: "",
    email: "",
  })
  const [countryCodeData, setCountryCode] = useState({})
  const [selectedFiles, setselectedFiles] = useState([])

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  useEffect(() => {
    // onGetCurrentUser()
  }, [])

  const setDefaultCode = function () {
    let defaultCode = props?.countries?.find(c => c.code == props?.storeCountry)

    setCountryCode({ label: defaultCode?.cc, value: defaultCode?.cc })
    setFields(prev => ({
      ...prev,
      countryCode: defaultCode?.cc,
    }))
  }

  useEffect(() => {
    setFields({
      _id: admin._id || "",
      name: admin.name || "",
      mobileNumber: admin.mobileNumber || "",
      countryCode: admin.countryCode || "",
      profileImage: admin.profileImage || null,
      address: admin.address || "",
      email: admin.email || "",
    })

    const optionGroupIndex = optionGroup.findIndex(
      data => data.label === admin.countryCode || ""
    )

    if (optionGroupIndex > -1) {
      setCountryCode(optionGroup[optionGroupIndex])
    } else {
      setDefaultCode()
    }

    if (admin.profileImage && admin.profileImage.link) {
      setselectedFiles([{ preview: admin.profileImage.link }])
    }
  }, [JSON.stringify(admin), props.bankFields])

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  /* Hit Update Customer API on Image Upload Success */
  const uploadFileSuccess = response => {
    // onPutCustomer({ _id: customer._id, profileImage: response.data._id })

    setFields(prevState => ({ ...prevState, profileImage: response.data._id }))
  }

  /* Function to Accept Files in Dropzone */
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

  const handleCountryCode = data => {
    setFields(prevState => ({ ...prevState, countryCode: data?.label }))
    setCountryCode(data)
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return
    if (fileLoading) return

    if (checkValidity(fields)) {
      onPutProfile({ _id: admin._id, ...fields }, history)
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
  const imageFile = selectedFiles[0]
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={props.t("edit") + " " + props.t("profile")}
            breadcrumbItems={[
              {
                title: props.t("edit") + " " + props.t("profile"),
              },
            ]}
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Form onSubmit={onSubmit} className="spinner-content">
                    {success && <Alert color="success">{success}</Alert>}
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
                                value={fields.mobileNumber}
                                onChange={handleChange("mobileNumber")}
                                required
                              />
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>

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
                            {props.t("Address")}
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
                      disabled={fileLoading}
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

AddDriver.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  admin: PropTypes.object,
  onGetCurrentUser: PropTypes.func,
  onPutProfile: PropTypes.func,
}

const mapStateToProps = ({ Login, Profile, File, Settings }) => ({
  success: Profile.success,
  error: Profile.error,
  loading: Profile.loading,
  admin: Login.user,
  fileLoading: File.loading,
  countries: Login?.countries,
  storeCountry: Settings?.settings?.country,
})

const mapDispatchToProps = dispatch => ({
  onGetCurrentUser: () => dispatch(currentUser()),
  onPutProfile: (data, history) => dispatch(editProfile(data, history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddDriver))
)
