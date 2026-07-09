import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Card, CardBody, Col, Row, FormGroup, Label } from "reactstrap"

import { getFdAddons } from "store/actions"

const Addons = ({
  activeStoreId,
  activeStoreType,
  categoriesLoading,
  fdAddons,
  onGetFdAddons,
  parentAddons,
  setparentAddons,
  fields,
  ...props
}) => {
  const searching = useRef(null)
  const didMountRef = useRef(null)

  const [fdAddonsList, setFdAddonsList] = useState(parentAddons)
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
      if (!["SERVICEPROVIDER"].includes(activeStoreType?.storeType)) {
        if (!filter?.vendor) return
      }

      onGetFdAddons(filter)
    } else didMountRef.current = true
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setFdAddonsList(prevState => [
      ...fdAddons.map(({ _id, name }) => ({
        label: name,
        value: _id,
      })),
    ])
  }, [JSON.stringify(fdAddons)])

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
              <Label>
                {activeStoreType?.storeType.toUpperCase() === "CARRENTAL" ? props.t("feature") : props.t("addon")}</Label>

              <Select
                value={parentAddons}
                options={fdAddonsList}
                classNamePrefix="parent-selection"
                isLoading={categoriesLoading}
                isMulti={true}
                onChange={setparentAddons}
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
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

Addons.propTypes = {
  categoriesLoading: PropTypes.bool,
  fdAddons: PropTypes.array,
  onGetFdAddons: PropTypes.func,
}

const mapStateToProps = ({ FD_Addons }) => ({
  categoriesLoading: FD_Addons.loading,
  fdAddons: FD_Addons.fdAddons,
})

const mapDispatchToProps = dispatch => ({
  onGetFdAddons: data => dispatch(getFdAddons(data)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Addons))
