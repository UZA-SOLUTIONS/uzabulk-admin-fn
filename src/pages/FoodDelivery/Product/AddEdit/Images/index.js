import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
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
import { uploadProductImages } from "helpers/backend_helper"

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / k ** i).toFixed(dm)) + " " + sizes[i]
}

const Images = props => {
  const {
    id,
    isFeaturedOnly,
    requiredImages,
    fields,
    setFields,
    selectedFiles,
    setselectedFiles,
    accesses,
    serviceName,
    onUploadingChange,
  } = props
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (onUploadingChange) onUploadingChange(uploading)
  }, [uploading])

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
            ? (prevState?.images || [])[index === 0 ? 1 : 0] || ""
            : prevState.featured_image,
        images: [
          ...(prevState?.images || []).slice(0, index),
          ...(prevState?.images || []).slice(index + 1),
        ],
      }))
    }
  }

  async function handleAcceptedFiles(_files) {
    if (id && !accesses?.canEdit) return
    if (uploading) return
    if (isFeaturedOnly) {
      _files = _files.slice(0, 1)
    }

    const files = _files?.filter(file => file.size < 15 * 1024 * 1024)

    if (files.length < _files.length) {
      return toastr.error(props.t("max_file_size"))
    }
    if (!files.length) return

    files.forEach(file => {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
        loading: true,
      })
    })

    if (isFeaturedOnly) {
      setselectedFiles(files)
    } else {
      setselectedFiles(prevFiles => [...prevFiles, ...files])
    }

    setUploading(true)
    try {
      const response = await uploadProductImages(files)
      if (!response || response.status === "failure") {
        toastr.error(response?.message || props.t("image_required"))
        setselectedFiles(prevFiles => prevFiles.filter(file => !file.loading))
        return
      }

      const items = response.data?.items || []
      const urls = items.map(item => item.url).filter(Boolean)
      if (!urls.length) {
        setselectedFiles(prevFiles => prevFiles.filter(file => !file.loading))
        toastr.error(props.t("image_required"))
        return
      }

      setselectedFiles(prevFiles => [
        ...prevFiles.filter(file => !file.loading),
        ...items.map(item => ({
          preview: item.url,
          name: item.url,
          url: item.url,
        })),
      ])

      setFields(prevState => {
        if (isFeaturedOnly) {
          return { ...prevState, featured_image: urls[0] }
        }
        const nextImages = [...(prevState?.images || []), ...urls]
        return {
          ...prevState,
          featured_image: prevState.featured_image || urls[0],
          images: nextImages,
        }
      })
    } catch (error) {
      toastr.error(error?.message || props.t("image_required"))
      setselectedFiles(prevFiles => prevFiles.filter(file => !file.loading))
    } finally {
      setUploading(false)
    }
  }

  const onFilesDragEnd = result => {
    const { destination, source } = result
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
      setFields(prevState => ({
        ...prevState,
        images,
        featured_image: prevState.featured_image,
      }))
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
                {requiredImages ? <span className="text-danger">*</span> : null}
              </Label>

              <Dropzone
                disabled={uploading || (id && !accesses?.canEdit)}
                onDrop={acceptedFiles => {
                  handleAcceptedFiles(acceptedFiles)
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className={`dropzone dropzone-sm${uploading ? " opacity-50" : ""}`}>
                    <div className="dz-message needsclick" {...getRootProps()}>
                      <input {...getInputProps()} multiple={!isFeaturedOnly} />
                      <div className="dz-message needsclick">
                        <div className="mb-3">
                          {uploading ? (
                            <Spinner color="primary" />
                          ) : (
                            <i className="display-4 text-muted bx bxs-cloud-upload" />
                          )}
                        </div>
                        <h4>{uploading ? props.t("processing") : props.t("drop_files")}</h4>
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
                                  (fields?.images || [])[i] === fields?.featured_image
                                }
                                onChange={() => {
                                  if (
                                    (fields?.images || [])[i] === fields?.featured_image
                                  ) {
                                  } else {
                                    setFields(prevState => ({
                                      ...prevState,
                                      featured_image: (fields?.images || [])[i],
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
                Max. upload file size: 15MB
              </FormText>
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

Images.propTypes = {
  requiredImages: PropTypes.bool,
  onUploadingChange: PropTypes.func,
}

Images.defaultProps = {
  requiredImages: false,
}

export default withRouter(Images)
