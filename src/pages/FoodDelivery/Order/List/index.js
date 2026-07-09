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

import { getFdOrders } from "store/actions"
import ListColumns from "./ListColumns"

const FdOrders = ({
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
  ...props
}) => {
  const { vendorId: vendorIdParam } = useParams()
  const { vendor, driver, customer, vendor_name } = queryString.parse(
    props?.location?.search
  )
  // const[activestore,setactivestore]=useState()

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canBlock: false,
  })
  const [filter, setFilter] = useState({
    storeTypeId: "",
    orderBy: "date_created_utc", //key name
    order: -1, // asc: 1, desc: -1
    page: 1,
    limit: 20,
    paymentMethod: "",
    deliveryType: "",
    fields: [
      {
        fieldName: "",
        fieldValue: "",
      },
    ],
  })

  const [searchText, setSearchText] = useState("")
  const [fdOrdersList, setFdOrdersList] = useState([])
  const showingAllOrders = isShowingAllOrders(filter.limit)
  const pageOptions = getOrderListPageOptions({
    filter,
    setFilter,
    totalCount: totalFdOrders,
    listLength: fdOrdersList.length,
    t: props.t,
  })
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

  useEffect(() => {
    if (!filter?.storeTypeId) return
    onGetFdOrders(
      buildOrdersListPayload(filter, dateFilter),
      props?.location?.search
    )
  }, [JSON.stringify(filter), dateFilter, props?.location?.search])

  useEffect(() => {
    if ([ROLES.admin, ROLES.staff].includes(role)) {
      setFilter(prevState => ({
        ...prevState,
        vendor: vendorIdParam,
        storeTypeId: activeStoreId,
      }))
    } else if (role === ROLES.vendor) {
      setFilter(prevState => ({
        ...prevState,
        vendor: vendorId,
        storeTypeId: activeStoreId,
      }))
    }
  }, [role, vendorId, vendorIdParam, activeStoreId])

  useEffect(() => {
    setFdOrdersList(fdOrders || [])
  }, [fdOrders])

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

  const onSearch = event => {
    event?.preventDefault()

    setFilter(prevState => ({ ...prevState, search: searchText, page: 1 }))
  }

  const clearAllFilters = () => {
    setFilter(prev => ({
      ...prev,
      page: 1,
      search: "",
      paymentMethod: "",
      deliveryType: "",
      fields: [{ fieldName: "", fieldValue: "" }],
    }))
    setSearchText("")
    setdateFilter(defaultOrderDateFilter())
  }

  const [activestoree, setActiveStore] = useState(null) // to check if store is single taxior single pickupdrop
  //forc replacing orderid with booking id
  useEffect(() => {
    if (["basic", "premium"].includes(props.billingPlan?.type)) {
      setActiveStore(props.storeTypeEnabled[0]?.storeType)
    }
  }, [props.billingPlan, props.storeTypeEnabled])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={props.t("Orders")}
            breadcrumbItems={
              !!vendor
                ? [
                    ...(activeStoreType?.storeVendorType !== "SINGLE" &&
                    role !== ROLES.vendor
                      ? [
                          {
                            title:
                              GET_SERVICE_NAME({
                                storeType: activeStoreType?.storeType,
                                name: "order",
                              }) + "s",
                            link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                              {
                                storeType: activeStoreType?.storeType,
                                name: "order",
                              }
                            ).toLowerCase()}s`,
                          },
                        ]
                      : []),
                    {
                      title:
                        (role === ROLES.vendor
                          ? props.vendor_name
                          : vendor_name) || props.t("profile"),
                      link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                        {
                          storeType: activeStoreType?.storeType,
                          name: "order",
                        }
                      ).toLowerCase()}s/${
                        role === ROLES.vendor
                          ? vendorId
                          : vendorIdParam || vendor
                      }/profile`,
                    },
                    {
                      title: props.t(
                        GET_SERVICE_NAME({
                          storeType: activeStoreType?.storeType,
                          name: "order",
                        }) + "s"
                      ),
                    },
                  ]
                : [
                    {
                      title: props.t(
                        GET_SERVICE_NAME({
                          storeType: activeStoreType?.storeType,
                          name: "order",
                        }) + "s"
                      ),
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
                        data={fdOrdersList || []}
                        columns={ListColumns({
                          currentUrl: activeStoreType?.storeType?.toLowerCase(),
                          vendorIdParam,
                          accesses,
                          t: props.t,
                          currency: settings?.currency,
                          slug: settings?.slug,
                          query: props?.location?.search,
                          needVendor:
                            role !== ROLES.vendor || role !== ROLES.subVendor,
                          isVendor:
                            role === ROLES.vendor || role === ROLES.subVendor,
                          activeStoreType,
                          activestoree,
                        })}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
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

FdOrders.propTypes = {
  role: PropTypes.string,
  vendorId: PropTypes.string,
  fdOrders: PropTypes.array,
  totalFdOrders: PropTypes.number,
  onGetFdOrders: PropTypes.func,
}

const mapStateToProps = ({ Login, FD_Orders, Settings, Billing }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "",
  vendor_name: Login?.user?.name,
  loading: FD_Orders.loading,
  fdOrders: FD_Orders.fdOrders,
  totalFdOrders: FD_Orders.totalFdOrders,
  settings: Settings.settings,
  storeTypeEnabled: Settings.settings.storeTypeEnabled,
  billingPlan: Billing.currentPlan.billingPlan,
})

const mapDispatchToProps = dispatch => ({
  onGetFdOrders: (data, query) => dispatch(getFdOrders(data, query)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FdOrders))
)
