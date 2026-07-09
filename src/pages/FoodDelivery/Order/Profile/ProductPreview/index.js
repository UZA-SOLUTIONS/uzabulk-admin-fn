import React from "react"
//i18n
import { withTranslation } from "react-i18next"

import { Card, CardBody, CardTitle, Col, Row, Table, Label } from "reactstrap"
import { SLUGS_NAME as slugname } from "helpers/contants"
import { lineItemReactKey } from "helpers/lineItem"
import LineItemDetails from "./LineItemDetails"

const Product = props => {
  const {
    currency,
    discountTotal,
    deliveryType,
    subTotal,
    tip,
    tipAmount,
    tax,
    deliveryFee,
    isLoyaltyPointsUsed,
    redemptionValue,
    total,
    children,
    orderInstructions,
    activeStore,
    coupon,
    slug,
    storeType,
    vendorId,
    locationSearch = "",
  } = props
  return (
    <Row>
      <Col md={8}>
        {activeStore === "SERVICEPROVIDER" ? (
          <CardTitle>{props.t("services")}</CardTitle>
        ) : activeStore === "AIRBNB" ? (
          <CardTitle>{props.t("property")}</CardTitle>
        ) : (
          <CardTitle>{props.t("products")}</CardTitle>
        )}

        {props?.items?.map((item, index) => (
          <LineItemDetails
            key={lineItemReactKey(item, index)}
            item={item}
            index={index}
            currency={currency}
            storeType={storeType || activeStore}
            vendorId={vendorId}
            locationSearch={locationSearch}
            t={props.t}
          />
        ))}

        {!!orderInstructions && (
          <div className="mt-5">
            <CardTitle>{props.t("order_instructions")}</CardTitle>

            <hr className="my-3" />

            <p>{orderInstructions}</p>
          </div>
        )}
      </Col>

      <Col md={4}>
        <CardTitle>{props.t("bill")}</CardTitle>

        <hr className="my-3" />
        {/* {console.log(activeStore, "activeStoreactiveStoreactiveStore")} */}
        <Row>
          {activeStore === "SERVICEPROVIDER" ? (
            <Label className="col-md-6 text-muted">
              {props.t("service_total")}
            </Label>
          ) : activeStore === "AIRBNB" ? (
            <Label className="col-md-6 text-muted">
              {props.t("property_total")}
            </Label>
          ) : (
            <Label className="col-md-6 text-muted">
              {props.t("product_total")}
            </Label>
          )}

          <div className="col-md-6 d-flex justify-content-end font-weight-bold">
            {currency?.sign}
            {subTotal || 0}
          </div>
        </Row>

        <hr className="my-2" />

        {!!tipAmount && (
          <>
            <Row>
              <Label className="col-md-6 text-muted">
                {props.t("tip_amount")} {tip}%
              </Label>

              <div className="col-md-6 d-flex justify-content-end font-weight-bold">
                {currency?.sign}
                {tipAmount || 0}
              </div>
            </Row>

            <hr className="my-2" />
          </>
        )}

        <Row>
          <Label className="col-md-6 text-muted">
            {props.t("tax_fee")} {tax?.tax || 0}%
          </Label>

          <div className="col-md-6 d-flex justify-content-end font-weight-bold">
            {currency?.sign}
            {tax?.taxAmount || 0}
          </div>
        </Row>

        <hr className="my-2" />

        {deliveryType === "DELIVERY" && slug != slugname.airide && (
          <>
            <Row>
              <Label className="col-md-6 text-muted">
                {props.t("delivery_fee")}
              </Label>

              <div className="col-md-6 d-flex justify-content-end font-weight-bold">
                {currency?.sign}
                {deliveryFee || 0}
              </div>
            </Row>

            <hr className="my-2" />
          </>
        )}

        {discountTotal ? (
          <>
            <Row>
              <Label className="col-md-6 text-muted">
                {props.t("promocode")}
              </Label>

              <div className="col-md-6 d-flex justify-content-end font-weight-bold">
                -{currency?.sign}
                {discountTotal || 0}
              </div>
            </Row>

            <hr className="my-2" />
          </>
        ) : (
          ""
        )}

        {coupon ? (
          <>
            <Row>
              <Label className="col-md-6 text-muted">{props.t("coupon")}</Label>
              <div className="col-md-6 d-flex justify-content-end font-weight-bold">
                {coupon}
              </div>
            </Row>
            <hr className="my-2" />
          </>
        ) : (
          ""
        )}

        {isLoyaltyPointsUsed && (
          <>
            <Row>
              <Label className="col-md-6 text-muted">
                {props.t("loyalty_redeemed")}
              </Label>

              <div className="col-md-6 d-flex justify-content-end font-weight-bold">
                -{currency?.sign}
                {redemptionValue || 0}
              </div>
            </Row>

            <hr className="my-2" />
          </>
        )}

        <Row>
          {activeStore === "SERVICEPROVIDER" ? (
            <Label className="col-md-6 text-muted">
              {props.t("service_amount")}
            </Label>
          ) : activeStore === "AIRBNB" ? (
            <Label className="col-md-6 text-muted">
              {props.t("booking_amount")}
            </Label>
          ) : (
            <Label className="col-md-6 text-muted">
              {props.t("order_amount")}
            </Label>
          )}

          <div className="col-md-6 d-flex justify-content-end font-weight-bold">
            {currency?.sign}
            {slug == slugname.airide
              ? (total - deliveryFee).toFixed(2)
              : total || 0}
          </div>
        </Row>
      </Col>

      {children}

      <>
        <Col md="12 my-5">
          <hr />
          <CardTitle>Payment Slip</CardTitle>

          {props?.orderDetail?.slipLink ? (
            <div className="my-3">
              {((props?.orderDetail?.slipLink?.split(".")).at(-1))?.toLowerCase() === "pdf" ? (
                <div className="d-flex flex-column text-center cursor-pointer" style={{
                  cursor: "pointer"
                }}>
                  <a
                    href={props?.orderDetail?.slipLink}
                    download
                    target="_blank"
                    className="text-decoration-none"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width={100}
                        height={100}
                        x="0"
                        y="0"
                        viewBox="0 0 512 512"
                        style={{ enableBackground: 'new 0 0 512 512' }}
                        xmlSpace="preserve"
                      >
                        <g>
                          <path
                            d="M128 0c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32h320c17.6 0 32-14.4 32-32V128L352 0H128z"
                            fill="#e2e5e7"
                          />
                          <path
                            d="M384 128h96L352 0v96c0 17.6 14.4 32 32 32z"
                            fill="#b0b7bd"
                          />
                          <path
                            d="m480 224-96-96h96z"
                            fill="#cad1d8"
                          />
                          <path
                            d="M416 416c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V256c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v160z"
                            fill="#233448"
                          />
                          <path
                            d="M101.744 303.152c0-4.224 3.328-8.832 8.688-8.832h29.552c16.64 0 31.616 11.136 31.616 32.48 0 20.224-14.976 31.488-31.616 31.488h-21.36v16.896c0 5.632-3.584 8.816-8.192 8.816-4.224 0-8.688-3.184-8.688-8.816v-72.032zm16.88 7.28v31.872h21.36c8.576 0 15.36-7.568 15.36-15.504 0-8.944-6.784-16.368-15.36-16.368h-21.36zM196.656 384c-4.224 0-8.832-2.304-8.832-7.92v-72.672c0-4.592 4.608-7.936 8.832-7.936h29.296c58.464 0 57.184 88.528 1.152 88.528h-30.448zm8.064-72.912V368.4h21.232c34.544 0 36.08-57.312 0-57.312H204.72zM303.872 312.112v20.336h32.624c4.608 0 9.216 4.608 9.216 9.072 0 4.224-4.608 7.68-9.216 7.68h-32.624v26.864c0 4.48-3.184 7.92-7.664 7.92-5.632 0-9.072-3.44-9.072-7.92v-72.672c0-4.592 3.456-7.936 9.072-7.936h44.912c5.632 0 8.96 3.344 8.96 7.936 0 4.096-3.328 8.704-8.96 8.704h-37.248v.016z"
                            fill="#ffffff"
                          />
                          <path
                            d="M400 432H96v16h304c8.8 0 16-7.2 16-16v-16c0 8.8-7.2 16-16 16z"
                            fill="#cad1d8"
                          />
                        </g>
                      </svg>
                      <p className="mb-0 mt-3 text-black fs-base">
                        Download slip: {((props?.orderDetail?.slipLink?.split("/")).at(-1))}
                      </p>
                    </span>
                  </a>
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center gap-3 cursor-pointer" style={{
                  cursor: "pointer"
                }}>
                  <img src={props?.orderDetail?.slipLink} style={{
                    width: "100%"
                  }} alt="Uploaded content" />
                  <a
                    href={props?.orderDetail?.slipLink}
                    download
                    target="_blank"
                    className="text-decoration-none"
                  >
                    <p className="mb-0 mt-3 text-black fs-base">
                      Download slip: {((props?.orderDetail?.slipLink?.split("/")).at(-1))}
                    </p>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3">
              <p> Slip not Uploaded!</p>
            </div>
          )}
        </Col>
      </>
    </Row>
  )
}

export default withTranslation()(Product)
