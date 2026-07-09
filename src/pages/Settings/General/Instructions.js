import React from "react"

export default props => {
  return (
    <div className="label-content">
      <h4>{props.t("general_settings")}</h4>
      <p>
        <small>{props.t("general_settings_int")}</small>
      </p>
      <p>
        <small>
          <b> {props.t("country_timezone")}:</b>
          <span>{props.t("country_timezone_int")}</span>
        </small>
      </p>
      <p>
        <small>
          <b> {props.t("delivery_multi_type")}:</b>
          <span>{props.t("delivery_multi_type_int")}</span>
        </small>
      </p>

      <p>
        <small>
          <b>{props.t("currency")}:</b>
          <span>{props.t("currency_int")}</span>
        </small>
      </p>
      <p>
        <small>
          <b>{props.t("language")}:</b>
          <span>{props.t("language_int")}</span>
        </small>
      </p>
      <p>
        <small>
          <b>{props.t("distnce_unit")} :</b>
          <span>{props.t("distance_unit_int")}</span>
        </small>
      </p>
      {/* <p>
          <small>
            <b>{props.t("aggregator")} :</b>
            <span>{props.t("aggregator_int")}</span>
          </small>
        </p> */}
    </div>
  )
}
