import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  SLUGS_NAME as slugname
} from "helpers/contants"

import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap"

const TimeSlot = props => {
  const { orderPreparationTime, handleChange, slug } = props

  const handleName = function () {

    if ([slugname.zaza, slugname.topup].includes(slug) && ["FOOD"].includes(props.activeStoreType?.storeType)) {
      return <small>{props.t("fuel_time_guide")}</small>
    }

    if( [slugname.lemonee].includes(slug) && ["LIQUOR"].includes(props.activeStoreType?.storeType)){
      return <small>{props.t("fuel_time_guide")}</small>
    }

    if(["LIQUOR"].includes(props.activeStoreType?.storeType)){
      return <small>{props.t("fuel_time_guide")}</small>
    }

    return <small>{props.t("order_time_guide")}</small>
  }

  return (
    <Row>
      {/* <Col lg={4}>
        <h4>{props.t("time")}</h4>
        <p>
          {handleName()}
        </p>
      </Col> */}

      {/* <Col lg={8}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>

                {props.t("order_preparation_time")}

              </Label>

              <InputGroup>
                <Input
                  type="number"
                  value={orderPreparationTime}
                  onChange={handleChange}
                  min={0}
                />

                <InputGroupAddon addonType="append">
                  <InputGroupText>{props.t("minutes")}</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </Col> */}
    </Row>
  )
}

TimeSlot.propTypes = {
  orderPreparationTime: PropTypes.number,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({ Settings }) => ({
  slug: Settings?.settings?.slug
})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimeSlot)
)
