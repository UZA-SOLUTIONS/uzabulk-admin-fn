import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Select from "react-select"

import { Row, Col, Form, FormGroup } from "reactstrap"

import { getGeoFencings } from "store/actions"

const GeoFencings = props => {
  const {
    onGetGeoFencings,
    loading,
    geoFencings,
    geoFence,
    handleChange,
    setFields
  } = props
  const searching = useRef(null)

  const [filter, setFilter] = useState({
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 50,
    search: "",
    fields: [{ fieldName: "moduleType", fieldValue: "taxi" }],
    isVehicle: false
  })
  const [geoFencingsList, setGeoFencingsList] = useState([])

  useEffect(() => {
    onGetGeoFencings(filter)
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setGeoFencingsList(
      geoFencings?.map(item => ({ label: item.label, value: item._id }))
    )
  }, [geoFencings])

  function handleGeoFenceChange(data) {
    // let geovalues = data?.map((geo) => geo?.value)
    // console.log(geovalues, "geovaluesgeovalues");
    // setFields((pre) => ({
    //   ...pre,
    //   geoFence: geovalues
    // }))
    handleChange({ target: { value: data } })
  }

  return (
    <Row>
      <Col lg={4}>
        <h4>{props.t("geo_fencing")}</h4>
      </Col>

      <Col lg={8}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Select
                options={geoFencingsList}
                classNamePrefix="parent-selection"
                value={geoFence}
                isLoading={loading}
                isMulti={true}
                onChange={handleGeoFenceChange}
              />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}


const mapStateToProps = ({ geofencing }) => ({
  loading: geofencing.loading,
  geoFencings: geofencing.geoFencings,
})

const mapDispatchToProps = dispatch => ({
  onGetGeoFencings: (data, callback) =>
    dispatch(getGeoFencings(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GeoFencings)
)
