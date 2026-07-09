import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { withTranslation } from "react-i18next"
import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap"
import Select from "react-select"

import {} from "store/actions"

// Components
import Products from "./Products"

const Items = props => {
  const { parent, setparent } = props
  console.log("PPPPopat ", props)

  const [product, setproduct] = useState()
  const [addons, setaddons] = useState({})

  const [selectedAttribute, setSelectedAttribute] = useState({})
  const [selectedVariant, setSelectedVariant] = useState({})

  useEffect(() => {
    if (parent.item?.addons) {
      setaddons({})
    }
  }, [parent])

  const handleAddonChange = index => data => {
    let prevAddons = []
    if (addons[index]) {
      prevAddons = parent.addons.filter(
        addon => !addons[index].map(item => item._id).includes(addon._id)
      )
    } else {
      prevAddons = parent.addons
    }

    handleChange("addons")({ target: { value: [...prevAddons, ...data] } })
    setaddons(prevState => ({ ...prevState, [index]: data }))
  }

  const handleChange = name => e => {
    setparent({ ...parent, [name]: e.target.value })
  }

  const handleAttribute = index => data => {
    console.log(data, index, "jjjjjjjjjjj")
    setSelectedAttribute(pre => ({
      ...pre,
      [index]: data._id,
    }))
  }
  const handleVariant = (index, variantId) => data => {
    console.log(data, index, "jjjjjjjjjjj")
    setSelectedVariant(pre => ({
      ...pre,
      [index]: variantId,
    }))
  }
  useEffect(() => {
    handleChange("attributes")({
      target: { value: Object.values(selectedAttribute) },
    })
  }, [selectedAttribute])

  useEffect(() => {
    handleChange("variation_id")({
      target: { value: selectedVariant[0] },
    })
  }, [selectedVariant])

  // let newatt = [...selectedAttribute]

  console.log(selectedAttribute, "selectedAttribute")

  return (
    <React.Fragment>
      <Row className="mb-2 border border-light rounded py-3">
        <Col md={6}>
          <FormGroup>
            <Label>{props.t("item")}</Label>

            <Products
              {...props}
              parent={product}
              setparent={data => {
                setproduct(data)
                handleChange("itemId")({ target: data })
              }}
            />
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label>{props.t("quantity")}<span className="text-danger ml-1">*</span></Label>

            <Input
              type="number"
              value={parent.quantity}
              onChange={handleChange("quantity")}
              min={1}
              required
            />
          </FormGroup>
        </Col>

        {product?.item?.addons?.map((addon, index) => (
          <Col key={addon._id} md={6}>
            <FormGroup>
              <Label>{props.t(addon.name)}</Label>

              <Select
                options={addon.options}
                getOptionLabel={data => data.name}
                getOptionValue={data => data._id}
                value={addons[index]}
                onChange={handleAddonChange(index)}
                isMulti
              />
            </FormGroup>
          </Col>
        ))}

        {["GROCERY"].includes(props?.activeStoreType) &&
          product?.item?.attributes?.map((attribute, index) => (
            <Col key={attribute._id} md={6}>
              <FormGroup>
                <Label>{props.t(attribute.name)}</Label>

                <Select
                  options={attribute.terms}
                  getOptionLabel={data => data.name}
                  getOptionValue={data => data._id}
                  // value={addons[index]}
                  onChange={handleAttribute(index)}
                  // isMulti
                />
              </FormGroup>
            </Col>
          ))}

        {["LIQUOR"].includes(props?.activeStoreType) &&
          product?.item?.variations?.map((variant, index) => (
            <Col key={variant._id} md={6}>
              <FormGroup>
                <Label>{props.t("variant")}</Label>

                <Select
                  options={variant.attributes}
                  getOptionLabel={data => data.name}
                  getOptionValue={data => data._id}
                  // value={addons[index]}
                  onChange={handleVariant(index, variant._id)}
                  // isMulti
                />
              </FormGroup>
            </Col>
          ))}

        <Col md={6} className="mt-4">
          <div className="form-group mb-0">
            <Button onClick={props.removeItem} color={props.removeButtonColor}>
              {props.t("remove")}
            </Button>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

Items.propTypes = {}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default withTranslation()(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(Items))
)
