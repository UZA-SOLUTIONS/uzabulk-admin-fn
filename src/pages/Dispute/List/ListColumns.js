import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Badge, Input, Label, UncontrolledTooltip } from "reactstrap"
import moment from "moment-timezone"
import { removeObserver } from "simplebar-react"

// export const selectRow = props => ({
//   mode: "checkbox",
//   clickToSelect: false,
//   selectionHeaderRenderer: ({ indeterminate, mode, ...rest }) => (
//     <div className="custom-control custom-checkbox">
//       <Input
//         type="checkbox"
//         className="custom-control-input"
//         ref={input => {
//           if (input) input.indeterminate = indeterminate
//         }}
//         {...rest}
//       />
//       <Label className="custom-control-label">&nbsp;</Label>
//     </div>
//   ),
//   selectionRenderer: ({ mode, rowKey, ...rest }) => (
//     <div className="custom-control custom-checkbox" key={rowKey}>
//       <input type="checkbox" className="custom-control-input" {...rest} />
//       <Label className="custom-control-label">&nbsp;</Label>
//     </div>
//   ),
//   ...props,
// })

const ListColumns = ({
  currentUrl,
  vendorIdParam,
  accesses,
  t,
  currency,
  needVendor = true,
  query,
  isDriver = false,
  isVendor = false,
  isCustomer = false,
  isVendorEarning = false,
  activeStoreType,
  activestore,
  activestoree
}) => [
    {
      dataField: "orderId",
      text: activestoree !== 'null' && (["TAXI", "PICKUPDROP",].includes(
        activestoree?.toUpperCase()
      ) ? t("bookingId") : t("orderId")),
      sort: true,
      formatter: (cellContent, row) => (
        ["TAXI", "PICKUPDROP",].includes(
          row?.storeTypeDetails?.storeType?.toUpperCase()
        ) ? (
          <Link
            to={`/${row?.storeTypeDetails?.storeType?.toLowerCase()}/trip/${row?.orderId
              }/profile`}
            className="mr-3 text-primary"
          >
            <span id={`view-${row?.orderId}-nametooltip`}>
              {row?.orderDetails?.customOrderId}
            </span>

            <UncontrolledTooltip
              placement="top"
              target={`view-${row?.orderId}-nametooltip`}
            >
              {t("view_details")}
            </UncontrolledTooltip>
          </Link>) :
          (<Link
            to={`/${row?.storeTypeDetails?.storeType?.toLowerCase()}/orders/${row?.orderId
              }/profile`}
            className="mr-3 text-primary"
          >
            <span id={`view-${row?.orderId}-nametooltip`}>
              {row?.orderDetails?.customOrderId}
            </span>

            <UncontrolledTooltip
              placement="top"
              target={`view-${row?.orderId}-nametooltip`}
            >
              {t("view_details")}
            </UncontrolledTooltip>
          </Link>)
      ),
    },

    {
      dataField: "disputeWith",
      text: t("disputeWith"),
      formatter: (_, row) => (
        <p className="text-capitalize">
          {" "}
          {(row.countryCode || "") + " " + (row.disputeWith || "")}
        </p>
      ),
    },
    {
      dataField: "reason",
      text: t("reason"),
      formatter: (_, row) => <p className="text-capitalize fixedtext"> {row.reason}</p>,
    },
    {
      dataField: "status",
      text: t("status"),
      formatter: (cellContent, row) => (
        <Badge
          className={
            "text-capitalize font-size-13 badge-soft-" +
            (row.status === "close"
              ? "success"
              : row.status === "open"
                ? "warning"
                : "danger")
          }
          color={row.badgeClass}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      text: t("created_at"),
      dataField: "createdAt",
      sort: true,
      formatter: (_, row) =>
        moment(row.date_created_utc).format("DD MMM YYYY LT"),
    },
    {
      text: t("action"),
      dataField: "action",
      formatter: (_, row) => (
        <>
          <Link
            to={`/dispute/${row._id}/profile`}
            className="mr-3 text-secondary"
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
