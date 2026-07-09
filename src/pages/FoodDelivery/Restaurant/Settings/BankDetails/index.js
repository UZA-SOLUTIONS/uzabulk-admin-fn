import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

import { Row, Col, FormGroup, Label, Input } from "reactstrap"

import StripConnectModal from "./StripeConnect"
import StripDisconnectModal from "./StripeConnect/Disconnect"
import { BASE_URL, API_VERSION } from "helpers/api_helper"

import { deleteFdRestaurantStripeConnect } from "store/actions"

const BankDetails = props => {
  const {
    bankFields,
    handleChange: _handleChange,
    _id,
    commissionTransfer,
    getRestaurantDetails,
    onDeleteFdRestaurantStripeConnect,
  } = props

  const [stripeConnect, setStripConnect] = useState({ isOpen: false, _id })
  const [stripeDisconnect, setstripedisconnect] = useState(false)

  const handleChange = index => e => {
    const details = [...(bankFields || [])]
    details[index] = { ...details[index], value: e.target.value }

    _handleChange("bankFields")({ target: { value: details } })
  }

  const toggleStripe = () => {
    setStripConnect({ _id, isOpen: !stripeConnect.isOpen })
  }

  const toggleStripeDisconnect = evt => {
    evt?.preventDefault()

    setstripedisconnect(prevState => !prevState)
  }

  const connectStripe = e => {
    e.preventDefault()

    toggleStripe()
  }

  const confirmStripeDisconnect = () => {
    onDeleteFdRestaurantStripeConnect(_id, response => {
      getRestaurantDetails && getRestaurantDetails()

      toggleStripeDisconnect()
    })
  }

  return (
    <React.Fragment>
      <StripConnectModal {...stripeConnect} toggle={toggleStripe} />

      <StripDisconnectModal
        isOpen={stripeDisconnect}
        toggle={toggleStripeDisconnect}
        onConfirm={confirmStripeDisconnect}
      />

      <Row>
        <Col lg={4}>
          <h4>{props.t("bank_account")}</h4>
        </Col>

        <Col lg={8}>
          <Row>
            {commissionTransfer?.toLowerCase() === "offline" &&
              bankFields?.map((field, key) => (
                <Col key={`_bankfield_${key}`} md={6}>
                  <FormGroup>
                    <Label>{field?.label}</Label>

                    <Input
                      type="text"
                      value={field?.value || ""}
                      onChange={handleChange(key)}
                    />
                  </FormGroup>
                </Col>
              ))}

            {commissionTransfer?.toLowerCase() === "online" &&
              (props.stripeConnect?.status ? (
                <>
                  <Col md={8}>
                    <h4>{props.t("stripe_account_connected")}</h4>
                    <div>
                      {props.t("account_id")}:{" "}
                      {!!props.stripeConnect?.login_link ? (
                        <a
                          href={props.stripeConnect.login_link}
                          target="_blank"
                          className=""
                        >
                          {props.stripeConnect?.accountId}
                        </a>
                      ) : (
                        props.stripeConnect?.accountId
                      )}
                    </div>
                  </Col>

                  <Col md={4}>
                    <a
                      href={"/card/stripe/connect"}
                      target="_blank"
                      className="waves-effect waves-light p-0"
                      onClick={toggleStripeDisconnect}
                    >
                      {props.t("disconnect")}
                    </a>
                  </Col>
                </>
              ) : (
                <Col md={6}>
                  <a
                    href={"/card/stripe/connect"}
                    target="_blank"
                    className="waves-effect waves-light p-0"
                    onClick={e => {
                      e.preventDefault()
                      window
                        .open(
                          BASE_URL +
                          "/" +
                          API_VERSION +
                          "/card/stripe/connect?id=" +
                          _id +
                          "&host=" +
                          window.location.host +
                          "&pathname=" +
                          window.location.pathname,
                          "_self"
                        )
                        .focus()
                    }}
                  >
                    {props.t("click_to_connect_stripe")}
                  </a>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}

BankDetails.propTypes = {
  bankFields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({
  onDeleteFdRestaurantStripeConnect: (id, callback) =>
    dispatch(deleteFdRestaurantStripeConnect(id, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BankDetails)
)
