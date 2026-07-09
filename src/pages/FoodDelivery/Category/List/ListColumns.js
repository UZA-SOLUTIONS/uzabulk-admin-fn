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

const ListColumns = (toggleConfirmModal, currentUrl) => [
  /* {
    dataField: "slug",
    text: "Slug",
  }, */
  {
    dataField: "catName",
    text: "Name",
  },
  {
    dataField: "status",
    text: "Status",
    formatter: (cellContent, row) => (
      <Badge
        className={
          "text-capitalize font-size-13 badge-soft-" +
          (row.status === "active" ? "success" : "danger")
        }
        color={row.badgeClass}
      >
        {row.status}
      </Badge>
    ),
  },
  {
    text: "Registered At",
    dataField: "date_created_utc",
    sort: true,
    formatter: (_, row) => moment(row.date_created_utc).format("DD MMM YYYY"),
  },
  {
    isDummyField: true,
    text: "Action",
    dataField: "action",
    formatter: (_, row) => (
      <>
        <Link
          to={`/${currentUrl}/category/${row._id}/edit`}
          className="text-secondary"
        >
          <i className="far fa-edit mr-3" id="viewtooltip" />
          <UncontrolledTooltip placement="top" target="viewtooltip">
            Edit
          </UncontrolledTooltip>
        </Link>

        <Link
          to="#"
          onClick={e => {
            e.preventDefault()
            toggleConfirmModal(row._id)
          }}
          className="text-secondary"
        >
          <i className="far fa-trash-alt mr-3" id="deletetooltip" />
          <UncontrolledTooltip placement="top" target="deletetooltip">
            Delete
          </UncontrolledTooltip>
        </Link>
      </>
    ),
  },
]

export default ListColumns
