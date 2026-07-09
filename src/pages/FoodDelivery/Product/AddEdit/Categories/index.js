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
import { isObject } from "lodash"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

const CustomOptionComponent = (props, hasParent = false) => {
  const { data, ...rest } = props
  return (
    <components.Option {...rest}>
      <div className={`pl-${data?.padding}`}>{props?.data?.label}</div>
    </components.Option>
  )
}

const Categories = ({
  activeStoreId,
  activeStoreType,
  categoriesLoading,
  fdCategories,
  onGetFdCategories,
  parentCategories,
  setparentCategories,
  fields,
  serviceName,
  ...props
}) => {
  const searching = useRef(null)
  const didMountRef = useRef(null)

  const [fdCategoriesList, setFdCategoriesList] = useState(parentCategories)
  const [filter, setFilter] = useState({
    storeTypeId: "",
    orderBy: "catName",
    order: 1,
    page: 0,
    limit: 5,
    search: "",
    fields: [
      {
        fieldName: "status",
        fieldValue: "active",
      },
    ],
  })


  const params = useParams();
  console.log("Categories params ::: ", params.vendorId)

  useEffect(() => {
    if (didMountRef.current) {
      if (!["SERVICEPROVIDER"].includes(activeStoreType?.storeType)) {
        if (!filter?.vendor) return
      }

      onGetFdCategories(activeStoreType?.storeType?.toLowerCase(), filter)
    } else didMountRef.current = true
  }, [JSON.stringify(filter)])

  useEffect(() => {
    const categories = []

    const convertCategories = (list, spaces = 0) => {
      list.map(({ _id, catName, subcategories }) => {
        categories.push({
          label: "  ".repeat(spaces) + catName,
          padding: spaces,
          value: _id,
          subcategories,
        })

        if (subcategories) {
          convertCategories(subcategories, spaces + 1)
        }
      })
    }

    convertCategories(fdCategories)

    setFdCategoriesList(categories)
  }, [JSON.stringify(fdCategories)])

  useEffect(() => {
    setFilter({ ...filter, storeTypeId: activeStoreId, vendor: params.vendorId })
  }, [activeStoreId])

  function handleCategoryChange(data) {
    let categories = []

    const manageCategories = list => {
      list?.map(item => {
        const { subcategories, ...rest } = item
        if (categories.findIndex(item => item.value === rest.value) === -1) {
          categories.push(rest)
        }

        if (
          subcategories?.filter(item => (isObject(item) ? true : false))
            ?.length > 0
        ) {
          manageCategories(
            subcategories?.map(({ _id, catName, subcategories }) => ({
              label: catName,
              value: _id,
              subcategories,
            }))
          )
        }
      })
    }

    manageCategories(data)

    setparentCategories(categories)
  }
  // console.log(activeStoreType?.storeType, "activeStoreType?.storeType");

  return (
    <Card>
      <CardBody>
        <Row>
          <Col lg={12}>
            <FormGroup>
              <Label>
                {activeStoreType?.storeType.toUpperCase() === "CARRENTAL"
                  ? props.t("brand_type")
                  : props.t("categories")}
                <span class="text-danger">*</span>
              </Label>

              <Select
                value={parentCategories}
                options={fdCategoriesList}
                // components={{ Option: CustomOptionComponent }}
                classNamePrefix="parent-selection"
                isLoading={categoriesLoading}
                isMulti={true}
                onChange={handleCategoryChange}
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
              <FormText>
                {props.t("categories_guide", { serviceName })}
              </FormText>
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
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
  onGetFdCategories: (storeType, data, ownLoader = true) => {
    console.log("Load categories list ::: ", storeType, data, ownLoader)
    dispatch(getFdCategories(storeType, data, ownLoader))
  },
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Categories)
)
