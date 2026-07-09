import React from "react"

export default ({ fields, ...props }) => {
  return (
    <div className="label-content">
      <h4>{props.t("delivery_platform")}</h4>
    </div>
  )
}
