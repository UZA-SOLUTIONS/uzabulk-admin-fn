import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Container, Form, Input, Label, Row, FormGroup } from 'reactstrap'

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"
import { editDriverVehicleInfo, updateDriverVehicleInfo, uploadFile } from 'store/actions'
import { connect } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import Dropzone from "react-dropzone"
import FormButton from "components/Common/FormButtons"
import DateRangePicker from "react-bootstrap-daterangepicker"

// Images
import avatar4 from "assets/images/users/avatar-9.jpg"
import moment from "moment"

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

const AddEditVehicle = (props) => {

    const { accessLevel, onUploadFile, history, loading, onupdateDriverVehicleInfo } = props


    var { id, id1 } = useParams()
    let location = useLocation()
    console.log(location, 45666);
    console.log(id, id1, "IIIID");

    const [fields, setFields] = useState({
        _id: "",
        driver: ""
    })

    const [data, setData] = useState({})

    const [vehicledata, setVehicleData] = useState([])
    const [selectedFiles, setselectedFiles] = useState({ 0: [] })

    const [isUploading, setisUploading] = useState(false)

    const [accesses, setaccesses] = useState({
        canAdd: false,
        canEdit: false,
    })
    useEffect(() => {
        setFields({
            _id: id,
            driver: id1
        })
    }, [id, id1])

    useEffect(() => {
        if (!accessLevel) {
            const data = {
                canAdd: true,
                canEdit: true
            }
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
        setData(props?.vehicleInfo)
        setVehicleData(props?.vehicleInfo?.fields)
    }, [props?.vehicleInfo?.fields])

    const handleChange = (ind) => event => {
        console.log(ind, "Ep99;", event.target.value);
        event.preventDefault && event.preventDefault()


        setVehicleData((pre) => [

            ...pre?.slice(0, ind),
            { ...pre[ind], value: event.target.value },
            ...pre?.slice(ind + 1),

        ])
    }

    useEffect(() => {
        props?.oneditDriverVehicleInfo({
            _id: id1,
            driver: id
        })
    }, [id, id1])

    const uploadFileSuccess = index => response => {
        console.log(response.data, "HARRY")
        const { _id: image } = response.data
        console.log(image, "LINK");

        setisUploading(false)
        handleChange(index)({ target: { value: response.data.link } })
    }

    function handleAcceptedFiles(index, _files) {
        console.log(_files, "_files_files_files", index);
        if (id && !accesses.canEdit) return
        const files = _files?.filter(file => file.size < 5242880)
        console.log(files, "FILES");

        if (files.length < _files.length) {
            return toastr.error(props.t("max_file_size"))
        }

        setisUploading(true)
        console.log(files, "files[0]");
        var url = URL.createObjectURL(files[0]);

        console.log(url, url.slice(5), 878787);
        console.log(files[0], "FILESSSSSS1");
        handleChange(index)({ target: { value: null } })
        onUploadFile({ image: files[0] }, uploadFileSuccess(index))

        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        )

        console.log(files, "FILESSSSSS");

        setselectedFiles(prevState => ({ ...prevState, [index]: files }))
    }
    console.log(selectedFiles, "selectedFiles");
    console.log(props?.vehicleInfo, "selectedFiles");

    const onSubmit = event => {
        event.preventDefault()

        if (loading) return
        if (isUploading) return

        if (!accesses.canEdit) return
        onupdateDriverVehicleInfo({ ...data, driver: id, fields: [...vehicledata] }, history)

    }
    console.log(vehicledata, "vehicledata");

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs
                        title="Drivers"
                        breadcrumbItems={[
                            {
                                title: ("drivers"),
                                link: `/drivers`,
                            },
                            {
                                title: ("edit Vehicle"),
                                link: `/drivers`,
                            },

                        ]} />
                </Container>
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Form onSubmit={onSubmit}>
                                    <Row>
                                        {vehicledata?.map((vehicle, index) => {
                                            switch (vehicle?.type) {
                                                case "text":
                                                    return (<Col md={6} className='mt-3'>
                                                        <Label>{vehicle?.label}</Label>
                                                        <Input type="text" value={vehicle?.value}
                                                            onChange={handleChange(index)}
                                                        />
                                                    </Col>)

                                                case "file":
                                                    return (
                                                        <Col md={6} className='mt-3'><FormGroup>
                                                            <Label for="formrow-profile-image-Input">
                                                                {vehicle?.label}

                                                            </Label>

                                                            <Dropzone
                                                                onDrop={acceptedFiles => {
                                                                    handleAcceptedFiles(index, acceptedFiles)
                                                                }}
                                                            >
                                                                {({ getRootProps, getInputProps }) => {
                                                                    const imageFile = (selectedFiles[index] ||
                                                                        [])[0]

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
                                                                                className="rounded-circle avatar-xl"
                                                                                alt={
                                                                                    !!vehicle?.value
                                                                                        ? vehicle?.value
                                                                                        :
                                                                                        !!imageFile && imageFile.name
                                                                                            ? imageFile.name
                                                                                            : "uza"
                                                                                }
                                                                                src={

                                                                                    !!vehicle?.value
                                                                                        ? vehicle?.value : !!imageFile ? imageFile.preview : avatar4
                                                                                }
                                                                            />

                                                                            <div className="edit">
                                                                                <i className="bx bx-pencil"></i>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }}
                                                            </Dropzone>

                                                            {/* <FormText>{props.t("max_file_size")}</FormText> */}
                                                        </FormGroup>

                                                        </Col>)
                                                case "datePicker":

                                                    return (<Col md={6} className='mt-3'>
                                                        <Label>{vehicle?.label}</Label>
                                                        {/* <Input type="date" required value={moment(vehicle?.value).format("DD/MM/YYYY")}
                                                            onChange={handleChange(index)("date")}
                                                        /> */}
                                                        <DateRangePicker
                                                            initialSettings={{
                                                                singleDatePicker: true,
                                                                showDropdowns: true,
                                                                opens: "start",
                                                                alwaysShowCalendars: true,
                                                                applyButtonClasses: "btn-primary",
                                                                autoApply: true,
                                                                startDate: !!vehicle?.value
                                                                    ? moment(vehicle?.value, "DD-MMM-YYYY")
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
                                                                    !!vehicle?.value
                                                                        ? moment(
                                                                            vehicle?.value,
                                                                            "DD-MMM-YYYY"
                                                                        ).format("DD MMM YYYY")
                                                                        : moment().format("DD MMM YYYY")
                                                                }
                                                            />
                                                        </DateRangePicker>
                                                    </Col>)
                                                default:
                                                    return

                                            }

                                        })}

                                    </Row>
                                    <FormButton
                                        needSubmit={id ? accesses.canEdit : accesses.canAdd}
                                        submitDisabled={isUploading || loading}
                                        goBack={() => history.goBack()}
                                    />
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div >
        </React.Fragment >
    )
}

export const mapStateToProps = ({ FD_Drivers, Login }) => ({
    vehicleInfo: FD_Drivers?.driverVehicleInfo,
    loading: FD_Drivers?.driverVehicleInfo.loading,
    accessLevels: Login?.user?.accessLevel?.permissions || [],

})

export const mapDispatchToProps = (dispatch) => ({
    oneditDriverVehicleInfo: (data) => dispatch(editDriverVehicleInfo(data)),
    onupdateDriverVehicleInfo: (data, history) => dispatch(updateDriverVehicleInfo(data, history)),
    onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),

})

export default connect(mapStateToProps, mapDispatchToProps)(AddEditVehicle)