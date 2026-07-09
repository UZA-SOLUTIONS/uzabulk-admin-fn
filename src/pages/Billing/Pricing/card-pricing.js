import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Media } from "reactstrap"

import { INTERVAL } from "helpers/contants"

const CardPricing = props => {
  const {
    upgradeNow,
    activeTab,
    needCustomerApp,
    billingPlan,
    isTrial,
    isExpired,
    toggleUpgradeConfirmModal,
    cardDetails,
    toggleNewCardModal,
  } = props

  const plan = props?.pricing

  let itemPrice = props?.pricing?.price

  if (needCustomerApp) {
    itemPrice = plan?.price + plan?.addon
  }

  /* if (plan?.interval === "year") {
    itemPrice = plan?.price / 12

    if (needCustomerApp) {
      itemPrice = plan?.price / 12 + plan?.addon / 12
    }
  } */

  let discount = 0

  if (props?.planAmount && itemPrice != props?.planAmount) {
    discount = props?.planAmount
  }

  return (
    <React.Fragment>
      <Col sm="4" md="3" lg="4" xl="3" className="text-center">
        <Card
          className={`plan-box ${
            isTrial ? "" : billingPlan === plan?._id ? "current-plan" : ""
          }`}
        >
          <CardBody className="p-4">
            <Media>
              <Media body>
                <h5>{INTERVAL[props?.pricing?.interval]}</h5>
              </Media>
            </Media>

            <div className="py-2">
              <h3>
                <sup>
                  <small>$</small>
                </sup>
                {!isTrial && billingPlan === plan?._id && discount ? (
                  <>
                    <del>{itemPrice}</del> {discount}
                  </>
                ) : (
                  itemPrice
                )}
              </h3>
              <h3>+</h3>
              <h3>
                <sup>
                  <small>$</small>
                </sup>
                {plan?.addon || 0}
              </h3>
              ({props.t("setup_fee")})
            </div>

            <div className="text-center plan-btn mb-4" />

            <div className="plan-features">
              {props?.needCustomerApp && (
                <>
                  <h3 className="text-success text-center mt-4 text-uppercase">
                    {props.t("setup_charges")}
                  </h3>

                  <p>
                    <i className="bx bx-checkbox-square text-primary mr-2" />{" "}
                    **Branded Customer Mobile App $299 (One time charges)
                    applicable with Add-on
                  </p>
                </>
              )}
            </div>

            <div className="d-flex justify-content-center mt-4 mb-2">
              <Link
                to={props.pricing.link}
                id={plan?._id}
                className={`${
                  !!cardDetails &&
                  billingPlan !== plan?._id &&
                  (isTrial ? true : isExpired)
                    ? " "
                    : ""
                }upgrade-btn align-self-center btn btn-sm waves-effect waves-light ${
                  billingPlan === plan?._id
                    ? "btn-outline-secondary"
                    : "btn-primary"
                }`}
                onClick={e => {
                  e.preventDefault()

                  if (!cardDetails && billingPlan !== plan?._id) {
                    // Check card & move to chat
                    toggleNewCardModal(true, plan?._id)()
                  } else if (
                    !isTrial &&
                    billingPlan !== plan?._id &&
                    !isExpired
                  ) {
                    // Confirm upgrade
                    toggleUpgradeConfirmModal(plan?._id)
                  } else if (billingPlan !== plan?._id && !isExpired) {
                    // Confirm upgrade
                    toggleUpgradeConfirmModal(plan?._id)
                  }
                }}
              >
                {billingPlan === plan?._id && !isTrial
                  ? props.t("current")
                  : props.t("upgrade_now")}
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardPricing.propTypes = {
  pricing: PropTypes.object,
}

export default CardPricing
