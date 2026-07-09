/** Shipment / logistics statuses (admin + vendor). */
export const LOGISTICS_ORDER_STATUSES = [
  "ready_for_shipment",
  "shipped",
  "delayed",
  "out_for_delivery",
]

export const TRACKING_STATUS_ORDER = [
  "order_placed",
  "payment_pending",
  "payment_confirmed",
  "order_confirmed",
  "preparing_for_shipment",
  "ready_for_dispatch",
  "shipped",
  "delayed",
  "in_transit",
  "arrived_at_local_hub",
  "out_for_delivery",
  "delivery_attempted",
  "delivered",
  "refund_initiated",
  "refund_completed",
  "order_cancelled",
  "order_rejected",
  "archived",
]

const NON_LOGISTICS_STORE_TYPES = [
  "TAXI",
  "PICKUPDROP",
  "SERVICEPROVIDER",
  "CARRENTAL",
  "AIRBNB",
]

export const ALIBABA_DELIVERY_STATUSES = [
  "IN_TRANSIT",
  "DELIVERED",
  "EXCEPTION",
  "WAIT_ACCEPT",
  "ACCEPT",
]

export const alibabaDeliveryStatusBadgeClass = status => {
  switch ((status || "").toUpperCase()) {
    case "DELIVERED":
      return "success"
    case "EXCEPTION":
      return "danger"
    case "IN_TRANSIT":
    case "ACCEPT":
      return "info"
    default:
      return "secondary"
  }
}

export const shouldShowLogisticsTracking = (storeType, order = {}) => {
  const type = (storeType || order?.storeType?.storeType || "").toUpperCase()
  if (NON_LOGISTICS_STORE_TYPES.includes(type)) return false
  if (order?.alibabaOrderId || order?.alibabaLogistics?.waybillNumber) return true
  if (order?.trackingHistory?.length) return true
  if (LOGISTICS_ORDER_STATUSES.includes(order?.orderStatus)) return true
  return !NON_LOGISTICS_STORE_TYPES.includes(type)
}

export const sortTrackingHistory = (history = []) =>
  [...history].sort(
    (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
  )

export const trackingStatusLabelKey = status =>
  status ? `tracking_${status}` : ""
