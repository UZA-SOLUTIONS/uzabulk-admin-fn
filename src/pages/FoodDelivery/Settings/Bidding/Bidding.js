import React from 'react'
import Instructions from "./Instructions"
import { Col, Form, FormGroup, Input, InputGroup, Label, Row } from 'reactstrap'


const Bidding = (props) => {
    console.log(props, "PP");

    const { fields, handleChange } = props

    const handleBiddingInput = (name) => e => {
        handleChange("bidSettings")({
            target: { value: { ...fields, [name]: e.target.value } }
        })
    }

    const handleBiddingStatus = (val) => {
        console.log(val, "val");
        handleChange("bidSettings")({
            target: { value: { ...fields, status: val } }
        })
    }
    return (
        <Row>
            <Col lg={4}>
                <Instructions t={props.t} />
            </Col>
            <Col lg={8}>
                <Form>
                    <Row>
                        <Col sm={6} lg={6} xl={6}>
                            <FormGroup>
                                <Label className="text-capitalize">{props.t("status")}</Label>
                                <div className="status-switch square-switch">
                                    <input
                                        type="checkbox"
                                        id="bidding-status"
                                        switch="none"
                                        checked={fields?.status}
                                        onClick={() => handleBiddingStatus(fields?.status == true ? false : true)}
                                    />
                                    <label
                                        htmlFor='bidding-status'
                                        data-on-label={props.t("on")}
                                        data-off-label={props.t("off")}
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                        {fields?.status &&
                            <Col sm={6} lg={6} xl={6}>
                                <FormGroup>
                                    <Label className="text-capitalize">{props.t("bidding_amount")}</Label>
                                    <InputGroup>
                                        <Input
                                            type="input"
                                            id="bidding-amount"
                                            step={0.01}
                                            min={0}
                                            value={fields?.percentage}
                                            onChange={handleBiddingInput("percentage")}
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text">%</span>
                                        </div>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        }
                        {fields?.status &&
                            <Col sm={6} lg={6} xl={6}>
                                <FormGroup>
                                    <Label className="text-capitalize">{props.t("flat_bidding_amount")}</Label>
                                    <InputGroup>
                                        <Input
                                            type="input"
                                            step={0.01}
                                            min={0}
                                            id="flat-amount"
                                            value={fields?.flatAmount}
                                            onChange={handleBiddingInput("flatAmount")}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        }
                        {fields?.status &&
                            <Col sm={6} lg={6} xl={6}>
                                <FormGroup>
                                    <Label className="text-capitalize">{props.t("bid_request_timer")}</Label>
                                    <InputGroup>
                                        <Input
                                            type="input"
                                            step={0.01}
                                            min={0}
                                            id="request-timer"
                                            value={fields?.requestTimer}
                                            onChange={handleBiddingInput("requestTimer")}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        }
                    </Row>
                </Form>

            </Col>
        </Row>
    )
}

export default Bidding