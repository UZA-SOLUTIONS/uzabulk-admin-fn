import React, { useEffect } from "react"
import { withRouter, Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"
import { connect } from "react-redux"

import { ROLES } from "helpers/contants"

import { withTranslation } from "react-i18next"

//Import Images
import error from "assets/images/error-img.png"

const Pages500 = props => {
  const {
    meLoading,
    isMeFailed,
    storeLoading,
    starterLoading,
    isStoreFailed,
    getStarted,
    currentPlan,
    currentPlanLoading,
    currentPlanFailed,
  } = props

  useEffect(() => {
    if (JSON.stringify(props?.user) !== "{}") {
      if (
        !meLoading &&
        !storeLoading &&
        !starterLoading &&
        !currentPlanLoading
      ) {
        if (
          isMeFailed ||
          isStoreFailed ||
          (currentPlanFailed && props?.user?.role === ROLES.admin)
        ) {
        } else {
          if (props?.user?.role === ROLES.admin) {
            if (currentPlan?.isExpired) {
              if (
                !props.settings?.hideThings?.find(
                  element => element.type === "isBilling"
                )?.value
              )
                return defaultNavigate()

              return props?.history?.replace("/upgrade")
            }
            if (!getStarted?.isSetupComplete) {
              if (
                !props.settings?.hideThings?.find(
                  element => element.type === "isGetStarted"
                )?.value
              )
                return defaultNavigate()

              return props?.history?.replace("/GetStarted")
            }
          }

          defaultNavigate()
        }
      }
    }
  }, [
    meLoading,
    isMeFailed,
    storeLoading,
    isStoreFailed,
    starterLoading,
    currentPlanLoading,
  ])

  const defaultNavigate = () => {
    if (props?.location?.state?.from) {
      props?.history?.replace(props?.location?.state?.from)
    } else {
      props?.history?.replace("/dashboard")
    }
  }

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <h1 className="display-2 font-weight-medium">
                  5<i className="bx bx-buoy bx-spin text-primary display-3" />0
                </h1>
                <h4 className="text-uppercase">{props.t("server_error")}</h4>
                <div className="mt-5 text-center">
                  <Link
                    className="btn btn-primary waves-effect waves-light"
                    to="#"
                    onClick={e => {
                      e.preventDefault()

                      window.location.replace("/")
                    }}
                  >
                    {props.t("refresh")}
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" xl="6">
              <div>
                <img src={error} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = ({ Login, Settings, Billing }) => ({
  user: Login?.user,
  meLoading: Login?.meLoading,
  isMeFailed: Login?.isMeFailed,
  storeLoading: Settings?.storeLoading,
  starterLoading: Settings?.starterLoading,
  isStoreFailed: Settings?.isStoreFailed,
  currentPlanLoading: Billing?.currentPlanLoading,
  currentPlanFailed: Billing?.currentPlanFailed,
})

export default connect(mapStateToProps)(withRouter(withTranslation()(Pages500)))
