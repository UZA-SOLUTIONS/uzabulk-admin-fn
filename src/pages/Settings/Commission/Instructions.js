import React from "react"

export default props => {
  return (
    <div className="label-content">
      <h4>{props.t("commission_transfer")}</h4>

      <p>
        <small>{props.t("comission_transfer_int")}</small>
      </p>
    </div>
  )
}
