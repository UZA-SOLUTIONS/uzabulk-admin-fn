import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Select from "react-select"

import { Row, Col, Form, FormGroup } from "reactstrap"

import { getFdbusinesstypes } from "store/actions"

const BusinessType = props => {
  const {
    onGetFdBusinessType,
    loading,
    fdCuisines,
    activeStoreId,
    cuisines,
    handleChange,
    storeType,
  } = props

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
    onGetFdBusinessType(storeType, filter)
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

  let isDeweStore = props?.pageHeader == "Store"

  return (
    <Row>
      <Col lg={4}>
        <h4>{props.t("businessType")}</h4>
        <p>
          <small>{props.t("businessType_guide")}</small>
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

BusinessType.propTypes = {
  fdCuisines: PropTypes.array,
  loading: PropTypes.bool,
  onGetFdBusinessType: PropTypes.func,
}

const mapStateToProps = ({ FD_Businesstypes }) => ({
  loading: FD_Businesstypes.loading,
  fdCuisines: FD_Businesstypes.fdBusinessTypes,
})

const mapDispatchToProps = dispatch => ({
  onGetFdBusinessType: (storeType, data) =>
    dispatch(getFdbusinesstypes(storeType, data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BusinessType)
)
