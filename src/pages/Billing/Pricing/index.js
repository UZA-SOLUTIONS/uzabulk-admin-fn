import React, { useEffect, useState } from "react"
import { Container, Row, Col, Spinner, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import classnames from "classnames"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

// Actions
import { getBillingPlans, postUpgradePlan } from "store/actions"

// Translation
import { withTranslation } from "react-i18next"

//Import Pricing Cards
import ConfirmModal from "./ConfirmModal"
import UpgradeConfirmModal from "./UpgradeConfirmModal"
import NewCardModal from "./AddCardModal"
import CardPricing from "./card-pricing"
import BankCard from "./BankCard"
import NotFound from "pages/Utility/pages-404-content"

const trial = {
  type: "trial",
  features: [
    "Branded Customer Website",
    "Branded Vendor Website",
    "Branded Customer App",
    "Branded Delivery Driver App",
    "Robust Admin Panel",
    "Real-time Tracking",
    "Push Notifications",
    "Order Fulfilment",
    "Order Delivery",
    "Manage and Track Order",
    "Uber-like in-app chat",
    "In-App Navigation",
    "QR Menu",
    "Multiple Payment Methods",
    "Ready to go in 15 minutes",
    "Reviews and Feedback",
    "Advanced Analytics",
    "In depth Heatmaps",
    "360° Marketing",
    "No per Transaction fees",
    "Unlimited orders",
    "Unlimited customers",
    "Unlimited Vendors",
    "Unlimited Services/Products",
    "Easy to use platform",
    "Easy to expand platform",
    "User-Friendly Design",
    "Easy Integration",
    "Trial includes branded customer and branded vendor website.",
    "For delivery, you need to use Hyperlocal driver app.",
    "No Customer app included.",
  ],
  status: "active",
  name: "30 Days Free Trial",
  interval: "month",
  currency: "usd",
  price: 0,
  description:
    "I am a single store/aggregator looking to test launch my online delivery store with 30 days free trial.      ",
}

const PagesPricing = props => {
  const {
    loading,
    onGetBillingPlans,
    onPostUpgradePlan,
    plans,
    cardDetails,
    currentPlan,
  } = props

  const [needCustomerApp, setneedCustomerApp] = useState(false)
  const [activeTab, setactiveTab] = useState("month")
  const [pricings, setpricings] = useState([])
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    cardId: null,
  })
  const [upgradeConfirmModal, setupgradeConfirmModal] = useState({
    isOpen: false,
    planId: null,
  })
  const [newCardModal, setnewCardModal] = useState({
    isOpen: false,
    isUpgrade: false,
  })
  const [filter, setfilter] = useState({
    orderBy: "date_created_utc",
    order: 1,
    page: 0,
    limit: 10,
  })

  useEffect(() => {
    onGetBillingPlans(filter)
  }, [filter])

  useEffect(() => {
    let plan = plans?.filter(
      plan => plan._id === currentPlan?.billingPlan?.type
    )
    setpricings(plan[0] || {})

    setneedCustomerApp(currentPlan.isAddon)
  }, [plans, currentPlan])

  const toggleConfirmModal = cardId => {
    setConfirmModal(prevState => ({
      isOpen: !prevState.isOpen,
      cardId,
    }))
  }

  const toggleUpgradeConfirmModal = planId => {
    setupgradeConfirmModal(prevState => ({
      isOpen: !prevState.isOpen,
      planId,
    }))
  }

  const toggleNewCardModal = (isUpgrade, planId) => cardId => {
    setnewCardModal(prevState => ({
      isOpen: !prevState.isOpen,
      isUpgrade,
      planId,
    }))
  }

  const onNewCardModalSuccess = () => {
    if (newCardModal.isUpgrade && newCardModal.planId) {
      setTimeout(() => {
        document?.getElementById(newCardModal.planId)?.click()
      }, 800)
    }
    toggleNewCardModal(false)()
  }

  const removeCardConfirm = () => {
    toggleConfirmModal()
  }

  const onUpgradeConfirm = () => {
    upgradeNow(upgradeConfirmModal?.planId)
    toggleUpgradeConfirmModal()
  }

  function upgradeNow(plan_id) {
    onPostUpgradePlan({ billingPlan: plan_id, isAddon: needCustomerApp })
  }

  function toggle(tab) {
    if (activeTab !== tab) setactiveTab(tab)
  }

  if (
    !props.settings?.hideThings?.find(element => element.type === "isBilling")
      ?.value
  )
    return <NotFound />

  return (
    <React.Fragment>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        toggle={toggleConfirmModal}
        onConfirm={removeCardConfirm}
      />

      <UpgradeConfirmModal
        isOpen={upgradeConfirmModal.isOpen}
        toggle={toggleUpgradeConfirmModal}
        onConfirm={onUpgradeConfirm}
      />

      <NewCardModal
        isOpen={newCardModal.isOpen}
        toggle={toggleNewCardModal(false)}
        onSuccess={onNewCardModalSuccess}
      />

      <div className="page-content">
        <Container fluid className="spinner-content position-relative">
          {loading && (
            <div className="spinner">
              <Spinner color="primary" />
            </div>
          )}

          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="text-center mb-3">
                {/* <h4>{props.t("choose_plan")}</h4>
                <p className="text-muted">{props.t("choose_plan_int")}</p> */}
                <h4>{props.t("your_billing_details")}</h4>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center mb-4" id="billing-prices">
            {/* <Col xs={12} className="justify-content-center row">
              <Nav pills className="navtab-bg nav-justified">
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "month",
                    })}
                    onClick={() => {
                      toggle("month")
                    }}
                  >
                    Monthly
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "year",
                    })}
                    onClick={() => {
                      toggle("year")
                    }}
                  >
                    Yearly
                  </NavLink>
                </NavItem>
              </Nav>
            </Col> */}
            <div className="text-center">
              <p className="">
                {/* {props.t(currentPlan?.billingPlan?.type)} {currentPlan?.billingPlan?.interval} (${currentPlan?.planAmount}) */}
                {props.t("plan")}: ${currentPlan?.planAmount}/
                {currentPlan?.billingPlan?.interval}
              </p>

              <p className="text-danger">
                {currentPlan
                  ? currentPlan?.isTrial
                    ? `${props.t("Trial Expires on")} ${currentPlan?.endDate || ""
                    }`
                    : `${props.t("next_payment_on")} ${currentPlan?.endDate || ""
                    }`
                  : ``}
              </p>
            </div>
          </Row>

          {/* <Row className="justify-content-center mb-4">
            <Col xs={12} className="justify-content-center">
              <div className="text-center custom-control custom-checkbox">
                <input
                  id="customer-app"
                  type="checkbox"
                  className="custom-control-input"
                  checked={needCustomerApp}
                  onChange={() => setneedCustomerApp(!needCustomerApp)}
                />
                <Label className="custom-control-label" for="customer-app">
                  I want White Labled Customer App
                </Label>
              </div>
            </Col>
          </Row> */}

          {/*  <Row className="justify-content-center">
            {pricings?.plans?.map((pricing, key) => (
              <CardPricing
                t={props.t}
                needCustomerApp={needCustomerApp}
                activeTab={activeTab}
                pricing={pricing}
                key={"_pricing_" + key}
                upgradeNow={upgradeNow}
                billingPlan={currentPlan?.billingPlan?._id}
                isTrial={currentPlan?.isTrial}
                isExpired={currentPlan?.isExpired}
                planAmount={currentPlan?.planAmount}
                toggleUpgradeConfirmModal={toggleUpgradeConfirmModal}
                cardDetails={cardDetails}
                toggleNewCardModal={toggleNewCardModal}
              />
            ))}
          </Row> */}

          {/* <Row className="justify-content-center mt-4">
            <Col lg={8}>
              <div className="text-center mb-3">
                <h4>
                  {props.t("features_for")} {props.t(pricings?._id)}
                </h4>
                <p className="text-muted">{props.t("features_for_int")}</p>
              </div>
            </Col>
          </Row> */}

          {/* <Row className="justify-content-center mt-4">
            <Col>
              <Card>
                <CardBody>
                  <div className="row">
                    {pricings?.features?.map((feature, key) => (
                      <p
                        key={"_feature_" + key}
                        className="col-12 col-sm-6 col-md-4 col-lg-6 col-xl-4"
                      >
                        <i className="bx bx-checkbox-square text-primary mr-2" />{" "}
                        {feature}
                      </p>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row> */}

          <Row className="justify-content-center mt-3">
            <Col lg={6}>
              <div className="text-center mb-4">
                <h4>{props.t("payment_method")}</h4>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            {!!cardDetails ? (
              <BankCard
                t={props.t}
                toggleConfirmModal={toggleNewCardModal(false)}
                details={cardDetails}
              />
            ) : (
              <div className="d-flex flex-column align-items-center">
                <p className="text-muted">{props.t("no_card")}</p>
                <Link
                  to={"#"}
                  onClick={e => {
                    e.preventDefault()
                    toggleNewCardModal(false)()
                  }}
                >
                  <i className="bx bx-plus-circle h1 text-primary" />
                </Link>
              </div>
            )}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = ({ Settings, Billing }) => ({
  settings: Settings.settings,
  loading: Billing.loading,
  plans: Billing.plans,
  cardDetails: Billing.cardDetails,
  currentPlan: Billing.currentPlan,
})

const mapDispatchToProps = dispatch => ({
  onGetBillingPlans: data => dispatch(getBillingPlans(data)),
  onPostUpgradePlan: data => dispatch(postUpgradePlan(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(PagesPricing))
