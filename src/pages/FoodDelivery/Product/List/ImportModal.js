import React, { Fragment, useState } from "react"
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
  Row,
  Col,
  Alert,
} from "reactstrap"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import { API_BASE_URL } from "helpers/api_helper"

//i18n
import { withTranslation } from "react-i18next"

import { DEFAULT_STORE_TYPE, PRODUCT_FORM } from "helpers/contants"

const ImportModal = props => {
  const _PRODUCT_FORM =
    (PRODUCT_FORM[props.storeType]
      ? PRODUCT_FORM[props.storeType]
      : DEFAULT_STORE_TYPE["PRODUCT_FORM"]) || {}

  const {
    isOpen,
    toggle,
    onConfirm,
    loading,
    error,
    success,
    variationError,
    variationSuccess,
    combineError,
    combineSuccess,
  } = props

  const [file, setfile] = useState(null)
  const [file2, setfile2] = useState(null)
  const [file3, setfile3] = useState(null)

  const handleSubmit = type => event => {
    event.preventDefault()

    onConfirm &&
      onConfirm(
        type === "variations" ? file2 : type === "combine" ? file3 : file,
        type
      )
  }

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
          <h3>
            {props.t("import")} {props.title}
          </h3>

          <p>
            <small>{props.t("import_products_int")}</small>
          </p>

          <Form className="mt-3 position-relative spinner-content">
            {loading && (
              <div className="spinner">
                <Spinner color="primary" />
              </div>
            )}
            {error && typeof error === "string" ? (
              <Alert color="danger">{error}{<Fragment><br />Probably products import in progress, Please wait for sometime...</Fragment>}</Alert>
            ) : null}
            {success && typeof success === "string" ? (
              <Alert color="success">{success}</Alert>
            ) : null}
            {variationError && typeof variationError === "string" ? (
              <Alert color="danger">{variationError}</Alert>
            ) : null}
            {variationSuccess && typeof variationSuccess === "string" ? (
              <Alert color="success">{variationSuccess}</Alert>
            ) : null}
            {combineError && typeof combineError === "string" ? (
              <Alert color="danger">{combineError}</Alert>
            ) : null}
            {combineSuccess && typeof combineSuccess === "string" ? (
              <Alert color="success">{combineSuccess}</Alert>
            ) : null}

            <Row className="align-items-center">
              <Col xs={8}>
                <FormGroup>
                  <Label>{props.t("products")}</Label>

                  <Input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={event => setfile(event.target.files[0])}
                  />

                  <FormText>
                    <a
                      href={`${
                        _PRODUCT_FORM?.variations
                          ? props.import_products
                          : props.import_products_FOOD
                      }`}
                      target="_blank"
                      download="products-format.csv"
                    >
                      {props.t("download_format")}
                    </a>
                  </FormText>
                </FormGroup>
              </Col>

              <Col xs={4}>
                <div className="text-right">
                  <Button
                    type="submit"
                    color="primary"
                    onClick={handleSubmit()}
                  >
                    {props.t("import")}
                  </Button>
                </div>
              </Col>
            </Row>

            {_PRODUCT_FORM?.variations && (
              <>
                <hr className="my-3" />

                <Row className="align-items-center">
                  <Col xs={8}>
                    <FormGroup>
                      <Label>
                        {props.t("product")} {props.t("variants")}
                      </Label>

                      <Input
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={event => setfile2(event.target.files[0])}
                      />

                      <FormText>
                        <a
                          href={`${props.import_productVariation}`}
                          target="_blank"
                          download="variations-format.csv"
                        >
                          {props.t("download_format")}
                        </a>
                      </FormText>
                    </FormGroup>
                  </Col>

                  <Col xs={4}>
                    <div className="text-right">
                      <Button
                        onClick={handleSubmit("variations")}
                        color="primary"
                      >
                        {props.t("import")}
                      </Button>
                    </div>
                  </Col>
                </Row>

                <hr className="my-3" />

                <Row className="align-items-center">
                  <Col xs={8}>
                    <FormGroup>
                      <Label>
                        {props.t("product")} {props.t("combine")}
                      </Label>

                      <Input
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={event => setfile3(event.target.files[0])}
                      />

                      <FormText>
                        <a
                          href={`${props.import_products_combined}`}
                          target="_blank"
                          download="import_products_combined.csv"
                        >
                          {props.t("download_format")}
                        </a>
                      </FormText>
                    </FormGroup>
                  </Col>

                  <Col xs={4}>
                    <div className="text-right">
                      <Button onClick={handleSubmit("combine")} color="primary">
                        {props.t("import")}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </>
            )}

            <div className="text-right mt-3">
              <Button
                type="button"
                outline
                color="secondary"
                onClick={toggle}
                className="mr-2"
              >
                {props.t("cancel")}
              </Button>

              {/* <Button type="submit" color="primary">
                {props.t("import")}
              </Button> */}
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

const mapStateToProps = ({ Login, FD_Products }) => ({
  import_products: Login.importCSV?.import_products,
  import_products_FOOD: Login.importCSV?.import_products_FOOD,
  import_productVariation: Login.importCSV?.import_productVariation,
  import_products_combined: Login.importCSV?.import_products_combined,
  error: FD_Products.importError,
  success: FD_Products.importSuccess,
  variationError: FD_Products.importVariationError,
  variationSuccess: FD_Products.importVariationSuccess,
  combineError: FD_Products.importCombineError,
  combineSuccess: FD_Products.importCombineSuccess,
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ImportModal))
)
