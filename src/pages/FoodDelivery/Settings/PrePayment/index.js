import React from 'react'
import { Col, FormGroup, Label, Row } from 'reactstrap'

const PrePayment = (props) => {

    const { handleChange, fields, handlePrePayment } = props

    console.log(fields, "fieldsfieldsfieldsfields");
    return (
        <Row>
            <Col lg={4}>
                <h4>{props.t("pre_booking")}</h4>
            </Col>
            <Col md={8}>
                <FormGroup>
                    {/* <Label className="text-capitalize">{props.t("pre_booking")}</Label> */}
                    <div className="status-switch square-switch">
                        <input
                            className="switcher"
                            type="checkbox"
                            id="unit-switch"
                            switch="none"
                            checked={fields?.isPrePayment}
                            onChange={() => handlePrePayment(!fields?.isPrePayment)}
                        />
                        <label
                            htmlFor="unit-switch"
                            data-on-label={props.t("Yes")}
                            data-off-label={props.t("No")}
                        />
                    </div>

                </FormGroup>
            </Col>
        </Row>
    )
}

export default PrePayment