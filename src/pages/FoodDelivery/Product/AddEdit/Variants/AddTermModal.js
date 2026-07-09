import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  Button,
  Modal,
  ModalBody,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Alert,
} from "reactstrap"

// Translation
import { withTranslation } from "react-i18next"

import { postFdTermInAttribute } from "store/actions"

const ConfirmModal = props => {
  const {
    isOpen,
    toggle,
    loading,
    error,
    attributeId,
    onPostFdTermInAttribute,
    onConfirm,
  } = props

  const [name, setName] = useState("")

  useEffect(() => {
    setName("")
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()

    onPostFdTermInAttribute({ attributeId, name }, onConfirm)
  }

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      autoFocus={true}
      centered={true}
      toggle={toggle}
    >
      <div className="modal-content remove-confirm">
        <ModalBody className="spinner-content">
          {loading && (
            <div className="spinner">
              <Spinner color="primary" />
            </div>
          )}
          {error && <Alert color="danger">{error}</Alert>}

          <div id="add-attribute-term">
            <Row>
              <Col xs={12}>
                <FormGroup>
                  <Label>{props.t("name")}<span className="text-danger ml-1">*</span></Label>

                  <Input
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <div className="delete-btns">
              <Button type="button" outline color="secondary" onClick={toggle}>
                {props.t("cancel")}
              </Button>

              <Button
                form="add-attribute-term"
                type="button"
                color="primary"
                onClick={handleSubmit}
              >
                {props.t("submit")}
              </Button>
            </div>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

ConfirmModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  onPostFdTermInAttribute: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
}

const mapStateToProps = ({ FD_Attributes }) => ({
  loading: FD_Attributes.loading,
  error: FD_Attributes.error,
})

const mapDispatchToProps = dispatch => ({
  onPostFdTermInAttribute: (data, callback) =>
    dispatch(postFdTermInAttribute(data, callback)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ConfirmModal))
