import React from "react"

export default props => {
  return (
    <div className="label-content">
      <h4>{props.t("payment_method")}</h4>

      <p>
        <small>
          <b>{props.t("payment_mode")} :</b>
          <span>{props.t("payment_mode_int")}</span>
        </small>
      </p>

      <p>
        <small>
          <b>
            {props.t("stripe")} ({props.t("live")}) :
          </b>
          <span>{props.t("stripe_live_int")}</span>
        </small>
      </p>
      <p>
        <small>
          <b>
            {props.t("stripe")} ({props.t("sandbox")}) :
          </b>
          <span>{props.t("stripe_sandbox_int")}</span>
        </small>
      </p>
    </div>
  )
}
