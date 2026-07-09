import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect } from "react-redux"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
// import { CKEditor } from "@ckeditor/ckeditor5-react"
/* import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import EditorUploadAdapterPlugin from "../../../plugins/ckeditor/UploadAdapterPlugin" */
import CKEditor from "react-ckeditor-component"
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
  UncontrolledTooltip,
} from "reactstrap"

import {
  getEmailTemplate,
  putEmailTemplate,
  postResetEmailTemplate,
} from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

const AddEmailTemplate = ({
  accessLevel,
  history,
  error,
  onGetEmailTemplate,
  onPutEmailTemplate,
  onPostResetEmailTemplate,
  emailTemplate,
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
    _id: "",
    subject: "",
    body: "",
    status: "active",
    required: true,
    restrictions: [],
  })

  // console.log("restrictions", fields.restrictions)

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
      onGetEmailTemplate(id)
    }
  }, [id])

  useEffect(() => {
    if (didMountRef.current) {
      setFields({
        _id: emailTemplate._id,
        subject: emailTemplate.subject || "",
        body: emailTemplate.body || "",
        status: emailTemplate.status || "active",
        required:
          emailTemplate.required !== undefined ? emailTemplate.required : true,
        restrictions: [],
      })
    } else didMountRef.current = true
  }, [emailTemplate])

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }


  const onSubmit = event => {
    event.preventDefault()

    if (loading) return
    if (!accesses.canEdit) return

    const { restrictions, body } = fields

    // var storeDomainss = restrictions.map((item) => {
    //   item == "storeDomain"
    // })



    let isValid = true
    let required = ""

    for (let i = 0; i < restrictions?.length; i++) {
      if (restrictions[i] == "[customerAddress]") {
        break;
      }
      if (!body?.includes(restrictions[i]) && restrictions[i] == "[storeDomain]") {
        continue;
      }
      if (!body?.includes(restrictions[i])) {
        isValid = false
        required = restrictions[i]
        break;
      }
    }
    if (!isValid) {
      toastr.options = {
        timeOut: 2000,
        closeButton: true,
        progressBar: true,
        preventDuplicates: true,
      }
      toastr.error(`${props.t(required)} ${props.t("is_required")}!`)
      return
    }

    if (id) {
      onPutEmailTemplate(fields, history)
    } else {
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Content Pages"
            breadcrumbItem={
              (id ? props.t("Edit") : props.t("Add")) +
              " " +
              props.t("Email Template")
            }
            breadcrumbItems={[
              { title: props.t("email_templates"), link: "/email-templates" },
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

                      <Col md={12}>
                        <FormGroup>
                          <Label htmlFor="formrow-content-Input">
                            {props.t("body")}
                          </Label>

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
                            // config={{
                            //   height: 250,
                            //   toolbar: [
                            //     [
                            //       "Undo",
                            //       "Redo",
                            //       "Font",
                            //       "FontSize",
                            //       "Styles",
                            //       "Format",
                            //       "-",
                            //       "Maximize",
                            //       "-",
                            //       "Source",
                            //     ],
                            //     [
                            //       "Bold",
                            //       "Italic",
                            //       "Underline",
                            //       "Strike",
                            //       "-",
                            //       "RemoveFormat",
                            //       "-",
                            //       "NumberedList",
                            //       "BulletedList",
                            //     ],
                            //     [
                            //       "Link",
                            //       "Unlink",
                            //       "-",
                            //       "JustifyLeft",
                            //       "JustifyCenter",
                            //       "JustifyRight",
                            //       "JustifyBlock",
                            //       "-",
                            //       "Outdent",
                            //       "Indent",
                            //       "-",
                            //       "TextColor",
                            //       "BGColor",
                            //     ],
                            //     [
                            //       "Image",
                            //       "Table",
                            //       "HorizontalRule",
                            //       "SpecialChar",
                            //       "-",
                            //       "Blockquote",
                            //     ],
                            //   ],
                            // }}
                            scriptUrl="https://cdn.ckeditor.com/4.16.0/full/ckeditor.js"
                          />

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

                      <Col md={6}>
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
                      extraButton={
                        (id ? accesses.canEdit : accesses.canAdd) && (
                          <>
                            <button
                              id="resettooltip"
                              type="button"
                              className="btn outline btn-outline-danger w-md mb-2 mr-3"
                              onClick={() =>
                                onPostResetEmailTemplate({ _id: id })
                              }
                            >
                              {props.t("reset")}
                            </button>

                            <UncontrolledTooltip
                              placement="top"
                              target="resettooltip"
                            >
                              {props.t("reset_warning")}
                            </UncontrolledTooltip>
                          </>
                        )
                      }
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

AddEmailTemplate.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  emailTemplate: PropTypes.object,
  onGetEmailTemplate: PropTypes.func,
  onPutEmailTemplate: PropTypes.func,
  onPostResetEmailTemplate: PropTypes.func,
}

const mapStateToProps = ({ emailtemplates }) => ({
  error: emailtemplates.error,
  loading: emailtemplates.loading,
  emailTemplate: emailtemplates.emailTemplate,
})

const mapDispatchToProps = dispatch => ({
  onGetEmailTemplate: id => dispatch(getEmailTemplate(id)),
  onPutEmailTemplate: (data, history) =>
    dispatch(putEmailTemplate(data, history)),
  onPostResetEmailTemplate: data => dispatch(postResetEmailTemplate(data)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(AddEmailTemplate))
)
