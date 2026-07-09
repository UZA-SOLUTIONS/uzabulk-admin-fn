import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, useParams } from "react-router-dom"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import DateRangePicker from "react-bootstrap-daterangepicker"
import moment from "moment"
import queryString from "query-string"

import "bootstrap-daterangepicker/daterangepicker.css"

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
  Button,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

import {
  ROLES,
  GET_SERVICE_NAME,
  SLUGS_NAME as slugname,
} from "helpers/contants"

import {
  getTransactions,
  exportTransactions,
  exportWalletTransactions,
} from "store/actions"
import ListColumns from "./ListColumns"
import DetailsModal from "./DetailsModal"
import ExportCSVButton from "components/Common/ExportCSVButton"
import { WALLET_TRANSACTION_EXPORT } from "helpers/url_helper"

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

const Transactions = ({
  accessList,
  accessLevel,
  history,
  storeTypes,
  currency,
  transactions,
  totalTransactions,
  onGetTransactions,
  loading,
  activeStoreType,
  onExportTransactions,
  ...props
}) => {
  // console.log(activeStoreType, "activeStoreType");
  const { vendorId: _vendorIdParam, driver, customers } = useParams()
  const { vendor_name, driver_name } = queryString.parse(
    props?.location?.search
  )

  const [vendorIdParam, setvendorIdPara] = useState()
  const [dateFilter, setdateFilter] = useState({
    startDate: moment().subtract(29, "days"),
    endDate: moment(),
  })
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canBlock: false,
  })
  const [storeAccesses, setstoreAccesses] = useState({})
  const [filter, setFilter] = useState({
    userType: ["VENDOR", "DRIVER"],
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 20,
    search: "",
    type: "debit",
    fields: [
      {
        fieldName: "",
        fieldValue: "",
      },
    ],
  })
  const [detailsModal, setdetailsModal] = useState({
    isOpen: false,
    details: null,
  })
  const [searchText, setSearchText] = useState("")
  const [transactionsList, setTransactionsList] = useState([])

  console.log("transactionsList", transactionsList)
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalTransactions,
    custom: true,
    onPageChange: page => setFilter(prevState => ({ ...prevState, page })),
  }

  useEffect(() => {
    if (!accessLevel) {
      const data = {
        canAdd: true,
        canEdit: true,
        canDelete: true,
        canBlock: true,
      }

      return setaccesses(data)
    }

    const data = {
      canAdd: false,
      canEdit: false,
      canDelete: false,
      canBlock: false,
    }

    accessLevel?.map(item => {
      switch (item.label) {
        case "CREATE":
          data.canAdd = item.value
          break

        case "UPDATE":
          data.canEdit = item.value
          break

        case "DELETE":
          data.canDelete = item.value
          break

        case "BLOCK":
          data.canBlock = item.value
          break
      }
    })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  useEffect(() => {
    if (!accessList) {
      return setstoreAccesses(null)
    }
    let data = {}

    accessList?.map(item => {
      data[item.storeType] = ((item?.navigation?.filter(
        nav => nav.type === "orders"
      ) || [])[0]?.permissions || [])[0]?.value
    })

    setstoreAccesses(data)
  }, [JSON.stringify(accessList)])

  useEffect(() => {
    const data = { ...filter }

    data.startDate = dateFilter?.startDate?.format("YYYY-MM-DD")
    data.endDate = dateFilter?.endDate?.format("YYYY-MM-DD")

    let vendor = ""

    if (_vendorIdParam || activeStoreType?.storeVendorType === "SINGLE") {
      switch (props?.role) {
        case ROLES.admin:
        case ROLES.staff:
          vendor =
            activeStoreType?.storeVendorType === "SINGLE"
              ? activeStoreType?.singleVendorId
              : _vendorIdParam
          break

        case ROLES.vendor:
          vendor = props?.vendorId
          break
        case ROLES.subVendor:
          vendor = props?.vendorId
          break

        default:
          break
      }
    }
    if (vendor) {
      data.userType = ["VENDOR"]
      data.type = null
      data.user = vendor
    }

    if (driver) {
      data.userType = ["DRIVER"]
      data.type = null
      data.user = driver
    }
    if (customers) {
      data.userType = ["USER"]
      data.type = null
      data.user = customers
    }

    if (props?.role === ROLES.vendor) {
      data.userType = ["VENDOR"]
      data.type = null
      data.user = props?.vendorId
    }
    if (props?.role === ROLES.subVendor) {
      data.userType = ["VENDOR"]
      data.type = null
      data.user = props?.subVendorId
    }

    setvendorIdPara(vendor)
    onGetTransactions(data)
    setTransactionsList([])
  }, [
    JSON.stringify(filter),
    JSON.stringify(dateFilter),
    props?.activeStoreId,
    props?.role,
    props?.vendorId,
    _vendorIdParam,
  ])

  useEffect(() => {
    setTransactionsList(transactions || [])
  }, [transactions])

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (type, { searchText, sortField, sortOrder }) => {
    if (type === "search") {
      setSearchText(searchText)
    }

    if (type === "sort") {
      if (sortField == "createdAt") {
        sortField = "date_created_utc"
      }

      if (sortOrder == "desc") {
        sortOrder = -1
      } else if (sortOrder == "asc") {
        sortOrder = 1
      }

      setFilter(prevState => ({
        ...prevState,
        orderBy: sortField,
        order: sortOrder,
      }))
    }
  }

  const toggleDetailsModal = details => {
    setdetailsModal(prevState => ({
      isOpen: !prevState.isOpen,
      details,
    }))
  }

  const pageHeader = [slugname.dewe, slugname.zaza].includes(props?.slug)
    ? props.t("store")
    : GET_SERVICE_NAME({
        storeType: activeStoreType?.storeType,
      })

  console.log(vendorIdParam, "vendorIdParam", customers, driver)

  return (
    <React.Fragment>
      <DetailsModal
        {...detailsModal}
        toggle={toggleDetailsModal}
        storeAccesses={storeAccesses}
      />

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Content Pages"
            breadcrumbItem={
              props.t(
                vendorIdParam
                  ? props.t("vendor")
                  : driver
                  ? props.t("driver")
                  : customers
                  ? props.t("customers")
                  : props.t("withdrawal")
              ) +
              " " +
              props.t("transactions")
            }
            breadcrumbItems={
              vendorIdParam
                ? [
                    ...(activeStoreType?.storeVendorType !== "SINGLE" &&
                    props?.role !== ROLES.vendor
                      ? [
                          {
                            title: pageHeader + "s",
                            link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                              {
                                storeType: activeStoreType?.storeType,
                              }
                            ).toLowerCase()}s`,
                          },
                          {
                            title:
                              (props?.role === ROLES.vendor
                                ? props.vendor_name
                                : vendor_name) || props.t("profile"),
                            link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                              {
                                storeType: activeStoreType?.storeType,
                              }
                            ).toLowerCase()}s/${vendorIdParam}/profile`,
                          },
                        ]
                      : []),
                    {
                      title: props.t("transactions"),
                    },
                  ]
                : driver
                ? [
                    {
                      title: props.t("drivers"),
                      // link: `/${activeStoreType?.storeType?.toLowerCase()}/drivers`,
                      link: `/drivers`,
                    },
                    {
                      title: driver_name || props.t("profile"),
                      link: `/drivers/${driver}/profile`,
                      // link: `/${activeStoreType?.storeType?.toLowerCase()}/drivers/${driver}/profile`,
                    },
                    {
                      title: props.t("transactions"),
                    },
                  ]
                : customers
                ? [
                    {
                      title: props.t("customers"),
                      // link: `/${activeStoreType?.storeType?.toLowerCase()}/drivers`,
                      link: `/customers`,
                    },
                    {
                      title: driver_name || props.t("profile"),
                      link: `/customers/${customers}/profile`,
                      // link: `/${activeStoreType?.storeType?.toLowerCase()}/drivers/${driver}/profile`,
                    },
                    {
                      title: props.t("transactions"),
                    },
                  ]
                : [
                    {
                      title: props.t("transactions"),
                    },
                  ]
            }
          />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="_id"
                        data={transactionsList || []}
                        columns={ListColumns(
                          toggleDetailsModal,
                          history,
                          accesses,
                          props.t,
                          currency,
                          vendorIdParam,
                          driver
                        )}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row>
                              <Col sm={8} className="mb-2">
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
                                    console.log("apply ", e, picker)

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
                                      {dateFilter?.startDate?.format(
                                        "DD MMM YYYY"
                                      )}{" "}
                                      -{" "}
                                      {dateFilter?.endDate?.format(
                                        "DD MMM YYYY"
                                      )}
                                    </span>{" "}
                                    <b class="bx bx-caret-down"></b>
                                  </div>
                                </DateRangePicker>
                              </Col>

                              <Col sm={4} className="mb-2">
                                <div className="text-left text-sm-right">
                                  {/* <Button
                                    type="button"
                                    color="secondary"
                                    outline={true}
                                    className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                    onClick={() =>
                                      onExportTransactions(
                                        `?${vendorIdParam || driver || customers
                                          ? "user=" +
                                          (vendorIdParam || driver || customers)
                                          : "type=debit"
                                        }&startDate=${dateFilter?.startDate?.format("YYYY-MM-DD")}&endDate=${dateFilter?.endDate?.format("YYYY-MM-DD")}`
                                      )
                                    }
                                  >
                                    <i className="dripicons-export mr-1" />{" "}
                                    {props.t("export")}
                                  </Button> */}
                                  <ExportCSVButton
                                    url={
                                      WALLET_TRANSACTION_EXPORT +
                                      `?${
                                        vendorIdParam || driver || customers
                                          ? "user=" +
                                            (vendorIdParam ||
                                              driver ||
                                              customers)
                                          : "type=debit"
                                      }&startDate=${dateFilter?.startDate?.format(
                                        "YYYY-MM-DD"
                                      )}&endDate=${dateFilter?.endDate?.format(
                                        "YYYY-MM-DD"
                                      )}`
                                    }
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col xl="12">
                                <div className="table-responsive spinner-content">
                                  <BootstrapTable
                                    responsive
                                    remote
                                    bordered={false}
                                    striped={false}
                                    classes={
                                      "table table-centered table-nowrap"
                                    }
                                    headerWrapperClasses={"thead-light"}
                                    {...toolkitProps.baseProps}
                                    onTableChange={handleTableChange}
                                    {...paginationTableProps}
                                    defaultSorted={[
                                      {
                                        dataField: "createdAt",
                                        order: "desc",
                                      },
                                    ]}
                                    sort={{
                                      sortCaret: order =>
                                        order === "asc" ? (
                                          <span className="caret">
                                            <i className="bx bx-caret-up" />
                                          </span>
                                        ) : order === "desc" ? (
                                          <span className="caret">
                                            <i className="bx bx-caret-down" />
                                          </span>
                                        ) : null,
                                    }}
                                  />

                                  {loading && (
                                    <div className="spinner">
                                      <Spinner color="primary" />
                                    </div>
                                  )}
                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Transactions.propTypes = {
  transactions: PropTypes.array,
  totalTransactions: PropTypes.number,
  onGetTransactions: PropTypes.func,
}

const mapStateToProps = ({ Login, Settings, transactions }) => ({
  accessList: (Login?.user?.accessLevel?.permissions?.filter(
    permission => permission.type === "storetypes"
  ) || [])[0]?.storeTypes,
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id,
  subVendorId: Login?.user?.vendor,
  vendor_name: Login?.user?.name,
  storeTypes: Settings?.settings?.storeTypeEnabled,
  currency: Settings?.settings?.currency,
  loading: transactions.loading,
  transactions: transactions.transactions,
  totalTransactions: transactions.totalTransactions,
  slug: Settings?.settings?.slug,
})

const mapDispatchToProps = dispatch => ({
  onGetTransactions: data => dispatch(getTransactions(data)),
  onExportTransactions: (query = "") =>
    dispatch(exportWalletTransactions(query)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Transactions))
)
