import React from "react"

export default props => {
  return (
    <div className="label-content">
      <h4>{props.t("social_media_login_int")}</h4>
      <p>
        <small>
          <span>{props.t("social_media_login_keys_int")}</span>
        </small>
      </p>
    </div>
  )
}
