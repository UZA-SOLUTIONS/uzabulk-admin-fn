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

const ListColumns = (history, toggleConfirmModal, accesses, t) => [
  {
    dataField: "promotionName",
    text: t("name"),
    formatter: (_, row) => (
      <>
        <img
          className="mr-3 rounded avatar-sm"
          style={{ objectFit: "fill" }}
          src={row.promotionImage?.link}
          alt=""
        />

        {row.promotionName}
      </>
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
        {t(row.status)}
      </Badge>
    ),
  },
  {
    text: t("created_at"),
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
        {accesses?.canEdit ? (
          <Link
            to={`/promotions/${row._id}/edit`}
            className="mr-3 text-secondary"
          >
            <i className="far fa-edit mr-3" id={`edit-${row._id}-tooltip`} />
            <UncontrolledTooltip
              placement="top"
              target={`edit-${row._id}-tooltip`}
            >
              {t("edit")}
            </UncontrolledTooltip>
          </Link>
        ) : (
          <Link
            to={`/promotions/${row._id}/edit`}
            className="mr-3 text-secondary"
          >
            <i className="far fa-eye mr-3" id={`edit-${row._id}-tooltip`} />
            <UncontrolledTooltip
              placement="top"
              target={`edit-${row._id}-tooltip`}
            >
              {t("view_details")}
            </UncontrolledTooltip>
          </Link>
        )}

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
