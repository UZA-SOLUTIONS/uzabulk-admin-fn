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
  "cargo_located",
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

/** Common cargo / shipment locations — admin picks one or enters custom text. */
export const CARGO_LOCATION_PRESETS = [
  { value: "China port", label: "China port" },
  { value: "China warehouse", label: "China warehouse" },
  { value: "In transit (international)", label: "In transit (international)" },
  { value: "Sea freight in transit", label: "Sea freight in transit" },
  { value: "Air freight in transit", label: "Air freight in transit" },
  { value: "Dubai port", label: "Dubai port" },
  { value: "UAE hub", label: "UAE hub" },
  { value: "Mombasa port", label: "Mombasa port" },
  { value: "Dar es Salaam port", label: "Dar es Salaam port" },
  { value: "Nairobi transit hub", label: "Nairobi transit hub" },
  { value: "Kigali customs", label: "Kigali customs" },
  { value: "Rwanda warehouse", label: "Rwanda warehouse" },
  { value: "Ready for pickup", label: "Ready for pickup" },
  { value: "Out for delivery", label: "Out for delivery" },
  { value: "__custom__", label: "Other (type below)" },
]

export const resolveCargoLocationDisplay = (warehouseLocation = {}) => {
  const location = String(
    warehouseLocation.location || warehouseLocation.label || ""
  ).trim()
  if (location) return location

  const legacy = [
    warehouseLocation.zone,
    warehouseLocation.aisle,
    warehouseLocation.shelf,
    warehouseLocation.bin,
  ]
    .map(part => String(part || "").trim())
    .filter(Boolean)
    .join("-")

  return legacy
}
