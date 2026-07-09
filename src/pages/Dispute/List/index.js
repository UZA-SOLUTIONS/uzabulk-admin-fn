import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import AnimateHeight from "react-animate-height"
import queryString from "query-string"
import { useParams } from "react-router-dom"
// import queryString from "query-string"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap"

import SearchInput from "components/Common/SearchInput"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

import { getDisputes } from "store/actions"
import ListColumns, { selectRow } from "./ListColumns"

// Components
import NotFound from "pages/Utility/pages-404-content"
import { ROLES } from "helpers/contants"

const FdDispute = ({
  accessLevel,
  history,
  loading,
  activeStoreId,
  activeStoreType,
  currency,
  onGetDispute,
  disputes,
  role,
  totalDisputes,
  ...props
}) => {
  if (
    !props.settings?.hideThings?.find(element => element.type === "isDispute")
      ?.value
  ) {
    return <NotFound />
  }

  const didMountRef = useRef(null)


  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canBlock: false,
    canPay: false,
  })
  const [selected, setSelected] = useState([])
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    fdDriverId: null,
  })
  const [confirmSelectedModal, setConfirmSelectedModal] = useState({
    isOpen: false,
  })

  const [filter, setFilter] = useState({
    storeTypeId: "",
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 20,
    search: "",
    fields: [
      {
        fieldName: "",
        fieldValue: "",
      },
    ],
  })
  const [searchText, setSearchText] = useState("")
  const [disputeList, setDisputeList] = useState([])
  const [totalCount, setTotalCount] = useState()

  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalCount,
    custom: true,
    onPageChange: page => setFilter(prevState => ({ ...prevState, page })),
  }
  const { SearchBar } = Search

  useEffect(() => {
    if (!accessLevel) {
      const data = {
        canAdd: true,
        canEdit: true,
        canDelete: true,
        canBlock: true,
        canPay: true,
      }

      return setaccesses(data)
    }

    const data = {
      canAdd: false,
      canEdit: false,
      canDelete: false,
      canBlock: false,
      canPay: false,
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

    props?.accessLevels
      ?.filter(level => level.type === "accounting")
      ?.map(level => {
        level?.permissions?.map(item => {
          switch (item.label) {
            case "PAY":
              data.canPay = item.value
              break
          }
        })
      })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  useEffect(() => {
    setFilter({ ...filter, storeTypeId: activeStoreId })
  }, [activeStoreId])

  // console.log(props.storeTypeEnabled, props.currentPlan, "PP");

  const [activestoree, setActiveStore] = useState(null)
  useEffect(() => {

    if (["basic", "premium"].includes(props.billingPlan?.type)) {
      setActiveStore(props.storeTypeEnabled[0]?.storeType)
    }

  }, [props.billingPlan, props.storeTypeEnabled])

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

  const toggleConfirmModal = fdDriverId => {
    setConfirmModal(prevState => ({
      isOpen: !prevState.isOpen,
      fdDriverId,
    }))
  }

  const toggleConfirmSelectedModal = () => {
    setConfirmSelectedModal(prevState => ({ isOpen: !prevState.isOpen }))
  }
  // console.log(activestore, "activestore");

  const onStatusChange = value => {
    const fieldName = !!value ? "status" : ""
    const fieldValue = value

    setFilter(prevState => ({
      ...prevState,
      fields: [
        {
          fieldName,
          fieldValue,
        },
      ],
    }))
  }

  const onSearch = event => {
    event.preventDefault()

    setFilter(prevState => ({ ...prevState, search: searchText, page: 1 }))
  }

  const { vendorId: vendorIdParam } = useParams()

  useEffect(() => {
    if (didMountRef.current) {
      onGetDispute(filter)
      setDisputeList(disputes)
    } else didMountRef.current = true
  }, [filter])

  useEffect(() => {
    setDisputeList(disputes || [])
    setTotalCount(totalDisputes)
  }, [disputes])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={props.t("Disputes")}
            breadcrumbItems={[
              {
                title: props.t("dispute"),
              },
            ]}
          />
          {/* {console.log(disputeList, "currentUrl")} */}

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
                        data={disputeList || []}
                        columns={ListColumns({
                          currentUrl: activeStoreType?.storeType?.toLowerCase(),
                          vendorIdParam,
                          accesses,
                          t: props.t,
                          currency,
                          isVendor: role === ROLES.vendor,
                          activestoree: activestoree
                        })}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row>
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
                                          value={filter.fields[0]?.fieldValue}
                                          style={{ minWidth: "106px" }}
                                        >
                                          <option value="">
                                            {props.t("status")}
                                          </option>
                                          <option value="closed">
                                            {props.t("close")}
                                          </option>
                                          <option value="open">
                                            {props.t("open")}
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  {/* <div className="search d-flex align-items-center">
                                    <div className="pl-3">
                                      <SearchInput
                                        {...toolkitProps.searchProps}
                                        triggerSearch={onSearch}
                                        placeholder={props.t("search")}
                                        searchText={searchText}
                                      />
                                    </div>

                                    {!!filter.fieldName ||
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
                                                fieldName: "",
                                                fieldValue: "",
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
                                  </div> */}
                                </div>
                              </Col>

                              <Col
                                className="mb-3"
                                xs={12}
                                md={5}
                                lg={4}
                                xl={5}
                              ></Col>
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
                                  // selectRow={selectRow({
                                  //   selected,
                                  //   onSelect,
                                  //   onSelectAll,
                                  // })}
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

const mapStateToProps = ({ Login, Settings, Disputes, Billing }) => ({
  accessLevel: Login?.user?.accessLevel?.permissions || [],
  role: Login?.user?.role || "",
  settings: Settings?.settings,
  currency: Settings?.settings?.currency,
  disputes: Disputes.Data.data,
  singleDispute: Disputes.Dispute,
  totalDisputes: Disputes.Data.totalcount,
  billingPlan: Billing.currentPlan.billingPlan,
  storeTypeEnabled: Settings.settings.storeTypeEnabled,
})

const mapDispatchToProps = dispatch => ({
  onGetDispute: data => dispatch(getDisputes(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FdDispute))
)
