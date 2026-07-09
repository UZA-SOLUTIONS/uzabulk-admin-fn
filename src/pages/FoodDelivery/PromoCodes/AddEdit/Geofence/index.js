import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { getGeoFencings } from "store/actions"

//i18n
import { withTranslation } from "react-i18next"

const Settings = ({
  loading,
  geoFencings,
  onGetGeoFencings,
  parentStoreType,
  setparentStoreType,
  ...props
}) => {
  const searching = useRef(null)
  const didMountRef = useRef(null)

  const [list, setList] = useState([])
  const [filter, setFilter] = useState({
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 50,
    search: "",
    fields: [
      {
        fieldName: "status",
        fieldValue: "active",
      },
    ],
    moduleType: "promocode",
  })

  useEffect(() => {
    onGetGeoFencings(filter)
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setList(prevState => [
      ...geoFencings.map(({ _id, label }) => ({
        label: label,
        value: _id,
      })),
    ])
  }, [JSON.stringify(geoFencings)])

  return (
    <Select
      value={parentStoreType}
      options={list}
      classNamePrefix="parent-selection"
      isLoading={loading}
      onChange={setparentStoreType}
      isMulti
    />
  )
}

Settings.propTypes = {
  loading: PropTypes.bool,
  geoFencings: PropTypes.array,
  onGetGeoFencings: PropTypes.func,
}

const mapStateToProps = ({ geofencing }) => ({
  loading: geofencing.loading,
  geoFencings: geofencing.geoFencings,
})

const mapDispatchToProps = dispatch => ({
  onGetGeoFencings: data => dispatch(getGeoFencings(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Settings))
)
