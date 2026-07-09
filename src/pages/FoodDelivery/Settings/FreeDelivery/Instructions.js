import React from "react"

export default ({ fields, ...props }) => {
  return (
    <div className="label-content">
      <h4>{props.t("free_delivery")}</h4>
    </div>
  )
}
