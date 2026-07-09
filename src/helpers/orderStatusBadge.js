/**
 * Bootstrap `badge-soft-*` variant for order status.
 * pending → yellow, confirmed → green, rejected/cancelled → red
 */
export const getOrderStatusBadgeSoftClass = orderStatus => {
  const status = String(orderStatus || "").toLowerCase()

  switch (status) {
    case "pending":
      return "warning"
    case "confirmed":
    case "completed":
      return "success"
    case "rejected":
    case "cancelled":
      return "danger"
    case "inroute":
      return "info"
    default:
      return "secondary"
  }
}
