/** Stable unique key for list rendering (same product may appear on multiple lines). */
export const lineItemReactKey = (item, index) => {
  const parts = [
    item?._id,
    item?.lineItemId,
    item?.product || item?.productId || item?.itemId,
    item?.variation_id || item?.variationId,
    item?.specId,
    item?.offerId,
    index,
  ].filter(part => part != null && part !== "")
  return parts.length ? parts.join("-") : `line-${index}`
}

/** Normalize order line item fields (API shapes differ by store version / flow). */
export const normalizeLineItem = item => {
  const productId =
    item?.product ||
    item?.productId ||
    item?.product_id ||
    item?.itemId ||
    (typeof item?.product === "string" ? item.product : null)

  const name =
    item?.name ||
    item?.productName ||
    item?.itemName ||
    item?.title ||
    ""

  const unitPrice = item?.price ?? item?.unitPrice ?? item?.unit_price ?? null

  const lineTotal =
    item?.lineTotal ?? item?.amount ?? item?.line_total ?? item?.total ?? null

  const quantity = item?.quantity ?? item?.qty ?? null

  const details = item?.productDetails || {}
  const variationDetails = item?.variationDetails || {}

  return {
    raw: item,
    productId,
    name,
    unitPrice,
    lineTotal,
    quantity,
    image: item?.productImage || item?.image || item?.featured_image?.link || null,
    addons: item?.addons || [],
    variationTitle: item?.variation_title || item?.variationTitle || null,
    variationId: item?.variation_id || null,
    attributes: item?.attributes || variationDetails?.attributes || [],
    veganType: item?.veganType || details?.veganType || null,
    sku: details?.sku || variationDetails?.sku || item?.sku || null,
    shortDescription:
      details?.short_description || item?.short_description || null,
    description: details?.description || item?.description || null,
    comparePrice: details?.compare_price ?? item?.compare_price ?? null,
    catalogPrice: details?.catalogPrice ?? variationDetails?.catalogPrice ?? null,
    categories: details?.categories || [],
    brand: details?.brand || item?.brand?.name || item?.brand || null,
    productType: details?.type || item?.type || null,
    productStatus: details?.status || null,
    offerId: item?.offerId || null,
    specId: item?.specId || null,
    instructions: item?.instructions || item?.specialInstructions || null,
    weight: item?.weight || null,
  }
}

export const formatLineItemAttributes = attributes => {
  if (!attributes?.length) return ""

  return attributes
    .map(attr => {
      if (!attr || typeof attr !== "object") return String(attr)
      const label =
        attr.attrName || attr.name || attr.label || attr.attributeName
      const value =
        attr.attrValue || attr.value || attr.option || attr.attributeValue
      if (label && value) return `${label}: ${value}`
      if (label) return label
      return value || ""
    })
    .filter(Boolean)
    .join(" · ")
}

export const formatAddonLine = (addon, currencySign) => {
  const name = addon?.name || addon?.title || ""
  const price = addon?.price ?? addon?.amount
  const qty = addon?.quantity ?? addon?.qty ?? 1
  const pricePart =
    price != null && currencySign ? `${currencySign}${price}` : price != null ? price : ""
  return [name, pricePart && `× ${qty} (${pricePart})`].filter(Boolean).join(" ")
}
