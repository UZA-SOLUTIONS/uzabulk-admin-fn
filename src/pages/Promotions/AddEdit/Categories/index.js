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

import { getFdCategories } from "store/actions"

const Categories = ({
  activeStoreId,
  activeStoreType,
  categoriesLoading,
  fdCategories,
  onGetFdCategories,
  fields,
  parentStoreType,
  setparentStoreType,
  ...props
}) => {
  const searching = useRef(null)
  const didMountRef = useRef(null)

  const [fdCategoriesList, setFdCategoriesList] = useState([])
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

      onGetFdCategories(activeStoreType?.storeType?.toLowerCase(), filter)
    } else didMountRef.current = true
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setFdCategoriesList(
      fdCategories.map(cat => ({ label: cat.catName, value: cat._id }))
    )
  }, [JSON.stringify(fdCategories)])

  useEffect(() => {
    setFilter({ ...filter, storeTypeId: activeStoreId, vendor: fields?.vendor })
  }, [activeStoreId, fields?.vendor])

  return (
    <FormGroup>
      <Label>{props.t("categories")}</Label>

      <Select
        value={parentStoreType}
        onChange={setparentStoreType}
        options={fdCategoriesList}
        classNamePrefix="parent-selection"
        isLoading={categoriesLoading}
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
  )
}

Categories.propTypes = {
  categoriesLoading: PropTypes.bool,
  fdCategories: PropTypes.array,
  onGetFdCategories: PropTypes.func,
}

const mapStateToProps = ({ FD_Categories }) => ({
  categoriesLoading: FD_Categories.categoriesLoading,
  fdCategories: FD_Categories.fdCategories,
})

const mapDispatchToProps = dispatch => ({
  onGetFdCategories: (storeType, data, ownLoader = true) =>
    dispatch(getFdCategories(storeType, data, ownLoader)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Categories)
)
