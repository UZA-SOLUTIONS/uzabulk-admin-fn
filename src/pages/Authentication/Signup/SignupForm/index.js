import React from "react"

import { TOS_LINK, PRIVACY_LINK } from "helpers/contants"

const SignupForm = props => {
  const { setactiveTab, fields, handleChange, registerUserEmail, apiError } =
    props

  const submitNext = () => {
    if (!fields?.email) {
      window.scrollTo(0, 0)
      return apiError(props.t("email_required"))
    }
    if (!fields?.firstName) {
      window.scrollTo(0, 0)
      return apiError("first_name_required")
    }
    if (!fields?.mobileNumber) {
      window.scrollTo(0, 0)
      return apiError("mobile_required")
    }
    if (!fields?.password) {
      window.scrollTo(0, 0)
      return apiError("password_required")
    }

    registerUserEmail(
      { ...fields, name: fields?.firstName + " " + fields?.lastName },
      () => {
        setactiveTab(2)
      }
    )
  }

  return (
    <div className="tab">
      <div className="row">
        <div className="col-lg-12">
          <h1>{props.t("signup_heading")}</h1>
        </div>

        <div className="col-lg-12">
          <div className="input-group">
            <label>{props.t("email_label")}<span className="text-danger ml-1">*</span></label>
            <input
              required
              name="email"
              type="email"
              placeholder={props.t("email_label")}
              value={fields?.email}
              onChange={handleChange("email")}
            />
          </div>
        </div>

        <div className="col-lg-6 nopaddright">
          <div className="input-group">
            <label>{props.t("first_name")}<span className="text-danger ml-1">*</span></label>
            <input
              required
              type="text"
              placeholder={props.t("first_name")}
              value={fields?.firstName}
              onChange={handleChange("firstName")}
            />
          </div>
        </div>

        <div className="col-lg-6 nopaddleft">
          <div className="input-group">
            <label>{props.t("last_name")}<span className="text-danger ml-1">*</span></label>
            <input
              required
              type="text"
              placeholder={props.t("last_name")}
              name="lastName"
              value={fields?.lastName}
              onChange={handleChange("lastName")}
            />
          </div>
        </div>

        <div className="col-lg-12">
          <div className="input-group">
            <label>{props.t("mobile")}<span className="text-danger ml-1">*</span></label>
            <input
              required
              type="text"
              placeholder={props.t("mobile")}
              value={fields?.mobileNumber}
              onChange={handleChange("mobileNumber")}
            />
          </div>
        </div>

        <div className="col-lg-12">
          <div className="input-group">
            <label>{props.t("password")}<span className="text-danger ml-1">*</span></label>
            <input
              required
              type="password"
              placeholder={props.t("password_placeholder")}
              value={fields?.password}
              onChange={handleChange("password")}
            />
          </div>
        </div>

        <div className="col-lg-12">
          <div className="custom-control custom-checkbox mb-3">
            <input
              required
              type="checkbox"
              className="custom-control-input"
              id="customCheck"
              name="example1"
              checked={fields?.policy}
              onChange={e => {
                handleChange("policy")({ target: { value: !fields?.policy } })
              }}
            />

            <label className="custom-control-label" for="customCheck">
              {props.t("privacy_policy_text")}{" "}
              <a
                href={
                  !props.isHyperApp
                    ? "https://" +
                      window.location.hostname?.replace("app.", "") +
                      "/terms-condition"
                    : TOS_LINK
                }
                target="_blank"
                className="colortextlink"
              >
                {props.t("terms_of_service")}
              </a>{" "}
              {props.t("and")}{" "}
              <a
                href={
                  !props.isHyperApp
                    ? "https://" +
                      window.location.hostname?.replace("app.", "") +
                      "/privacy-policy"
                    : PRIVACY_LINK
                }
                target="_blank"
                className="colortextlink"
              >
                {props.t("privacy_policy")}<span className="text-danger ml-1">*</span>
              </a>
            </label>
          </div>
        </div>

        <div className="col-lg-12">
          <button
            type="button"
            className="themebtn fullwidthbtn"
            onClick={submitNext}
          >
            {props.t("next_marketplace")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
