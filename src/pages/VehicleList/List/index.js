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

import {
  getFdDrivers,
  deleteFdDriver,
  putFdDriversStatus,
  exportDrivers,
  importDrivers,
  postdriverList,
} from "store/actions"
import ListColumns, { selectRow } from "./ListColumns"
import ConfirmModal from "./ConfirmModal"
// import PayModal from "./PayModal"
// import PayAdjustmentModal from "./PayAdjustmentModal"
import ImportModal from "./ImportModal"
import { GET_SERVICE_NAME } from "helpers/contants"

const VehicleList = ({
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
  settings,
  ...props
}) => {
  const didMountRef = useRef(null)


  const [driverVehicleList, setDriverVehicleList] = useState([])

  useEffect(() => {



    setDriverVehicleList(props?.drivervehicleList)
  }, [props?.drivervehicleList])

  // __________________
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
    storeTypeId: "",
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 20,
    search: "",
    fieldName: "",
    fieldValue: "",
  })
  const [searchText, setSearchText] = useState("")
  const [fdDriversList, setFdDriversList] = useState([])
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalFdDrivers,
    custom: true,
    onPageChange: page => setFilter(prevState => ({ ...prevState, page })),
  }
  const { SearchBar } = Search

  const { id } = useParams()

  useEffect(() => {
    if (!accessLevel) {
      console.log("no access");
      const data = {
        canAdd: true,
        canEdit: true,
        canDelete: true,
        canBlock: true,
        canPay: true,
      }
      accessLevels?.filter(item => item.label === "Drivers")[0]?.permissions.map(val => {
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
    props.onpostdriverList({
      driver: id
    })
  }, [id])

  // useEffect(() => {
  //   if (didMountRef.current) {
  //     // if (!activeStoreType?.storeType?.toLowerCase()) return
  //     onGetFdDrivers(activeStoreType?.storeType?.toLowerCase(), filter)
  //     setFdDriversList(fdDrivers)
  //   } else didMountRef.current = true
  // }, [JSON.stringify(filter)])

  // useEffect(() => {
  //   setFilter({ ...filter, storeTypeId: activeStoreId })
  // }, [activeStoreId])

  // useEffect(() => {
  //   setFdDriversList(fdDrivers || [])
  // }, [fdDrivers])

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

  const importToggleModal = () => {
    setimportModal(prevState => ({ isOpen: !prevState.isOpen }))
  }

  const importConfirm = file => {
    if (file) {
      const callback = () => {
        // importToggleModal()
        onGetFdDrivers(activeStoreType?.storeType?.toLowerCase(), filter)
      }

      onImportDrivers({ importDriver: file }, callback)
    }
  }

  const togglePayModal = (fdDriverId, fdDriver) => {
    setpayModal(prevState => ({
      isOpen: !prevState.isOpen,
      driverId: fdDriverId,
      driver: fdDriver,
    }))
  }

  const onPaySuccess = (fdDriverId, fdDriver) => {
    // togglePayModal(fdDriverId, fdDriver)
    // onGetFdDrivers(activeStoreType?.storeType?.toLowerCase(), filter)
  }

  const togglePayAdjustmentModal = (fdDriverId, fdDriver) => {
    // setpayAdjustmentModal(prevState => ({
    //   isOpen: !prevState.isOpen,
    //   driverId: fdDriverId,
    //   driver: fdDriver,
    // }))
  }

  const removeConfirm = () => {
    // const { fdDriverId, isOpen } = confirmModal

    // const onComplete = () => {
    //   onGetFdDrivers(activeStoreType?.storeType?.toLowerCase(), filter)
    // }

    // setConfirmModal({ isOpen: !isOpen, fdDriverId: null })
    // onDeleteFdDriver(
    //   activeStoreType?.storeType?.toLowerCase(),
    //   { _id: fdDriverId, storeTypeId: activeStoreId },
    //   onComplete
    // )
  }

  const removeSelectedConfirm = () => {
    const { isOpen } = confirmModal

    const onComplete = () => {
      setSelected([])
      onGetFdDrivers(activeStoreType?.storeType?.toLowerCase(), filter)
    }

    setConfirmSelectedModal({ isOpen: false })
    onPutFdDriversStatus(
      activeStoreType?.storeType?.toLowerCase(),
      { _id: selected, status: "archived", storeTypeId: activeStoreId },
      onComplete
    )
  }

  const onStatusChange = value => {
    const fieldName = !!value ? "status" : ""
    const fieldValue = value

    setFilter(prevState => ({
      ...prevState,
      fieldName,
      fieldValue,
    }))
  }

  const onSearch = event => {
    event.preventDefault()

    setFilter(prevState => ({ ...prevState, search: searchText, page: 1 }))
  }

  const onSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected(prevSelected => [...prevSelected, row._id])
    } else {
      setSelected(prevSelected => prevSelected.filter(x => x !== row._id))
    }
  }

  const onSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r._id)
    if (isSelect) {
      setSelected(ids)
    } else {
      setSelected([])
    }
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

  console.log(driverVehicleList, "driverVehicleList");



  return (
    <React.Fragment>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        toggle={toggleConfirmModal}
        onConfirm={removeConfirm}
      />

      <ConfirmModal
        isOpen={confirmSelectedModal.isOpen}
        toggle={toggleConfirmSelectedModal}
        onConfirm={removeSelectedConfirm}
      />



      <ImportModal
        isOpen={importModal.isOpen}
        toggle={importToggleModal}
        onConfirm={importConfirm}
        loading={loading}
      />

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={props.t("Drivers")}
            breadcrumbItems={
              settings.storeTypeEnabled[0].storeType !== "SERVICEPROVIDER" ?
                [
                  {
                    title: props.t("driver_profile"),
                  },


                ] : [
                  {
                    title: props.t(
                      GET_SERVICE_NAME({
                        storeType: settings.storeTypeEnabled[0].storeType,
                        name: "drivers",
                      }) + "s"
                    ),
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
                        data={driverVehicleList || []}
                        columns={ListColumns(
                          toggleConfirmModal,
                          togglePayModal,
                          togglePayAdjustmentModal,
                          accesses,
                          props.t,
                          currency,
                          activestore,
                          id
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
                                        history.push(`/drivers/vehicle/add/${id}`)
                                      }
                                    >
                                      <i className="mdi mdi-plus mr-1" />
                                      {props.t("add")} {props.t("new")}{" "}
                                      {props.t("vehicle")}
                                    </Button>
                                  )}
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
                                    selectRow={selectRow({
                                      selected,
                                      onSelect,
                                      onSelectAll,
                                    })}
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

VehicleList.propTypes = {
  fdDrivers: PropTypes.array,
  totalFdDrivers: PropTypes.number,
  onGetFdDrivers: PropTypes.func,
  onDeleteFdDriver: PropTypes.func,
  onPutFdDriversStatus: PropTypes.func,
}

const mapStateToProps = ({ Login, Settings, FD_Drivers }) => ({
  accessLevels: Login?.user?.accessLevel?.permissions || [],
  loading: FD_Drivers.loading,
  fdDrivers: FD_Drivers.fdDrivers,
  totalFdDrivers: FD_Drivers.totalFdDrivers,
  currency: Settings?.settings?.currency,
  settings: Settings?.settings,
  drivervehicleList: FD_Drivers?.drivervehicleList
})

const mapDispatchToProps = dispatch => ({
  onGetFdDrivers: (storeType, data) => dispatch(getFdDrivers(storeType, data)),
  onDeleteFdDriver: (storeType, data, callback) =>
    dispatch(deleteFdDriver(storeType, data, callback)),
  onPutFdDriversStatus: (storeType, data, callback) =>
    dispatch(putFdDriversStatus(storeType, data, callback)),
  onExportDrivers: () => dispatch(exportDrivers()),
  onImportDrivers: (data, callback) => dispatch(importDrivers(data, callback)),

  onpostdriverList: (data) => dispatch(postdriverList(data))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(VehicleList))
)
