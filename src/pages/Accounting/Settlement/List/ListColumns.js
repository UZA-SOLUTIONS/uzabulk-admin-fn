import React from "react"
import { Link } from "react-router-dom"
import { Badge, Input, Label, UncontrolledTooltip } from "reactstrap"
import moment from "moment-timezone"

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

const ListColumns = (
  toggleConfirmModal,
  togglePayModal,
  togglePayAdjustmentModal,
  accesses,
  t,
  currency,
  activestore,
  demo,
  hasPermission
) => [
  {
    dataField: "name",
    text: t("name"),
    sort: true,
    formatter: (cellContent, row) => (
      <Link
        to={`/${
          row.role == "DRIVER"
            ? "drivers"
            : row.storeTypeName == "FOOD"
            ? "food/restaurants"
            : "grocery/vendors"
        }/${row._id}/profile`}
        className="text-body font-weight-bold"
      >
        <span id={`view-${row._id}-nametooltip`}>{row.name}</span>

        <UncontrolledTooltip
          placement="top"
          target={`view-${row._id}-nametooltip`}
        >
          {t("view_details")}
        </UncontrolledTooltip>
      </Link>
    ),
  },
  ...(demo
    ? [
        {
          dataField: "email",
          text: t("email"),
          formatter: (_, row) => (
            <>
              <span id="view-emailtooltip">{row.email}</span>

              <UncontrolledTooltip placement="top" target="view-emailtooltip">
                {t("demo_info")}
              </UncontrolledTooltip>
            </>
          ),
        },
        {
          dataField: "mobileNumber",
          text: t("mobile"),
          formatter: (_, row) => (
            <>
              <span id="view-mobiletooltip">
                {(row.countryCode || "") + " " + (row.mobileNumber || "")}
              </span>

              <UncontrolledTooltip placement="top" target="view-mobiletooltip">
                {t("demo_info")}
              </UncontrolledTooltip>
            </>
          ),
        },
      ]
    : [
        {
          dataField: "email",
          text: t("email"),
        },
        {
          dataField: "mobileNumber",
          text: t("mobile"),
        },
      ]),

  {
    dataField: "status",
    text: t("status"),
    formatter: (cellContent, row) => (
      <Badge
        className={
          "text-capitalize font-size-13 badge-soft-" +
          (row.status === "approved"
            ? "success"
            : row.status === "created"
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
    dataField: "onlineStatus",
    text: t("online_status"),
    formatter: (cellContent, row) => (
      <Badge
        className={
          "text-capitalize font-size-13 badge-soft-" +
          (row.onlineStatus === "online" ? "success" : "danger")
        }
        color={row.badgeClass}
      >
        {t(row.onlineStatus)}
      </Badge>
    ),
  },
  {
    text: t("balance"),
    dataField: "wallet",
    formatter: (_, row) => currency?.sign + (row.wallet || 0),
  },
  {
    text: t("registered_at"),
    dataField: "date_created_utc",
    sort: true,
    formatter: (_, row) => moment(row.date_created_utc).format("DD MMM YYYY"),
  },
  {
    isDummyField: true,
    text: t("action"),
    dataField: "action",
    formatter: (_, row) => (
      <>
        <Link
          to={`/${
            row.role == "DRIVER"
              ? "drivers"
              : row.storeTypeName == "FOOD"
              ? "food/restaurants"
              : "grocery/vendors"
          }/${row._id}/profile`}
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

        {/* {accesses.canPay && ( */}
        {hasPermission("accounting.PAY") && (
          <Link
            to="#"
            onClick={e => {
              e.preventDefault()
              if ((row?.wallet || 0) <= 0) return
              togglePayModal(row._id, row)
            }}
            className={(row?.wallet || 0) <= 0 ? "text-dark" : "text-secondary"}
          >
            <i
              className="fas fa-dollar-sign mr-3"
              id={`paytooltip-${row?._id}-t`}
            />
            <UncontrolledTooltip
              placement="top"
              target={`paytooltip-${row?._id}-t`}
            >
              {t("pay")}{" "}
              {(row?.wallet || 0) > 0
                ? ""
                : "(" + t("no_pending_balance") + ")"}
            </UncontrolledTooltip>
          </Link>
        )}

        {/* <Link
            to="#"
            onClick={e => {
              e.preventDefault()

              togglePayAdjustmentModal(row._id, row)
            }}
            className={"text-secondary pay-adjustment"}
          >
            <i className="fas fa-money-bill-wave" />
          </Link> */}
      </>
    ),
  },
]

export default ListColumns
