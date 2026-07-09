import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Badge, Button, Input, Label, UncontrolledTooltip } from "reactstrap"
import { SLUGS_NAME } from "helpers/contants"

const ListColumns = ({ currentUrl, setid, t, sign, slug }) => [
  {
    dataField: "Name",
    text: t("name"),
    sort: true,
    formatter: (cellContent, row) =>
      ["TAXI", "PICKUPDROP"].includes(row?.storeType?.storeType) ? (
        <Link
          to={`/${
            !currentUrl ? row?.storeType?.storeType?.toLowerCase() : currentUrl
          }/trip/${row?._id}/profile`}
          className="mr-3 text-primary"
        >
          <span id={`view-${row?.orderId}-nametooltip`}>
            {row?.customOrderId}
          </span>

          <UncontrolledTooltip
            placement="top"
            target={`view-${row?.orderId}-nametooltip`}
          >
            {t("view")}
          </UncontrolledTooltip>
        </Link>
      ) : (
        <Link
          to={`/${
            !currentUrl ? row?.storeType?.storeType?.toLowerCase() : currentUrl
          }/orders/${row._id}/profile`}
          className="mr-3 text-primary"
        >
          {row?.customOrderId}
        </Link>
      ),
  },

  {
    dataField: "Order Total",

    text: t("order_total"),
    formatter: (_, row) => (
      <p className="m-0 text-capitalize">
        {" "}
        {sign}
        {row.orderTotal}
      </p>
    ),
  },
  {
    dataField: "Customer",

    text: t("customer"),
    formatter: (_, row) => (
      <p className="m-0 text-capitalize"> {row?.customerDetails?.name}</p>
    ),
  },
  {
    dataField: "scheduledType",

    text: t("service_type"),
    formatter: (_, row) => (
      <p className="m-0 text-capitalize">
        {t(row?.scheduledType === "scheduled" ? "scheduled" : "instant")}
      </p>
    ),
  },
  {
    dataField: "Status",
    text: t("status"),
    formatter: (_, row) => (
      <Badge
        className={
          "text-capitalize font-size-13 badge-soft-" +
          (row.status === "close"
            ? "success"
            : row.status === "open"
            ? "warning"
            : "danger")
        }
        color={row?.pickUp?.address}
      >
        {row?.orderStatus}
      </Badge>
    ),
  },
  {
    dataField: "Store Type ",
    text: t("store_type"),
    formatter: (cellContent, row) => (
      <p className="m-0 text-capitalize">
        {" "}
        {slug == "topup-fuel" ? "FUEL" : row?.storeType?.storeType}
      </p>
    ),
  },
  {
    dataField: "Created ",
    text: t("created_at"),
    formatter: (cellContent, row) => (
      <p className="m-0 text-capitalize"> {row?.time_created}</p>
    ),
  },
  // {
  //   isDummyField: true,
  //   text: t("action"),
  //   dataField: "action",
  //   formatter: (cellContent, row) => (
  //     <>
  //       {["TAXI", "PICKUPDROP"].includes(row?.storeType?.storeType) ? (
  //         <Link
  //           to={`/${
  //             !currentUrl
  //               ? row?.storeType?.storeType?.toLowerCase()
  //               : currentUrl
  //           }/trip/${row?._id}/profile`}
  //           className="mr-3 text-primary"
  //         >
  //           <i className="far fa-eye mr-3" id={`view-${row._id}-tooltip`} />

  //           <UncontrolledTooltip
  //             placement="top"
  //             target={`view-${row?.orderId}-nametooltip`}
  //           >
  //             {t("view")}
  //           </UncontrolledTooltip>
  //         </Link>
  //       ) : (
  //         <Link
  //           to={`/${
  //             !currentUrl
  //               ? row?.storeType?.storeType?.toLowerCase()
  //               : currentUrl
  //           }/orders/${row._id}/profile`}
  //           className="mr-3 text-primary"
  //         >
  //           <i className="far fa-eye mr-3" id={`view-${row._id}-tooltip`} />

  //           <UncontrolledTooltip
  //             placement="top"
  //             target={`view-${row._id}-tooltip`}
  //           >
  //             {t("view_details")}
  //           </UncontrolledTooltip>
  //         </Link>
  //       )}
  //       {console.log(
  //         "row?.orderStatus",
  //         row?.orderStatus,
  //         row?.storeType?.storeType
  //       )}
  //       {!["TAXI", "PICKUPDROP"].includes(row?.storeType?.storeType) &&
  //         row?.orderStatus === "confirmed" && (
  //           <Button onClick={() => setid(row._id)}>{t("assign_driver")}</Button>
  //         )}

  //       {["FOOD", "GROCERY"].includes(row?.storeType?.storeType) &&
  //         row?.orderStatus === "inroute" &&
  //         [SLUGS_NAME.oneTimeShop].includes(slug) && (
  //           <Button onClick={() => setid(row._id)}>{t("assign_driver")}</Button>
  //         )}

  //       {["TAXI", "PICKUPDROP"].includes(row?.storeType?.storeType) &&
  //         ((["pending", "confirmed"].includes(row?.orderStatus) &&
  //           row?.scheduledType === "scheduled") ||
  //           row?.orderStatus === "pending") && (
  //           <Button onClick={() => setid(row._id)}>{t("assign_driver")}</Button>
  //         )}
  //     </>
  //   ),
  // },
]

export default ListColumns
