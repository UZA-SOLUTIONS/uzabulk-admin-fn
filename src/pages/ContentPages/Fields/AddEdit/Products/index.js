import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Select, { components } from "react-select"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import {
  Card,
  CardBody,
  Col,
  Row,
  FormGroup,
  Label,
  FormText,
} from "reactstrap"

import { getFdProducts } from "store/actions"

const Products = ({
  activeStoreId,
  activeStoreType,
  productsLoading,
  fdProducts,
  onGetFdProducts,
  fields,
  parentStoreType,
  setparentStoreType,
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
    search: "",
    fields: [
      {
        fieldName: "status",
        fieldValue: "active",
      },
    ],
  })

  useEffect(() => {
    if (didMountRef.current) {
      if (!filter?.vendor) return

      onGetFdProducts(activeStoreType?.storeType?.toLowerCase(), filter)
    } else didMountRef.current = true
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setFdProductsList(
      fdProducts.map(product => ({ label: product.name, value: product._id }))
    )
  }, [JSON.stringify(fdProducts)])

  useEffect(() => {
    setFilter({ ...filter, storeTypeId: activeStoreId, vendor: fields?.vendor })
  }, [activeStoreId, fields?.vendor])

  return (
    <Select
      value={parentStoreType}
      onChange={setparentStoreType}
      options={fdProductsList}
      classNamePrefix="parent-selection"
      isLoading={productsLoading}
      isMulti={props.isMulti}
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
  productsLoading: PropTypes.bool,
  fdProducts: PropTypes.array,
  onGetFdProducts: PropTypes.func,
}

const mapStateToProps = ({ FD_Products }) => ({
  productsLoading: FD_Products.productsLoading,
  fdProducts: FD_Products.fdProducts,
})

const mapDispatchToProps = dispatch => ({
  onGetFdProducts: (storeType, data, ownLoader = true) =>
    dispatch(getFdProducts(storeType, data, ownLoader)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Products)
)
