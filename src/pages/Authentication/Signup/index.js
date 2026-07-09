import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import moment from "moment-timezone"
import { Alert, Spinner } from "reactstrap"
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import queryString from "query-string"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// actions
import {
  registerUserEmail,
  registerUser,
  apiError,
  getStoreTypes,
  registerUserFailed,
} from "store/actions"

import SignupForm from "./SignupForm"
import MarketType from "./MarketType"
import CreateMarket from "./CreateMarket"
import Aside from "./Aside"

import { LANGUAGES, DEFAULT_APP_LOGO } from "helpers/contants"

//i18n
import { withTranslation } from "react-i18next"

const Content = props => {
  const { product, email, plan, interval, price, setupFee } = queryString.parse(
    props?.location?.search
  )

  const stripe = useStripe()
  const elements = useElements()

  const [planType, setplanType] = useState("basic")
  const [activeTab, setactiveTab] = useState(1)
  const [fields, setfields] = useState({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    storeType: {},
    storeName: "",
    language: { code: LANGUAGES[0].value, name: LANGUAGES[0].label },
    currency: { sign: "", code: "" },
    timezone: moment.tz.guess(),
    country: "",
    policy: false,
    address: "",
    lat: 0,
    lng: 0,
  })

  useEffect(() => {
    setfields(prevState => ({ ...prevState, email }))
  }, [email])

  useEffect(() => {
    if (!product) props.history.replace("/login")

    if (product === "store") {
      return setplanType("basic")
    }

    if (product === "marketplace") {
      switch (plan) {
        case "single":
          setplanType("premium")
          break

        case "multi":
          setplanType("ultimate")
          break

        default:
          setplanType("")
          break
      }
    }
  }, [product, plan])

  useEffect(() => {
    props.registerUserFailed()
    props.getStoreTypes()
  }, [])

  const handleChange = name => e => {
    const { value } = e.target

    setfields(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!props?.storeNameValid) return

    let card = {}

    if (plan) {
      const cardNumber = elements.getElement(CardNumberElement)

      let result
      try {
        result = await stripe.createToken(cardNumber)
      } catch (err) {
        console.log("erro ", err)
        return
      }

      if (!result || result?.error) {
        window?.scrollTo(0, 0)
        props.registerUserFailed(result?.error?.message)
        return toastr.error(result?.error?.message)
      }

      card = {
        cardNumber: result?.token?.card?.last4,
        token: result?.token?.id,
        type: result?.token?.card?.brand,
        payment_method: "stripe",
        expDate:
          result?.token?.card?.exp_month + "/" + result?.token?.card?.exp_year,
        last4digit: result?.token?.card?.last4,
      }
    }

    const data = {
      ...fields,
      storeTypes: Object.entries(fields?.storeType)?.map(([key, value]) => ({
        storeType: key,
        storeVendorType: value,
      })),
      name: (fields?.firstName + " " + fields?.lastName)?.trim(),
      card,
      plan: {
        isTrial: !!plan ? false : true,
        planType: (!!planType ? planType : fields.storeTypeSelect) || "basic",
        productType: product,
        interval: !!plan ? interval || "month" : "month",
        price,
        setupFee,
      },
    }

    const { storeType, ..._data } = data

    props.registerUser(_data, props.history)
  }

  return (
    <form
      id="regForm"
      onSubmit={handleSubmit}
      className="spinner-content position-relative needs-validation"
      autocomplete="off"
    >
      {props.error && <Alert color="danger">{props.t(props.error)}</Alert>}

      {props.loading && (
        <div className="spinner">
          <Spinner color="primary" />
        </div>
      )}

      {activeTab === 1 && (
        <SignupForm
          t={props.t}
          registerUserEmail={props?.registerUserEmail}
          apiError={props.registerUserFailed}
          setactiveTab={setactiveTab}
          fields={fields}
          handleChange={handleChange}
          isHyperApp={props.isHyperApp}
        />
      )}

      {activeTab === 2 && (
        <MarketType
          t={props.t}
          apiError={props.registerUserFailed}
          setactiveTab={setactiveTab}
          product={product}
          planType={planType}
          interval={interval}
          price={price}
          setupFee={setupFee}
          fields={fields}
          handleChange={handleChange}
        />
      )}

      {activeTab === 3 && (
        <CreateMarket
          t={props.t}
          plan={(!!planType ? planType : fields.storeTypeSelect) || "basic"}
          isTrial={!!plan ? false : true}
          setactiveTab={setactiveTab}
          fields={fields}
          handleChange={handleChange}
        />
      )}
    </form>
  )
}

const Signup = props => {
  if (!props.isHyperApp) return <></>

  return (
    <section id="sign-up">
      <div className="container">
        <div className="registerwrap">
          <div className="row">
            <div className="col-lg-12">
              <div className="sign-up-top">
                <Link to="/">
                  {props.isHyperApp && (
                    <img src={DEFAULT_APP_LOGO} className="img-fluid registerlogo" />
                  )}
                </Link>
                <Link to="/login" className="colortextlink">
                  {props.t("already_have_account")}?
                </Link>
              </div>
            </div>
          </div>

          {props.stripePromise && (
            <Elements stripe={props.stripePromise}>
              <Content {...props} />
            </Elements>
          )}

          <Aside t={props.t} isHyperApp={props.isHyperApp} />
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = state => {
  const { registrationError, loading, storeNameValid } = state.Register
  const { adminStripePublishableKey } = state.Login
  return {
    error: registrationError,
    loading,
    storeNameValid,
    isHyperApp: state.Login.isHyperApp,
    stripePromise: adminStripePublishableKey
      ? loadStripe(adminStripePublishableKey)
      : loadStripe(process.env.REACT_APP_STRIPE_KEY),
  }
}

export default withRouter(
  connect(mapStateToProps, {
    registerUser,
    apiError,
    getStoreTypes,
    registerUserEmail,
    registerUserFailed,
  })(withTranslation()(Signup))
)

Signup.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  registerUser: PropTypes.func,
  loading: PropTypes.bool,
}
