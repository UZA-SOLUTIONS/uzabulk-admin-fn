import React, { useState, useEffect } from 'react'
import { Col, Row, FormGroup, Label, Button, Form, Input } from 'reactstrap'
import GooglePlacesAutocomplete, {
    geocodeByPlaceId,
    geocodeByLatLng,
} from "react-google-places-autocomplete"
import Premium from 'components/VerticalLayout/SidebarContent/Admin/Premium'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { withTranslation } from "react-i18next"

const OneWay = (props) => {

    const { setFields, fields } = props

    const [addstops, setAddStops] = useState([])

    const addStopHAndler = () => {


        setFields((pre) => ({
            ...pre,
            multiStops: [
                ...pre.multiStops,
                {
                    address: "",
                    location: {
                        lat: "",
                        lng: ""

                    },
                }
            ]
        }))
    }

    const handleDeleteStop = (ind) => (e) => {
        console.log(ind, "ind");
        e.preventDefault()


        return setFields(prevState => ({
            ...prevState,
            multiStops: [
                ...prevState?.multiStops?.slice(0, ind),

                ...prevState?.multiStops?.slice(ind + 1),
            ]

        }))
    }

    const handleAddressChange = ind => data => {
        console.log(ind, data, "uuuuuuuuuuuu");

        if (!data?.value?.place_id) {
            return setFields(prevState => ({
                ...prevState,
                multiStops: [

                ]
            }))
        }

        geocodeByPlaceId(data?.value?.place_id)
            .then(results => {
                const result = results[0]

                console.log(result, "))))");
                if (!result) return


                setFields(prevState => ({
                    ...prevState,
                    multiStops: [
                        ...prevState?.multiStops?.slice(0, ind),
                        {
                            dummydata: data,
                            address: data?.label,
                            location: {
                                lat: result.geometry.location.lat(),
                                lng: result.geometry.location.lng(),

                            }
                        },
                        ...prevState?.multiStops?.slice(ind + 1),
                    ]

                }))


            })
            .catch(error => console.error(error))

    }

    const dateTimeHandler = (name) => (e) => {
        // console.log(e.target.value, "DATA");
        setFields(prevState => ({
            ...prevState,
            [name]: e.target.value
        }))

    }


    return (
        <React.Fragment>

            <Row>

                <Col lg={12} className='mb-3'>
                    <Label >
                        {props.t("Add Stops")}
                    </Label>

                    <Button
                        className='ml-5'
                        type="button"
                        color="primary" onClick={addStopHAndler}>
                        +
                    </Button>
                </Col>

                {fields.multiStops.map((stops, index) => {
                    console.log(stops, "stops");
                    return (
                        <Col lg={6} key={index}>
                            <FormGroup className="ajax-select select2-container">
                                <Label>{props.t("enter_stop_address")}</Label>
                                <Row className='ml-1'>

                                    <div style={{ width: "400px" }}>
                                        <GooglePlacesAutocomplete
                                            apiKey={props?.googleMapKey}
                                            inputStyle={{
                                                width: 200,
                                                fontSize: 28
                                            }}
                                            selectProps={{
                                                isClearable: true,
                                                inputId: "address-select",
                                                classNamePrefix: "select2-selection",
                                                className: "w-300",

                                                value: stops.dummydata,
                                                onChange: handleAddressChange(index),
                                                placeholder: stops?.address,
                                                components: {
                                                    IndicatorSeparator: false,
                                                    DropdownIndicator: false,
                                                },
                                            }}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        color="danger"
                                        className="btn-rounded waves-effect waves-light mb-2 mr-2"

                                        onClick={handleDeleteStop(index)}>


                                        <i
                                            className="fas fa-trash-alt mr-3"
                                            id={`delete-tooltip`}
                                        />
                                    </Button>

                                </Row>
                            </FormGroup>
                        </Col>

                    )
                })
                }
                {/* <Col lg={6} >

                    <input type="date" />
                </Col> */}
            </Row>
            <Row className='mt-2'>
                <Col>
                    <Label for="book-date">Select a Date:</Label>
                    <Input
                        type="date"
                        onChange={dateTimeHandler("scheduledDate")}
                        name="book-date" />
                </Col>
                <Col>
                    <Label for="appt">Select a time:<span className="text-danger ml-1">*</span></Label>
                    <Input
                        type="time"
                        onChange={dateTimeHandler("scheduledTime")}
                        name="appt" placeholder="hrs:mins"
                        pattern={"^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"}
                        className="inputs time" required />
                </Col>

            </Row>
        </React.Fragment >
    )
}

const mapStateToProps = ({ Settings }) => ({
    googleMapKey: process.env.NODE_ENV === "development"
    ? "AIzaSyAxlXaOet7nyJcEJQw_SXFuK2EnRMw0zbg"
    : Settings?.settings?.googleMapKey?.web,
  })
  
  const mapDispatchToProps = dispatch => ({
  })
  
  export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(withTranslation()(OneWay))
  )
  