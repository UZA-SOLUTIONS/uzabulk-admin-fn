import React, { Fragment, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { isEmpty } from "lodash"

import {
  Button,
  Card,
  CardTitle,
  CardSubtitle,
  CardHeader,
  CardBody,
  CardText,
  Col,
  Container,
  Row,
  Spinner,
  Input,
  Label,
  Collapse,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

import { getStarted } from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

// Components
import NotFound from "pages/Utility/pages-404-content"

const ActionButton = (link, text) => {
  return (
    <Link to={link} key={Math.random()}>
      <Button color="primary">{text}</Button>
    </Link>
  )
}

const DomainButton = (link, text, t) => {
  return (
    <Fragment>
      <Link to="/domains" key={Math.random()}>
        <Button color="primary">{text}</Button>
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link
        to="#"
        onClick={e => e.preventDefault()}
        className="support_chatbox_int"
      >
        {t("already_have_domain")}
      </Link>
    </Fragment>
  )
}

const StoreAction = (types, currentPlan, trns) => {
  return (
    <Fragment>
      {types?.map(t => {
        const storeType = t.storeType.toLowerCase()

        return (
          <Link
            to={
              ["basic", "premium"].includes(currentPlan?.billingPlan?.type)
                ? "/order-settings"
                : `/${storeType}/settings`
            }
            key={t._id}
          >
            <Button
              color="primary"
              className="mb-2"
              style={{ textTransform: "capitalize", marginLeft: 10 }}
            >
              {["basic", "premium"].includes(currentPlan?.billingPlan?.type)
                ? trns("order_settings")
                : `${storeType} Setting`}
            </Button>
          </Link>
        )
      })}
    </Fragment>
  )
}

const GetStarted = props => {
  if (
    !props.settings?.hideThings?.find(
      element => element.type === "isGetStarted"
    )?.value
  ) {
    return <NotFound />
  }

  const { loading, onGetStarted, getStarted } = props

  const [tabs, setTabs] = useState({
    market_place: {
      title: props.t("get_started_menu1_heading"),
      heading: `<p>${props.t("general_settings_int")}</p>
      <h5>${props.t("required_info")} : </h5>  
      <p><b>${props.t("distnce_unit")} : </b><span>${props.t(
        "distance_unit_int"
      )}</span></p>
        <p><b>${props.t("stripe_keys")} : </b><span>${props.t(
        "stripe_live_int"
      )}, ${props.t("sandbox")}: ${props.t("stripe_sandbox_int")}
        ${props.t(
          "stripe_key_guide"
        )}? <a target='_blank' href='https://docs.projectName.com/en/articles/4929375-how-to-get-stripe-api-keys'>${props.t(
        "click_here"
      )}</a></span></p>
        <p><b>${props.t("map_keys")}: </b><span>${props.t(
        "google_key_guide"
      )}?  <a target='_blank' href='https://docs.projectName.com/en/articles/4899151-how-to-get-google-map-keys'>${props.t(
        "click_here"
      )}</a></span></p>
        `,
      icon: "bx bx-user-circle",
      open: false,
      enable: false,
      childrens: ActionButton("/settings", props.t("account_settings")),
    },
    store_type: {
      title: props.t("get_started_menu2_heading"),
      heading: `<p>${props.t("store_type_starter_text")}</p>
      <p><b>${props.t("store_setup")}: </b><span>${props.t(
        "config_store_type_guide"
      )}? <a target='_blank' href='https://docs.projectName.com/en/articles/4898560-how-to-configure-my-store'>${props.t(
        "click_here"
      )}</a>
      </span></p>
      `,
      open: false,
      enable: false,
      icon: "bx bx-store",
      childrens: StoreAction(props.store_types, props.currentPlan, props.t),
    },
    domain: {
      title: props.t("get_started_menu3_heading"),
      heading: `<p>${props.t("domain_starter_guide")}? </p><p>${props.t(
        "buy_domain_starter_guide"
      )}</p>`,
      icon: "bx bx-globe",
      open: false,
      enable: false,
      childrens: !props?.currentPlan?.isTrial
        ? DomainButton("/domain", props.t("buy_new_domain"), props.t)
        : [],
    },
  })

  useEffect(() => {
    onGetStarted()
  }, [])

  useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      market_place: {
        ...prevState.market_place,
        enable: getStarted?.accountSetup || false,
        open: !getStarted?.accountSetup,
      },
      store_type: {
        ...prevState.store_type,
        title: ["basic", "premium"].includes(
          props.currentPlan?.billingPlan?.type
        )
          ? props.t("order_settings")
          : prevState.store_type.title,
        enable: getStarted?.storeTypeSettings || false,
        open: getStarted?.accountSetup && !getStarted?.storeTypeSettings,
      },
      domain: {
        ...prevState.domain,
        enable: getStarted?.addDomain || false,
        open:
          getStarted?.accountSetup &&
          getStarted?.storeTypeSettings &&
          !getStarted?.addDomain,
      },
    }))
  }, [getStarted, props.currentPlan])

  const activeTab = async (key, i) => {
    const newTabs = {}
    for await (const [k, v] of Object.entries(tabs)) {
      if (key === k) {
        newTabs[k] = { ...v, open: !v.open }
        continue
      }
      newTabs[k] = { ...v, open: false }
    }
    setTabs({ ...newTabs })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Customers"
            isCenter={true}
            breadcrumbItem={props.t(
              ["basic"].includes(props.currentPlan?.billingPlan?.type)
                ? "get_started_store_heading"
                : "get_started_heading"
            )}
          />

          <Row>
            <Col xs="12" md={{ size: 10, offset: 1 }}>
              <Card>
                <CardBody className="spinner-content position-relative">
                  {loading && (
                    <div className="spinner">
                      <Spinner color="primary" />
                    </div>
                  )}

                  {/* <CardTitle>Welcome to your Marketplace</CardTitle> */}
                  <CardSubtitle className="mb-3">
                    {props.t("get_started_subheading")}
                  </CardSubtitle>

                  <div id="accordion">
                    {tabs &&
                      Object.keys(tabs).map((key, index) => {
                        if (
                          !props.settings?.hideThings?.find(
                            element => element.type === "isDomain"
                          )?.value &&
                          key === "domain"
                        )
                          return <React.Fragment></React.Fragment>

                        return (
                          <Card
                            className={`mb-1 get-started ${
                              tabs[key].open ? "active" : ""
                            }`}
                          >
                            <CardHeader
                              className="`p-3 get-started"
                              key={index}
                              onClick={() => {
                                activeTab(key, index)
                              }}
                            >
                              <div className="header-title">
                                <h6>
                                  <i
                                    className={`fas start ${tabs[key].icon}`}
                                    style={{ fontSize: 18 }}
                                  ></i>
                                  <span
                                    className="title"
                                    style={{ marginLeft: 15 }}
                                  >
                                    {tabs[key].title}
                                  </span>
                                </h6>
                                <i
                                  className={`mdi permission ${
                                    tabs[key].enable
                                      ? "mdi-check-circle"
                                      : "mdi-checkbox-blank-circle"
                                  }`}
                                  style={{ fontSize: 18 }}
                                ></i>
                              </div>
                            </CardHeader>

                            <Collapse isOpen={tabs[key].open}>
                              <Card>
                                <CardBody>
                                  <CardText md={12} xs={12}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: tabs[key].heading,
                                      }}
                                    />
                                  </CardText>
                                  <CardText md={12} xs={12}>
                                    {tabs[key].childrens}
                                  </CardText>
                                </CardBody>
                              </Card>
                            </Collapse>
                          </Card>
                        )
                      })}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

GetStarted.propTypes = {
  // customers: PropTypes.array,
  // totalCustomers: PropTypes.number,
  // getCustomersSuccess: PropTypes.func,
  // onGetCustomers: PropTypes.func,
  // onDeleteCustomer: PropTypes.func,
  // onPutCustomersStatus: PropTypes.func,
}

const mapStateToProps = ({ Settings, Billing }) => ({
  getStarted: Settings?.getStarted,
  loading: Settings?.starterLoading,
  store_types: Settings.settings.storeTypeEnabled,
  settings: Settings.settings,
  currentPlan: Billing.currentPlan,
})

const mapDispatchToProps = dispatch => ({
  // Your Props actions
  onGetStarted: () => dispatch(getStarted()),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(GetStarted))
)
