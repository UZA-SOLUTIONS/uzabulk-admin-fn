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

const ListColumns = (history, toggleViewModal, t) => [
  {
    dataField: "title",
    text: t("title"),
  },
  {
    dataField: "type",
    text: t("sent_to"),
  },
  {
    text: t("time"),
    dataField: "createdAt",
    sort: true,
    formatter: (_, row) =>
      moment(row.date_created_utc).format("DD MMM YYYY, LT"),
  },
  {
    isDummyField: true,
    text: t("action"),
    dataField: "action",
    formatter: (_, row) => (
      <Link
        to="#"
        onClick={e => {
          e.preventDefault()
          toggleViewModal(row._id, row)
        }}
        className="text-secondary"
      >
        <i className="far fa-eye mr-3" id={`view-${row._id}-tooltip`} />
        <UncontrolledTooltip placement="top" target={`view-${row._id}-tooltip`}>
          {t("view_details")}
        </UncontrolledTooltip>
      </Link>
    ),
  },
]

export default ListColumns
