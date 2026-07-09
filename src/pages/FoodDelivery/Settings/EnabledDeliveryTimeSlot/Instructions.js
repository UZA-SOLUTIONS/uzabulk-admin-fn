import React from "react"

export default props => {
  const { _STORE_SETTINGS_FORM } = props

  return (
    <div className="label-content">
      <h4>
        {props.t("enabled")} {props.t("delivery_timeSlot")}
      </h4>
    </div>
  )
}
