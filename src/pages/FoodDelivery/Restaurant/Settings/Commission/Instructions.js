import React from "react"
import { SLUGS_NAME } from "helpers/contants"

export default props => {
  return (
    <div className="label-content">
      <h4>{props.t("commission")}</h4>
      <p>
        <small>{props.t("commission_int1", {
            store: props.hideRestaurantName ? props.t("Store") : "Vendor",
            driver: props.slug === SLUGS_NAME.caterPlus ? props.t("driver") : props.t("delivery_boy")
          })}</small>
      </p>
      <p>
        <small>{props.t("commission_int2")}</small>
      </p>
      <p>
        {props?.hideRestaurantName ? <small>{props.t("commission_store_int3")}</small>
          : <small>{props.t("commission_int3")}</small>
        }
      </p>
    </div>
  )
}
