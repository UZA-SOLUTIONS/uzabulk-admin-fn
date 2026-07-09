import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"
import { FormGroup, Label, Modal, Row, Col } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

// Constent
import { ROLES } from "helpers/contants"

const ConfirmModal = props => {
  const { isOpen, toggle, details, currency, storeAccesses, user } = props

  return (
    <Modal
      size="md"
      isOpen={isOpen}
      autoFocus={true}
      centered={true}
      toggle={toggle}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myModalLabel">
          {props.t("details")}
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
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>{props.t("time")}</Label>

              <p>
                {moment(details?.date_created_utc).format("DD MMM YYYY, LT")}
              </p>
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("name")}</Label>

              <p>{details?.customerDetails?.name}</p>
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("type")}</Label>

              <p>{details?.type}</p>
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("amount")}</Label>

              <p>
                <span
                  className={
                    details?.type === "credit" ? "text-success" : "text-danger"
                  }
                >
                  {details?.type === "credit" ? "+" : "-"}
                  {currency?.sign}
                  {details?.amount}
                </span>
              </p>
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("description")}</Label>

              <p>{details?.description}</p>
            </FormGroup>
          </Col>

          {ROLES.vendor !== user.role &&
            (storeAccesses
              ? storeAccesses[details?.storeType?.storeType]
              : true) &&
            details?.order &&
            details?.storeType?.storeType && (
              <Col md={6}>
                {["TAXI", "PICKUPDROP"].includes(details?.storeType?.storeType) ?
                  <Link
                    to={`/${details?.storeType?.storeType?.toLowerCase()}/trip/${details?.order
                      }/profile`}
                    className="waves-effect waves-light p-0 font-size-15"
                  >
                    {props.t("order")}
                    <i className="mdi mdi-arrow-right ml-1"></i>
                  </Link> : (<Link
                    to={`/${details?.storeType?.storeType?.toLowerCase()}/orders/${details?.order
                      }/profile`}
                    className="waves-effect waves-light p-0 font-size-15"
                  >
                    {props.t("order")}
                    <i className="mdi mdi-arrow-right ml-1"></i>
                  </Link>)}

              </Col>
            )}
        </Row>
      </div>

      <div className="modal-footer"></div>
    </Modal>
  )
}

ConfirmModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}
const mapStateToProps = ({ Login, Settings }) => ({
  user: Login.user,
  currency: Settings?.settings?.currency,
})

export default withTranslation()(connect(mapStateToProps)(ConfirmModal))
