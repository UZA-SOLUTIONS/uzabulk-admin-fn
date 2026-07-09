import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"

const Breadcrumb = props => {
  const { breadcrumbItems } = props
  const itemLength = breadcrumbItems?.length || 0

  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box d-flex align-items-center justify-content-between">
          <ol className="breadcrumb m-0">
            {breadcrumbItems?.map((item, key) => (
              <BreadcrumbItem key={key} active={key + 1 === itemLength}>
                {key + 1 === itemLength ? (
                  <h4 className="mb-0 font-size-18">{item.title}</h4>
                ) : (
                  <Link to={item?.link}>{item.title}</Link>
                )}
              </BreadcrumbItem>
            ))}
          </ol>
          {/* <h4 className="mb-0 font-size-18">{props.breadcrumbItem}</h4> */}
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItems: PropTypes.array,
  title: PropTypes.string,
}

export default Breadcrumb
