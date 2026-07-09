import React from 'react'
import { Col, Form, FormGroup, Label, Row } from 'reactstrap'
import Instructions from './Instructions'

const VeganFilterActive = (props) => {

    const { fields, handleToogleFilter } = props

    return (
        <Row>
            <Col lg={4}>
                <Instructions t={props.t} />
            </Col>
            <Col lg={8}>
                <Form>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                {/* <Label>
                                    VeganFilterActive
                                </Label> */}
                                <div className="status-switch square-switch">
                                    <input
                                        type="checkbox"
                                        switch="none"
                                        id="vegan-filter"
                                        checked={fields == true}
                                        onClick={() => handleToogleFilter("isVeganFilterActive")(fields === true ? false : true)}
                                    />
                                    <label
                                        htmlFor='vegan-filter'
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

export default VeganFilterActive