import React from "react"
import { Link } from "react-router-dom"
import { Badge, Input, Label, UncontrolledTooltip } from "reactstrap"
import moment from "moment-timezone"

// Contants
import { GET_SERVICE_NAME } from "helpers/contants"
import { getOrderStatusBadgeSoftClass } from "helpers/orderStatusBadge"

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
      text: activestoree !== 'null' && (["TAXI", "PICKUPDROP", "SERVICEPROVIDER"].includes(
        activestoree?.toUpperCase()
      ) ? t("bookingId") : t("orderId")),
      sort: true,
      formatter: (_, row) =>
        <Link
          to={`/ecommerce/orders/${row._id}/profile${!!vendorIdParam ? "/" + vendorIdParam : ""
            }${query}`}
          className="mr-3 text-primary"
        >
          {row?.customOrderId}
        </Link>,
    },
    ...(!isCustomer
      ? [
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
                <span id={`view-${row._id}-usertooltip`}>
                  {row?.customerDetails?.name}
                </span>

                <UncontrolledTooltip
                  placement="top"
                  target={`view-${row._id}-usertooltip`}
                >
                  {t("view_details")}
                </UncontrolledTooltip>
              </Link>
            ),
        },
      ]
      : []),
    // ...(activestore &&
    //   activestore?.toLowerCase()!=="serviceprovider"?
    //    [{
    //     dataField: "vendor",
    //     text: t("vendor"),
    //     formatter: (cellContent, row) =>
    //       !row?.vendorDetails ? (
    //         "N/A"
    //       ) : (
    //         <Link
    //           to={`/${
    //             !currentUrl
    //               ? row?.storeType?.storeType?.toLowerCase()
    //               : currentUrl
    //           }/${GET_SERVICE_NAME({
    //             storeType: activeStoreType?.storeType,
    //           }).toLowerCase()}s/${row.vendor}/profile`}
    //           className="text-body font-weight-bold"
    //         >
    //           <span id={`view-${row._id}-vendortooltip`}>
    //             {row.vendorDetails?.name}
    //           </span>

    //           <UncontrolledTooltip
    //             placement="top"
    //             target={`view-${row._id}-vendortooltip`}
    //           >
    //             {t("view_details")}
    //           </UncontrolledTooltip>
    //         </Link>
    //       ),
    //   },]: 
    //    []),

    ...(needVendor && (!["TAXI", "PICKUPDROP", "SERVICEPROVIDER"].includes(
      activestoree?.toUpperCase()
    )))
      ? [
        {
          dataField: "vendor",
          text: t("vendor"),
          formatter: (cellContent, row) =>
            !row?.vendorDetails ? (
              "N/A"
            ) :
              (
                <Link
                  to={`/${!currentUrl
                    ? row?.storeType?.storeType?.toLowerCase()
                    : currentUrl
                    }/${GET_SERVICE_NAME({
                      storeType: row?.storeType?.storeType,
                      name: "vendors"
                    }).toLowerCase()}s/${row.vendor}/profile`}
                  className="text-body font-weight-bold"
                >
                  <span id={`view-${row._id}-vendortooltip`}>
                    {row.vendorDetails?.name}
                  </span>

                  <UncontrolledTooltip
                    placement="top"
                    target={`view-${row._id}-vendortooltip`}
                  >
                    {t("view_details")}
                  </UncontrolledTooltip>
                </Link>
              ),
        },
      ]
      : [],
    ...(isDriver
      ? [
        {
          dataField: "deliveryBoyEarning",
          text: t("earning"),
          formatter: (_, row) =>

            currency?.sign + (row?.deliveryBoyEarning || 0),


        },
      ]
      : []),
    ...(isVendorEarning
      ? [
        {
          dataField: "vendorEarning",
          text: t("earning"),
          formatter: (_, row) =>

            currency?.sign + (row?.vendorEarning || 0),

        },
      ]
      : []),
    {
      dataField: "orderTotal",
      text: t("cost"),
      formatter: (_, row) =>
        (currency?.sign || "") + (row.orderTotal || 0)
      ,
    },


    {
      dataField: "orderStatus",
      text: t("status"),

      formatter: (cellContent, row) => (
        <Badge
          className={
            "text-capitalize font-size-13 badge-soft-" +
            getOrderStatusBadgeSoftClass(row.orderStatus)
          }
          color={row.badgeClass}
        >
          {t(row.orderStatus)}
        </Badge>
      ),
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
              <Link
                to={`/ecommerce/orders/${row._id}/profile${!!vendorIdParam ? "/" + vendorIdParam : ""
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
              </Link>
            </>
          ),
        },
      ]
      : []),
  ]

export default ListColumns
