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

const ListColumns = (toggleDetailsModal, history, accesses, t, currency) => [
  {
    text: t("time"),
    dataField: "date_created_utc",
    sort: true,
    formatter: (_, row) =>
      moment(row.date_created_utc).format("DD MMM YYYY, LT"),
  },
  // {
  //   text: t("Transfer By"),
  //   dataField: "PaymentBy",

  //   formatter: (_, row) => (
  //     <>
  //       <Link to={`/customers/${row?.PaymentBy?._id}/profile`}>
  //         {" "}
  //         <span>{row.PaymentBy?.name}</span>
  //       </Link>
  //     </>
  //   ),
  // },
  // {
  //   text: t("Transfer To"),
  //   dataField: "paymentTo",

  //   formatter: (_, row) => (
  //     <>
  //       <Link to={`/customers/${row?.paymentTo?._id}/profile`}>
  //         <span>{row.paymentTo?.name}</span>
  //       </Link>
  //     </>
  //   ),
  // },
  {
    text: t("name"),
    dataField: "name",

    formatter: (_, row) => (
      <>
        <Link
          to={
            row?.userType == "USER"
              ? `/customers/${row?.customerDetails?._id}/profile`
              : `/drivers/${row?.customerDetails?._id}/profile`
          }
        >
          {" "}
          <span>{row.customerDetails?.name}</span>
        </Link>
      </>
    ),
  },
  {
    text: t("Type"),
    dataField: "type",
    formatter: (_, row) => (
      <>
        <span
          className={row?.type === "credit" ? "text-success" : "text-danger"}
        >
          {row.type?.toUpperCase()}
        </span>
      </>
    ),
  },

  {
    dataField: "amount",
    text: t("amount"),
    formatter: (_, row) => (
      <span>
        {currency?.sign}
        {row.amount}
      </span>
    ),
  },

  ,
  {
    dataField: "description",
    text: t("description"),
  },

  {
    isDummyField: true,
    text: t("action"),
    dataField: "action",
    formatter: (_, row) => (
      <>
        <Link
          to={`#`}
          className="mr-3 text-secondary"
          onClick={e => {
            e.preventDefault()
            toggleDetailsModal(row)
          }}
        >
          <i className="far fa-eye mr-3" id={`view-${row._id}-tooltip`} />
          <UncontrolledTooltip
            placement="top"
            target={`view-${row._id}-tooltip`}
          >
            {t("view_details")}
          </UncontrolledTooltip>
        </Link>
      </>
    ),
  },
]

export default ListColumns
