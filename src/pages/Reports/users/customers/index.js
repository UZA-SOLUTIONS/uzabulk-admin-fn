import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

import CustomerChart from "./Customers_Graph"

import { Card, CardTitle, CardBody, Col, Container, Row } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

import Select from "react-select"
import DateRangePicker from "react-bootstrap-daterangepicker"
import moment from "moment"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import { getCustomer_Reports } from "store/actions"

// Components
import NotFound from "pages/Utility/pages-404-content"

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

  useEffect(() => {
    setLoading(true)
    const data = {
      startDate: moment(dateFilter.startDate).format("YYYY-MM-DD"),
      endDate: moment(dateFilter.endDate).format("YYYY-MM-DD"),
      groupBy: type.value,
    }

    props.getCustomer_Reports(data)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [type, dateFilter])

  const [isBooking, setisBooking] = useState(false)

  useEffect(() => {
    if (
      ["basic", "premium"].includes(props.currentPlan?.billingPlan?.type) &&
      props.settings?.storeTypeEnabled[0] &&
      ["TAXI", "PICKUPDROP", "SERVICEPROVIDER"].includes(
        props.settings?.storeTypeEnabled[0].storeType
      )
    ) {
      setisBooking(true)
    } else {
      setisBooking(false)
    }
  }, [props.currentPlan, props.settings])
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Customers" breadcrumbItem={props.t("reports")} />
          <Row className="mb-3">
            <Col xs={12}>
              <div className="d-sm-flex align-items-center">
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
            </Col>
          </Row>

          <Row>
            <Col xs="12" md={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">
                    {props.t("customer_reports")}
                  </CardTitle>

                  <CustomerChart
                    t={props.t}
                    isBooking={isBooking}
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

const mapStateToProps = ({ reports_Customers, Settings, Billing }) => ({
  OrderStatus: reports_Customers.data?.byUserStatus,
  OrderGraph: reports_Customers.data?.byUser,
  settings: Settings.settings,
  currentPlan: Billing.currentPlan,
})

const mapDispatchToProps = dispatch => ({
  getCustomer_Reports: data => dispatch(getCustomer_Reports(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(OrdersReports))
)
