import React, { useEffect, useState, useRef } from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"

import { withTranslation } from "react-i18next"

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
  Media,
  Button,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n

import { getDispatch, getDispatchRequests } from "store/actions"
import ListColumns, { selectRow } from "./ListColumns"
import ListData from "./ListData"

import AssignDriver from "./AssignDriver"

const Dispatcher = ({
  onPostRequestDrivers,
  onGetDispatchRequests,
  dispatchList,
  dispatchListCount,
  dispatch,
  accessLevel,
  history,
  loading,
  activeStoreId,
  activeStoreType,
  currency,
  onGetDispatch,
  availabledriver,
  slug,
  ...props
}) => {
  if (
    !props.settings?.hideThings?.find(
      element => element.type === "isDispatcher"
    )?.value
  ) {
    return <React.Fragment></React.Fragment>
  }

  const didMountRef = useRef(null)

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canBlock: false,
    canPay: false,
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
        fieldName: "status",
        fieldValue: "newtrip",
      },
    ],
  })
  const [searchText, setSearchText] = useState("")
  const [disputeList, setDisputeList] = useState([])
  const [totalCount, setTotalCount] = useState()
  const [customActiveTable, setCustomActiveTable] = useState("1")
  const [availableDriver, setAvailableDriver] = useState({})
  const [open, setOpen] = useState(false)
  const [id, setId] = useState()

  const pageOptions = {
    sizePerPage: 20,
    totalSize: dispatchListCount,
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

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  useEffect(() => {
    setFilter({ ...filter, storeTypeId: activeStoreId })
  }, [activeStoreId])

  useEffect(() => {
    if (props.settings?._id) {
      props.socket?.emit(
        "storesocket",
        { storeId: props.settings?._id },
        () => { }
      )
    }
  }, [props.settings?._id, props.socket])

  useEffect(() => {
    console.log("storeListen")
    props.socket?.on("storeListen", datad => {
      console.log("storeListen", datad)
      onGetDispatch()
      onGetDispatchRequests(filter)
    })
  }, [])

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

  useEffect(() => {
    setDisputeList(dispatchList)
    setTotalCount(dispatchListCount)
  }, [dispatchList])

  useEffect(() => {
    onGetDispatchRequests(filter)
  }, [filter])

  function toggleTable(tab, table) {
    if (customActiveTable !== tab) {
      setCustomActiveTable(tab)
    }

    setFilter(prevState => ({
      ...prevState,
      fields: [
        {
          fieldName: "status",
          fieldValue: table === "new" ? "newtrip" : "currenttrip",
        },
      ],
    }))
  }

  useEffect(() => {
    onGetDispatch()
  }, [])

  const setid = id => {
    setId(id)
    setOpen(true)
  }

  const Refresh = () => {
    onGetDispatch()
    onGetDispatchRequests(filter)
  }

  return (
    <React.Fragment>
      {open && (
        <AssignDriver
          setOpen={setOpen}
          data={availableDriver}
          id={id}
          Refresh={Refresh}
        />
      )}

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={props.t("Dispatch")}
            breadcrumbItems={[
              {
                title: props.t("dispatch"),
              },
            ]}
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
                        data={disputeList || []}
                        columns={ListColumns({
                          currentUrl:
                            disputeList?.storeType?.storeType?.toLowerCase(),
                          t: props.t,
                          setid,
                          sign: props?.settings.currency.sign,
                          slug: props?.settings?.slug
                        })}
                        bootstrap4
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
                                  <ListData
                                    totalCount={totalCount}
                                    toggleTable={toggleTable}
                                    {...props}
                                    customActiveTable={customActiveTable}
                                  />
                                </div>
                              </Col>

                              <Col
                                className="mb-3"
                                xs={12}
                                md={5}
                                lg={4}
                                xl={5}
                              >
                                <div className="text-sm-left text-md-right">
                                  {accesses.canAdd && (
                                    <Button
                                      type="button"
                                      color="success"
                                      className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                      onClick={() =>
                                        history.push(`/dispatcher/listing/add`)
                                      }
                                    >
                                      <i className="mdi mdi-plus mr-1" />
                                      {props.t("add")} {props.t("new")}{" "}
                                      {props.t("request")}
                                    </Button>
                                  )}
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

            <Col lg="12">
              <Row>
                <Col md="3">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <Media>
                        <Media body>
                          <p className="text-muted font-weight-medium">
                            {props.t("cancel_request")}
                          </p>
                          <h4 className="mb-0">{dispatch?.cancelrequest}</h4>
                        </Media>
                        <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                          <span className="avatar-title">
                            <i className={"mdi mdi-close-thick"}></i>
                          </span>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>

                <Col md="3">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <Media>
                        <Media body>
                          <p className="text-muted font-weight-medium">
                            {props.t("complete_request")}
                          </p>
                          <h4 className="mb-0">{dispatch?.completerequest}</h4>
                        </Media>
                        <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                          <span className="avatar-title">
                            <i className={"dripicons-thumbs-up"}></i>
                          </span>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="3">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <Media>
                        <Media body>
                          <p className="text-muted font-weight-medium">
                            {props.t("driver_available")}
                          </p>
                          <h4 className="mb-0">{dispatch?.driveravailable}</h4>
                        </Media>
                        <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                          <span className="avatar-title">
                            <i className={"dripicons-user"}></i>
                          </span>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="3">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <Media>
                        <Media body>
                          <p className="text-muted font-weight-medium">
                            {props.t("driver_cancel")}
                          </p>
                          <h4 className="mb-0">{dispatch?.drivercancel}</h4>
                        </Media>
                        <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                          <span className="avatar-title">
                            <i className={"mdi mdi-account-cancel-outline"}></i>
                          </span>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <Media>
                        <Media body>
                          <p className="text-muted font-weight-medium">
                            {props.t("in_route")}
                          </p>
                          <h4 className="mb-0">{dispatch?.inroute}</h4>
                        </Media>
                        <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                          <span className="avatar-title">
                            <i className={"dripicons-location"}></i>
                          </span>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <Media>
                        <Media body>
                          <p className="text-muted font-weight-medium">
                            {props.t("new_request")}
                          </p>
                          <h4 className="mb-0">{dispatch?.newtrip}</h4>
                        </Media>
                        <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                          <span className="avatar-title">
                            <i className={"dripicons-search"}></i>
                          </span>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <Media>
                        <Media body>
                          <p className="text-muted font-weight-medium">
                            {props.t("vendor_cancel")}
                          </p>
                          <h4 className="mb-0">{dispatch?.vendorcancel}</h4>
                        </Media>
                        <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                          <span className="avatar-title">
                            <i className={"mdi mdi-account-off"}></i>
                          </span>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = ({ Login, Settings, Dispatch }) => ({
  socket: Login.socket,
  settings: Settings.settings,
  dispatch: Dispatch.data,
  dispatchList: Dispatch.list,
  dispatchListCount: Dispatch.listcount,
  availabledriver: Dispatch.drivers,
  // slug: Settings.settings?.slug,
})

const mapDispatchToProps = dispatch => ({
  onGetDispatch: () => dispatch(getDispatch()),
  onGetDispatchRequests: (data, callback) =>
    dispatch(getDispatchRequests(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Dispatcher))
)
