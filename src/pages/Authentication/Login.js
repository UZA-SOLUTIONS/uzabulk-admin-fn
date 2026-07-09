import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Alert, Spinner } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// actions
import { loginUser, apiError } from "store/actions"

import { DEFAULT_APP_LOGO } from "helpers/contants"

//i18n
import { withTranslation } from "react-i18next"

const Login = props => {
  const { loading } = props

  const [fields, setfields] = useState({ email: "", password: "" })

  const [viewPassword, setViewPassword] = useState(false)

  const handleViewPassword = () => {
    setViewPassword(!viewPassword)
  }

  useEffect(() => {
    props.apiError()
  }, [])

  useEffect(() => {
    let bodyWrapper = document.querySelector(".auth-body #login")
    let loginForm = document.querySelector(".auth-body form#loginform")
    let formH1 = document.querySelector(".auth-body #login h1")
    let formButton = document.querySelector(".auth-body #login .fullwidthbtn")
    let formLink = document.querySelector(".auth-body .colortextlink")

    if (props.publicDomainData?.themeSettings?.bodyWrapper) {
      if (bodyWrapper) {
        bodyWrapper.style.background =
          props.publicDomainData.themeSettings.bodyWrapper.backgroundColor ||
          "initial"
      }

      if (loginForm) {
        loginForm.style.background =
          props.publicDomainData.themeSettings.bodyWrapper.backgroundColor ||
          "initial"
        loginForm.style.color =
          props.publicDomainData.themeSettings.bodyWrapper.fontColor ||
          "initial"
      }

      if (formH1) {
        formH1.style.color =
          props.publicDomainData.themeSettings.bodyWrapper.fontColor ||
          "initial"
      }

      if (formButton) {
        formButton.style.background =
          props.publicDomainData.themeSettings.button.backgroundColor ||
          "initial"
        formButton.style.color =
          props.publicDomainData.themeSettings.button.fontColor || "initial"
      }

      if (formLink) {
        formLink.style.color =
          props.publicDomainData.themeSettings.hyperlink.fontColor || "initial"
      }
    }
  }, [props.publicDomainData])

  const handleChange = name => e => {
    const { value } = e.target
    setfields(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.loginUser(fields, props.history)
  }

  return (
    <section id="login">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="sign-in-top">
              <img
                src={DEFAULT_APP_LOGO}
                alt=""
                className="img-fluid registerlogo"
              />
            </div>
          </div>
        </div>

        <form
          id="loginform"
          onSubmit={handleSubmit}
          className="spinner-content position-relative"
        >
          {loading && (
            <div className="spinner">
              <Spinner color="primary" />
            </div>
          )}

          {props.error && typeof props.error === "string" ? (
            <Alert color="danger">{props.t(props.error)}</Alert>
          ) : null}

          <div className="row">
            <div className="col-lg-12">
              <h1>{props.t("signin")}</h1>
            </div>

            <div className="col-lg-12">
              <div className="input-group">
                <label>{props.t("email_label")}</label>
                <input
                  type="text"
                  placeholder={props.t("email_label")}
                  value={fields?.email}
                  onChange={handleChange("email")}
                />
              </div>
            </div>

            <div className="col-lg-12">
              <div className="input-group" style={{ position: "relative" }}>
                <label>{props.t("password")}</label>
                <input
                  type={viewPassword ? "text" : "password"}
                  placeholder={props.t("password_placeholder")}
                  value={fields?.password}
                  onChange={handleChange("password")}
                />
                <a
                  onClick={() => setViewPassword(!viewPassword)}
                  className="position-absolute"
                  style={{ top: 55, right: 25 }}
                >
                  <i
                    className={viewPassword ? "far fa-eye" : "fa fa-eye-slash"}
                  ></i>
                </a>
              </div>

              <div className="forgor-password"></div>
            </div>

            <div className="col-lg-12">
              <button
                type="submit"
                className="themebtn fullwidthbtn"
                id="nextBtn"
              >
                {props.t("signin")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

const mapStateToProps = state => {
  const { error, loading, publicDomainData } = state.Login
  return { error, loading, publicDomainData }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError })(withTranslation()(Login))
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
}
