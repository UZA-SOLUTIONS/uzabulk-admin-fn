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
  toggleConfirmModal,
  currentUrl,
  _vendorIdParam,
  vendorIdParam,
  accesses,
  t,
  query,
}) => [
    {
      dataField: "id",
      text: t("Id"),
      sort: true,
    },
    {
      dataField: "isvId",
      text: t("IsvId"),
      sort: true,
    },
    {
      dataField: "legalName",
      text: t("LegalName"),
      sort: true,
    },
    {
      dataField: "type",
      text: t("Type"),
      sort: true,
    },

    {
      dataField: "status",
      text: t("status"),
      formatter: (cellContent, row) => (
        <Badge
          className={
            "text-capitalize font-size-13 badge-soft-" +
            (row.status === "active" ? "success" : "danger")
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
    // {
    //   isDummyField: true,
    //   text: t("action"),
    //   dataField: "action",
    //   formatter: (_, row) => (
    //     <>
    //       <Link
    //         to={`/${currentUrl}/add-on/${row._id}/edit${!!_vendorIdParam ? "/" + vendorIdParam : ""
    //           }${query}`}
    //         className="text-secondary"
    //       >
    //         <i className="far fa-edit mr-3" id="viewtooltip" />
    //         <UncontrolledTooltip placement="top" target="viewtooltip">
    //           {t("edit")}
    //         </UncontrolledTooltip>
    //       </Link>

    //       {accesses?.canDelete && (
    //         <Link
    //           to="#"
    //           onClick={e => {
    //             e.preventDefault()
    //             toggleConfirmModal(row._id)
    //           }}
    //           className="text-secondary"
    //         >
    //           <i className="far fa-trash-alt mr-3" id="deletetooltip" />
    //           <UncontrolledTooltip placement="top" target="deletetooltip">
    //             {t("delete")}
    //           </UncontrolledTooltip>
    //         </Link>
    //       )}
    //   </>
    // ),
    // },
  ]

export default ListColumns
