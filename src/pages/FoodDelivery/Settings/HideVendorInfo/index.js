import React from 'react'
import { Col, Form, FormGroup, Label, Row } from 'reactstrap'
import Instruction from './Instructions'

const HideVendorInfo = (props) => {
    const { fields, handleToogleFilter } = props
    return (
        <Row>
            <Col lg={4}>
                <Instruction t={props.t} />
            </Col>
            <Col lg={8}>
                <Form>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                {/* <Label className="text-capitalize">
                                    HideVendorInfo
                                </Label> */}
                                <div className="status-switch square-switch">
                                    <input
                                        type="checkbox"
                                        id="hide-vendor-info"
                                        switch="none"
                                        checked={fields == true}
                                        onClick={() => handleToogleFilter("hideVendorInfo")(fields === true ? false : true)}

                                    />
                                    <label htmlFor="hide-vendor-info"
                                        data-on-label={props.t("on")}
                                        data-off-label={props.t("off")}
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    )
}

export default HideVendorInfo