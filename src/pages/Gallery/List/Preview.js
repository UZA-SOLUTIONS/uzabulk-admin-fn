import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Button, Modal, ModalBody, UncontrolledTooltip } from "reactstrap"
import { Link } from "react-router-dom"
import toastr from "toastr"

//i18n
import { withTranslation } from "react-i18next"

import "toastr/build/toastr.min.css"

const PreviewModal = props => {
  const { isOpen, toggle, preview, accesses } = props

  // const [accesses, setaccesses] = useState({
  //   canAdd: false,
  //   canEdit: false,
  //   canDelete: false,
  //   canBlock: false,
  // })

  // useEffect(() => {
  //   if (!accessLevel) {
  //     const data = {
  //       canAdd: true,
  //       canEdit: true,
  //       canDelete: true,
  //       canBlock: true,
  //     }

  //     return setaccesses(data)
  //   }

  //   const data = {
  //     canAdd: false,
  //     canEdit: false,
  //     canDelete: false,
  //     canBlock: false,
  //   }

  //   accessLevel?.map(item => {
  //     switch (item.label) {
  //       case "CREATE":
  //         data.canAdd = item.value
  //         break

  //       case "UPDATE":
  //         data.canEdit = item.value
  //         break

  //       case "DELETE":
  //         data.canDelete = item.value
  //         break

  //       case "BLOCK":
  //         data.canBlock = item.value
  //         break
  //     }
  //   })

  //   setaccesses(data)
  // }, [JSON.stringify(accessLevel)])

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
      toggle={toggle}
    >
      <div className="modal-content remove-confirm">
        <ModalBody>
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">
              {props.t("preview")}
            </h5>
            {accesses.canDelete &&
              <i
                className="fas fa-trash-alt mr-3"
                onClick={() => props?.confirm(preview?._id)}
              />
            }


          </div>


          <img
            className="rounded img-fluid"
            src={preview?.link}
            alt="rounded img-fluid"
          />

          <div className="w-100 mt-4 mb-3 text-break">
            <span className="text-muted">{props.t("id")}:</span>{" "}
            <Link
              to="#"
              onClick={e => {
                e.preventDefault()
                copyToClipboard(preview?._id)
              }}
            >
              {preview?._id}
            </Link>
          </div>

          <div className="w-100 mb-3 text-break">
            <span className="text-muted">{props.t("link")}:</span>{" "}
            <Link
              to="#"
              onClick={e => {
                e.preventDefault()
                copyToClipboard(preview?.link)
              }}
            >
              {preview?.link}
            </Link>
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
