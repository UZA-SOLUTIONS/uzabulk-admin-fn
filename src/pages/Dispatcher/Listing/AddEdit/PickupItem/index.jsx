import React from "react"
import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap"

const PickupItem = props => {
  const {
    setFields,
    fields,
    buttoncolor,
    removePickUpItem,
    id,
    handlePickupItemDetails,
  } = props

  return (
    <Row className="mb-2 border border-light rounded py-3">
      <Col md={6}>
        <FormGroup>
          <Label>{props.t("item")}<span className="text-danger ml-1">*</span></Label>

          <Input
            type="text"
            // value={parent.quantity}
            onChange={handlePickupItemDetails("itemName")(id)}
            min={1}
            required
          />
        </FormGroup>
      </Col>

      <Col md={6}>
        <FormGroup>
          <Label>{props.t("quantity")}<span className="text-danger ml-1">*</span></Label>

          <Input
            type="number"
            // value={parent.quantity}
            onChange={handlePickupItemDetails("quantity")(id)}
            min={1}
            required
          />
        </FormGroup>
      </Col>

      <Col md={6} className="mt-4">
        <div className="form-group mb-0">
          <Button onClick={removePickUpItem} color={buttoncolor}>
            {props.t("remove")}
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default PickupItem
