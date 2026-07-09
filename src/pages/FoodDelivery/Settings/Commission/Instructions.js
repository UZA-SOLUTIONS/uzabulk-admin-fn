import React from "react"

export default props => {
  return (
    props.isServicep !== "SERVICEPROVIDER" ?
      (<div className="label-content">
        <h4>{props.t("commission")}</h4>

        <p>
          <small>{props.t("commission_int1")}</small>
        </p>

        <p>
          <small>{props.t("product_commission_int")}</small>
        </p>
        {/* <p>
          <small>{props.t("commission_int2")}</small>
        </p>
        {!props.hideRestaurantName && <p>
          <small>{props.t("commission_int3")}</small>
        </p>} */}
      </div>)
      : (<div className="label-content">
        <h4>{props.t("commission")}</h4>


      </div>)


  )
}
