import React, { useEffect, useRef } from "react"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Alert,
  Spinner,
  UncontrolledTooltip,
  CardTitle,
} from "reactstrap"

import { withTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import AnimateHeight from "react-animate-height"
import { SLUGS_NAME as slugname } from "helpers/contants"
const OptionsForm = props => {
  const {
    fields,
    handleChange,
    handleOptionChange,
    defaultOptionChange,
    options,
    addNewOption,
    fdAddon,
    setFields,
    slug,
    removeOption,
  } = props

  const didMountRef = useRef(null)
  console.log(slug, "Pp")

  // useEffect(() => {
  //     // console.log(fdAddon, "fdAddonnnn");

  //     if (didMountRef.current) {
  //         try {
  //             setFields({
  //                 _id: fdAddon._id,
  //                 name: fdAddon.name || "",
  //                 type: fdAddon.type || "SINGLESELECT",
  //                 minLimit: fdAddon.minLimit || "0",
  //                 maxLimit: fdAddon.maxLimit || "",
  //                 required: fdAddon.required || false,
  //                 status: fdAddon.status || "active",
  //                 multipleType: fdAddon.minLimit > 0 ? "true" : "false",
  //                 options: fdAddon.options || [{ name: "", price: "", default: false }],
  //                 image: fdAddon.image || "",
  //             })

  //             if (fdAddon.image && fdAddon.image.link) {
  //                 setselectedFiles([{ preview: fdAddon.image.link }])
  //             }
  //         } catch (err) {
  //             console.log("parsing error ", err)
  //         }
  //     } else didMountRef.current = true
  // }, [JSON.stringify(fdAddon)])

  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="formrow-firstname-Input">
              {props.t("name")}
              <span className="text-danger ml-1">*</span>
            </Label>
            <Input
              type="text"
              className="form-control"
              id="formrow-firstname-Input"
              value={fields.name || ""}
              onChange={handleChange("name")}
              required
            />
          </FormGroup>
        </Col>
      </Row>

      <Card className="mb-3">
        <CardTitle>{props.t("options")}</CardTitle>

        <CardBody className="px-0 py-2">
          <Row>
            <Col md={12} className="d-none d-sm-block">
              <Row>
                <Col xs={6} sm={4}>
                  <Label>{props.t("name")}</Label>
                </Col>

                <Col xs={6} sm={3}>
                  <Label>{props.t("price")}</Label>
                </Col>

                <Col xs={6} sm={2}>
                  <Label>{props.t("default")}</Label>
                </Col>

                <Col xs={6} sm={3}>
                  <Label>{props.t("actions")}</Label>
                </Col>
              </Row>
            </Col>
            {/* {console.log(fields.options, "options", options, "ff", fields)} */}
            <Col md={12}>
              {fields?.options?.map(({ namet, price }, index) => (
                <React.Fragment key={namet + "-" + index}>
                  <Row className="mb-3 mb-sm-2">
                    <Col xs={6} sm={4} className="pb-3 pb-sm-0">
                      <Label className="d-sm-none">
                        {props.t("name")}
                        <span className="text-danger ml-1">*</span>
                      </Label>

                      <Input
                        type="text"
                        className="form-control"
                        value={fields?.options[index]?.name}
                        onChange={handleOptionChange("name", index)}
                        required
                      />
                    </Col>

                    <Col xs={6} sm={3} className="pb-3 pb-sm-0">
                      <Label className="d-sm-none">
                        {props.t("price")}
                        <span className="text-danger ml-1">*</span>
                      </Label>

                      <Input
                        type="number"
                        className="form-control"
                        value={fields?.options[index]?.price}
                        onChange={handleOptionChange("price", index)}
                        step={0.01}
                        min={0}
                        required
                      />
                    </Col>

                    <Col xs={6} sm={2}>
                      <Label className="d-sm-none">{props.t("default")}</Label>

                      <div className="d-flex align-items-center">
                        <div className="custom-control custom-checkbox custom-checkbox-primary">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={`option-radio-${index}`}
                            checked={fields.options[index]?.default}
                            onChange={defaultOptionChange(index)}
                          />

                          <label
                            className="custom-control-label"
                            htmlFor={`option-radio-${index}`}
                          ></label>
                        </div>
                      </div>
                    </Col>

                    <Col xs={6} sm={3}>
                      <Label className="d-sm-none">{props.t("actions")}</Label>

                      <div className="d-flex align-items-center">
                        {index === fields?.options?.length - 1 && (
                          <Link
                            to={`#`}
                            onClick={addNewOption}
                            className="mr-3 text-primary"
                          >
                            <i
                              className="bx bx-plus font-size-22 mr-3"
                              id="addoptiontooltip"
                            />
                          </Link>
                        )}
                        {console.log(fields?.options.length, "length")}
                        <Link
                          disabled={fields?.options.length === 1}
                          to={`#`}
                          onClick={e => {
                            e.preventDefault()

                            fields?.options.length > 1 && removeOption(e, index)
                          }}
                          className={
                            fields?.options?.length === 1
                              ? "text-secondary"
                              : "text-danger"
                          }
                        >
                          <i
                            className="bx bx-trash font-size-22"
                            id="removeoptiontooltip"
                          />
                        </Link>
                      </div>
                    </Col>
                  </Row>

                  <hr className="d-block d-sm-none" />
                </React.Fragment>
              ))}
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Row>
        <Col xs={6} sm={6} md={3}>
          <FormGroup>
            <Label>{props.t("required")}</Label>

            <div className="switch-xl square-switch">
              <input
                type="checkbox"
                id="square-required"
                switch="none"
                checked={fields.required}
                onChange={() => {
                  const value = fields.required ? false : true

                  handleChange("required")({ target: { value } })
                }}
              />
              <label
                htmlFor="square-required"
                data-on-label={props.t("yes")}
                data-off-label={props.t("no")}
              />
            </div>
          </FormGroup>
        </Col>

        {[slugname.oneTimeShop].includes(slug) && (
          <Col xs={6} sm={6} md={3}>
            <FormGroup>
              <Label>{props.t("quantity_selector")}</Label>

              <div className="switch-xl square-switch">
                <input
                  type="checkbox"
                  id="isSelect-required"
                  switch="none"
                  checked={fields.isSelectorRequired}
                  onChange={() => {
                    const value = fields.isSelectorRequired ? false : true

                    handleChange("isSelectorRequired")({ target: { value } })
                  }}
                />
                <label
                  htmlFor="isSelect-required"
                  data-on-label={props.t("yes")}
                  data-off-label={props.t("no")}
                />
              </div>
            </FormGroup>
          </Col>
        )}

        <Col xs={6} sm={6} md={3}>
          <FormGroup>
            <Label>{props.t("status")}</Label>

            <div className="switch-xl square-switch">
              <input
                type="checkbox"
                id="status-switch1"
                switch="none"
                checked={fields.status == "active"}
                onChange={() => {
                  const value =
                    fields.status == "active" ? "inactive" : "active"

                  handleChange("status")({ target: { value } })
                }}
              />
              <label
                htmlFor="status-switch1"
                data-on-label={props.t("active")}
                data-off-label={props.t("inactive")}
              />
            </div>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col xs={6} sm={6} md={3}>
          <FormGroup>
            <Label>{props.t("limit")}</Label>

            <div className="status-switch square-switch">
              <input
                type="checkbox"
                id="square-switch1"
                switch="none"
                checked={fields.type == "MULTISELECT"}
                onChange={() => {
                  const value =
                    fields.type == "SINGLESELECT"
                      ? "MULTISELECT"
                      : "SINGLESELECT"

                  handleChange("type")({ target: { value } })
                }}
              />
              <label
                htmlFor="square-switch1"
                data-on-label={props.t("on")}
                data-off-label={props.t("off")}
              />
            </div>
          </FormGroup>
        </Col>

        <Col xs={6} sm={6} md={3}>
          <AnimateHeight
            duration={500}
            height={fields.type === "MULTISELECT" ? "auto" : 0}
          >
            <FormGroup>
              <Label>{props.t("limit_type")}</Label>

              <div className="switch-xl square-switch">
                <input
                  type="checkbox"
                  className="switcher"
                  id="multiple-switch"
                  switch="none"
                  checked={fields.multipleType == "true"}
                  onChange={() => {
                    const value =
                      fields.multipleType == "true" ? "false" : "true"

                    handleChange("multipleType")({
                      target: { value },
                    })
                  }}
                  {...(fields.type === "MULTISELECT" ? {} : { disabled: true })}
                />
                <label
                  htmlFor="multiple-switch"
                  data-on-label={props.t("range")}
                  data-off-label={props.t("max")}
                />
              </div>
            </FormGroup>
          </AnimateHeight>
        </Col>

        <Col sm={12} md={6}>
          <Row>
            {fields.multipleType == "true" && (
              <Col xs={6} sm={6} md={6}>
                <AnimateHeight
                  duration={500}
                  height={fields.type === "MULTISELECT" ? "auto" : 0}
                >
                  <FormGroup>
                    <Label for="formrow-minlimit-Input">
                      {props.t("min_limit")}
                    </Label>

                    <Input
                      type="number"
                      className="form-control"
                      id="formrow-minlimit-Input"
                      value={fields.minLimit}
                      onChange={e => {
                        console.log(e, "OO")
                        if (
                          e.target.value > fields?.options?.length ||
                          e.target.value < 0
                        )
                          return

                        handleChange("minLimit")(e)
                      }}
                      {...(fields.type === "MULTISELECT"
                        ? { required: true }
                        : { required: false, disabled: true })}
                    />
                  </FormGroup>
                </AnimateHeight>
              </Col>
            )}

            <Col xs={6} sm={6} md={6}>
              <AnimateHeight
                duration={500}
                height={fields.type === "MULTISELECT" ? "auto" : 0}
              >
                <FormGroup>
                  <Label for="formrow-maxlimit-Input">
                    {props.t("max_limit")}
                  </Label>

                  <Input
                    type="number"
                    className="form-control"
                    id="formrow-maxlimit-Input"
                    value={fields.maxLimit}
                    onChange={e => {
                      if (
                        e.target.value > fields?.options.length ||
                        e.target.value < 0
                      )
                        return

                      if (fields.multipleType == "false") {
                        handleChange("minLimit")({
                          target: { value: "0" },
                        })
                      }

                      handleChange("maxLimit")(e)
                    }}
                    {...(fields.type === "MULTISELECT"
                      ? { required: true }
                      : { required: false, disabled: true })}
                  />
                </FormGroup>
              </AnimateHeight>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* {activeStoreType.storeType === "CARRENTAL" &&
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="formrow-profile-image-Input">
                              {props.t("feature_image")}
                            </Label>

                            <Dropzone
                              onDrop={acceptedFiles => {
                                handleAcceptedFiles("profileImage")(acceptedFiles)
                              }}
                            >
                              {({ getRootProps, getInputProps }) => {
                                const imageFile = selectedFiles[0]

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

                                    <img
                                      className="rounded avatar-xl"
                                      alt={
                                        !!imageFile && imageFile.name
                                          ? imageFile.name
                                          : "uza"
                                      }
                                      src={
                                        !!imageFile ? imageFile.preview : avatar4
                                      }
                                    />

                                    <div className="edit">
                                      <i className="bx bx-pencil"></i>
                                    </div>
                                  </div>
                                )
                              }}
                            </Dropzone>

                            <FormText>{props.t("max_file_size")}</FormText>
                          </FormGroup>
                        </Col>
                      </Row>} */}
    </React.Fragment>
  )
}

export default OptionsForm
