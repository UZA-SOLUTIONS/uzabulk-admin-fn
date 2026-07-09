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
  addBlogCategory,
  getblogCategory,
  putBlogCategory,
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
    slug: "",
    status: "active",
  })

  let data = {
    limit: 24,
    orderBy: "date_created_utc",
    sortOrder: -1,
    paged: 1,
    fieldName: "",
    fieldValue: "",
    search: "",
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
        slug: customer.slug || "",
        status: customer.status || "active",
      })

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

  /* Handle Input onChange */
  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  /* Handle Form Submit */
  const onSubmit = event => {
    event.preventDefault()

    if (id) {
      if (!accesses.canEdit) return
      onPutCustomer(
        {
          ...fields,
          accessLevel: fields?.accessLevel?.value,
        },
        history
      )
    } else {
      if (!accesses.canAdd) return
      onAddCustomer(
        {
          ...fields,
        },
        history
      )
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Customers"
            breadcrumbItem={
              (id ? props.t("edit") : props.t("add")) +
              " " +
              props.t("blog_category")
            }
            breadcrumbItems={[
              {
                title: props.t("blog_category"),
                link: "/blog-category",
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
                          <Label for="formrow-address-Input">
                            {props.t("Slug")}
                            <span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-address-Input"
                            value={fields?.slug || ""}
                            onChange={handleChange("slug")}
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
  BlogCategory,
  subAdmins,
  Settings,
  roles,
}) => ({
  error: BlogCategory.error,
  loading: BlogCategory.loading,
  customer: BlogCategory?.blogCategory,
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
  onGetCustomer: id => dispatch(getblogCategory(id)),
  onAddCustomer: (data, history) => dispatch(addBlogCategory(data, history)),
  onPutCustomer: (customer, history) =>
    dispatch(putBlogCategory(customer, history)),
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
