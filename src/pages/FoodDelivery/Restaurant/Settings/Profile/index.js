import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Dropzone from "react-dropzone"
import worldCountries from "world-countries"
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete"
import { isObject } from "lodash"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { Col, Row, Form, FormGroup, Label, Input, FormText } from "reactstrap"
import Select from "react-select"

import { uploadFile } from "store/actions"

import { ROLES, SLUGS_NAME } from "helpers/contants"

// Images
import avatar4 from "assets/images/logo-placeholder.png"

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

const Profile = ({
  activeStoreType,
  fields,
  setFields,
  onUploadFile,
  accesses,
  hideRestaurantName,
  ...props
}) => {
  const [countryCodeData, setCountryCode] = useState({})
  const [selectedFiles, setselectedFiles] = useState([])
  const [bannerselectedFiles, setbannerselectedFiles] = useState([])
  const [addressValue, setAddressValue] = useState(null)

  useEffect(() => {
    try {
      const optionGroupIndex = optionGroup.findIndex(
        data => data.label === fields.countryCode || ""
      )

      if (optionGroupIndex > -1) {
        setCountryCode(optionGroup[optionGroupIndex])
      }

      if (isObject(fields?.profileImage) && !!fields?.profileImage?.link) {
        setselectedFiles([{ preview: fields?.profileImage?.link }])
      }

      if (isObject(fields?.bannerImage) && !!fields?.bannerImage?.link) {
        setbannerselectedFiles([{ preview: fields?.bannerImage?.link }])
      }

      if (fields?.address) {
        setAddressValue({ label: fields?.address })
      }
    } catch (err) {
      console.log("parsing error ", err)
    }
  }, [JSON.stringify(fields)])

  const uploadFileSuccess = name => response => {
    const { _id: profileImage } = response.data

    setFields(prevState => ({ ...prevState, [name]: profileImage }))
  }

  const handleAcceptedFiles = name => _files => {
    if (!accesses?.canEdit) return
    const files = _files?.filter(file => file.size < 5242880)

    if (files.length < _files.length) {
      return toastr.error(props.t("max_file_size"))
    }

    onUploadFile({ image: files[0] }, uploadFileSuccess(name))

    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    if (name === "bannerImage") {
      setbannerselectedFiles(files)
    } else if (name === "profileImage") {
      setselectedFiles(files)
    }
  }

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const handleAddressChange = data => {
    setAddressValue(data)

    setFields(prevState => ({ ...prevState, address: data?.label || "" }))

    if (!data?.value?.place_id)
      return setFields(prevState => ({
        ...prevState,
        addressLocation: {
          lat: 0,
          lng: 0,
        },
      }))

    geocodeByPlaceId(data?.value?.place_id)
      .then(results => {
        const result = results[0]

        if (!result) return

        setFields(prevState => ({
          ...prevState,
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
        }))
      })
      .catch(error => console.error(error))
  }

  const handleCountryCode = data => {
    setFields(prevState => ({ ...prevState, countryCode: data?.label }))
    setCountryCode(data)
  }

  return (
    <Row>
      <Col lg={4}>
        <h4>{props.t(!props.isBasic ? "profile" : "general_settings")}</h4>
      </Col>

      <Col lg={8}>
        <Form autocomplete="off">
          <Row>
            {/* settings */}

            {console.log('settings?.slug', props.settings?.slug)}
            {/* {SLUGS_NAME.purposeDeliveryService === props.settings?.slug && (
              <>
                {!props.isBasic && (
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
                        value={fields.fname || ""}
                        onChange={handleChange("fname")}
                        required
                      />
                      {!hideRestaurantName && (
                        <FormText>{props.t("vendor_name_guide")}</FormText>
                      )}
                    </FormGroup>
                  </Col>
                )}
                {!props.isBasic && (
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
                        value={fields.lname || ""}
                        onChange={handleChange("lname")}
                        required
                      />
                      {!hideRestaurantName && (
                        <FormText>{props.t("vendor_name_guide")}</FormText>
                      )}
                    </FormGroup>
                  </Col>
                )}
              </>
            )} */}

            {!props.isBasic && (
              <Col md={6}>
                <FormGroup>
                  <Label for="formrow-business_name-Input">
                    {props.t("business_name")}
                    <span className="text-danger ml-1">*</span>
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="formrow-business_name-Input"
                    value={fields.name || ""}
                    onChange={handleChange("name")}
                    required
                  />
                  {!hideRestaurantName && (
                    <FormText>{props.t("vendor_name_guide")}</FormText>
                  )}
                </FormGroup>
              </Col>
            )}

            {!props.isBasic && (
              <Col md={6}>
                <FormGroup>
                  <Label for="formrow-mobilenumber-Input">
                    {props.t("mobile")}
                    <span className="text-danger ml-1">*</span>
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
                        classNamePrefix="select2-selection"
                        components={{
                          Option: CustomOptionComponent,
                          IndicatorSeparator: false,
                          DropdownIndicator: false,
                        }}
                        inputId="country-code-select"
                        sroleyles={{
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
            )}

            {!props.isBasic && (
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
            )}

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
                    placeholder:
                      fields?.address || props.t("address_placeholder"),
                    components: {
                      IndicatorSeparator: false,
                      DropdownIndicator: false,
                    },
                    noOptionsMessage: () => "No address found",
                  }}
                />
              </FormGroup>
            </Col>

            {!props.isBasic && (
              <Col md={6}>
                <FormGroup>
                  <Label for="formrow-profile-image-Input">
                    {props.t("feature_image")}
                  </Label>

                  <Dropzone
                    onDrop={acceptedFiles => {
                      handleAcceptedFiles("profileImage")(acceptedFiles)
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
                            src={!!imageFile ? imageFile.preview : avatar4}
                          />

                          <div className="edit">
                            <i className="bx bx-pencil"></i>
                          </div>
                        </div>
                      )
                    }}
                  </Dropzone>

                  <FormText>
                    {props.t("feature_image_resolution")}{" "}
                    {props.t("max_file_size")}
                  </FormText>
                </FormGroup>
              </Col>
            )}

            <Col md={6}>
              <FormGroup>
                <Label>{props.t("banner_200_500")}</Label>

                <Dropzone
                  onDrop={acceptedFiles => {
                    handleAcceptedFiles("bannerImage")(acceptedFiles)
                  }}
                >
                  {({ getRootProps, getInputProps }) => {
                    const imageFile = bannerselectedFiles[0]

                    return (
                      <div
                        className="dropzone-single-image"
                        {...getRootProps()}
                        style={{
                          width: "9.5rem",
                        }}
                      >
                        <div
                          style={{
                            width: "9.5rem",
                          }}
                          className="avatar-xl d-flex align-items-center border"
                        >
                          <input
                            {...getInputProps()}
                            id="formrow-profile-image-Input"
                            multiple={false}
                          />

                          <img
                            className="rounded avatar-xl"
                            style={{
                              width: "9.5rem",
                              objectFit: "cover",
                              height: "5rem",
                            }}
                            alt={
                              !!imageFile && imageFile.name
                                ? imageFile.name
                                : "uza"
                            }
                            src={!!imageFile ? imageFile.preview : avatar4}
                          />
                        </div>

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

            {/* {activeStoreType?.storeVendorType !== "SINGLE" &&
              props?.role !== ROLES.vendor && (
                <Col>
                  <FormGroup>
                    <Label>Status</Label>

                    <div className="switch-xl square-switch">
                      <input
                        type="checkbox"
                        id="square-switch1"
                        switch="none"
                        checked={fields.status == "approved"}
                        onChange={() => {
                          const value =
                            fields.status == "approved" ? "created" : "approved"

                          handleChange("status")({ target: { value } })
                        }}
                      />
                      <label
                        htmlFor="square-switch1"
                        data-on-label="Approved"
                        data-off-label="Created"
                      />
                    </div>
                  </FormGroup>
                </Col>
              )} */}
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

Profile.propTypes = {
  fields: PropTypes.object,
  setFields: PropTypes.func,
  onUploadFile: PropTypes.func,
}

const mapStateToProps = ({ Settings, Login }) => ({
  googleMapKey:
    process.env.NODE_ENV === "development"
      ? "AIzaSyAxlXaOet7nyJcEJQw_SXFuK2EnRMw0zbg"
      : Settings?.settings?.googleMapKey?.web,
  role: Login?.user?.role || "",
  countries: Login?.countries,
  settings: Settings.settings,
})

const mapDispatchToProps = dispatch => ({
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
