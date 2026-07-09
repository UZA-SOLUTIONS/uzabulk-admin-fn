import React from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Row,
  Label,
  UncontrolledTooltip,
  Badge,
} from "reactstrap"
import moment from "moment"
import { getOrderStatusBadgeSoftClass } from "helpers/orderStatusBadge"

const CardInvoice = ({ data, currency, toggleDetailsModal, activestore, t }) => {

  const deliveryTypename = (name) => {
    if (name == "DELIVERY") return "Delivery"
    if (name == "TAKEAWAY") return "Takeaway"
    return name
  }

  return (
    <Col xl="4" sm="6" className="mb-4">
      <Link
        to="#"
        onClick={e => {
          e.preventDefault()

          toggleDetailsModal(data)
        }}
      >
        <Card className="h-100 mb-0">
          <CardBody>
            <div className="w-100 d-inline-flex justify-content-between">
              <Link
                to={"#"}
                className="d-block text-primary mb-2"
                onClick={e => {
                  e.preventDefault()

                  toggleDetailsModal(data)
                }}
              >
                #{data?.customOrderId}
              </Link>

              {data?.orderStatus === "confirmed" && (
                <Badge
                  className={
                    "text-capitalize font-size-13 mb-2 badge-soft-" +
                    getOrderStatusBadgeSoftClass("confirmed")
                  }
                  color={data.badgeClass}
                >
                  {t(data?.isOrderMarkReady ? "order_ready" : data.orderStatus)}
                </Badge>
              )}

              {data?.orderStatus === "inroute" && (
                <Badge
                  className={
                    "text-capitalize font-size-13 mb-2 badge-soft-info"
                  }
                  color={data.badgeClass}
                >
                  {t("on_way")}
                </Badge>
              )}

              {["pending", "completed", "cancelled", "rejected"].includes(
                data?.orderStatus
              ) &&
                data?.orderStatus !== "confirmed" &&
                data?.orderStatus !== "inroute" && (
                  <Badge
                    className={
                      "text-capitalize font-size-13 mb-2 badge-soft-" +
                      getOrderStatusBadgeSoftClass(data.orderStatus)
                    }
                    color={data.badgeClass}
                  >
                    {t(data.orderStatus)}
                  </Badge>
                )}
            </div>

            {data?.isDriverAssign && <div>{`Driver Status  : Assigned`}</div>}
            {data?.deliveryType && <p>{`Delivery Type  : ${deliveryTypename(data?.deliveryType)}`}</p>}

            {data?.line_items?.slice(0, 2)?.map((item, itemKey) => (
              <div className="w-100 d-inline-flex">
                <h5 className="w-75 text-truncate">{item?.name}</h5>
                <div className="w-25 text-muted">
                  <div className="float-right">
                    {currency?.sign}
                    {item?.price} x {item?.quantity}
                  </div>
                </div>
              </div>
            ))}

            {data?.line_items?.length > 2 && (
              <Link
                to={"#"}
                className="d-block text-primary mb-2"
                onClick={e => {
                  e.preventDefault()

                  toggleDetailsModal(data)
                }}
              >
                {t("view_all")}
              </Link>
            )}

            <ul className="list-inline mt-3 mb-0">
              {data?.deliveryType?.toUpperCase() != "TAKEAWAY" && (
                <>
                  <li className="list-inline-item w-100">
                    <h5
                      className="font-size-14 text-truncate"
                      id={`deliveryTooltip_${data?._id}`}
                    >
                      <i className="mdi mdi-truck-delivery mr-1 text-primary" />
                      {!!data?.billingDetails
                        ? data?.billingDetails?.address
                        : data?.customerDetails?.address}
                      <UncontrolledTooltip
                        placement="top"
                        target={`deliveryTooltip_${data?._id}`}
                      >
                        {t("delivery_address")}:{" "}
                        {!!data?.billingDetails
                          ? data?.billingDetails?.address
                          : data?.customerDetails?.address}

                      </UncontrolledTooltip>
                    </h5>
                  </li>

                  <li className="list-inline-item">
                    <h5
                      className="font-size-14"
                      id={`delivery-area-Tooltip_${data?._id}`}
                    >
                      <i className="bx bx-area mr-1 text-primary" />
                      {!!data?.billingDetails
                        ? data?.billingDetails.area
                        : data?.customerDetails?.area}
                      <UncontrolledTooltip
                        placement="top"
                        target={`delivery-area-Tooltip_${data?._id}`}
                      >
                        {t("area")}:{" "}
                        {!!data?.billingDetails
                          ? data?.billingDetails.area
                          : data?.customerDetails?.area}
                      </UncontrolledTooltip>
                    </h5>
                  </li>

                  <li className="list-inline-item">
                    <h5
                      className="font-size-14"
                      id={`delivery-houseNo-Tooltip_${data?._id}`}
                    >
                      <i className="bx bx-building-house mr-1 text-primary" />
                      {!!data?.billingDetails
                        ? data?.billingDetails.houseNo
                        : data?.customerDetails?.houseNo}
                      <UncontrolledTooltip
                        placement="top"
                        target={`delivery-houseNo-Tooltip_${data?._id}`}
                      >
                        {t("house_no")}:{" "}
                        {!!data?.billingDetails
                          ? data?.billingDetails.houseNo
                          : data?.customerDetails?.houseNo}
                      </UncontrolledTooltip>
                    </h5>
                  </li>

                  <li className="list-inline-item">
                    <h5
                      className="font-size-14"
                      id={`delivery-landmark-Tooltip_${data?._id}`}
                    >
                      <i className="bx bxs-landmark mr-1 text-primary" />
                      {!!data?.billingDetails
                        ? data?.billingDetails.landmark
                        : data?.customerDetails?.landmark}
                      <UncontrolledTooltip
                        placement="top"
                        target={`delivery-landmark-Tooltip_${data?._id}`}
                      >
                        {t("landmark")}:{" "}
                        {!!data?.billingDetails
                          ? data?.billingDetails.landmark
                          : data?.customerDetails?.landmark}
                      </UncontrolledTooltip>
                    </h5>
                  </li>
                </>
              )}

              <li className="list-inline-item mr-3">
                <h5 className="font-size-14" id={`userTooltip_${data?._id}`}>
                  <i className="bx bx-user mr-1 text-primary" />
                  {data?.customerDetails?.name?.slice(0, 13)}
                  <UncontrolledTooltip
                    placement="top"
                    target={`userTooltip_${data?._id}`}
                  >
                    {t("customer")}: {data?.customerDetails?.name}
                  </UncontrolledTooltip>
                </h5>
              </li>

              <li className="list-inline-item mr-3">
                <h5 className="font-size-14" id={`amountTooltip_${data?._id}`}>
                  <i className="bx bx-money mr-1 text-primary" />
                  {currency?.sign + data?.orderTotal}
                  <UncontrolledTooltip
                    placement="top"
                    target={`amountTooltip_${data?._id}`}
                  >
                    {t("amount")}
                  </UncontrolledTooltip>
                </h5>
              </li>

              {data?.scheduledType === "scheduled" && (
                <li className="list-inline-item">
                  <h5 className="font-size-14">
                    <i className="bx bx-timer mr-1 text-primary" />
                    {t("scheduled_order")}
                  </h5>
                </li>
              )}

              <li className="list-inline-item">
                <h5 className="font-size-14" id={`duedateTooltip_${data?._id}`}>
                  <i className="bx bx-calendar mr-1 text-primary" />
                  {moment(data?.date_created_utc).format("DD MMM YYYY, LT")}
                  <UncontrolledTooltip
                    placement="top"
                    target={`duedateTooltip_${data?._id}`}
                  >
                    {t(
                      data?.scheduledType === "scheduled"
                        ? "schedule_at"
                        : "created_at"
                    )}
                  </UncontrolledTooltip>
                </h5>
              </li>
              {activestore === "CARRENTAL" &&
                <li className="list-inline-item mr-3">
                  <h5 className="font-size-14" id={`plantripTooltip_${data?._id}`}>
                    <i className="bx bx-calendar mr-1 text-primary" />
                    {moment(data?.checkInDate_utc).format("DD MMM YYYY") || ""}
                    <UncontrolledTooltip
                      placement="top"
                      target={`plantripTooltip_${data?._id}`}
                    >
                      {t("plan_trip")}
                    </UncontrolledTooltip>
                  </h5>
                </li>}
              {activestore === "CARRENTAL" &&
                <li className="list-inline-item mr-3">
                  <h5 className="font-size-14" id={`endtripTooltip_${data?._id}`}>
                    <i className="bx bx-calendar mr-1 text-primary" />
                    {moment(data?.checkOutDate_utc).format("DD MMM YYYY") || ""}
                    <UncontrolledTooltip
                      placement="top"
                      target={`endtripTooltip_${data?._id}`}
                    >
                      {t("end_trip")}
                    </UncontrolledTooltip>
                  </h5>
                </li>}
            </ul>
          </CardBody>
        </Card>
      </Link>
    </Col>
  )
}

export default CardInvoice
