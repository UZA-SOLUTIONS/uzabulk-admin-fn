import React from "react"
import PropTypes from "prop-types"
import { Modal, ModalBody } from "reactstrap"

import { BASE_URL, API_VERSION } from "helpers/api_helper"

const StripConnectModal = props => {
  const { isOpen, toggle, _id } = props

  return (
    <Modal
      size="md"
      isOpen={isOpen}
      autoFocus={true}
      centered={true}
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalBody>
          <iframe
            className="h-100 w-100"
            src={BASE_URL + "/" + API_VERSION + "/card/stripe/connect?id=" + _id}
          />
        </ModalBody>
      </div>
    </Modal>
  )
}

StripConnectModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default StripConnectModal
