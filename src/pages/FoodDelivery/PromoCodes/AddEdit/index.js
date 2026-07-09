import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect } from "react-redux"
import moment from "moment"
import Select from "react-select"
import FormButton from "components/Common/FormButtons"
import classNames from "classnames"

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
  InputGroup,
  Alert,
  Spinner,
} from "reactstrap"
import queryString from "query-string"

// Translation
import { withTranslation } from "react-i18next"

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

import {
  ADMIN_SUB_SERVICES_ROUTE,
  GET_SERVICE_NAME,
  ROLES,
  RESTRICT_AREA,
} from "helpers/contants"

import { addPromoCode, getPromoCode, putPromoCode } from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"
import StoreTypes from "./StoreTypes"
import Geofence from "./Geofence"

const AddPromoCode = ({
  accessLevel,
  role,
  vendorId,
  history,
  error,
  onAddPromoCode,
  onGetPromoCode,
  onPutPromoCode,
  promoCode,
  loading,
  activeStoreId,
  activeStoreType,
  isGloble,
  ...props
}) => {
  const { id, vendorId: _vendorIdParam } = useParams()
  const { vendor_name } = queryString.parse(props?.location?.search)

  const didMountRef = useRef(null)

  const [storeType, setstoreType] = useState()
  const [geoFence, setgeoFence] = useState()
  const [vendorIdParam, setvendorIdPara] = useState()
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    storeTypeId: "",
    _id: "",
    code: "",
    discount_type: "flat",
    amount: 0,
    description: "",
    start_date: moment(),
    date_expires: moment(),
    type: isGloble ? "global" : "vendor",
    restrictArea: "none",
    geoFence: [],
    status: "active",
  })
  const [selectedRestrictArea, setselectedRestrictArea] = useState({
    label: "none",
    value: "none",
  })

  console.log("fields12312", fields)

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
    let vendor = ""

    switch (role) {
      case ROLES.admin:
      case ROLES.staff:
        vendor =
          activeStoreType?.storeVendorType === "SINGLE"
            ? activeStoreType?.singleVendorId
            : _vendorIdParam
        break

      case ROLES.vendor:
        vendor = vendorId
        break
      case ROLES.subVendor:
        vendor = vendorId
        break

      default:
        break
    }

    if (
      ADMIN_SUB_SERVICES_ROUTE.promoCode2?.onlyForStore.includes(
        activeStoreType.storeType
      )
    ) {
      setFields({ ...fields, storeTypeId: activeStoreId })
    } else {
      if (vendor) {
        setFields({ ...fields, storeTypeId: activeStoreId, vendor })
      }
    }

    setvendorIdPara(vendor)
  }, [activeStoreId, role, vendorId, _vendorIdParam])

  useEffect(() => {
    if (id) {
      onGetPromoCode(id)
    }
  }, [id])

  useEffect(() => {
    if (props.currentPlan?.billingPlan?.type === "basic") {
      setFields(prevState => ({
        ...prevState,
        storeTypeId: props.settings?.storeTypeEnabled[0]?._id,
      }))
    } else if (props.currentPlan?.billingPlan?.type === "premium") {
      setFields(prevState => ({
        ...prevState,
        storeTypeId: props.settings?.storeTypeEnabled[0]?._id,
      }))
    }
  }, [props.currentPlan, props.settings])

  useEffect(() => {
    if (didMountRef.current) {
      if (!!promoCode) {
        setFields(prevState => ({
          ...prevState,
          _id: promoCode._id,
          code: promoCode.code || "",
          discount_type: promoCode.discount_type || "flat",
          amount: promoCode.amount || 0,
          description: promoCode.description || "",
          start_date: promoCode.start_date || moment(),
          date_expires: promoCode.date_expires || moment(),
          type: isGloble ? "global" : "vendor",
          storeTypeId: promoCode.storeType?._id,
          restrictArea: promoCode.restrictArea || "none",
          geoFence: promoCode.geoFence?.map(item => item._id) || [],
          status: promoCode.status || "active",
        }))

        if (promoCode.restrictArea) {
          switch (promoCode.restrictArea) {
            case "radius":
              setselectedRestrictArea({ label: "geofence", value: "radius" })
              break

            default:
              setselectedRestrictArea({ label: "none", value: "none" })
              break
          }
        }

        if (promoCode.storeType) {
          let ssFilter = props?.settings?.storeTypeEnabled?.filter(
            store => store._id === promoCode.storeType?._id
          )

          if (ssFilter?.length > 0) {
            setstoreType({
              label: ssFilter[0]?.storeType,
              value: ssFilter[0]?._id,
            })
          }
        }

        if (promoCode.geoFence) {
          setgeoFence(
            promoCode.geoFence?.map(item => ({
              label: item.label,
              value: item._id,
            }))
          )
        }
      }
    } else didMountRef.current = true
  }, [JSON.stringify(promoCode)])

  const handleChange = name => event => {
    console.log("fields", fields)
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  console.log("fields", fields.date_expires)

  useEffect(() => {
    const date = new Date()
    const result2 = moment(date).add(1, "days")
    setFields(pre => ({
      ...pre,
      date_expires: moment(result2),
    }))
  }, [])

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return

    if (id) {
      if (!accesses.canEdit) return
      onPutPromoCode(
        {
          ...fields,
          start_date: moment.utc(moment(fields.start_date)),
          date_expires: moment.utc(moment(fields.date_expires)),
        },
        history
      )
    } else {
      if (!accesses.canAdd) return
      onAddPromoCode(
        {
          ...fields,
          start_date: moment.utc(moment(fields.start_date)),
          date_expires: moment.utc(moment(fields.date_expires)),
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
            title="Promo Codes"
            breadcrumbItem="Add Promo Code"
            breadcrumbItems={[
              ...(isGloble
                ? [
                    {
                      title: props.t("promo_codes"),
                      link: `/promo-codes${props?.location?.search}`,
                    },
                  ]
                : activeStoreType?.storeVendorType !== "SINGLE" &&
                  role !== ROLES.vendor &&
                  role !== ROLES.subVendor &&
                  !ADMIN_SUB_SERVICES_ROUTE.promoCode2?.onlyForStore.includes(
                    activeStoreType.storeType
                  )
                ? [
                    {
                      title:
                        GET_SERVICE_NAME({
                          storeType: activeStoreType?.storeType,
                        }) + "s",
                      link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                        {
                          storeType: activeStoreType?.storeType,
                        }
                      ).toLowerCase()}s`,
                    },
                    {
                      title:
                        (role === ROLES.vendor
                          ? props.vendor_name
                          : vendor_name) || props.t("profile"),
                      link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                        {
                          storeType: activeStoreType?.storeType,
                        }
                      ).toLowerCase()}s/${vendorIdParam}/profile`,
                    },
                    {
                      title: props.t("promo_codes"),
                      link: `/${activeStoreType?.storeType?.toLowerCase()}/promo-codes${
                        role === ROLES.vendor ? "" : "/" + vendorIdParam
                      }${props?.location?.search}`,
                    },
                  ]
                : [
                    {
                      title: props.t("promo_codes"),
                      link: `/${activeStoreType?.storeType?.toLowerCase()}/promo-codes${
                        props?.location?.search
                      }`,
                    },
                  ]),

              {
                title: props.t(id ? "edit" : "add"),
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
                      {/* {isGloble &&
                        props.currentPlan?.billingPlan?.type === "ultimate" && (
                          <Col md={6}>
                            <FormGroup>
                              <Label>{props.t("store")}</Label>

                              <StoreTypes
                                parentStoreType={storeType}
                                setparentStoreType={data => {
                                  setFields(prevState => ({
                                    ...prevState,
                                    storeTypeId: data?.value,
                                  }))
                                  setstoreType(data)
                                }}
                              />
                            </FormGroup>
                          </Col>
                        )} */}

                      {props.settings?.hideThings?.find(
                        element => element.type === "isGeofence"
                      )?.value &&
                        isGloble && (
                          <Col md={6}>
                            <FormGroup>
                              <Label>{props.t("restrict_area")}</Label>

                              <Select
                                options={RESTRICT_AREA}
                                getOptionLabel={option => props.t(option.label)}
                                value={selectedRestrictArea}
                                onChange={data => {
                                  setselectedRestrictArea(data)
                                  handleChange("restrictArea")({ target: data })
                                }}
                              />
                            </FormGroup>
                          </Col>
                        )}

                      {props.settings?.hideThings?.find(
                        element => element.type === "isGeofence"
                      )?.value &&
                        selectedRestrictArea.value === "radius" && (
                          <Col md={6}>
                            <FormGroup>
                              <Label>{props.t("geofence")}</Label>

                              <Geofence
                                parentStoreType={geoFence}
                                setparentStoreType={data => {
                                  setFields(prevState => ({
                                    ...prevState,
                                    geoFence: data?.map(item => item.value),
                                  }))
                                  setgeoFence(data)
                                }}
                              />
                            </FormGroup>
                          </Col>
                        )}

                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-code-Input">
                            {props.t("code")}
                            <span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-code-Input"
                            value={fields.code}
                            onChange={handleChange("code")}
                            required
                          />
                        </FormGroup>
                      </Col>

                      <Col
                        md={6}
                        className={classNames({
                          "order-1":
                            isGloble &&
                            props.currentPlan?.billingPlan?.type === "ultimate",
                          "order-2": !(
                            isGloble &&
                            props.currentPlan?.billingPlan?.type === "ultimate"
                          ),
                        })}
                      >
                        <Row>
                          <Col md={6}>
                            <FormGroup>
                              <Label>{props.t("start_date")}</Label>

                              <InputGroup>
                                <Input
                                  value={moment(fields.start_date).format(
                                    "YYYY-MM-DD HH:mm"
                                  )}
                                  type="datetime-local"
                                  onChange={handleChange("start_date")}
                                  required
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>

                          <Col md={6}>
                            <FormGroup>
                              <Label for="formrow-date-expires-Input">
                                {props.t("end_date")}
                              </Label>

                              <InputGroup>
                                <Input
                                  value={moment(fields.date_expires).format(
                                    "YYYY-MM-DD HH:mm"
                                  )}
                                  type="datetime-local"
                                  onChange={handleChange("date_expires")}
                                  required
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>

                      <Col
                        md={6}
                        className={classNames({
                          "order-3":
                            isGloble &&
                            props.currentPlan?.billingPlan?.type === "ultimate",
                          "order-2": !(
                            isGloble &&
                            props.currentPlan?.billingPlan?.type === "ultimate"
                          ),
                        })}
                      >
                        <Row>
                          <Col xs={6} sm={3} md={4} xl={3} className="pr-0">
                            <FormGroup>
                              <Label>{props.t("discount_type")}</Label>

                              <div className="status-switch square-switch">
                                <input
                                  type="checkbox"
                                  id="square-switch2"
                                  switch="none"
                                  checked={fields.discount_type == "flat"}
                                  onChange={() => {
                                    const value =
                                      fields.discount_type == "flat"
                                        ? "percent"
                                        : "flat"

                                    handleChange("discount_type")({
                                      target: { value },
                                    })
                                  }}
                                />
                                <label
                                  htmlFor="square-switch2"
                                  data-on-label={props.t("flat")}
                                  data-off-label={props.t("percent")}
                                />
                              </div>
                            </FormGroup>
                          </Col>

                          <Col xs={6} sm={9} md={8} xl={9} className="pl-0">
                            <FormGroup>
                              <Label for="formrow-amount-Input">
                                {props.t("amount")}
                                <span className="text-danger ml-1">*</span>
                              </Label>
                              <Input
                                type="number"
                                className="form-control"
                                id="formrow-amount-Input"
                                value={fields.amount}
                                onChange={handleChange("amount")}
                                min={0}
                                step={0.01}
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>

                      <Col
                        md={6}
                        className={classNames({
                          "order-3":
                            isGloble &&
                            props.currentPlan?.billingPlan?.type === "ultimate",
                          "order-6": !(
                            isGloble &&
                            props.currentPlan?.billingPlan?.type === "ultimate"
                          ),
                        })}
                      >
                        <FormGroup>
                          <Label for="formrow-description-Input">
                            {props.t("description")}
                            <span className="text-danger ml-1">*</span>
                          </Label>

                          <Input
                            type="textarea"
                            rows="6"
                            className="form-control"
                            id="formrow-description-Input"
                            value={fields.description}
                            onChange={handleChange("description")}
                            required
                          />
                        </FormGroup>
                      </Col>

                      <Col
                        md={6}
                        className={classNames({
                          "order-6":
                            isGloble &&
                            props.currentPlan?.billingPlan?.type === "ultimate",
                          "order-5": !(
                            isGloble &&
                            props.currentPlan?.billingPlan?.type === "ultimate"
                          ),
                        })}
                      >
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

                                handleChange("status")({
                                  target: { value },
                                })
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

AddPromoCode.propTypes = {
  role: PropTypes.string,
  vendorId: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  promoCode: PropTypes.object,
  onAddPromoCode: PropTypes.func,
  onGetPromoCode: PropTypes.func,
  onPutPromoCode: PropTypes.func,
}

const mapStateToProps = ({ Login, Billing, promocodes, Settings }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "",
  vendor_name: Login?.user?.name,
  error: promocodes.error,
  loading: promocodes.loading,
  promoCode: promocodes.promoCode,
  currentPlan: Billing.currentPlan,
  settings: Settings.settings,
})

const mapDispatchToProps = dispatch => ({
  onAddPromoCode: (data, history) => dispatch(addPromoCode(data, history)),
  onGetPromoCode: id => dispatch(getPromoCode(id)),
  onPutPromoCode: (data, history) => dispatch(putPromoCode(data, history)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddPromoCode))
)
