import React, { useEffect, useRef } from 'react'
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
import Dropzone from "react-dropzone"
// Images
import avatar4 from "assets/images/logo-placeholder.png"

const ImageForm = (props) => {
    const { fields, handleChange, handleAcceptedFiles, options, selectedFiles, fdAddon, setFields, setselectedFiles } = props

    const didMountRef = useRef(null)

    // useEffect(() => {
    //     if (didMountRef.current) {
    //         const newarray = fdAddon?.options?.map(o => ({ _id: o._id, image: o.image }))
    //         try {
    //             setFields({
    //                 _id: fdAddon._id,
    //                 name: fdAddon.name || "",
    //                 type: fdAddon.type || "SINGLESELECT",
    //                 required: fdAddon.required || false,
    //                 status: fdAddon.status || "active",
    //                 options: newarray || [{ _id: "", image: "" }],
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

    // console.log(fields, "fdAddonnn4444n");
    return (
        <React.Fragment>

            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="formrow-firstname-Input">
                            {props.t("name")}<span className="text-danger ml-1">*</span>
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
            <Row>
                {options.map((opt, index) => {
                    console.log(opt, "optopt");
                    return (<Col>
                        <FormGroup>
                            {/* <h1>Hii</h1> */}
                        </FormGroup></Col>)

                })}

            </Row>

            <Row>


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
                                        fields.status == "active"
                                            ? "inactive"
                                            : "active"

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
            </Row>
        </React.Fragment>
    )
}

export default ImageForm