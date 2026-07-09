import React from "react"

export default props => {
  return (
    <div className="label-content">
      <h4>{props.t("app_look_feel")} </h4>
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
          <b>{props.t("secondary_color")} :</b>
          <span>{props.t("secondary_color_int")}</span>
        </small>
      </p>
      <p>
        <small>
          <b>{props.t("font_color")} :</b>
          <span>{props.t("font_color_int")}</span>
        </small>
      </p>
      {/* <p>
        <small>
          <b>{props.t("logo")}:</b>
          <span>{props.t("logo_int")}</span>
        </small>
      </p> */}
      {/* <p>
        <small>
          <b>{props.t("banner_200_500")} :</b>
          <span>{props.t("banner_200_500_int")}</span>
        </small>
      </p> */}
      {/* <p>
        <small>
          <b>Fonts:</b>
          <span>Choose Cool Text Font of your choice</span>
        </small>
      </p> */}
      {/* <p>
        <small>
          <b>{props.t("banner_text")}:</b>
          <span>
            {props.t("banner_text_int")}
          </span>
        </small>
      </p> */}
    </div>
  )
}
