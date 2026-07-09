import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { getCustomer } from "store/actions"

const Customers = ({
  categoriesLoading,
  customer,
  onGetCustomer,
  parent,
  setparent,
  customerId
}) => {
  const searching = useRef(null)
  const didMountRef = useRef(null)

  const [addressList, setAddressList] = useState([])

  useEffect(() => {
    if (!customerId) return
    onGetCustomer(customerId)
  }, [customerId])

  useEffect(() => {
    setAddressList(customer?.addresses?.map(item => ({ label: item.address, value: item._id })) || [])
  }, [JSON.stringify(customer)])

  return (
    <Select
      value={parent}
      options={addressList}
      classNamePrefix="parent-selection"
      isLoading={categoriesLoading}
      onChange={setparent}
    />
  )
}

Customers.propTypes = {
  categoriesLoading: PropTypes.bool,
  customer: PropTypes.array,
  onGetCustomer: PropTypes.func,
}

const mapStateToProps = ({ customers }) => ({
  categoriesLoading: customers.loading,
  customer: customers.customer,
})

const mapDispatchToProps = dispatch => ({
  onGetCustomer: data => dispatch(getCustomer(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Customers)
)
