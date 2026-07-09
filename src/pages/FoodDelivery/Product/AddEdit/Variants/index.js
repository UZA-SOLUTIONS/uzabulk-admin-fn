import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { connect } from "react-redux"
import Select from "react-select"
import { isArray } from "lodash"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import { Col, Row, Button, Spinner, CardTitle, Input } from "reactstrap"

import { getFdAttributes } from "store/actions"

import AddTermModal from "./AddTermModal"
import flatten from "lodash/flatten"

function allPossibleCases(arr) {
  if (arr.length === 0) {
    return []
  } else if (arr.length === 1) {
    return arr[0]
  } else {
    const result = []

    const allCasesOfRest = allPossibleCases(arr.slice(1)) // recur with the rest of array

    for (let c of allCasesOfRest) {
      for (let i = 0; i < arr[0].length; i++) {
        result.push([arr[0][i], ...(isArray(c) ? c : [c])])
      }
    }

    return result
  }
}

function filterVariations(fromArr, toArr, foundValue) {
  return fromArr.filter(variation => {
    let found = foundValue

    if (variation?.attributes) {
      const _att = variation?.attributes
        ?.map(item => JSON.stringify(item))
        .join(",")

      for (let i = 0; i < toArr?.length; i++) {
        const _att2 = toArr[i]?.attributes
          ?.map(item => JSON.stringify(item))
          .join(",")

        if (_att === _att2) {
          found = !foundValue
          break
        }
      }
    }

    return found
  })
}

