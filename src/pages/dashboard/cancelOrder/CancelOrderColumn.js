import React from "react"
import { Link } from "react-router-dom"
import { Badge, Input, Label, UncontrolledTooltip } from "reactstrap"
import moment from "moment-timezone"

export const selectRow = props => ({
  mode: "checkbox",
  clickToSelect: false,
  selectionHeaderRenderer: ({ indeterminate, mode, ...rest }) => (
    <div className="custom-control custom-checkbox">
      <Input
        type="checkbox"
        className="custom-control-input"
        ref={input => {
          if (input) input.indeterminate = indeterminate
        }}
        {...rest}
      />
      <Label className="custom-control-label">&nbsp;</Label>
    </div>
  ),
  selectionRenderer: ({ mode, rowKey, ...rest }) => (
    <div className="custom-control custom-checkbox" key={rowKey}>
      <input type="checkbox" className="custom-control-input" {...rest} />
      <Label className="custom-control-label">&nbsp;</Label>
    </div>
  ),
  ...props,
})

// const OrderColumns = t => [
const OrderColumns = ({ currentUrl, t, sign, slug }) => [
  {
    dataField: "Name",
    text: t("name"),
    sort: true,
    formatter: (cellContent, row) =>
      ["TAXI", "PICKUPDROP"].includes(row?.storeType?.storeType) ? (
        <Link
          to={`/${
            !currentUrl ? row?.storeType?.storeType?.toLowerCase() : currentUrl
          }/trip/${row?._id}/profile`}
          className="mr-3 text-primary"
        >
          <span id={`view-${row?.orderId}-nametooltip`}>
            {row?.customOrderId}
          </span>

          <UncontrolledTooltip
            placement="top"
            target={`view-${row?.orderId}-nametooltip`}
          >
            {t("view")}
          </UncontrolledTooltip>
        </Link>
      ) : (
        <Link
          to={`/${
            !currentUrl ? row?.storeType?.storeType?.toLowerCase() : currentUrl
          }/orders/${row._id}/profile`}
          className="mr-3 text-primary"
        >
          {row?.customOrderId}
        </Link>
      ),
  },

  {
    dataField: "Order Total",

    text: t("order_total"),
    formatter: (_, row) => (
      <p className="m-0 text-capitalize">
        {" "}
        {sign}
        {row.orderTotal}
      </p>
    ),
  },
  {
    dataField: "Customer",

    text: t("customer"),
    formatter: (_, row) => (
      <p className="m-0 text-capitalize"> {row?.customerDetails?.name}</p>
    ),
  },
  {
    dataField: "scheduledType",

    text: t("service_type"),
    formatter: (_, row) => (
      <p className="m-0 text-capitalize">
        {t(row?.scheduledType === "scheduled" ? "scheduled" : "instant")}
      </p>
    ),
  },
  {
    dataField: "Status",
    text: t("status"),
    formatter: (_, row) => (
      <Badge
        className={
          "text-capitalize font-size-13 badge-soft-" +
          (row.status === "close"
            ? "success"
            : row.status === "open"
            ? "warning"
            : "danger")
        }
        color={row?.pickUp?.address}
      >
        {row?.orderStatus}
      </Badge>
    ),
  },
  {
    dataField: "Store Type ",
    text: t("store_type"),
    formatter: (cellContent, row) => (
      <p className="m-0 text-capitalize">
        {" "}
        {slug == "topup-fuel" ? "FUEL" : row?.storeType?.storeType}
      </p>
    ),
  },
  {
    dataField: "Created ",
    text: t("created_at"),
    formatter: (cellContent, row) => (
      <p className="m-0 text-capitalize"> {row?.time_created}</p>
    ),
  },
]

export default OrderColumns
