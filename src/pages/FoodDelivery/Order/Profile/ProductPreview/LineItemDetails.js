import React from "react"
import { Link } from "react-router-dom"
import { Badge } from "reactstrap"
import {
  formatAddonLine,
  formatLineItemAttributes,
  normalizeLineItem,
} from "helpers/lineItem"
import { buildProductEditPath } from "helpers/productLink"

const DetailRow = ({ label, value, className = "" }) => {
  if (value == null || value === "" || (Array.isArray(value) && !value.length)) {
    return null
  }

  const display = React.isValidElement(value)
    ? value
    : Array.isArray(value)
      ? value.filter(Boolean).join(", ")
      : String(value)

  return (
    <div className={`d-flex flex-wrap py-1 ${className}`}>
      <span className="text-muted mr-2" style={{ minWidth: "7.5rem" }}>
        {label}:
      </span>
      <span className="flex-grow-1">{display}</span>
    </div>
  )
}

const LineItemDetails = ({
  item,
  index,
  currency,
  storeType,
  vendorId,
  locationSearch,
  t,
}) => {
  const line = normalizeLineItem(item)
  const attrText = formatLineItemAttributes(line.attributes)
  const productPath = buildProductEditPath({
    storeType,
    productId: line.productId,
    vendorId,
    search: locationSearch,
  })

  const productNameEl = productPath ? (
    <Link
      to={productPath}
      className="text-primary font-weight-semibold"
      title={t("view_details")}
    >
      {line.name || t("product")}
    </Link>
  ) : (
    <span className="font-weight-semibold">{line.name || t("product")}</span>
  )

  const unitPriceDisplay =
    line.unitPrice != null
      ? `${currency?.sign || ""}${line.unitPrice}`
      : null

  const lineTotalDisplay =
    line.lineTotal != null
      ? `${currency?.sign || ""}${line.lineTotal}`
      : null

  const qtyPriceSummary = [
    line.quantity != null && `${t("quantity")}: ${line.quantity}`,
    unitPriceDisplay && `${t("price")}: ${unitPriceDisplay}`,
    lineTotalDisplay && `${t("total")}: ${lineTotalDisplay}`,
  ]
    .filter(Boolean)
    .join(" · ")

  return (
    <div className="order-line-item-details border rounded p-3 mb-3 bg-light">
      <div className="d-flex flex-wrap">
        {line.image && (
          <div className="mr-3 mb-2">
            {productPath ? (
              <Link to={productPath}>
                <img
                  src={line.image}
                  alt={line.name || ""}
                  className="rounded border"
                  style={{ width: 72, height: 72, objectFit: "cover" }}
                />
              </Link>
            ) : (
              <img
                src={line.image}
                alt={line.name || ""}
                className="rounded border"
                style={{ width: 72, height: 72, objectFit: "cover" }}
              />
            )}
          </div>
        )}

        <div className="flex-grow-1" style={{ minWidth: "12rem" }}>
          <h5 className="mb-1">{productNameEl}</h5>
          {qtyPriceSummary && (
            <p className="text-muted mb-2 small">{qtyPriceSummary}</p>
          )}

          <div className="small">
            <DetailRow label={t("sku")} value={line.sku} />
            {line.productId && (
              <DetailRow
                label="Product ID"
                value={
                  <span className="font-family-monospace text-break">
                    {String(line.productId)}
                  </span>
                }
              />
            )}
            <DetailRow label={t("categories")} value={line.categories} />
            <DetailRow label={t("brand")} value={line.brand} />
            <DetailRow
              label={t("variants")}
              value={line.variationTitle}
            />
            {attrText && (
              <DetailRow label={t("attributes")} value={attrText} />
            )}
            {line.veganType && (
              <DetailRow label="Dietary" value={line.veganType} />
            )}
            <DetailRow
              label={t("compare_price")}
              value={
                line.comparePrice != null
                  ? `${currency?.sign || ""}${line.comparePrice}`
                  : null
              }
            />
            {line.catalogPrice != null &&
              line.unitPrice != null &&
              Number(line.catalogPrice) !== Number(line.unitPrice) && (
                <DetailRow
                  label="Catalog price"
                  value={`${currency?.sign || ""}${line.catalogPrice}`}
                />
              )}
            {line.offerId && (
              <DetailRow label="Offer ID" value={line.offerId} />
            )}
            {line.specId && (
              <DetailRow label="Spec ID" value={line.specId} />
            )}
            {line.instructions && (
              <DetailRow
                label={t("order_instructions")}
                value={line.instructions}
              />
            )}
          </div>

          {line.addons?.length > 0 && (
            <div className="mt-2 small">
              <span className="text-muted d-block mb-1">{t("addon")}:</span>
              <ul className="mb-0 pl-3">
                {line.addons.map((addon, i) => (
                  <li key={i}>{formatAddonLine(addon, currency?.sign)}</li>
                ))}
              </ul>
            </div>
          )}

          {line.shortDescription && (
            <p className="small text-muted mt-2 mb-1">
              <span className="font-weight-semibold">
                {t("short_description")}:{" "}
              </span>
              {line.shortDescription}
            </p>
          )}

          {line.description && line.description !== line.shortDescription && (
            <div
              className="small text-muted mt-1 border-top pt-2"
              dangerouslySetInnerHTML={{ __html: line.description }}
            />
          )}
        </div>

        {lineTotalDisplay && (
          <div className="text-right font-weight-bold ml-auto">
            {lineTotalDisplay}
          </div>
        )}
      </div>

      {productPath && (
        <div className="mt-2 pt-2 border-top d-flex flex-wrap align-items-center">
          <Badge color="light" className="text-dark mr-2">
            #{index + 1}
          </Badge>
          <Link to={productPath} className="btn btn-sm btn-outline-primary">
            {t("view_details")}
          </Link>
        </div>
      )}
    </div>
  )
}

export default LineItemDetails
