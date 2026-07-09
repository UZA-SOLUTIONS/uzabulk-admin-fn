import React from "react"

export default props => {
  console.log(props.hide,"hide");
  return (
    <div className="label-content">
      <h4>{props.t("waitint_time")}</h4>
      {props?._STORE_SETTINGS_FORM?.restaurantWaitTime && props.hide !=="SERVICEPROVIDER" &&(
        <p>
          <small>{props.t("waiting_time_int")}</small>
        </p>
      )}
    </div>
  )
}
