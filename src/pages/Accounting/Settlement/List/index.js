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

import { putFdDriversStatus, SettlementList } from "store/actions"
import ListColumns, { selectRow } from "./ListColumns"
import PayModal from "./PayModal"
import { GET_SERVICE_NAME } from "helpers/contants"
import { usePermissions } from "helpers/permissions"

const Settlement = ({
  accessLevel,
  accessLevels,
  history,
  fdDrivers,
  totalFdDrivers,
  onGetFdDrivers,
  onDeleteFdDriver,
  onPutFdDriversStatus,
  loading,
  activeStoreId,
  activeStoreType,
  currency,
  onExportDrivers,
  onImportDrivers,
  onSettlementList,
  settings,
  ...props
}) => {
  const didMountRef = useRef(null)
  const [activestore, setactivestore] = useState()

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
  const [payModal, setpayModal] = useState({
    isOpen: false,
    driverId: null,
    driver: null,
  })
  const [payAdjustmentModal, setpayAdjustmentModal] = useState({
    isOpen: false,
    driverId: null,
    driver: null,
  })
  const [importModal, setimportModal] = useState({ isOpen: false })
  const [filter, setFilter] = useState({
    orderBy: "date_created_utc",
    limit: 24,
    search: "",

    sortOrder: -1,
    paged: 1,
    fields: [
      {
        fieldName: "",
        fieldValue: "",
      },
      {
        fieldName: "",
        fieldValue: "",
      },
    ],
  })
  const [searchText, setSearchText] = useState("")
  const [fdDriversList, setFdDriversList] = useState([])
  const hasPermission = usePermissions()

  console.log("fdDriversList", fdDriversList)
  const pageOptions = {
    sizePerPage: 24,
    totalSize: totalFdDrivers,
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
      accessLevels
        ?.filter(item => item.label === "Drivers")[0]
        ?.permissions.map(val => {
          switch (val.label) {
            case "CREATE":
              data.canAdd = val.value
              break
            case "UPDATE":
              data.canEdit = val.value
              break
            case "DELETE":
              data.canDelete = val.value
              break
          }
        })
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
  }, [JSON.stringify(accessLevel), accessLevels])

  useEffect(() => {
    onSettlementList(filter)
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setFdDriversList(fdDrivers || [])
  }, [fdDrivers])

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

  const togglePayModal = (fdDriverId, fdDriver) => {
    setpayModal(prevState => ({
      isOpen: !prevState.isOpen,
      driverId: fdDriverId,
      driver: fdDriver,
    }))
  }

  const onPaySuccess = (fdDriverId, fdDriver) => {
    togglePayModal(fdDriverId, fdDriver)
    onSettlementList(filter)
  }

  const togglePayAdjustmentModal = (fdDriverId, fdDriver) => {
    setpayAdjustmentModal(prevState => ({
      isOpen: !prevState.isOpen,
      driverId: fdDriverId,
      driver: fdDriver,
    }))
  }

  // const onStatusChange = value => {
  //   const fieldName = !!value ? "status" : ""
  //   const fieldValue = value

  //   setFilter(prevState => ({
  //     ...prevState,
  //     fieldName,
  //     fieldValue,
  //   }))
  // }

  const onStatusChange = value => {
    const fieldName = !!value ? "status" : ""
    const fieldValue = value

    setFilter(prevState => ({
      ...prevState,
      fields: [{ fieldName, fieldValue }, prevState.fields[1]],
    }))
  }

  const onSortStatusChange = value => {
    const fieldName = !!value ? "role" : ""
    const fieldValue = value

    setFilter(prevState => ({
      ...prevState,
      fields: [prevState.fields[0], { fieldName, fieldValue }],
    }))
  }

  const onFilterStatus = value => {
    setFdDriversList(fdDriversList?.filter(fd => fd.role == value))
  }

  const onSearch = event => {
    event.preventDefault()

    setFilter(prevState => ({ ...prevState, search: searchText, page: 1 }))
  }

  const handleFdDriverStatusChange = status => {
    const callback = () => {
      setSelected([])
      onGetFdDrivers(activeStoreType?.storeType?.toLowerCase(), filter)
    }

    onPutFdDriversStatus(
      activeStoreType?.storeType?.toLowerCase(),
      { _id: selected, status, storeTypeId: activeStoreId },
      callback
    )
  }

  // this component list out all pending settlement of drivers and vendors

  return (
    <React.Fragment>
      <PayModal
        toggle={togglePayModal}
        {...payModal}
        storeTypeId={activeStoreId}
        onPaySuccess={onPaySuccess}
      />

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={props.t("Settlement")}
            breadcrumbItems={[
              {
                title: props.t("settlement"),
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
                        data={fdDriversList || []}
                        columns={ListColumns(
                          toggleConfirmModal,
                          togglePayModal,
                          togglePayAdjustmentModal,
                          accesses,
                          props.t,
                          currency,
                          activestore,
                          props.demo,
                          hasPermission
                        )}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row>
                              <Col
                                className="mb-3"
                                xs={12}
                                md={12}
                                lg={12}
                                xl={12}
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
                                          value={filter.fieldValue}
                                          style={{ minWidth: "106px" }}
                                        >
                                          <option value="">
                                            {props.t("all")}
                                          </option>
                                          <option value="approved">
                                            {props.t("approved")}
                                          </option>
                                          <option value="rejected">
                                            {props.t("rejected")}
                                          </option>
                                          <option value="blocked">
                                            {props.t("blocked")}
                                          </option>
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
                                  </div>

                                  <div className="filter ml-2">
                                    <div className="form-group d-flex align-items-center mb-0">
                                      <label
                                        className="mb-0"
                                        style={{ minWidth: "54px" }}
                                      >
                                        {props.t("filter_by_role")}:
                                      </label>

                                      <div className="w-auto pl-3">
                                        <select
                                          className="custom-select w-100"
                                          onChange={e =>
                                            onSortStatusChange(e.target.value)
                                          }
                                          value={filter.fieldValue}
                                          style={{ minWidth: "106px" }}
                                        >
                                          <option value="">
                                            {props.t("all")}
                                          </option>
                                          <option value="DRIVER">
                                            {props.t("driver")}
                                          </option>
                                          <option value="VENDOR">
                                            {props.t("vendor")}
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>

                            {(accesses.canEdit || accesses.canDelete) && (
                              <AnimateHeight
                                duration={500}
                                height={selected.length > 0 ? "auto" : 0}
                              >
                                <div className="custom-flex-xs d-flex align-items-center mb-3">
                                  {accesses.canEdit && (
                                    <div className="filter form-group d-flex align-items-center mb-0 mr-3">
                                      <label
                                        className="mb-0"
                                        style={{ minWidth: "48px" }}
                                      >
                                        {props.t("action")}:
                                      </label>

                                      <div className="w-auto pl-3">
                                        <select
                                          className="custom-select w-100"
                                          onChange={e =>
                                            handleFdDriverStatusChange(
                                              e.target.value
                                            )
                                          }
                                          style={{ minWidth: "106px" }}
                                        >
                                          <option value="">
                                            {props.t("status")}
                                          </option>
                                          {accesses?.canBlock && (
                                            <option value="blocked">
                                              {props.t("block")}
                                            </option>
                                          )}
                                          {accesses?.canEdit && (
                                            <option value="approved">
                                              {props.t("unblock")}
                                            </option>
                                          )}
                                          {accesses?.canEdit && (
                                            <option value="offline">
                                              {props.t("offline")}
                                            </option>
                                          )}
                                          {accesses?.canEdit && (
                                            <option value="online">
                                              {props.t("online")}
                                            </option>
                                          )}
                                        </select>
                                      </div>
                                    </div>
                                  )}

                                  {accesses.canDelete && (
                                    <button
                                      className="btn btn-primary"
                                      onClick={() =>
                                        toggleConfirmSelectedModal()
                                      }
                                    >
                                      {props.t("delete")} {props.t("selected")}
                                    </button>
                                  )}
                                </div>
                              </AnimateHeight>
                            )}

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

Settlement.propTypes = {
  fdDrivers: PropTypes.array,
  totalFdDrivers: PropTypes.number,
  onGetFdDrivers: PropTypes.func,
  onDeleteFdDriver: PropTypes.func,
  onPutFdDriversStatus: PropTypes.func,
}

const mapStateToProps = ({ Login, Settings, FD_Drivers, transactions }) => ({
  accessLevels: Login?.user?.accessLevel?.permissions || [],
  loading: transactions.loading,
  fdDrivers: transactions.settlementList,
  totalFdDrivers: transactions.totalcount,
  currency: Settings?.settings?.currency,
  settings: Settings?.settings,
  demo: Settings?.settings?.demo,
})

const mapDispatchToProps = dispatch => ({
  onSettlementList: data => dispatch(SettlementList(data)),
  onPutFdDriversStatus: (storeType, data, callback) =>
    dispatch(putFdDriversStatus(storeType, data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Settlement))
)
