import { SLUGS_NAME } from 'helpers/contants'
import React, { useEffect, useState } from 'react'
import { Col, Input, Label, Row } from 'reactstrap'

const DropUpDetails = (props) => {

    const { setFields, fields,slug } = props


    const handleDropAddressChange = (data) => (e) => {
        setFields((prevstate) => ({
            ...prevstate,
            dropOff: { ...prevstate.dropOff, [data]: e.target.value }
        }))
    }


    return (
        <React.Fragment>
            <Row>
                <Col md={6}>
                    <Label>{props.t("receiver_name")}<span className="text-danger ml-1">*</span></Label>
                    <Input
                        type="text"
                        className="form-control"
                        id="formrow-name-Input"
                        value={fields?.dropOff?.name || ""}
                        onChange={handleDropAddressChange("name")}
                        required
                    />
                </Col>
                <Col md={6}>
                    <Label>{props.t("phone_number")}<span className="text-danger ml-1">*</span></Label>
                    <Input
                        type="text"
                        className="form-control"
                        id="formrow-mobile-number-Input"
                        value={fields?.dropOff?.mobileNumber || ""}
                        onChange={handleDropAddressChange("mobileNumber")}
                        required
                    />
                </Col>
                {SLUGS_NAME.confiLogistics!== slug &&
                <Col md={6}>
                    <Label>{props.t("house_number")}<span className="text-danger ml-1">*</span></Label>
                    <Input
                        type="text"
                        className="form-control"
                        id="formrow-floor-number-Input"
                        value={fields?.dropOff?.floorNo || ""}
                        onChange={handleDropAddressChange("floorNo")}
                        required
                    />
                </Col>}
                <Col md={6}>
                    <Label>{props.t("landmark")}{SLUGS_NAME.confiLogistics!== slug && <span className="text-danger ml-1">*</span>}</Label>
                    <Input
                        type="text"
                        className="form-control"
                        id="formrow-landmark-Input"
                        value={fields?.dropOff?.landmark || ""}
                        onChange={handleDropAddressChange("landmark")}
                        required={SLUGS_NAME.confiLogistics!== slug}
                    />
                </Col>
            </Row>

        </React.Fragment>
    )
}

export default DropUpDetails
