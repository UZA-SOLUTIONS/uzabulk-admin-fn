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

import SearchInput from "components/Common/SearchInput"

//i18n
import { withTranslation } from "react-i18next"

import { getFdOrders, getUserReview } from "store/actions"
import ListColumns from "./ListColumns"

const ReviewsList = ({
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
  reviewsList,
  ...props
}) => {
  const { vendorId: vendorIdParam } = useParams()
  const { vendor, driver, customer, customer_name, driver_name, vendor_name } = queryString.parse(
    props?.location?.search
  )
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
    page: 0,
    limit: 20,
    fields: [
      {
        fieldName: "",
        fieldValue: "",
      },
    ],
  })
  const [searchText, setSearchText] = useState("")
  const [userreviewsList, setReviewsList] = useState([])
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalFdOrders,
    custom: true,
    onPageChange: page => setFilter(prevState => ({ ...prevState, page })),
  }
  const { SearchBar } = Search
  console.log(props?.location?.search, "RRRRRRRRR")

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
  //   if (didMountRef.current) {
  //     if (!filter?.storeTypeId) return
  //     onGetFdOrders(filter, props?.location?.search)
  //   } else didMountRef.current = true
  // }, [JSON.stringify(filter)])

  useEffect(() => {
    props?.ongetUserReview(filter, props?.location?.search)
  }, [filter])

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
    setReviewsList(reviewsList)
  }, [reviewsList])

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

  console.log(reviewsList, "reviewsList")

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={props.t("Reviews")}
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
                    title: props.t("reviews"),
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
                      title: customer_name || props.t("profile"),
                      link: `/customers/${customer}/profile`,
                      // link: `/${activeStoreType?.storeType?.toLowerCase()}/drivers/${driver}/profile`,
                    },
                    {
                      title: props.t("reviews"),
                    },
                  ]
                  : [
                    {
                      title: props.t("user_reviews"),
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
                        data={userreviewsList || []}
                        columns={ListColumns({
                          currentUrl: activeStoreType?.storeType?.toLowerCase(),
                          vendorIdParam,
                          accesses,
                          t: props.t,
                          currency: settings?.currency,
                          query: props?.location?.search,
                          needVendor: role !== ROLES.vendor,
                          isVendor: role === ROLES.vendor,
                          activeStoreType,
                          activestoree
                        })}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>


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

// ReviewsList.propTypes = {
//   role: PropTypes.string,
//   vendorId: PropTypes.string,
//   fdOrders: PropTypes.array,
//   totalFdOrders: PropTypes.number,
//   onGetFdOrders: PropTypes.func,
// }

const mapStateToProps = ({ Login, FD_Orders, Settings, Billing, Reviews }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "",
  vendor_name: Login?.user?.name,
  fdOrders: FD_Orders.fdOrders,
  totalFdOrders: Reviews.totalReview,
  settings: Settings.settings,
  storeTypeEnabled: Settings.settings.storeTypeEnabled,
  billingPlan: Billing.currentPlan.billingPlan,

  loading: Reviews.loading,
  reviewsList: Reviews.reviewsList
})

const mapDispatchToProps = dispatch => ({
  // onGetFdOrders: (data, query) => dispatch(getFdOrders(data, query)),
  ongetUserReview: (data, query) => dispatch(getUserReview(data, query))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ReviewsList))
)
