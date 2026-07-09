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
} from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

// Images
import avatar4 from "assets/images/users/avatar-9.jpg"

import Roles from "./Roles"
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
    name: "",
    mobileNumber: "",
    countryCode: "",
    profileImage: null,
    accessLevel: null,
    address: "",
    password: "",
    email: "",
    status: "active",
    role: "STAFF",
  })
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
        name: customer.name || "",
        mobileNumber: customer.mobileNumber || "",
        countryCode: customer.countryCode || "",
        profileImage: customer.profileImage || null,
        address: customer.address || "",
        email: customer.email || "",
        status: customer.status || "active",
        role: customer.role || "STAFF",
      })
      setSelectedDriver(
        customer?.driverassign?.map(({ name, _id }) => ({
          label: name,
          value: _id,
        }))
      )
      setSelectedCustomers(
        customer?.customerassign?.map(({ name, _id }) => ({
          label: name,
          value: _id,
        }))
      )
      setSelectedVendors(
        customer?.vendorassign?.map(({ name, _id }) => ({
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

      if (customer.profileImage && customer.profileImage.link) {
        setselectedFiles([{ preview: customer.profileImage.link }])
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

    setFields(prevState => ({ ...prevState, profileImage: response.data._id }))
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

    let driverassign = selectedDrivers?.map(driver => driver.value) || null
    let customerassign =
      selectedCustomers?.map(customer => customer.value) || null
    let vendorassign = selectedVendors?.map(vendor => vendor.value) || null

    if (checkValidity(fields)) {
      if (id) {
        if (!accesses.canEdit) return
        onPutCustomer(
          {
            ...fields,
            accessLevel: fields?.accessLevel?.value,
            profileImage: fields?.profileImage,
            driverassign,
            customerassign,
            vendorassign,
          },
          history
        )
      } else {
        if (!accesses.canAdd) return
        onAddCustomer(
          {
            ...fields,
            accessLevel: fields?.accessLevel?.value,
            customerassign,
            driverassign,
            vendorassign,
          },
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

  const getvendorList = async () => {
    let ab = await props?.roles
      ?.filter((r, ind) => r.name == fields?.accessLevel?.label)[0]
      ?.permissions?.filter(p => p?.type == "storetypes")[0]
      ?.storeTypes?.filter(st =>
        ["food", "grocery"].includes(st.storeType.toLowerCase())
      )
      ?.map(s => {
        if (
          ["vendors", "restaurants"].includes(
            s?.navigation[0]?.type.toLowerCase()
          )
        ) {
          return {
            label:
              s?.navigation[1]?.type == "vendors"
                ? s?.navigation[1]?.type
                : s?.navigation[0]?.type,
            value:
              s?.navigation[1]?.type == "vendors"
                ? s?.navigation[1]?.permissions?.filter(
                    p => p.label == "VIEW"
                  )?.[0]?.value
                : s?.navigation[0]?.permissions?.filter(
                    p => p.label == "VIEW"
                  )?.[0]?.value,
          }
        }
      })
    let data = []
    let names = {
      restaurants: "FOOD",
      vendors: "GROCERY",
    }

    for (let i = 0; i < ab?.length; i++) {
      if (
        ["restaurants", "vendors"].includes(ab[i]?.label) &&
        ab[i].value == true
      ) {
        console.log(ab[i]?.label, i, "names[ab[i]?.label")
        data.push(names[ab[i]?.label])
      }
    }
    return data
  }

  useEffect(() => {
    let res
    ;(async () => {
      res = await getvendorList()
      props?.ongetVendorListSubAdmin({ storeType: res })
    })()
  }, [fields?.accessLevel?.label])

  useEffect(() => {
    setVendorList(
      props?.vendorList?.map(({ name, _id }) => ({
        label: name,
        value: _id,
      }))
    )
  }, [props?.vendorList])

  console.log(props?.vendorList, "vendorListvendorList")
  const imageFile = selectedFiles[0]
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Customers"
            breadcrumbItem={
              (id ? props.t("edit") : props.t("add")) +
              " " +
              props.t(vendorrole !== "VENDOR" ? "sub_admins" : "sub_vendar")
            }
            breadcrumbItems={[
              {
                title: props.t(
                  vendorrole !== "VENDOR" ? "sub_admins" : "sub_vendar"
                ),
                link: "/sub-admins",
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
                                components={{ Option: CustomOptionComponent }}
                                inputId={"country-code-select"}
                                styles={{
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
                      </Col>

                      {!id && (
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

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("role")}</Label>

                          <Roles
                            parentRole={fields?.accessLevel}
                            setparentRole={data =>
                              setFields(prevState => ({
                                ...prevState,
                                accessLevel: data,
                              }))
                            }
                          />
                        </FormGroup>
                      </Col>

                      {user?.role !== "VENDOR" && showDriverAssign && (
                        <Col md={6}>
                          <FormGroup>
                            <Label>{props.t("driver")}</Label>

                            <Select
                              options={driversList}
                              onChange={onDriverSelect}
                              isMulti={true}
                              value={selectedDrivers}
                            />
                          </FormGroup>
                        </Col>
                      )}

                      {user?.role !== "VENDOR" && showCustomerAssign && (
                        <Col md={6}>
                          <FormGroup>
                            <Label>{props.t("customer")}</Label>

                            <Select
                              options={customersList}
                              onChange={onCustomerSelect}
                              isMulti={true}
                              value={selectedCustomers}
                            />
                          </FormGroup>
                        </Col>
                      )}

                      {user?.role !== "VENDOR" && showVendorAssign && (
                        <Col md={6}>
                          <FormGroup>
                            <Label>{props.t("vendor")}</Label>

                            <Select
                              options={vendorList}
                              onChange={onVendorSelect}
                              isMulti={true}
                              value={selectedVendors}
                            />
                          </FormGroup>
                        </Col>
                      )}
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
  subAdmins,
  Settings,
  roles,
}) => ({
  error: customers.error,
  loading: customers.loading,
  customer: customers.customer,
  onAddCustomer: PropTypes.func,
  uploadingFile: File.loading,
  countries: Login?.countries,
  user: Login?.user,
  driverlist: subAdmins?.driverList,
  customerList: subAdmins?.customerList,
  hideThings: Settings.settings.hideThings,
  vendorList: subAdmins?.vendorList,
  roles: roles.roles,
})

const mapDispatchToProps = dispatch => ({
  onGetCustomer: id => dispatch(getCustomer(id)),
  onAddCustomer: (data, history) => dispatch(addCustomer(data, history)),
  onPutCustomer: (customer, history) =>
    dispatch(putCustomer(customer, history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
  onRemoveFile: data => dispatch(removeFile(data)),
  ongetDriverDispatcherList: data => dispatch(getDriverDispatcherList(data)),
  ongetCustomerDispatcherList: data =>
    dispatch(getCustomerDispatcherList(data)),
  ongetVendorListSubAdmin: data => dispatch(getVendorListSubAdmin(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(EditCustomer))
)
