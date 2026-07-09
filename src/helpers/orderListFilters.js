import moment from "moment-timezone"

export const ORDER_STATUS_FILTER_OPTIONS = [
  "pending",
  "confirmed",
  "ready_for_shipment",
  "shipped",
  "delayed",
  "out_for_delivery",
  "completed",
  "rejected",
  "cancelled",
]

export const PAYMENT_METHOD_FILTER_OPTIONS = [
  "",
  "cod",
  "stripe",
  "wallet",
  "razorpay",
  "paystack",
  "paypal",
  "flutterwave",
]

export const DELIVERY_TYPE_FILTER_OPTIONS = ["", "DELIVERY", "TAKEAWAY", "PICKUP"]

export const ORDER_LIST_PAGE_SIZE_ALL = 0

export const ORDER_LIST_PAGE_SIZE_OPTIONS = [20, 50, 100, 200, ORDER_LIST_PAGE_SIZE_ALL]

export const isShowingAllOrders = limit =>
  limit === ORDER_LIST_PAGE_SIZE_ALL || limit === "0"

/** No date restriction on first load — avoids hiding older orders. */
export const defaultOrderDateFilter = () => ({
  startDate: moment().subtract(10, "years"),
  endDate: moment(),
  keydata: "all_time",
})

export const orderDateRanges = t => ({
  [t("all")]: [moment().subtract(10, "years"), moment()],
  [t("today")]: [moment(), moment()],
  [t("yesterday")]: [
    moment().subtract(1, "days"),
    moment().subtract(1, "days"),
  ],
  [t("last_7_days")]: [moment().subtract(6, "days"), moment()],
  [t("last_30_days")]: [moment().subtract(29, "days"), moment()],
  [t("this_month")]: [moment().startOf("month"), moment().endOf("month")],
  [t("last_month")]: [
    moment().subtract(1, "month").startOf("month"),
    moment().subtract(1, "month").endOf("month"),
  ],
})

/** Merge date range into orders API request body when a range is active. */
export const appendOrderDatesToPayload = (payload, dateFilter) => {
  if (dateFilter?.keydata === "all_time") {
    delete payload.startDate
    delete payload.endDate
    return payload
  }

  if (
    dateFilter?.keydata === "picker_date" &&
    dateFilter?.startDate &&
    dateFilter?.endDate
  ) {
    payload.startDate = dateFilter.startDate.format("YYYY-MM-DD")
    payload.endDate = dateFilter.endDate.format("YYYY-MM-DD")
  } else {
    delete payload.startDate
    delete payload.endDate
  }
  return payload
}

export const buildOrdersListPayload = (filter, dateFilter) => {
  const showingAll = isShowingAllOrders(filter?.limit)
  const payload = {
    ...filter,
    page: showingAll ? 1 : filter.page || 1,
    limit: showingAll ? ORDER_LIST_PAGE_SIZE_ALL : filter.limit || 20,
  }
  appendOrderDatesToPayload(payload, dateFilter)
  return payload
}

/** Bootstrap-table paginator options shared by order list pages. */
export const getOrderListPageOptions = ({
  filter,
  setFilter,
  totalCount,
  listLength,
  t,
}) => {
  const showingAll = isShowingAllOrders(filter?.limit)
  return {
    custom: true,
    totalSize: totalCount,
    page: filter.page,
    sizePerPage: showingAll
      ? Math.max(totalCount, listLength, 1)
      : filter.limit || 20,
    sizePerPageList: [
      { text: "20", value: 20 },
      { text: "50", value: 50 },
      { text: "100", value: 100 },
      { text: "200", value: 200 },
      { text: t("view_all"), value: ORDER_LIST_PAGE_SIZE_ALL },
    ],
    onPageChange: page => setFilter(prev => ({ ...prev, page })),
    onSizePerPageChange: sizePerPage =>
      setFilter(prev => ({
        ...prev,
        limit: sizePerPage,
        page: 1,
      })),
  }
}

export const hasActiveOrderFilters = (filter, searchText) =>
  !!filter?.search ||
  !!searchText ||
  !!filter?.paymentMethod ||
  !!filter?.deliveryType ||
  !!filter?.fields?.[0]?.fieldName
