import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Select, { components } from "react-select"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { getFdProducts } from "store/actions"

const Products = ({
  activeStoreId,
  activeStoreType,
  loading,
  fdProducts,
  onGetFdProducts,
  fields,
  parent,
  setparent,
  vendorId,
  ...props
}) => {
  const searching = useRef(null)
  const didMountRef = useRef(null)

  const [fdProductsList, setFdProductsList] = useState([])
  const [filter, setFilter] = useState({
    storeTypeId: "",
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 20,
    type: "all",
    search: "",
    fieldName: "status",
    fieldValue: "approved",
  })

  useEffect(() => {
    if (!filter.vendor) return
    onGetFdProducts(activeStoreType?.storeType?.toLowerCase(), filter)
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setFdProductsList(
      fdProducts?.map(item => ({
        value: item._id,
        label: item.name,
        item: item,
      }))
    )
  }, [JSON.stringify(fdProducts)])

  useEffect(() => {
    setFilter(prevState => ({ ...prevState, storeTypeId: activeStoreId }))
  }, [activeStoreId])

  useEffect(() => {
    setFilter(prevState => ({ ...prevState, vendor: vendorId }))
  }, [vendorId])

  return (
    <Select
      value={parent}
      onChange={setparent}
      options={fdProductsList}
      classNamePrefix="parent-selection"
      isLoading={loading}
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

Products.propTypes = {
  loading: PropTypes.bool,
  fdProducts: PropTypes.array,
  onGetFdProducts: PropTypes.func,
}

const mapStateToProps = ({ FD_Products }) => ({
  loading: FD_Products.loading,
  fdProducts: FD_Products.fdProducts,
})

const mapDispatchToProps = dispatch => ({
  onGetFdProducts: (storeType, data, ownLoader = true) =>
    dispatch(getFdProducts(storeType, data, ownLoader)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Products)
)
