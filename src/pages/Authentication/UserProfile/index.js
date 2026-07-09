import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap"
import moment from "moment-timezone"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

//Import mini card widgets
import MiniCards from "./mini-card"

//Import Images
import profile1 from "assets/images/profile-img.png"

// import charts
import {} from "store/actions"
import avatar4 from "assets/images/users/avatar-9.jpg"
import RemoveConfirmModal from "./RemoveConfirmModal"

const ContactsProfile = ({ loading, userProfile, customer, ...props }) => {
  // eslint-disable-next-line no-unused-vars
  const [miniCards, setMiniCards] = useState([
    {
      title: props.t("completed") + " " + props.t("orders"),
      iconClass: "bx bx-check-circle",
      text: "0",
    },
    {
      title: props.t("total_spent"),
      iconClass: "bx bx-dollar-circle",
      text: "$0",
    },
    {
      title: props.t("avg_order_value"),
      iconClass: "bx bx-line-chart",
      text: "0",
    },
  ])
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    addressId: null,
  })

  useEffect(() => {
    if (customer) {
      setMiniCards([
        {
          title: props.t("completed") + " " + props.t("orders"),
          iconClass: "bx bx-check-circle",
          text: customer.totalOrders || 0,
        },
        {
          title: props.t("total_spent"),
          iconClass: "bx bx-dollar-circle",
          text: "$" + (customer.orderSpent || 0),
        },
        {
          title: props.t("avg_order_value"),
          iconClass: "bx bx-line-chart",
          text: customer.orderAvgValue,
        },
      ])
    }
  }, [JSON.stringify(customer)])

  const toggleConfirmModal = addressId => {
    setConfirmModal(prevState => ({ isOpen: !prevState.isOpen, addressId }))
  }

  const removeConfirm = () => {
    const { addressId, isOpen } = confirmModal

    const onComplete = () => {}

    setConfirmModal({ isOpen: !isOpen, addressId: null })
  }

  return (
    <React.Fragment>
      <RemoveConfirmModal
        isOpen={confirmModal.isOpen}
        toggle={toggleConfirmModal}
        onConfirm={removeConfirm}
      />

      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Customer Profile"
            breadcrumbItem={props.t("customer") + " " + props.t("profile")}
            breadcrumbItems={[{ title: props.t("profile") }]}
          />

          <Row className="spinner-content">
            {loading && <div className="spinner"></div>}
            <Col xl="4">
              <Card className="overflow-hidden">
                <div className="bg-soft-primary">
                  <Row>
                    <Col xs="7"></Col>
                    <Col xs="5" className="align-self-end">
                      <img src={profile1} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <Row>
                    <Col sm="12" style={{ display: "flex" }}>
                      <div className="avatar-md profile-user-wid mb-4">
                        <img
                          style={{ height: "100%" }}
                          src={
                            !!customer.profileImage
                              ? customer.profileImage.link
                              : avatar4
                          }
                          alt=""
                          className="img-thumbnail rounded-circle"
                        />
                      </div>

                      <h5 className="pl-3 font-size-15 text-truncate">
                        {customer.name}
                      </h5>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="5">
                      <h5 className="font-size-15">
                        {moment(customer.date_created_utc).format(
                          "DD MMM YYYY"
                        )}
                      </h5>
                      <p className="text-muted mb-0">
                        {props.t("member_since")}
                      </p>
                    </Col>

                    <Col xs="4">
                      <Link
                        to={`/profile/change-password`}
                        className="waves-effect waves-light p-0"
                      >
                        {props.t("change_password")}{" "}
                        <i className="mdi mdi-arrow-right ml-1" />
                      </Link>
                    </Col>

                    {/* <Col xs="4">
                      <h5 className="font-size-15 text-capitalize">
                        {customer.status || "Active"}
                      </h5>
                      <p className="text-muted mb-0">{props.t("status")}</p>
                    </Col> */}

                    {/* <Col xs="3">
                      <h5 className="font-size-15 text-capitalize">
                        <i
                          style={{ color: "#fabc3c" }}
                          className="bx bxs-star"
                        ></i>{" "}
                        {customer.avgRating || 0}
                        /5
                      </h5>
                      <p className="text-muted mb-0">{props.t("Rating")}</p>
                    </Col> */}
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    <Row>
                      <Col>{props.t("personal_information")}</Col>

                      <Col sm="2">
                        <Link
                          to={`/profile/edit`}
                          className="btn btn-primary btn-sm"
                        >
                          {props.t("edit")}
                        </Link>
                      </Col>
                    </Row>
                  </CardTitle>
                  <div className="table-responsive">
                    <Table className="table-nowrap mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">{props.t("full_name")} :</th>
                          <td className="text-wrap">{customer.name}</td>
                        </tr>
                        <tr>
                          <th scope="row">{props.t("mobile")} :</th>
                          <td className="text-wrap">
                            {customer.countryCode} {customer.mobileNumber}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">{props.t("email")} :</th>
                          <td className="text-wrap">{customer.email}</td>
                        </tr>
                        {/* <tr>
                          <th scope="row">{props.t("location")} :</th>
                          <td className="text-wrap">{customer.address}</td>
                        </tr> */}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl="8">
              <Row>
                {map(miniCards, (card, key) => (
                  <MiniCards
                    title={card.title}
                    text={card.text}
                    iconClass={card.iconClass}
                    key={"_card_" + key}
                  />
                ))}
              </Row>
              {/* <Card>
                <CardBody>
                  <CardTitle className="mb-3">
                    <Row>
                      <Col sm="10">
                        {props.t("My")} {props.t("Orders")}
                      </Col>

                      <Col sm="2">
                        <Link
                          to="#"
                          className="waves-effect waves-light btn-sm"
                        >
                          {props.t("View All")}{" "}
                          <i className="mdi mdi-arrow-right ml-1" />
                        </Link>
                      </Col>
                    </Row>
                  </CardTitle>

                  <ToolkitProvider
                    keyField="id"
                    data={userProfile.projects || []}
                    columns={projectColumns(props.t)}
                    bootstrap4
                  >
                    {toolkitProps => (
                      <React.Fragment>
                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                responsive
                                remote
                                bordered={false}
                                striped={false}
                                classes={
                                  "table table-centered table-hover table-nowrap"
                                }
                                headerWrapperClasses={"thead-light"}
                                {...toolkitProps.baseProps}
                              />
                            </div>
                          </Col>
                        </Row>
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                </CardBody>
              </Card> */}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ContactsProfile.propTypes = {
  t: PropTypes.any,
  userProfile: PropTypes.any,
  loading: PropTypes.bool,
}

const mapStateToProps = ({ Login }) => ({
  customer: Login.user,
  userProfile: {},
  loading: Login.loading || false,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(ContactsProfile)))
