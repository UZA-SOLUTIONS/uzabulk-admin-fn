import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, Link, useParams } from "react-router-dom"
import { connect } from "react-redux"
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete"
import Select from "react-select"
import queryString from "query-string"
import FormButton from "components/Common/FormButtons"
import { SLUGS_NAME } from "helpers/contants"

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
} from "reactstrap"

import {
  addCustomerAddress,
  getCustomerAddress,
  putCustomerAddress,
} from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

const AddAddress = ({
  accessLevel,
  history,
  address,
  error,
  onAddCustomerAddress,
  onGetCustomerAddress,
  onPutCustomerAddress,
  loading,
  slug,
  ...props
}) => {
  const { id, addressId } = useParams()
  const { customer_name } = queryString.parse(props?.location?.search)

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    user: id,
    addressType: "home",
    address: "",
    houseNo: "",
    area: "",
    landmark: "",
    addressLocation: { lat: 0, lng: 0 },
  })
  const [accountType, setAccountType] = useState({
    label: "Home",
    value: "home",
  })
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
    setFields({
      _id: addressId,
      user: id,
      addressType: "home",
      address: "",
      houseNo: "",
      area: "",
      landmark: "",
      addressLocation: { lat: 0, lng: 0 },
    })

    if (addressId) {
      onGetCustomerAddress(addressId)
    }
  }, [id, addressId])

  useEffect(() => {
    if (addressId && address) {
      let coordinates = [0, 0]

      if (!!address.addressLocation) {
        coordinates = address.addressLocation.coordinates
      }

      setFields({
        _id: addressId,
        user: id,
        addressType: address.addressType,
        address: address.address,
        houseNo: address.houseNo,
        area: address.area,
        landmark: address.landmark,
        addressLocation: {
          lng: coordinates[0],
          lat: coordinates[1],
        },
      })

      if (address?.address) {
        setAddressValue({ label: address?.address })
      }

      if (address.addressType) {
        setAccountType({
          label:
            address.addressType.slice(0, 1).toUpperCase() +
            address.addressType.slice(1),
          value: address.addressType,
        })
      }
    }
  }, [JSON.stringify(address)])

  const handleChange = name => event => {

    // console.log('name1111', name)
    // var letters = /^[A-Za-z]+$/

    // if (name == "name" && event.value.match(letters)) {
    //   return true
    // } else {
    //   alert("not number")
    // }
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

    geocodeByPlaceId(data.value.place_id)
      .then(results => {
        const result = results[0]

        if (!result) return

        setFields(prevState => ({
          ...prevState,
          addressLocation: {
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
          },
        }))
      })
      .catch(error => console.error(error))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return

    if (addressId) {
      if (!accesses.canEdit) return
      onPutCustomerAddress(fields, history)
    } else {
      if (!accesses.canAdd) return
      onAddCustomerAddress(fields, history)
    }
  }

  const disableHouseNoValidation = SLUGS_NAME.lemonee === slug

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Customers"
            breadcrumbItem={
              (addressId ? props.t("Edit") : props.t("Add")) +
              " " +
              props.t("Address")
            }
            breadcrumbItems={[
              { title: props.t("customers"), link: "/customers" },
              {
                title: customer_name || props.t("profile"),
                link: `/customers/${id}/profile`,
              },
              {
                title:
                  (addressId ? props.t("edit") : props.t("add")) +
                  " " +
                  props.t("address"),
              },
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
                        <FormGroup className="ajax-select select2-container">
                          <Label>{props.t("address_type")}</Label>

                          <Select
                            value={accountType}
                            onChange={data => {
                              setAccountType(data)
                              handleChange("addressType")({ target: data })
                            }}
                            options={[
                              { label: props.t("home"), value: "home" },
                              { label: props.t("office"), value: "office" },
                              { label: props.t("other"), value: "other" },
                            ]}
                            classNamePrefix="select2-selection"
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
                              classNamePrefix: "select2-selection",
                              value: addressValue,
                              onChange: handleAddressChange,
                              placeholder: props.t("address_placeholder"),
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
                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-area-Input">
                            {props.t("area")}
                            <span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-area-Input"
                            value={fields.area || ""}
                            onChange={handleChange("area")}
                            required
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-landmark-Input">
                            {props.t("landmark")}
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-landmark-Input"
                            value={fields.landmark || ""}
                            onChange={handleChange("landmark")}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-houseNo-Input">
                            {props.t("house_no")}
                            {!disableHouseNoValidation && (
                              <span className="text-danger ml-1">*</span>
                            )}
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-houseNo-Input"
                            value={fields.houseNo || ""}
                            onChange={handleChange("houseNo")}
                            required={!disableHouseNoValidation}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormButton
                      needSubmit={
                        addressId ? accesses.canEdit : accesses.canAdd
                      }
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

AddAddress.propTypes = {
  t: PropTypes.any,
  loading: PropTypes.bool,
  error: PropTypes.string,
  address: PropTypes.object,
  onAddCustomerAddress: PropTypes.func,
  onGetCustomerAddress: PropTypes.func,
  onPutCustomerAddress: PropTypes.func,
}

const mapStateToProps = ({ Settings, customers }) => ({
  googleMapKey:
    process.env.NODE_ENV === "development"
      ? "AIzaSyAxlXaOet7nyJcEJQw_SXFuK2EnRMw0zbg"
      : Settings?.settings?.googleMapKey?.web,
  error: customers.error,
  loading: customers.loading,
  address: customers.address,
  slug: Settings?.settings?.slug,
})

const mapDispatchToProps = dispatch => ({
  onAddCustomerAddress: (data, history) =>
    dispatch(addCustomerAddress(data, history)),
  onGetCustomerAddress: id => dispatch(getCustomerAddress(id)),
  onPutCustomerAddress: (data, history) =>
    dispatch(putCustomerAddress(data, history)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddAddress))
)
