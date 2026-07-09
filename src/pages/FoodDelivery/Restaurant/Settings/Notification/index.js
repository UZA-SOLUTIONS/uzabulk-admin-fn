import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Row, Col, Form } from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import Instructions from "./Instructions"

import { NOTIFICATION_SOUNDS } from "helpers/contants"

const NotificationSettings = props => {
  const { fields, handleChange } = props

  const handleNotifications = (rowIndex, colIndex, value) => e => {
    handleChange("notifications")({
      target: {
        value: [
          ...fields?.notifications?.slice(0, rowIndex),
          {
            ...fields?.notifications[rowIndex],
            values: [
              ...fields?.notifications[rowIndex]?.values?.slice(0, colIndex),
              {
                ...fields?.notifications[rowIndex]?.values[colIndex],
                value,
              },
              ...fields?.notifications[rowIndex]?.values?.slice(colIndex + 1),
            ],
          },
          ...fields?.notifications?.slice(rowIndex + 1),
        ],
      },
    })
  }

  return (
    <Row>
      <Col lg={4}>
        <Instructions t={props.t} />
      </Col>

      <Col lg={8}>
        <h5 className="mb-3">{props.t("notification_sound")}</h5>

        <Row>
          {NOTIFICATION_SOUNDS?.map((option, key) => (
            <Col xs={6} md={4} key={`notification-${key}-sound`}>
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
        </Row>

        {fields?.notifications?.length > 0 && (
          <>
            <hr className="my-3" />

            <h5 className="mb-3">{props.t("notifications")}</h5>

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
                      {fields?.notifications[0] &&
                        fields?.notifications[0]?.values?.map(
                          (itemCol, colKey) => (
                            <Th key={colKey} data-priority={colKey}>
                              {props.t(itemCol.key)}
                            </Th>
                          )
                        )}
                    </Tr>
                  </Thead>

                  <Tbody>
                    {fields?.notifications?.map((rowItem, rowIndex) => (
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
                                  id={`checkbox-${colKey}-noti`}
                                  switch="none"
                                  checked={itemCol.value}
                                  onChange={handleNotifications(
                                    rowIndex,
                                    colKey,
                                    !itemCol.value
                                  )}
                                />
                                <label
                                  className="m-0"
                                  htmlFor={`checkbox-${colKey}-noti`}
                                  data-on-label={props.t("on")}
                                  data-off-label={props.t("off")}
                                />
                              </div>
                            )}
                          </Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            </div>
          </>
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
