import React from 'react'
import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row } from 'reactstrap'

const Guidelines = (props) => {

    const { handleGuidelines, index, removeGuideline, length, g, buttoncolor } = props
    return (
        <React.Fragment>
            <FormGroup>
                <Row>
                    <Col lg={9}>
                        <Label>Guidelines<span className="text-danger ml-1">*</span></Label>
                        <Input
                            type='textbox'
                            onChange={handleGuidelines(index)}
                            required
                            value={g?.text}
                        />
                    </Col>

                    <Col md={2} className="mt-4">
                        <div className="form-group mb-0">
                            <Button color={buttoncolor} onClick={e => {
                                e.preventDefault()
                                length > 1 && removeGuideline(index)

                            }}>
                                {props.t("remove")}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </FormGroup>
        </React.Fragment>
    )
}

export default Guidelines