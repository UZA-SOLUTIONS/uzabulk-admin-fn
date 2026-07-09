import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Dropzone from "react-dropzone"
import Select, { components } from "react-select"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Col, Row, FormGroup, Label, Input, FormText } from "reactstrap"

import { getFdCategories } from "store/actions"

// Images
import avatar4 from "assets/images/logo-placeholder.png"

const CustomOptionComponent = (props, hasParent = false) => {
  const { data, ...rest } = props
  return (
    <components.Option {...rest}>
      <div className={`pl-${data?.padding}`}>{props?.data?.label}</div>
    </components.Option>
  )
}

const SimpleForm = ({
  activeStoreId,
  activeStoreType,
  categoriesLoading,
  fdCategories,
  onGetFdCategories,
  handleChange,
  handleParentChange,
  handleAcceptedFiles,
  parentCategory,
  fields,
  selectedFiles,
  ...props
}) => {
  const searching = useRef(null)
  const didMountRef = useRef(null)

  const [fdCategoriesList, setFdCategoriesList] = useState([parentCategory])
  const [filter, setFilter] = useState({
    storeTypeId: "",
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 3,
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
      // if (!filter?.vendor) return
      // if (!activeStoreType?.storeType?.toLowerCase()) return

      onGetFdCategories("ecommerce", filter)
    } else didMountRef.current = true
  }, [JSON.stringify(filter)])

  useEffect(() => {
    const categories = []

    const convertCategories = (list, spaces = 0) => {
      list.map(({ _id, catName, subcategories }) => {
        categories.push({
          label: "  ".repeat(spaces) + catName,
          value: _id,
        })

        if (subcategories) {
          convertCategories(subcategories, spaces + 1)
        }
      })
    }

    convertCategories(fdCategories)

    setFdCategoriesList(prevState => [
      { label: "None", value: "" },
      ...categories,
    ])
  }, [JSON.stringify(fdCategories)])

  useEffect(() => {
    if (fields?.parent) {
      const findParent = list => {
        let parent = {}

        for (let i = 0; i < list.length; i++) {
          const item = list[i]

          if (item._id === fields.parent) {
            parent = item
            break
          }

          if (item?.subcategories?.length > 0) {
            const nextParent = findParent(item?.subcategories)

            if (JSON.stringify(nextParent) !== "{}") {
              return nextParent
            }
          }
        }

        return parent
      }

      const parentCat = findParent(fdCategories)

      if (JSON.stringify(parentCat) !== "{}") {
        handleParentChange({
          label: parentCat.catName,
          value: parentCat._id,
        })
      }
    }
  }, [JSON.stringify(fields), JSON.stringify(fdCategories)])

  useEffect(() => {
    setFilter({ ...filter, storeTypeId: activeStoreId, vendor: fields?.vendor })
  }, [activeStoreId, fields?.vendor])

  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label>{props.t("parent")}</Label>

            <Select
              value={parentCategory}
              onChange={handleParentChange}
              options={fdCategoriesList}
              // components={{ Option: CustomOptionComponent }}
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
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label for="formrow-catname-Input">{props.t("name")}<span className="text-danger ml-1">*</span></Label>
            <Input
              type="text"
              className="form-control"
              id="formrow-catname-Input"
              value={fields.catName || ""}
              onChange={handleChange("catName")}
              required
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="formrow-catdesc-Input">{props.t("description")}</Label>
            <Input
              type="textarea"
              rows="5"
              className="form-control"
              id="formrow-catdesc-Input"
              value={fields.catDesc || ""}
              onChange={handleChange("catDesc")}
            />
          </FormGroup>
        </Col>

        <Col md={6}>
          <Row>
            <Col xs={12} sm={6} md={6}>
              <FormGroup>
                <Label>{props.t("featured")}</Label>

                <div className="switch-xl square-switch">
                  <input
                    type="checkbox"
                    id="featured-switch"
                    switch="none"
                    checked={fields.isFeatured}
                    onChange={() => {
                      const value =
                        fields?.isFeatured == "true" ? "false" : "true"

                      handleChange("isFeatured")({ target: { value } })
                    }}
                  />
                  <label
                    htmlFor="featured-switch"
                    data-on-label={props.t("enable")}
                    data-off-label={props.t("disable")}
                  />
                </div>
              </FormGroup>
            </Col>

            <Col xs={12} sm={6} md={6}>
              <FormGroup>
                <Label>{props.t("status")}</Label>

                <div className="switch-xl square-switch">
                  <input
                    type="checkbox"
                    id="status-switch"
                    switch="none"
                    checked={fields.status == "active"}
                    onChange={() => {
                      const value =
                        fields.status == "active" ? "inactive" : "active"

                      handleChange("status")({ target: { value } })
                    }}
                  />
                  <label
                    htmlFor="status-switch"
                    data-on-label={props.t("active")}
                    data-off-label={props.t("inactive")}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="formrow-profile-image-Input">
              {props.t("category_image")}
            </Label>

            <Dropzone
              onDrop={acceptedFiles => {
                handleAcceptedFiles(acceptedFiles)
              }}
            >
              {({ getRootProps, getInputProps }) => {
                const imageFile = selectedFiles[0]

                return (
                  <div
                    className="dropzone-single-image avatar-xl"
                    {...getRootProps()}
                  >
                    <input
                      {...getInputProps()}
                      id="formrow-profile-image-Input"
                      multiple={false}
                    />

                    <img
                      className="rounded avatar-xl"
                      alt={
                        !!imageFile && imageFile.name ? imageFile.name : "uza"
                      }
                      src={!!imageFile ? imageFile.preview : avatar4}
                    />

                    <div className="edit">
                      <i className="bx bx-pencil"></i>
                    </div>
                  </div>
                )
              }}
            </Dropzone>

            <FormText>{props.t("max_file_size")}</FormText>
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  )
}

SimpleForm.propTypes = {
  handleChange: PropTypes.func,
  fields: PropTypes.object,
  categoriesLoading: PropTypes.bool,
  setFilter: PropTypes.func,
  parentCategory: PropTypes.object,
  handleParentChange: PropTypes.func,
  handleAcceptedFiles: PropTypes.func,
  selectedFiles: PropTypes.array,
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
  connect(mapStateToProps, mapDispatchToProps)(SimpleForm)
)
