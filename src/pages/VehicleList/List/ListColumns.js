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

const handleNaming = (row, text) => {
  console.log(text, row, "1236");
  let val = row?.values?.filter((val) => val.name == text)
  console.log(val, "VAl");
  return val[0]?.value

}

const ListColumns = (
  toggleConfirmModal,
  togglePayModal,
  togglePayAdjustmentModal,
  accesses,
  t,
  currency, activestore,
  driverId
) => [

    {
      dataField: "name",
      text: t("image"),
      sort: true,
      formatter: (cellContent, row) => (
        <span id={`view-${row._id}-nametooltip`}>{<img className="rounded-circle avatar-xl" src={row?.vehicleType?.image?.link} />}</span>
      ),
    },
    {
      dataField: "name",
      text: t("name"),
      sort: true,
      formatter: (cellContent, row) => (
        <span id={`view-${row._id}-nametooltip`}>{handleNaming(row, "vehicle-name-ao1fzln-ss")}</span>
      ),
    },
    {
      dataField: "name",
      text: t("type"),
      sort: true,
      formatter: (cellContent, row) => (
        <span id={`view-${row._id}-nametooltip`}>{row?.vehicleType?.name}</span>
      ),
    },
    {
      dataField: "name",
      text: t("vehicle_number"),
      sort: true,
      formatter: (cellContent, row) => (
        <span id={`view-${row._id}-nametooltip`}>{handleNaming(row, "vehicle-number-yqlfbhwco2")}</span>
      ),
    },
    {
      dataField: "name",
      text: t("expiry_date"),
      sort: true,
      formatter: (cellContent, row) => (
        <span id={`view-${row._id}-nametooltip`}>{handleNaming(row, "expiry-date-nplpq_ja0")}</span>
      ),
    },


    {
      isDummyField: true,
      text: t("action"),
      dataField: "action",
      formatter: (_, row) => (
        <>
          <Link
            to={`/drivers/editVehicle/${driverId}`}
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
