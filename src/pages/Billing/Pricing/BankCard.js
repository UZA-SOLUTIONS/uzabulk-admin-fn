import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Media } from "reactstrap"

const CardPricing = ({ cardId, toggleConfirmModal, details, ...props }) => {
  return (
    <React.Fragment>
      <Col sm="8" md="5" lg="5" xl="4">
        <Card className="plan-box">
          <CardBody className="p-3">
            <Media>
              <div className="mr-3">
                <i className="bx bx-credit-card h1 text-primary" />
              </div>

              <Media body>
                <h5>**** **** **** {details?.last4digit}</h5>
                {/* <p className="text-muted m-0">
                  Expiry Date: <span className="text-dark">09/2025</span>
                </p> */}
                <p className="text-muted m-0">
                  {props.t("card")}:{" "}
                  <span className="text-dark">{details?.type}</span>
                </p>
              </Media>

              <div className="ml-3 align-self-center">
                <Link
                  to="#"
                  onClick={e => {
                    e.preventDefault()
                    toggleConfirmModal(cardId)
                  }}
                  className="mr-3 text-secondary"
                >
                  <i className="far fa-edit mr-3 " />
                </Link>
              </div>
            </Media>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardPricing.propTypes = {
  pricing: PropTypes.object,
}

export default CardPricing
