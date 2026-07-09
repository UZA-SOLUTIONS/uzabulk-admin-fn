import React from "react"

export default ({ fields, ...props }) => {
  return (
    <div className="label-content">
      <h4>{props.t("tax_level")}</h4>
    </div>
  )
}
