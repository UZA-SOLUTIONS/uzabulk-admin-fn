import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect, useDispatch } from "react-redux"
import { Link, withRouter, useParams } from "react-router-dom"
import { map } from "lodash"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
  UncontrolledTooltip,
  Label,
  Spinner,
  Button,
} from "reactstrap"
import moment from "moment-timezone"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"
import { usePermissions } from "helpers/permissions"

//i18n
import { withTranslation } from "react-i18next"

// Contants
import {
  ROLES,
  GET_SERVICE_NAME,
  DEFAULT_STORE_TYPE,
  VENDOR_MENU,
  SLUGS_NAME as slugname,
  SLUGS_NAME,
} from "helpers/contants"

//Import mini card widgets
import MiniCards from "./mini-card"

//Import Images
import profile1 from "assets/images/profile-img.png"
import avatar4 from "assets/images/users/avatar-9.jpg"
import toastr from "toastr"

// import charts
import {
  getFdRestaurant,
  getFdRestaurantDocuments,
  putFdRestaurantsStatus,
  cloneFdRestaurant,
  getFdRestaurantPost,
} from "store/actions"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import projectColumns from "pages/FoodDelivery/Order/List/ListColumns"
import reviewColumns from "./ReviewColumns"
import RemoveConfirmModal from "./RemoveConfirmModal"
import AddDocumentModal from "./DocumentModal"
import productreviewColumns from "./ProductReviewColumns"
import { STORE_SETTINGS_FORM } from "helpers/contants"
import DateRangePicker from "react-bootstrap-daterangepicker"

