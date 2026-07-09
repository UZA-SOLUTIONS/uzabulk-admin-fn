import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter, useParams } from "react-router-dom"
import { map, trim } from "lodash"
import toastr from "toastr"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
  Badge,
  CardTitle,
  Button,
} from "reactstrap"
import Select from "react-select"
import moment from "moment-timezone"
import queryString from "query-string"
import { useShowThings } from "helpers/show-things"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

// Contants
import {
  ROLES,
  GET_SERVICE_NAME,
  SLUGS_NAME as slugname,
  SERVICE_STATUS,
} from "helpers/contants"
import { getOrderStatusBadgeSoftClass } from "helpers/orderStatusBadge"

//Import mini card widgets
import MiniCards from "./mini-card"

// import charts
import { getFdOrder, postFdOrderStatus } from "store/actions"
import DetailCard from "./DetailCard"
import RemoveConfirmModal from "./RemoveConfirmModal"
import ProductPreview from "./ProductPreview"
import RefundModal from "./RefundModal"
import RefundTransactionsModal from "./RefundTransactions"
import PreviewModal from "./Preview"
import OrderLogisticsTracking from "./OrderLogisticsTracking"
import { shouldShowLogisticsTracking } from "helpers/orderLogistics"

const orderStatusLable = [
  { name: "Order created" },
  { name: "Order Confirm" },
  { name: "Driver Assign" },
  { name: "Driver Arrived " },
  { name: "On the Way" },
  { name: "Order Completed" },
]

const orderStatusSelectStyles = {
  menuPortal: base => ({ ...base, zIndex: 9999 }),
  menu: base => ({ ...base, zIndex: 9999 }),
}

