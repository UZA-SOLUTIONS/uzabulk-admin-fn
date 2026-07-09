import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect } from "react-redux"
/* import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
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
} from "reactstrap"

import { getContentPage, putContentPage } from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

const AddContentPage = ({
  accessLevel,
  history,
  error,
  onGetContentPage,
  onPutContentPage,
  contentPage,
  loading,
  ...props
}) => {
  const { id, contentPageId } = useParams()
  const didMountRef = useRef(null)

  const [isWeb, setisWeb] = useState(
    props.match.path.includes("/content-pages")
  )
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    _id: "",
    title: "",
    content: "",
    seoSettings: {},
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
    let _isWeb = props.match.path.includes("/content-pages")
    setisWeb(_isWeb)
  }, [props.match.path])

  useEffect(() => {
    if (id) {
      setFields({
        _id: "",
        title: "",
        content: "",
        customContent: "",
        status: contentPage?.status || "active",
      })
      onGetContentPage(id)
    }
  }, [id])

  useEffect(() => {
    setFields({
      _id: contentPage?._id,
      title: contentPage?.title || "",
      content: contentPage?.content || "",
      customContent: contentPage?.customContent || "",
      seoSettings: contentPage?.seoSettings,
      status: contentPage?.status || "active",
    })
  }, [JSON.stringify(contentPage)])

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const handleSeoChange = name => event => {
    setFields(prevState => ({
      ...prevState,
      seoSettings: { ...prevState.seoSettings, [name]: event.target.value },
    }))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return

    let canGo = false

    if (props.fields) {
      canGo = !!contentPageId
    } else {
      canGo = !!id
    }

    if (canGo) {
      if (!accesses.canEdit) return
      onPutContentPage({ ...fields, isFields: props.fields }, history)
    } else {
    }
  }

  let content = (
    <Card>
      <CardBody>
        <Form onSubmit={onSubmit} className="spinner-content">
          {error && typeof error === "string" ? (
            <Alert color="danger">{error}</Alert>
          ) : null}

          <Row>
            <Col md={12}>
              <FormGroup>
                <Label>{props.t("title")}</Label>

                <Input
                  type="text"
                  value={fields?.title}
                  onChange={handleChange("title")}
                />
              </FormGroup>
            </Col>

            <Col md={12}>
              <FormGroup>
                <Label for="formrow-content-Input">
                  {props.t("content")}
                </Label>

                <CKEditor
                  content={fields.content}
                  events={{
                    change: evt => {
                      const data = evt?.editor?.getData()

                      handleChange("content")({
                        target: { value: data },
                      })
                    },
                  }}
                  config={{
                    allowedContent: true, // Allow all content
                    extraAllowedContent: 'div{*}(*)[*];table{*}(*)[*];td{*}(*)[*];*{*}(*)[*]', // Allow all attributes, classes, and styles for div, table, and td
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

                {/* <CKEditor
                editor={ClassicEditor}
                data={fields.content}
                config={{
                  extraPlugins: [EditorUploadAdapterPlugin],
                }}
                onChange={(event, editor) => {
                  const data = editor.getData()

                  handleChange("content")({
                    target: { value: data },
                  })
                }}
              /> */}
              </FormGroup>
            </Col>

            <Col md={12}>
              <FormGroup>
                <Label>{props.t("embed_code")}</Label>

                <Input
                  type="textarea"
                  value={fields.customContent}
                  onChange={handleChange("customContent")}
                  rows={5}
                />
              </FormGroup>
            </Col>

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
                        fields.status == "active" ? "inactive" : "active"

                      handleChange("status")({
                        target: { value },
                      })
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

          <Row>
            <Col xs={12}>
              <h5>{props.t("seo_settings")}</h5>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>{props.t("title")}</Label>

                <Input
                  type="text"
                  value={fields?.seoSettings?.title}
                  onChange={handleSeoChange("title")}
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>{props.t("meta_keywords")}</Label>

                <Input
                  type="textarea"
                  rows={2}
                  value={fields?.seoSettings?.metaKeywords}
                  onChange={handleSeoChange("metaKeywords")}
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>{props.t("meta_description")}</Label>

                <Input
                  type="textarea"
                  rows={2}
                  value={fields?.seoSettings?.metaDescription}
                  onChange={handleSeoChange("metaDescription")}
                />
              </FormGroup>
            </Col>

            <Col xs={12}>
              <h5>{props.t("facebook")}</h5>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>{props.t("title")}</Label>

                <Input
                  type="text"
                  value={fields?.seoSettings?.facebook?.title}
                  onChange={e =>
                    handleSeoChange("facebook")({
                      target: {
                        value: {
                          ...fields?.seoSettings.facebook,
                          title: e.target.value,
                        },
                      },
                    })
                  }
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>{props.t("description")}</Label>

                <Input
                  type="textarea"
                  rows={2}
                  value={fields?.seoSettings?.facebook?.description}
                  onChange={e =>
                    handleSeoChange("facebook")({
                      target: {
                        value: {
                          ...fields?.seoSettings.facebook,
                          description: e.target.value,
                        },
                      },
                    })
                  }
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>{props.t("image_url")}</Label>

                <Input
                  type="text"
                  value={fields?.seoSettings?.facebook?.image}
                  onChange={e =>
                    handleSeoChange("facebook")({
                      target: {
                        value: {
                          ...fields?.seoSettings.facebook,
                          image: e.target.value,
                        },
                      },
                    })
                  }
                />
              </FormGroup>
            </Col>

            <Col xs={12}>
              <h5>{props.t("twitter")}</h5>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>{props.t("username")}</Label>

                <Input
                  type="text"
                  value={fields?.seoSettings?.twitter?.username}
                  onChange={e =>
                    handleSeoChange("twitter")({
                      target: {
                        value: {
                          ...fields?.seoSettings.twitter,
                          username: e.target.value,
                        },
                      },
                    })
                  }
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>{props.t("title")}</Label>

                <Input
                  type="text"
                  value={fields?.seoSettings?.twitter?.title}
                  onChange={e =>
                    handleSeoChange("twitter")({
                      target: {
                        value: {
                          ...fields?.seoSettings.twitter,
                          title: e.target.value,
                        },
                      },
                    })
                  }
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>{props.t("description")}</Label>

                <Input
                  type="textarea"
                  rows={2}
                  value={fields?.seoSettings?.twitter?.description}
                  onChange={e =>
                    handleSeoChange("twitter")({
                      target: {
                        value: {
                          ...fields?.seoSettings.twitter,
                          description: e.target.value,
                        },
                      },
                    })
                  }
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>{props.t("image_url")}</Label>

                <Input
                  type="text"
                  value={fields?.seoSettings?.twitter?.image}
                  onChange={e =>
                    handleSeoChange("twitter")({
                      target: {
                        value: {
                          ...fields?.seoSettings.twitter,
                          image: e.target.value,
                        },
                      },
                    })
                  }
                />
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
  )

  if (props.fields) return content

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Content Pages"
            breadcrumbItem={props.t("Edit") + " " + props.t("Content Page")}
            breadcrumbItems={[
              {
                title: props.t(isWeb ? "content_pages" : "app_settings"),
                link: isWeb ? "/content-pages" : "/app-settings",
              },
              { title: props.t("edit") },
            ]}
          />

          <Row>
            <Col lg={12}>{content}</Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

AddContentPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  contentPage: PropTypes.object,
  onGetContentPage: PropTypes.func,
  onPutContentPage: PropTypes.func,
}

const mapStateToProps = ({ contentpages }) => ({
  error: contentpages.error,
  loading: contentpages.loading,
  contentPage: contentpages.contentPage,
})

const mapDispatchToProps = dispatch => ({
  onGetContentPage: id => dispatch(getContentPage(id)),
  onPutContentPage: (data, history) => dispatch(putContentPage(data, history)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(AddContentPage))
)
