import React from "react"
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

const formatDateTime = value => {
  if (!value || !moment(value).isValid()) return "-"
  return moment(value).format("DD MMM YYYY, LT")
}

const getStatusBadge = status => {
  if (status === "completed") return "success"
  if (status === "processing") return "warning"
  if (status === "already exist") return "info"
  if (status === "failed") return "danger"
  return "danger"
}

const truncateText = (value, max = 80) => {
  const text = String(value || "").trim()
  if (!text) return ""
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}

const ListColumns = (history, toggleConfirmModal, accesses, t) => [
  {
    dataField: "title",
    text: t("title"),
    formatter: (_, row) => {
      const label = row.title || row.firstProductName || row.firstOfferId || "-"
      const truncated = truncateText(label)
      return (
        <div className="text-capitalize" title={label}>
          {truncated || "-"}
        </div>
      )
    },
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
    dataField: "total",
    text: t("products"),
    formatter: (_, row) => {
      const total = row.total || 0
      const processing = row.processing || 0
      const completed = row.completed || 0
      const alreadyExist = row.alreadyExist || 0
      const failed = row.failed || 0
      const parts = [
        `${completed} ${t("completed")}`,
        `${processing} ${t("processing")}`,
      ]
      if (failed > 0) parts.push(`${failed} ${t("failed")}`)
      if (alreadyExist > 0) parts.push(`${alreadyExist} ${t("already exist")}`)
      return (
        <span>
          {total}
          {total > 0 && (
            <small className="text-muted d-block">
              {parts.join(", ")}
            </small>
          )}
        </span>
      )
    },
  },
  {
    text: t("created_at"),
    dataField: "createdAt",
    sort: true,
    formatter: (_, row) => formatDateTime(row.createdAt),
  },
  {
    isDummyField: true,
    text: t("action"),
    dataField: "action",
    formatter: (_, row) => (
      <>
        <i
          style={{ cursor: "pointer" }}
          className="far fa-eye mr-3"
          id={`viewtooltip-${row?._id}`}
          onClick={() => history.push(`/product-batch/details/${row?._id}`)}
        />
        <UncontrolledTooltip placement="top" target={`viewtooltip-${row?._id}`}>
          View Details
        </UncontrolledTooltip>
      </>
    ),
  },
]

export default ListColumns
