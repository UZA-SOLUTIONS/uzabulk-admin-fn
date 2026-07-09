import React from "react"
import { map } from "lodash"

import { Card, CardTitle, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

const PermissionCard = props => {
  const {
    unique,
    type,
    title,
    permissions,
    handleChange,
    handleAllChange,
  } = props

  const isAll =
    permissions?.filter(item => item.value)?.length === permissions?.length

  return (
    <Card>
      <CardBody className="pb-2">
        <CardTitle className="d-flex justify-content-between">
          {props.t(title)}

          <div className="font-weight-normal custom-control custom-checkbox custom-control-right">
            <input
              type="checkbox"
              className="custom-control-input"
              id={`radio-${type}-all-${unique}`}
              checked={isAll}
              onChange={() => handleAllChange && handleAllChange(!isAll)}
            />

            <label
              className="custom-control-label"
              htmlFor={`radio-${type}-all-${unique}`}
            ></label>
          </div>
        </CardTitle>
      </CardBody>

      <hr className="my-0" />

      <CardBody className="pb-2">
        {map(permissions, (item, index) => (
          <div className="mb-3 d-flex justify-content-between">
            {props.t(item?.label)}

            <div className="custom-control custom-checkbox custom-control-right">
              <input
                type="checkbox"
                className="custom-control-input"
                id={`radio-${type}-${index}-${unique}`}
                checked={item?.value}
                onChange={() => handleChange && handleChange(index, item)}
              />

              <label
                className="custom-control-label"
                htmlFor={`radio-${type}-${index}-${unique}`}
              ></label>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

export default withTranslation()(PermissionCard)
