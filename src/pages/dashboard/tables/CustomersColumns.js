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

const CustomersColumns = t => [
  {
    dataField: "name",
    text: t("name"),
    sort: true,
    formatter: (cellContent, row) => (
      <Link
        to={`/customers/${row._id}/profile`}
        className="text-body font-weight-bold"
      >
        <span id="view-nametooltip">{row.name}</span>

        <UncontrolledTooltip placement="top" target="view-nametooltip">
          {t("view_details")}
        </UncontrolledTooltip>
      </Link>
    ),
  },
  {
    dataField: "email",
    text: t("email"),
  },
  {
    dataField: "mobileNumber",
    text: t("mobile"),
    formatter: (_, row) => row.countryCode + " " + row.mobileNumber,
  },
  {
    dataField: "status",
    text: t("status"),
    formatter: (cellContent, row) => (
      <Badge
        className={
          "text-capitalize font-size-13 badge-soft-" +
          (row.status == "active"
            ? "success"
            : row.status == "inactive"
            ? "warning"
            : "danger")
        }
        color={row.badgeClass}
      >
        {t(row.status)}
      </Badge>
    ),
  },
  {
    text: t("registered_at"),
    dataField: "createdAt",
    sort: true,
    formatter: (_, row) => moment(row.date_created_utc).format("DD MMM YYYY"),
  },
]

export default CustomersColumns
