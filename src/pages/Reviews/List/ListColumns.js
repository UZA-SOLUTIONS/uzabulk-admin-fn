import React from "react"
import { Link } from "react-router-dom"
import { Badge, Input, Label, UncontrolledTooltip } from "reactstrap"
import moment from "moment-timezone"

// Contants
import { GET_SERVICE_NAME } from "helpers/contants"

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
  plan,
  activestoree
}) => [

    {

      dataField: "customOrderId",
      text: t("orderId"),
      sort: true,
      formatter: (_, row) =>

        isVendor ? (
          row?.customOrderId
        ) : ["TAXI", "PICKUPDROP"].includes(
          row?.order?.storeType?.storeType?.toUpperCase()
        ) ? (
          <Link
            to={`/${row?.order?.storeType?.storeType?.toLowerCase()
              }/trip/${row?.order?._id}/profile${!!vendorIdParam ? "/" + vendorIdParam : ""
              }${query}`}
            className="mr-3 text-primary"
          >
            {row?.order?.customOrderId}
          </Link>
        ) : (
          <Link
            to={`/${row?.order?.storeType?.storeType?.toLowerCase()
              }/orders/${row?.order?._id}/profile${!!vendorIdParam ? "/" + vendorIdParam : ""
              }${query}`}
            className="mr-3 text-primary"
          >
            {row?.order?.customOrderId}
          </Link>
        ),
    },

    {
      dataField: "review",
      text: t("review"),
    },
    {
      dataField: "rating",
      text: t("rating"),
    },
    {
      dataField: "name",
      text: t("reviewed_by"),
      formatter: (_, row) => row?.reviewed_by?.name
      ,
    },

    {
      text: t("created_at"),
      dataField: "date_created_utc",
      sort: true,
      formatter: (_, row) =>
        moment(row.date_created_utc).format("DD MMM YYYY, LT"),
    },
    ...(!isVendor
      ? [
        {
          isDummyField: true,
          text: t("action"),
          dataField: "action",
          formatter: (_, row) => (
            <>

              {
                ["TAXI", "PICKUPDROP"].includes(
                  row?.order?.storeType?.storeType?.toUpperCase()
                ) ? (
                  row?.order?._id &&
                  (<Link
                    to={`/${row?.order?.storeType?.storeType?.toLowerCase()
                      }/trip/${row?.order?._id}/profile${!!vendorIdParam ? "/" + vendorIdParam : ""
                      }${query}`}
                    className="mr-3 text-primary"
                  >
                    <i className="far fa-eye mr-3" id={`view-${row._id}-tooltip`} />

                    <UncontrolledTooltip
                      placement="top"
                      target={`view-${row._id}-tooltip`}
                    >
                      {t("view_details")}
                    </UncontrolledTooltip>
                  </Link>)
                ) : (
                  row?.order?._id &&
                  (<Link
                    to={`/${row?.order?.storeType?.storeType?.toLowerCase()

                      }/orders/${row?.order?._id}/profile${!!vendorIdParam ? "/" + vendorIdParam : ""
                      }${query}`}
                    className="mr-3 text-secondary"
                  >
                    <i className="far fa-eye mr-3" id={`view-${row._id}-tooltip`} />

                    <UncontrolledTooltip
                      placement="top"
                      target={`view-${row._id}-tooltip`}
                    >
                      {t("view_details")}
                    </UncontrolledTooltip>
                  </Link>)
                )
              }


            </>
          ),
        },
      ]
      : []),
  ]

export default ListColumns
