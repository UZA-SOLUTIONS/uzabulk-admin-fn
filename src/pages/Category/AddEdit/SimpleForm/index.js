import React from "react"
import PropTypes from "prop-types"

import { Col, Row, FormGroup, Label, Input } from "reactstrap"

const SimpleForm = ({ fields, handleChange, ...props }) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="formrow-catname-Input">{props.t("name")}<span className="text-danger ml-1">*</span></Label>
            <Input
              type="text"
              className="form-control"
              id="formrow-catname-Input"
              value={fields.catName || ""}
              onChange={handleChange("catName")}
              required
            />
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label>{props.t("status")}</Label>

            <div className="switch-xl square-switch">
              <input
                type="checkbox"
                id="square-switch1"
                switch="none"
                checked={fields.status == "active"}
                onChange={() => {
                  const value =
                    fields.status == "active" ? "inactive" : "active"

                  handleChange("status")({ target: { value } })
                }}
              />
              <label
                htmlFor="square-switch1"
                data-on-label={props.t("active")}
                data-off-label={props.t("inactive")}
              />
            </div>
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  )
}

SimpleForm.propTypes = {
  handleChange: PropTypes.func,
  fields: PropTypes.object,
}

export default SimpleForm
