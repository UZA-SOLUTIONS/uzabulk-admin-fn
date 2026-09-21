import React from "react"
import { Badge, Button, Input, Label, Spinner } from "reactstrap"
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

const getProductName = row =>
  row?.productDetails?.name || row?.name || ""

const truncateText = (value, max = 80) => {
  const text = String(value || "").trim()
  if (!text) return ""
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}

const ListColumns = (t, onRetry) => [
  {
    text: t("offerId"),
    dataField: "offerId",
    formatter: (_, row) => row?.offerId || "-",
  },
  {
    text: t("name"),
    dataField: "name",
    formatter: (_, row) => {
      const name = getProductName(row)
      if (!name) return "-"
      const truncated = truncateText(name)
      return (
        <span title={name}>
          {truncated}
        </span>
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
    text: t("created_at"),
    dataField: "createdAt",
    formatter: (_, row) =>
      formatDateTime(row.processedAt || row.createdAt),
  },
  {
    isDummyField: true,
    text: t("action"),
    dataField: "action",
    formatter: (_, row) => {
      const incomplete = !getProductName(row) || row.status === "failed" || row.status === "processing"
      if (!incomplete) return "-"
      const isRetrying = Boolean(row.isRetrying)
      return (
        <Button
          color={isRetrying ? "secondary" : "primary"}
          size="sm"
          disabled={isRetrying}
          onClick={event => {
            event.preventDefault()
            event.stopPropagation()
            if (isRetrying) return
            onRetry(row.offerId)
          }}
        >
          {isRetrying && <Spinner size="sm" className="mr-1" />}
          {isRetrying ? t("processing") : "Retry import"}
        </Button>
      )
    },
  },
]

export default ListColumns
