import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

import { Row, Col, Form, FormGroup, Label, Input, FormText } from "reactstrap"

import { DELIVERY_MODES } from "../../../../helpers/contants"
import { SLUGS_NAME as slugname, } from "helpers/contants"
import Instructions from "./Instructions"

const TimeSlot = props => {
  const { fields, handleChange } = props

  const handleTypeChange = (value, isTrue) => {
    if (isTrue) {
      handleChange("deliveryType")({
        target: { value: fields?.deliveryType?.filter(item => item !== value) },
      })
    } else {
      handleChange("deliveryType")({
        target: { value: [...fields?.deliveryType, value] },
      })
    }
  }


  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t}
          hideRestaurant={[slugname.dewe, slugname.zaza].includes(props.settings.slug)}
        // to replace Restaurant word with store in description
        />
      </Col>

      <Col lg={8}>
        <Form>
          <Row>
            {DELIVERY_MODES?.map(({ label: mode, value }, index) => (
              <Col key={`${mode}-${index}`} md={6}>
                <div className="custom-control custom-checkbox custom-checkbox-primary">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={`${mode.toLowerCase()}-checkbox`}
                    checked={fields?.deliveryType?.includes(value)}
                    onChange={() =>
                      handleTypeChange(
                        value,
                        fields?.deliveryType?.includes(value)
                      )
                    }
                  />

                  <label
                    className="custom-control-label text-capitalize"
                    for={`${mode.toLowerCase()}-checkbox`}
                  >
                    {props.t(mode)}
                  </label>
                </div>
              </Col>
            ))}
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

TimeSlot.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ Settings }) => ({
  settings: Settings?.settings
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimeSlot)
)