const RestaurantProfile = ({
  accessLevel,
  loading,
  userProfile,
  fdRestaurant,
  onGetFdRestaurantDocuments,
  onGetFdRestaurant,
  onCloneFdRestaurant,
  onPutFdRestaurantsStatus,
  fdDocuments,
  activeStoreType,
  activeStoreId,
  ...props
}) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  console.log(activeStoreType, "storeVersion")

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canTransactions: false,
    canBlock: false,
  })
  const [filter, setFilter] = useState({
    user: id,
    role: "VENDOR",
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 10,
    storeTypeId: activeStoreId,
  })
  const [fdRestaurantDocumentsList, setfdRestaurantDocumentsList] = useState([])

  const [purposeFields, setPurposeFields] = useState()
  // eslint-disable-next-line no-unused-vars
  const hasPermission = usePermissions(activeStoreType?.storeType)
  const [miniCards, setMiniCards] = useState([
    {
      title: props.t("completed_orders"),
      iconClass: "bx bx-check-circle",
      text: "0",
    },
    {
      title: props.t("total_spent"),
      iconClass: "bx bx-dollar-circle",
      text: props?.settings?.currency?.sign + "0.00",
    },
    /* {
      title: props.t("avg_order_value"),
      iconClass: "bx bx-line-chart",
      text: "0.00",
    }, */
  ])
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    addressId: null,
    storeTypeId: activeStoreId,
  })
  const [documentModal, setdocumentModal] = useState({
    isOpen: false,
  })

  // Date Filter
  const [dateFilter, setdateFilter] = useState({
    startDate: moment(),
    endDate: moment(),
  })

  console.log("startDate", dateFilter.startDate)
  const RANGES = t => ({
    [t("today")]: [moment(), moment()],
    [t("yesterday")]: [
      moment().subtract(1, "days"),
      moment().subtract(1, "days"),
    ],
    [t("last_7_days")]: [moment().subtract(6, "days"), moment()],
    [t("last_30_days")]: [moment().subtract(29, "days"), moment()],
    [t("this_month")]: [moment().startOf("month"), moment().endOf("month")],
    [t("last_month")]: [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
  })

  // end datefilter

  useEffect(() => {
    if (!accessLevel) {
      const data = {
        canAdd: true,
        canEdit: true,
        canDelete: true,
        canTransactions: true,
        canBlock: true,
      }

      return setaccesses(data)
    }

    const data = {
      canAdd: false,
      canEdit: false,
      canDelete: false,
      canTransactions: false,
      canBlock: false,
    }

    accessLevel?.map(item => {
      switch (item.label) {
        case "CREATE":
          data.canAdd = item.value
          break

        case "UPDATE":
          data.canEdit = item.value
          break

        case "DELETE":
          data.canDelete = item.value
          break

        case "BLOCK":
          data.canBlock = item.value
      }
    })

    props?.accessLevels
      ?.filter(level => level.type === "accounting")
      ?.map(level => {
        level?.permissions?.map(item => {
          switch (item.label) {
            case "VIEW":
              data.canTransactions = item.value
              break
          }
        })
      })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  useEffect(() => {
    setfdRestaurantDocumentsList([])
    onGetFdRestaurantDocuments(filter)
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setfdRestaurantDocumentsList(fdDocuments || [])
  }, [fdDocuments])

  useEffect(() => {
    const data = { ...filter }

    data.startDate = dateFilter?.startDate?.format("YYYY-MM-DD")
    data.endDate = dateFilter?.endDate?.format("YYYY-MM-DD")
    if (slugname.purposeDeliveryService === props.settings?.slug) {
      if (dateFilter.keydata == "picker_date") {
        const data = { ...filter }

        data.startDate = dateFilter?.startDate?.format("YYYY-MM-DD")
        data.endDate = dateFilter?.endDate?.format("YYYY-MM-DD")

        if (id) {
          const callback = res => {
            if (res.status == "success") {
              setPurposeFields(res.data)
            }
          }
          dispatch(getFdRestaurantPost(data, id, callback))
        }
      } else {
        const data = { ...filter }

        data.startDate = ""
        data.endDate = ""

        if (id) {
          const callback = res => {
            if (res.status == "success") {
              setPurposeFields(res.data)
            }
          }
          dispatch(getFdRestaurantPost(data, id, callback))
        }
      }
    }

    if (props?.role === ROLES.vendor) {
      if (!activeStoreId) return

      return onGetFdRestaurant(activeStoreId, props?.vendorId)
    }

    if (id) {
      if (!activeStoreId) return

      return onGetFdRestaurant(activeStoreId, id)
    }

    props.history.replace(
      `${activeStoreType?.storeType?.toLowerCase()}/fdRestaurants`
    )
  }, [id, activeStoreId, dateFilter])

  // useEffect(() => {

  // }, [dateFilter])

  useEffect(() => {
    if (fdRestaurant || dateFilter) {
      console.log("purposeFields?.totalOrders", purposeFields?.totalOrders)
      activeStoreType?.storeType === "CARRENTAL"
        ? setMiniCards([
            {
              title: props.t("completed_orders"),
              iconClass: "bx bx-check-circle",
              text: fdRestaurant.totalOrders || 0,
            },
            {
              title: props.t("total_earned"),
              iconClass: "bx bx-dollar-circle",
              text:
                props?.settings?.currency?.sign +
                parseFloat(fdRestaurant.vendorEarning || 0).toFixed(2),
            },
            // {
            //   title: props.t("wallet_balance"),
            //   iconClass: "bx bx-dollar-circle",
            //   text: props?.settings?.currency?.sign + parseFloat(fdRestaurant.wallet || 0).toFixed(2),
            // },
          ])
        : setMiniCards([
            {
              title: props.t("completed_orders"),
              iconClass: "bx bx-check-circle",
              text:
                slugname.purposeDeliveryService === props.settings?.slug
                  ? purposeFields?.totalOrders || 0
                  : fdRestaurant.totalOrders || 0,
            },
            {
              title: props.t("total_earned"),
              iconClass: "bx bx-dollar-circle",
              text:
                slugname.purposeDeliveryService === props.settings?.slug
                  ? props?.settings?.currency?.sign +
                    parseFloat(purposeFields?.vendorEarning || 0).toFixed(2)
                  : props?.settings?.currency?.sign +
                    parseFloat(fdRestaurant.vendorEarning || 0).toFixed(2),
            },
            {
              title: props.t("wallet_balance"),
              iconClass: "bx bx-dollar-circle",
              text:
                props?.settings?.currency?.sign +
                parseFloat(fdRestaurant.wallet || 0).toFixed(2),
            },
          ])
    }
  }, [JSON.stringify(fdRestaurant), dateFilter, purposeFields])

  const toggleConfirmModal = addressId => {
    setConfirmModal(prevState => ({ isOpen: !prevState.isOpen, addressId }))
  }

  const toggleDocumentModal = () => {
    setdocumentModal(prevState => ({ isOpen: !prevState.isOpen }))
  }

  const removeConfirm = () => {
    const { addressId, isOpen } = confirmModal

    const onComplete = () => {
      if (!activeStoreId) return
      onGetFdRestaurant(activeStoreId, id)
    }

    setConfirmModal({ isOpen: !isOpen, addressId: null })
  }

  const handleFdRestaurantStatusChange = status => {
    const callback = () => {
      if (id) {
        if (!activeStoreId) return
        return onGetFdRestaurant(activeStoreId, id)
      }
    }

    onPutFdRestaurantsStatus(
      activeStoreType?.storeType?.toLowerCase(),
      { _id: [id], status, storeTypeId: activeStoreId },
      callback
    )
  }

  const onClone = () => {
    console.log("holahu ", id)
    console.log("holahu 2", activeStoreType?.storeType?.toLowerCase())
    const callback = response => {
      console.log("holahu 3", response)
      if (response?.status === "success") {
        console.log("clone done")
        props.history.push(
          `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME({
            storeType: activeStoreType?.storeType,
          }).toLowerCase()}s/${response?.data?._id}/profile`
        )
        toastr.success("Clone Successfull")
      } else {
        toastr.error("Clone Failed")
      }
    }

    onCloneFdRestaurant(
      activeStoreType?.storeType?.toLowerCase(),
      { vendor: id },
      callback
    )
  }

  const breadcrumbvendortitle =
    props?.settings?.slug == "topup-fuel"
      ? "Vendor Profile"
      : props.t("my") +
        " " +
        GET_SERVICE_NAME({
          storeType: activeStoreType?.storeType,
          name: "restaurants",
        })
  // slugname.dewe == props?.settings?.slug ? "Store" : "

  const breadcrumbtitle = [slugname.dewe, slugname.zaza].includes(
    props?.settings?.slug
  )
    ? "Store"
    : GET_SERVICE_NAME({
        storeType: activeStoreType?.storeType,
        name: "restaurant",
      })
  console.log(
    props?.settings?.hideThings,
    activeStoreType?.storeType,
    "breadcrumbtitle"
  )

  const isproductReviewActive =
    props?.settings?.hideThings?.filter(
      hide => hide?.type == "productreview" && hide.value == true
    ).length > 0

  const showThings = {}
  props?.settings?.hideThings?.forEach(
    item => (showThings[item.type] = item.value)
  )

  const FEATURE = STORE_SETTINGS_FORM[activeStoreType?.storeType?.toUpperCase()]
  return (
    <React.Fragment>
      <RemoveConfirmModal
        isOpen={confirmModal.isOpen}
        toggle={toggleConfirmModal}
        onConfirm={removeConfirm}
      />

      <AddDocumentModal
        isOpen={documentModal.isOpen}
        toggle={toggleDocumentModal}
      />

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={`${GET_SERVICE_NAME({
              storeType: activeStoreType?.storeType,
              name: "restaurants",
            })} Profile`}
            breadcrumbItems={
              activeStoreType?.storeVendorType === "SINGLE" ||
              props?.role === ROLES.vendor
                ? [
                    {
                      title: breadcrumbvendortitle,
                      link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                        {
                          storeType: activeStoreType?.storeType,
                        }
                      ).toLowerCase()}s/profile`,
                    },
                  ]
                : [
                    {
                      title: breadcrumbtitle + "s",
                      link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                        {
                          storeType: activeStoreType?.storeType,
                        }
                      ).toLowerCase()}s`,
                    },
                    {
                      title: props.t("profile"),
                      link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                        {
                          storeType: activeStoreType?.storeType,
                        }
                      ).toLowerCase()}s/profile`,
                    },
                  ]
            }
          />
          <Row>
            {slugname.purposeDeliveryService === props.settings.slug && (
              <Col sm={12} className="mb-2 text-right">
                <DateRangePicker
                  initialSettings={{
                    opens: "center",
                    ranges: RANGES(props.t),
                    alwaysShowCalendars: true,
                    applyButtonClasses: "btn-primary",
                    maxDate: moment(),
                    locale: {
                      applyLabel: props.t("apply"),
                      cancelLabel: props.t("cancel"),
                      customRangeLabel: props.t("custom_range"),
                      daysOfWeek: [
                        props.t("week_of_sunday"),
                        props.t("week_of_monday"),
                        props.t("week_of_tuesday"),
                        props.t("week_of_wednesday"),
                        props.t("week_of_thursday"),
                        props.t("week_of_friday"),
                        props.t("week_of_saturday"),
                      ],
                      monthNames: [
                        props.t("month_of_january"),
                        props.t("month_of_february"),
                        props.t("month_of_march"),
                        props.t("month_of_april"),
                        props.t("month_of_may"),
                        props.t("month_of_june"),
                        props.t("month_of_july"),
                        props.t("month_of_august"),
                        props.t("month_of_september"),
                        props.t("month_of_october"),
                        props.t("month_of_november"),
                        props.t("month_of_december"),
                      ],
                    },
                    ...dateFilter,
                  }}
                  onApply={(e, picker) => {
                    console.log("apply ", e, picker)

                    setdateFilter({
                      startDate: picker.startDate,
                      endDate: picker.endDate,
                      keydata: "picker_date",
                    })
                  }}
                >
                  <div
                    id="daterange"
                    class="daterange-selectbox pull-right d-flex justify-content-between align-items-center w-75"
                  >
                    <i class="bx bx-calendar"></i>
                    <span>
                      {dateFilter?.startDate?.format("DD MMM YYYY")} -{" "}
                      {dateFilter?.endDate?.format("DD MMM YYYY")}
                    </span>{" "}
                    <b class="bx bx-caret-down"></b>
                  </div>
                </DateRangePicker>
              </Col>
            )}
          </Row>

          <Row className="spinner-content">
            {(loading || !fdRestaurant?._id) && <div className="spinner"></div>}

            <Col xl="4">
              <Card className="overflow-hidden">
                <div className="bg-soft-primary">
                  <Row>
                    <Col xs="7"></Col>
                    <Col xs="5" className="align-self-end">
                      <img src={profile1} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0 pb-2">
                  <Row>
                    <Col sm="12" style={{ display: "flex" }}>
                      <div className="avatar-md profile-user-wid mb-4">
                        <img
                          style={{ height: "100%" }}
                          src={
                            !!fdRestaurant.profileImage
                              ? fdRestaurant.profileImage.link
                              : avatar4
                          }
                          alt=""
                          className="img-thumbnail rounded-circle"
                        />
                      </div>

                      <h5 className="pl-3 font-size-15 text-truncate">
                        {fdRestaurant.name}
                      </h5>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div className="pr-3 pb-3">
                      <h5 className="font-size-15">
                        {moment(fdRestaurant.date_created_utc).format(
                          "DD MMM YYYY"
                        )}
                      </h5>
                      <p className="text-muted mb-0">
                        {props.t("member_since")}
                      </p>
                    </div>

                    <div className="pr-3 pb-3">
                      <h5 className="font-size-15 text-capitalize">
                        {fdRestaurant.status || "Active"}
                      </h5>
                      <p className="text-muted mb-0">{props.t("status")}</p>
                    </div>

                    <div className="pr-3 pb-3">
                      <h5 className="font-size-15 text-capitalize">
                        <i
                          style={{ color: "#fabc3c" }}
                          className="bx bxs-star"
                        ></i>{" "}
                        {fdRestaurant.avgRating || 0}/5
                      </h5>
                      <p className="text-muted mb-0">{props.t("rating")}</p>
                    </div>

                    {activeStoreType?.storeVendorType !== "SINGLE" &&
                      props?.role !== ROLES.vendor &&
                      props?.role !== ROLES.subVendor && (
                        <>
                          <div className="pr-3 pb-3">
                            {accesses.canEdit &&
                              fdRestaurant?.status === "created" && (
                                <>
                                  <Button
                                    className="mt-1 btn btn-sm"
                                    color="primary"
                                    onClick={() =>
                                      handleFdRestaurantStatusChange("approved")
                                    }
                                  >
                                    {props.t("approve")}
                                  </Button>
                                  <Button
                                    className="mt-1 ml-1 btn btn-sm"
                                    color="danger"
                                    onClick={() =>
                                      handleFdRestaurantStatusChange("rejected")
                                    }
                                  >
                                    {props.t("reject")}
                                  </Button>
                                </>
                              )}

                            {accesses.canEdit &&
                              fdRestaurant?.status === "rejected" && (
                                <Button
                                  className="mt-1 btn btn-sm"
                                  color="primary"
                                  onClick={() =>
                                    handleFdRestaurantStatusChange("approved")
                                  }
                                >
                                  {props.t("approve")}
                                </Button>
                              )}

                            {accesses.canBlock &&
                              fdRestaurant?.status === "approved" && (
                                <Button
                                  className="btn btn-sm"
                                  color="danger"
                                  onClick={() =>
                                    handleFdRestaurantStatusChange("blocked")
                                  }
                                >
                                  {props.t("block")}
                                </Button>
                              )}

                            {accesses.canBlock &&
                              fdRestaurant?.status === "blocked" && (
                                <Button
                                  className="btn btn-sm"
                                  color="primary"
                                  onClick={() =>
                                    handleFdRestaurantStatusChange("approved")
                                  }
                                >
                                  {props.t("unblock")}
                                </Button>
                              )}
                          </div>

                          <div className="pr-3 pb-3">
                            {accesses?.canTransactions && (
                              <Link
                                to={
                                  props?.role === ROLES.vendor
                                    ? `/${activeStoreType?.storeType?.toLowerCase()}/transactions/${id}`
                                    : `/${activeStoreType?.storeType?.toLowerCase()}/transactions/${id}?vendor_name=${
                                        fdRestaurant?.name
                                      }`
                                }
                                className="waves-effect waves-light p-0"
                              >
                                {props.t("transactions")}{" "}
                                <i className="mdi mdi-arrow-right ml-1" />
                              </Link>
                            )}
                          </div>

                          <div className="pr-3 pb-3 w-100 d-flex justify-content-between">
                            <Link
                              to={
                                props?.role === ROLES.vendor
                                  ? `/${activeStoreType?.storeType?.toLowerCase()}/promo-codes`
                                  : `/${activeStoreType?.storeType?.toLowerCase()}/promo-codes/${
                                      fdRestaurant._id
                                    }?vendor_name=${fdRestaurant?.name}`
                              }
                              className="waves-effect waves-light p-0"
                            >
                              {props.t("promo_code")}{" "}
                              <i className="mdi mdi-arrow-right ml-1" />
                            </Link>
                            {FEATURE?.cloneVendor &&
                              showThings["showHideVendorClone"] && (
                                <Link
                                  to={"#"}
                                  className="waves-effect waves-light p-0"
                                  onClick={onClone}
                                >
                                  {props.t("clone")}
                                  <i className="mdi mdi-content-copy ml-1" />
                                </Link>
                              )}
                          </div>
                        </>
                      )}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    <Row>
                      <Col>{props.t("personal_information")}</Col>
                      {hasPermission("STORE.storeTypeSetting.VIEW") && (
                        <Col className="d-flex justify-content-end">
                          <Link
                            to={
                              props.role === ROLES.vendor ||
                              props.role === ROLES.subVendor
                                ? `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                                    {
                                      storeType: activeStoreType?.storeType,
                                    }
                                  ).toLowerCase()}s/settings`
                                : `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                                    {
                                      storeType: activeStoreType?.storeType,
                                    }
                                  ).toLowerCase()}s/${
                                    fdRestaurant._id
                                  }/settings?vendor_name=${fdRestaurant?.name}`
                            }
                            className="waves-effect waves-light p-0"
                          >
                            {props.t("settings")}{" "}
                            <i className="mdi mdi-arrow-right ml-1" />
                          </Link>
                        </Col>
                      )}
                    </Row>
                  </CardTitle>
                  <div className="table-responsive">
                    <Table className="table-nowrap mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">{props.t("business_name")} :</th>
                          <td className="text-wrap">{fdRestaurant.name}</td>
                        </tr>
                        {props.demo ? (
                          <>
                            <tr>
                              <th scope="row">{props.t("mobile")} :</th>
                              <td id="view-mobiletooltip" className="text-wrap">
                                {fdRestaurant.countryCode}{" "}
                                {fdRestaurant.mobileNumber}
                              </td>
                              <UncontrolledTooltip
                                placement="top"
                                target="view-mobiletooltip"
                              >
                                {props.t("demo_info")}
                              </UncontrolledTooltip>
                            </tr>
                            <tr>
                              <th scope="row">{props.t("email")} :</th>
                              <td id="view-emailtooltip" className="text-wrap">
                                {fdRestaurant.email}
                              </td>
                              <UncontrolledTooltip
                                placement="top"
                                target="view-emailtooltip"
                              >
                                {props.t("demo_info")}
                              </UncontrolledTooltip>
                            </tr>
                          </>
                        ) : (
                          <>
                            <tr>
                              <th scope="row">{props.t("mobile")} :</th>
                              <td className="text-wrap">
                                {fdRestaurant.countryCode}{" "}
                                {fdRestaurant.mobileNumber}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">{props.t("email")} :</th>
                              <td className="text-wrap">
                                {fdRestaurant.email}
                              </td>
                            </tr>
                          </>
                        )}
                        <tr>
                          <th scope="row">{props.t("location")} :</th>
                          <td className="text-wrap">{fdRestaurant.address}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

              {activeStoreType?.storeVendorType !== "SINGLE" &&
                props?.role !== ROLES.vendor &&
                props?.role !== ROLES.subVendor &&
                activeStoreType?.storeType !== "SERVICEPROVIDER" && (
                  <Card>
                    <CardBody>
                      <CardTitle className="mb-4">{props.t("menu")}</CardTitle>

                      {(VENDOR_MENU[activeStoreType?.storeType]
                        ? VENDOR_MENU[activeStoreType?.storeType]
                        : DEFAULT_STORE_TYPE["VENDOR_MENU"]
                      )?.map(item => {
                        if (item.version.includes(props.storeVersion)) {
                          return (
                            <Row
                              key={item.key}
                              className="align-items-center mb-2"
                            >
                              <Col className="text-capitalize">
                                <Label>{item.name}</Label>
                              </Col>

                              <Col className="text-truncate px-1">
                                {fdRestaurant[item?.key] || 0}
                              </Col>

                              <Col sm="3" className="px-2">
                                <Link
                                  to={
                                    props?.role === ROLES.vendor
                                      ? `/${activeStoreType?.storeType?.toLowerCase()}/${
                                          item.to
                                        }`
                                      : `/${activeStoreType?.storeType?.toLowerCase()}/${
                                          item.to
                                        }/${id}?vendor_name=${
                                          fdRestaurant?.name
                                        }`
                                  }
                                  className="waves-effect waves-light btn-sm"
                                >
                                  {props.t("view_all")}{" "}
                                  <i className="mdi mdi-arrow-right ml-1" />
                                </Link>
                              </Col>
                            </Row>
                          )
                        }
                      })}
                    </CardBody>
                  </Card>
                )}

              {activeStoreType?.storeVendorType !== "SINGLE" &&
                props?.role !== ROLES.vendor &&
                props?.role !== ROLES.subVendor &&
                activeStoreType?.storeType == "SERVICEPROVIDER" && (
                  <Card>
                    <CardBody>
                      <CardTitle className="mb-4">{props.t("menu")}</CardTitle>

                      {(VENDOR_MENU[activeStoreType?.storeType]
                        ? VENDOR_MENU[activeStoreType?.storeType]
                        : DEFAULT_STORE_TYPE["VENDOR_MENU"]
                      )?.map(item => {
                        console.log(item, "chcekMenuToggles")
                        if (item.version.includes(props.storeVersion)) {
                          return (
                            <Row
                              key={item.key}
                              className="align-items-center mb-2"
                            >
                              <Col className="text-capitalize">
                                <Label>{item.name}</Label>
                              </Col>

                              <Col className="text-truncate px-1">
                                {fdRestaurant[item?.key] || 0}
                              </Col>

                              <Col sm="3" className="px-2">
                                <Link
                                  to={
                                    props?.role === ROLES.vendor
                                      ? `/${activeStoreType?.storeType?.toLowerCase()}/${
                                          item.to
                                        }`
                                      : `/${activeStoreType?.storeType?.toLowerCase()}/${
                                          item.to
                                        }/${id}?vendor_name=${
                                          fdRestaurant?.name
                                        }`
                                  }
                                  className="waves-effect waves-light btn-sm"
                                >
                                  {props.t("view_all")}{" "}
                                  <i className="mdi mdi-arrow-right ml-1" />
                                </Link>
                              </Col>
                            </Row>
                          )
                        }
                      })}
                    </CardBody>
                  </Card>
                )}

              {props.settings?.hideThings?.find(
                element => element.type === "isDocumentTemplates"
              )?.value &&
                activeStoreType?.storeVendorType !== "SINGLE" &&
                props?.role !== ROLES.vendor &&
                props?.role !== ROLES.subVendor &&
                activeStoreType?.storeType !== "SERVICEPROVIDER" && (
                  <Card>
                    <CardBody>
                      <CardTitle className="mb-4">
                        {props.t("documents")}
                      </CardTitle>

                      {fdRestaurantDocumentsList?.map(document => (
                        <Row
                          key={document._id}
                          className="align-items-center mb-2"
                        >
                          <Col className="text-capitalize">
                            {document?.name}
                          </Col>

                          <Col xs="1" className="mr-1">
                            {accesses.canEdit && (
                              <Link
                                to={
                                  props?.role === ROLES.vendor
                                    ? `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                                        {
                                          storeType: activeStoreType?.storeType,
                                        }
                                      ).toLowerCase()}s/document/${
                                        document?._id
                                      }`
                                    : `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                                        {
                                          storeType: activeStoreType?.storeType,
                                        }
                                      ).toLowerCase()}s/${id}/document/${
                                        document?._id
                                      }?vendor_name=${fdRestaurant?.name}`
                                }
                                className="text-primary"
                              >
                                <i
                                  className="mdi mdi-pencil font-size-18 pr-3"
                                  p
                                  id="edittooltip"
                                />
                                <UncontrolledTooltip
                                  placement="top"
                                  target="edittooltip"
                                >
                                  {props.t("edit")}
                                </UncontrolledTooltip>
                              </Link>
                            )}
                          </Col>
                        </Row>
                      ))}
                    </CardBody>
                  </Card>
                )}

              {activeStoreType?.storeVendorType !== "SINGLE" &&
                props?.role !== ROLES.vendor &&
                props?.role !== ROLES.subVendor &&
                activeStoreType?.storeType !== "SERVICEPROVIDER" && (
                  <Card>
                    <CardBody>
                      <CardTitle className="mb-4">
                        {props.t("bank_account")}
                      </CardTitle>

                      <div className="table-responsive">
                        <Table className="table-nowrap mb-0">
                          <tbody>
                            {fdRestaurant?.bankFields?.map((field, key) => (
                              <tr key={`_bankfi_${key}`}>
                                <th scope="row">{props.t(field?.label)} :</th>
                                <td className="text-wrap w-100">
                                  {field?.value || "-"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                )}
            </Col>

            <Col xl="8">
              <Row>
                {map(miniCards, (card, key) => (
                  <MiniCards
                    title={card.title}
                    text={card.text}
                    iconClass={card.iconClass}
                    key={"_card_" + key}
                  />
                ))}
              </Row>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">
                    <Row>
                      <Col xs="6">{props.t("my_orders")}</Col>

                      <Col xs="6" className="text-right">
                        <Link
                          to={
                            props?.role === ROLES.vendor ||
                            props?.role === ROLES.subVendor
                              ? `/${activeStoreType?.storeType?.toLowerCase()}/requests`
                              : `/${activeStoreType?.storeType?.toLowerCase()}/orders?vendor=${id}&vendor_name=${
                                  fdRestaurant?.name
                                }`
                          }
                          className="waves-effect waves-light btn-sm"
                        >
                          {props.t("view_all")}{" "}
                          <i className="mdi mdi-arrow-right ml-1" />
                        </Link>
                      </Col>
                    </Row>
                  </CardTitle>

                  <ToolkitProvider
                    keyField="id"
                    data={fdRestaurant?.latestOrders || []}
                    columns={projectColumns({
                      currentUrl: activeStoreType?.storeType?.toLowerCase(),
                      vendorIdParam: null,
                      accesses,
                      t: props.t,
                      currency: props?.settings?.currency,
                      needVendor: false,
                      query: "",
                      isVendor:
                        props?.role === ROLES.vendor ||
                        props?.role === ROLES.subVendor,
                      isVendorEarning: true,
                      activestore: "Other",
                    })}
                    bootstrap4
                  >
                    {toolkitProps => (
                      <React.Fragment>
                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                responsive
                                remote
                                bordered={false}
                                striped={false}
                                classes={
                                  "table table-centered table-hover table-nowrap"
                                }
                                headerWrapperClasses={"thead-light"}
                                {...toolkitProps.baseProps}
                              />
                            </div>
                          </Col>
                        </Row>
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-3">
                    <Row>
                      <Col xs="6">{props.t("reviews")}</Col>

                      <Col xs="6" className="text-right">
                        <Link
                          to={`/reviews?vendor=${id}`}
                          className="waves-effect waves-light btn-sm"
                        >
                          {props.t("view_all")}{" "}
                          <i className="mdi mdi-arrow-right ml-1" />
                        </Link>
                      </Col>
                    </Row>
                  </CardTitle>

                  <ToolkitProvider
                    keyField="id"
                    data={fdRestaurant?.reviews || []}
                    columns={reviewColumns({
                      t: props.t,
                      currency: props?.settings?.currency,
                      isVendor:
                        props?.role === ROLES.vendor ||
                        props?.role === ROLES.subVendor,
                    })}
                    bootstrap4
                  >
                    {toolkitProps => (
                      <React.Fragment>
                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                responsive
                                remote
                                bordered={false}
                                striped={false}
                                classes={
                                  "table table-centered table-hover table-nowrap"
                                }
                                headerWrapperClasses={"thead-light"}
                                {...toolkitProps.baseProps}
                              />
                            </div>
                          </Col>
                        </Row>
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                </CardBody>
              </Card>
              {fdRestaurant?.productReview?.length > 0 &&
                isproductReviewActive &&
                activeStoreType?.storeType?.toLowerCase() == "grocery" && (
                  <Card>
                    <CardBody>
                      <CardTitle className="mb-3">
                        {props.t("product") + " " + props.t("reviews")}
                      </CardTitle>

                      <ToolkitProvider
                        keyField="id"
                        data={fdRestaurant?.productReview || []}
                        columns={productreviewColumns({
                          t: props.t,
                          currency: props?.settings?.currency,
                          isVendor: props?.role === ROLES.vendor,
                        })}
                        bootstrap4
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    responsive
                                    remote
                                    bordered={false}
                                    striped={false}
                                    classes={
                                      "table table-centered table-hover table-nowrap"
                                    }
                                    headerWrapperClasses={"thead-light"}
                                    {...toolkitProps.baseProps}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    </CardBody>
                  </Card>
                )}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

RestaurantProfile.propTypes = {
  userProfile: PropTypes.any,
  onGetFdRestaurant: PropTypes.func,
  loading: PropTypes.bool,
}

const mapStateToProps = ({ Login, Settings, FD_Restaurants }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id,
  accessLevels: Login?.user?.accessLevel?.permissions || [],
  fdDocuments: FD_Restaurants.fdDocuments,
  fdRestaurant: FD_Restaurants.fdRestaurant,
  documents: PropTypes.array,
  onGetFdRestaurantDocuments: PropTypes.func,
  userProfile: {},
  loading: FD_Restaurants.loading,
  settings: Settings.settings,
  storeVersion: Settings?.settings?.storeVersion || 1,
  demo: Settings?.settings?.demo,
})

const mapDispatchToProps = dispatch => ({
  onGetFdRestaurant: (storeType, data) =>
    dispatch(getFdRestaurant(storeType, data)),
  onGetFdRestaurantDocuments: data => dispatch(getFdRestaurantDocuments(data)),
  onPutFdRestaurantsStatus: (storeType, data, callback) =>
    dispatch(putFdRestaurantsStatus(storeType, data, callback)),
  onCloneFdRestaurant: (storeType, data, callback) =>
    dispatch(cloneFdRestaurant(storeType, data, callback)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(RestaurantProfile)))
