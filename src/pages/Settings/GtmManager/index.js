import React from 'react'
import { Col, FormGroup, Input, Label, Row } from 'reactstrap'

const GtmManager = (props) => {

    const { handleChange, fields } = props
    return (
        <Row>
            <Col lg={4}>
                <h4>GTM Manager</h4>
            </Col>
            <Col lg={8}>
                <Row>
                    <Col lg={12} md={12}>
                        <FormGroup>
                            <Label for="formrow-domain">{props.t("gtm_head_script")}</Label>

                            <Input
                                type="textarea"
                                id="gtm_manager_head"
                                placeholder="Enter GTN Head Script"
                                onChange={handleChange("gtmHeadScript")}
                                value={fields?.gtmHeadScript}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} md={12}>
                        <FormGroup>
                            <Label for="formrow-domain">{props.t("gtm_body_script")}</Label>

                            <Input
                                type="textarea"
                                id="gtm_manager_body"
                                placeholder="Enter GTN Body Script"
                                onChange={handleChange("gtmBodyScript")}
                                value={fields?.gtmBodyScript}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default GtmManager