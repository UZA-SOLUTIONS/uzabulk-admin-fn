import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect, useDispatch } from "react-redux"
import { withRouter } from "react-router-dom"

import OrderChart from "./Order_Graph"
import OrderPie from "./PieChart"

import RevenueChart from "./Revenue_Graph"

import {
  Card,
  CardTitle,
  CardBody,
  Col,
  Container,
  Row,
  Button,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

import Select from "react-select"
import DateRangePicker from "react-bootstrap-daterangepicker"
import moment from "moment"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import { exportOrderReport, getOrder_Reports } from "store/actions"

// Components
import NotFound from "pages/Utility/pages-404-content"
import { SLUGS_NAME } from "helpers/contants"
import ExportCSVButton from "components/Common/ExportCSVButton"
import { GET_FD_ORDERS_EXPORT } from "helpers/url_helper"

const RANGES = t => ({
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

const OrdersReports = props => {
  if (
    !props.settings?.hideThings?.find(element => element.type === "isReports")
      ?.value
  ) {
    return <NotFound />
  }

  const [loading, setLoading] = useState(false)
  const [type, setType] = useState({ value: "day", label: props.t("day") })
  const [dateFilter, setdateFilter] = useState({
    startDate: moment().subtract(29, "days"),
    endDate: moment(),
  })
  const [isBooking, setisBooking] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (
      ["basic", "premium"].includes(props.currentPlan?.billingPlan?.type) &&
      props.settings?.storeTypeEnabled[0] &&
      ["TAXI", "PICKUPDROP"].includes(
        props.settings?.storeTypeEnabled[0].storeType
      )
    ) {
      setisBooking(true)
    } else {
      setisBooking(false)
    }
  }, [props.currentPlan, props.settings])

  useEffect(() => {
    setLoading(true)
    const data = {
      startDate: moment(dateFilter.startDate).format("YYYY-MM-DD"),
      endDate: moment(dateFilter.endDate).format("YYYY-MM-DD"),
      groupBy: type.value,
    }

    props.getOrder_Reports(data)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [type, dateFilter])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Customers" breadcrumbItem={props.t("reports")} />
          <Row className="mb-3">
            <Col xs={12}>
              <div className="d-sm-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="filter mb-2 mb-sm-0">
                    <DateRangePicker
                      initialSettings={{
                        opens: "center",
                        ranges: RANGES(props.t),
                        alwaysShowCalendars: true,
                        applyButtonClasses: "btn-primary",
                        maxDate: moment(),
                        locale: {
                          applyLabel: props.t("apply"),
                          cancelLabel: props.t("cancel"),
                          customRangeLabel: props.t("custom_range"),
                          daysOfWeek: [
                            props.t("week_of_sunday"),
                            props.t("week_of_monday"),
                            props.t("week_of_tuesday"),
                            props.t("week_of_wednesday"),
                            props.t("week_of_thursday"),
                            props.t("week_of_friday"),
                            props.t("week_of_saturday"),
                          ],
                          monthNames: [
                            props.t("month_of_january"),
                            props.t("month_of_february"),
                            props.t("month_of_march"),
                            props.t("month_of_april"),
                            props.t("month_of_may"),
                            props.t("month_of_june"),
                            props.t("month_of_july"),
                            props.t("month_of_august"),
                            props.t("month_of_september"),
                            props.t("month_of_october"),
                            props.t("month_of_november"),
                            props.t("month_of_december"),
                          ],
                        },
                        ...dateFilter,
                      }}
                      onApply={(e, picker) => {
                        setdateFilter({
                          startDate: picker.startDate,
                          endDate: picker.endDate,
                        })
                      }}
                    >
                      <div
                        id="daterange"
                        class="daterange-selectbox pull-right d-flex justify-content-between align-items-center w-75"
                      >
                        <i class="bx bx-calendar"></i>
                        <span>
                          {dateFilter?.startDate?.format("DD MMM YYYY")} -{" "}
                          {dateFilter?.endDate?.format("DD MMM YYYY")}
                        </span>{" "}
                        <b class="bx bx-caret-down"></b>
                      </div>
                    </DateRangePicker>
                  </div>

                  <div className="report search ml-sm-3">
                    <Select
                      value={type}
                      options={[
                        { value: "day", label: props.t("day") },
                        { value: "week", label: props.t("week") },
                        { value: "month", label: props.t("month") },
                      ]}
                      classNamePrefix="parent-selection"
                      onChange={text => {
                        setType(text)
                      }}
                    />
                  </div>
                </div>
                {SLUGS_NAME.purposeDeliveryService === props.settings?.slug && (
                  <div className="report search ml-sm-3">
                    {/* <Button
                      type="button"
                      color="secondary"
                      outline={true}
                      className="btn-rounded waves-effect waves-light mb-2 mr-2"
                      onClick={() => dispatch(exportOrderReport())}
                    >
                      <i className="dripicons-export mr-1" />{" "}
                      {props.t("export")}
                    </Button> */}
                    <ExportCSVButton url={GET_FD_ORDERS_EXPORT} />
                  </div>
                )}
              </div>
            </Col>
            <Col className="mb-2" xs={12} md={5} lg={4} xl={5}></Col>
          </Row>

          <Row>
            <Col xs="12" md={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">
                    {props.t(isBooking ? "booking_reports" : "order_reports")}
                  </CardTitle>
                  <OrderChart
                    isBooking={isBooking}
                    t={props.t}
                    data={props.OrderGraph}
                    type={type}
                    loading={loading}
                    primaryColor={
                      props.settings?.themeSettings
                        ?.adminPrimaryBackgroundColor || "#34c38f"
                    }
                  />
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" md={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">
                    {props.t(isBooking ? "booking_status" : "order_status")}
                  </CardTitle>
                  <OrderPie
                    isBooking={isBooking}
                    t={props.t}
                    data={props.OrderStatus}
                    loading={loading}
                    primaryColor={
                      props.settings?.themeSettings
                        ?.adminPrimaryBackgroundColor || "#34c38f"
                    }
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">
                    {props.t("revenue_reports")}
                  </CardTitle>

                  <RevenueChart
                    isBooking={isBooking}
                    t={props.t}
                    data={props.OrderGraph}
                    type={type}
                    loading={loading}
                    primaryColor={
                      props.settings?.themeSettings
                        ?.adminPrimaryBackgroundColor || "#34c38f"
                    }
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

OrdersReports.propTypes = {
  // customers: PropTypes.array,
  // totalCustomers: PropTypes.number,
  // getCustomersSuccess: PropTypes.func,
  // onGetCustomers: PropTypes.func,
  // onDeleteCustomer: PropTypes.func,
  // onPutCustomersStatus: PropTypes.func,
}

const mapStateToProps = ({ reports_Orders, Settings, Billing }) => ({
  orders: reports_Orders,
  OrderStatus: reports_Orders.data?.byOrderStatus,
  OrderGraph: reports_Orders.data?.byOrder,
  settings: Settings.settings,
  currentPlan: Billing.currentPlan,
})

const mapDispatchToProps = dispatch => ({
  getOrder_Reports: data => dispatch(getOrder_Reports(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(OrdersReports))
)
