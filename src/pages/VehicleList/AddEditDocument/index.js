import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, Link, useParams } from "react-router-dom"
import { connect } from "react-redux"
import moment from "moment"
import Select from "react-select"
import DateRangePicker from "react-bootstrap-daterangepicker"
import Dropzone from "react-dropzone"
import mime from "mime-types"
import queryString from "query-string"
import FormButton from "components/Common/FormButtons"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

import "bootstrap-daterangepicker/daterangepicker.css"

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
  FormText,
} from "reactstrap"

import {
  postFdDriverDocument,
  getFdDriverDocument,
  putFdDriverDocument,
  uploadFile,
} from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

// Images
import avatar4 from "assets/images/logo-placeholder.png"
import logoFile from "assets/images/logo-file.png"

// Components
import PreviewModal from "./Preview"

/**
 * Formats the size
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

const AddDocument = ({
  accessLevel,
  history,
  fdDocument,
  error,
  onPostFdDriverDocument,
  onGetFdDriverDocument,
  onPutFdDriverDocument,
  loading,
  accessLevels,
  onUploadFile,
  activeStoreType,
  ...props
}) => {
  const { id, documentId } = useParams()
  const { driver_name } = queryString.parse(props?.location?.search)

  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    preview: null,
  })
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [isUploading, setisUploading] = useState(false)
  const [selectedFiles, setselectedFiles] = useState({ 0: [] })
  const [fields, setFields] = useState({})

  useEffect(() => {
    if (!accessLevel) {
      console.log("no access");
      const data = {
        canAdd: true,
        canEdit: true,
      }
      // const harry = accessLevels?.filter(item => item.label === "Drivers")[0]
      // ?.permissions.map(val => {
      //   switch(val.label){
      //     case "CREATE":
      //       data.canAdd = val.value
      //       break

      //     case "UPDATE":
      //       data.canEdit = val.value
      //       break
      //   }
      // })

      // console.log(harry,"HARRy");
      // console.log(data,"datadata");
      return setaccesses(data)
    }

    console.log("access");
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
    if (documentId) {
      onGetFdDriverDocument({ _id: documentId, user: id })
    }
  }, [id, documentId])

  useEffect(() => {
    if (fdDocument) {
      setFields({
        _id: documentId,
        user: id,
        ...fdDocument,
      })
    }
  }, [JSON.stringify(fdDocument)])

  const handleChange = index => event => {
    const { value } = event.target

    setFields(prevState => ({
      ...prevState,
      fields: [
        ...prevState?.fields?.slice(0, index),
        { ...prevState?.fields[index], value },
        ...prevState?.fields?.slice(index + 1),
      ],
    }))
  }

  const uploadFileSuccess = index => response => {
    const { link } = response.data

    setisUploading(false)
    handleChange(index)({ target: { value: link } })
  }

  function handleAcceptedFiles(index, _files) {
    if (id && !accesses.canEdit) return
    const files = _files?.filter(file => file.size < 5242880)

    if (files.length < _files.length) {
      return toastr.error(props.t("max_file_size"))
    }

    setisUploading(true)
    handleChange(index)({ target: { value: null } })
    onUploadFile({ image: files[0] }, uploadFileSuccess(index))

    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(prevState => ({ ...prevState, [index]: files }))
  }

  const togglePreviewModal = preview => {
    setPreviewModal(prevState => ({ isOpen: !prevState.isOpen, preview }))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return
    if (isUploading) return

    if (documentId) {
      if (!accesses.canEdit) return
      onPutFdDriverDocument(fields, history)
    } else {
      if (!accesses.canAdd) return
      onPostFdDriverDocument(fields, history)
    }
  }

  return (
    <React.Fragment>
      <PreviewModal {...previewModal} toggle={togglePreviewModal} />

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Drivers"
            breadcrumbItem={
              (documentId ? props.t("edit") : props.t("add")) +
              " " +
              (fields?.name || props.t("document"))
            }
            breadcrumbItems={[
              {
                title: props.t("drivers"),
                // link: `/${activeStoreType?.storeType?.toLowerCase()}/drivers`,
                link: `/drivers`,
              },
              {
                title: driver_name || props.t("Profile"),
                link: `/drivers/${id}/profile`,
                // link: `/${activeStoreType?.storeType?.toLowerCase()}/drivers/${id}/profile`,
              },
              {
                title:
                  (documentId ? props.t("edit") : props.t("add")) +
                  " " +
                  (fields?.name || props.t("document")),
              },
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
                      {fields?.fields?.map((item, index) => {
                        let input

                        switch (item?.type) {
                          case "datePicker":
                            input = (
                              <DateRangePicker
                                initialSettings={{
                                  singleDatePicker: true,
                                  showDropdowns: true,
                                  opens: "start",
                                  alwaysShowCalendars: true,
                                  applyButtonClasses: "btn-primary",
                                  autoApply: true,
                                  startDate: !!item?.value
                                    ? moment(item?.value, "DD-MMM-YYYY")
                                    : moment(),
                                  autoUpdateInput: false,
                                }}
                                onCallback={start => {
                                  handleChange(index)({
                                    target: {
                                      value: start.format("DD-MMM-YYYY"),
                                    },
                                  })
                                }}
                              >
                                <input
                                  type="text"
                                  className="form-control"
                                  value={
                                    !!item?.value
                                      ? moment(
                                        item?.value,
                                        "DD-MMM-YYYY"
                                      ).format("DD MMM YYYY")
                                      : moment().format("DD MMM YYYY")
                                  }
                                />
                              </DateRangePicker>
                            )
                            break

                          case "checkbox":
                            input = (
                              <Row>
                                {item?.options?.map((option, opindex) => {
                                  return (
                                    <Col key={"_option_" + opindex}>
                                      <div className="custom-control custom-checkbox custom-checkbox-primary">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id={`option-radio-${index}-${opindex}`}
                                          checked={option.isSelected}
                                          onChange={() => {
                                            let optionVal = {
                                              ...item?.options[opindex],
                                              isSelected: !option?.isSelected,
                                            }

                                            let _options = [
                                              ...item?.options?.slice(
                                                0,
                                                opindex
                                              ),
                                              optionVal,
                                              ...item?.options?.slice(
                                                opindex + 1
                                              ),
                                            ]

                                            setFields(prevState => ({
                                              ...prevState,
                                              fields: [
                                                ...prevState?.fields?.slice(
                                                  0,
                                                  index
                                                ),
                                                {
                                                  ...prevState?.fields[index],
                                                  options: _options,
                                                },
                                                ...prevState?.fields?.slice(
                                                  index + 1
                                                ),
                                              ],
                                            }))
                                          }}
                                        />

                                        <label
                                          className="custom-control-label"
                                          htmlFor={`option-radio-${index}-${opindex}`}
                                        >
                                          {option.label}
                                        </label>
                                      </div>
                                    </Col>
                                  )
                                })}
                              </Row>
                            )
                            break

                          case "select":
                            input = (
                              <Select
                                options={item?.options}
                                onChange={data => {
                                  handleChange(index)({
                                    target: { value: data?.value },
                                  })
                                }}
                                value={item?.options?.filter(
                                  ({ value }) => item?.value === value
                                )}
                              />
                            )
                            break

                          case "file":
                            input = (
                              <>
                                <Dropzone
                                  onDrop={acceptedFiles => {
                                    handleAcceptedFiles(index, acceptedFiles)
                                  }}
                                >
                                  {({ getRootProps, getInputProps }) => {
                                    const imageFile = (selectedFiles[index] ||
                                      [])[0]

                                    let file = !!item?.value
                                      ? item?.value
                                      : !!imageFile
                                        ? imageFile.preview
                                        : avatar4

                                    const mimeType = mime.lookup(file)
                                    let isFile = false

                                    if (!!mimeType) {
                                      isFile =
                                        mimeType?.split("/")[0] !== "image"
                                    }
                                    if (isFile) {
                                      file = logoFile
                                    }

                                    return (
                                      <div
                                        className="dropzone-single-image avatar-xl"
                                        {...getRootProps()}
                                      >
                                        <input
                                          {...getInputProps()}
                                          id="formrow-profile-image-Input"
                                          multiple={false}
                                        />
                                        <span>
                                          <img
                                            className="rounded avatar-xl"
                                            alt=""
                                            src={file}
                                            onError={e => {
                                              e.target.onerror = null
                                              e.target.src = logoFile
                                            }}
                                          />
                                          {/* {isFile && (
                                          <span className="text-truncate text-muted">
                                            {!!item?.value
                                              ? item?.value
                                              : !!imageFile
                                              ? imageFile.preview
                                              : ""}
                                          </span>
                                        )} */}
                                        </span>

                                        <div className="edit">
                                          <i className="bx bx-pencil"></i>
                                        </div>
                                      </div>
                                    )
                                  }}
                                </Dropzone>

                                <FormText>
                                  {props.t("max_file_size")}{" "}
                                  {item.value && (
                                    <Link
                                      to="#"
                                      onClick={e => {
                                        e.preventDefault()
                                        togglePreviewModal(item.value)
                                      }}
                                    >
                                      {props.t("preview")}
                                    </Link>
                                  )}
                                </FormText>
                              </>
                            )
                            break

                          default:
                            input = (
                              <Input
                                type={item?.type}
                                required={item?.validation?.required}
                                value={item?.value}
                                onChange={handleChange(index)}
                              />
                            )
                        }

                        return (
                          <Col md={6} key={item?._id}>
                            <FormGroup>
                              <Label>{props.t(item?.label)}{item?.validation?.required && <span className="text-danger ml-1">*</span>}</Label>

                              {input}
                            </FormGroup>
                          </Col>
                        )
                      })}
                    </Row>

                    <FormButton
                      needSubmit={
                        documentId ? accesses.canEdit : accesses.canAdd
                      }
                      submitDisabled={isUploading}
                      goBack={() => history.goBack()}
                      submitId="submittooltip"
                      submitContent={
                        isUploading && (
                          <UncontrolledTooltip
                            placement="bottom"
                            target="submittooltip"
                          >
                            {props.t("image_upload_wait")}
                          </UncontrolledTooltip>
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

AddDocument.propTypes = {
  t: PropTypes.any,
  loading: PropTypes.bool,
  error: PropTypes.string,
  fdDocument: PropTypes.object,
  onPostFdDriverDocument: PropTypes.func,
  onGetFdDriverDocument: PropTypes.func,
  onPutFdDriverDocument: PropTypes.func,
}

const mapStateToProps = ({ FD_Drivers, Login }) => ({
  error: FD_Drivers.error,
  loading: FD_Drivers.loading,
  fdDocument: FD_Drivers.fdDocument,
  accessLevels: Login?.user?.accessLevel?.permissions || [],
})

const mapDispatchToProps = dispatch => ({
  onPostFdDriverDocument: (data, history) =>
    dispatch(postFdDriverDocument(data, history)),
  onGetFdDriverDocument: id => dispatch(getFdDriverDocument(id)),
  onPutFdDriverDocument: (data, history) =>
    dispatch(putFdDriverDocument(data, history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),

})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddDocument))
)
