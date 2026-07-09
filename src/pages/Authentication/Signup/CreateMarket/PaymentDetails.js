import React, { useState } from "react"

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js"

import { Alert } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

import paymenicon from "assets/images/paymen-icon.png"

const PaymentDetails = props => {
  const [error, seterror] = useState("")

  const changeY = event => {
    if (event.error) {
      seterror(event.error.message)
    } else {
      seterror("")
    }
  }

  return (
    <div className="col-lg-12">
      <div className="payment_sction">
        <div className="paymne_head">
          <h2>{props.t("payment_details")}</h2>
          <img src={paymenicon} />
        </div>
        <div className="wrap_paymenform">
          {error && typeof error === "string" ? (
            <Alert color="danger">{error}</Alert>
          ) : null}

          <div className="row">
            <div className="input-group col-sm-12">
              <label>{props.t("card_number")}</label>

              <CardNumberElement
                id="card-number"
                placeholder={props.t("card_number_placeholder")}
                className="form-control"
                onChange={changeY}
              />
            </div>

            <div className="input-group col-sm-9">
              <label>{props.t("expire_date")}</label>
              <CardExpiryElement
                id="card-expire"
                placeholder={props.t("expire_date_placeholder")}
                className="form-control"
                onChange={changeY}
              />
            </div>

            <div className="input-group col-sm-3">
              <label>{props.t("cvv_code")}</label>

              <CardCvcElement
                id="card-cvc"
                placeholder={props.t("cvv_code_placeholder")}
                className="form-control"
                onChange={changeY}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withTranslation()(PaymentDetails)
