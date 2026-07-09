import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
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

import { getFdCuisines } from "store/actions"

const Cuisines = ({
  activeStoreId,
  activeStoreType,
  categoriesLoading,
  fdCuisines,
  onGetFdCuisines,
  parentCuisines,
  setparentCuisines,
  fields,
  ...props
}) => {
  // console.log(fields, "p");
  const searching = useRef(null)
  const didMountRef = useRef(null)

  const [fdCuisinesList, setFdCuisinesList] = useState(parentCuisines)
  const [filter, setFilter] = useState({
    storeTypeId: "",
    orderBy: "name",
    order: 1,
    page: 0,
    limit: 200,
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

      onGetFdCuisines(activeStoreType?.storeType?.toLowerCase(), filter)
    } else didMountRef.current = true
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setFdCuisinesList(prevState => [
      ...fdCuisines.map(({ _id, name }) => ({
        label: name,
        value: _id,
      })),
    ])
  }, [JSON.stringify(fdCuisines)])

  useEffect(() => {
    setFilter(prevState => ({
      ...prevState,
      storeTypeId: activeStoreId,
      vendor: fields?.vendor,
    }))
  }, [activeStoreId, fields?.vendor])

  return (
    <Card>
      <CardBody>
        <Row>
          <Col lg={12}>
            <FormGroup>
              <Label>{props.t("brand")}</Label>

              <Select
                value={parentCuisines}
                options={fdCuisinesList}
                classNamePrefix="parent-selection"
                isLoading={categoriesLoading}
                onChange={setparentCuisines}
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
              <FormText>{props.t("brand_guide")}</FormText>
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

Cuisines.propTypes = {
  categoriesLoading: PropTypes.bool,
  fdCuisines: PropTypes.array,
  onGetFdCuisines: PropTypes.func,
}

const mapStateToProps = ({ FD_Cuisines }) => ({
  categoriesLoading: FD_Cuisines.loading,
  fdCuisines: FD_Cuisines.fdCuisines,
})

const mapDispatchToProps = dispatch => ({
  onGetFdCuisines: (storeTypeId, data) =>
    dispatch(getFdCuisines(storeTypeId, data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Cuisines)
)
