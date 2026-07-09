import { popWithPosition, pushWithPosition } from "helpers/commonHelpers"
import React, { useEffect, useState } from "react"
import { Button, FormGroup, InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Input, InputGroupAddon, InputGroupText, Label } from "reactstrap";

function TieredPricing({ pricingList, store, t, setFields, setIsValidPricing }) {
  const initPrice = {
    startQuantity: "",
    price: "",
  }

  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    validatePricingList()
  }, [pricingList])

  const handleListChange = (listName, fieldName, index, value) => {
    setFields(prevState => {
      const updatedList = [...prevState[listName]]
      updatedList[index] = {
        ...updatedList[index],
        [fieldName]: value,
      }
      return {
        ...prevState,
        [listName]: updatedList,
      }
    })
  }

  const validatePricingList = () => {
    const errors = {}

    pricingList.forEach((pricing, index) => {
      if (pricing.startQuantity === "" || pricing.price === "") {
        errors[index] = t("Both start quantity and price are required.")
      } else if (pricing.startQuantity < 1 || pricing.price < 0) {
        errors[index] = t("Start quantity must be at least 1 and price must be positive.")
      } else if (index > 0 && pricingList[index - 1].startQuantity >= pricing.startQuantity) {
        errors[index] = t("Start quantity must be greater than the previous tier.")
      }
    })

    setIsValidPricing(!Object.keys(errors).length);
    setValidationErrors(errors)
  }

  const handleInputChange = (field, subfield, index, value) => {
    handleListChange(field, subfield, index, value)
  }

  return (
    <Table
      id="tire-pricing-dd"
      className="table table-striped table-bordered tire-pricing"
    >
      <Thead>
        <Tr>
          <Th>{t("quantity_from")}: <small className="">{t("quantity_from_description")}</small></Th>
          <Th>{t("price")}: <small className="">{t("price_description")}</small></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {pricingList?.map((pricing, index) => {
          const error = validationErrors[index]
          return (
            <React.Fragment key={index + "-row"}>
              <Tr>
                <Td>
                  <FormGroup>
                    <input
                      type="number"
                      className={`form-control ${error ? "is-invalid" : ""}`}
                      id={`formrow-priceTiers-from-${index}`}
                      value={pricing.startQuantity}
                      onChange={e =>
                        handleInputChange(
                          "price_tiers",
                          "startQuantity",
                          index,
                          parseInt(e.target.value)
                        )
                      }
                      min={1}
                      required
                    />
                  </FormGroup>
                </Td>
                <Td>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>{store?.currency?.sign}</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className={`form-control ${error ? "is-invalid" : ""}`}
                        type="number"
                        required
                        value={pricing?.price}
                        onChange={e =>
                          handleInputChange(
                            "price_tiers",
                            "price",
                            index,
                            e.target.value
                          )
                        }
                        step={0.01}
                        min={0}
                      />
                    </InputGroup>
                  </FormGroup>
                </Td>
                <Td>
                  <div className="d-flex flex-nowrap gap-2">
                    {index > 0 || pricingList.length > 1 ? (
                      <Link
                        to={`#`}
                        className="text-danger"
                        onClick={(e) => {
                          e?.preventDefault();
                          setFields(s => ({
                            ...s,
                            price_tiers: popWithPosition(s.price_tiers, index),
                          }))
                        }}
                      >
                        <i className="bx bx-trash font-size-20 p-0" />
                      </Link>
                    ) : (
                      ""
                    )}
                    <Link
                      to={`#`}
                      className="text-danger"
                      onClick={(e) => {
                        e?.preventDefault();
                        setFields(s => ({
                          ...s,
                          price_tiers: pushWithPosition(
                            s.price_tiers,
                            index + 1,
                            initPrice
                          ),
                        }))
                      }}
                    >
                      <i className="bx bx-plus font-size-20 p-0" />
                    </Link>
                  </div>
                </Td>
              </Tr>
              {error ? <Tr>
                <Td colSpan={3}><p className="text-danger mb-0">{error}</p></Td>
              </Tr> : null}
            </React.Fragment>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default TieredPricing
