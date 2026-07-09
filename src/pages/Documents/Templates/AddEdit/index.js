import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect } from "react-redux"
import worldCountries from "world-countries"
import { isObject } from "lodash"
import FormButton from "components/Common/FormButtons"

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner,
} from "reactstrap"
import Select from "react-select"

import { getDocTemplate, putDocTemplate, addDocTemplate } from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"
import Billing from "store/Billing/reducer"

const EditDocTemplate = props => {
  const {
    accessLevel,
    history,
    location,
    error,
    onGetDocTemplate,
    onPutDocTemplate,
    onAddDocTemplate,
    loading,
    documentTemplate,
    currentPlan,
    driverStoreType: DRIVER_STORETYPE,
  } = props
  const { id } = useParams()

  const didMountRef = useRef(null)

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    name: "",
    role: { label: props.t("driver"), value: "DRIVER" },
    // type: "OTHER",
    status: "active",
  })
  console.log(documentTemplate?.template?.role, fields?.role, "guccci")
  const [storeType, setstoreType] = useState(
    DRIVER_STORETYPE?.find(sStore => sStore.value === "OTHER")
  )

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

  /* Get DocTemplate on Router State Change */
  useEffect(() => {
    if (id) {
      onGetDocTemplate(id)
    }
  }, [id])

  /* Update Field State on DocTemplate Reducer Change */
  useEffect(() => {
    if (didMountRef.current) {
      setFields({
        _id: documentTemplate?.template?._id || "",
        name: documentTemplate?.template?.name || "",
        role: {
          value: documentTemplate?.template?.role || "DRIVER",
          label:
            documentTemplate?.template?.role === "VENDOR"
              ? props.t("vendor")
              : documentTemplate?.template?.role === "DRIVER"
              ? props.t("driver")
              : documentTemplate?.template?.role === "USER"
              ? props.t("user")
              : props.t("service_provider"),
        },
        // type: documentTemplate?.type || "OTHER",
        status: documentTemplate?.template?.status || "active",
      })
    } else didMountRef.current = true

    /* setstoreType(
      DRIVER_STORETYPE?.find(sStore => sStore.value === document?.type)
    ) */
  }, [JSON.stringify(documentTemplate)])

  /* Handle Input onChange */
  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  /* Handle Form Submit */
  const onSubmit = event => {
    event.preventDefault()

    if (loading) return

    if (id) {
      if (!accesses.canEdit) return
      onPutDocTemplate(
        {
          ...fields,
          role: fields?.role?.value,
        },
        history
      )
    } else {
      if (!accesses.canAdd) return
      onAddDocTemplate({ ...fields, role: fields?.role?.value }, history)
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="DocTemplates"
            breadcrumbItem={
              (id ? props.t("Edit") : props.t("Add")) +
              " " +
              props.t("Document Template")
            }
            breadcrumbItems={[
              {
                title: props.t("document_templates"),
                link: "/document-templates",
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
                          <Label>{props.t("name")}</Label>

                          <Input
                            type="text"
                            value={fields?.name}
                            onChange={handleChange("name")}
                          />
                        </FormGroup>
                      </Col>

                      {currentPlan?.billingPlan?.type !== "basic" && (
                        <Col md={6}>
                          <FormGroup>
                            <Label>{props.t("user")}</Label>

                            <Select
                              options={[
                                { label: props.t("driver"), value: "DRIVER" },
                                { label: props.t("vendor"), value: "VENDOR" },
                                { label: props.t("user"), value: "USER" },
                                {
                                  label: props.t("service_provider"),
                                  value: "SERVICEPROVIDER",
                                },
                                {
                                  label: props.t("Host"),
                                  value: "HOST",
                                },
                              ]}
                              value={fields?.role}
                              onChange={data =>
                                handleChange("role")({
                                  target: { value: data },
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      )}

                      {/* {currentPlan?.billingPlan?.type === "ultimate" &&
                        fields?.role?.value === "DRIVER" && (
                          <Col md={6}>
                            <FormGroup>
                              <Label>{props.t("store")}</Label>

                              <Select
                                options={DRIVER_STORETYPE || []}
                                value={storeType}
                                onChange={data => {
                                  setstoreType(data)
                                  handleChange("type")({ target: data })
                                }}
                              />
                            </FormGroup>
                          </Col>
                        )} */}

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("status")}</Label>

                          <div className="status-switch square-switch">
                            <input
                              type="checkbox"
                              id="square-switch1"
                              switch="none"
                              checked={fields.status == "active"}
                              onChange={() => {
                                const value =
                                  fields.status == "active"
                                    ? "inactive"
                                    : "active"

                                handleChange("status")({ target: { value } })
                              }}
                            />
                            <label
                              htmlFor="square-switch1"
                              data-on-label={props.t("active")}
                              data-off-label={props.t("inactive")}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormButton
                      needSubmit={id ? accesses.canEdit : accesses.canAdd}
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

EditDocTemplate.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  onGetDocTemplate: PropTypes.func,
  onPutDocTemplate: PropTypes.func,
  onUploadFile: PropTypes.func,
  onRemoveFile: PropTypes.func,
}

const mapStateToProps = ({ documentTemplates, Billing, Login }) => ({
  error: documentTemplates.error,
  loading: documentTemplates.loading,
  documentTemplate: documentTemplates.documentTemplate,
  onAddDocTemplate: PropTypes.func,
  currentPlan: Billing.currentPlan,
  driverStoreType: Login.driverStoreType,
})

const mapDispatchToProps = dispatch => ({
  onGetDocTemplate: id => dispatch(getDocTemplate(id)),
  onAddDocTemplate: (data, history) => dispatch(addDocTemplate(data, history)),
  onPutDocTemplate: (documentTemplate, history) =>
    dispatch(putDocTemplate(documentTemplate, history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
  onRemoveFile: data => dispatch(removeFile(data)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(EditDocTemplate))
)
