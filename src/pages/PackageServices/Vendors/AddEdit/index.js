import React, { Fragment, useRef, useCallback, useEffect } from "react"
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
import worldCountries from "world-countries"
import {
  addPackageServiceVendor,
  getPackageServiceVendor,
  putPackageServiceVendor,
} from "store/PackageServices/Vendors/actions"

import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete"
import Select from "react-select"
import toastr from "toastr"
import { getPackageServiceVendorList } from "helpers/backend_helper"

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

function AddEditForm({
  error,
  loading,
  history,
  PackageServiceVendor,
  addPackageServiceVendor,
  getPackageServiceVendor,
  putPackageServiceVendor,
  ...props
}) {
  const { id } = useParams()
  const { packageServiceVendor } = PackageServiceVendor
  const initialValues =
    id && id === packageServiceVendor?._id
      ? {
          name: packageServiceVendor?.name,
          countryCode: {
            label: packageServiceVendor?.countryCode,
          },
          mobileNumber: packageServiceVendor?.mobileNumber,
          email: packageServiceVendor?.email,
          address: packageServiceVendor?.address,
          lat: packageServiceVendor?.userLocation?.coordinates?.[0],
          lng: packageServiceVendor?.userLocation?.coordinates?.[1],
          status: packageServiceVendor?.status === "active",
        }
      : {
          name: "",
          countryCode: {
            label: "",
          },
          mobileNumber: undefined,
          email: "",
          address: "",
          lat: "",
          lng: "",
          status: true,
        }


        
  const onCreate = useCallback(values => {
    console.log("Create", values)

    function onSuccess(payload) {
      console.log("Success payload", payload)

      history.push("/package-services/vendors")
      toastr.success("Vendor created successfully")
    }
    function onFail(payload) {
      console.log("Error payload", payload)
      toastr.error(payload?.error?.response?.message ?? "Error occured")
    }
    function onEnd(payload) {
      console.log("Final payload", payload)
    }

    addPackageServiceVendor({
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
      toastr.success("Vendor updated successfully")
    }
    function onFail(payload) {
      console.log("Error payload", payload)
      toastr.error(payload?.error?.response?.message ?? "Error occured")
    }
    function onEnd(payload) {
      console.log("Final payload", payload)
    }

    putPackageServiceVendor({
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

    getPackageServiceVendor({
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
    if(id){
      onGet({ id })
    }
  }, [])

  function onSubmit(values) {
    const data = {
      name: values.name,
      countryCode: values.countryCode?.label,
      mobileNumber: values.mobileNumber,
      email: values.email,
      location: {
        lat: values.lat,
        lng: values.lng,
      },
      address: values.address,
      status: values.status ? "active" : "inactive",
    }
    if (id) {
      data._id = id
      onUpdate(data)
    } else {
      onCreate(data)
    }
  }

  console.log("PPPPAK ", PackageServiceVendor)
  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItems={[
            {
              title: props.t("package_vendors"),
              link: `/package-services/vendors`,
            },
            {
              title: id ? props.t("edit") : props.t("add"),
              link: `/package-services/vendors/add`,
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

            const handleAddress = address => {
              setFieldValue("address", address?.label)
              if (address?.label && typeof address?.label === "string") {
                geocodeByAddress(address?.label)
                  .then(results => getLatLng(results[0]))
                  .then(({ lat, lng }) => {
                    setFieldValue("lat", lat)
                    setFieldValue("lng", lng)
                  })
              }
            }

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
                            {props.t("name")}
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
                              <FormFeedback invalid className="d-block">
                                {errors.name}
                              </FormFeedback>
                            )}
                          </InputGroup>
                        </Col>
                        <Col lg="4" className="my-2">
                          <label htmlFor="" className="form-label2 m-0">
                            {props.t("mobile")}
                          </label>
                          <InputGroup>
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
                                  onChange={val =>
                                    setFieldValue("countryCode", val)
                                  }
                                  value={values.countryCode}
                                />
                              </Col>

                              <Col sm={7} md={8} lg={7} xl={8}>
                                <Input
                                  type="text"
                                  name="mobileNumber"
                                  placeholder=""
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.mobileNumber}
                                />
                              </Col>
                            </Row>
                            {((errors.countryCode?.label &&
                              touched.countryCode?.label) ||
                              (errors.mobileNumber &&
                                touched.mobileNumber)) && (
                              <FormFeedback invalid className="d-block">
                                {errors.countryCode?.label ||
                                  errors.mobileNumber}
                              </FormFeedback>
                            )}
                          </InputGroup>
                        </Col>
                        <Col lg="4" className="my-2">
                          <label htmlFor="" className="form-label2 m-0">
                            {props.t("email")}
                          </label>
                          <InputGroup>
                            <Input
                              type="text"
                              name="email"
                              placeholder=""
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            {errors.email && touched.email && (
                              <FormFeedback invalid className="d-block">
                                {errors.email}
                              </FormFeedback>
                            )}
                          </InputGroup>
                        </Col>
                        <Col md={8}>
                          <FormGroup className="ajax-select select2-container">
                            <Label>{props.t("address")}</Label>

                            <GooglePlacesAutocomplete
                              apiKey={props?.googleMapKey}
                              selectProps={{
                                isClearable: true,
                                inputId: "address-select",
                                classNamePrefix: "select2-selection",
                                onChange: handleAddress,
                                placeholder:
                                  values.address ||
                                  props.t("address_placeholder"),
                                components: {
                                  IndicatorSeparator: false,
                                  DropdownIndicator: false,
                                },
                              }}
                            />
                          </FormGroup>
                          {errors.address && touched.address && (
                            <FormFeedback invalid className="d-block">
                              {errors.address}
                            </FormFeedback>
                          )}
                        </Col>{" "}
                        <Col md={4}>
                          <FormGroup>
                            <Label>{props.t("status")}</Label>

                            <div className="status-switch square-switch">
                              <input
                                type="checkbox"
                                id="square-switch1"
                                switch="none"
                                checked={values.status}
                                onChange={e => {
                                  setFieldValue("status", !values.status)
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
                        <Col xs="12">
                          <FormButton
                            needSubmit={true}
                            goBack={() => history.push("/package-services/vendors")}
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

const mapStateToProps = ({ Login, PackageServiceVendor,Settings }) => ({
  googleMapKey:
    process.env.NODE_ENV === "development"
      ? "AIzaSyAxlXaOet7nyJcEJQw_SXFuK2EnRMw0zbg"
      : Settings?.settings?.googleMapKey?.web,
  countries: Login?.countries,
  PackageServiceVendor,
})

const mapDispatchToProps = {
  addPackageServiceVendor,
  getPackageServiceVendor,
  putPackageServiceVendor,
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddEditForm))
)
