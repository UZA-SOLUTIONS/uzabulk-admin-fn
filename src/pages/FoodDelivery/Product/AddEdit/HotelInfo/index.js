import React from 'react'
import { Card, CardBody, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { options } from 'toastr'
import Select from "react-select"
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete'
import { connect } from 'react-redux'

const HotelInfo = (props) => {

    const { fields, setFields, handleChange } = props

    const handleBedTypeChange = (data) => {
        setFields((pre) => ({
            ...pre,
            beds: data.value
        }))
    }

    const bedoptions = [
        { value: 'single', label: 'Single Bed' },
        { value: 'double', label: 'Double Bed' },
    ]

    // const bedtype = [{value=""}]

    const handleAddressChange = (data) => {

        setFields(prev => ({
            ...prev,
            address: data?.label
        }))

        if (!data?.value?.place_id) {
            return setFields((prev) => ({
                ...prev,
                location: {
                    lat: 0,
                    lng: 0
                }
            }))
        }
        geocodeByPlaceId(data.value.place_id)
            .then(results => {
                const result = results[0]

                if (!result) return

                setFields((pre) => ({
                    ...pre,
                    location: {
                        lat: result.geometry.location.lat(),
                        lng: result.geometry.location.lng()
                    }
                }))
            }).catch(error => console.error(error))
    }

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <FormGroup>
                        <Row>
                            <Col md={6}>
                                <Label>{props.t("rooms")}</Label>
                                <Input type="number" value={fields?.rooms} onChange={handleChange("rooms")} />

                            </Col>
                            <Col md={6}>
                                <Label>{props.t("guests")}</Label>
                                <Input type="number" value={fields?.guests} onChange={handleChange("guests")} />

                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>

                            <Col md={6}>
                                <Label>{props.t("bed_type")}</Label>
                                <Select
                                    classNamePrefix="select2-selection "
                                    menuPosition="fixed"
                                    options={bedoptions}
                                    placeholder={fields?.beds}
                                    onChange={handleBedTypeChange}
                                />

                            </Col>
                            <Col md={6}>
                                <Label>{props.t("no_of_infants")}</Label>
                                <Input type="number"
                                    value={fields?.infants}
                                    onChange={handleChange("infants")} />

                            </Col>

                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Label>{props.t("address")}</Label>
                                <GooglePlacesAutocomplete
                                    // placeholder='Search'
                                    apiKey={props?.googleMapKey}
                                    selectProps={{
                                        isClearable: true,
                                        inputId: "address-select",
                                        classNamePrefix: "select2-selection",
                                        // value: addressValue,
                                        onChange: handleAddressChange,
                                        placeholder: fields?.address || "Enter Address",
                                        components: {
                                            IndicatorSeparator: false,
                                            DropdownIndicator: false,
                                        },
                                    }} />
                                {/* <Input type="text" placeholder="Enter Address" /> */}
                            </Col>

                        </Row>


                    </FormGroup>

                </CardBody>
            </Card>
        </React.Fragment>
    )
}
const mapStateToProps = ({ Settings }) => ({
    googleMapKey: process.env.NODE_ENV === "development"
    ? "AIzaSyAxlXaOet7nyJcEJQw_SXFuK2EnRMw0zbg"
    : Settings?.settings?.googleMapKey?.web,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HotelInfo)