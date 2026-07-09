import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { getStoreSettings } from "store/actions"

const FdVehicles = ({
  activeStoreId,
  activeStoreType,
  categoriesLoading,
  settings,
  onGetStoreSettings,
  parentFdVehicle,
  setparentFdVehicle,
  ...props
}) => {
  const searching = useRef(null)
  const didMountRef = useRef(null)

  const [fdVehiclesList, setFdVehiclesList] = useState([])

  useEffect(() => {
    if (!activeStoreType) return
    onGetStoreSettings(activeStoreType?.toLowerCase(), activeStoreId)
  }, [activeStoreId])

  useEffect(() => {
    if (settings?.vehicleType) {
      setFdVehiclesList(prevState => [
        ...settings.vehicleType?.filter((v) => v.name !=="Car pool").map(({ _id, name }) => ({
          label: name,
          value: _id,
        })),
      ])
    }
  }, [JSON.stringify(settings)])

  console.log(settings.vehicleType, "settings.vehicleType")

  return (
    <Select
      value={parentFdVehicle}
      options={fdVehiclesList}
      classNamePrefix="parent-selection"
      isLoading={categoriesLoading}
      onChange={setparentFdVehicle}
      isMulti={props.isMulti}
      onInputChange={text => {
        return
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
  )
}

FdVehicles.propTypes = {
  categoriesLoading: PropTypes.bool,
  settings: PropTypes.array,
  onGetStoreSettings: PropTypes.func,
}

const mapStateToProps = ({ FD_Settings }) => ({
  categoriesLoading: FD_Settings.loading,
  settings: FD_Settings.settings,
})

const mapDispatchToProps = dispatch => ({
  onGetStoreSettings: (storeType, data) =>
    dispatch(getStoreSettings(storeType, data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FdVehicles)
)
