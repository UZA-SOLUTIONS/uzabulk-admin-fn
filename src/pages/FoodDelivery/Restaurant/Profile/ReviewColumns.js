import React from "react"
import { Link } from "react-router-dom"
import { Badge, Input, Label, UncontrolledTooltip } from "reactstrap"
import moment from "moment-timezone"

// Contants
import { GET_SERVICE_NAME } from "helpers/contants"

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

const ListColumns = ({
  t,
  isVendor = false,
}) => [
    {
      dataField: "customOrderId",
      text: t("order_id"),
      sort: true,
      formatter: (_, row) =>
        isVendor ? (
          row?.order?.customOrderId
        ) : (
          <Link
            to={`/${row.order?.storeType?.storeType?.toLowerCase()}/orders/${row.order?._id}/profile`}
            className="mr-3 text-primary"
          >
            {row?.order?.customOrderId}
          </Link>
        ),
    },
    {
      dataField: "user",
      text: t("review_by"),
      formatter: (_, row) =>
        isVendor ? (
          row?.reviewed_by?.name
        ) : (
          <Link
            to={row.reviewed_by?.role === "USER" ? `/customers/${row.reviewed_by?._id}/profile` : "/drivers/${row.reviewed_by?._id}/profile"}
            className="text-body font-weight-bold"
          >
            <span id={`view-${row._id}-usertooltip`}>
              {row?.reviewed_by?.name}
            </span>

            <UncontrolledTooltip
              placement="top"
              target={`view-${row._id}-usertooltip`}
            >
              {t("view_details")}
            </UncontrolledTooltip>
          </Link>
        ),
    },
    {
      dataField: "rating",
      text: t("rating"),
    },
    {
      dataField: "review",
      text: t("review"),
    },
    {
      text: t("created_at"),
      dataField: "date_created_utc",
      sort: true,
      formatter: (_, row) =>
        moment(row.date_created_utc).format("DD MMM YYYY, LT"),
    },
  ]

export default ListColumns
