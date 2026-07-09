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

const ListColumns = (history, toggleConfirmModal, accesses, t) => [
  {
    dataField: "title",
    text: t("title"),
    formatter: (_, row) => (
      <div className="text-capitalize">{row.title}</div>
    ),
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
    text: t("created_at"),
    dataField: "createdAt",
    formatter: (_, row) => moment(row.createdAt).format("DD MMM YYYY"),
  },
  {
    isDummyField: true,
    text: t("action"),
    dataField: "action",
    formatter: (_, row) => (
      <>

        <i style={{ cursor: "pointer" }} className="far fa-eye mr-3" id="viewtooltip" onClick={() => history.push(`/product-batch/details/${row?._id}`)} />
        <UncontrolledTooltip placement="top" target="viewtooltip">
          View Details
        </UncontrolledTooltip>
      </>
    ),
  },
]

export default ListColumns
