import React from "react"
import { Badge, Input, Label } from "reactstrap"
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

const formatDateTime = value => {
  if (!value || !moment(value).isValid()) return "-"
  return moment(value).format("DD MMM YYYY, LT")
}

const getStatusBadge = status => {
  if (status === "completed") return "success"
  if (status === "processing") return "warning"
  if (status === "already exist") return "info"
  return "danger"
}

const ListColumns = (history, toggleConfirmModal, accesses, t) => [
  {
    text: t("offerId"),
    dataField: "offerId",
    formatter: (_, row) => row?.offerId || "-",
  },
  {
    dataField: "status",
    text: t("status"),
    formatter: (cellContent, row) => (
      <Badge
        className={
          "text-capitalize font-size-13 badge-soft-" + getStatusBadge(row.status)
        }
        color={row.badgeClass}
      >
        {t(row.status)}
      </Badge>
    ),
  },
  {
    text: t("created_at"),
    dataField: "createdAt",
    formatter: (_, row) =>
      formatDateTime(row.processedAt || row.createdAt),
  },
]

export default ListColumns
