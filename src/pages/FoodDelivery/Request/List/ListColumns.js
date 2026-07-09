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

const ListColumns = ({
  toggleDetailsModal,
  currentUrl,
  vendorIdParam,
  accesses,
  t,
  currency,
  needVendor = true,
  query,
  isVendor = false,
}) => [
  {
    dataField: "customOrderId",
    text: t("order_id"),
    sort: true,
  },
  {
    dataField: "user",
    text: t("customer"),
    formatter: (_, row) =>
      isVendor ? (
        row?.customerDetails?.name
      ) : (
        <Link
          to={`/customers/${row.user}/profile`}
          className="text-body font-weight-bold"
        >
          <span id="view-usertooltip">{row?.customerDetails?.name}</span>

          <UncontrolledTooltip placement="top" target="view-usertooltip">
            {t("view_details")}
          </UncontrolledTooltip>
        </Link>
      ),
  },
  ...(needVendor
    ? [
        {
          dataField: "vendor",
          text: t("vendor"),
          formatter: (cellContent, row) => (
            <Link
              to={`/${currentUrl}/${row.vendor}/profile`}
              className="text-body font-weight-bold"
            >
              <span id="view-vendortooltip">{row?.vendorDetails?.name}</span>

              <UncontrolledTooltip placement="top" target="view-vendortooltip">
                {t("view_details")}
              </UncontrolledTooltip>
            </Link>
          ),
        },
      ]
    : []),
  {
    dataField: "orderTotal",
    text: t("cost"),
    formatter: (_, row) => currency?.sign + row?.orderTotal,
  },
  {
    text: t("created_at"),
    dataField: "date_created_utc",
    sort: true,
    formatter: (_, row) =>
      moment(row.date_created_utc).format("DD MMM YYYY, LT"),
  },
  {
    isDummyField: true,
    text: t("action"),
    dataField: "action",
    formatter: (_, row) => (
      <>
        <Link
          to={`#`}
          onClick={e => {
            e.preventDefault()
            toggleDetailsModal(row)
          }}
          className="text-secondary"
        >
          <i className="far fa-eye" id={`viewtooltip_${row._id}`} />
          <UncontrolledTooltip
            placement="top"
            target={`viewtooltip_${row._id}`}
          >
            {t("view_details")}
          </UncontrolledTooltip>
        </Link>
      </>
    ),
  },
]

export default ListColumns
