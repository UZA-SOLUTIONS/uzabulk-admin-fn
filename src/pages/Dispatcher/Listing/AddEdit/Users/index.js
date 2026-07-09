import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { getCustomers } from "store/actions"

const Customers = ({
  categoriesLoading,
  customers,
  onGetCustomers,
  parent,
  setparent,
}) => {
  const searching = useRef(null)
  const didMountRef = useRef(null)

  const [customersList, setCustomersList] = useState([])
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
  })

  useEffect(() => {
    onGetCustomers(filter)
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setCustomersList(prevState => [
      ...customers.map(({ _id, name }) => ({
        label: name,
        value: _id,
      })),
    ])
  }, [JSON.stringify(customers)])

  return (
    <Select
      value={parent}
      options={customersList}
      classNamePrefix="parent-selection"
      isLoading={categoriesLoading}
      onChange={setparent}
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

Customers.propTypes = {
  categoriesLoading: PropTypes.bool,
  customers: PropTypes.array,
  onGetCustomers: PropTypes.func,
}

const mapStateToProps = ({ customers }) => ({
  categoriesLoading: customers.loading,
  customers: customers.customers,
})

const mapDispatchToProps = dispatch => ({
  onGetCustomers: data => dispatch(getCustomers(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Customers)
)
