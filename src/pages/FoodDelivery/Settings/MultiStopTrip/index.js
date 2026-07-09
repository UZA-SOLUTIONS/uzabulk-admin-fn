import React from "react"
import {
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap"

const MultiStopTrip = props => {
  const { setFields, fields, handleChange } = props

  const handleGapHours = e => {
    e.preventDefault()
    setFields(prev => ({
      ...prev,
      bookingGapHours: Number(e.target.value),
    }))
  }

  return (
    <>
      <Row>
        <Col lg={4}>
          <div className="label-content">
            <h4>{props.t("multi_stop_trip")}</h4>
          </div>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label className="text-capitalize">{props.t("status")}</Label>

            <div className="status-switch square-switch">
              <input
                type="checkbox"
                id="multiStop-status"
                switch="none"
                checked={fields?.status}
                onChange={() => {
                  handleChange &&
                    handleChange("status")({
                      target: {
                        value: !fields?.status,
                      },
                    })
                }}
              />
              <label
                htmlFor="multiStop-status"
                data-on-label={props.t("on")}
                data-off-label={props.t("off")}
              />
            </div>
          </FormGroup>
        </Col>

        {fields?.status && (
          <Col lg={4}>
            <FormGroup>
              <Label>{props.t("max_stop")}</Label>
              <InputGroup>
                <Input
                  type="number"
                  value={fields?.maxStops}
                  onChange={handleChange("maxStops")}
                  min={0}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        )}
        <Col lg={4}></Col>
        {fields?.status && (
          <Col lg={4}>
            <FormGroup>
              <Label>
                {props.t("waiting_time")} ({props.t("seconds")})
              </Label>
              <InputGroup>
                <Input
                  type="number"
                  value={fields?.waitingTime}
                  onChange={handleChange("waitingTime")}
                  min={0}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        )}
      </Row>
    </>
  )
}

export default MultiStopTrip
