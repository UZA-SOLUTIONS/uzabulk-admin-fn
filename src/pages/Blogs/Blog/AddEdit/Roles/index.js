import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { getRoles } from "store/actions"

const Roles = ({
  categoriesLoading,
  roles,
  onGetRoles,
  parentRole,
  setparentRole,
}) => {
  const searching = useRef(null)
  const didMountRef = useRef(null)

  const [rolesList, setRolesList] = useState([])
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
    onGetRoles(filter)
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setRolesList(prevState => [
      ...roles.map(({ _id, name }) => ({
        label: name,
        value: _id,
      })),
    ])
  }, [JSON.stringify(roles)])

  return (
    <Select
      value={parentRole}
      options={rolesList}
      classNamePrefix="parent-selection"
      isLoading={categoriesLoading}
      onChange={setparentRole}
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

Roles.propTypes = {
  categoriesLoading: PropTypes.bool,
  roles: PropTypes.array,
  onGetRoles: PropTypes.func,
}

const mapStateToProps = ({ roles }) => ({
  categoriesLoading: roles.loading,
  roles: roles.roles,
})

const mapDispatchToProps = dispatch => ({
  onGetRoles: data => dispatch(getRoles(data)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Roles))
