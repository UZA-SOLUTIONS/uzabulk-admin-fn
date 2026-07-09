import React from 'react'
import { Col, FormGroup, Label, Row } from 'reactstrap'

const MultiDropSetting = (props) => {

    const { fields, handleChange } = props
    return (
        <Row>
            <Col lg={4}>
                <div className="label-content">
                    <h4>{props.t("multi_drop_setting")}</h4>
                </div>
            </Col>

            <Col md={8}>
                <FormGroup>
                    <Label className="text-capitalize">
                        {props.t("show_return_type")}
                    </Label>

                    <div className="status-switch square-switch">
                        <input
                            type="checkbox"
                            id="multi-drop"
                            switch="none"
                            checked={fields}
                            onChange={() => {
                                handleChange("multiDropsSettings")({
                                    target: {
                                        value: !fields
                                    }
                                })
                            }}

                        />
                        <label
                            htmlFor="multi-drop"
                            data-on-label={props.t("on")}
                            data-off-label={props.t("off")}
                        />
                    </div>
                </FormGroup>

            </Col>
        </Row>
    )
}

export default MultiDropSetting