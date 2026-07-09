import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import {
  Button,
  Modal,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  CardBody,
} from "reactstrap"
import Select from "react-select"

//i18n
import { withTranslation } from "react-i18next"

import { INPUT_TYPES } from "helpers/contants"

const AddDocumentModal = props => {
  const { isOpen, toggle } = props

  const [documents, setdocuments] = useState([
    {
      name: "",
      label: "",
      type: {},
      required: true,
      options: [{ label: "", value: "" }],
    },
  ])

  const addNewDocument = event => {
    event.preventDefault()

    setdocuments(prevState => [
      ...prevState,
      {
        name: "",
        label: "",
        type: {},
        required: true,
        options: [{ label: "", value: "" }],
      },
    ])
  }

  function removeDocument(e, index) {
    e.preventDefault()

    setdocuments(prevState => [
      ...prevState.slice(0, index),
      ...prevState.slice(index + 1),
    ])
  }

  const handleDocumentChange = (name, index) => ({ target }) => {
    setdocuments(prevState => [
      ...prevState?.slice(0, index),
      { ...prevState[index], [name]: target?.value },
      ...prevState?.slice(index + 1),
    ])
  }

  const addNewDocumentOption = docIndex => event => {
    event.preventDefault()

    setdocuments(prevState => [
      ...prevState.slice(0, docIndex),
      {
        ...prevState[docIndex],
        options: [...prevState[docIndex]?.options, { label: "", value: "" }],
      },
      ...prevState.slice(docIndex + 1),
    ])
  }

  function removeDocumentOption(e, docIndex, index) {
    e.preventDefault()

    setdocuments(prevState => [
      ...prevState.slice(0, docIndex),
      {
        ...prevState[docIndex],
        options: [
          ...prevState[docIndex]?.options.slice(0, index),
          ...prevState[docIndex]?.options.slice(index + 1),
        ],
      },
      ...prevState.slice(docIndex + 1),
    ])
  }

  const handleDocumentOptionChange = (name, docIndex, index) => ({
    target,
  }) => {
    setdocuments(prevState => [
      ...prevState.slice(0, docIndex),
      {
        ...prevState[docIndex],
        options: [
          ...prevState[docIndex]?.options.slice(0, index),
          { ...prevState[docIndex]?.options[index], [name]: target?.value },
          ...prevState[docIndex]?.options.slice(index + 1),
        ],
      },
      ...prevState.slice(docIndex + 1),
    ])
  }

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      autoFocus={true}
      centered={true}
      toggle={toggle}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myModalLabel">
          {props.t("document_template")}
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
          <Col md={4}>
            <FormGroup>
              <Label>{props.t("name")}</Label>

              <Input type="text" />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Label>{props.t("user")}</Label>

              <Select
                options={[
                  { label: props.t("vendor"), value: "VENDOR" },
                  { label: props.t("driver"), value: "DRIVER" },
                ]}
              />
            </FormGroup>
          </Col>
        </Row>

        <Card className="mt-3">
          <CardTitle>{props.t("fields")}</CardTitle>

          <CardBody className="px-0 py-2">
            {documents.map((document, index) => (
              <React.Fragment key={index}>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label>{props.t("key")}<span className="text-danger ml-1">*</span></Label>

                      <Input
                        required
                        type="text"
                        value={document.name}
                        onChange={handleDocumentChange("name", index)}
                      />

                      <span className="text-muted"></span>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>{props.t("label")}<span className="text-danger ml-1">*</span></Label>

                      <Input
                        required
                        type="text"
                        value={document.label}
                        onChange={handleDocumentChange("label", index)}
                      />
                    </FormGroup>
                  </Col>

                  <Col md={3}>
                    <FormGroup>
                      <Label>{props.t("input_type")}</Label>

                      <Select
                        options={INPUT_TYPES}
                        value={document.type}
                        onChange={data =>
                          handleDocumentChange(
                            "type",
                            index
                          )({ target: { value: data } })
                        }
                      />
                    </FormGroup>
                  </Col>

                  <Col md={1}>
                    <FormGroup>
                      <Label>{props.t("required")}</Label>

                      <div className="custom-control custom-checkbox custom-checkbox-primary d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={`option-radio-${index}`}
                          checked={document.required}
                          onChange={() =>
                            handleDocumentChange(
                              "required",
                              index
                            )({ target: { value: !document.required } })
                          }
                        />

                        <label
                          className="custom-control-label"
                          htmlFor={`option-radio-${index}`}
                        ></label>
                      </div>
                    </FormGroup>
                  </Col>

                  <Col md={2} className="d-flex align-items-center pt-2">
                    {index === documents.length - 1 && (
                      <Link
                        to={`#`}
                        onClick={addNewDocument}
                        className="mr-3 text-primary"
                      >
                        <i
                          className="bx bx-plus font-size-22 mr-3"
                          id="addoptiontooltip"
                        />
                      </Link>
                    )}

                    <Link
                      disabled={documents?.length === 1}
                      to={`#`}
                      className={
                        documents?.length === 1
                          ? "text-secondary"
                          : "text-danger"
                      }
                      onClick={e => {
                        e.preventDefault()

                        documents?.length > 1 && removeDocument(e, index)
                      }}
                    >
                      <i
                        className="bx bx-trash font-size-22"
                        id="removeoptiontooltip"
                      />
                    </Link>
                  </Col>
                </Row>

                {document?.type?.value === "select" && (
                  <div className="px-3">
                    <CardTitle>{props.t("options")}</CardTitle>

                    {document?.options?.map((option, optIndex) => (
                      <Row key={optIndex}>
                        <Col md={5}>
                          <FormGroup>
                            <Label>{props.t("label")}<span className="text-danger ml-1">*</span></Label>

                            <Input
                              required
                              type="text"
                              value={option.label}
                              onChange={handleDocumentOptionChange(
                                "label",
                                index,
                                optIndex
                              )}
                            />
                          </FormGroup>
                        </Col>

                        <Col md={5}>
                          <FormGroup>
                            <Label>{props.t("value")}<span className="text-danger ml-1">*</span></Label>

                            <Input
                              required
                              type="text"
                              value={option.value}
                              onChange={handleDocumentOptionChange(
                                "value",
                                index,
                                optIndex
                              )}
                            />
                          </FormGroup>
                        </Col>

                        <Col md={2} className="d-flex align-items-center">
                          {optIndex === document?.options?.length - 1 && (
                            <Link
                              to={`#`}
                              onClick={addNewDocumentOption(index)}
                              className="mr-3 text-primary"
                            >
                              <i
                                className="bx bx-plus font-size-22 mr-3"
                                id="addoptiontooltip"
                              />
                            </Link>
                          )}

                          <Link
                            disabled={document?.options?.length === 1}
                            to={`#`}
                            className={
                              document?.options?.length === 1
                                ? "text-secondary"
                                : "text-danger"
                            }
                            onClick={e => {
                              e.preventDefault()

                              document?.options?.length > 1 &&
                                removeDocumentOption(e, index, optIndex)
                            }}
                          >
                            <i
                              className="bx bx-trash font-size-22"
                              id="removeoptiontooltip"
                            />
                          </Link>
                        </Col>
                      </Row>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </CardBody>
        </Card>
      </div>

      <div className="modal-footer">
        <button
          type="submit"
          className="btn btn-primary waves-effect"
          data-dismiss="modal"
        >
          {props.t("add_template")}
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary waves-effect"
          data-dismiss="modal"
          onClick={toggle}
        >
          {props.t("cancel")}
        </button>
      </div>
    </Modal>
  )
}

AddDocumentModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default withTranslation()(AddDocumentModal)
