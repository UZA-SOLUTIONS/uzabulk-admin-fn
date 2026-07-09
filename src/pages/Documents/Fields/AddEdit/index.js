import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import queryString from "query-string"
import FormButton from "components/Common/FormButtons"

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  Alert,
  Spinner,
  FormGroup,
  Label,
  Input,
  CardTitle,
} from "reactstrap"
import Select from "react-select"

import {
  addDocTemplateField,
  getDocTemplateField,
  putDocTemplateField,
} from "store/actions"

import { INPUT_TYPES } from "helpers/contants"
import { DOCUMNET_INPUT_TYPES } from "helpers/contants"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

const AddCategory = ({
  accessLevel,
  role,
  history,
  error,
  onAddDocTemplateField,
  onGetDocTemplateField,
  onPutDocTemplateField,
  documentTemplate,
  loading,
  ...props
}) => {
  const { templateId, id } = useParams()
  const { template_name } = queryString.parse(props?.location?.search)

  const didMountRef = useRef(null)

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    template: templateId,
    name: "",
    label: "",
    type: {},
    required: true,
    options: [{ label: "", value: "" }],
    status: "active",
  })

  useEffect(() => {
    if (!accessLevel) {
      const data = {
        canAdd: true,
        canEdit: true,
      }

      return setaccesses(data)
    }

    const data = {
      canAdd: false,
      canEdit: false,
    }

    accessLevel?.map(item => {
      switch (item.label) {
        case "CREATE":
          data.canAdd = item.value
          break

        case "UPDATE":
          data.canEdit = item.value
          break
      }
    })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  useEffect(() => {
    if (id) {
      onGetDocTemplateField(id)
    }
  }, [id])

  useEffect(() => {
    if (didMountRef.current) {
      try {
        setFields(prevState => ({
          ...prevState,
          name: documentTemplate?.name,
          label: documentTemplate?.label,
          type: {
            label: documentTemplate?.type?.charAt(0).toUpperCase() + documentTemplate?.type?.slice(1),
            value: documentTemplate?.type
          },
          required: documentTemplate?.validation?.required,
          options:
            documentTemplate?.options?.length > 0
              ? documentTemplate?.options
              : [{ label: "", value: "" }],
          status: documentTemplate?.status || "active",
        }))
      } catch (err) {
        console.log("parsing error ", err)
      }
    } else didMountRef.current = true
  }, [JSON.stringify(documentTemplate)])

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return

    if (id) {
      if (!accesses.canEdit) return
      onPutDocTemplateField(
        {
          id: documentTemplate._id,
          ...fields,
          validation: { required: fields?.required },
          type: fields?.type?.value,
        },
        history
      )
    } else {
      if (!accesses.canAdd) return
      onAddDocTemplateField(
        {
          ...fields,
          validation: { required: fields?.required },
          type: fields?.type?.value,
        },
        history
      )
    }
  }

  const addNewOption = () => event => {
    event.preventDefault()

    setFields(prevState => ({
      ...prevState,
      options: [...prevState?.options, { label: "", value: "" }],
    }))
  }

  function removeOption(e, index) {
    e.preventDefault()

    setFields(prevState => ({
      ...prevState,
      options: [
        ...prevState?.options.slice(0, index),
        ...prevState?.options.slice(index + 1),
      ],
    }))
  }

  const handleOptionChange =
    (name, index) =>
      ({ target }) => {
        setFields(prevState => ({
          ...prevState,
          options: [
            ...prevState?.options.slice(0, index),
            { ...prevState?.options[index], [name]: target?.value },
            ...prevState?.options.slice(index + 1),
          ],
        }))
      }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={
              (id ? props.t("Edit") : props.t("Add")) + " " + props.t("Field")
            }
            breadcrumbItems={[
              {
                title: props.t("document_templates"),
                link: "/document-templates",
              },
              {
                title: (template_name || "") + " " + props.t("fields"),
                link: `/document-templates/${templateId}/fields`,
              },
              { title: id ? props.t("edit") : props.t("add") },
            ]}
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Form onSubmit={onSubmit} className="spinner-content">
                    {error && typeof error === "string" ? (
                      <Alert color="danger">{error}</Alert>
                    ) : null}

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("input_type")}</Label>
                          {console.log(fields.type, "fields.typefields.typefields.typefields.typefields.typefields.typefields.type")}
                          <Select
                            options={DOCUMNET_INPUT_TYPES}
                            value={fields.type}
                            onChange={data =>
                              handleChange("type")({ target: { value: data } })
                            }
                          />
                        </FormGroup>
                      </Col>

                      {/* <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("Key")}</Label>

                          <Input
                            required
                            type="text"
                            value={fields?.name}
                            onChange={handleChange("name")}
                          />

                          <span className="text-muted"></span>
                        </FormGroup>
                      </Col> */}

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("label")}<span className="text-danger ml-1">*</span></Label>

                          <Input
                            required
                            type="text"
                            value={fields.label}
                            onChange={handleChange("label")}
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("required")}</Label>

                          <div className="status-switch square-switch">
                            <input
                              type="checkbox"
                              id="required-switch"
                              switch={"none"}
                              checked={fields.required}
                              onChange={() => {
                                const value = !fields.required

                                handleChange("required")({
                                  target: { value },
                                })
                              }}
                            />
                            <label
                              htmlFor="required-switch"
                              data-on-label={props.t("yes")}
                              data-off-label={props.t("no")}
                            />
                          </div>
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("status")}</Label>

                          <div className="status-switch square-switch">
                            <input
                              type="checkbox"
                              id="status-switch"
                              switch={"none"}
                              checked={fields?.status === "active"}
                              onChange={() => {
                                const value =
                                  fields.status === "active"
                                    ? "inactive"
                                    : "active"

                                handleChange("status")({
                                  target: { value },
                                })
                              }}
                            />
                            <label
                              htmlFor="status-switch"
                              data-on-label={props.t("active")}
                              data-off-label={props.t("inactive")}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    {["select", "checkbox"].includes(fields?.type?.value) && (
                      <>
                        <CardTitle>{props.t("options")}</CardTitle>

                        {fields?.options?.map((option, optIndex) => (
                          <Row key={optIndex}>
                            <Col md={5}>
                              <FormGroup>
                                <Label>{props.t("label")}<span className="text-danger ml-1">*</span></Label>

                                <Input
                                  required
                                  type="text"
                                  value={option.label}
                                  onChange={handleOptionChange(
                                    "label",
                                    optIndex
                                  )}
                                />
                              </FormGroup>
                            </Col>

                            {/* {["select"].includes(fields?.type?.value) && ( */}
                            <Col md={5}>
                              <FormGroup>
                                <Label>{props.t("value")}<span className="text-danger ml-1">*</span></Label>

                                <Input
                                  required
                                  type="text"
                                  value={option.value}
                                  onChange={handleOptionChange(
                                    "value",
                                    optIndex
                                  )}
                                />
                              </FormGroup>
                            </Col>
                            {/* )} */}

                            <Col md={2} className="d-flex align-items-center">
                              {optIndex === fields?.options?.length - 1 && (
                                <Link
                                  to={`#`}
                                  onClick={addNewOption()}
                                  className="mr-3 text-primary"
                                >
                                  <i
                                    className="bx bx-plus font-size-22 mr-3"
                                    id="addoptiontooltip"
                                  />
                                </Link>
                              )}

                              <Link
                                disabled={fields?.options?.length === 1}
                                to={`#`}
                                className={
                                  fields?.options?.length === 1
                                    ? "text-secondary"
                                    : "text-danger"
                                }
                                onClick={e => {
                                  e.preventDefault()

                                  fields?.options?.length > 1 &&
                                    removeOption(e, optIndex)
                                }}
                              >
                                <i className="bx bx-trash font-size-22" />
                              </Link>
                            </Col>
                          </Row>
                        ))}
                      </>
                    )}

                    <FormButton
                      needSubmit={
                        templateId ? accesses.canEdit : accesses.canAdd
                      }
                      goBack={() => history.goBack()}
                    />

                    {loading && (
                      <div className="spinner">
                        <Spinner color="primary" />
                      </div>
                    )}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

AddCategory.propTypes = {
  role: PropTypes.string,
  vendorId: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  documentTemplate: PropTypes.object,
  onAddDocTemplateField: PropTypes.func,
  onGetDocTemplateField: PropTypes.func,
  onPutDocTemplateField: PropTypes.func,
}

const mapStateToProps = ({ Login, documentTemplates }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "", // In Case Restaurant/Vendor based on role
  error: documentTemplates.error,
  loading: documentTemplates.loading,
  documentTemplate: documentTemplates.documentTemplateField,
})

const mapDispatchToProps = dispatch => ({
  onAddDocTemplateField: (data, history) =>
    dispatch(addDocTemplateField(data, history)),
  onGetDocTemplateField: id => dispatch(getDocTemplateField(id)),
  onPutDocTemplateField: (data, history) =>
    dispatch(putDocTemplateField(data, history)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddCategory))
)
