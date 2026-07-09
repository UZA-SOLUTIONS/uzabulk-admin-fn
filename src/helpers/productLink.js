import { GET_SERVICE_NAME } from "helpers/contants"

/** Resolve product id from an order line item (API field names vary). */
export const getLineItemProductId = item =>
  item?.productId ||
  item?.product_id ||
  item?.product?._id ||
  (typeof item?.product === "string" ? item.product : null) ||
  item?.id

/** Admin product edit URL: /{storeType}/products/{id}/edit[/{vendorId}] */
export const buildProductEditPath = ({
  storeType,
  productId,
  vendorId,
  search = "",
}) => {
  if (!storeType || !productId) return null

  const productSegment = `${(
    GET_SERVICE_NAME({ storeType, name: "product" }) || "product"
  ).toLowerCase()}s`

  const resolvedVendorId =
    typeof vendorId === "object" && vendorId?._id
      ? vendorId._id
      : vendorId

  const vendorSegment = resolvedVendorId ? `/${resolvedVendorId}` : ""

  return `/${String(storeType).toLowerCase()}/${productSegment}/${productId}/edit${vendorSegment}${search}`
}
