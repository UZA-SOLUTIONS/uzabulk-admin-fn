import React from "react"

export default props => {
  return (
    <p>
      <h4>{props.t("exchange_rate")}</h4>
      <small>{props.t("exchange_rate_ins")}</small>
    </p>
  )
}
