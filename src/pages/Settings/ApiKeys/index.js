import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import classnames from "classnames"

import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardTitle,
  CardBody,
} from "reactstrap"
import Instructions from "./Instructions"

import { STORE_KEYS } from "helpers/contants"

export const StoreKeys = ({
  keyType,
  keyName,
  fields,
  handleApiKeysChange,
  hideTitle,
  ...props
}) => {
  const handleChange = name => event => {
    handleApiKeysChange(keyName, name)(event)
  }

  return (
    <Card>
      <CardBody className="px-0 pb-0">
        {!hideTitle && (
          <CardTitle className="mb-4 text-capitalize">
            {props.t(keyType)} {props.t("keys")}
          </CardTitle>
        )}

        <Row>
          {STORE_KEYS[keyType]?.map((item, key) => (
            <Col md={6} key={`store_${keyType}_${key}_`}>
              <FormGroup>
                <Label>{props.t(item.label)}</Label>
                <Input
                  type="text"
                  className="form-control"
                  value={fields[item.value] || ""}
                  onChange={handleChange(item.value)}
                />
              </FormGroup>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  )
}

const ApiKeys = props => {
  const {
    fields,
    handleChange: _handleChange,
    handleApiKeysChange,
    smsOptionsEnabled,
  } = props

  console.log(smsOptionsEnabled, "nikki2")
  const [customActiveTab, toggleCustom] = useState("4")

  const handleChange = name => event => {
    const { value } = event.target

    _handleChange("googleMapKey")({
      target: { value: { ...fields?.googleMapKey, [name]: value } },
    })
  }

  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t} tabId={customActiveTab} />
      </Col>

      <Col lg={8}>
        <Row>
          <Col xs={12}>
            <Nav tabs className="nav-tabs-custom">
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: customActiveTab === "4",
                  })}
                  onClick={() => {
                    toggleCustom("4")
                  }}
                >
                  <span className="d-none d-sm-block">
                    {props.t("googleMapKey")}
                  </span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: customActiveTab === "1",
                  })}
                  onClick={() => {
                    toggleCustom("1")
                  }}
                >
                  <span className="d-none d-sm-block">
                    {props.t("mailgun")}
                  </span>
                </NavLink>
              </NavItem>
              {smsOptionsEnabled?.twilio == true && (
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "2",
                    })}
                    onClick={() => {
                      toggleCustom("2")
                    }}
                  >
                    <span className="d-none d-sm-block">
                      {props.t("twilio")}
                    </span>
                  </NavLink>
                </NavItem>
              )}
              {smsOptionsEnabled?.smsLive247 == true && (
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "2",
                    })}
                    onClick={() => {
                      toggleCustom("2")
                    }}
                  >
                    <span className="d-none d-sm-block">
                      {props.t("Sms 24/7")}
                    </span>
                  </NavLink>
                </NavItem>
              )}
              {smsOptionsEnabled?.vonage == true && (
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "2",
                    })}
                    onClick={() => {
                      toggleCustom("2")
                    }}
                  >
                    <span className="d-none d-sm-block">
                      {props.t("Vonage")}
                    </span>
                  </NavLink>
                </NavItem>
              )}

              {smsOptionsEnabled?.smsBulkNigeria == true && (
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "2",
                    })}
                    onClick={() => {
                      toggleCustom("2")
                    }}
                  >
                    <span className="d-none d-sm-block">
                      {props.t("SMS Bulk Nigeria")}
                    </span>
                  </NavLink>
                </NavItem>
              )}

              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: customActiveTab === "3",
                  })}
                  onClick={() => {
                    toggleCustom("3")
                  }}
                >
                  <span className="d-none d-sm-block">
                    {props.t("firebase")}
                  </span>
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={customActiveTab}>
              <TabPane tabId="1">
                <StoreKeys
                  t={props.t}
                  keyType="mailgun"
                  keyName="mailgun"
                  fields={fields.mailgun || {}}
                  handleApiKeysChange={handleApiKeysChange}
                />
              </TabPane>
              {smsOptionsEnabled?.twilio == true && (
                <TabPane tabId="2">
                  <StoreKeys
                    t={props.t}
                    keyType="twilio"
                    keyName="twilio"
                    fields={fields.twilio || {}}
                    handleApiKeysChange={handleApiKeysChange}
                  />
                </TabPane>
              )}
              {smsOptionsEnabled?.smsLive247 == true && (
                <TabPane tabId="2">
                  <StoreKeys
                    t={props.t}
                    keyType="smsLive247"
                    keyName="smsLive247"
                    fields={fields.smsLive247 || {}}
                    handleApiKeysChange={handleApiKeysChange}
                  />
                </TabPane>
              )}
              {smsOptionsEnabled?.vonage == true && (
                <TabPane tabId="2">
                  <StoreKeys
                    t={props.t}
                    keyType="vonage"
                    keyName="vonage"
                    fields={fields.vonage || {}}
                    handleApiKeysChange={handleApiKeysChange}
                  />
                </TabPane>
              )}
              {smsOptionsEnabled?.smsBulkNigeria == true && (
                <TabPane tabId="2">
                  <StoreKeys
                    t={props.t}
                    keyType="smsBulkNigeria"
                    keyName="smsBulkNigeria"
                    fields={fields.smsBulkNigeria || {}}
                    handleApiKeysChange={handleApiKeysChange}
                  />
                </TabPane>
              )}

              <TabPane tabId="3">
                <StoreKeys
                  t={props.t}
                  keyType="firebase"
                  keyName="firebase"
                  fields={fields.firebase || {}}
                  handleApiKeysChange={handleApiKeysChange}
                />
              </TabPane>
              <TabPane tabId="4">
                <StoreKeys
                  t={props.t}
                  keyName="googleMapKey"
                  keyType="googleMapKey"
                  fields={fields.googleMapKey || {}}
                  handleApiKeysChange={handleApiKeysChange}
                />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

ApiKeys.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
  smsOptionsEnabled: PropTypes.object,
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApiKeys))
