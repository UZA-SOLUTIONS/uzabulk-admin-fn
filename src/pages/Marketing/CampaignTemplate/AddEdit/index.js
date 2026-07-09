import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect } from "react-redux"
/* import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import EditorUploadAdapterPlugin from "../../../plugins/ckeditor/UploadAdapterPlugin" */
import CKEditor from "react-ckeditor-component"
import Select from "react-select"
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

import {
  addCampaignTemplate,
  getCampaignTemplate,
  putCampaignTemplate,
} from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

const AddCampaignTemplate = ({
  accessLevel,
  history,
  error,
  onAddCampaignTemplate,
  onGetCampaignTemplate,
  onPutCampaignTemplate,
  campaignTemplate,
  loading,
  ...props
}) => {
  const { id } = useParams()
  const didMountRef = useRef(null)

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    type: "email",
    name: "",
    subject: "",
    title: "",
    body: "",
    status: "active",
  })
  const [templateType, settemplateType] = useState({
    label: props.t("email"),
    value: "email",
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
      onGetCampaignTemplate(id)
    }
  }, [id])

  useEffect(() => {
    if (didMountRef.current) {
      if (!!campaignTemplate && !!campaignTemplate.body) {
        try {
          setFields({
            type: campaignTemplate.type || "email",
            name: campaignTemplate.name || "",
            subject: campaignTemplate.subject || "",
            body: campaignTemplate.body || "",
            status: campaignTemplate.status || "active",
          })

          if (campaignTemplate.type === "email") {
            settemplateType({
              label: props.t("email"),
              value: "email",
            })
          } else if (campaignTemplate.type === "push") {
            settemplateType({
              label: props.t("push_notification"),
              value: "push",
            })
          } else {
            settemplateType({
              label: props.t("sms"),
              value: "sms",
            })
          }
        } catch (err) {
          console.log("parsing error ", err)
        }
      }
    } else didMountRef.current = true
  }, [JSON.stringify(campaignTemplate)])

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return

    if (id) {
      if (!accesses.canEdit) return
      onPutCampaignTemplate({ _id: campaignTemplate._id, ...fields }, history)
    } else {
      if (!accesses.canAdd) return
      onAddCampaignTemplate({ ...fields }, history)
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="CampaignTemplate"
            breadcrumbItem={
              (id ? props.t("edit") : props.t("add")) +
              " " +
              props.t("email_campaign")
            }
            breadcrumbItems={[
              {
                title: props.t("campaign_templates"),
                link: "/campaign-templates",
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
                      <Col md={6} className="order-1 order-md-0">
                        <FormGroup>
                          <Label for="formrow-firstname-Input">
                            {props.t("name")}<span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="formrow-firstname-Input"
                            value={fields.name}
                            onChange={handleChange("name")}
                            required
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6} className="order-0 order-md-1">
                        <FormGroup>
                          <Label>{props.t("template_type")}</Label>

                          <Select
                            options={[
                              { label: props.t("email"), value: "email" },
                              { label: props.t("sms"), value: "sms" },
                              {
                                label: props.t("push_notification"),
                                value: "push",
                              },
                            ]}
                            value={templateType}
                            onChange={data => {
                              settemplateType(data)
                              handleChange("type")({ target: data })
                            }}
                          />
                        </FormGroup>
                      </Col>

                      {fields.type === "email" && (
                        <Col md={6} className="order-2">
                          <FormGroup>
                            <Label htmlFor="formrow-subject-Input">
                              {props.t("subject")}
                            </Label>

                            <Input
                              id="formrow-subject-Input"
                              value={fields.subject}
                              onChange={handleChange("subject")}
                            />
                          </FormGroup>
                        </Col>
                      )}

                      {["sms", "push"].includes(fields.type) && (
                        <Col md={6} className="order-2">
                          <FormGroup>
                            <Label htmlFor="formrow-title-Input">
                              {props.t("title")}
                            </Label>

                            <Input
                              id="formrow-title-Input"
                              value={fields.subject}
                              onChange={handleChange("subject")}
                            />
                          </FormGroup>
                        </Col>
                      )}

                      <Col md={12} className="order-3">
                        <FormGroup>
                          <Label htmlFor="formrow-content-Input">
                            {props.t("body")}
                          </Label>

                          {fields.type === "email" ? (
                            <CKEditor
                              config={{ allowedContent: true }}
                              content={fields.body}
                              events={{
                                change: evt => {
                                  const data = evt?.editor?.getData()

                                  handleChange("body")({
                                    target: { value: data },
                                  })
                                },
                              }}
                              config={{
                                height: 250,
                                toolbar: [
                                  [
                                    "Undo",
                                    "Redo",
                                    "Font",
                                    "FontSize",
                                    "Styles",
                                    "Format",
                                    "-",
                                    "Maximize",
                                    "-",
                                    "Source",
                                  ],
                                  [
                                    "Bold",
                                    "Italic",
                                    "Underline",
                                    "Strike",
                                    "-",
                                    "RemoveFormat",
                                    "-",
                                    "NumberedList",
                                    "BulletedList",
                                  ],
                                  [
                                    "Link",
                                    "Unlink",
                                    "-",
                                    "JustifyLeft",
                                    "JustifyCenter",
                                    "JustifyRight",
                                    "JustifyBlock",
                                    "-",
                                    "Outdent",
                                    "Indent",
                                    "-",
                                    "TextColor",
                                    "BGColor",
                                  ],
                                  [
                                    "Image",
                                    "Table",
                                    "HorizontalRule",
                                    "SpecialChar",
                                    "-",
                                    "Blockquote",
                                  ],
                                ],
                              }}
                              scriptUrl="https://cdn.ckeditor.com/4.16.0/full/ckeditor.js"
                            />
                          ) : (
                            <Input
                              type="textarea"
                              rows={5}
                              value={fields.body}
                              onChange={handleChange("body")}
                            />
                          )}

                          {/* <CKEditor
                            editor={ClassicEditor}
                            data={fields.body}
                            config={{
                              extraPlugins: [EditorUploadAdapterPlugin],
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData()

                              handleChange("body")({
                                target: { value: data },
                              })
                            }}
                          /> */}
                        </FormGroup>
                      </Col>

                      <Col md={6} className="order-4">
                        <FormGroup>
                          <Label>{props.t("status")}</Label>

                          <div className="status-switch square-switch">
                            <input
                              type="checkbox"
                              id="square-switch1"
                              switch={fields?.required ? "default" : "none"}
                              checked={fields.status == "active"}
                              onChange={() => {
                                if (fields?.required) return

                                const value =
                                  fields.status == "active"
                                    ? "inactive"
                                    : "active"

                                handleChange("status")({
                                  target: { value },
                                })
                              }}
                            />
                            <label
                              id="statustooltip"
                              htmlFor="square-switch1"
                              data-on-label={props.t("active")}
                              data-off-label={props.t("inactive")}
                            />

                            {fields?.required && (
                              <UncontrolledTooltip
                                placement="bottom"
                                target="statustooltip"
                              >
                                {props.t("field_required")}
                              </UncontrolledTooltip>
                            )}
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

AddCampaignTemplate.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  campaignTemplate: PropTypes.object,
  onAddCampaignTemplate: PropTypes.func,
  onGetCampaignTemplate: PropTypes.func,
  onPutCampaignTemplate: PropTypes.func,
}

const mapStateToProps = ({ CampaignTemplate }) => ({
  error: CampaignTemplate.error,
  loading: CampaignTemplate.loading,
  campaignTemplate: CampaignTemplate.campaignTemplate,
})

const mapDispatchToProps = dispatch => ({
  onAddCampaignTemplate: (data, history) =>
    dispatch(addCampaignTemplate(data, history)),
  onGetCampaignTemplate: id => dispatch(getCampaignTemplate(id)),
  onPutCampaignTemplate: (data, history) =>
    dispatch(putCampaignTemplate(data, history)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(AddCampaignTemplate))
)