const OrderProfile = ({
  accessLevel,
  loading,
  settings,
  userProfile,
  fdOrder,
  fd,
  onGetFdOrder,
  postFdOrderStatus,
  statusUpdateLoading,
  activeStoreType,
  currency,
  plan,
  accessLevels,
  activestore,
  statusTrack,
  ...props
}) => {
  const { id, vendorId: vendorIdParam } = useParams()
  const { vendor_name, vendor, driver, customer } = queryString.parse(
    props?.location?.search
  )

  // const [orderbar, setOrderbar] = useState([])
  const showThings = useShowThings()

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
  })

  // console.log("statusTrack", statusTrack)
  // eslint-disable-next-line no-unused-vars
  const [miniCards, setMiniCards] = useState([
    {
      title: props.t("driver_earning"),
      iconClass: "bx bx-dollar-circle",
      text: currency?.sign + "0",
    },
    ...(activeStoreType?.storeVendorType !== "SINGLE"
      ? [
        {
          title:
            props.t(
              GET_SERVICE_NAME({
                storeType: activeStoreType?.storeType,
              })
            ) +
            " " +
            props.t("earning"),
          iconClass: "bx bx-dollar-circle",
          text: currency?.sign + "0",
        },
      ]
      : []),
    ...(props?.role !== ROLES.vendor
      ? [
        {
          title: props.t("admin_earning"),
          iconClass: "bx bx-dollar-circle",
          text: currency?.sign + "0",
        },
      ]
      : []),
  ])
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    addressId: null,
  })
  const [inlineOrderStatus, setInlineOrderStatus] = useState({
    label: "",
    value: "",
  })
  const [refundModal, setrefundModal] = useState({
    isOpen: false,
  })
  const [refundTransactionModal, setrefundTransactionModal] = useState({
    isOpen: false,
  })
  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    preview: null,
  })
  const togglePreviewModal = preview => {
    setPreviewModal(prevState => ({ isOpen: !prevState.isOpen, preview }))
  }
  // console.log(fdOrder?.storeType?.storeType,"fdOrder?.driverfdOrder?.driver");

  useEffect(() => {
    if (!accessLevel) {
      const data = {
        canAdd: true,
        canEdit: true,
        canDelete: true,
      }

      return setaccesses(data)
    }

    const data = {
      canAdd: false,
      canEdit: false,
      canDelete: false,
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
      }
    })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  useEffect(() => {
    if (id) {
      return onGetFdOrder(id)
    }

    props.history.replace(`${activeStoreType?.storeType?.toLowerCase()}/orders`)
  }, [onGetFdOrder, id])

  useEffect(() => {
    if (fdOrder) {
      setMiniCards([
        {
          title: props.t("driver_earning"),
          iconClass: "bx bx-dollar-circle",
          text: currency?.sign + (fdOrder?.deliveryBoyEarning || 0),
        },
        ...(activeStoreType?.storeVendorType !== "SINGLE"
          ? [
            {
              title: [slugname.dewe, slugname.zaza].includes(settings?.slug)
                ? props.t("store") + " " + props.t("earning")
                : props.t(
                  GET_SERVICE_NAME({
                    storeType: activeStoreType?.storeType,
                  })
                ) +
                " " +
                props.t("earning"),
              iconClass: "bx bx-dollar-circle",
              text: currency?.sign + (fdOrder?.vendorEarning || 0),
            },
          ]
          : []),
        ...(props?.role !== ROLES.vendor
          ? [
            {
              title: props.t("admin_earning"),
              iconClass: "bx bx-dollar-circle",
              text: currency?.sign + (fdOrder?.adminEarning || 0),
            },
          ]
          : []),
      ])
    }
  }, [JSON.stringify(fdOrder)])

  const toggleConfirmModal = addressId => {
    setConfirmModal(prevState => ({ isOpen: !prevState.isOpen, addressId }))
  }

  const toggleRefundmModal = () => {
    setrefundModal(prevState => ({ isOpen: !prevState.isOpen }))
  }

  useEffect(() => {
    if (!fdOrder?.orderStatus) return
    const current = SERVICE_STATUS.find(s => s === fdOrder.orderStatus)
    if (current) {
      setInlineOrderStatus({
        label: props.t(current),
        value: current,
      })
    }
  }, [fdOrder?.orderStatus])

  const handleOrderStatusUpdate = orderStatus => {
    if (statusUpdateLoading || !orderStatus) return
    postFdOrderStatus({ _id: id, orderStatus }, () => {
      onGetFdOrder(id)
      toastr.success(props.t("success") || "Status updated")
    })
  }

  const handleInlineStatusUpdate = () => {
    if (statusUpdateLoading || !inlineOrderStatus?.value) return
    if (inlineOrderStatus.value === fdOrder?.orderStatus) {
      toastr.info(props.t("order_status") || "Status unchanged")
      return
    }
    handleOrderStatusUpdate(inlineOrderStatus.value)
  }

  const showLogisticsTracking = shouldShowLogisticsTracking(
    activeStoreType?.storeType,
    fdOrder
  )

  const confirmRefundmModal = () => {
    onGetFdOrder(id)

    setrefundModal(prevState => ({ isOpen: !prevState.isOpen }))
  }

  const toggleRefundTransactionModal = () => {
    setrefundTransactionModal(prevState => ({ isOpen: !prevState.isOpen }))
  }

  const removeConfirm = () => {
    const { addressId, isOpen } = confirmModal

    const onComplete = () => {
      onGetFdOrder(id)
    }

    setConfirmModal({ isOpen: !isOpen, addressId: null })
  }

  const breadcrumbvendortitle =
    settings?.slug == "topup-fuel"
      ? { title: "vendor" }
      : [slugname.dewe, slugname.zaza].includes(settings?.slug)
        ? { title: "store" }
        : {
          title: props.t(
            GET_SERVICE_NAME({
              storeType: activeStoreType?.storeType,
              name: "order_details",
            }) + "s"
          ),
        }

  const breadcrumbtitle = [slugname.dewe, slugname.zaza].includes(
    settings?.slug
  )
    ? props.t("store")
    : GET_SERVICE_NAME({
      storeType: activeStoreType?.storeType,
    })

  const vendorlabel = [slugname.dewe, slugname.zaza].includes(settings?.slug)
    ? props.t("store")
    : props.t(
      GET_SERVICE_NAME({
        storeType: activeStoreType?.storeType,
        name: "restaurant",
      })
    )

  // useEffect(() => {
  //   statusTrack?.map(item => {
  //     setOrderbar(item)
  //   })
  // }, [statusTrack])

  return (
    <React.Fragment>
      <RemoveConfirmModal
        isOpen={confirmModal.isOpen}
        toggle={toggleConfirmModal}
        onConfirm={removeConfirm}
      />
      <RefundModal
        orderId={id}
        isOpen={refundModal.isOpen}
        toggle={toggleRefundmModal}
        storeType={activeStoreType?.storeType}
        hasDriver={!!fdOrder?.driver}
        earnings={{
          admin: fdOrder?.adminEarning,
          vendor: fdOrder?.vendorEarning,
          driver: fdOrder?.deliveryBoyEarning,
        }}
        onConfirm={confirmRefundmModal}
        store={activeStoreType.storeType}
      />
      <RefundTransactionsModal
        isOpen={refundTransactionModal.isOpen}
        toggle={toggleRefundTransactionModal}
        data={fdOrder?.refundDetails || []}
      />

      <PreviewModal {...previewModal} toggle={togglePreviewModal} />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            breadcrumbItem={props.t(`Order Details`)}
            breadcrumbItems={
              !!vendor
                ? [
                  ...(activeStoreType?.storeVendorType !== "SINGLE" &&
                    props?.role !== ROLES.vendor
                    ? [
                      {
                        title: breadcrumbtitle + "s",
                        link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                          {
                            storeType: activeStoreType?.storeType,
                          }
                        ).toLowerCase()}s`,
                      },
                    ]
                    : []),
                  {
                    title:
                      (props?.role === ROLES.vendor
                        ? props.vendor_name
                        : vendor_name) || props.t("profile"),
                    link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                      {
                        storeType: activeStoreType?.storeType,
                      }
                    ).toLowerCase()}s/${vendor}/profile`,
                  },
                  {
                    title: props.t("orders"),
                    link: `/${activeStoreType?.storeType?.toLowerCase()}/orders${props?.location?.search
                      }`,
                  },
                  {
                    title: props.t(`order_details`),
                  },
                ]
                : [
                  // {
                  //   title: props.t("orders"),
                  //   link: `/${activeStoreType?.storeType?.toLowerCase()}/orders${
                  //     props?.location?.search
                  //   }`,
                  // },
                  // {
                  //   title: props.t(`order_details`),
                  // },
                  {
                    title: props.t(
                      GET_SERVICE_NAME({
                        storeType: activeStoreType?.storeType,
                        name: "order",
                      }) + "s"
                    ),
                    link: `/${activeStoreType?.storeType?.toLowerCase()}/orders${props?.location?.search
                      }`,
                  },
                  breadcrumbvendortitle,
                ]
            }
          />

          <Row className="spinner-content">
            {loading && <div className="spinner"></div>}

            <Col xl="4">
              <Card className="order-profile-details-card">
                <CardBody>
                  <div className="order-details-card d-flex justify-content-between flex-wrap">
                    <div className="pr-3 pb-3">
                      <h5 className="font-size-15 text-capitalize">
                        {fdOrder?.customOrderId || props.t("loading_text")}
                      </h5>
                      <p className="text-muted mb-0">
                        {activeStoreType?.storeType === "SERVICEPROVIDER"
                          ? props.t("booking_id")
                          : props.t("order_id")}
                      </p>
                    </div>

                    <div className="pr-3 pb-3">
                      <h5 className="font-size-15">
                        {moment(fdOrder.date_created_utc).format(
                          "DD MMM YYYY, LT"
                        )}
                      </h5>
                      <p className="text-muted mb-0">{props.t("created_at")}</p>
                    </div>

                    <div className="pr-3 pb-3">
                      <h5 className="font-size-15 text-capitalize">
                        <Badge
                          className={
                            "text-capitalize rounded font-size-12 badge-soft-" +
                            getOrderStatusBadgeSoftClass(fdOrder.orderStatus)
                          }
                          pill
                        >
                          {props.t(fdOrder.orderStatus)}
                        </Badge>
                      </h5>
                      <p className="text-muted mb-0">{props.t("status")}</p>
                    </div>

                    <div className="pr-3 pb-3">
                      <h5 className="font-size-15 text-capitalize">
                        {currency?.sign}
                        {fdOrder?.orderTotal || "0"}
                      </h5>
                      <p className="text-muted mb-0">
                        {activeStoreType?.storeType === "SERVICEPROVIDER"
                          ? props.t("booking_amount")
                          : props.t("order_amount")}
                      </p>
                    </div>

                    <div className="pr-3 pb-3">
                      <h5 className="font-size-15 text-capitalize">
                        {props.t(fdOrder?.paymentMethod || "")}
                      </h5>
                      <p className="text-muted mb-0">
                        {props.t("payment_method")}
                      </p>
                    </div>
                  </div>

                  <div className="order-profile-actions d-flex flex-wrap align-items-end pt-3 mt-2 border-top">
                    {!props.isOther && accesses.canEdit && (
                      <div className="order-profile-status-editor d-flex flex-wrap align-items-end mr-3 mb-2">
                        <div className="order-profile-status-select mr-2 mb-2">
                          <label className="text-muted font-size-12 mb-1 d-block">
                            {activeStoreType?.storeType === "SERVICEPROVIDER"
                              ? props.t("change_booking_status")
                              : props.t("change_order_status")}
                          </label>
                          <Select
                            classNamePrefix="order-status-select"
                            options={SERVICE_STATUS.map(value => ({
                              label: props.t(value),
                              value,
                            }))}
                            onChange={data => setInlineOrderStatus(data)}
                            value={inlineOrderStatus}
                            isDisabled={statusUpdateLoading}
                            menuPortalTarget={
                              typeof document !== "undefined"
                                ? document.body
                                : null
                            }
                            menuPosition="fixed"
                            styles={orderStatusSelectStyles}
                          />
                        </div>
                        <Button
                          color="primary"
                          size="sm"
                          className="mb-2"
                          disabled={
                            statusUpdateLoading || !inlineOrderStatus?.value
                          }
                          onClick={handleInlineStatusUpdate}
                        >
                          {statusUpdateLoading
                            ? props.t("loading_text")
                            : props.t("submit")}
                        </Button>
                      </div>
                    )}

                    {accesses.canEdit && (
                      <Button
                        color="outline-warning"
                        size="sm"
                        className="mr-2 mb-2"
                        onClick={() => {
                          if (fdOrder.orderStatus !== "refunded") {
                            toggleRefundmModal()
                          } else {
                            toastr.error(
                              "Amount has been already refunded "
                            )
                          }
                        }}
                      >
                        {props.t("refund")}
                      </Button>
                    )}

                    <Button
                      id="transactionstooltip"
                      color="outline-secondary"
                      size="sm"
                      className="mr-2 mb-2"
                      disabled={!fdOrder?.refundDetails?.length}
                      onClick={() => {
                        if (fdOrder?.refundDetails?.length > 0) {
                          toggleRefundTransactionModal()
                        }
                      }}
                    >
                      <i className="mdi mdi-bank-transfer mr-1" />
                      {props.t("transactions")}
                    </Button>
                    <UncontrolledTooltip
                      placement="top"
                      target="transactionstooltip"
                    >
                      {fdOrder?.refundDetails?.length <= 0
                        ? props.t("no_transactions")
                        : props.t("transactions")}
                    </UncontrolledTooltip>

                    {fdOrder?.orderStatus === "inroute" && (
                      <Button
                        tag={Link}
                        to={`/bird-eye-view?order=${fdOrder._id}`}
                        color="outline-info"
                        size="sm"
                        className="mr-2 mb-2"
                        id="viewtooltip"
                      >
                        {props.t("track")}
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>

              {!["SERVICEPROVIDER"].includes(
                activeStoreType?.storeType?.toUpperCase()
              ) && (
                  <DetailCard
                    type="vendor"
                    title={vendorlabel}
                    slugname={settings?.slug}
                    user={fdOrder?.vendor}
                    profileLink={`/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                      {
                        storeType: activeStoreType?.storeType,
                      }
                    ).toLowerCase()}s/${fdOrder?.vendor?._id}/profile`}
                    rating={fdOrder?.reviews?.customerToVendor}
                    demo={props?.demo}
                  />
                )}
              {fdOrder?.driver &&
                (fdOrder?.storeType?.storeType !== "SERVICEPROVIDER" ? (
                  <DetailCard
                    title={props.t("driver")}
                    user={fdOrder?.driver}
                    profileLink={`/drivers/${fdOrder?.driver?._id}/profile`}
                    rating={fdOrder?.reviews?.customerToDriver}
                  />
                ) : (
                  <DetailCard
                    title={props.t("service_provider")}
                    user={fdOrder?.driver}
                    profileLink={`/drivers/${fdOrder?.driver?._id}/profile`}
                    rating={fdOrder?.reviews?.customerToDriver}
                  />
                ))}

              <DetailCard
                type="user"
                title={props.t("customer")}
                user={fdOrder?.user}
                profileLink={
                  props?.role === ROLES.vendor
                    ? false
                    : `/customers/${fdOrder?.user?._id}/profile`
                }
                billingDetails={fdOrder?.billingDetails}
                rating={fdOrder?.reviews?.driverToCustomer}
                demo={props?.demo}
              />
            </Col>

            <Col xl="8">
              {showLogisticsTracking && (
                <OrderLogisticsTracking
                  t={props.t}
                  order={fdOrder}
                  orderId={id}
                  canEdit={!props.isOther && accesses.canEdit}
                  statusUpdateLoading={statusUpdateLoading}
                  onUpdateStatus={handleOrderStatusUpdate}
                  onRefreshOrder={() => onGetFdOrder(id)}
                />
              )}

              {fdOrder.orderStatus === "completed" && (
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
              )}

              <Card>
                <CardBody>
                  <ProductPreview
                    t={props.t}
                    orderDetail={fdOrder}
                    activeStore={activeStoreType?.storeType}
                    storeType={
                      activeStoreType?.storeType ||
                      fdOrder?.storeType?.storeType
                    }
                    vendorId={
                      fdOrder?.vendor?._id || fdOrder?.vendor || vendorIdParam
                    }
                    locationSearch={props.location?.search || ""}
                    discountTotal={fdOrder?.discountTotal}
                    deliveryType={fdOrder?.deliveryType}
                    currency={currency}
                    items={fdOrder?.line_items}
                    subTotal={fdOrder?.subTotal}
                    tip={fdOrder?.tip}
                    tipAmount={fdOrder?.tipAmount}
                    tax={{ tax: fdOrder?.taxAmount, taxAmount: fdOrder?.tax }}
                    deliveryFee={fdOrder?.deliveryFee}
                    isLoyaltyPointsUsed={fdOrder?.isLoyaltyPointsUsed}
                    redemptionValue={fdOrder?.redemptionValue}
                    total={fdOrder?.orderTotal}
                    orderInstructions={fdOrder?.orderInstructions}
                    coupon={fdOrder?.coupon}
                  />
                </CardBody>
              </Card>

              {(fdOrder?.job_proof?.before_image_url?.length > 0 ||
                fdOrder?.job_proof?.after_image_url?.length > 0) && (
                  <Card className="overflow-hidden">
                    {fdOrder?.job_proof?.before_image_url?.length > 0 && (
                      <CardBody>
                        {" "}
                        <div className="order-details-card d-flex justify-content-between flex-wrap">
                          <div className="pr-3 pb-3 w-100">
                            <h5 className="font-size-15 text-capitalize">
                              Before Service Images
                            </h5>
                          </div>
                          <div className="d-flex flex-wrap w-100">
                            {fdOrder?.job_proof?.before_image_url?.map(
                              (item, index) => (
                                <img
                                  className="me-2 mb-2 border"
                                  style={{
                                    width: "5rem",
                                    objectFit: "cover",
                                    height: "5rem",
                                    cursor: "pointer",
                                  }}
                                  src={item?.link}
                                  key={index}
                                  onClick={() => togglePreviewModal(item?.link)}
                                />
                              )
                            )}
                          </div>
                        </div>
                      </CardBody>
                    )}
                    {fdOrder?.job_proof?.after_image_url?.length > 0 && (
                      <CardBody>
                        {" "}
                        <div className="order-details-card d-flex justify-content-between flex-wrap">
                          <div className="pr-3 pb-3 w-100">
                            <h5 className="font-size-15 text-capitalize">
                              After Service Images
                            </h5>
                          </div>
                          <div className="d-flex flex-wrap w-100">
                            {fdOrder?.job_proof?.after_image_url?.map(
                              (item, index) => (
                                <img
                                  className="me-2 mb-2 border"
                                  style={{
                                    width: "5rem",
                                    objectFit: "cover",
                                    height: "5rem",
                                    cursor: "pointer",
                                  }}
                                  src={item?.link}
                                  key={index}
                                  onClick={() => togglePreviewModal(item?.link)}
                                />
                              )
                            )}
                          </div>
                        </div>
                      </CardBody>
                    )}
                  </Card>
                )}

              {/* Order status */}

              {showThings["orderTimeTrack"] &&
                [slugname.oneTimeShop].includes(settings?.slug) && (
                  <div className="trackingSystem">
                    <div className="card-title">
                      {" "}
                      {props.t("orders-status")}{" "}
                    </div>
                    <ul id="trackbar" className="mt-2 ms-0">
                      <li
                        className={
                          statusTrack?.[0]?.status == "cancelled"
                            ? "cancelled"
                            : statusTrack?.[0]?.status == "pending"
                              ? "active"
                              : ""
                        }
                      >
                        <div className="circle">
                          <svg
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 426.667 426.667"
                            style={{
                              enableBackground: "new 0 0 426.667 426.667",
                            }}
                            xmlSpace="preserve"
                          >
                            <g>
                              <g>
                                <path
                                  d="M421.876,56.307c-6.548-6.78-17.352-6.968-24.132-0.42c-0.142,0.137-0.282,0.277-0.42,0.42L119.257,334.375
                                                          l-90.334-90.334c-6.78-6.548-17.584-6.36-24.132,0.42c-6.388,6.614-6.388,17.099,0,23.713l102.4,102.4
                                                          c6.665,6.663,17.468,6.663,24.132,0L421.456,80.44C428.236,73.891,428.424,63.087,421.876,56.307z"
                                />
                              </g>
                            </g>
                          </svg>
                        </div>
                        <p className="m-0 fw-sbold">
                          {" "}
                          {statusTrack?.[0]?.status == "cancelled"
                            ? props.t("orders-cancelled")
                            : props.t("orders-created")}
                        </p>
                        <span className="d-block">
                          {statusTrack?.[0]?.date} {statusTrack?.[0]?.time}
                        </span>
                        <div className="rightarrow" />
                      </li>
                      <li
                        className={
                          statusTrack?.[1]?.status == "cancelled"
                            ? "cancelled"
                            : statusTrack?.[1]?.status == "confirmed"
                              ? "active"
                              : ""
                        }
                      >
                        <div className="circle">
                          <svg
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 426.667 426.667"
                            style={{
                              enableBackground: "new 0 0 426.667 426.667",
                            }}
                            xmlSpace="preserve"
                          >
                            <g>
                              <g>
                                <path
                                  d="M421.876,56.307c-6.548-6.78-17.352-6.968-24.132-0.42c-0.142,0.137-0.282,0.277-0.42,0.42L119.257,334.375
                                                          l-90.334-90.334c-6.78-6.548-17.584-6.36-24.132,0.42c-6.388,6.614-6.388,17.099,0,23.713l102.4,102.4
                                                          c6.665,6.663,17.468,6.663,24.132,0L421.456,80.44C428.236,73.891,428.424,63.087,421.876,56.307z"
                                />
                              </g>
                            </g>
                          </svg>
                        </div>
                        <p className="m-0 fw-sbold">
                          {" "}
                          {statusTrack?.[1]?.status == "cancelled"
                            ? props.t("orders-cancelled")
                            : props.t("orders-confirm")}{" "}
                        </p>
                        <span className="d-block">
                          {" "}
                          {statusTrack?.[1]?.date} {statusTrack?.[1]?.time}
                        </span>
                        <div className="rightarrow" />
                      </li>
                      <li
                        className={
                          statusTrack?.[2]?.status == "cancelled"
                            ? "cancelled"
                            : statusTrack?.[2]?.status == "pickupInroute"
                              ? "active"
                              : ""
                        }
                      >
                        <div className="circle">
                          <svg
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 426.667 426.667"
                            style={{
                              enableBackground: "new 0 0 426.667 426.667",
                            }}
                            xmlSpace="preserve"
                          >
                            <g>
                              <g>
                                <path
                                  d="M421.876,56.307c-6.548-6.78-17.352-6.968-24.132-0.42c-0.142,0.137-0.282,0.277-0.42,0.42L119.257,334.375
                                                          l-90.334-90.334c-6.78-6.548-17.584-6.36-24.132,0.42c-6.388,6.614-6.388,17.099,0,23.713l102.4,102.4
                                                          c6.665,6.663,17.468,6.663,24.132,0L421.456,80.44C428.236,73.891,428.424,63.087,421.876,56.307z"
                                />
                              </g>
                            </g>
                          </svg>
                        </div>
                        <p className="m-0 fw-sbold">
                          {" "}
                          {statusTrack?.[2]?.status == "cancelled"
                            ? props.t("orders-cancelled")
                            : props.t("driver-assign")}{" "}
                        </p>
                        <span className="d-block">
                          {" "}
                          {statusTrack?.[2]?.date} {statusTrack?.[2]?.time}
                        </span>
                        <div className="rightarrow" />
                      </li>
                      <li
                        className={
                          statusTrack?.[3]?.status == "cancelled"
                            ? "cancelled"
                            : statusTrack?.[3]?.status == "pickupArrived"
                              ? "active"
                              : ""
                        }
                      >
                        <div className="circle">
                          <svg
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 426.667 426.667"
                            style={{
                              enableBackground: "new 0 0 426.667 426.667",
                            }}
                            xmlSpace="preserve"
                          >
                            <g>
                              <g>
                                <path
                                  d="M421.876,56.307c-6.548-6.78-17.352-6.968-24.132-0.42c-0.142,0.137-0.282,0.277-0.42,0.42L119.257,334.375
                                                          l-90.334-90.334c-6.78-6.548-17.584-6.36-24.132,0.42c-6.388,6.614-6.388,17.099,0,23.713l102.4,102.4
                                                          c6.665,6.663,17.468,6.663,24.132,0L421.456,80.44C428.236,73.891,428.424,63.087,421.876,56.307z"
                                />
                              </g>
                            </g>
                          </svg>
                        </div>
                        <p className="m-0 fw-sbold">
                          {" "}
                          {statusTrack?.[3]?.status == "cancelled"
                            ? props.t("orders-cancelled")
                            : "Driver Arrived "}{" "}
                        </p>
                        <span className="d-block">
                          {" "}
                          {statusTrack?.[3]?.date} {statusTrack?.[3]?.time}
                        </span>
                        <div className="rightarrow" />
                      </li>
                      <li
                        className={
                          statusTrack?.[4]?.status == "cancelled"
                            ? "cancelled"
                            : statusTrack?.[4]?.status == "inroute"
                              ? "active"
                              : ""
                        }
                      >
                        <div className="circle">
                          <svg
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 426.667 426.667"
                            style={{
                              enableBackground: "new 0 0 426.667 426.667",
                            }}
                            xmlSpace="preserve"
                          >
                            <g>
                              <g>
                                <path
                                  d="M421.876,56.307c-6.548-6.78-17.352-6.968-24.132-0.42c-0.142,0.137-0.282,0.277-0.42,0.42L119.257,334.375
                                                          l-90.334-90.334c-6.78-6.548-17.584-6.36-24.132,0.42c-6.388,6.614-6.388,17.099,0,23.713l102.4,102.4
                                                          c6.665,6.663,17.468,6.663,24.132,0L421.456,80.44C428.236,73.891,428.424,63.087,421.876,56.307z"
                                />
                              </g>
                            </g>
                          </svg>
                        </div>
                        <p className="m-0 fw-sbold">
                          {" "}
                          {statusTrack?.[4]?.status == "cancelled"
                            ? props.t("orders-cancelled")
                            : props.t("on-the-way")}{" "}
                        </p>
                        <span className="d-block">
                          {" "}
                          {statusTrack?.[4]?.date} {statusTrack?.[4]?.time}
                        </span>
                        <div className="rightarrow" />
                      </li>
                      <li
                        className={
                          statusTrack?.[5]?.status == "cancelled"
                            ? "cancelled"
                            : statusTrack?.[5]?.status == "completed"
                              ? "active"
                              : ""
                        }
                      >
                        <div className="circle">
                          <svg
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 426.667 426.667"
                            style={{
                              enableBackground: "new 0 0 426.667 426.667",
                            }}
                            xmlSpace="preserve"
                          >
                            <g>
                              <g>
                                <path
                                  d="M421.876,56.307c-6.548-6.78-17.352-6.968-24.132-0.42c-0.142,0.137-0.282,0.277-0.42,0.42L119.257,334.375
                                                          l-90.334-90.334c-6.78-6.548-17.584-6.36-24.132,0.42c-6.388,6.614-6.388,17.099,0,23.713l102.4,102.4
                                                          c6.665,6.663,17.468,6.663,24.132,0L421.456,80.44C428.236,73.891,428.424,63.087,421.876,56.307z"
                                />
                              </g>
                            </g>
                          </svg>
                        </div>
                        <p className="m-0 fw-sbold">
                          {" "}
                          {statusTrack?.[5]?.status == "cancelled"
                            ? props.t("orders-cancelled")
                            : props.t("orders-completed")}{" "}
                        </p>
                        <span className="d-block">
                          {" "}
                          {statusTrack?.[5]?.date} {statusTrack?.[5]?.time}
                        </span>
                      </li>
                    </ul>
                  </div>
                )}

              {fdOrder?.orderInstructions && (
                <Card>
                  <CardBody>
                    <CardTitle> {props.t("order-instructions")}</CardTitle>
                    {fdOrder?.orderInstructions}
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

OrderProfile.propTypes = {
  userProfile: PropTypes.any,
  onGetFdOrder: PropTypes.func,
  loading: PropTypes.bool,
}

const mapStateToProps = ({ Login, FD_Orders, Settings, Billing }) => ({
  role: Login?.user?.role || "",
  vendor_name: Login?.user?.name,
  isOther: Login.isOther,
  fdOrder: FD_Orders.fdOrder,
  fd: FD_Orders,
  userProfile: {},
  loading: FD_Orders.loading,
  statusUpdateLoading: FD_Orders.loading,
  currency: Settings?.settings?.currency,
  settings: Settings.settings,
  plan: Billing.currentPlan.billingPlan,
  accessLevels: Login.user.accessLevel?.permissions || [],
  demo: Settings.settings?.demo,
  statusTrack: FD_Orders.fdOrder?.statusTrack,
})

const mapDispatchToProps = {
  onGetFdOrder: getFdOrder,
  postFdOrderStatus,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(OrderProfile)))
