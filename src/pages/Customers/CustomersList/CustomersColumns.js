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

const CustomersColumns = (history, toggleConfirmModal, togglePayAdjustmentModal, t, accesses, demo, isUserWalletAccessGiven, hasPermission) => [
  {
    dataField: "name",
    text: t("name"),
    sort: true,
    formatter: (cellContent, row) => (
      <Link
        to={`/customers/${row._id}/profile`}
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

  ...(demo ?
    [{
      dataField: "email",
      text: t("email"),
      formatter: (_, row) => (
        <>
          <span id="view-emailtooltip">{(row.email)}</span>


          <UncontrolledTooltip placement="top" target="view-emailtooltip">
            {t("demo_info")}
          </UncontrolledTooltip>
        </>
      )
    },
    {
      dataField: "mobileNumber",
      text: t("mobile"),
      formatter: (_, row) => (
        <>
          <span id="view-mobiletooltip">{(row.countryCode || "") + " " + (row.mobileNumber || "")}</span>


          <UncontrolledTooltip placement="top" target="view-mobiletooltip">
            {t("demo_info")}
          </UncontrolledTooltip>
        </>
      )
    }] : [{
      dataField: "email",
      text: t("email"),
    },
    {
      dataField: "mobileNumber",
      text: t("mobile"),

    }]
  ),
  {
    dataField: "role",
    text: t("account_type"),
    formatter: (cellContent, row) => (
      <Badge
        className={
          "text-capitalize font-size-13 badge-soft-" +
          (row.role == "USER"
            ? "success"
            : "warning")
        }
      >
        {t(row?.role?.toLowerCase())}
      </Badge>
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
        {t(row?.status?.toLowerCase())}
      </Badge>
    ),
  },
  {
    text: t("registered_at"),
    dataField: "createdAt",
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
          to={`/customers/${row._id}/profile`}
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
        {/* <Link
          to={`/customers/${row._id}/profile`}
          className="mr-3 text-secondary"
        >
          <i className="far fa-edit mr-3" id="viewtooltip" />
          <UncontrolledTooltip placement="top" target="viewtooltip">
            {t("View")} {t("Details")}
          </UncontrolledTooltip>
        </Link> */}

        {accesses?.canDelete && (
          <Link
            to="#"
            onClick={e => {
              e.preventDefault()
              toggleConfirmModal(row._id)
            }}
            className="text-secondary"
          >
            <i
              className="fas fa-trash-alt mr-3"
              id={`delete-${row._id}-tooltip`}
            />
            <UncontrolledTooltip
              placement="top"
              target={`delete-${row._id}-tooltip`}
            >
              {t("delete")}
            </UncontrolledTooltip>
          </Link>
        )}
        {accesses?.canEdit && isUserWalletAccessGiven && hasPermission("accounting.PAY") &&
          <Link
            to="#"
            onClick={e => {
              e.preventDefault()
              togglePayAdjustmentModal(row._id, row)
            }}
            className={"text-secondary pay-adjustment"}
          >
            <i className="fas fa-money-bill-wave" />
          </Link>
        }
      </>
    ),
  },
]

export default CustomersColumns
