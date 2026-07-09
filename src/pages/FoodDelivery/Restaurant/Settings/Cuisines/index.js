import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Select from "react-select"

import { Row, Col, Form, FormGroup } from "reactstrap"

import { getFdCuisines } from "store/actions"

const Cuisines = props => {
  const {
    onGetFdCuisines,
    loading,
    fdCuisines,
    activeStoreId,
    cuisines,
    handleChange,
    storeType,
  } = props

  // console.log(storeType, "checkCusins")
  const [filter, setFilter] = useState({
    storeTypeId: "",
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 50,
    search: "",
    fields: [
      {
        fieldName: "",
        fieldValue: "",
      },
    ],
  })
  const [fdCuisinesList, setFdCuisinesList] = useState([])

  useEffect(() => {
    if (!storeType) return
    onGetFdCuisines(storeType, filter)
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setFilter(prevState => ({
      ...prevState,
      storeTypeId: activeStoreId,
    }))
  }, [activeStoreId])

  useEffect(() => {
    setFdCuisinesList(
      fdCuisines?.map(item => ({ label: item.name, value: item._id }))
    )
  }, [fdCuisines])

  function handleCuisineChange(data) {
    handleChange({ target: { value: data } })
  }
  console.log(props?.pageHeader, "pageHeaderpageHeader")

  let isDeweStore = props?.pageHeader == "vendor"

  return (
    <Row>
      <Col lg={4}>
        <h4>
          {isDeweStore
            ? props.t("categories")
            : storeType === "serviceprovider"
            ? props.t("Services")
            : props.t("cuisines")}
        </h4>
        <p>
          <small>
            {isDeweStore
              ? props.t("dewecuisines_guide")
              : storeType === "serviceprovider"
              ? props.t("Choose the Services that you offer  ")
              : props.t("cuisines_guide")}
          </small>
        </p>
      </Col>

      <Col lg={8}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Select
                classNamePrefix="select-cuisines"
                value={cuisines}
                options={fdCuisinesList}
                isLoading={loading}
                isMulti={true}
                onChange={handleCuisineChange}
              />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Cuisines.propTypes = {
  fdCuisines: PropTypes.array,
  loading: PropTypes.bool,
  onGetFdCuisines: PropTypes.func,
}

const mapStateToProps = ({ FD_Cuisines }) => ({
  loading: FD_Cuisines.loading,
  fdCuisines: FD_Cuisines.fdCuisines,
})

const mapDispatchToProps = dispatch => ({
  onGetFdCuisines: (storeType, data) =>
    dispatch(getFdCuisines(storeType, data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Cuisines)
)
