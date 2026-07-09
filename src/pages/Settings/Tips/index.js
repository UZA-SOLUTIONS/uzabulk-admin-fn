import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import Select, { components } from "react-select"

import { Row, Col, Form, FormGroup, Input, InputGroup, Label } from "reactstrap"
import { SLUGS_NAME } from "helpers/contants"

const Tips = props => {
  const { fields, handleChange, slug } = props
  const [tipType, setTipType] = useState()
  const handleTipChange = index => event => {
    const { value } = event.target

    handleChange("tip")({
      target: {
        value: [
          ...fields?.tip?.slice(0, index),
          value,
          ...fields?.tip?.slice(index + 1),
        ],
      },
    })
  }

  function handleTipTypeChange(data) {
    setTipType(data)
    handleChange && handleChange("tipType")({ target: { value: data.value } })
  }

  function addNewOption(event) {
    event.preventDefault()

    handleChange("tip")({ target: { value: [...fields.tip, ""] } })
  }

  function removeOption(e, index) {
    e.preventDefault()

    handleChange("tip")({
      target: {
        value: [
          ...fields?.tip?.slice(0, index),
          ...fields?.tip?.slice(index + 1),
        ],
      },
    })
  }

  useEffect(() => {
    if (fields?.tipType && fields?.tipType !== tipType?.value) {
      if (fields?.tipType === "percentage") {
        setTipType({ value: "percentage", label: "Percentage" })
      } else {
        setTipType({ value: "flat", label: "Flat" })
      }
    }
  }, [JSON.stringify(fields)])

  return (
    <Row>
      <Col lg={4}>
        <h4>{props.t("tips")}</h4>

        <p>
          <small>
            {props.t("tips_int", {
              delivery_boy: props.t(
                slug === SLUGS_NAME.caterPlus
                  ? props.t("driver")
                  : slug === SLUGS_NAME.honeyWay
                  ? props.t("delivery_girl")
                  : props.t("delivery_boy")
              ),
            })}
          </small>
        </p>
      </Col>

      <Col lg={8}>
        <Row>
          <Col sm={6} lg={12} xl={6}>
            <FormGroup>
              <Label for="formrow-InputCurrency">{props.t("tip_type")}</Label>
              <Select
                placeholder=""
                options={[
                  { value: "flat", label: "Flat" },
                  { value: "percentage", label: "Percentage" },
                ]}
                classNamePrefix="select2-selection"
                value={tipType}
                onChange={handleTipTypeChange}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup className="inner-repeater">
              {/* <Label>Tip</Label> */}

              {fields?.tip?.map((row, index) => (
                <Row key={"tip-" + index} className="mb-2">
                  <Col xs={6} md={8}>
                    <InputGroup>
                      {fields?.tipType === "flat" && (
                        <div className="input-group-append">
                          <span className="input-group-text">
                            {fields?.currency.sign}
                          </span>
                        </div>
                      )}

                      <Input
                        type="number"
                        className="inner form-control"
                        value={row}
                        onChange={handleTipChange(index)}
                        min={0}
                        step={0.01}
                      />
                      {fields?.tipType === "percentage" && (
                        <div className="input-group-append">
                          <span className="input-group-text">%</span>
                        </div>
                      )}
                    </InputGroup>
                  </Col>

                  <Col xs={6} md={4} className="d-flex align-items-center">
                    {index === fields?.tip.length - 1 && (
                      <Link
                        to={`#`}
                        onClick={addNewOption}
                        className="text-secondary"
                      >
                        <i className="fas fa-plus mr-3" />
                      </Link>
                    )}

                    <Link
                      disabled={fields?.tip?.length === 1}
                      to={`#`}
                      onClick={e => {
                        e.preventDefault()

                        fields?.tip?.length > 1 && removeOption(e, index)
                      }}
                      className={
                        fields?.tip?.length === 1
                          ? "text-secondary"
                          : "text-secondary"
                      }
                    >
                      <i
                        className="fas fa-trash-alt mr-3"
                        id="removeoptiontooltip"
                      />
                    </Link>
                  </Col>
                </Row>
              ))}
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Tips.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tips))
