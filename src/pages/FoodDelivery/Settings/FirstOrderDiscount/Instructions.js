import React from "react"

export default ({ fields, ...props }) => {
  return (
    <div className="label-content">
      <h4>{props.t("first_order_discount")}</h4>
    </div>
  )
}
