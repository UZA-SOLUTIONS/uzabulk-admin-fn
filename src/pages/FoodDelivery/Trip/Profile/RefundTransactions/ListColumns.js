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

const ListColumns = (t, currency) => [
  {
    text: t("time"),
    dataField: "date_created_utc",
    sort: true,
    formatter: (_, row) =>
      moment(row.date_created_utc).format("DD MMM YYYY, LT"),
  },
  {
    dataField: "customer",
    text: t("account"),
    formatter: (_, row) => row?.refunded_by?.name,
  },
  {
    dataField: "amount",
    text: t("amount"),
    formatter: (_, row) => currency?.sign + row.amount,
  },
  {
    dataField: "reason",
    text: t("description"),
  },
]

export default ListColumns
