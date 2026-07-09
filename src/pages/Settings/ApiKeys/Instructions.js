import React from "react"

export default (props) => {
  return (
    <div className="label-content">
      <h4>{props.t("api_keys")}</h4>
      <p>
        <small>{props.t("api_keys_int")}</small>
      </p>

      {props.tabId === "4" && (<><p>
        <small>
          <b>{props.t('android_google_map_key')} :</b>
          <span>{props.t("android_google_maps_key_int")}</span>
        </small>
      </p>

        <p>
          <small>
            <b>{props.t("ios_google_map_key")} :</b>
            <span>
              {props.t("ios_google_maps_key_int")}
            </span>
          </small>
        </p>

        <p>
          <small>
            <b>{props.t("web_google_map_key")} :</b>
            <span>{props.t("web_google_maps_key_int")}</span>
          </small>
        </p>
        <p>
          <small>
            <b>{props.t("server_google_map_key")} :</b>
            <span>{props.t("server_google_maps_key_int")}</span>
          </small>
        </p>
      </>)}
    </div>
  )
}
