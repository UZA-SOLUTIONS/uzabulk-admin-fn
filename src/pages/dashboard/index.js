import React, { Component } from "react"
import { connect } from "react-redux"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Media,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { ROLES, isHideThingTrue, SLUGS_NAME } from "helpers/contants"

import { dashboardReports } from "store/actions"

//i18n
import { withTranslation } from "react-i18next"

import CardWelcome from "./card-welcome"
import Order_Graph from "./Order_Graph"
import OrderStatusPie from "./Order_Status"
import LatestUsers from "./tables/LatestUsers"
import Order from "./List/Order"
import DateRangePicker from "react-bootstrap-daterangepicker"
import moment from "moment"
import CancelOrder from "./cancelOrder/CancelOrder"

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isBooking: false,
      loading: false,
      startDate: moment().subtract(29, "days"),
      endDate: moment(),
    }
  }

  updateDate = picker => {
    console.log("picker", picker)

    const data = this.state

    let newData = {
      startDate: data.startDate?.format("YYYY-MM-DD"),
      endDate: data.endDate?.format("YYYY-MM-DD"),
    }

    if (SLUGS_NAME.purposeDeliveryService === this.props.settings.slug) {
      console.log("first")
      if (picker) {
        this.props.dashboardReports(newData)
      } else {
        this.props.dashboardReports()
      }
    } else {
      this.props.dashboardReports()

      setTimeout(() => {
        this.setState({
          loading: false,
        })
      }, 500)

      this.checkIsBooking()
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.updateDate()
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 500)

    this.checkIsBooking()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currentPlan !== this.props.currentPlan ||
      prevProps.settings !== this.props.settings
    ) {
      this.checkIsBooking()
    }
  }

  checkIsBooking = () => {
    if (
      ["basic", "premium"].includes(
        this.props.currentPlan?.billingPlan?.type
      ) &&
      this.props.settings?.storeTypeEnabled[0] &&
      ["TAXI", "PICKUPDROP", "SERVICEPROVIDER"].includes(
        this.props.settings?.storeTypeEnabled[0].storeType
      )
    ) {
      this.setState({ isBooking: true })
    } else {
      this.setState({ isBooking: false })
    }
  }

  // start datefilter

  RANGES = t => ({
    [t("today")]: [moment(), moment()],
    [t("yesterday")]: [
      moment().subtract(1, "days"),
      moment().subtract(1, "days"),
    ],
    [t("last_7_days")]: [moment().subtract(6, "days"), moment()],
    [t("last_30_days")]: [moment().subtract(29, "days"), moment()],
    [t("this_month")]: [moment().startOf("month"), moment().endOf("month")],
    [t("last_month")]: [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
  })

  // end datefilter

  render() {
    const { loading } = this.state
    const {
      totalOrders,
      totalRevenue,
      byOrder,
      byOrderStatus,
      byUser,
      totalCustomers,
      wallet,
      totalDrivers,
      byDrivers,
      cancelOrders,
      RANGES,
      props,
      t,
    } = this.props.dashboard
    console.log("this", this.state.keydata)

    const reports = [
      {
        title: this.state.isBooking ? "bookings" : "orders",
        iconClass: "bx-copy-alt",
        description: totalOrders || 0,
      },
      {
        title: "revenue",
        iconClass: "bx-archive-in",
        description:
          this.props?.currency + Number(totalRevenue || 0).toFixed(2),
      },
      ...(this.props.role !== ROLES.vendor && !totalDrivers
        ? [
            {
              title: "customers",
              iconClass: "bx bx-user-circle",
              description: totalCustomers || 0,
            },
          ]
        : [
            {
              title: "drivers",
              iconClass: "bx bx-user-circle",
              description: totalDrivers || 0,
            },
          ]),
      ...(this.props.role === ROLES.vendor
        ? [
            {
              title: "Wallet Balance",
              iconClass: "bx bx-user-circle",
              description:
                this.props?.currency + parseFloat(wallet || 0).toFixed(2),
            },
          ]
        : []),
    ]

    let isDispatcherRole = isHideThingTrue(
      this.props.hideThings,
      "driverlistdispatcher"
    )
    console.log(this.props.hideThings, isDispatcherRole, "hideThings")

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Dashboards"
              breadcrumbItem={this.props.t("last_7")}
            />
            <div>
              {SLUGS_NAME.purposeDeliveryService ===
                this.props.settings.slug && (
                <Col sm={12} className="mb-2 text-right">
                  <DateRangePicker
                    initialSettings={{
                      opens: "center",
                      ranges: this.RANGES(this.props.t),
                      alwaysShowCalendars: true,
                      applyButtonClasses: "btn-primary",
                      maxDate: moment(),
                      locale: {
                        applyLabel: this.props.t("apply"),
                        cancelLabel: this.props.t("cancel"),
                        customRangeLabel: this.props.t("custom_range"),
                        daysOfWeek: [
                          this.props.t("week_of_sunday"),
                          this.props.t("week_of_monday"),
                          this.props.t("week_of_tuesday"),
                          this.props.t("week_of_wednesday"),
                          this.props.t("week_of_thursday"),
                          this.props.t("week_of_friday"),
                          this.props.t("week_of_saturday"),
                        ],
                        monthNames: [
                          this.props.t("month_of_january"),
                          this.props.t("month_of_february"),
                          this.props.t("month_of_march"),
                          this.props.t("month_of_april"),
                          this.props.t("month_of_may"),
                          this.props.t("month_of_june"),
                          this.props.t("month_of_july"),
                          this.props.t("month_of_august"),
                          this.props.t("month_of_september"),
                          this.props.t("month_of_october"),
                          this.props.t("month_of_november"),
                          this.props.t("month_of_december"),
                        ],
                      },
                      ...this.state,
                    }}
                    onApply={(e, picker) => {
                      console.log("apply ", e, picker)

                      this.setState(
                        {
                          startDate: picker.startDate,
                          endDate: picker.endDate,
                          keydata: "picker_date",
                        },
                        () => {
                          this.updateDate("picker")
                        }
                      )
                    }}
                  >
                    <div
                      id="daterange"
                      class="daterange-selectbox pull-right d-flex justify-content-between align-items-center w-75"
                    >
                      <i class="bx bx-calendar"></i>
                      <span>
                        {this.state.startDate?.format("DD MMM YYYY")} -{" "}
                        {this.state.endDate?.format("DD MMM YYYY")}
                      </span>{" "}
                      <b class="bx bx-caret-down"></b>
                    </div>
                  </DateRangePicker>
                </Col>
              )}
            </div>
            <Row style={{ paddingLeft: 10, paddingBottom: 1 }}>
              <Col xl="4">
                <CardWelcome
                  t={this.props.t}
                  settings={this.props.settings}
                  isHyperApp={this.props.isHyperApp}
                />
              </Col>

              <Col xl="8">
                <Row>
                  {reports.map((report, key) => (
                    <Col md="4" key={"_col_" + key}>
                      <Card className="mini-stats-wid">
                        <CardBody>
                          <Media>
                            <Media body>
                              <p className="text-muted font-weight-medium">
                                {this.props.t(report.title)}
                              </p>
                              <h4 className="mb-0">{report.description}</h4>
                            </Media>
                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                              <span className="avatar-title">
                                <i
                                  className={
                                    "bx " + report.iconClass + " font-size-24"
                                  }
                                ></i>
                              </span>
                            </div>
                          </Media>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xl={8} xs={12}>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">
                      {this.props.t("last_7_revenue")}
                    </CardTitle>

                    <Order_Graph
                      isBooking={this.state.isBooking}
                      data={byOrder || []}
                      loading={loading}
                      t={this.props.t}
                      primaryColor={
                        this.props.settings?.themeSettings
                          ?.adminPrimaryBackgroundColor || "#34c38f"
                      }
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col xl={4} xs={12}>
                <Row>
                  <Col md={12} xs={12}>
                    <Card>
                      <CardBody>
                        <CardTitle>
                          {this.props.t(
                            this.state.isBooking
                              ? "booking_status"
                              : "order_status"
                          )}
                        </CardTitle>
                        <div id="pie-chart" className="e-chart">
                          <OrderStatusPie
                            isBooking={this.state.isBooking}
                            data={byOrderStatus}
                            t={this.props.t}
                            primaryColor={
                              this.props.settings?.themeSettings
                                ?.adminPrimaryBackgroundColor || "#34c38f"
                            }
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            {this.props.role !== ROLES.vendor && (
              <Row>
                <Col lg="12">
                  <LatestUsers
                    isBooking={this.state.isBooking}
                    data={isDispatcherRole && byDrivers ? byDrivers : byUser}
                    loading={loading}
                    isCustomer={isDispatcherRole && byDrivers ? false : true}
                  />
                </Col>
              </Row>
            )}
            {this.props.role !== ROLES.vendor &&
              this.props?.settings?.slug === SLUGS_NAME?.kontaktem && (
                <Row>
                  <Col lg="12">
                    <Order />
                  </Col>
                  <Col lg="12">
                    <CancelOrder
                      data={cancelOrders}
                      loading={loading}
                      currency={this.props?.settings?.currency.sign}
                      slug={this.props?.settings?.slug}
                    />
                  </Col>
                </Row>
              )}
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ Login, Settings, dashboard, Billing }) => ({
  role: Login?.user?.role || "",
  currency: Settings?.settings?.currency?.sign || "$",
  settings: Settings.settings,
  dashboard: dashboard?.data,
  isHyperApp: Login.isHyperApp,
  currentPlan: Billing.currentPlan,
  hideThings: Settings.settings.hideThings,
})

const mapActionToProps = dispatch => ({
  dashboardReports: data => dispatch(dashboardReports(data)),
})
export default connect(
  mapStateToProps,
  mapActionToProps
)(withTranslation()(Dashboard))
