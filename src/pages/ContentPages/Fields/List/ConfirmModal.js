import React from "react"
import PropTypes from "prop-types"
import { Button, Modal, ModalBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

const ConfirmModal = props => {
  const { isOpen, toggle, onConfirm } = props

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      autoFocus={true}
      centered={true}
      toggle={toggle}
    >
      <div className="modal-content remove-confirm">
        <ModalBody>
          <div className="infoimg fill-danger ">
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="m277.332031 128c0 11.78125-9.550781 21.332031-21.332031 21.332031s-21.332031-9.550781-21.332031-21.332031 9.550781-21.332031 21.332031-21.332031 21.332031 9.550781 21.332031 21.332031zm0 0"></path>
              <path d="m256 405.332031c-8.832031 0-16-7.167969-16-16v-165.332031h-21.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h37.332031c8.832031 0 16 7.167969 16 16v181.332031c0 8.832031-7.167969 16-16 16zm0 0"></path>
              <path d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0"></path>
              <path d="m304 405.332031h-96c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h96c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"></path>
            </svg>
          </div>

          <h4>{props.t("delete_sure")}</h4>

          <div className="delete-btns">
            <Button type="button" outline color="secondary" onClick={toggle}>
              {props.t("no_cancel")}
            </Button>

            <Button type="button" color="danger" onClick={onConfirm}>
              {props.t("yes_delete")}
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

export default withTranslation()(ConfirmModal)
