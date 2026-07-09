import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

import { Row, Col, Form, FormGroup, Input, InputGroup } from "reactstrap"

const DomainSettings = props => {
  const { fields, handleChange } = props

  const handleTipChange = index => event => {
    const { value } = event.target

    handleChange("bankFields")({
      target: {
        value: [
          ...fields?.bankFields?.slice(0, index),
          { label: value, value: "" },
          ...fields?.bankFields?.slice(index + 1),
        ],
      },
    })
  }

  function addNewOption(event) {
    event.preventDefault()

    handleChange("bankFields")({
      target: { value: [...fields.bankFields, { label: "", value: "" }] },
    })
  }

  function removeOption(e, index) {
    e.preventDefault()

    handleChange("bankFields")({
      target: {
        value: [
          ...fields?.bankFields?.slice(0, index),
          ...fields?.bankFields?.slice(index + 1),
        ],
      },
    })
  }

  return (
    <Row>
      <Col lg={4}>
        <h4>{props.t("bank_account_fields")}</h4>

        <p>
          <small></small>
        </p>
      </Col>

      <Col lg={8}>
        <Row>
          <Col md={6}>
            <FormGroup className="inner-repeater">
              {/* <Label>Tip</Label> */}

              {fields?.bankFields?.map((row, index) => (
                <Row key={"bankFields-" + index} className="mb-2">
                  <Col xs={6} md={8}>
                    <InputGroup>
                      <Input
                        type="text"
                        className="inner form-control"
                        value={row?.label}
                        onChange={handleTipChange(index)}
                      />
                    </InputGroup>
                  </Col>

                  <Col xs={6} md={4} className="d-flex align-items-center">
                    {index === fields?.bankFields.length - 1 && (
                      <Link
                        to={`#`}
                        onClick={addNewOption}
                        className="text-secondary"
                      >
                        <i className="fas fa-plus mr-3" />
                      </Link>
                    )}

                    <Link
                      disabled={fields?.bankFields?.length === 1}
                      to={`#`}
                      onClick={e => {
                        e.preventDefault()

                        fields?.bankFields?.length > 1 && removeOption(e, index)
                      }}
                      className={
                        fields?.bankFields?.length === 1
                          ? "text-secondary"
                          : "text-secondary"
                      }
                    >
                      <i className="fas fa-trash-alt mr-3" />
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

DomainSettings.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DomainSettings)
)
