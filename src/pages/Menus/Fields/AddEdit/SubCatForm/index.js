import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Dropzone from "react-dropzone"
import Select, { components } from "react-select"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Col, Row, FormGroup, Label, Input, FormText } from "reactstrap"

import { getMenuFields } from "store/actions"

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
  menuFields,
  onGetMenuFields,
  handleChange,
  handleParentChange,
  parentCategory,
  fields,
  menuItem,
  ...props
}) => {
  const searching = useRef(null)
  const didMountRef = useRef(null)

  const [menusList, setMenusList] = useState([parentCategory])
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
    onGetMenuFields({ menuId: props.menuId })
  }, [props.menuId])

  useEffect(() => {
    const categories = []

    const convertCategories = (list, spaces = 0) => {
      list.map(({ _id, label, child }) => {
        categories.push({
          label: "  ".repeat(spaces) + label,
          value: _id,
        })

        /* if (child) {
          convertCategories(child, spaces + 1)
        } */
      })
    }

    convertCategories(menuFields || [])

    setMenusList(prevState => [{ label: "None", value: "" }, ...categories])
  }, [JSON.stringify(menuFields)])

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

          if (item?.child?.length > 0) {
            const nextParent = findParent(item?.child)

            if (JSON.stringify(nextParent) !== "{}") {
              return nextParent
            }
          }
        }

        return parent
      }

      const parentCat = findParent(menuFields)

      if (JSON.stringify(parentCat) !== "{}") {
        handleParentChange({
          label: parentCat.label,
          value: parentCat._id,
        })
      }
    }
  }, [JSON.stringify(fields), JSON.stringify(menuFields)])

  return (
    <React.Fragment>
      <Row>
        {!["footerLeft", "footerMiddle"].includes(menuItem?.type) && (
          <Col md={6}>
            <FormGroup>
              <Label>{props.t("parent")}</Label>

              <Select
                value={parentCategory}
                onChange={handleParentChange}
                options={menusList}
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
        )}

        <Col md={6}>
          <FormGroup>
            <Label for="formrow-label-Input">{props.t("label")}<span className="text-danger ml-1">*</span></Label>
            <Input
              type="text"
              className="form-control"
              id="formrow-label-Input"
              value={fields.label || ""}
              onChange={handleChange("label")}
              required
            />
          </FormGroup>
        </Col>

        {!fields?.islogin && !fields?.isSignUp && (
          <Col md={6}>
            <FormGroup>
              <Label for="formrow-link-Input">{props.t("link")}<span className="text-danger ml-1">*</span></Label>
              <Input
                className="form-control"
                id="formrow-link-Input"
                value={fields.link || ""}
                onChange={handleChange("link")}
                required
              />
            </FormGroup>
          </Col>
        )}

        {!fields?.islogin && !fields?.isSignUp && (
          <Col md={6}>
            <FormGroup>
              <Label>{props.t("link_type")}</Label>

              <div className="switch-xl square-switch">
                <input
                  type="checkbox"
                  id="linkType-switch"
                  switch="none"
                  className="switcher"
                  checked={fields.linkType == "internal"}
                  onChange={() => {
                    const value =
                      fields.linkType == "internal" ? "external" : "internal"

                    handleChange("linkType")({ target: { value } })
                  }}
                />
                <label
                  htmlFor="linkType-switch"
                  data-on-label={props.t("internal")}
                  data-off-label={props.t("external")}
                />
              </div>
            </FormGroup>
          </Col>
        )}

        {!fields?.islogin && !fields?.isSignUp && (
          <Col md={6}>
            <FormGroup>
              <Label>{props.t("target")}</Label>

              <div className="switch-xl square-switch">
                <input
                  type="checkbox"
                  id="target-switch"
                  className="switcher"
                  switch="none"
                  checked={fields.target == "_self"}
                  onChange={() => {
                    const value = fields.target == "_self" ? "_blank" : "_self"

                    handleChange("target")({ target: { value } })
                  }}
                />
                <label
                  htmlFor="target-switch"
                  data-on-label={props.t("_self")}
                  data-off-label={props.t("_blank")}
                />
              </div>
            </FormGroup>
          </Col>
        )}

        <Col md={6}>
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
  menuFields: PropTypes.array,
  onGetMenuFields: PropTypes.func,
}

const mapStateToProps = ({ menus }) => ({
  categoriesLoading: menus.loading,
  menuFields: menus.menuFields,
})

const mapDispatchToProps = dispatch => ({
  onGetMenuFields: data => dispatch(getMenuFields(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SimpleForm)
)
