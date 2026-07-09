import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Select, { components } from "react-select"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { getFdRestaurants } from "store/actions"

const CustomOptionComponent = (props, hasParent = false) => {
  const { data, ...rest } = props
  return (
    <components.Option {...rest}>
      {props?.data?.label}
      {props?.data?.email && (
        <span className="ml-2 text-muted">({props?.data?.email})</span>
      )}
    </components.Option>
  )
}

const Restaurants = ({
  activeStoreId,
  activeStoreType,
  restaurantsLoading,
  fdRestaurants,
  onGetFdRestaurants,
  fields,
  parentStoreType,
  setparentStoreType,
  ...props
}) => {
  const searching = useRef(null)
  const didMountRef = useRef(true)

  const [fdRestaurantsList, setFdRestaurantsList] = useState([])
  const [filter, setFilter] = useState({
    storeTypeId: "",
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 20,
    search: "",
    fieldName: "status",
    fieldValue: "approved",
  })

  useEffect(() => {
    if (didMountRef.current) {
      onGetFdRestaurants(activeStoreType?.storeType?.toLowerCase(), filter)
    } else didMountRef.current = true
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setFdRestaurantsList([
      {
        value: "",
        label: "None",
        email: "",
      },
      ...fdRestaurants?.map(restaurant => ({
        value: restaurant._id,
        label: restaurant.name,
        email: restaurant.email,
      })),
    ])
    setparentStoreType({
      value: "",
      label: "None",
      email: "",
    })
  }, [JSON.stringify(fdRestaurants)])

  useEffect(() => {
    setFilter({ ...filter, storeTypeId: activeStoreId })
  }, [activeStoreId])

  return (
    <Select
      value={parentStoreType}
      onChange={(e) => {
        didMountRef.current = false;
        setparentStoreType(e);
      }}
      options={fdRestaurantsList}
      classNamePrefix="parent-selection"
      isLoading={restaurantsLoading}
      components={{ Option: CustomOptionComponent }}
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
  )
}

Restaurants.propTypes = {
  restaurantsLoading: PropTypes.bool,
  fdRestaurants: PropTypes.array,
  onGetFdRestaurants: PropTypes.func,
}

const mapStateToProps = ({ FD_Restaurants }) => ({
  restaurantsLoading: FD_Restaurants.loading,
  fdRestaurants: FD_Restaurants.fdRestaurants,
})

const mapDispatchToProps = dispatch => ({
  onGetFdRestaurants: (storeType, data, ownLoader = true) =>
    dispatch(getFdRestaurants(storeType, data, ownLoader)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Restaurants)
)
