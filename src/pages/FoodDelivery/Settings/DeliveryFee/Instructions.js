import React from "react"

export default ({ fields, ...props }) => {
  const messages = [
    {
      title: "base_price",
      message: "base_price_int",
    },
    {
      title: "price_per_km",
      message: "price_per_km_int",
    },
    {
      title: "price_per_minute",
      message: "price_per_min_int",
    },
  ]

  return (
    <div className="label-content">
      <h4>{props.t("delivery_fee")}</h4>
      <p>
        <small>{props.t("delivery_fee_int")}</small>
      </p>
      {messages?.map(m => (
        <p>
          <small>
            <b>
              {props.t(m.title, {
                distanceUnit: fields?.distanceUnit?.toUpperCase(),
              })}
              :
            </b>
            <span>
              {props.t(m.message, {
                distanceUnit: fields?.distanceUnit?.toUpperCase(),
              })}
            </span>
          </small>
        </p>
      ))}
    </div>
  )
}