const Variants = props => {
  const {
    fields,
    fdAttributes,
    onGetFdAttributes,
    loading,
    activeAttributes,
    setAttributes,
    variations,
    setvariations,
  } = props
  console.log(setAttributes, "nibba2")
  const didMountRef = useRef(null)
  const didMountAttributeRef = useRef(null)
  const timeouts = useRef(null)

  const [filter, setFilter] = useState({
    storeTypeId: "",
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 50,
    search: "",
    fieldName: "",
    fieldValue: "",
  })

  const [attributeChange, setattributeChange] = useState(0)
  const [chooseAttributes, setChooseAttributes] = useState([])
  console.log(chooseAttributes, "nibbi")
  const [addTerm, setaddTerm] = useState({ isOpen: false, attributeId: null })

  useEffect(() => {
    if (didMountAttributeRef.current) {
      if (timeouts.current) {
        clearTimeout(timeouts.current)
        timeouts.current = null
      }

      timeouts.current = setTimeout(() => {
        let d = activeAttributes
          ?.filter(item => {
            console.log("murgimaster ", item)
            return item?.option?.length > 0 && !item?.attribute?.noPriceRequired
          })
          ?.map(item =>
            item.option?.map(i => ({ _id: i.value, name: i.label }))
          )

        let r = allPossibleCases(d)

        let stock_quantity = ""

        if (fields?.manage_stock) {
          stock_quantity = fields?.stock_quantity
        }

        const newVariations = r?.map(attributes => ({
          price: "",
          // compare_price: 0,
          sku: "",
          stock_quantity,
          attributes: isArray(attributes) ? attributes : [attributes],
        }))

        setvariations(prevState => {
          const getPrev = filterVariations(prevState, newVariations, false)

          const getNext = filterVariations(newVariations, prevState, true)

          return [...getPrev, ...getNext]
        })
      }, 500)
    } else didMountAttributeRef.current = true

    return () => {
      if (timeouts.current) {
        clearTimeout(timeouts.current)
        timeouts.current = null
      }
    }
  }, [attributeChange])

  useEffect(() => {
    if (didMountRef.current) {
      if (filter.vendor) {
        onGetFdAttributes(filter)
      }
    } else didMountRef.current = true
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setFilter(prevState => ({
      ...prevState,
      storeTypeId: fields?.storeTypeId,
      vendor: fields?.vendor,
    }))
  }, [fields?.storeTypeId, fields?.vendor])

  useEffect(() => {
    console.log("murgimaster bakra", fdAttributes)
    if (chooseAttributes?.length <= 0) {
      if (activeAttributes?.length <= 0) {
        setChooseAttributes(fdAttributes)

        setAttributes(prevState => [
          {
            attribute: null,
            option: null,
          },
        ])

        setattributeChange(Math.random())
      } else {
        setChooseAttributes(
          fdAttributes?.filter(item => {
            let notFound = true

            for (let i = 0; i < activeAttributes?.length; i++) {
              if (activeAttributes[i].attribute?.value === item._id) {
                notFound = false
                break
              }
            }

            return notFound
          })
        )
      }
    } else {
      return
      setChooseAttributes(prevState => [
        ...prevState,
        ...fdAttributes?.filter(item => {
          let notFound = true

          for (let i = 0; i < prevState?.length; i++) {
            if (item._id === prevState[i]?._id) {
              notFound = false
              break
            }
          }

          for (let i = 0; i < activeAttributes?.length; i++) {
            if (item._id === activeAttributes[i]?.value) {
              notFound = false
              break
            }
          }

          return notFound
        }),
      ])
    }
  }, [fdAttributes])

  const handleOptionChange = (index, name) => data => {
    setAttributes(prevState => {
      const _attribute = prevState[index]

      if (name === "attribute") {
        _attribute.option = null

        const currentAttribute = _attribute.attribute

        if (currentAttribute) {
          const attIndex = fdAttributes?.findIndex(
            item => item._id === currentAttribute?.value
          )

          if (attIndex !== -1) {
            setChooseAttributes(prevState => [
              ...prevState.filter(item => item?._id !== data.value),
              fdAttributes[attIndex],
            ])
          }
        } else {
          setChooseAttributes(
            chooseAttributes.filter(item => item?._id !== data.value)
          )
        }
      }

      _attribute[name] = data

      return [
        ...prevState.slice(0, index),
        _attribute,
        ...prevState.slice(index + 1),
      ]
    })

    setattributeChange(Math.random())
  }

  function addAttribute() {
    setAttributes(prevState => [
      ...prevState,
      {
        attribute: null,
        option: null,
      },
    ])

    setattributeChange(Math.random())
  }

  function removeAttribute(e, index) {
    e.preventDefault()

    if (activeAttributes?.length === 1) return

    const attIndex = fdAttributes?.findIndex(
      item => item._id === activeAttributes[index]?.attribute?.value
    )

    if (attIndex !== -1) {
      setChooseAttributes(prevState => [...prevState, fdAttributes[attIndex]])
    }

    setAttributes(prevState => [
      ...prevState.slice(0, index),
      ...prevState.slice(index + 1),
    ])

    setattributeChange(Math.random())
  }

  function removeVariation(e, index) {
    e.preventDefault()
    setvariations(prevState => {
      const values = [
        ...prevState.slice(0, index),
        ...prevState.slice(index + 1),
      ]

      //START: removing attributes if not found in variants
      const availableAttributesInVariations = [
        ...new Set(
          ...[flatten(values.map(item => item.attributes.map(itm => itm._id)))]
        ),
      ]
      const newAttributes = activeAttributes.map(item => {
        item["option"] = item["option"].filter(item =>
          availableAttributesInVariations.includes(item.value)
        )
        return item
      })
      setAttributes(newAttributes)
      //END: removing attributes if not found in variants
      return values
    })
  }

  const handleVariationChange = (index, name) => event => {
    const { value } = event.target

    setvariations(prevState => [
      ...prevState.slice(0, index),
      {
        ...prevState[index],
        [name]: value,
      },
      ...prevState.slice(index + 1),
    ])
  }

  function toggleAddTerm(attributeId) {
    setaddTerm({ isOpen: !addTerm.isOpen, attributeId })
  }

  function handleTermSubmit(data) {
    const { attributeId } = addTerm

    const _index = activeAttributes?.findIndex(
      item => item?.attribute?.value === attributeId
    )

    if (_index !== -1) {
      setAttributes(prevState => {
        const _attribute = prevState[_index]

        if (_attribute?.option) {
          const _optionIndex = _attribute?.option?.findIndex(
            item => item.value === data._id
          )

          if (_optionIndex === -1) {
            _attribute.option = [
              ..._attribute.option,
              { label: data?.name, value: data?._id },
            ]
          }
        } else {
          _attribute.option = [{ label: data?.name, value: data?._id }]
        }

        return [
          ...prevState.slice(0, _index),
          _attribute,
          ...prevState.slice(_index + 1),
        ]
      })

      setattributeChange(Math.random())
    }

    setaddTerm({ isOpen: false, attributeId: null })
  }

  return (
    <Row className="spinner-content">
      <AddTermModal
        {...addTerm}
        toggle={toggleAddTerm}
        onConfirm={handleTermSubmit}
      />

      {loading && (
        <div className="spinner">
          <Spinner color="primary" />
        </div>
      )}

      <Col lg={12}>
        {activeAttributes?.map((attribute, index) => {
          const attIndex = fdAttributes?.findIndex(
            item => item._id === attribute?.attribute?.value
          )

          let terms = []

          if (attIndex !== -1) {
            terms = fdAttributes[attIndex]?.terms
          }

          console.log(attribute?.attribute, "pigu")
          return (
            <Row key={attribute?.attribute?.label + index} className="mb-3">
              <Col xs={12} sm={3} xl={3} className="mb-2 mb-sm-0">
                <Select
                  classNamePrefix="select-variants"
                  options={chooseAttributes?.map(item => ({
                    label: item.name,
                    value: item._id,
                    noPriceRequired: item?.noPriceRequired,
                  }))}
                  value={attribute?.attribute}
                  onChange={handleOptionChange(index, "attribute")}
                />
              </Col>

              <Col xs={12} sm={7} xl={7}>
                <Select
                  classNamePrefix="select-attribute"
                  isDisabled={!attribute?.attribute}
                  isMulti={true}
                  options={terms?.map(item => ({
                    label: item.name,
                    value: item._id,
                  }))}
                  value={attribute?.option}
                  onChange={handleOptionChange(index, "option")}
                />

                <div className="mt-2 d-flex justify-content-end">
                  {attribute?.attribute && (
                    <Link
                      to={`#`}
                      onClick={e => {
                        e.preventDefault()
                        toggleAddTerm(attribute?.attribute?.value)
                      }}
                    >
                      {props.t("add_term")}
                    </Link>
                  )}
                </div>
              </Col>

              <Col xs={12} sm={2} xl={2} className="text-left text-sm-right">
                <Link
                  to={`#`}
                  className={
                    activeAttributes?.length === 1
                      ? "text-secondary"
                      : "text-danger"
                  }
                  onClick={e => removeAttribute(e, index)}
                >
                  <i
                    className="bx bx-trash font-size-22"
                    id="removeoptiontooltip"
                  />
                </Link>
              </Col>
            </Row>
          )
        })}

        {fdAttributes?.length !== activeAttributes?.length && (
          <Row className="mt-3">
            <Col xs={12} className="d-flex justify-content-end">
              <Button color="primary" onClick={addAttribute}>
                {props.t("add")}
              </Button>
            </Col>
          </Row>
        )}

        <hr className="my-3" />

        {variations?.length > 0 && <CardTitle>{props.t("preview")}</CardTitle>}

        {variations?.length > 0 && (
          <>
            <hr className="my-3" />

            <div className="table-responsive">
              <Table
                id="variations-dd"
                className="table table-striped table-bordered variations"
              >
                <Thead>
                  <Tr>
                    <Th>{props.t("name")}</Th>
                    <Th data-priority="4">
                      {props.t("price")}
                      <span className="text-danger ml-1">*</span>
                    </Th>
                    <Th data-priority="2">{props.t("sku")}</Th>
                    <Th data-priority="2">{props.t("manage_stock")}</Th>
                    <Th data-priority="4">
                      {props.t("quantity")}
                      <span className="text-danger ml-1">*</span>
                    </Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {/* 
                  {variations?.map((variation, index) => (


                    <Tr
                      key={variation?.attributes
                        ?.map(({ name }) => name)
                        ?.join("/")}
                    >
                      <Th>
                        {variation?.attributes
                          ?.map(({ name }) => name)
                          ?.join("/")}
                      </Th>
                      <Td>
                        <Input
                          className="px-1"
                          type="number"
                          required
                          value={variation?.price}
                          onChange={handleVariationChange(index, "price")}
                          step={0.01}
                          min={0}
                        />
                      </Td>
                      <Td>
                        <Input
                          className="px-1"
                          type="text"
                          value={variation?.sku}
                          onChange={handleVariationChange(index, "sku")}
                        />
                      </Td>
                      <Td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        <div
                          className="custom-control custom-checkbox custom-checkbox-primary"
                          style={{ zIndex: 0 }}
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={`option-radio-variation-${index}`}
                            checked={variation.manage_stock == true}
                            onChange={() => {
                              const value =
                                variation.manage_stock == true ? false : true

                              handleVariationChange(
                                index,
                                "manage_stock"
                              )({
                                target: { value },
                              })
                            }}
                          />

                          <label
                            className="custom-control-label"
                            htmlFor={`option-radio-variation-${index}`}
                          ></label>
                        </div>
                      </Td>
                      <Td>
                        {variation?.manage_stock ? (
                          <Input
                            type="number"
                            required
                            value={variation?.stock_quantity}
                            onChange={handleVariationChange(
                              index,
                              "stock_quantity"
                            )}
                            min={0}
                          />
                        ) : (
                          <div className="switch-md square-switch">
                            <input
                              type="checkbox"
                              id={`stock-status-switch1-variation-${index}`}
                              switch="none"
                              checked={variation.stock_status == "instock"}
                              onChange={() => {
                                const value =
                                  variation.stock_status == "instock"
                                    ? "outofstock"
                                    : "instock"

                                handleVariationChange(
                                  index,
                                  "stock_status"
                                )({
                                  target: { value },
                                })
                              }}
                            />
                            <label
                              htmlFor={`stock-status-switch1-variation-${index}`}
                              data-on-label={props.t("instock")}
                              data-off-label={props.t("outStock")}
                            />
                          </div>
                        )}
                      </Td>

                      <Td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        <Link
                          to={`#`}
                          className="text-danger"
                          onClick={e => removeVariation(e, index)}
                        >
                          <i className="bx bx-trash font-size-20 p-0" />
                        </Link>
                      </Td>
                    </Tr>
                  ))} */}

                  {variations?.map((variation, index) => {
                    console.log(variation, "nibu2")
                    return (
                      <Tr
                        key={variation?.attributes
                          ?.map(({ name }) => name)
                          ?.join("/")}
                      >
                        <Th>
                          {variation?.attributes
                            ?.map(({ name }) => name)
                            ?.join("/")}
                        </Th>
                        <Td>
                          <Input
                            className="px-1"
                            type="number"
                            required
                            value={variation?.price}
                            onChange={handleVariationChange(index, "price")}
                            step={0.01}
                            min={0}
                          />
                        </Td>
                        <Td>
                          <Input
                            className="px-1"
                            type="text"
                            value={variation?.sku}
                            onChange={handleVariationChange(index, "sku")}
                          />
                        </Td>
                        <Td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >
                          <div
                            className="custom-control custom-checkbox custom-checkbox-primary"
                            style={{ zIndex: 0 }}
                          >
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={`option-radio-variation-${index}`}
                              checked={variation.manage_stock == true}
                              onChange={() => {
                                const value =
                                  variation.manage_stock == true ? false : true

                                handleVariationChange(
                                  index,
                                  "manage_stock"
                                )({
                                  target: { value },
                                })
                              }}
                            />

                            <label
                              className="custom-control-label"
                              htmlFor={`option-radio-variation-${index}`}
                            ></label>
                          </div>
                        </Td>
                        <Td>
                          {variation?.manage_stock ? (
                            <Input
                              type="number"
                              required
                              value={variation?.stock_quantity}
                              onChange={handleVariationChange(
                                index,
                                "stock_quantity"
                              )}
                              min={0}
                            />
                          ) : (
                            <div className="switch-md square-switch">
                              <input
                                type="checkbox"
                                id={`stock-status-switch1-variation-${index}`}
                                switch="none"
                                checked={variation.stock_status == "instock"}
                                onChange={() => {
                                  const value =
                                    variation.stock_status == "instock"
                                      ? "outofstock"
                                      : "instock"

                                  handleVariationChange(
                                    index,
                                    "stock_status"
                                  )({
                                    target: { value },
                                  })
                                }}
                              />
                              <label
                                htmlFor={`stock-status-switch1-variation-${index}`}
                                data-on-label={props.t("instock")}
                                data-off-label={props.t("outStock")}
                              />
                            </div>
                          )}
                        </Td>

                        <Td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >
                          <Link
                            to={`#`}
                            className="text-danger"
                            onClick={e => removeVariation(e, index)}
                          >
                            <i className="bx bx-trash font-size-20 p-0" />
                          </Link>
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </div>
          </>
        )}
      </Col>
    </Row>
  )
}

Variants.propTypes = {
  fields: PropTypes.object,
  fdAttributes: PropTypes.array,
  onGetFdAttributes: PropTypes.func,
  loading: PropTypes.bool,
}

const mapStateToProps = ({ FD_Attributes }) => ({
  loading: FD_Attributes.loading,
  fdAttributes: FD_Attributes.fdAttributes,
})

const mapDispatchToProps = dispatch => ({
  onGetFdAttributes: data => dispatch(getFdAttributes(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Variants)
)
