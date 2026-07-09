import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { isEmpty } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import AnimateHeight from "react-animate-height"

import toastr from "toastr"
import "toastr/build/toastr.min.css"

import SearchInput from "components/Common/SearchInput"

//i18n
import { withTranslation } from "react-i18next"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"
import {
  getCustomers,
  getCustomersSuccess,
  deleteCustomer,
  putCustomersStatus,
  exportCustomers,
  importCustomers,
} from "store/actions"
import CustomersColumns, { selectRow } from "./CustomersColumns"
import CustomersConfirmModal from "./CustomerConfirmModal"
import ImportModal from "./ImportModal"
import PayAdjustmentModal from "./PayAdjustmentModal"
import { usePermissions } from "helpers/permissions"
import ExportCSVButton from "components/Common/ExportCSVButton"
import { EXPORT_CUSTOMERS } from "helpers/url_helper"

const Customers = props => {
  const {
    accessLevel,
    history,
    customers,
    totalCustomers,
    getCustomersSuccess,
    onGetCustomers,
    onDeleteCustomer,
    onPutCustomersStatus,
    loading,
    onExportCustomers,
    onImportCustomers,
    activeStoreId,
  } = props

  // console.log(props?.hideThings, "hideThingshideThings");
  const hasPermission = usePermissions()
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canBlock: false,
  })
  const [selected, setSelected] = useState([])
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    customerId: null,
  })
  const [confirmSelectedModal, setConfirmSelectedModal] = useState({
    isOpen: false,
  })

  const [payAdjustmentModal, setPayAdjustmentModal] = useState({
    isOpen: false,
    customerId: null,
    customer: null,
  })

  const [importModal, setimportModal] = useState({ isOpen: false })
  const [filter, setFilter] = useState({
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 20,
    search: "",
    fields: [
      {
        fieldName: "role",
        fieldValue: {
          $in: ["USER", "WHOLESALER"]
        },
      },
      {
        fieldName: "",
        fieldValue: "",
      },
    ],
  })
  const [searchText, setSearchText] = useState("")
  const [customerList, setCustomersList] = useState([])
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalCustomers,
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
    getCustomersSuccess({ data: [], totalcount: 0 })
    onGetCustomers(filter)
    setCustomersList(customers)
  }, [onGetCustomers, JSON.stringify(filter)])

  useEffect(() => {
    setCustomersList(customers || [])
  }, [customers])

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

  const toggleConfirmModal = customerId => {
    setConfirmModal(prevState => ({ isOpen: !prevState.isOpen, customerId }))
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
        importToggleModal()
        onGetCustomers(filter)
      }

      onImportCustomers({ importUser: file }, callback)
    }
  }

  const togglePayAdjustmentModal = (fdcustomerId, fdcustomer) => {
    setPayAdjustmentModal(prev => ({
      isOpen: !prev.isOpen,
      customerId: fdcustomerId,
      customer: fdcustomer,
    }))
  }
  let isUserWalletAccessGiven =
    props?.hideThings?.filter(
      user => user?.type == "usersWalletAccess" && user?.value == true
    ).length > 0

  const removeConfirm = () => {
    const { customerId, isOpen } = confirmModal

    const onComplete = res => {
      if (res.status == "success") {
        toastr.success(res.message)
        setSelected([])
        onGetCustomers(filter)
      }
    }

    setConfirmModal({ isOpen: !isOpen, customerId: null })
    onDeleteCustomer({ _id: customerId }, onComplete)
  }

  const removeSelectedConfirm = () => {
    const { isOpen } = confirmModal

    const onComplete = () => {
      setSelected([])
      onGetCustomers(filter)
    }

    setConfirmSelectedModal({ isOpen: false })
    onPutCustomersStatus({ _id: selected, status: "archived" }, onComplete)
  }

  const onStatusChange = value => {
    const fieldName = !!value ? "status" : ""
    const fieldValue = value

    setFilter(prevState => ({
      ...prevState,
      fields: [prevState?.fields[0], { fieldName, fieldValue }],
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

  const handleCustomerStatusChange = status => {
    const callback = () => {
      setSelected([])
      onGetCustomers(filter)
    }

    onPutCustomersStatus({ _id: selected, status }, callback)
  }

  const onPaySuccess = () => {
    togglePayAdjustmentModal(null, null)
    onGetCustomers(filter)
  }

  return (
    <React.Fragment>
      <CustomersConfirmModal
        isOpen={confirmModal.isOpen}
        toggle={toggleConfirmModal}
        onConfirm={removeConfirm}
      />

      <CustomersConfirmModal
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

      <PayAdjustmentModal
        toggle={togglePayAdjustmentModal}
        onSuccess={onPaySuccess}
        {...payAdjustmentModal}
      />

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Customers"
            breadcrumbItem={props.t("customers")}
            breadcrumbItems={[{ title: props.t("customers") }]}
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
                        data={customerList || []}
                        columns={CustomersColumns(
                          history,
                          toggleConfirmModal,
                          togglePayAdjustmentModal,
                          props.t,
                          accesses,
                          props.demo,
                          isUserWalletAccessGiven,
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
                                          value={filter?.fields[1].fieldValue}
                                          style={{ minWidth: "106px" }}
                                        >
                                          <option value="">
                                            {props.t("all")}
                                          </option>
                                          <option value="active">
                                            {props.t("active")}
                                          </option>
                                          <option value="inactive">
                                            {props.t("inactive")}
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

                                    {!!filter?.fields[1].fieldName ||
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
                                                  prevState?.fields[0],
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
                              >
                                <div className="text-sm-left text-md-right">
                                  {accesses.canAdd && (
                                    <Button
                                      type="button"
                                      color="secondary"
                                      outline={true}
                                      className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                      onClick={importToggleModal}
                                    >
                                      <i className="bx bx-import mr-1" />{" "}
                                      {props.t("import")}
                                    </Button>
                                  )}
                                  {/* <Button
                                    type="button"
                                    color="secondary"
                                    outline={true}
                                    className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                    onClick={() => onExportCustomers()}
                                  >
                                    <i className="dripicons-export mr-1" />{" "}
                                    {props.t("export")}
                                  </Button> */}

                                  <ExportCSVButton url={EXPORT_CUSTOMERS} />

                                  {accesses.canAdd && (
                                    <Button
                                      type="button"
                                      color="success"
                                      className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                      onClick={() =>
                                        history.push("/customers/add")
                                      }
                                    >
                                      <i className="mdi mdi-plus mr-1" />
                                      {props.t("add")} {props.t("new")}{" "}
                                      {props.t("customer")}
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
                                            handleCustomerStatusChange(
                                              e.target.value
                                            )
                                          }
                                          style={{ minWidth: "106px" }}
                                        >
                                          <option value="">
                                            {props.t("status")}
                                          </option>
                                          <option value="active">
                                            {props.t("active")}
                                          </option>
                                          <option value="inactive">
                                            {props.t("inactive")}
                                          </option>
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

Customers.propTypes = {
  t: PropTypes.any,
  customers: PropTypes.array,
  totalCustomers: PropTypes.number,
  getCustomersSuccess: PropTypes.func,
  onGetCustomers: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
  onPutCustomersStatus: PropTypes.func,
}

const mapStateToProps = ({ customers, Settings }) => ({
  loading: customers.loading,
  customers: customers.customers,
  totalCustomers: customers.totalCustomers,
  hideThings: Settings.settings.hideThings,
  demo: Settings.settings.demo,
})

const mapDispatchToProps = dispatch => ({
  getCustomersSuccess: data => dispatch(getCustomersSuccess(data)),
  onGetCustomers: data => dispatch(getCustomers(data)),
  onDeleteCustomer: (data, callback) =>
    dispatch(deleteCustomer(data, callback)),
  onPutCustomersStatus: (data, callback) =>
    dispatch(putCustomersStatus(data, callback)),
  onExportCustomers: () => dispatch(exportCustomers()),
  onImportCustomers: (data, callback) =>
    dispatch(importCustomers(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Customers))
)
