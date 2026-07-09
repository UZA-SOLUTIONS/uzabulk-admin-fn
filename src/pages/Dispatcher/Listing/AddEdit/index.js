import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams, Link } from "react-router-dom"
import { connect } from "react-redux"
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  geocodeByLatLng,
} from "react-google-places-autocomplete"
import { components } from "react-select"
import FormButton from "components/Common/FormButtons"
import Select from "react-select"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Alert,
  Spinner,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap"

import {
  postDispatchRequest,
  uploadFile,
  removeFile,
  getDispatchFare,
} from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

// Components
import StoreTypes from "./StoreTypes"
import Users from "./Users"
import VehicleType from "./VehicleType"
import Addresses from "./Addresses"
import Vendors from "./Vendors"
import Items from "./Items"
import PickUpDetails from "./PickUpDetails"
import DropUpDetails from "./DropUpDetails"
import PickupItem from "./PickupItem"
import { SLUGS_NAME } from "helpers/contants"
import OneWay from "./JourneyType/OneWay"
import ByHour from "./JourneyType/ByHour"
import { useShowThings } from "helpers/show-things"

const DispatchRequest = ({
  accessLevel,
  history,
  error,
  onPostDispatchRequest,
  onUploadFile,
  onRemoveFile,
  loading,
  activeStoreId,
  activeStoreType,
  uploadingFile,
  onGetDispatchFare,
  ...props
}) => {
  const { id } = useParams()
  const showThings = useShowThings()

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })

  const JOURNEY_TYPE = [
    // { label: "Schedule", value: "oneway" },
    { label: "Ride Now", value: "instant" },
  ]

  if (showThings["showHideHourly"]) {
    JOURNEY_TYPE.push({ label: "Hourly", value: "hourly" })
  }
  const [storeType, setstoreType] = useState()
  const [user, setuser] = useState()
  const [vehicleType, setvehicleType] = useState()
  // const [pickupdetails, setpickupdetails] = useState({
  //   name: '',
  //   mobileNumber: '',
  //   floorNo: '',
  //   landmark: ''
  // })
  const [dropupdetails, setdropupdetails] = useState({
    name: "",
    mobileNumber: "",
    floorNo: "",
    landmark: "",
  })
  const [address, setaddress] = useState()
  const [selectedPayment, setSelectedPayment] = useState({
    label: "Cash On Delivery",
    value: "cod",
  })
  const [vendor, setvendor] = useState()
  const [items, setitems] = useState([
    {
      itemId: "",
      quantity: 1,
      addons: [],
    },
  ])
  const [fields, setFields] = useState({
    storeTypeId: "",
    user: "",
    paymentMethod: "cod",
    deliveryFee: "20",
    deliveryType: "",
    line_items: [],
    multiStops: [],
    scheduledType: "scheduled",
    rideType: undefined,
    scheduledTime: "",
    scheduledDate: "",
  })
  const [addressValue, setAddressValue] = useState({})

  const [pickupitem, setPickupItem] = useState([
    {
      name: "",
      quantity: 1,
    },
  ])

  function calculateFare() {
    if (
      fields.pickUp?.address &&
      (fields?.journeyType == "hourly" || fields.dropOff?.address) &&
      fields.vehicleType

      // && fields.scheduledDate &&
      // fields.scheduledTime &&
      // fields?.journeyType !== "hourly"
    ) {
      onGetDispatchFare({
        storeTypeId: fields.storeTypeId,
        vehicleType: fields.vehicleType,
        pickUp: fields.pickUp,
        dropOff: fields.dropOff,
        ...fields,
      })
    }
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

  useEffect(() => {
    setFields({ ...fields, storeTypeId: activeStoreId })
  }, [activeStoreId])

  useEffect(() => {
    let type =
      props.currentPlan?.billingPlan?.type === "basic"
        ? "singleVendor"
        : "multiVendor"

    if (props.currentPlan?.billingPlan?.type === "basic") {
      setFields(prevState => {
        let state = {
          ...prevState,
          type,
          // storeTypeId: props.settings?.storeTypeEnabled[0]?._id,
          // activeStoreType: props.settings?.storeTypeEnabled[0],
        }
        ;(state.storeTypeId = props?.settings?.storeTypeEnabled[0]?._id),
          (state.activeStoreType =
            props?.settings?.storeTypeEnabled[0]?.storeType.toUpperCase())

        if (
          props.settings?.storeTypeEnabled[0] &&
          ["TAXI", "PICKUPDROP", "SERVICEPROVIDER"].includes(
            props.settings.storeTypeEnabled[0]?.storeType.toUpperCase()
          )
        ) {
          state.vendor = props?.settings.storeTypeEnabled[0]?.singleVendorId
        }
        if (props?.settings?.slug == "topup-fuel") {
          state.vendor = props?.settings.storeTypeEnabled[0]?.singleVendorId
        }
        return state
      })
    } else if (props.currentPlan?.billingPlan?.type === "premium") {
      setFields(prevState => ({
        ...prevState,
        type,
        storeTypeId: props.settings?.storeTypeEnabled[0]?._id,
        activeStoreType:
          props.settings?.storeTypeEnabled[0]?.storeType.toUpperCase(),
      }))
    } else {
      setFields(prevState => ({ ...prevState, type }))
    }
  }, [props.currentPlan, props.settings])

  useEffect(() => {
    if (
      ["TAXI", "PICKUPDROP"].includes(fields.activeStoreType?.toUpperCase())
    ) {
      calculateFare()
    }
  }, [
    fields.pickUp,
    fields.dropOff,
    fields.vehicleType,
    fields.scheduledTime,
    fields.scheduledDate,
  ])

  useEffect(() => {
    if (fields?.scheduledType == "now" && fields?.dropOff && fields?.pickUp) {
      onGetDispatchFare({
        storeTypeId: fields.storeTypeId,
        vehicleType: fields.vehicleType,
        pickUp: fields.pickUp,
        dropOff: fields.dropOff,

        ...fields,
        journeyType: "oneway",
      })
    }
  }, [fields?.scheduledType])

  useEffect(() => {
    if (props.fare) {
      setFields(prevState => ({
        ...prevState,
        distance: props.fare.distance,
        estimatedCost: props.fare.estimatedCost,
        estimatedTime: props.fare.estimatedTime,
      }))
    }
  }, [props.fare])

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const handleAddressChange = name => data => {
    setAddressValue(prevState => ({ ...prevState, [name]: data }))

    /* setFields(prevState => ({
      ...prevState,
      [name]: { ...prevState[name], address: data?.label || "" },
    })) */

    if (!data?.value?.place_id) {
      return setFields(prevState => ({
        ...prevState,
        address: data?.label || "",
        location: null,
      }))
    }

    geocodeByPlaceId(data?.value?.place_id)
      .then(results => {
        const result = results[0]

        if (!result) return

        setFields(prevState => ({
          ...prevState,
          [name]: {
            ...prevState[name],
            address: data?.label || "",
            location: {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
            },
          },
        }))
      })
      .catch(error => console.error(error))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading || uploadingFile) return
    // if (!activeStoreType?.storeType?.toLowerCase()) return

    const callback = () => {
      history.goBack()
    }

    // if(fields?.journeyType == "hourly"){
    //   fields.dropOff = null
    // }

    if (!accesses.canAdd) return
    let state = { ...fields }

    if (state?.journeyType == "hourly") {
      state.dropOff = null
    }

    if (state?.journeyType == "instant") {
      state.journeyType = "oneway"
    }
    console.log("poketn 1", state)
    console.log("poketn 2", items)
    let data = { ...state, items }

    if (selectedPayment) {
      data.paymentMethod = selectedPayment.value
    }

    if (
      !["TAXI", "PICKUPDROP"].includes(fields.activeStoreType?.toUpperCase())
    ) {
      data.deliveryType = "DELIVERY"
    }

    console.log("bugga ", data)

    onPostDispatchRequest(data, callback)
  }

  const addNewItem = event => {
    event.preventDefault()

    setitems(prevState => [
      ...prevState,
      {
        itemId: "",
        quantity: 1,
        addons: [],
      },
    ])
  }

  const addNewPickUpItem = event => {
    event.preventDefault()
    setPickupItem(preState => [
      ...preState,
      {
        name: "",
        quantity: 1,
      },
    ])
  }
  function removeItem(e, index) {
    e.preventDefault()

    setitems(prevState => [
      ...prevState.slice(0, index),
      ...prevState.slice(index + 1),
    ])
  }

  function removePickUpItem(e, index) {
    e.preventDefault()
    setPickupItem(pre => [...pre.slice(0, index), ...pre.slice(index + 1)])
  }

  const handleProductChange = index => data => {
    setitems(prevState => [
      ...prevState.slice(0, index),
      data,
      ...prevState.slice(index + 1),
    ])
  }

  const handlePickupItemDetails = data => id => e => {
    console.log(id, "id")
    e.preventDefault()
    setFields(pre => ({
      ...pre,
      line_items: [
        ...pre?.line_items?.slice(0, id),
        { ...pre?.line_items[id], [data]: e.target.value },
        ...pre?.line_items?.slice(id + 1),
      ],
    }))
  }
  // console.log(props.settings.slug =="topup-fuel", "SLUg");
  console.log(fields, "dffwsr")

  const paymentTypes = [
    { label: "Cash On Delivery", value: "cod" },
    { label: "Wallet", value: "wallet" },
  ]

  const handlePayment = data => {
    setSelectedPayment(data)
  }

  const journeyTypeHandler = data => {
    console.log(data, "JOURNEY")
    // setJourneyType(data.value)

    var rideType = undefined
    if (["TAXI"].includes(fields.activeStoreType?.toUpperCase())) {
      if (data.value === "hourly") {
        rideType = "hourly"
      } else {
        rideType = "normal"
      }
    }

    setFields(prev => ({
      ...prev,
      journeyType: data.value,
      scheduledType: data.value == "instant" ? "now" : "scheduled",
      rideType,
    }))
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={
              (id ? props.t("edit") : props.t("add")) + " " + props.t("driver")
            }
            breadcrumbItems={[
              {
                title: props.t("dispatch"),
                link: `/dispatcher/listing`,
              },
              ...(id
                ? [
                    {
                      title: props.t("Profile"),
                      link: `/dispatcher/listing/${id}/profile`,
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
                    {/* {error && typeof error === "string" ? (
                      <Alert color="danger">{error}</Alert>
                    ) : null} */}

                    <Row>
                      {props.currentPlan?.billingPlan?.type === "ultimate" && (
                        <Col md={6}>
                          <FormGroup>
                            <Label>{props.t("store")}</Label>

                            <StoreTypes
                              parentStoreType={storeType}
                              setparentStoreType={data => {
                                setFields(prevState => ({
                                  ...prevState,
                                  activeStoreType: data?.label,
                                  storeTypeId: data?.value,
                                }))
                                setstoreType(data)
                              }}
                            />
                          </FormGroup>
                        </Col>
                      )}
                      {props.currentPlan.billingPlan?.type !== "ultimate" && (
                        <Col md={6}>
                          <FormGroup>
                            <Label>{props.t("store")}<span className="text-danger ml-1">*</span></Label>

                            <Input
                              type="text"
                              className="form-control"
                              id="formrow-firstname-Input"
                              value={
                                props.settings.slug == "topup-fuel"
                                  ? "FUEL"
                                  : fields?.activeStoreType || ""
                              }
                              required
                            />
                          </FormGroup>
                        </Col>
                      )}

                      {["TAXI", "PICKUPDROP"].includes(
                        fields?.activeStoreType?.toUpperCase()
                      ) && (
                        <Col md={6}>
                          <FormGroup>
                            <Label>{props.t("journey_type")}</Label>
                            <Select
                              options={JOURNEY_TYPE}
                              classNamePrefix="parent-selection"
                              onChange={journeyTypeHandler}
                            />
                          </FormGroup>
                        </Col>
                      )}

                      <>
                        {fields?.journeyType == "oneway" && (
                          <Col md={12}>
                            <FormGroup>
                              <OneWay
                                t={props.t}
                                fields={fields}
                                googleMapKey={props.googleMapKey}
                                setFields={setFields}
                                calculateFare={calculateFare}
                              />
                            </FormGroup>
                          </Col>
                        )}

                        {fields?.journeyType == "hourly" && (
                          <Col md={12}>
                            <FormGroup>
                              <ByHour
                                t={props.t}
                                setFields={setFields}
                                duration={props?.duration}
                              />
                            </FormGroup>
                          </Col>
                        )}
                      </>

                      <Col md={6}>
                        <FormGroup>
                          <div className="d-flex justify-content-between">
                            <Label>{props.t("user")}</Label>

                            <div className="text-right">
                              <Link to="/customers/add">
                                {props.t("add_new")}
                              </Link>
                            </div>
                          </div>

                          <Users
                            parent={user}
                            setparent={data => {
                              setFields(prevState => ({
                                ...prevState,
                                user: data?.value,
                                userName: data?.label,
                              }))
                              setuser(data)
                            }}
                          />
                        </FormGroup>
                      </Col>

                      {["TAXI", "PICKUPDROP"].includes(
                        fields?.activeStoreType?.toUpperCase()
                      ) && (
                        <Col md={6}>
                          <FormGroup>
                            <Label>{props.t("vehicle")}</Label>

                            <VehicleType
                              activeStoreId={fields.storeTypeId}
                              activeStoreType={fields.activeStoreType}
                              parentFdVehicle={vehicleType}
                              setparentFdVehicle={data => {
                                setFields(prevState => ({
                                  ...prevState,
                                  vehicleType: data?.value,
                                }))

                                setvehicleType(data)
                              }}
                            />
                          </FormGroup>
                        </Col>
                      )}

                      {["TAXI", "PICKUPDROP"].includes(
                        fields?.activeStoreType?.toUpperCase()
                      ) && (
                        <Col md={6}>
                          <FormGroup>
                            <Label>{props.t("pickup_location")}</Label>

                            <GooglePlacesAutocomplete
                              apiKey={props?.googleMapKey}
                              selectProps={{
                                className: "w-100",
                                classNamePrefix: "select2-selection",
                                placeholder: fields.pickUp?.address,
                                value: addressValue?.pickUp,
                                onChange: handleAddressChange("pickUp"),
                                components: {
                                  IndicatorSeparator: false,
                                  DropdownIndicator: props => (
                                    <components.DropdownIndicator {...props}>
                                      <span className="px-1" id="">
                                        <i
                                          className="fa fa-search"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                    </components.DropdownIndicator>
                                  ),
                                },
                                noOptionsMessage: () => "No address found",
                              }}
                            />
                          </FormGroup>
                        </Col>
                      )}
                      {["PICKUPDROP"].includes(
                        fields?.activeStoreType?.toUpperCase()
                      ) && (
                        <Col md={12}>
                          <FormGroup>
                            <PickUpDetails
                              t={props.t}
                              setFields={setFields}
                              fields={fields}
                              slug={props?.settings?.slug}
                            />
                          </FormGroup>
                        </Col>
                      )}

                      {["TAXI", "PICKUPDROP"].includes(
                        fields?.activeStoreType?.toUpperCase()
                      ) &&
                        fields?.journeyType !== "hourly" && (
                          <Col md={6}>
                            <FormGroup>
                              <Label>{props.t("dropoff_location")}</Label>

                              <GooglePlacesAutocomplete
                                apiKey={props?.googleMapKey}
                                selectProps={{
                                  className: "w-100",
                                  classNamePrefix: "select2-selection",
                                  placeholder: fields.dropOff?.address,
                                  value: addressValue?.dropOff,
                                  onChange: handleAddressChange("dropOff"),
                                  components: {
                                    IndicatorSeparator: false,
                                    DropdownIndicator: props => (
                                      <components.DropdownIndicator {...props}>
                                        <span className="px-1" id="">
                                          <i
                                            className="fa fa-search"
                                            aria-hidden="true"
                                          ></i>
                                        </span>
                                      </components.DropdownIndicator>
                                    ),
                                  },
                                  noOptionsMessage: () => "No address found",
                                }}
                              />
                            </FormGroup>
                          </Col>
                        )}

                      {["PICKUPDROP"].includes(
                        fields?.activeStoreType?.toUpperCase()
                      ) && (
                        <Col md={12}>
                          <FormGroup>
                            <DropUpDetails
                              t={props.t}
                              setFields={setFields}
                              fields={fields}
                              slug={props?.settings?.slug}
                            />
                          </FormGroup>
                        </Col>
                      )}

                      {["PICKUPDROP"].includes(
                        fields?.activeStoreType?.toUpperCase()
                      ) && (
                        <Col md={12}>
                          <FormGroup>
                            {pickupitem.map((pic, index) => (
                              <PickupItem
                                t={props.t}
                                setFields={setFields}
                                fields={fields}
                                buttoncolor={
                                  pickupitem.length === 1
                                    ? "secondary"
                                    : "danger"
                                }
                                id={index}
                                removePickUpItem={e => {
                                  e.preventDefault()

                                  pickupitem.length > 1 &&
                                    removePickUpItem(e, index)
                                }}
                                handlePickupItemDetails={
                                  handlePickupItemDetails
                                }
                                // handlePickupItemDetails={e => {
                                //   e.preventDefault()

                                //   handlePickupItemDetails}
                                // }
                              />
                            ))}
                          </FormGroup>
                          <Button
                            className="mb-2"
                            onClick={addNewPickUpItem}
                            color="success"
                          >
                            Add More
                          </Button>
                        </Col>
                      )}

                      {["TAXI", "PICKUPDROP"].includes(
                        fields?.activeStoreType?.toUpperCase()
                      ) &&
                        props.fare && (
                          <>
                            <Col md={6}>
                              <FormGroup>
                                <Label>{props.t("distance")}</Label>

                                <InputGroup>
                                  <Input value={fields.distance} readOnly />

                                  <div className="input-group-append">
                                    <span className="input-group-text">
                                      {props.settings?.distanceUnit}
                                    </span>
                                  </div>
                                </InputGroup>
                              </FormGroup>
                            </Col>

                            <Col md={6}>
                              <FormGroup>
                                <Label>{props.t("estimated_cost")}</Label>

                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      {props.settings?.currency?.sign || "$"}
                                    </InputGroupText>
                                  </InputGroupAddon>

                                  <Input
                                    type="number"
                                    value={fields.estimatedCost}
                                    onChange={handleChange("estimatedCost")}
                                    step={0.01}
                                  />
                                </InputGroup>
                              </FormGroup>
                            </Col>

                            <Col md={6}>
                              <FormGroup>
                                <Label>{props.t("estimated_time")}</Label>

                                <InputGroup>
                                  <Input
                                    value={fields.estimatedTime}
                                    readOnly
                                  />

                                  <div className="input-group-append">
                                    <span className="input-group-text">
                                      {props.t("minutes")}
                                    </span>
                                  </div>
                                </InputGroup>
                              </FormGroup>
                            </Col>
                          </>
                        )}

                      {!["TAXI", "PICKUPDROP"].includes(
                        fields?.activeStoreType?.toUpperCase()
                      ) && (
                        <Col md={6}>
                          <FormGroup>
                            <div className="d-flex justify-content-between">
                              <Label>{props.t("address")}</Label>
                              {fields?.user && (
                                <div className="text-right">
                                  <Link
                                    to={`/customers/${fields?.user}/address?customer_name=${fields?.userName}`}
                                  >
                                    {props.t("add_new")}
                                  </Link>
                                </div>
                              )}
                            </div>
                            <Addresses
                              customerId={fields.user}
                              parent={address}
                              setparent={data => {
                                setFields(prevState => ({
                                  ...prevState,
                                  addressId: data?.value,
                                }))

                                setaddress(data)
                              }}
                            />
                          </FormGroup>
                        </Col>
                      )}

                      {props.currentPlan?.billingPlan?.type !== "basic" &&
                        !["TAXI", "PICKUPDROP", "SERVICEPROVIDER"].includes(
                          fields?.activeStoreType?.toUpperCase()
                        ) && (
                          <Col md={6}>
                            <FormGroup>
                              <Label>
                                {props?.settings?.slug == SLUGS_NAME.lemonee ||
                                ["LIQUOR"].includes(activeStoreType?.storeType)
                                  ? props.t("store")
                                  : props.t("vendor")}
                              </Label>

                              <Vendors
                                t={props.t}
                                activeStoreId={fields.storeTypeId}
                                activeStoreType={fields.activeStoreType}
                                fields={fields}
                                parent={vendor}
                                setparent={data => {
                                  setFields(prevState => ({
                                    ...prevState,
                                    vendor: data?.value,
                                  }))
                                  setvendor(data)
                                }}
                              />
                            </FormGroup>
                          </Col>
                        )}

                      <Col md={6} className="mt-3">
                        <FormGroup>
                          <Label>{props.t("payment_type")}</Label>

                          <Select
                            options={paymentTypes}
                            value={selectedPayment}
                            onChange={handlePayment}
                          />
                        </FormGroup>
                      </Col>

                      {!["TAXI", "PICKUPDROP"].includes(
                        fields?.activeStoreType?.toUpperCase()
                      ) && (
                        <Col md={12}>
                          {console.log("BINGI ", items)}
                          {items.map((item, index) => (
                            <Items
                              key={index}
                              activeStoreId={fields.storeTypeId}
                              activeStoreType={fields.activeStoreType}
                              vendorId={fields.vendor}
                              fields={fields}
                              removeButtonColor={
                                items?.length === 1 ? "secondary" : "danger"
                              }
                              removeItem={e => {
                                e.preventDefault()

                                items?.length > 1 && removeItem(e, index)
                              }}
                              parent={item}
                              setparent={handleProductChange(index)}
                            />
                          ))}

                          <Button onClick={addNewItem} color="success">
                            {props.t("add_more")}
                          </Button>
                        </Col>
                      )}
                    </Row>

                    <FormButton
                      needSubmit={id ? accesses.canEdit : accesses.canAdd}
                      submitDisabled={
                        uploadingFile ||
                        loading ||
                        (["TAXI", "PICKUPDROP"].includes(
                          fields.activeStoreType?.toUpperCase()
                        ) &&
                          !(
                            fields.pickUp?.address &&
                            (fields?.journeyType == "hourly" ||
                              fields.dropOff?.address) &&
                            fields.vehicleType
                          ))
                      }
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

DispatchRequest.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  onPostDispatchRequest: PropTypes.func,
  onUploadFile: PropTypes.func,
  onRemoveFile: PropTypes.func,
}

const mapStateToProps = ({
  Billing,
  File,
  Settings,
  Dispatch,
  FD_Settings,
}) => ({
  currentPlan: Billing.currentPlan,
  settings: Settings.settings,
  googleMapKey:
    process.env.NODE_ENV === "development"
      ? "AIzaSyAxlXaOet7nyJcEJQw_SXFuK2EnRMw0zbg"
      : Settings?.settings?.googleMapKey?.web,
  error: Dispatch.error,
  loading: Dispatch.loading,
  fare: Dispatch.fare,
  uploadingFile: File.loading,
  duration: FD_Settings.settings?.hourlyTripSettings?.duration,
})

const mapDispatchToProps = dispatch => ({
  onPostDispatchRequest: (data, callback) =>
    dispatch(postDispatchRequest(data, callback)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
  onRemoveFile: data => dispatch(removeFile(data)),
  onGetDispatchFare: (data, callback) =>
    dispatch(getDispatchFare(data, callback)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(DispatchRequest))
)
