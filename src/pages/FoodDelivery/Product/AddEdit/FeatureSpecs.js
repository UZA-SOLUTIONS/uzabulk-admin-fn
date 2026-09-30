import React from "react"
import { Button, Card, CardBody, CardTitle, Col, FormGroup, Input, Label, Row } from "reactstrap"

const emptySpec = () => ({ attributeNameTrans: "", valueTrans: "" })

const FeatureSpecs = ({ fields, setFields, t }) => {
  const specs = Array.isArray(fields.featureAttribute) ? fields.featureAttribute : []

  const updateSpec = (index, key) => event => {
    const next = specs.map((item, i) =>
      i === index ? { ...item, [key]: event.target.value } : item
    )
    setFields(prev => ({ ...prev, featureAttribute: next }))
  }

  const addSpec = () => {
    setFields(prev => ({
      ...prev,
      featureAttribute: [...specs, emptySpec()],
    }))
  }

  const removeSpec = index => {
    setFields(prev => ({
      ...prev,
      featureAttribute: specs.filter((_, i) => i !== index),
    }))
  }

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-3">{t("specifications") || "Specs"}</CardTitle>
        {specs.map((spec, index) => (
          <Row key={`spec-${index}`} className="align-items-end">
            <Col md={5}>
              <FormGroup>
                <Label>{t("name")}</Label>
                <Input
                  type="text"
                  value={spec.attributeNameTrans || spec.attributeName || ""}
                  onChange={updateSpec(index, "attributeNameTrans")}
                />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label>{t("value") || "Value"}</Label>
                <Input
                  type="text"
                  value={spec.valueTrans || spec.value || ""}
                  onChange={updateSpec(index, "valueTrans")}
                />
              </FormGroup>
            </Col>
            <Col md={2} className="mb-3">
              <Button type="button" color="danger" outline onClick={() => removeSpec(index)}>
                {t("delete")}
              </Button>
            </Col>
          </Row>
        ))}
        <Button type="button" color="secondary" onClick={addSpec}>
          {t("add")}
        </Button>
      </CardBody>
    </Card>
  )
}

export default FeatureSpecs
