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
  InputGroup
} from "reactstrap"
import Select from "react-select"

import {
  addFdDriver,
  getFdDriver,
  putFdDriver,
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

const mixBankFields = (template, fields) => {
  const _fields = []

  if (!template || !fields) return _fields

  template?.map(item => {
    const fieldsIndex = fields?.findIndex(field => field.key === item.key)

    if (fieldsIndex !== -1) {
      _fields.push(fields[fieldsIndex])
    } else {
      _fields.push(item)
    }
  })

  return _fields
}

const AddDriver = ({
  accessLevel,
  history,
  error,
  onAddFdDriver,
  onGetFdDriver,
  onPutFdDriver,
  fdDriver,
  onUploadFile,
  onRemoveFile,
  loading,
  activeStoreId,
  activeStoreType,
  uploadingFile,
  settings,
  slug,
  ...props
}) => {
  const { id } = useParams()
  const { driver_name } = queryString.parse(props?.location?.search)


  const didMountRef = useRef(null)

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    storeTypeId: "",
    name: "",
    email: "",
    countryCode: "",
    mobileNumber: "",
    profileImage: null,
    password: "",
    address: "",
    bikeName: "",
    bikeNumber: "",
    status: "approved",
    commisionType: "global",
    commission: {
      deliveryBoy: 0
    },
    bankFields: props.bankFields,
  })
  const [countryCodeData, setCountryCode] = useState({})
  const [selectedFiles, setselectedFiles] = useState([])
  const [addressValue, setAddressValue] = useState(null)
  const [isedit, setIsEdit] = useState(false)

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
      // if (!activeStoreId) return
      onGetFdDriver(activeStoreId, id)
    }
  }, [id, activeStoreId])

  useEffect(() => {
    setFields({ ...fields, storeTypeId: activeStoreId })
  }, [activeStoreId])

  useEffect(() => {
    if (didMountRef.current) {
      try {
        const _bankFields = mixBankFields(
          props.bankFields,
          fdDriver?.bankFields
        )

        setFields({
          bankFields: _bankFields || [],
          _id: fdDriver._id,
          name: fdDriver.name || "",
          email: fdDriver.email || "",
          countryCode: fdDriver.countryCode || "",
          mobileNumber: fdDriver.mobileNumber || "",
          profileImage: fdDriver.profileImage || null,
          password: "",
          bikeName: fdDriver.bikeName || "",
          bikeNumber: fdDriver.bikeNumber || "",
          address: fdDriver.address || "",
          commisionType: fdDriver.commisionType || "global",
          commission: fdDriver.commission || { deliveryBoy: 0 },
          status: fdDriver.status || "approved",
        })
        setIsEdit(true)

        const optionGroupIndex = optionGroup.findIndex(
          data => data.label === fdDriver.countryCode || ""
        )

        if (optionGroupIndex > -1) {
          setCountryCode(optionGroup[optionGroupIndex])
        }

        if (fdDriver.profileImage && fdDriver.profileImage.link) {
          setselectedFiles([{ preview: fdDriver.profileImage.link }])
        }

        if (fdDriver?.address) {
          // setAddressValue({ label: fdDriver?.address })
        }
      } catch (err) {
        console.log("parsing error ", err)
      }
    } else didMountRef.current = true
  }, [JSON.stringify(fdDriver), props.bankFields])

  const uploadFileSuccess = response => {
    const { _id: profileImage } = response.data

    setFields(prevState => ({ ...prevState, profileImage }))
  }

  function handleAcceptedFiles(_files) {
    if (id && !accesses.canEdit) return
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

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const handleAddressChange = data => {
    setAddressValue(data)

    setFields(prevState => ({ ...prevState, address: data?.label || "" }))
  }


  const handleCountryCode = data => {
    setFields(prevState => ({ ...prevState, countryCode: data?.label }))
    setCountryCode(data)
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading || uploadingFile) return
    // if (!activeStoreType?.storeType?.toLowerCase()) return

    if (id) {
      if (!accesses.canEdit) return
      onPutFdDriver(
        activeStoreType?.storeType?.toLowerCase(),
        { _id: fdDriver._id, ...fields },
        history
      )
    } else {
      if (!accesses.canAdd) return
      onAddFdDriver(
        activeStoreType?.storeType?.toLowerCase(),
        { ...fields },
        history
      )
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={
              (id ? props.t("edit") : props.t("add")) + " " + props.t("driver")
            }
            breadcrumbItems={
              settings.storeTypeEnabled[0].storeType !== "SERVICEPROVIDER" ?
                [
                  {
                    title: props.t("drivers"),
                    // link: `/${activeStoreType?.storeType?.toLowerCase()}/drivers`,
                    link: `/drivers`,
                  },
                  ...(id
                    ? [
                      {
                        title: driver_name || props.t("Profile"),
                        link: `/drivers/${id}/profile`,
                        // link: `/${activeStoreType?.storeType?.toLowerCase()}/drivers/${id}/profile`,
                      },
                    ]
                    : []),
                  {
                    title: id ? props.t("edit") : props.t("add"),
                  },
                ] : [
                  {
                    title: props.t("Serviceprovider"),
                    // link: `/${activeStoreType?.storeType?.toLowerCase()}/drivers`,
                    link: `/drivers`,
                  },
                  ...(id
                    ? [
                      {
                        title: driver_name || props.t("Profile"),
                        link: `/drivers/${id}/profile`,
                        // link: `/${activeStoreType?.storeType?.toLowerCase()}/drivers/${id}/profile`,
                      },
                    ]
                    : []),
                  {
                    title: id ? props.t("edit") : props.t("add"),
                  },
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
                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-firstname-Input">
                            {props.t("name")}<span className="text-danger ml-1">*</span>
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
                          <Label for="formrow-mobilenumber-Input">
                            {props.t("mobile")}<span className="text-danger ml-1">*</span>
                          </Label>

                          <Row>
                            <Col
                              sm={5}
                              md={4}
                              lg={5}
                              xl={4}
                              className="pr-xs-2 pr-sm-0 mb-2 mb-sm-0"
                            >
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
                                classNamePrefix="country-code"
                                components={{
                                  Option: CustomOptionComponent,
                                  IndicatorSeparator: false,
                                  DropdownIndicator: false,
                                }}
                                inputId="country-code-select"
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
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-email-Input">
                            {props.t("email")}<span className="text-danger ml-1">*</span>
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

                      <Col md={6}>
                        <FormGroup className="ajax-select select2-container">
                          <Label>{props.t("address")}</Label>

                          <GooglePlacesAutocomplete
                            apiKey={props?.googleMapKey}
                            selectProps={{
                              isClearable: true,
                              inputId: "address-select",
                              classNamePrefix: "select2-selection",
                              // value: addressValue,
                              onChange: handleAddressChange,
                              placeholder: isedit ? fields?.address : props.t("address_placeholder"),
                              components: {
                                IndicatorSeparator: false,
                                DropdownIndicator: false,
                              },
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      {fields?.bankFields?.map((field, key) => (
                        <Col md={6} key={`_bankfield_${key}`}>
                          <FormGroup>
                            <Label>{field?.label}</Label>

                            <Input
                              type="text"
                              value={field.value}
                              onChange={e => {
                                const details = [...(fields?.bankFields || [])]
                                details[key] = {
                                  ...details[key],
                                  value: e.target.value,
                                }

                                handleChange("bankFields")({
                                  target: { value: details },
                                })
                              }}
                            />
                          </FormGroup>
                        </Col>
                      ))}

                      {/* <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-bike-name-Input">
                            {props.t("Bike Name")}
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-bike-name-Input"
                            value={fields.bikeName || ""}
                            onChange={handleChange("bikeName")}
                            required
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-bike-number-Input">
                            {props.t("Bike Number")}
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-bike-number-Input"
                            value={fields.bikeNumber || ""}
                            onChange={handleChange("bikeNumber")}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}

                      {!id && (
                        <Col md={6}>
                          <FormGroup>
                            <Label for="formrow-password-Input">
                              {props.t("password")}<span className="text-danger ml-1">*</span>
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
                      )}

                      <Col>
                        <FormGroup>
                          <Label>{props.t("status")}</Label>

                          <div className="switch-xl square-switch">
                            <input
                              type="checkbox"
                              id="square-switch1"
                              switch="none"
                              checked={fields.status == "approved"}
                              onChange={() => {
                                const value =
                                  fields.status == "approved"
                                    ? "created"
                                    : "approved"

                                handleChange("status")({ target: { value } })
                              }}
                            />
                            <label
                              htmlFor="square-switch1"
                              data-on-label={props.t("approved")}
                              data-off-label={props.t("created")}
                            />
                          </div>
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label className="text-capitalize">
                            {props.t("commision_type")}
                          </Label>

                          <div className={`switch-md square-switch`}>
                            <input
                              type="checkbox"
                              id="commision-type-switch"
                              switch="none"
                              checked={fields?.commisionType === "global"}
                              onChange={() => {
                                handleChange &&
                                  handleChange("commisionType")({
                                    target: {
                                      value:
                                        fields?.commisionType === "global"
                                          ? "override"
                                          : "global",
                                    },
                                  })
                              }}
                            />
                            <label
                              className="text-capitalize"
                              htmlFor="commision-type-switch"
                              data-on-label={props.t("global")}
                              data-off-label={props.t("override")}
                            />
                          </div>
                        </FormGroup>
                      </Col>

                      {fields?.commisionType === "override" && (
                        <Col md={6}>
                          <FormGroup>
                            <Label for="formrow-delivery-boy-input">
                              {slug===SLUGS_NAME.caterPlus?props.t("driver"):props.t("delivery_boy")}
                            </Label>

                            <InputGroup>
                              <Input
                                id="formrow-delivery-boy-input"
                                type="number"
                                value={fields?.commission?.deliveryBoy}
                                onChange={e => {
                                  const { value } = e.target

                                  if (value > 100) return
                                  handleChange("commission")({
                                    target: {
                                      value: {
                                        deliveryBoy: value,
                                      },
                                    },
                                  })
                                }}
                                min={0}
                              />

                              <div className="input-group-append">
                                <span className="input-group-text">%</span>
                              </div>
                            </InputGroup>
                            <FormText>
                              {`${100 - fields?.commission?.deliveryBoy}% ${props.t(
                                "admin_commission"
                              )}`}
                            </FormText>
                          </FormGroup>
                        </Col>
                      )}
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

                          <FormText>{props.t("max_file_size")}</FormText>
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

AddDriver.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  fdDriver: PropTypes.object,
  onAddFdDriver: PropTypes.func,
  onGetFdDriver: PropTypes.func,
  onPutFdDriver: PropTypes.func,
  onUploadFile: PropTypes.func,
  onRemoveFile: PropTypes.func,
}

const mapStateToProps = ({ File, Login, Settings, FD_Drivers }) => ({
  googleMapKey: process.env.NODE_ENV === "development"
  ? "AIzaSyAxlXaOet7nyJcEJQw_SXFuK2EnRMw0zbg"
  : Settings?.settings?.googleMapKey?.web,
  bankFields: Settings?.settings?.bankFields || [],
  error: FD_Drivers.error,
  loading: FD_Drivers.loading,
  fdDriver: FD_Drivers.fdDriver,
  uploadingFile: File.loading,
  countries: Login?.countries,
  settings: Settings?.settings,
  slug: Settings?.settings?.slug,
})

const mapDispatchToProps = dispatch => ({
  onAddFdDriver: (storeType, data, history) =>
    dispatch(addFdDriver(storeType, data, history)),
  onGetFdDriver: (storeType, id) => dispatch(getFdDriver(storeType, id)),
  onPutFdDriver: (storeType, data, history) =>
    dispatch(putFdDriver(storeType, data, history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
  onRemoveFile: data => dispatch(removeFile(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddDriver))
)
