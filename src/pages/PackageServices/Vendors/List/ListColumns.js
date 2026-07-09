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
  history,
  toggleConfirmModal,
  storeTypeParam,
  _vendorIdParam,
  vendorIdParam,
  accesses,
  query,
  t,
  isGloble,
}) => [
  {
    dataField: "name",
    text: t("name"),
    formatter: (_, row) => (
      <div className="text-capitalize">{row.email}</div>
    )
  },
  {
    dataField: "email",
    text: t("email"),
  },
  {
    dataField: "mobileNumber",
    text: t("mobile"),
  },
  {
    dataField: "status",
    text: t("status"),
    formatter: (_, row) => (
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
    isDummyField: true,
    text: t("action"),
    dataField: "action",
    formatter: (_, row) => (
      <>
        <Link
          to={
            isGloble
              ? `/package-services/vendors/${row._id}/edit${
                  !!_vendorIdParam ? "/" + vendorIdParam : ""
                }${query}`
              : `/${storeTypeParam}/package-services/vendors/${row._id}/edit${
                  !!_vendorIdParam ? "/" + vendorIdParam : ""
                }${query}`
          }
          className="text-secondary"
        >
          <i className="fas fa-edit mr-3" id={`edit-${row._id}-tooltip`} />
          <UncontrolledTooltip
            placement="top"
            target={`edit-${row._id}-tooltip`}
          >
            {t("edit")}
          </UncontrolledTooltip>
        </Link>

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
      </>
    ),
  },
]

export default ListColumns
