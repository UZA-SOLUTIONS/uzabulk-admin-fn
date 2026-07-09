import React, { useState, useEffect } from 'react'
import { Col, Row, Label, Button, FormGroup, Input } from 'reactstrap'
import Select from "react-select"



const ByHour = ({ setFields, duration, ...props }) => {

    const [disputeItemList, setDisputeItemList] = useState([])

    const dateTimeHandler = (name) => (e) => {
        setFields(prevState => ({
            ...prevState,
            [name]: e.target.value
        }))
    }

    const disputeForItems = [
        // {label: '1 Hours(inc.20 miles)', value: '1'},
        { label: "2 Hours(inc.40 miles)", value: "2" },
        { label: "3 Hours(inc.60 miles)", value: "3" },
        { label: "4 Hours(inc.80 miles)", value: "4" },
        { label: "5 Hours(inc.100 miles)", value: "5" },
        { label: "6 Hours(inc.120 miles)", value: "6" },
    ]

    useEffect(() => {
        setDisputeItemList(duration?.map(({ hours, distance, unit }) => ({
            label: `${hours}Hours(inc.${distance} ${unit})`,
            value: hours
        })))
    }, [duration])

    const durationHandler = (data) => {
        console.log(data, "PP");
        setFields(prevState => ({
            ...prevState,
            totalHours: data.value
        }))
    }
    return (
        <React.Fragment>

            <Row className='mt-2'>
                <Col md={6}>
                    <FormGroup>
                        <Label>{props.t("duration")}</Label>
                        <Select
                            options={disputeItemList}
                            classNamePrefix="parent-selection"
                            onChange={durationHandler}

                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label >Select a Date:</Label>
                        <Input
                            // style={{ padding: "5px", borderRadius: "5px", border: "1px solid grey" }}
                            type="date"
                            onChange={dateTimeHandler("scheduledDate")}
                            name="book-date" />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="appt">Select a time:<span className="text-danger ml-1">*</span></Label>
                        <Input
                            // style={{ padding: "5px", borderRadius: "5px", border: "1px solid grey" }}
                            type="time"
                            onChange={dateTimeHandler("scheduledTime")}
                            name="appt" placeholder="hrs:mins"
                            pattern={"^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"}
                            className="inputs time" required />
                    </FormGroup>
                </Col>

            </Row>
        </React.Fragment>
    )
}

export default ByHour