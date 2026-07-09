import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter, useParams } from "react-router-dom"
import { Card, CardBody, Col, Container, Row, Button, Badge } from "reactstrap"
import moment from "moment-timezone"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

//Import Scrollbar
import { getDispute, putDisputeStatus } from "store/actions"
import Chat from "./Chat"

const DisputeProfile = ({
  accessLevel,
  loading,
  onPostDisputeReply,
  activeStoreType,
  activeStoreId,
  dispute,
  onGetDispute,
  user,
  onPutDisputeStatus,
  onDeleteDisputeReply,
  ...props
}) => {
  const { id } = useParams()

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canTransactions: false,
    canBlock: false,
  })

  const [disputeuser, setdisputeuser] = useState({})

  useEffect(() => {
    onGetDispute(id)
  }, [id])

  useEffect(() => {
    setdisputeuser(dispute || {})
  }, [dispute])

  const statusHandler = () => {
    const status = {
      _id: id,
      status: "closed",
    }
    const callBack = () => {
      onGetDispute(id)
    }
    onPutDisputeStatus(status, callBack)
  }
  // console.log(disputeuser?.attachment, "ATTACH");

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={props.t("dispute") + " " + props.t("profile")}
            breadcrumbItems={[
              {
                title: props.t("dispute"),
                link: `/dispute`,
              },
              {
                title: props.t("profile"),
              },
            ]}
          />

          <Row className="spinner-content">
            {/* <Col xs={4}> */}
            <Col xs={12}>
              <Card>
                <CardBody className="pt-3 pb-2">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div className="pr-3 pb-3">
                      <h5 className="font-size-15 text-capitalize">
                        <p className="text-muted mb-3">{props.t("orderId")}</p>
                        {["TAXI", "PICKUPDROP"].includes(
                          disputeuser?.storeType?.storeType.toUpperCase()
                        ) ? (
                          <Link
                            to={`/${disputeuser?.storeType?.storeType.toLowerCase()}/trip/${
                              disputeuser?.orderId?._id
                            }/profile`}
                          >
                            {disputeuser?.orderId?.customOrderId}
                          </Link>
                        ) : (
                          <Link
                            to={`/${disputeuser?.storeType?.storeType.toLowerCase()}/orders/${
                              disputeuser?.orderId?._id
                            }/profile`}
                          >
                            {disputeuser?.orderId?.customOrderId}
                          </Link>
                        )}
                      </h5>
                    </div>
                    <div className="pr-3 pb-3">
                      <h5 className="font-size-15 text-capitalize">
                        <p className="text-muted mb-3">{props.t("user")}</p>
                        <Link
                          to={`/customers/${disputeuser.user?._id}/profile`}
                        >
                          {disputeuser.user?.name}
                        </Link>
                      </h5>
                    </div>

                    <div className="pr-3 pb-3">
                      <h5 className="font-size-15 text-capitalize">
                        <p className="text-muted mb-3">{props.t("status")}</p>
                        <Badge
                          className={
                            "text-capitalize font-size-13 badge-soft-" +
                            (disputeuser?.status == "close"
                              ? "success"
                              : "danger")
                          }
                        >
                          {disputeuser?.status}
                        </Badge>
                      </h5>
                    </div>
                    <div className="pr-3 pb-3">
                      <h5 className="font-size-15 text-capitalize">
                        <p className="text-muted mb-3">
                          {props.t("user")} {props.t("mobile")}
                        </p>
                        {(disputeuser.user?.countryCode || "") +
                          " " +
                          (disputeuser.user?.mobileNumber || "")}
                      </h5>
                    </div>

                    {disputeuser?.status == "open" ? (
                      <div className="pr-3 pb-3">
                        <h5 className="font-size-15 text-capitalize">
                          <p className="text-muted mb-3">{props.t("Status")}</p>
                          <Button
                            onClick={() => statusHandler()}
                            variant="primary"
                          >
                            {props.t("mark_close")}
                          </Button>
                        </h5>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xs={12}>
              <Card>
                <CardBody className="pt-3 pb-2">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div className="pr-3 pb-3">
                      <p className="text-muted mb-3">
                        {props.t("user")} {props.t("email")}
                      </p>
                      <h5 className="font-size-15 text-capitalize">
                        {disputeuser.user?.email}
                      </h5>
                    </div>

                    <div className="pr-3 pb-3">
                      <p className="text-muted mb-3">{props.t("created_at")}</p>
                      <h5 className="font-size-15 text-capitalize">
                        {moment(disputeuser.date_created_utc).format(
                          "DD MMM YYYY LT"
                        )}
                      </h5>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs={12}>
              <Card>
                <CardBody className="pt-3 pb-2">
                  <div className="pr-3 pb-3">
                    <p className="text-muted mb-3">{props.t("Description")}</p>
                    <h5 className="font-size-15 text-capitalize ">
                      {disputeuser?.description}
                    </h5>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs={12}>
              <Card>
                <CardBody className="pt-3 pb-2">
                  <div className="pr-3 pb-3">
                    <p className="text-muted mb-3">{props.t("reason")}</p>
                    <h5 className="font-size-15 text-capitalize ">
                      {disputeuser.reason}
                    </h5>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xs={12}>
              <Row className="ml-2" lg={4} xs={12}>
                {disputeuser?.attachment?.map((img, index) => (
                  <Card className="mr-2">
                    <CardBody className="mt-2 mb-3 ">
                      <p className="text-muted mt-2 text-center">
                        {props.t("Attachment")} {index + 1}
                      </p>
                      <img
                        style={{ height: "200px", width: "200px" }}
                        src={img.link}
                      />
                    </CardBody>
                  </Card>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

DisputeProfile.propTypes = {
  userProfile: PropTypes.any,
  documents: PropTypes.array,
  loading: PropTypes.bool,
}

const mapStateToProps = ({ Disputes }) => ({
  dispute: Disputes.Dispute,
})

const mapDispatchToProps = dispatch => ({
  onGetDispute: id => dispatch(getDispute(id)),
  onPutDisputeStatus: (data, callback) =>
    dispatch(putDisputeStatus(data, callback)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(DisputeProfile)))
