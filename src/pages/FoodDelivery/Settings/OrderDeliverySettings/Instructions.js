import React from "react"

export default ({ fields, ...props }) => {
  return (
    <div className="label-content">
      <h4>{props.t("Order_Delivery_Settings")}</h4>
    </div>
  )
}
