import React from "react"
import { Link } from "react-router-dom"
import { Badge, Input, Label, UncontrolledTooltip } from "reactstrap"
import moment from "moment-timezone"
import { SLUGS_NAME } from "helpers/contants"

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

const ListColumns = (
  history,
  toggleConfirmModal,
  accesses,
  t,
  isWeb,
  settings
) => [
    {
      dataField: "title",
      text: t("content_type"),
      formatter: (_, row) =>
        <Link
          to={`/${isWeb ? "content-pages" : "app-settings"}/${row._id
            }/edit`}
          className="p-0 waves-effect waves-light btn-sm font-weight-bold font-size-13"
        >
          <span id={`title-${row._id}-tooltip`}>{row?.title}</span>
          <UncontrolledTooltip
            placement="top"
            target={`title-${row._id}-tooltip`}
          >
            {t("view_details")}
          </UncontrolledTooltip>
        </Link>
    },
    ...(SLUGS_NAME.oneTimeShop === settings?.slug
      ? [
        {
          dataField: "slug",
          text: t("Slug"),
        },
      ]
      : []),

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
      text: t("created_at"),
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
            to={`/${isWeb ? "content-pages" : "app-settings"}/${row._id}/edit`}
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

        </>
      ),
    },
  ]

export default ListColumns
