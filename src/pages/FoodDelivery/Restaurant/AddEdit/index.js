import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect } from "react-redux"
import Dropzone from "react-dropzone"
import worldCountries from "world-countries"
import FormButton from "components/Common/FormButtons"
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete"
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
} from "reactstrap"
import Select from "react-select"

import {
  addFdRestaurant,
  getFdRestaurant,
  putFdRestaurant,
  uploadFile,
  removeFile,
  getSettings,
} from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

// Contants
import { GET_SERVICE_NAME, SLUGS_NAME as slugname, SLUGS_NAME } from "helpers/contants"

import { withTranslation } from "react-i18next"

// Images
import avatar4 from "assets/images/logo-placeholder.png"
import { Modal } from "react-bootstrap"
import { settings } from "nprogress"

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

const AddCustomer = ({
  accessLevel,
  history,
  error,
  onAddFdRestaurant,
  onGetFdRestaurant,
  onPutFdRestaurant,
  fdRestaurant,
  onUploadFile,
  onRemoveFile,
  loading,
  activeStoreId,
  activeStoreType,
  getSettings,
  uploadingFile,
  ...props
}) => {
  const { id } = useParams()
  const didMountRef = useRef(null)

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    storeTypeId: "",
    name: "",
    fname: "",
    lname:"",
    email: "",
    countryCode: "",
    mobileNumber: "",
    profileImage: null,
    password: "",
    address: "",
    lat: 0,
    lng: 0,
    status: "approved",
  })
  const [countryCodeData, setCountryCode] = useState({})
  const [selectedFiles, setselectedFiles] = useState([])
  const [bannerselectedFiles, setbannerselectedFiles] = useState([])
   const [show, setShow] = useState(-1)

   const handleClose = () => setShow(false)
  
  const [addressValue, setAddressValue] = useState(null)

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
      console.log(id, "IDD")
      if (!activeStoreId) return
      onGetFdRestaurant(activeStoreId, id)
    }
  }, [id, activeStoreId])

  useEffect(() => {
    setFields({ ...fields, storeTypeId: activeStoreId })
  }, [activeStoreId])

  const setDefaultCode = function () {
    let defaultCode = props?.countries?.find(c => c.code == props?.storeCountry)

    setCountryCode({ label: defaultCode?.cc, value: defaultCode?.cc })
    setFields(prev => ({
      ...prev,
      countryCode: defaultCode?.cc,
    }))
  }

  useEffect(() => {



    try {
      let fname_lname_Array = fdRestaurant?.name?.split(" ")
      console.log("fname_lname_Array", fname_lname_Array)


      let fname_lname_object = {
        _id: fdRestaurant._id,
        name: fdRestaurant.name || "",
        fname: fname_lname_Array[0] || "",
        lname: fname_lname_Array[1] || "",
        email: fdRestaurant.email || "",
        countryCode: fdRestaurant.countryCode || "",
        mobileNumber: fdRestaurant.mobileNumber || "",
        profileImage: fdRestaurant.profileImage || null,
        password: "",
        address: fdRestaurant.address || "",
        lat: fdRestaurant.userLocation.coordinates[1],
        lng: fdRestaurant.userLocation.coordinates[0],
        status: fdRestaurant.status || "approved",
      }


      if (SLUGS_NAME.purposeDeliveryService === props.slug) {
      

        setFields(fname_lname_object)
      }
    } catch (err) {
       console.log("parsing error ", err)

    }

    if (didMountRef.current) {
      try {
        setFields({
          _id: fdRestaurant._id,
          name: fdRestaurant.name || "",
          email: fdRestaurant.email || "",
          countryCode: fdRestaurant.countryCode || "",
          mobileNumber: fdRestaurant.mobileNumber || "",
          profileImage: fdRestaurant.profileImage || null,
          password: "",
          address: fdRestaurant.address || "",
          lat: fdRestaurant.userLocation.coordinates[1],
          lng: fdRestaurant.userLocation.coordinates[0],
          status: fdRestaurant.status || "approved",
        })

        const optionGroupIndex = optionGroup.findIndex(
          data => data.label === fdRestaurant.countryCode || ""
        )

        if (optionGroupIndex > -1) {
          setCountryCode(optionGroup[optionGroupIndex])
        }else {
          setDefaultCode();
        }

        if (fdRestaurant.profileImage && fdRestaurant.profileImage.link) {
          setselectedFiles([{ preview: fdRestaurant.profileImage.link }])
        }

        if (fdRestaurant.bannerImage && fdRestaurant.bannerImage.link) {
          setbannerselectedFiles([{ preview: fdRestaurant.bannerImage.link }])
        }

        if (fdRestaurant?.address) {
          setAddressValue({ label: fdRestaurant?.address })
        }
      } catch (err) {
        console.log("parsing error ", err)
      }
    } else {
      setDefaultCode()
      didMountRef.current = true
    }
  }, [JSON.stringify(fdRestaurant)])

  const uploadFileSuccess = name => response => {
    const { _id: profileImage } = response.data

    if (name === "profileImage") {
      setFields(prevState => ({ ...prevState, profileImage }))
    } else if (name === "bannerImage") {
      setFields(prevState => ({ ...prevState, bannerImage: profileImage }))
    }
  }

  const handleAcceptedFiles = name => _files => {
    if (id && !accesses.canEdit) return
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

    if (name === "profileImage") {
      setselectedFiles(files)
    } else if (name === "bannerImage") {
      setbannerselectedFiles(files)
    }
  }

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const handleAddressChange = data => {
    setAddressValue(data)

    setFields(prevState => ({ ...prevState, address: data?.label }))

    if (!data?.value?.place_id)
      return setFields(prevState => ({
        ...prevState,
        addressLocation: {
          lat: 0,
          lng: 0,
        },
      }))

    geocodeByPlaceId(data.value.place_id)
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
// date
  const onSubmit = event => {
    event.preventDefault()

    if (loading || uploadingFile) return
    if (!activeStoreType?.storeType?.toLowerCase()) return


    // if (SLUGS_NAME.purposeDeliveryService === props.slug) {
    //     let newFields = { ...fields, name: fields.fname + " " + fields.lname }
    //     delete newFields.fname, delete newFields.lname

    //   if (id) {
    //     if (!accesses.canEdit) return
    //     onPutFdRestaurant(
    //       activeStoreType?.storeType?.toLowerCase(),
    //       { _id: fdRestaurant._id, ...newFields },
    //       history
    //     )
    //   } else {
    //     if (!accesses.canAdd) return
    //     const callback = data => {
    //       if (activeStoreType?.storeVendorType === "SINGLE") {
    //         const vendorId = data?._id

    //         getSettings()

    //         history.replace(
    //           `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
    //             {
    //               storeType: activeStoreType?.storeType,
    //             }
    //           ).toLowerCase()}s/${vendorId}/profile`
    //         )
    //       } else {
    //         history?.goBack()
    //       }
    //     }

    //     onAddFdRestaurant(
    //       activeStoreType?.storeType?.toLowerCase(),
    //       { ...fields },
    //       callback
    //     )
    //   }
      
      
    // } else {
       if (id) {
         if (!accesses.canEdit) return
         onPutFdRestaurant(
           activeStoreType?.storeType?.toLowerCase(),
           { _id: fdRestaurant._id, ...fields },
           history
         )
       } else {
         if (!accesses.canAdd) return
         const callback = data => {
           if (activeStoreType?.storeVendorType === "SINGLE") {
             const vendorId = data?._id

             getSettings()

             history.replace(
               `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                 {
                   storeType: activeStoreType?.storeType,
                 }
               ).toLowerCase()}s/${vendorId}/profile`
             )
           } else {
             history?.goBack()
           }
         }

         onAddFdRestaurant(
           activeStoreType?.storeType?.toLowerCase(),
           { ...fields },
           callback
         )
       }


    // }

   
  }

  const imageFile = selectedFiles[0]
   const imageFile1 = bannerselectedFiles[0]
  const breadcrumtitle =
    props?.slug == "topup-fuel"
      ? "Providers"
      : [slugname.dewe, slugname.zaza].includes(props?.slug)
      ? "Store"
      : GET_SERVICE_NAME({
          storeType: activeStoreType?.storeType,
        }) + "s"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={`${!id ? "Add" : "Edit"} ${GET_SERVICE_NAME({
              storeType: activeStoreType?.storeType,
            })}`}
            breadcrumbItems={
              activeStoreType?.storeVendorType === "SINGLE"
                ? [
                    {
                      title:
                        props.t("create") +
                        " " +
                        GET_SERVICE_NAME({
                          storeType: activeStoreType?.storeType,
                        }),
                    },
                  ]
                : [
                    {
                      title: breadcrumtitle,
                      link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                        {
                          storeType: activeStoreType?.storeType,
                        }
                      ).toLowerCase()}s`,
                    },
                    { title: props.t(id ? "edit" : "add") },
                  ]
            }
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
                      {/* {SLUGS_NAME.purposeDeliveryService === props?.slug && (
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
                                value={fields.fname || ""}
                                onChange={handleChange("fname")}
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
                                value={fields.lname || ""}
                                onChange={handleChange("lname")}
                                required
                              />
                            </FormGroup>
                          </Col>
                        </>
                      )} */}

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
                              {" "}
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
                    </Row>

                    <Row>
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

                      <Col md={6}>
                        <FormGroup className="ajax-select select2-container">
                          <Label>{props.t("address")}</Label>

                          <GooglePlacesAutocomplete
                            apiKey={props?.googleMapKey}
                            selectProps={{
                              isClearable: true,
                              inputId: "address-select",
                              classNamePrefix: "select2-selection",
                              value: addressValue,
                              onChange: handleAddressChange,
                              placeholder: props.t("address_placeholder"),
                              components: {
                                IndicatorSeparator: false,
                                DropdownIndicator: false,
                              },
                              noOptionsMessage: () => "No address found",
                              // onFail: (error) => console.error(error),
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      {activeStoreType?.storeVendorType !== "SINGLE" && (
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
                      )}

                      {!id && activeStoreType?.storeVendorType !== "SINGLE" && (
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
                      )}
                    </Row>

                    <Row>
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
                            onClick={() => setShow(1)}
                          >
                            {props.t("preview")}
                          </a>

                          <Modal
                            className="transparent-pop"
                            show={show == 1}
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

                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-profile-image-Input">
                            {props.t("banner_200_500")}
                          </Label>

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
                                      src={
                                        !!imageFile
                                          ? imageFile.preview
                                          : avatar4
                                      }
                                    />
                                  </div>

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
                            onClick={() => setShow(2)}
                          >
                            {props.t("preview")}
                          </a>

                          <Modal
                            className="transparent-pop"
                            show={show == 2}
                            onHide={handleClose}
                          >
                            <img
                              alt={
                                !!imageFile1 && imageFile1.name
                                  ? imageFile1.name
                                  : "uza"
                              }
                              src={!!imageFile1 ? imageFile1.preview : avatar4}
                            />
                          </Modal>
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

AddCustomer.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  fdRestaurant: PropTypes.object,
  onAddFdRestaurant: PropTypes.func,
  onGetFdRestaurant: PropTypes.func,
  onPutFdRestaurant: PropTypes.func,
  onUploadFile: PropTypes.func,
  onRemoveFile: PropTypes.func,
}

const mapStateToProps = ({ File, Login, Settings, FD_Restaurants }) => ({
  googleMapKey:
    process.env.NODE_ENV === "development"
      ? "AIzaSyAxlXaOet7nyJcEJQw_SXFuK2EnRMw0zbg"
      : Settings?.settings?.googleMapKey?.web,
  error: FD_Restaurants.error,
  loading: FD_Restaurants.loading,
  fdRestaurant: FD_Restaurants.fdRestaurant,
  uploadingFile: File.loading,
  countries: Login?.countries,
  slug: Settings?.settings?.slug,
  storeCountry: Settings?.settings?.country,
})

const mapDispatchToProps = dispatch => ({
  onAddFdRestaurant: (storeType, data, history) =>
    dispatch(addFdRestaurant(storeType, data, history)),
  onGetFdRestaurant: (storeType, id) =>
    dispatch(getFdRestaurant(storeType, id)),
  onPutFdRestaurant: (storeType, data, history) =>
    dispatch(putFdRestaurant(storeType, data, history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
  onRemoveFile: data => dispatch(removeFile(data)),
  getSettings: () => dispatch(getSettings()),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddCustomer))
)
