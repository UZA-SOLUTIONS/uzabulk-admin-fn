import React from "react"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

import { Card, CardBody, CardTitle, Col, Row, Table, UncontrolledTooltip } from "reactstrap"

const DetailCard = props => {
  const { type, title, profileLink, user, demo } = props

  return (
    
    <Card className="overflow-hidden">
      <CardBody>
        {!!title && (
          <CardTitle className="mb-4">
            <Row>
              <Col>{title}</Col>

              <Col className="d-flex justify-content-end">
                {profileLink && (
                  <Link
                    to={profileLink || "#"}
                    className="waves-effect waves-light p-0"
                  >
                    {props.t("view")} <i className="mdi mdi-arrow-right ml-1" />
                  </Link>
                )}
              </Col>
            </Row>
          </CardTitle>
        )}

        <div className="table-responsive">
          <Table className="table-nowrap mb-0">
            <tbody>
              <tr>
                <th scope="row">{props.t("full_name")} :</th>
                <td className="text-wrap w-100">{user?.name}</td>
              </tr>




              {demo ?
                <>
                  <tr>
                    <th scope="row">{props.t("mobile")} :</th>
                    <td id="view-mobiletooltip" className="text-wrap w-100">
                      <a href={`tel:${user?.countryCode}${user?.mobileNumber}`}>
                        {user?.countryCode} {user?.mobileNumber}
                      </a>
                    </td>
                    <UncontrolledTooltip placement="top" target="view-mobiletooltip">
                      {props.t("demo_info")}
                    </UncontrolledTooltip>
                  </tr>
                  <tr>
                    <th scope="row">{props.t("email")} :</th>
                    <td id="view-emailtooltip" className="text-wrap w-100">{user?.email}</td>
                    <UncontrolledTooltip placement="top" target="view-emailtooltip">
                      {props.t("demo_info")}
                    </UncontrolledTooltip>
                  </tr>
                </> :
                <>
                  <tr>
                    <th scope="row">{props.t("mobile")} :</th>
                    <td className="text-wrap w-100">
                      <a href={`tel:${user?.countryCode}${user?.mobileNumber}`}>
                        {user?.countryCode} {user?.mobileNumber}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">{props.t("email")} :</th>
                    <td className="text-wrap w-100">{user?.email}</td>
                  </tr>
                </>}

              <tr>
                <th scope="row">{props.t("rating_received")} :</th>

                <td className="text-wrap w-100">
                  {!!props?.rating ? (
                    <span>
                      <i
                        style={{ color: "#fabc3c" }}
                        className="bx bxs-star"
                      ></i>{" "}
                      {props?.rating?.rating || 0}/5
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
              {!!props.rating?.review && (
                <tr>
                  <th scope="row">{props.t("review")} :</th>
                  <td className="text-wrap w-100">{props.rating?.review}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  )
}

export default withTranslation()(DetailCard)
