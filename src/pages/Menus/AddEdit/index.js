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

import { getMenu, putMenu } from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

const AddMenu = ({
  accessLevel,
  history,
  error,
  onGetMenu,
  onPutMenu,
  menu,
  loading,
  ...props
}) => {
  const { id, menuId } = useParams()
  const didMountRef = useRef(null)

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    _id: "",
    label: "",
    content: "",
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
      setFields({
        _id: "",
        label: "",
        content: "",
        customContent: "",
        status: menu?.status || "active",
      })
      onGetMenu(id)
    }
  }, [id])

  useEffect(() => {
    setFields({
      _id: menu?._id,
      label: menu?.label || "",
      content: menu?.content || "",
      customContent: menu?.customContent || "",
      status: menu?.status || "active",
    })
  }, [JSON.stringify(menu)])

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return

    let canGo = false

    if (props.fields) {
      canGo = !!menuId
    } else {
      canGo = !!id
    }

    if (canGo) {
      if (!accesses.canEdit) return
      onPutMenu({ ...fields, isFields: props.fields }, history)
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
                <Label>{props.t("label")}</Label>

                <Input
                  type="text"
                  value={fields?.label}
                  onChange={handleChange("label")}
                />
              </FormGroup>
            </Col>

            {menu?.type === "CONTACT_US" && (
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
            )}

            {menu?.type === "CONTACT_US" && (
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
            )}

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
                title: props.t("menu"),
                link: "/menu",
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

AddMenu.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  menu: PropTypes.object,
  onGetMenu: PropTypes.func,
  onPutMenu: PropTypes.func,
}

const mapStateToProps = ({ menus }) => ({
  error: menus.error,
  loading: menus.loading,
  menu: menus.menu,
})

const mapDispatchToProps = dispatch => ({
  onGetMenu: id => dispatch(getMenu(id)),
  onPutMenu: (data, history) => dispatch(putMenu(data, history)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(AddMenu))
)
