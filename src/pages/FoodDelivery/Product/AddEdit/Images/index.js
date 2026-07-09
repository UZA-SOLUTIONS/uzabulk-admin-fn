import React from "react"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { connect } from "react-redux"
import Dropzone from "react-dropzone"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

import {
  Card,
  CardBody,
  Col,
  Row,
  FormGroup,
  Label,
  Spinner,
  FormText,
} from "reactstrap"

import Dragable from "./Dragable"

import { uploadFile, removeFile } from "store/actions"

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

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

const Images = props => {
  const {
    id,
    onUploadFile,
    isFeaturedOnly,
    fields,
    setFields,
    selectedFiles,
    setselectedFiles,
    accesses,
    serviceName,
  } = props
  // console.log(isFeaturedOnly, "isFeaturedOnly");
  function removeImage(index) {
    if (id && !accesses?.canEdit) return
    setselectedFiles(prevFiles => [
      ...prevFiles.slice(0, index),
      ...prevFiles.slice(index + 1),
    ])

    if (isFeaturedOnly) {
      setFields(prevState => ({
        ...prevState,
        featured_image: "",
      }))
    } else {
      setFields(prevState => ({
        ...prevState,
        featured_image:
          prevState.featured_image === (prevState?.images || [])[index]
            ? ""
            : prevState.featured_image,
        images: [
          ...(prevState?.images || [])?.slice(0, index),
          ...(prevState?.images || [])?.slice(index + 1),
        ],
      }))
    }
  }

  const uploadFileSuccess = response => {
    const { _id: featured_image } = response.data

    if (isFeaturedOnly) {
      return setFields(prevState => ({
        ...prevState,
        featured_image,
      }))
    }

    setFields(prevState => ({
      ...prevState,
      featured_image: !!prevState.featured_image
        ? prevState.featured_image
        : featured_image,
      images: [...(prevState?.images || []), featured_image],
    }))
  }

  function handleAcceptedFiles(_files) {
    if (id && !accesses?.canEdit) return
    if (isFeaturedOnly) {
      _files = _files.slice(0, 1)
    }

    const files = _files?.filter(file => file.size < 5242880)

    if (files.length < _files.length) {
      return toastr.error(props.t("max_file_size"))
    }

    files.map(file => {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })

      onUploadFile({ image: file }, uploadFileSuccess)
    })

    if (isFeaturedOnly) {
      setselectedFiles(files)
    } else {
      setselectedFiles(prevFiles => [...prevFiles, ...files])
    }
  }

  const onFilesDragEnd = result => {
    const { destination, draggableId, source } = result
    if (!destination) {
      return
    }

    if (!isFeaturedOnly) {
      const items = reorder(selectedFiles, source.index, destination.index)
      const images = reorder(
        fields?.images || [],
        source.index,
        destination.index
      )

      setselectedFiles(items)
      setFields(prevState => ({ ...prevState, images }))
    }
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <Col lg={12}>
            <FormGroup>
              <Label>
                {props.t(isFeaturedOnly ? "featured_image" : "product_images")}{" "}
                {isFeaturedOnly ? "" : <span class="text-danger">*</span>}
              </Label>

              <Dropzone
                onDrop={acceptedFiles => {
                  handleAcceptedFiles(acceptedFiles)
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone dropzone-sm">
                    <div className="dz-message needsclick" {...getRootProps()}>
                      <input {...getInputProps()} multiple={!isFeaturedOnly} />
                      <div className="dz-message needsclick">
                        <div className="mb-3">
                          <i className="display-4 text-muted bx bxs-cloud-upload" />
                        </div>
                        <h4>{props.t("drop_files")}</h4>
                      </div>
                    </div>
                  </div>
                )}
              </Dropzone>
              <div className="dropzone-previews mt-3" id="file-previews">
                <Dragable
                  onDragEnd={onFilesDragEnd}
                  droppableId={"no_parent"}
                  items={selectedFiles}
                  renderItem={({ category: f, index: i }) => (
                    <Card className="mt-1 mb-0 shadow-none border spinner-content w-25">
                      {f?.loading && (
                        <div className="spinner">
                          <Spinner color="primary" />
                        </div>
                      )}

                      <div className="p-2">
                        <Link
                          to="#"
                          className="mr-3 cursor-move position-absolute d-flex align-items-center h-100"
                          style={{ left: "-15px" }}
                          onClick={e => e.preventDefault()}
                        >
                          <i className="mdi mdi-drag-vertical" />
                        </Link>

                        <Link
                          to="#"
                          onClick={e => {
                            e.preventDefault()
                            removeImage(i)
                          }}
                          className="close"
                          style={{
                            top: 0,
                            alignItems: "unset",
                            height: "34px",
                          }}
                        >
                          <span className="close-content text-danger">
                            <i className="bx bx-trash font-size-22" />
                          </span>
                        </Link>

                        <img
                          className="avatar-md rounded bg-light w-100"
                          alt={f.name}
                          src={f.preview}
                        />

                        {!isFeaturedOnly && (
                          <p className="mt-2 mb-0">
                            <div className="custom-control custom-checkbox custom-checkbox-primary">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`option-radio-${i}`}
                                checked={
                                  fields?.images[i] === fields?.featured_image
                                }
                                onChange={() => {
                                  if (
                                    fields?.images[i] === fields?.featured_image
                                  ) {
                                  } else {
                                    setFields(prevState => ({
                                      ...prevState,
                                      featured_image: fields?.images[i],
                                    }))
                                  }
                                }}
                              />

                              <label
                                className="custom-control-label"
                                htmlFor={`option-radio-${i}`}
                              >
                                {props.t("featured")}
                              </label>
                            </div>
                          </p>
                        )}
                      </div>
                    </Card>
                  )}
                />
              </div>
              <FormText>
                {props.t("images_guide", { serviceName })}{" "}
                {props.t("max_file_size")}
              </FormText>
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

Images.propTypes = {
  onUploadFile: PropTypes.func,
  onRemoveFile: PropTypes.func,
}

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = dispatch => ({
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
  onRemoveFile: data => dispatch(removeFile(data)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Images))
