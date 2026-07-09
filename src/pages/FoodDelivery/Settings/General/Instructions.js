import React from "react"

export default ({ fields, ...props }) => {

  const messages = [
    !["basic", "premium"].includes(props.plan) && {
      title: "store_image",
      message: "store_image_int",
    },
    // props?._STORE_SETTINGS_FORM?.deliveryAreaVendor && !["SERVICEPROVIDER", "CARRENTAL"].includes(props.storeType) &&

    // {
    //   title: "delivery_area_vendor",
    //   message: `delivery_area_vendor_int`,
    // }
    ,
    //  []),
    /* {
      title: "delivery_area_driver",
      message: `delivery_area_driver_int`,
    }, */
    // props.storeType == "SERVICEPROVIDER" ? {
    //   title: "service_per_request",
    //   message: "service_per_req_int",
    // } : {
    //   title: "driver_per_request",
    //   message: "driver_per_req_int"
    // },
  ]
  return (
    <div className="label-content">
      <h4>{props.t("general_settings")}</h4>

      {messages?.map(m => (
        <p>
          <small>
            <b>{props.t(m?.title)}</b>
            <span>
              {props.t(m?.message, {
                order: props._STORE_SETTINGS_FORM.bookingAreaDriver
                  ? props.t("booking")
                  : props.t("order"),
                distanceUnit: fields?.distanceUnit?.toUpperCase(),
              })}
            </span>
          </small>
        </p>
      ))}
    </div>
  )
}
