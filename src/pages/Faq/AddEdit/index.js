import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect } from "react-redux"
/* import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import EditorUploadAdapterPlugin from "../../../plugins/ckeditor/UploadAdapterPlugin" */
import CKEditor from "react-ckeditor-component"
import FormButton from "components/Common/FormButtons"
import Select from "react-select"
import toastr from "toastr"

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

import { addFaq, getFaq, putFaq } from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"
import { isHideThingTrue, SLUGS_NAME } from "helpers/contants"

const AddCustomer = ({
  accessLevel,
  history,
  error,
  onAddFaq,
  onGetFaq,
  onPutFaq,
  faq,
  loading,
  hideThings,
  language,
  slug,
  ...props
}) => {
  const { id } = useParams()
  const didMountRef = useRef(null)
  console.log(language?.length, "gucci")
  const [faqType, setFaqtype] = useState({})

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    question: "",
    answer: "",
    status: "active",
    type: "",
    lang: "en",
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
      onGetFaq(id)
    }
  }, [id])

  useEffect(() => {
    if (didMountRef.current) {
      if (!!faq && !!faq.answer) {
        try {
          setFields({
            question: faq.question || "",
            answer: faq.answer || "",
            status: faq.status || "active",
            lang: faq.lang || "en",
            type: faq.type,
          })
          setFaqtype({
            label: faq.type.slice(0, 1).toUpperCase() + faq.type.slice(1),
            value: faq.type,
          })
        } catch (err) {
          console.log("parsing error ", err)
        }
      }
    } else didMountRef.current = true
  }, [JSON.stringify(faq)])

  const handleChange = name => event => {
    console.log("KKK ", event)
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }
  // console.log('isTypeAvailable', isTypeAvailable)
  const onSubmit = event => {
    event.preventDefault()
    if (loading) return
    let type

    if (!isTypeAvailable) {
      type = "website"
    } else {
      if (isTypeAvailable && !faqType?.value) {
        toastr.error("Please Select Faq Type")
        return
      }
      if (slug === SLUGS_NAME.kucher && !fields.lang) {
        toastr.error("Please Select language")
        return
      } else {
        type = faqType?.value
      }
    }

    if (id) {
      if (!accesses.canEdit) return
      onPutFaq({ ...fields, _id: faq._id, type, lang: fields.lang }, history)
    } else {
      if (!accesses.canAdd) return
      onAddFaq({ ...fields, type, lang: fields.lang }, history)
    }
  }

  const handleChangeType = data => {
    console.log(data, "gwarg3r5grtghtr")
    setFaqtype(data)
  }
  const typeOptions = [
    { label: "Customers", value: "customers" },
    { label: "Drivers", value: "drivers" },
    { label: "Website", value: "website" },
  ]

  useEffect(() => {
    console.log(faqType?.value, "faqTypefaqType")
  }, [faqType])

  const isTypeAvailable = isHideThingTrue(hideThings, "faq")
  console.log(isTypeAvailable, "HideThings")

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Faqs"
            breadcrumbItem={
              (id ? props.t("edit") : props.t("add")) + " " + props.t("faq")
            }
            breadcrumbItems={[
              { title: props.t("faqs"), link: "/faqs" },
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
                      <Col md={9}>
                        <FormGroup>
                          <Label for="formrow-firstname-Input">
                            {props.t("question")}
                            <span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="formrow-firstname-Input"
                            value={fields.question}
                            onChange={handleChange("question")}
                            required
                          />
                        </FormGroup>
                      </Col>

                      {/* {slug === SLUGS_NAME.kucher && (
                        <Col md={3}>
                          <FormGroup>
                            <Label for="formrow-firstname-Input">
                              {props.t("Language")}
                              <span className="text-danger ml-1">*</span>
                            </Label>
                            <select
                              name="lang"
                              className="custom-select w-100"
                              onChange={handleChange("lang")}
                              value={fields.lang}
                              style={{ minWidth: "106px" }}
                            >
                              {language.map((lan, index) => (
                                <option key={index} value={lan.code}>
                                  {lan?.name}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
                      )} */}
                      {language?.length > 1 && (
                        <Col md={3}>
                          <FormGroup>
                            <Label for="formrow-firstname-Input">
                              {props.t("Language")}
                              <span className="text-danger ml-1">*</span>
                            </Label>
                            <select
                              name="lang"
                              className="custom-select w-100"
                              onChange={handleChange("lang")}
                              value={fields.lang}
                              style={{ minWidth: "106px" }}
                            >
                              {language.map((lan, index) => (
                                <option key={index} value={lan.code}>
                                  {lan?.name}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
                      )}
                      <Col md={12}>
                        <FormGroup>
                          <Label>{props.t("answer")}</Label>

                          <CKEditor
                            content={fields.answer}
                            events={{
                              change: evt => {
                                const data = evt?.editor?.getData()

                                handleChange("answer")({
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
                            data={fields.answer}
                            config={{
                              extraPlugins: [EditorUploadAdapterPlugin],
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData()

                              handleChange("answer")({
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

                      {isTypeAvailable && (
                        <Col xs={6} s={6} ls={6} md={6}>
                          <FormGroup>
                            <Label>{props.t("type")}</Label>

                            <Select
                              options={typeOptions}
                              value={faqType}
                              onChange={handleChangeType}
                            />
                          </FormGroup>
                        </Col>
                      )}
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

AddCustomer.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  faq: PropTypes.object,
  onAddFaq: PropTypes.func,
  onGetFaq: PropTypes.func,
  onPutFaq: PropTypes.func,
}

const mapStateToProps = ({ faqs, Settings }) => ({
  error: faqs.error,
  loading: faqs.loading,
  faq: faqs.faq,
  hideThings: Settings?.settings?.hideThings,
  language: Settings?.settings?.storeLanguage,
  slug: Settings?.settings?.slug,
})

const mapDispatchToProps = dispatch => ({
  onAddFaq: (data, history) => dispatch(addFaq(data, history)),
  onGetFaq: id => dispatch(getFaq(id)),
  onPutFaq: (data, history) => dispatch(putFaq(data, history)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddCustomer))
)
