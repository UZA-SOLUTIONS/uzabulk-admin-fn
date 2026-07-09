import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  Modal,
  Row,
  Col,
  FormGroup,
  Label,
  Alert,
  Input,
  Spinner,
} from "reactstrap"
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

// Actions
import { postBillingCard } from "store/actions"

//i18n
import { withTranslation } from "react-i18next"

const Content = props => {
  const { onPostBillingCard, error: _error } = props

  const { toggle, onSuccess } = props
  const [error, seterror] = useState("")

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    if (_error) {
      seterror(_error)
    }
  }, [_error])

  const changeY = event => {
    if (event.error) {
      seterror(event.error.message)
    } else {
      seterror("")
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const cardNumber = elements.getElement(CardNumberElement)

    let result
    try {
      result = await stripe.createToken(cardNumber)
    } catch (err) {
      console.log("erro ", err)
      return
    }

    if (!result || result?.error) {
      seterror(result?.error?.message)
      return
    }

    const data = {
      cardNumber: result?.token?.card?.last4,
      token: result?.token?.id,
      type: result?.token?.card?.brand,
      payment_method: "stripe",
      expDate:
        result?.token?.card?.exp_month + "/" + result?.token?.card?.exp_year,
      last4digit: result?.token?.card?.last4,
    }

    onPostBillingCard(data, onSuccess)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myModalLabel">
          {props.t("add")} {props.t("card")}
        </h5>

        <button
          type="button"
          onClick={toggle}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span className="h3" aria-hidden="true">
            &times;
          </span>
        </button>
      </div>

      <div className="modal-body">
        {error && typeof error === "string" ? (
          <Alert color="danger">{error}</Alert>
        ) : null}

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>{props.t("card_number_placeholder")}</Label>

              <CardNumberElement
                id="card-number"
                onChange={changeY}
                className="form-control"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("expire_date")}</Label>

              <CardExpiryElement
                id="card-expire"
                onChange={changeY}
                className="form-control"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("cvv_code")}</Label>

              <CardCvcElement
                id="card-cvc"
                onChange={changeY}
                className="form-control"
              />
            </FormGroup>
          </Col>
        </Row>
      </div>

      <div className="modal-footer">
        <button
          type="submit"
          className="btn btn-primary waves-effect"
          data-dismiss="modal"
        >
          {props.t("add")}
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary waves-effect"
          data-dismiss="modal"
          onClick={toggle}
        >
          {props.t("cancel")}
        </button>
      </div>
    </form>
  )
}

const ConfirmModal = props => {
  const { isOpen, toggle, loading } = props

  return (
    <Modal
      size="md"
      isOpen={isOpen}
      autoFocus={true}
      centered={true}
      toggle={toggle}
      className="spinner-content"
    >
      {props.stripePromise && (
        <Elements stripe={props.stripePromise}>
          <Content {...props} />
        </Elements>
      )}

      {loading && (
        <div className="spinner">
          <Spinner color="primary" />
        </div>
      )}
    </Modal>
  )
}

ConfirmModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  onPostBillingCard: PropTypes.func,
}

const mapStateToProps = ({ Billing, Login }) => ({
  loading: Billing.loading,
  error: Billing.error,
  stripePromise: Login.adminStripePublishableKey
    ? loadStripe(Login.adminStripePublishableKey)
    : loadStripe(process.env.REACT_APP_STRIPE_KEY),
})

const mapDispatchToProps = dispatch => ({
  onPostBillingCard: (data, callback) =>
    dispatch(postBillingCard(data, callback)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ConfirmModal))
