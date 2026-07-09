import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Col, FormGroup, FormText, Input, Label, Row } from 'reactstrap'

import Select from "react-select"
import { connect } from 'react-redux'
import { addFdCuisine, getFdCuisines, putFdCuisine, uploadFile } from 'store/actions'
import Dropzone from 'react-dropzone'

// Images
import avatar4 from "assets/images/logo-placeholder.png"
import { useParams } from 'react-router-dom'
import toastr from 'toastr'


const Amenities = (props) => {
    const { amenities, fdCuisines, activeStoreId,
        activeStoreType, setFields, fields, onGetFdCuisines, onUploadFile, onAddFdCuisine, setAmenities } = props

    const [selectedFiles, setselectedFiles] = useState([])

    const { id, vendorId: vendorIdParam } = useParams()
    // console.log(id, "IsdfgbdhtdehD", vendorIdParam);

    // console.log(amenities, "amenitiesdfgraweg");

    const [amenitieslist, setAmenitiesList] = useState()
    const [amenitiesAdder, setAmenitiesAdder] = useState(false)

    const [isAddAmenitiesACtive, setisAddAmenitiesACtive] = useState(false)

    const searching = useRef(null)
    const didMountRef = useRef(null)

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

    const [filter, setFilter] = useState({
        storeTypeId: "",
        orderBy: "date_created_utc",
        order: -1,
        page: 0,
        limit: 20,
        search: "",
        fields: [
            {
                fieldName: "status",
                fieldValue: "active",
            },
        ],
    })

    const [fieldsdata, setFieldsdata] = useState({
        storeTypeId: "",
        name: "",
        status: "active",
    })


    useEffect(() => {
        setAmenitiesList([
            ...fdCuisines.map(({ _id, name }) => ({
                label: name,
                value: _id,
            })),

            // { label: 'Other', value: 'other' }
        ])
    }, [JSON.stringify(fdCuisines)])

    useEffect(() => {
        setFilter(prevState => ({
            ...prevState,
            storeTypeId: activeStoreId,
            vendor: fields?.vendor,
        }))

        setFieldsdata(pre => ({
            ...pre,
            storeTypeId: activeStoreId,
            vendor: fields?.vendor,
        }))
    }, [activeStoreId, fields?.vendor])

    console.log(amenitieslist, "amenitieslist");

    // amenitieslist.push({ label: "Other", value: "" })

    function handleAmenities(data) {
        console.log(data, "PA");
        const isamenitiesAdder = data.filter((amen) => amen.value == "other")

        if (isamenitiesAdder.length > 0) {
            setAmenitiesAdder(true)
        }
        console.log(isamenitiesAdder, "isamenitiesAdder");
        // setFields((pre) => ({
        //     ...pre,
        //     amenities: [
        //         data.map((d) => ({
        //             d.value
        //         }))
        //     ]
        // }))
    }

    const uploadFileSuccess = response => {
        console.log(response, "RESPONSe");
        const { _id: image } = response.data

        setFieldsdata(prevState => ({ ...prevState, image }))
    }

    function handleAcceptedFiles(_files) {
        const files = _files?.filter(file => file.size < 5242880)

        if (files.length < _files.length) {
            return toastr.error(props.t("max_file_size"))
        }

        onUploadFile({ image: files[0] }, uploadFileSuccess)

        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        )
        setselectedFiles(files)
    }

    useEffect(() => {

        if (isAddAmenitiesACtive === false) {
            setFieldsdata((pre) => ({
                ...pre,
                image: "",
                name: ""
            }))

            setselectedFiles([])
        }

    }, [isAddAmenitiesACtive])

    const handleAddAmenities = (e) => {
        e.preventDefault()
        if (fieldsdata.name == "" || fieldsdata.image == "" || fieldsdata.storeTypeId == "" || fieldsdata.vendor == "") {
            toastr.error("Please fill all the fiels")
        } else {
            setisAddAmenitiesACtive(false)
            setAmenities((pre) => ([
                ...pre,
                {
                    label: fieldsdata.name,
                    value: fieldsdata.storeTypeId,
                }
            ]))
            onAddFdCuisine(activeStoreType?.storeType?.toLowerCase(), fieldsdata)

        }

    }

    // console.log(fieldsdata, "fieldsdata");
    // console.log(fdCuisines, "fdCuisines");

    const handleChange = (key) => (e) => {
        e.preventDefault()
        setFieldsdata((pre) => ({
            ...pre,
            [key]: e.target.value
        }))
    }

    useEffect(() => {
        if (didMountRef.current) {
            if (!filter?.vendor) return

            onGetFdCuisines(activeStoreType?.storeType?.toLowerCase(), filter)
        } else didMountRef.current = true
    }, [JSON.stringify(filter)])

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label> Amenities</Label>
                                <Select
                                    classNamePrefix="select2-selection "
                                    // menuPosition="fixed"

                                    onChange={setAmenities}
                                    options={amenitieslist}
                                    isMulti={true}
                                    value={amenities}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    {/* {!isAddAmenitiesACtive ?
                        <Row>
                            <Col>

                                <Button onClick={() => setisAddAmenitiesACtive(true)}>Add Amenities</Button></Col>
                        </Row>
                        :



                        <Row>
                            <Col md={12}>


                                <FormGroup>
                                    <Label> Name</Label>
                                    <Input type="text"
                                        onChange={handleChange("name")}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="formrow-profile-image-Input">
                                       
                                        Image
                                    </Label>

                                    <Dropzone
                                        onDrop={acceptedFiles => {
                                            handleAcceptedFiles(acceptedFiles)
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

                            <Col>
                                <Button onClick={handleAddAmenities}>Add</Button>
                            </Col>
                        </Row>
                    } */}

                </CardBody>
            </Card>
        </React.Fragment>
    )
}

const mapStateToProps = ({ FD_Cuisines }) => ({
    categoriesLoading: FD_Cuisines.loading,
    fdCuisines: FD_Cuisines.fdCuisines,
})

const mapDispatchToProps = dispatch => ({
    onGetFdCuisines: (storeTypeId, data) =>
        dispatch(getFdCuisines(storeTypeId, data)),
    onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
    onAddFdCuisine: (storeType, data) =>
        dispatch(addFdCuisine(storeType, data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Amenities)