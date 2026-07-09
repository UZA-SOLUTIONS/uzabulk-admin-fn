import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import Select from "react-select"
// isEnableMultiplePaymentMethod
import { SLUGS_NAME as SLUGS } from "helpers/contants"

import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap"
import Instructions from "./Instructions"

const PaymentMethod = props => {
  const {
    fields,
    handleChange,
    handlePaymentChange,
    handleMultiPaymentMethod,
    handlePaymentStatusChange,
    isMultiplePaymentMethodEnable,
    paymentMethodForCard,
    settings,
  } = props

  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t} />
      </Col>

      <Col lg={8}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label>{props.t("payment_mode")}</Label>

              <div className="status-switch square-switch">
                <input
                  className="switcher"
                  type="checkbox"
                  id="square-switch1-pmode"
                  switch="none"
                  checked={fields?.paymentMode === "live"}
                  onChange={() =>
                    handleChange &&
                    handleChange("paymentMode")({
                      target: {
                        value:
                          fields?.paymentMode === "live" ? "sandbox" : "live",
                      },
                    })
                  }
                />
                <label
                  htmlFor="square-switch1-pmode"
                  data-on-label={props.t("live")}
                  data-off-label={props.t("sandbox")}
                />
              </div>
            </FormGroup>
          </Col>

          {fields?.paymentSettings?.map((paymentMethod, index) => {
            const switchId = `switch-${paymentMethod?.payment_method?.toLowerCase()}`
            const isActive = paymentMethod?.status === "active"

            return (
              <React.Fragment
                key={`${paymentMethod?.payment_method?.toLowerCase()}-${index}`}
              >
                <Col md={12}>
                  <hr className="my-3" />

                  <div className="d-flex">
                    {/*[SLUGS.lemonee].includes(settings.slug) &&
                    ["cod"].includes(paymentMethod?.payment_method) ? (
                      <h5 className="text-uppercase mr-3">
                        {props.t("cashcard_on_delivery")}
                      </h5>
                    ) : (
                      <h5 className="text-uppercase mr-3">
                        {props.t(paymentMethod?.payment_method)}
                      </h5>
                    )*/}

                    <h5 className="text-uppercase mr-3">
                      {props.t(paymentMethod?.payment_method)}
                    </h5>

                    <div className="square-switch">
                      <input
                        type="checkbox"
                        id={switchId}
                        switch="none"
                        checked={paymentMethod?.status}
                        onChange={() =>
                          handlePaymentStatusChange &&
                          handlePaymentStatusChange(
                            index,
                            paymentMethod?.payment_method
                          )({
                            target: {
                              value: !paymentMethod?.status,
                            },
                          })
                        }
                      />
                      <label
                        htmlFor={switchId}
                        data-on-label={props.t("on")}
                        data-off-label={props.t("off")}
                      />
                    </div>
                  </div>
                  {isMultiplePaymentMethodEnable &&
                    paymentMethod?.status &&
                    ![
                      "wallet",
                      "braintree",
                      "razorpay",
                      "orangeMoney",
                      "cod",
                      "wallet",
                      "cardOnDelivery",
                    ].includes(paymentMethod?.payment_method) && (
                      <div className="d-flex mt-2 mb-2">
                        <p className="text-uppercase mr-3 ">
                          {props.t("active_payment_method")}{" "}
                          {props.t("for_add_card")}
                        </p>

                        <div className="square-switch">
                          <input
                            type="checkbox"
                            id={`activePaymentMethodForAddCard-${index}`}
                            switch="none"
                            checked={
                              paymentMethod?.payment_method ==
                              fields?.activePaymentMethodForAddCard
                            }
                            onChange={() =>
                              paymentMethodForCard()({
                                target: {
                                  value: paymentMethod?.payment_method,
                                },
                              })
                            }
                          />
                          <label
                            htmlFor={`activePaymentMethodForAddCard-${index}`}
                            data-on-label={props.t("on")}
                            data-off-label={props.t("off")}
                          />
                        </div>
                      </div>
                    )}
                </Col>

                {/* {paymentMethod?.status && !["cod", "wallet"].includes(paymentMethod) &&
                  <>
                    <Col md={6} >

                      <Label> {props.t("direct_payment_method")}</Label>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Select
                        options={mutlipaymentoption}
                      />
                    </Col>
                  </>
                } */}

                {paymentMethod?.status &&
                  Object.keys(paymentMethod)
                    .filter(
                      item =>
                        !["status", "payment_method", "limit"].includes(item)
                    )
                    .map(item => {
                      console.log(item, "paymentMethod[item]")
                      const liveInputId = `input-${paymentMethod?.payment_method?.toLowerCase()}-${item}`
                      return (
                        <Col sm={6} lg={12} xl={6}>
                          <FormGroup>
                            <Label
                              for={liveInputId}
                              className="text-uppercase text-truncate"
                            >
                              {props.t(item)}
                              <span className="text-danger ml-1">*</span>
                            </Label>

                            <Input
                              id={liveInputId}
                              value={paymentMethod[item] || ""}
                              onChange={handlePaymentChange(index, item)}
                              required
                            />
                          </FormGroup>
                        </Col>
                      )
                    })}
                <Col>
                  {paymentMethod?.payment_method == "pay360" &&
                    paymentMethod?.status == true && (
                      <Link to="/settings/bankaccount">
                        Pay360 Bank Account
                      </Link>
                    )}
                </Col>
                <Col>
                  {paymentMethod?.payment_method == "pay360" &&
                    paymentMethod?.status == true && (
                      <Link to="/settings/pay360merchant">Merchant</Link>
                    )}
                </Col>
              </React.Fragment>
            )
          })}
        </Row>
      </Col>
    </Row>
  )
}

PaymentMethod.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
  handlePaymentChange: PropTypes.func,
}

const mapStateToProps = ({ Settings, Login }) => ({
  storepaymentMethod: Settings.settings.storepaymentMethod,
  directPaymentGetway: Login?.directPaymentGetway,
  settings: Settings?.settings,
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PaymentMethod)
)
