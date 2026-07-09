import React from "react"

export default ({ fields, ...props }) => {
  return (
    <div className="label-content">
      <h4>{props.t("request_type")}</h4>
    </div>
  )
}
