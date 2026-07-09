import React from "react"
import PropTypes from "prop-types"

import {
  Modal,
  Row,
  Col,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

const ConfirmModal = props => {
  const { isOpen, toggle, row } = props

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
          {props.t("notification_details")}
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
            <h5 className="">{props.t("sent_to")}</h5>

            <p>{row?.type}</p>
          </Col>

          {row?.storeType && (
            <Col md={6}>
              <h5 className="">{props.t("store")}</h5>

              <p>{row?.storeType?.storeType}</p>
            </Col>
          )}

          <Col md={6}>
            <h5 className="">{props.t("title")}</h5>

            <p>{row?.title}</p>
          </Col>

          <Col md={12}>
            <h5 className="">{props.t("body")}</h5>

            <p>{row?.body}</p>
          </Col>
        </Row>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          onClick={toggle}
          className="btn btn-secondary waves-effect"
          data-dismiss="modal"
        >
          {props.t("close")}
        </button>
      </div>
    </Modal>
  )
}

ConfirmModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default withTranslation()(ConfirmModal)
