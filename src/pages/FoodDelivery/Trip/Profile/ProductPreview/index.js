import { SLUGS_NAME } from "helpers/contants"
import React from "react"

//i18n
import { withTranslation } from "react-i18next"

import { Card, CardBody, CardTitle, Col, Row, Table, Label } from "reactstrap"

const Product = props => {
  const {
    currency,
    distanceUnit,
    fdOrder,
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
    coupon,
    discountTotal,
    couponAmount,
    couponType,
    couponDiscount,
    slug,
    tollGuru,
  } = props
  console.log(slug, "ghuyihbbhh")
  return (
    <Row>
      <Col md={8}>
        <CardTitle>{props.t("details")}</CardTitle>

        <hr className="my-3" />
        <div className="d-block d-sm-flex justify-content-between">
          <div className="w-25 d-inline-flex">
            <CardTitle>{props.t("service_type")}</CardTitle>
          </div>

          <div className="w-75 text-muted">
            <div className="clearfix">
              <div className="float-right text-right">
                {fdOrder.vehicleType?.name}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-3" />

        <div className="d-block d-sm-flex justify-content-between">
          <div className="w-25 d-inline-flex">
            <CardTitle>{props.t("pickup")}</CardTitle>
          </div>

          <div className="w-75 text-muted ps-2">
            <ul>
              <li>
                <p>{fdOrder.pickUp?.address}</p>
              </li>
            </ul>
            {/* <div className="clearfix">
              <div className=" text-right">{fdOrder.pickUp?.address}</div>
              <div className=" text-right"> Floor No :{fdOrder.pickUp?.floorNo}</div>
              <div className=" text-right"> Landmark : {fdOrder.pickUp?.landmark}</div>
              <div className=" text-right"> Name :{fdOrder.pickUp?.name}</div>
              <div className=" text-right"> Mobile Number :{fdOrder.pickUp?.mobileNumber}</div>
            </div>*/}

            {/* temprary */}

            {fdOrder?.storeType?.storeType == "PICKUPDROP" && (
              // [SLUGS_NAME.oneTimeShop].includes(slug) &&
              <div className="table-responsive">
                <table className="table w-100 border">
                  <thead>
                    <tr>
                      <th>{props.t("name")}</th>
                      <th>{props.t("mobile")}</th>
                      <th>{props.t("floor-no")}</th>
                      <th>{props.t("landmark")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">{fdOrder.pickUp?.name}</td>
                      <td className="py-1">{fdOrder.pickUp?.mobileNumber}</td>
                      <td className="py-1">{fdOrder.pickUp?.floorNo}</td>
                      <td className="py-1">{fdOrder.pickUp?.landmark}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <hr className="my-3" />

        <div className="d-block d-sm-flex flex-wrap justify-content-between">
          <div className="w-25 d-inline-flex">
            <CardTitle>{props.t("drop_off")}</CardTitle>
          </div>

          {fdOrder.dropMulti?.length == 0 && fdOrder.dropOff?.address && (
            <div className="w-75 text-muted ps-2">
              <ul>
                <li>
                  <p>{fdOrder.dropOff?.address}</p>
                </li>
              </ul>

              {fdOrder?.storeType?.storeType == "PICKUPDROP" &&
                // [SLUGS_NAME.oneTimeShop].includes(slug) && ( //Remove Slug
                fdOrder.dropMulti.length == 0 && (
                  <div className="table-responsive">
                    <table className="table w-100 border">
                      <thead>
                        <tr>
                          <th>{props.t("name")}</th>
                          <th>{props.t("mobile")}</th>
                          <th>{props.t("floor-no")}</th>
                          <th>{props.t("landmark")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-1">{fdOrder.dropOff?.name}</td>
                          <td className="py-1">
                            {fdOrder.dropOff?.mobileNumber}
                          </td>
                          <td className="py-1">{fdOrder.dropOff?.floorNo}</td>
                          <td className="py-1">{fdOrder.dropOff?.landmark}</td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="table w-100 border">
                      <thead>
                        <tr>
                          <th>{props.t("name")}</th>
                          <th>{props.t("quantity")}</th>
                        </tr>
                      </thead>
                      {fdOrder?.line_items?.map(itm => {
                        return (
                          <>
                            {" "}
                            <tbody>
                              <tr>
                                <td className="py-1">{itm?.itemName}</td>
                                <td className="py-1">{itm?.quantity}</td>
                              </tr>
                            </tbody>
                          </>
                        )
                      })}
                    </table>
                  </div>
                )}
            </div>
          )}

          {fdOrder?.storeType?.storeType == "PICKUPDROP" &&
            // [SLUGS_NAME.oneTimeShop].includes(slug) &&
            fdOrder.dropMulti.length !== 0 && (
              <div className="w-75 text-muted ps-2">
                {fdOrder.dropMulti?.map(item => (
                  <>
                    <br />
                    <ul>
                      <li>
                        <p>{item?.address}</p>
                      </li>
                    </ul>
                    <br />

                    <div className="table-responsive">
                      <table className="table w-100 border">
                        <tr>
                          <td>{props.t("name")}</td>
                          <td> {item?.dropOffDetails?.name}</td>
                        </tr>
                        <tr>
                          <td className="py-1">{props.t("mobile")}</td>
                          <td className="py-1">
                            {item?.dropOffDetails?.mobileNumber}
                          </td>
                        </tr>
                        <tr>
                          <td>{props.t("floor-no")}</td>
                          <td className="py-1">
                            {item?.dropOffDetails?.floorNo}
                          </td>
                        </tr>
                        <tr>
                          <td>{props.t("landmark")}</td>
                          <td className="py-1">
                            {item?.dropOffDetails?.landmark}
                          </td>
                        </tr>
                      </table>

                      <table className="table w-100 border">
                        <thead>
                          <tr>
                            <th>{props.t("name")}</th>
                            <th>{props.t("quantity")}</th>
                          </tr>
                        </thead>
                        {item?.line_items?.map(itm => {
                          return (
                            <>
                              {" "}
                              <tbody>
                                <tr>
                                  <td className="py-1">{itm?.itemName}</td>
                                  <td className="py-1">{itm?.quantity}</td>
                                </tr>
                              </tbody>
                            </>
                          )
                        })}
                      </table>

                      <br />
                    </div>
                  </>
                ))}
              </div>
            )}
        </div>

        <hr className="my-3" />

        <div className="d-block d-sm-flex flex-wrap justify-content-between">
          <div className="w-25 d-inline-flex">
            <CardTitle>{props.t("distance")}</CardTitle>
          </div>

          <div className="w-75 text-muted">
            <div className="clearfix">
              <div className="float-right text-right">
                {fdOrder.distance} {props.t(distanceUnit)}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-3" />

        <div className="d-block d-sm-flex flex-wrap justify-content-between">
          <div className="w-25 d-inline-flex">
            <CardTitle>{props.t("duration")}</CardTitle>
          </div>

          <div className="w-75 text-muted">
            <div className="clearfix">
              <div className="float-right text-right">
                {fdOrder.duration} {props.t("minutes")}
              </div>
            </div>
          </div>
        </div>

        {fdOrder?.otp && (
          <>
            <hr className="my-3" />

            <div className="d-block d-sm-flex flex-wrap justify-content-between">
              <div className="w-25 d-inline-flex">
                <CardTitle>{props.t("your_otp")}</CardTitle>
              </div>

              <div className="w-75 text-muted">
                <div className="clearfix">
                  <div className="float-right text-right">{fdOrder?.otp}</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* {(fdOrder?.otp || true) && (
          <>
            <hr className="my-3" />

            <div className="d-block d-sm-flex flex-wrap justify-content-between">
              <div className="w-25 d-inline-flex">
                <CardTitle>{props.t("ride_type")}</CardTitle>
              </div>

              <div className="w-75 text-muted">
                <div className="clearfix">
                  <div className="float-right text-right">
                    {fdOrder?.rideType}
                  </div>
                </div>
              </div>
            </div>
          </>
        )} */}

        {!!orderInstructions && (
          <div className="mt-5">
            <CardTitle>{props.t("booking_instructions")}</CardTitle>

            <hr className="my-3" />

            <p>{orderInstructions}</p>
          </div>
        )}
      </Col>
      <Col md={4}>
        <CardTitle>{props.t("fare_breakdown")}</CardTitle>
        <hr className="my-3" />
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
          <Label className="col-md-6 text-muted">{props.t("trip_fare")}</Label>

          <div className="col-md-6 d-flex justify-content-end font-weight-bold">
            {currency?.sign}
            {subTotal || 0}
          </div>
        </Row>
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

        {couponDiscount && (
          <Row>
            <Label className="col-md-6 text-muted">
              {props.t("coupon_saving")}
            </Label>

            <div className="col-md-6 d-flex justify-content-end font-weight-bold">
              -{currency?.sign}
              {couponDiscount || 0}
            </div>
          </Row>
        )}
        <Row>
          <Label className="col-md-6 text-muted">
            {[SLUGS_NAME?.switch].includes(slug)
              ? props.t("booking_fee")
              : props.t("tax_fee")}{" "}
            {tax?.tax || 0}%
          </Label>

          <div className="col-md-6 d-flex justify-content-end font-weight-bold">
            {currency?.sign}
            {tax?.taxAmount || 0}
          </div>
        </Row>
        {tollGuru && fdOrder?.isTollTax && (
          <div className="py-2 my-2">
            <h6 className="m-0 py-2 fw-bold">{props.t("toll_details")}</h6>
            <ul className="list-unstyled ps-0 mb-0">
              {fdOrder?.tolls?.tolls?.length > 0 &&
                fdOrder?.tolls?.tolls?.map((item, index) => (
                  <li
                    key={index}
                    className="py-1 d-flex align-items-center justify-content-between gap-10"
                  >
                    <span className="text-muted">{item?.name}</span>
                    <span className="fw-sbold">
                      {currency?.sign}
                      {item?.tagCost}
                    </span>
                  </li>
                ))}

              <li className="py-1 d-flex align-items-center justify-content-between gap-10 border-top border-bottom">
                <span className="text-muted">{props.t("total_toll")} </span>
                <span className="fw-sbold">
                  {currency?.sign}
                  {fdOrder?.tollTaxCost}
                </span>
              </li>
            </ul>
          </div>
        )}

        <Row>
          <Label className="col-md-6 text-muted">
            {props.t("total_payable")}
          </Label>

          <div className="col-md-6 d-flex justify-content-end font-weight-bold">
            {currency?.sign}
            {total || 0}
          </div>
        </Row>

        {/* {coupon && (
          <Row>
            <Label className="col-md-6 text-muted">{props.t("coupon")}</Label>

            <div className="col-md-6 d-flex justify-content-end font-weight-bold">
              {coupon}
            </div>
          </Row>
        )} */}

        {/* <Row>
          <Label className="col-md-6 text-muted">{props.t("couponType")}</Label>

          <div className="col-md-6 d-flex justify-content-end font-weight-bold">
            {currency?.sign}
            {couponType || 0}
          </div>
        </Row> */}
      </Col>

      {children}
    </Row>
  )
}

export default withTranslation()(Product)
