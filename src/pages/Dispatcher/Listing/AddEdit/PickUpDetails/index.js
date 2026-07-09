import { SLUGS_NAME } from 'helpers/contants'
import React, { useEffect, useState } from 'react'
import { Col, Input, Label, Row } from 'reactstrap'

const PickUpDetails = (props) => {

    const { setFields, fields, slug } = props


    const handlePickUpAddressChange = (data) => (e) => {
        setFields((prevstate) => ({
            ...prevstate,
            pickUp: { ...prevstate.pickUp, [data]: e.target.value }
        }))
    }


    return (
        <React.Fragment>
            <Row>
                <Col md={6}>
                    <Label>{props.t("sender_name")}<span className="text-danger ml-1">*</span></Label>
                    <Input
                        type="text"
                        className="form-control"
                        id="formrow-name-Input"
                        onChange={handlePickUpAddressChange("name")}
                        //   value={fields?.activeStoreType || ""}
                        // onChange={handleChange("label")}
                        required
                    />
                </Col>
                <Col md={6}>
                    <Label>{props.t("phone_number")}<span className="text-danger ml-1">*</span></Label>
                    <Input
                        type="text"
                        className="form-control"
                        id="formrow-mobile-number-Input"
                        //   value={fields?.activeStoreType || ""}
                        onChange={handlePickUpAddressChange("mobileNumber")}
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
                        //   value={fields?.activeStoreType || ""}
                        onChange={handlePickUpAddressChange("floorNo")}
                        required
                    />
                </Col>
                }
                <Col md={6}>
                    <Label>{props.t("landmark")}{SLUGS_NAME.confiLogistics!== slug && <span className="text-danger ml-1">*</span>}</Label>
                    <Input
                        type="text"
                        className="form-control"
                        id="formrow-landmark-Input"
                        //   value={fields?.activeStoreType || ""}
                        onChange={handlePickUpAddressChange("landmark")}
                        required={SLUGS_NAME.confiLogistics!== slug}
                    />
                </Col>
            </Row>

        </React.Fragment>
    )
}

export default PickUpDetails
