import { event } from "jquery"
import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import Dropzone from "react-dropzone"
import { Button, Col, FormGroup, FormText, Input, Label, Row } from "reactstrap"
import avatar4 from "assets/images/logo-placeholder.png"
import { withTranslation } from "react-i18next"
import { uploadFile } from "store/actions"
import { withRouter } from "react-router-dom"
import { connect, useDispatch } from "react-redux"

const StoreLink = props => {
  const {
    handleStoreSwitch,
    inputList,
    handleStoreInputChange,
    handleaddClick,
    handleRemoveClick,
    imageupload,
    selectedFiles,
    indexCheck,
    t,

    onUploadFile,
  } = props

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  console.log("inputList", inputList)

  // image upload

  return (
    <div className="App">
      {/* <Row className="mt-4">
        
        <Col md={12}>
          <h5 className="text-uppercase">{props.t("store-link")}</h5>
        </Col>
      </Row> */}

      <div className="box">
        <Row className="align-items-center border-top mb-4">
          {/* <Col xs={12} className="mt-3">
              
              </Col> */}
          <Col md={12} className="my-3">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="text-uppercase">{props.t("store-link")}</h5>
            </div>
          </Col>
        </Row>
      </div>
      {inputList?.map((x, i) => {
        console.log(inputList)
        return (
          <div className="box bg-light p-2 rounded mb-4">
            <Row className="align-items-center ">
              <Col xs={6} sm={6} md={6}>
                <Label className="text-uppercase">{props.t("label")}</Label>
                <Input
                  name="label"
                  placeholder="label"
                  value={inputList[i]?.label}
                  onChange={e => handleStoreInputChange(e, i)}
                />
              </Col>
              <Col xs={6} sm={6} md={6}>
                <Label className="text-uppercase">{props.t("link")}</Label>
                <Input
                  className="ml10"
                  name="link"
                  placeholder="link"
                  value={inputList[i]?.link}
                  onChange={e => handleStoreInputChange(e, i)}
                />
              </Col>
              <Col xs={6} sm={3} md={3} className="mt-3">
                <Label className="text-capitalize">{props.t("status")}</Label>

                <div className="status-switch square-switch ">
                  <input
                    type="checkbox"
                    switch="none"
                    id={i}
                    checked={inputList[i]?.status}
                    onClick={event => {
                      handleStoreSwitch(event.target.checked, i)
                      // console.log("event is", event.target.checked)
                      // const list = [...inputList]
                      // list[i]["status"] = event.target.checked
                      // setInputList(list)
                    }}
                  />
                  <label
                    htmlFor={i}
                    data-on-label={"YES"}
                    data-off-label={"NO"}
                    id={`remove-branding-label1`}
                  />
                </div>
              </Col>

              {/* <Col xs={6} sm={7} md={8}>
                <Label className="text-uppercase">IMAGE</Label>
                <Input
                  className="ml10"
                  name="image"
                  placeholder="image"
                  value={x.image}
                  onChange={e => handleInputChange(e, i)}
                />
              </Col> */}

              <Col xs={6} sm={3} md={3} className="mt-3">
                <FormGroup>
                  <Label for="formrow-profile-image-Input">
                    {props.t("image")}
                  </Label>

                  <Dropzone
                    onDrop={acceptedFiles => {
                      imageupload(acceptedFiles, i)
                    }}
                  >
                    {({ getRootProps, getInputProps }) => {
                      const imageFile = inputList[i]?.imageFile

                      return (
                        <div
                          className="dropzone-single-image avatar-xl"
                          {...getRootProps()}
                        >
                          <input
                            {...getInputProps()}
                            id="formrow-profile-image-Input"
                            // multiple={false}
                          />

                          <img
                            className="rounded avatar-xl"
                            alt={
                              !!imageFile && imageFile.name
                                ? imageFile.name
                                : "uza"
                            }
                            src={!!imageFile ? imageFile : avatar4}
                          />

                          <div className="edit">
                            <i className="bx bx-pencil"></i>
                          </div>
                        </div>
                      )
                    }}
                    {/* 
                    <FormText className="d-inline-flex">
                      {props.t("max_file_size")}
                    </FormText>
                    <a
                      className="border-0 p-0 ml-2  d-inline-flex"
                      onClick={handleShow}
                    >
                      Preview
                    </a>

                    <Modal
                      className="transparent-pop"
                      show={show}
                      onHide={handleClose}
                    >
                      <img
                        alt={
                          !!imageFile && imageFile.name ? imageFile.name : "uza"
                        }
                        src={!!imageFile ? imageFile : avatar4}
                      />
                    </Modal> */}
                  </Dropzone>
                </FormGroup>
              </Col>

              <Col xs={6} sm={3} md={2} className="my-2">
                <div className="btn-box">
                  <Button
                    className="btn-primary w-100"
                    onClick={() => handleRemoveClick(i)}
                  >
                    Remove
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        )
      })}

      <div className="btn-box text-end pb-4 border-bottom">
        <Button className="btn-primary" onClick={handleaddClick}>
          ADD Store Link
        </Button>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
})

export default withRouter(
  connect(mapDispatchToProps)(withTranslation()(StoreLink))
)
// export default StoreLink
