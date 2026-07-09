import React from 'react'
import { Button, Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from 'reactstrap'
import Select from "react-select"
const HourlyTrip = (props) => {
    const { setFields, addHourlyType, removeHourlyType, fields, handleChange } = props

    const handleGapHours = (e) => {
        e.preventDefault()
        setFields((prev) => ({
            ...prev,
            bookingGapHours: Number(e.target.value)
        }))
    }

    let duration = [
        {
            hours: 5,
            unit: "km",
            distance: 2
        },
        {
            hours: 5,
            unit: "km",
            distance: 2
        }
    ]



    return (
        <>
            <Row>
                <Col lg={4}>
                    <div className="label-content">
                        <h4>{props.t("hourly_trip")}</h4>

                        <p>
                            {/* <small>
                                {props.t("gap_hours_description")}
                            </small> */}

                        </p>
                    </div>

                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label className="text-capitalize">
                            {props.t("status")}
                        </Label>

                        <div className="status-switch square-switch">
                            <input
                                type="checkbox"
                                id="hourlyTrip-status"
                                switch="none"
                                checked={fields?.status}
                                onChange={() => {
                                    handleChange &&
                                        handleChange("status")({
                                            target: {
                                                value: !fields?.status,
                                            },
                                        })
                                }}
                            />
                            <label
                                htmlFor="hourlyTrip-status"
                                data-on-label={props.t("on")}
                                data-off-label={props.t("off")}
                            />
                        </div>
                    </FormGroup>
                </Col>

                {fields?.status && fields?.duration?.map((d, index) => (
                    <>
                        <Col lg={4} ></Col>
                        <Col lg={2} className='mb-3' >
                            <FormGroup>
                                <Label>
                                    {props.t("hour")}
                                </Label>
                                <InputGroup>
                                    <Input type="number"
                                        value={d.hours}
                                        onChange={(e) => handleChange("duration", "hours", index)(e)}
                                        min={0}
                                    />

                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col lg={2} className='mb-3' >
                            <FormGroup>
                                <Label>
                                    {props.t("unit")}
                                </Label>
                                <Select
                                    options={[{ label: "Km", value: "km" }, { label: "Miles", value: "miles" }]}
                                    value={{ label: d?.unit, value: d?.unit }}
                                    onChange={(data) => handleChange("duration", "unit", index)(data)}
                                />

                            </FormGroup>
                        </Col>
                        <Col lg={2} className='mb-3' >
                            <FormGroup>
                                <Label>
                                    {props.t("distance")}
                                </Label>
                                <InputGroup>
                                    <Input type="number"
                                        value={d.distance}
                                        onChange={(e) => handleChange("duration", "distance", index)(e)}
                                        min={0}
                                    />

                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col lg={2} className='mb-3'>
                            <Button onClick={() => {
                                fields?.duration?.length > 1 && removeHourlyType(index)
                            }} className='mt-4'>
                                Delete
                            </Button>
                        </Col>
                    </>
                ))}
                {fields?.status &&
                    <>
                        < Col lg={4}></Col>
                        <Col lg={2}>
                            <Button onClick={addHourlyType} className='mt-2'>Add</Button>
                        </Col>
                    </>
                }
            </Row>
        </>
    )
}

export default HourlyTrip