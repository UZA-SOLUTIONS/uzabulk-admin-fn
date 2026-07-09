import React from "react"

export default props => {
  return (
    <div className="label-content">
      <h4>{props.t("admin_look_feel")} </h4>
      <p>
        <small>{props.t("look_feel_int")}</small>
      </p>
      <p>
        <small>
          <b>{props.t("primary_color")} :</b>
          <span>{props.t("primery_color_int")}</span>
        </small>
      </p>

      <p>
        <small>
          <b>{props.t("primary_font_color")} :</b>
          <span>{props.t("font_color_int")}</span>
        </small>
      </p>
    </div>
  )
}
