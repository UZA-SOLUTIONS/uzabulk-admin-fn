import React from "react"

export default props => {
  return (
    <div className="label-content">
      <h4>{props.t("delivery_mode")}</h4>

      <p>
        {props?.hideRestaurant ?
          <small>{props.t("delivery_mode_store_int")}</small> :
          <small>{props.t("delivery_mode_int")}</small>}
      </p>

    </div>
  )
}
