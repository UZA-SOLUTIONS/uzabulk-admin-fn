import React from "react"

export default props => {
  const { _STORE_SETTINGS_FORM } = props

  return (
    <div className="label-content">
      <h4>
        {props.t(
          _STORE_SETTINGS_FORM.dynamicOrderSchedule
            ? "booking_schedule"
            : "order_schedule"
        )}
      </h4>
    </div>
  )
}
