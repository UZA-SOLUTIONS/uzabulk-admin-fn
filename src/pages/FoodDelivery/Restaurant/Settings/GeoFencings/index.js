import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Select from "react-select"

import { Row, Col, Form, FormGroup } from "reactstrap"

import { getGeoFencings } from "store/actions"

const Cuisines = props => {
  const {
    onGetGeoFencings,
    loading,
    geoFencings,
    geoFence,
    handleChange,
  } = props
  const searching = useRef(null)

  const [filter, setFilter] = useState({
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 50,
    search: "",
    fields: [{ fieldName: "moduleType", fieldValue: "vendor" }],
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
                classNamePrefix="select-cuisines"
                value={geoFence}
                options={geoFencingsList}
                isLoading={loading}
                isMulti={true}
                onChange={handleGeoFenceChange}
                onInputChange={text => {
                  if (searching.current) {
                    clearTimeout(searching.current)
                  }

                  searching.current = setTimeout(() => {
                    setFilter(prevFilter => ({
                      ...prevFilter,
                      search: text,
                    }))

                    searching.current = null
                    clearTimeout(searching.current)
                  }, 1000)
                }}
              />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Cuisines.propTypes = {
  geoFencings: PropTypes.array,
  loading: PropTypes.bool,
  onGetGeoFencings: PropTypes.func,
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
  connect(mapStateToProps, mapDispatchToProps)(Cuisines)
)
