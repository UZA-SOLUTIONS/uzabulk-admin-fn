import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Row, Col, Form, Card, CardBody, CardTitle } from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import Select from "react-select"
import Instructions from "./Instructions"

import { NOTIFICATION_SOUNDS, SLUGS_NAME } from "helpers/contants"
import { StoreKeys } from "../ApiKeys"

const NotificationSettings = props => {
  const { fields, handleChange, handleApiKeysChange, slug } = props
  console.log("bugga fields", fields)

  const handleNotifications = (name, rowIndex, colIndex, value) => e => {
    console.log("bebo 1", name)
    console.log("bebo 2", rowIndex)
    console.log("bebo 3", colIndex)
    console.log("bebo 4", value)

    handleChange("notifications")({
      target: {
        value: {
          ...fields.notifications,
          [name]: [
            ...fields?.notifications[name]?.slice(0, rowIndex),
            {
              ...fields?.notifications[name][rowIndex],
              values: [
                ...fields?.notifications[name][rowIndex]?.values?.slice(
                  0,
                  colIndex
                ),
                {
                  ...fields?.notifications[name][rowIndex]?.values[colIndex],
                  value,
                },
                ...fields?.notifications[name][rowIndex]?.values?.slice(
                  colIndex + 1
                ),
              ],
            },
            ...fields?.notifications[name]?.slice(rowIndex + 1),
          ],
        },
      },
    })
  }

  const handleSmsGateway = (name, rowIndex, colIndex, smsGateway) => e => {
    handleChange("notifications")({
      target: {
        value: {
          ...fields.notifications,
          [name]: [
            ...fields?.notifications[name]?.slice(0, rowIndex),
            {
              ...fields?.notifications[name][rowIndex],
              values: [
                ...fields?.notifications[name][rowIndex]?.values?.slice(
                  0,
                  colIndex
                ),
                {
                  ...fields?.notifications[name][rowIndex]?.values[colIndex],
                  smsGateway,
                },
                ...fields?.notifications[name][rowIndex]?.values?.slice(
                  colIndex + 1
                ),
              ],
            },
            ...fields?.notifications[name]?.slice(rowIndex + 1),
          ],
        },
      },
    })
  }

  const smsdataType = [
    {
      label: "Twilio",
      value: "twilio",
    },
    {
      label: "Vonage",
      value: "vonage",
    },
    {
      label: "SMS Live 247",
      value: "smsLive247",
    },
    {
      label: "SMS Bulk Nigeria",
      value: "smsBulkNigeria",
    },
  ]

  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t} />
      </Col>

      <Col lg={8}>
        {/* <h5 className="mb-3">{props.t("notification_sound")}</h5>

          <Row>
            {NOTIFICATION_SOUNDS?.map((option, key) => (
              <Col md={4} key={`notification-${key}-sound`}>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={`notification-${key}-sound`}
                    checked={fields?.notificationSound === option.value}
                    onChange={() =>
                      handleChange("notificationSound")({ target: option })
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`notification-${key}-sound`}
                  >
                    {props.t(option.label)}
                  </label>
                </div>
              </Col>
            ))}
          </Row> */}
        {console.log("DFdf ", fields.notifications)}
        {fields.notifications &&
          Object.entries(fields?.notifications)?.map(
            ([notiKey, notiVal], index) =>
              notiVal?.length > 0 && (
                <React.Fragment key={`notification-${index}-key`}>
                  {/* <hr className="my-3" /> */}

                  <h5 className="mb-3">{props.t(notiKey)}</h5>
                  {console.log("Poppy ", notiKey)}
                  <div className="table-rep-plugin">
                    <div
                      className="table-responsive mb-0"
                      data-pattern="priority-columns"
                    >
                      <Table
                        id="tech-companies-1"
                        className="table table-striped table-bordered"
                      >
                        <Thead>
                          <Tr>
                            <Th>{props.t("events")}</Th>
                            {notiVal[0]?.values?.map((itemCol, colKey) => (
                              <Th key={colKey} data-priority={colKey}>
                                {props.t(itemCol.key)}
                              </Th>
                            ))}
                          </Tr>
                        </Thead>

                        <Tbody>
                          {notiVal?.map((rowItem, rowIndex) => (
                            <Fragment>
                              <Tr key={`row-${rowIndex}-item`}>
                                <Th>
                                  {props.t(rowItem.type)}
                                  <br />
                                  <small className="text-muted">
                                    ({props.t(`${rowItem.type}.title`)})
                                  </small>
                                </Th>

                                {rowItem?.values?.map((itemCol, colKey) => (
                                  <Td key={`row-${colKey}-data`}>
                                    {itemCol.status === "inactive" ? (
                                      "NA"
                                    ) : (
                                      <div className="square-switch">
                                        <input
                                          type="checkbox"
                                          id={`checkbox-${colKey}-noti-${notiKey}`}
                                          switch="none"
                                          checked={itemCol.value}
                                          onChange={handleNotifications(
                                            notiKey,
                                            rowIndex,
                                            colKey,
                                            !itemCol.value
                                          )}
                                        />
                                        {console.log("Pretty ", rowItem)}
                                        <label
                                          className="m-0"
                                          htmlFor={`checkbox-${colKey}-noti-${notiKey}`}
                                          data-on-label={props.t("on")}
                                          data-off-label={props.t("off")}
                                        />
                                      </div>
                                    )}
                                  </Td>
                                ))}
                              </Tr>
                              {[SLUGS_NAME.oneTimeShop].includes(slug) &&
                                "vendorNotification" === notiKey &&
                                rowItem?.values?.some(
                                  i => i?.key === "sms" && i?.value === true
                                ) && (
                                  <Tr key={`row-${rowIndex}-item`}>
                                    <Td
                                      key={`row-sms-data`}
                                      colSpan={3}
                                      className="pb-0"
                                    >
                                      <CardTitle className="mb-4 mt-4">
                                        <Row>
                                          <Col>
                                            {props.t("select")}{" "}
                                            {props.t("Sms Gateway")}
                                          </Col>
                                        </Row>
                                      </CardTitle>

                                      <Row>
                                        <Col md="12">
                                          <Select
                                            menuPlacement="auto"
                                            options={smsdataType}
                                            value={{
                                              label:
                                                smsdataType?.find(
                                                  i =>
                                                    i?.value ===
                                                    rowItem?.values?.find(
                                                      i => i?.key === "sms"
                                                    )?.smsGateway
                                                )?.label || "select",
                                              value: rowItem?.values?.find(
                                                i => i?.key === "sms"
                                              )?.smsGateway,
                                            }}
                                            isMulti={false}
                                            required
                                            onChange={val => {
                                              console.log("select val ", val)
                                              const colKey =
                                                rowItem?.values?.findIndex(
                                                  i => i?.key === "sms"
                                                )
                                              handleSmsGateway(
                                                notiKey,
                                                rowIndex,
                                                colKey,
                                                val?.value
                                              )()
                                            }}
                                          />
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col xs={12}>
                                          {(() => {
                                            const smsKey =
                                              rowItem?.values?.find(
                                                i => i?.key === "sms"
                                              )?.smsGateway
                                            console.log("nigga ", smsKey)
                                            return (
                                              smsKey && (
                                                <StoreKeys
                                                  t={props.t}
                                                  keyType={smsKey}
                                                  keyName={smsKey}
                                                  fields={
                                                    fields?.[smsKey] || {}
                                                  }
                                                  handleApiKeysChange={
                                                    handleApiKeysChange
                                                  }
                                                  hideTitle
                                                />
                                              )
                                            )
                                          })()}
                                        </Col>
                                      </Row>
                                    </Td>
                                  </Tr>
                                )}
                            </Fragment>
                          ))}
                        </Tbody>
                      </Table>
                    </div>
                  </div>
                </React.Fragment>
              )
          )}
      </Col>
    </Row>
  )
}

NotificationSettings.propTypes = {
  fields: PropTypes.object,
  handleChange: PropTypes.func,
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NotificationSettings)
)
