import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Spinner, Alert } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// action
import { userForgetPassword, userResetPassword, apiError } from "store/actions"

import { DEFAULT_APP_LOGO } from "helpers/contants"

//i18n
import { withTranslation } from "react-i18next"

const ForgotPassword = props => {
  const { loading, fields, handleChange, handleSubmit } = props

  return (
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

      {props.forgetError && typeof props.forgetError === "string" ? (
        <Alert color="danger">{props.t(props.forgetError)}</Alert>
      ) : null}

      {props.forgetSuccessMsg && typeof props.forgetSuccessMsg === "string" ? (
        <Alert color="success">{props.t(props.forgetSuccessMsg)}</Alert>
      ) : null}

      <div className="row">
        <div className="col-lg-12">
          <h1>{props.t("forgot_password")}</h1>
        </div>
        <div className="col-lg-12">
          <div className="input-group">
            <label>{props.t("email_placeholder")}</label>
            <input
              type="email"
              placeholder={props.t("email_placeholder")}
              value={fields.email}
              onChange={handleChange("email")}
            />
          </div>
        </div>

        <div className="col-lg-12">
          <button type="submit" className="themebtn fullwidthbtn" id="nextBtn">
            {props.t("send")}
          </button>
        </div>
      </div>
    </form>
  )
}

const ResetPassword = props => {
  const { loading, fields, handleChange, handleSubmit } = props

  return (
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

      {props.forgetError && typeof props.forgetError === "string" ? (
        <Alert color="danger">{props.t(props.forgetError)}</Alert>
      ) : null}

      {props.forgetSuccessMsg && typeof props.forgetSuccessMsg === "string" ? (
        <Alert color="success">{props.t(props.forgetSuccessMsg)}</Alert>
      ) : null}

      <div className="row">
        <div className="col-lg-12">
          <h1>{props.t("reset_password")}</h1>
        </div>
        <div className="col-lg-12">
          <div className="input-group">
            <label>{props.t("otp")}</label>
            <input
              type="text"
              placeholder={props.t("otp")}
              value={fields.otp}
              onChange={handleChange("otp")}
            />
          </div>
        </div>

        <div className="col-lg-12">
          <div className="input-group">
            <label>{props.t("password")}</label>
            <input
              type="password"
              placeholder={props.t("password_placeholder")}
              value={fields.password}
              onChange={handleChange("password")}
            />
          </div>
        </div>

        <div className="col-lg-12">
          <div className="input-group">
            <label>{props.t("confirm_password")}</label>
            <input
              type="password"
              placeholder={props.t("confirm_password_placeholder")}
              value={fields.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
          </div>
        </div>

        <div className="col-lg-12">
          <button type="submit" className="themebtn fullwidthbtn" id="nextBtn">
            {props.t("send")}
          </button>
        </div>
      </div>
    </form>
  )
}

const ForgetPasswordPage = props => {
  const { loading, history, isHyperApp } = props

  const [page, setpage] = useState("forgot")
  const [fields, setfields] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  })

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

  function handleSubmit(e) {
    e.preventDefault()

    const callback = () => {
      setpage("reset")
    }

    props.userForgetPassword(fields, callback)
  }

  function handleResetSubmit(e) {
    e.preventDefault()

    const callback = () => {
      setTimeout(() => {
        history.replace("/")
      }, 1000)
    }

    props.userResetPassword(fields, callback)
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

        {page === "forgot" ? (
          <ForgotPassword
            {...props}
            fields={fields}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        ) : page === "reset" ? (
          <ResetPassword
            {...props}
            fields={fields}
            handleSubmit={handleResetSubmit}
            handleChange={handleChange}
          />
        ) : null}

        {isHyperApp && (
          <div className="col-lg-12">
            <div className="reglink">
              <Link to="/signup?product=store" className="colortextlink">
                {props.t("not_have_account")}
              </Link>
            </div>
          </div>
        )}

        {!isHyperApp && (
          <div className="col-lg-12">
            <div className="reglink">
              <Link to="/login" className="colortextlink">
                {props.t("login_account")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

ForgetPasswordPage.propTypes = {
  forgetError: PropTypes.any,
  forgetSuccessMsg: PropTypes.any,
  history: PropTypes.object,
  userForgetPassword: PropTypes.func,
  userResetPassword: PropTypes.func,
}

const mapStatetoProps = state => {
  const { forgetError, forgetSuccessMsg, loading } = state.ForgetPassword
  return {
    forgetError,
    forgetSuccessMsg,
    loading,
    isHyperApp: state.Login.isHyperApp,
    publicDomainData: state.Login.publicDomainData,
  }
}

export default withRouter(
  connect(mapStatetoProps, { userForgetPassword, userResetPassword, apiError })(
    withTranslation()(ForgetPasswordPage)
  )
)
