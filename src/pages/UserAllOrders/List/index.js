import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link, useParams } from "react-router-dom"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import queryString from "query-string"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap"

import { GET_SERVICE_NAME, ROLES } from "helpers/contants"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"
import OrderListFilters from "components/Common/OrderListFilters"
import {
  buildOrdersListPayload,
  defaultOrderDateFilter,
  getOrderListPageOptions,
  isShowingAllOrders,
} from "helpers/orderListFilters"

//i18n
import { withTranslation } from "react-i18next"

import { getUserOrder, getUserReview } from "store/actions"
import ListColumns from "./ListColumns"

const UserAllOrders = ({
  accessLevel,
  role,
  vendorId,
  history,
  fdOrders,
  totalFdOrders,
  onGetFdOrders,
  loading,
  activeStoreId,
  activeStoreType,
  settings,
  ordersList,
  ...props
}) => {
  const { vendor, driver, customer, driver_name, customer_name, vendor_name } =
    queryString.parse(props?.location?.search)
  const didMountRef = useRef(null)

  // const[activestore,setactivestore]=useState()

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canBlock: false,
  })
  const [orderStatus, setorderStatus] = useState([
    "pending",
    "confirmed",
    "completed",
    "cancelled",
  ])
  const [filter, setFilter] = useState({
    storeTypeId: "",
    orderBy: "date_created_utc", //key name
    order: -1, // asc: 1, desc: -1
    page: 1,
    limit: 20,
    paymentMethod: "",
    deliveryType: "",
    fields: [{ fieldName: "", fieldValue: "" }],
  })
  const [searchText, setSearchText] = useState("")
  const [userOrderList, setOrdersList] = useState([])
  const showingAllOrders = isShowingAllOrders(filter.limit)
  const pageOptions = getOrderListPageOptions({
    filter,
    setFilter,
    totalCount: totalFdOrders,
    listLength: userOrderList.length,
    t: props.t,
  })
  const { SearchBar } = Search

  const [dateFilter, setdateFilter] = useState(defaultOrderDateFilter)

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

  // useEffect(() => {
  //   props?.ongetUserOrder(filter, props?.location?.search)
  // }, [filter])

  useEffect(() => {
    props?.ongetUserOrder(
      buildOrdersListPayload(filter, dateFilter),
      props?.location?.search
    )
  }, [filter, dateFilter])

  useEffect(() => {
    setOrdersList(ordersList)
  }, [ordersList])

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

  const onStatusChange = value => {
    const fieldName = !!value ? "orderStatus" : ""
    const fieldValue = value

    setFilter(prevState => ({
      ...prevState,
      fields: [{ fieldName, fieldValue }],
    }))
  }

  const onSearch = event => {
    event?.preventDefault()

    setFilter(prevState => ({ ...prevState, search: searchText, page: 1 }))
  }

  const [activestoree, setActiveStore] = useState(null) // to check if store is single taxior single pickupdrop
  //forc replacing orderid with booking id
  useEffect(() => {
    if (["basic", "premium"].includes(props.billingPlan?.type)) {
      setActiveStore(props.storeTypeEnabled[0]?.storeType)
    }
  }, [props.billingPlan, props.storeTypeEnabled])

  console.log(customer, driver, "DRIVERS")

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={props.t("Orders")}
            breadcrumbItems={
              driver
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
                    title: props.t("orders"),
                  },
                ]
                : vendor
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
                      title: props.t("orders"),
                    },
                  ]
                  : customer
                    ? [
                      {
                        title: props.t("customers"),
                        // link: `/${activeStoreType?.storeType?.toLowerCase()}/drivers`,
                        link: `/customers`,
                      },
                      {
                        title: props.t("profile"),
                        link: `/customers/${customer}/profile`,
                        // link: `/${activeStoreType?.storeType?.toLowerCase()}/drivers/${driver}/profile`,
                      },
                      {
                        title: props.t("orders"),
                      },
                    ]
                    : [
                      {
                        title: props.t("user_orders"),
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
                        data={userOrderList || []}
                        columns={ListColumns({
                          currentUrl: activeStoreType?.storeType?.toLowerCase(),
                          accesses,
                          t: props.t,
                          currency: settings?.currency,
                          query: props?.location?.search,
                          needVendor: role !== ROLES.vendor,
                          isVendor: role === ROLES.vendor,
                          activeStoreType,
                          activestoree,
                        })}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            {/* <Row>
                              <Col
                                className="mb-3"
                                xs={12}
                                md={7}
                                lg={8}
                                xl={7}
                              >
                                <div className="custom-flex-sm d-flex align-items-center">
                                  <div className="filter">
                                    <div className="form-group d-flex align-items-center mb-0">
                                      <label
                                        className="mb-0"
                                        style={{ minWidth: "54px" }}
                                      >
                                        {props.t("filter_by")}:
                                      </label>

                                      <div className="w-auto pl-3">
                                        <select
                                          className="custom-select w-100"
                                          onChange={e =>
                                            onStatusChange(e.target.value)
                                          }
                                          value={filter?.fields[0]?.fieldValue}
                                          style={{ minWidth: "106px" }}
                                        >
                                          <option value="">
                                            {props.t("status")}
                                          </option>
                                          {orderStatus?.map(item => (
                                            <option value={item}>
                                              {props.t(item)}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="search d-flex align-items-center">
                                    <div className="pl-3">
                                      <SearchInput
                                        {...toolkitProps.searchProps}
                                        triggerSearch={onSearch}
                                        placeholder={props.t("search")}
                                        searchText={searchText}
                                      />
                                    </div>

                                    {!!filter?.fields[0]?.fieldName ||
                                      (!!filter.search && (
                                        <div
                                          className="mr-4"
                                          style={{
                                            minWidth: "73px",
                                          }}
                                        >
                                          <Link
                                            to="#"
                                            onClick={e => {
                                              e.preventDefault()
                                              setFilter(prevState => ({
                                                ...prevState,
                                                fields: [
                                                  {
                                                    fieldName: "",
                                                    fieldValue: "",
                                                  },
                                                ],
                                                search: "",
                                              }))
                                              setSearchText("")
                                            }}
                                            className=""
                                          >
                                            {props.t("clear_filters")}
                                          </Link>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </Col>

                              <Col
                                className="mb-3"
                                xs={12}
                                md={5}
                                lg={4}
                                xl={5}
                              ></Col>
                            </Row> */}

                            <Row>
                              <Col className="mb-3" xs={12}>
                                <OrderListFilters
                                  t={props.t}
                                  filter={filter}
                                  setFilter={setFilter}
                                  searchText={searchText}
                                  setSearchText={setSearchText}
                                  dateFilter={dateFilter}
                                  setDateFilter={setdateFilter}
                                  onSearch={onSearch}
                                  searchProps={toolkitProps.searchProps}
                                  showDeliveryType={
                                    !["TAXI", "PICKUPDROP", "CARRENTAL", "AIRBNB"].includes(
                                      activeStoreType?.storeType
                                    )
                                  }
                                  onClear={clearAllFilters}
                                  totalCount={totalFdOrders}
                                />
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
                            {!showingAllOrders && totalFdOrders > (filter.limit || 20) && (
                              <Row className="align-items-md-center mt-30">
                                <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </Col>
                              </Row>
                            )}
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

const mapStateToProps = ({ Login, FD_Orders, Settings, Billing, Reviews }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "",
  vendor_name: Login?.user?.name,
  fdOrders: FD_Orders.fdOrders,
  totalFdOrders: Reviews.totalOrder,
  settings: Settings.settings,
  storeTypeEnabled: Settings.settings.storeTypeEnabled,
  billingPlan: Billing.currentPlan.billingPlan,

  loading: Reviews.loading,
  ordersList: Reviews.orderList,
})

const mapDispatchToProps = dispatch => ({
  ongetUserOrder: (data, query) => dispatch(getUserOrder(data, query)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserAllOrders))
)
