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

const ListColumns = history => [
  {
    dataField: "title",
    text: "Title",
  },
  {
    dataField: "constant",
    text: "Constant",
  },
  {
    isDummyField: true,
    text: "Action",
    dataField: "action",
    formatter: (_, row) => (
      <>
        <Link
          to={`/mail-templates/${row._id}/edit`}
          className="mr-3 text-primary"
        >
          <i className="mdi mdi-pencil font-size-18 mr-3" id="edittooltip" />
          <UncontrolledTooltip placement="top" target="edittooltip">
            Edit
          </UncontrolledTooltip>
        </Link>
      </>
    ),
  },
]

export default ListColumns
