import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter, useParams } from "react-router-dom"
import { map } from "lodash"
import toastr from "toastr"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
  Badge,
} from "reactstrap"
import moment from "moment-timezone"
import queryString from "query-string"
import { useShowThings } from "helpers/show-things"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

// Contants
import { ROLES, GET_SERVICE_NAME, SLUGS_NAME } from "helpers/contants"
import { getOrderStatusBadgeSoftClass } from "helpers/orderStatusBadge"

//Import mini card widgets
import MiniCards from "./mini-card"

// import charts
import { getFdOrder } from "store/actions"
import DetailCard from "./DetailCard"
import RemoveConfirmModal from "./RemoveConfirmModal"
import ProductPreview from "./ProductPreview"
import RefundModal from "./RefundModal"
import OrderStatusModal from "./OrderStatusModal"
import RefundTransactionsModal from "./RefundTransactions"

const OrderProfile = ({
  accessLevel,
  loading,
  userProfile,
  fdOrder,
  onGetFdOrder,
  activeStoreType,
  currency,
  distanceUnit,
  statusTrack,
  ...props
}) => {
  console.log(statusTrack, "statusTrack")
  const { id } = useParams()
  const { vendor_name, vendor, driver, customer } = queryString.parse(
    props?.location?.search
  )

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
  })
  // eslint-disable-next-line no-unused-vars

  // console.log("fdOrder", fdOrder)
  const [miniCards, setMiniCards] = useState([
    {
      title: props.t("driver_earning"),
      iconClass: "bx bx-dollar-circle",
      text: currency?.sign + "0",
    },
    ...(props?.role !== ROLES.vendor
      ? [
          {
            title: props.t("admin_earning"),
            iconClass: "bx bx-dollar-circle",
            text: currency?.sign + "0",
          },
        ]
      : []),
    ...(props?.tollGuru && fdOrder?.isTollTax
      ? [
          {
            title: props.t("toll_tax"),
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
  const [orderStatusModal, setorderStatusModal] = useState({ isOpen: false })
  const [refundModal, setrefundModal] = useState({
    isOpen: false,
  })
  const [refundTransactionModal, setrefundTransactionModal] = useState({
    isOpen: false,
  })
  const showThings = useShowThings()

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

    props.history.replace(`${activeStoreType?.storeType?.toLowerCase()}/trips`)
  }, [onGetFdOrder, id])

  useEffect(() => {
    if (fdOrder) {
      setMiniCards([
        {
          title: props.t("driver_earning"),
          iconClass: "bx bx-dollar-circle",
          text: currency?.sign + (fdOrder?.deliveryBoyEarning?.toFixed(2) || 0),
        },
        ...(props?.role !== ROLES.vendor
          ? [
              {
                title: props.t("admin_earning"),
                iconClass: "bx bx-dollar-circle",
                text: currency?.sign + (fdOrder?.adminEarning || 0),
              },
            ]
          : []),
        ...(props?.tollGuru && fdOrder?.isTollTax
          ? [
              {
                title: props.t("toll_tax"),
                iconClass: "bx bx-dollar-circle",
                text: currency?.sign + (fdOrder?.tollTaxCost || 0),
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

  const toggleOrderStatusModal = () => {
    setorderStatusModal(prevState => ({ isOpen: !prevState.isOpen }))
  }

  const confirmOrderStatusModal = () => {
    onGetFdOrder(id)

    setorderStatusModal(prevState => ({ isOpen: !prevState.isOpen }))
  }

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
      />
      <OrderStatusModal
        orderId={id}
        isOpen={orderStatusModal.isOpen}
        orderDetails={fdOrder}
        toggle={toggleOrderStatusModal}
        onConfirm={confirmOrderStatusModal}
      />
      <RefundTransactionsModal
        isOpen={refundTransactionModal.isOpen}
        toggle={toggleRefundTransactionModal}
        data={fdOrder?.refundDetails || []}
      />

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
                      title: props.t("trips"),
                      link: `/${activeStoreType?.storeType?.toLowerCase()}/trip${
                        props?.location?.search
                      }`,
                    },
                    {
                      title: props.t(`trip_details`),
                    },
                  ]
                : [
                    {
                      title: props.t("trips"),
                      link: `/${activeStoreType?.storeType?.toLowerCase()}/trip${
                        props?.location?.search
                      }`,
                    },
                    {
                      title: props.t(`trip_details`),
                    },
                  ]
            }
          />

          <Row className="spinner-content">
            {loading && <div className="spinner"></div>}

            <Col xl="4">
              <Card className="overflow-hidden">
                <CardBody>
                  <div className="order-details-card d-flex justify-content-between flex-wrap">
                    <div className="pr-3 pb-3">
                      <h5 className="font-size-15 text-capitalize">
                        {fdOrder?.customOrderId || props.t("loading_text")}
                      </h5>
                      <p className="text-muted mb-0">{props.t("order_id")}</p>
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
                        {props.t("order_amount")}
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

                    {accesses?.canEdit && (
                      <div className="pr-3 pb-3">
                        <h5 className="font-size-15 text-capitalize">
                          <Link
                            to={"#"}
                            onClick={e => {
                              e.preventDefault()
                              fdOrder.orderStatus !== "refunded"
                                ? toggleRefundmModal()
                                : toastr.error(
                                    "Amount has been already refunded "
                                  )
                            }}
                            className="waves-effect waves-light p-0"
                          >
                            {props.t("refund")}
                          </Link>
                        </h5>
                      </div>
                    )}

                    <div className="pr-3 pb-3">
                      <h5 className="font-size-15 text-capitalize">
                        <Link
                          to="#"
                          id="transactionstooltip"
                          onClick={e => {
                            e.preventDefault()
                            if (fdOrder?.refundDetails?.length <= 0) return
                            toggleRefundTransactionModal()
                          }}
                          className={
                            fdOrder?.refundDetails?.length <= 0
                              ? "text-muted"
                              : ""
                          }
                        >
                          <i className="mdi mdi-bank-transfer font-size-18" />
                        </Link>

                        <UncontrolledTooltip
                          placement="top"
                          target="transactionstooltip"
                        >
                          {fdOrder?.refundDetails?.length <= 0
                            ? props.t("no_transactions")
                            : props.t("transactions")}
                        </UncontrolledTooltip>
                      </h5>
                      <p className="text-muted mb-0">{props.t("refunds")}</p>
                    </div>

                    {fdOrder?.orderStatus === "inroute" && (
                      <div className="pr-3 pb-3">
                        <h5 className="font-size-15 text-capitalize">
                          <Link
                            id="viewtooltip"
                            // aria-disabled={fdOrder?.orderStatus !== "inroute"}
                            to={`/bird-eye-view?order=${fdOrder._id}`}
                            // className={`waves-effect waves-light p-0 ${
                            // fdOrder?.orderStatus !== "inroute"
                            // ? "text-muted"
                            // : ""
                            // }`}
                            className={`waves-effect waves-light p-0`}
                          >
                            {props.t("track")}
                          </Link>

                          {fdOrder?.orderStatus !== "inroute" && (
                            <UncontrolledTooltip
                              placement="top"
                              target="viewtooltip"
                            >
                              {props.t("track_enable_guide")}
                            </UncontrolledTooltip>
                          )}
                        </h5>
                      </div>
                    )}

                    {!props.isOther && accesses?.canEdit && (
                      <div className="pr-3 pb-3">
                        <h5 className="font-size-15 text-capitalize">
                          <Link
                            id="update-orderstatus-tooltip"
                            to={"#"}
                            onClick={e => {
                              e.preventDefault()
                              toggleOrderStatusModal()
                            }}
                            className="waves-effect waves-light p-0"
                          >
                            {props.t("change_order_status")}
                          </Link>

                          <UncontrolledTooltip
                            placement="top"
                            target="update-orderstatus-tooltip"
                          >
                            {props.t("change_order_status")}
                          </UncontrolledTooltip>
                        </h5>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>

              {fdOrder?.driver && (
                <DetailCard
                  title={props.t("driver")}
                  user={fdOrder?.driver}
                  profileLink={`/drivers/${fdOrder?.driver?._id}/profile`}
                  rating={fdOrder?.reviews?.customerToDriver}
                />
              )}

              {fdOrder?.oldDriver && fdOrder?.scheduledType === "scheduled" && (
                <DetailCard
                  title={props.t("old_driver")}
                  user={fdOrder?.oldDriver}
                  profileLink={`/drivers/${fdOrder?.oldDriver?._id}/profile`}
                  rating={""}
                />
              )}

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
                demo={props.demo}
              />
            </Col>

            <Col xl="8">
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
                    currency={currency}
                    storeType={
                      activeStoreType?.storeType ||
                      fdOrder?.storeType?.storeType
                    }
                    vendorId={fdOrder?.vendor?._id || fdOrder?.vendor}
                    locationSearch={props.location?.search || ""}
                    discountTotal={fdOrder?.discountTotal}
                    distanceUnit={distanceUnit}
                    fdOrder={fdOrder}
                    items={fdOrder?.line_items}
                    subTotal={fdOrder?.subTotal}
                    tip={fdOrder?.tip}
                    tipAmount={fdOrder?.tipAmount}
                    tax={{ tax: fdOrder?.taxAmount, taxAmount: fdOrder?.tax }}
                    deliveryFee={fdOrder?.deliveryFee}
                    isLoyaltyPointsUsed={fdOrder?.isLoyaltyPointsUsed}
                    redemptionValue={fdOrder?.redemptionValue}
                    total={fdOrder?.orderTotal}
                    coupon={fdOrder?.coupon}
                    orderInstructions={fdOrder?.orderInstructions}
                    couponAmount={fdOrder?.couponAmount}
                    couponType={fdOrder?.couponType}
                    couponDiscount={fdOrder?.couponDiscount}
                    slug={props?.slug}
                    tollGuru={props?.tollGuru}

                    // subTotal={fdOrder?.subTotal}
                  />
                </CardBody>
              </Card>

              {/* order status */}

              {showThings["orderTimeTrack"] &&
                [SLUGS_NAME.oneTimeShop].includes(props?.slug) && (
                  <div className="trackingSystem">
                    <div className="card-title">{props.t("trips-status")}</div>
                    <ul
                      id="trackbar"
                      className="mt-3 ms-0 justify-content-start"
                    >
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
                            ? props.t("trips-cancelled")
                            : props.t("trips-created")}
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
                            : statusTrack?.[1]?.status == "pickupInroute"
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
                            ? props.t("trips-cancelled")
                            : props.t("driver-assign")}
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
                            : statusTrack?.[2]?.status == "pickupArrived"
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
                            ? props.t("trips-cancelled")
                            : props.t("driver-arrived")}
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
                            : statusTrack?.[3]?.status == "inroute"
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
                            ? props.t("trips-cancelled")
                            : props.t("on-the-way")}{" "}
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
                            : statusTrack?.[4]?.status == "completed"
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
                            ? props.t("trips-cancelled")
                            : props.t("trips-completed")}
                        </p>
                        <span className="d-block">
                          {" "}
                          {statusTrack?.[4]?.date} {statusTrack?.[4]?.time}
                        </span>
                      </li>
                    </ul>
                  </div>
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

const mapStateToProps = ({ Login, FD_Orders, Settings }) => ({
  role: Login?.user?.role || "",
  vendor_name: Login?.user?.name,
  isOther: Login.isOther,
  fdOrder: FD_Orders.fdOrder,
  userProfile: {},
  loading: FD_Orders.loading,
  currency: Settings?.settings?.currency,
  distanceUnit: Settings?.settings?.distanceUnit,
  demo: Settings?.settings?.demo,
  statusTrack: FD_Orders.fdOrder?.statusTrack,
  slug: Settings?.settings?.slug,
  tollGuru: Settings?.settings?.tollGuru?.status,
})

const mapDispatchToProps = dispatch => ({
  onGetFdOrder: data => dispatch(getFdOrder(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(OrderProfile)))
