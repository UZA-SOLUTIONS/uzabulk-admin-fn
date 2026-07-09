import React from "react"
import PropTypes from "prop-types"
import { Button, Modal, ModalBody } from "reactstrap"

const ConfirmModal = props => {
  const { isOpen, toggle, onConfirm } = props

  return (
    <Modal
      size="md"
      isOpen={isOpen}
      autoFocus={true}
      centered={true}
      toggle={toggle}
    >
      <div className="modal-content remove-confirm">
        <ModalBody>
          <div className="infoimg fill-danger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="512px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
          </div>

          <h4>Are you sure?</h4>

          <p>
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
          </p>

          <div className="delete-btns">
            <Button type="button" outline color="secondary" onClick={toggle}>
              No, cancel!
            </Button>

            <Button type="button" color="danger" onClick={onConfirm}>
              Yes, delete it!
            </Button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

ConfirmModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ConfirmModal
