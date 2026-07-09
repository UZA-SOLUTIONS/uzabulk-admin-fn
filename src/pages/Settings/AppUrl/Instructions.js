import React from "react"

export default props => {
  return (
    <div className="label-content">
      <h4>{props.t("app_url")}</h4>
      <p>
        <small>{props.t("app_url_int")}</small>
      </p>

      <p>
        <small>
          <b>
            {props.t("customer_app_url")} ({props.t("android")}):
          </b>
          <span>{props.t("customer_android_url_int")}</span>
        </small>
      </p>

      <p>
        <small>
          <b>
            {props.t("driver_app_url")} ({props.t("android")}) :
          </b>
          <span>{props.t("driver_android_url_int")}</span>
        </small>
      </p>
      <p>
        <small>
          <b>
            {props.t("customer_app_url")} ({props.t("ios")}) :
          </b>
          <span>{props.t("customer_ios_url_int")}</span>
        </small>
      </p>

      <p>
        <small>
          <b>
            {props.t("driver_app_url")} ({props.t("ios")}) :
          </b>
          <span>{props.t("driver_ios_url_int")}</span>
        </small>
      </p>
    </div>
  )
}
