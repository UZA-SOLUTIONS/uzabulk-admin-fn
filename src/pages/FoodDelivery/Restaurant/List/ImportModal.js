import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Label,
  Modal,
  ModalBody,
  Input,
  Spinner,
  Alert,
} from "reactstrap"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import { API_BASE_URL } from "helpers/api_helper"

//i18n
import { withTranslation } from "react-i18next"

const ImportModal = props => {
  const { isOpen, toggle, onConfirm, loading, error, success } = props

  const [file, setfile] = useState(null)

  const handleSubmit = event => {
    event.preventDefault()

    onConfirm && onConfirm(file)
  }

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      autoFocus={true}
      centered={true}
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalBody>
          <h3>
            {props.t("import")} {props.title}
          </h3>

          <Form
            onSubmit={handleSubmit}
            className="mt-3 position-relative spinner-content"
          >
            {loading && (
              <div className="spinner">
                <Spinner color="primary" />
              </div>
            )}

            {error && typeof error === "string" ? (
              <Alert color="danger">{error}</Alert>
            ) : null}
            {success && typeof success === "string" ? (
              <Alert color="success">{success}</Alert>
            ) : null}

            <FormGroup>
              <Input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={event => setfile(event.target.files[0])}
              />

              <FormText>
                <a
                  href={`${props.import_vendor}`}
                  target="_blank"
                  download="format.csv"
                >
                  {props.t("download_format")}
                </a>
              </FormText>
            </FormGroup>

            <div className="text-right">
              <Button
                type="button"
                outline
                color="secondary"
                onClick={toggle}
                className="mr-2"
              >
                {props.t("cancel")}
              </Button>

              <Button type="submit" color="primary">
                {props.t("import")}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </div>
    </Modal>
  )
}

ImportModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

const mapStateToProps = ({ Login, FD_Restaurants }) => ({
  import_vendor: Login.importCSV?.import_vendor,
  error: FD_Restaurants.importError,
  success: FD_Restaurants.importSuccess,
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ImportModal))
)
