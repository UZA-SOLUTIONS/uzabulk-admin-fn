import React from "react"
import PropTypes from "prop-types"
import { Button, Modal, ModalBody } from "reactstrap"
import { Link } from "react-router-dom"
import toastr from "toastr"

//i18n
import { withTranslation } from "react-i18next"

import "toastr/build/toastr.min.css"

const PreviewModal = props => {
  const { isOpen, toggle, preview } = props

  const copyToClipboard = data => {
    var textField = document.createElement("textarea")
    textField.innerText = data
    document.body.appendChild(textField)
    textField.select()
    document.execCommand("copy")
    textField.remove()

    toastr.success(props.t("copy_to_clipboard"))
  }

  return (
    <Modal
      size="md"
      isOpen={isOpen}
      autoFocus={true}
      centered={true}
      toggle={() => toggle()}
    >
      <div className="modal-content remove-confirm">
        <ModalBody>
          <h4 className="mt-0">{props.t("preview")}</h4>
          {["jpg", "jpeg", "png", "webp", "gif"].includes(
            preview?.split(".")?.pop()
          ) && (
            <img
              className="rounded img-fluid w-100"
              src={preview}
              alt="rounded img-fluid"
            />
          )}

          <div className="w-100 mt-4 mb-3 text-break">
            <span className="text-muted">{props.t("link")}:</span>{" "}
            <a
              href={preview}
              onClick={e => {
                e.preventDefault()
                copyToClipboard(preview)
              }}
              target="_blank"
            >
              {preview}
            </a>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

PreviewModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default withTranslation()(PreviewModal)
