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

//i18n
import { withTranslation } from "react-i18next"

import { SLUGS_NAME as slugname } from "helpers/contants"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

// Contants
import { ROLES, GET_SERVICE_NAME } from "helpers/contants"

import {
  getFdRestaurants,
  deleteFdRestaurant,
  putFdRestaurantsStatus,
  exportFdRestaurants,
  importFdRestaurants,
} from "store/actions"
import ListColumns, { selectRow } from "./ListColumns"
import ConfirmModal from "./ConfirmModal"
import PayModal from "./PayModal"
import PayAdjustmentModal from "./PayAdjustmentModal"
import ImportModal from "./ImportModal"
import { usePermissions } from "helpers/permissions"
import ExportCSVButton from "components/Common/ExportCSVButton"
import { EXPORT_FD_VENDORS } from "helpers/url_helper"

const FdRestaurants = ({
  accessLevel,
  history,
  fdRestaurants,
  totalFdRestaurants,
  onGetFdRestaurants,
  onDeleteFdRestaurant,
  onPutFdRestaurantsStatus,
  loading,
  activeStoreId,
  activeStoreType,
  currency,
  onExportFdRestaurants,
  onImportFdRestaurants,
  ...props
}) => {
  const didMountRef = useRef(null)
  const hasPermission = usePermissions()
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
    fdRestaurantId: null,
  })
  const [confirmSelectedModal, setConfirmSelectedModal] = useState({
    isOpen: false,
  })
  const [payModal, setpayModal] = useState({
    isOpen: false,
    vendorId: null,
    vendor: null,
  })
  const [payAdjustmentModal, setpayAdjustmentModal] = useState({
    isOpen: false,
    vendorId: null,
    vendor: null,
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
  const [fdRestaurantsList, setFdRestaurantsList] = useState([])
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalFdRestaurants,
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
    if (didMountRef.current) {
      if (!activeStoreType?.storeType?.toLowerCase()) return
      onGetFdRestaurants(activeStoreType?.storeType?.toLowerCase(), filter)
      setFdRestaurantsList(fdRestaurants)
    } else didMountRef.current = true
  }, [JSON.stringify(filter)])

  useEffect(() => {
    if (activeStoreType?.storeVendorType === "SINGLE") {
      if (!!activeStoreType?.singleVendorId) {
        history.replace(
          `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME({
            storeType: activeStoreType?.storeType,
          }).toLowerCase()}s/${activeStoreType?.singleVendorId}/profile`
        )
      } else {
        history.replace(
          `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME({
            storeType: activeStoreType?.storeType,
          }).toLowerCase()}s/add`
        )
      }
      return
    } else if (props?.role === ROLES.vendor) {
      history.replace(
        `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME({
          storeType: activeStoreType?.storeType,
        }).toLowerCase()}s/${props?.vendorId}/profile`
      )
    }
    setFilter({ ...filter, storeTypeId: activeStoreId })
  }, [activeStoreId])

  useEffect(() => {
    setFdRestaurantsList(fdRestaurants || [])
  }, [fdRestaurants])

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

  const toggleConfirmModal = fdRestaurantId => {
    setConfirmModal(prevState => ({
      isOpen: !prevState.isOpen,
      fdRestaurantId,
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
        if (!activeStoreType?.storeType?.toLowerCase()) return
        onGetFdRestaurants(activeStoreType?.storeType?.toLowerCase(), filter)
      }

      onImportFdRestaurants(
        { importVendor: file, storeTypeId: filter.storeTypeId },
        callback
      )
    }
  }

  const togglePayModal = (fdRestaurantId, fdRestaurant) => {
    setpayModal(prevState => ({
      isOpen: !prevState.isOpen,
      vendorId: fdRestaurantId,
      vendor: fdRestaurant,
    }))
  }
  const onPaySuccess = (fdRestaurantId, fdRestaurant) => {
    togglePayModal(fdRestaurantId, fdRestaurant)
    onGetFdRestaurants(activeStoreType?.storeType?.toLowerCase(), filter)
  }

  const togglePayAdjustmentModal = (fdRestaurantId, fdRestaurant) => {
    setpayAdjustmentModal(prevState => ({
      isOpen: !prevState.isOpen,
      vendorId: fdRestaurantId,
      vendor: fdRestaurant,
    }))
  }
  const onPayAdjustmentSuccess = (fdRestaurantId, fdRestaurant) => {
    togglePayAdjustmentModal(fdRestaurantId, fdRestaurant)
    onGetFdRestaurants(activeStoreType?.storeType?.toLowerCase(), filter)
  }

  const removeConfirm = () => {
    const { fdRestaurantId, isOpen } = confirmModal

    const onComplete = () => {
      onGetFdRestaurants(activeStoreType?.storeType?.toLowerCase(), filter)
    }

    if (!filter?.storeTypeId) return
    setConfirmModal({ isOpen: !isOpen, fdRestaurantId: null })
    onDeleteFdRestaurant(
      activeStoreType?.storeType?.toLowerCase(),
      { _id: fdRestaurantId, storeTypeId: filter?.storeTypeId },
      onComplete
    )
  }

  const removeSelectedConfirm = () => {
    const onComplete = () => {
      setSelected([])
      onGetFdRestaurants(activeStoreType?.storeType?.toLowerCase(), filter)
    }

    setConfirmSelectedModal({ isOpen: false })
    onPutFdRestaurantsStatus(
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

  const handleFdRestaurantStatusChange = status => {
    const callback = () => {
      setSelected([])
      onGetFdRestaurants(activeStoreType?.storeType?.toLowerCase(), filter)
    }

    if (!filter?.storeTypeId) return
    onPutFdRestaurantsStatus(
      activeStoreType?.storeType?.toLowerCase(),
      { _id: selected, status, storeTypeId: filter?.storeTypeId },
      callback
    )
  }

  // For managing Fuel Store(FOOD STORETYPE) Naming

  const breadcrumtitle =
    props?.slug == "topup-fuel"
      ? props.t("Providers")
      : [slugname.dewe, slugname.zaza].includes(props?.slug)
      ? props.t("Store")
      : props.t(
          GET_SERVICE_NAME({
            storeType: activeStoreType?.storeType,
          }) + "s"
        )

  const addNewButtonName =
    props?.slug == "topup-fuel"
      ? props.t("Providers")
      : [slugname.dewe, slugname.zaza].includes(props?.slug)
      ? props.t("Store")
      : props.t(
          GET_SERVICE_NAME({
            storeType: activeStoreType?.storeType,
          })
        )

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
        title={
          GET_SERVICE_NAME({
            storeType: activeStoreType?.storeType,
          }) + "s"
        }
        loading={loading}
      />

      <PayModal
        toggle={togglePayModal}
        {...payModal}
        storeTypeId={activeStoreId}
        onPaySuccess={onPaySuccess}
      />

      <PayAdjustmentModal
        toggle={togglePayAdjustmentModal}
        {...payAdjustmentModal}
        storeTypeId={activeStoreId}
        onPayAdjustmentSuccess={onPayAdjustmentSuccess}
      />

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={
              GET_SERVICE_NAME({
                storeType: activeStoreType?.storeType,
                name: "restaurant",
              }) + "s"
            }
            breadcrumbItems={[
              {
                title: props.t(breadcrumtitle?.toLowerCase()),
                link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                  {
                    storeType: activeStoreType?.storeType,
                  }
                ).toLowerCase()}s`,
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
                        data={fdRestaurantsList || []}
                        columns={ListColumns(
                          toggleConfirmModal,
                          togglePayModal,
                          togglePayAdjustmentModal,
                          `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                            {
                              storeType: activeStoreType?.storeType,
                            }
                          ).toLowerCase()}s`,
                          accesses,
                          currency,
                          props.t,
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
                                      color="secondary"
                                      outline={true}
                                      className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                      onClick={importToggleModal}
                                    >
                                      <i className="bx bx-import mr-1" />{" "}
                                      {props.t("import")}
                                    </Button>
                                  )}
                                  {/* 
                                  <Button
                                    type="button"
                                    color="secondary"
                                    outline={true}
                                    className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                    onClick={() =>
                                      onExportFdRestaurants(
                                        activeStoreId,
                                        filter?.vendor
                                      )
                                    }
                                  >
                                    <i className="dripicons-export mr-1" />{" "}
                                    {props.t("export")}
                                  </Button> */}
                                  <ExportCSVButton
                                    url={
                                      EXPORT_FD_VENDORS + "/" + activeStoreId
                                    }
                                  />

                                  {accesses.canAdd && (
                                    <Button
                                      type="button"
                                      color="success"
                                      className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                      onClick={() =>
                                        history.push(
                                          `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                                            {
                                              storeType:
                                                activeStoreType?.storeType,
                                            }
                                          ).toLowerCase()}s/add`
                                        )
                                      }
                                    >
                                      <i className="mdi mdi-plus mr-1" />
                                      {props.t("add")} {props.t("new")}{" "}
                                      {addNewButtonName}
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
                                            handleFdRestaurantStatusChange(
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

FdRestaurants.propTypes = {
  fdRestaurants: PropTypes.array,
  totalFdRestaurants: PropTypes.number,
  onGetFdRestaurants: PropTypes.func,
  onDeleteFdRestaurant: PropTypes.func,
  onPutFdRestaurantsStatus: PropTypes.func,
}

const mapStateToProps = ({ Login, Settings, FD_Restaurants }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id,
  accessLevels: Login?.user?.accessLevel?.permissions || [],
  loading: FD_Restaurants.loading,
  fdRestaurants: FD_Restaurants.fdRestaurants,
  totalFdRestaurants: FD_Restaurants.totalFdRestaurants,
  currency: Settings?.settings?.currency,
  slug: Settings?.settings?.slug,
  demo: Settings?.settings?.demo,
})

const mapDispatchToProps = dispatch => ({
  onGetFdRestaurants: (storeType, data) =>
    dispatch(getFdRestaurants(storeType, data)),
  onDeleteFdRestaurant: (storeType, data, callback) =>
    dispatch(deleteFdRestaurant(storeType, data, callback)),
  onPutFdRestaurantsStatus: (storeType, data, callback) =>
    dispatch(putFdRestaurantsStatus(storeType, data, callback)),
  onExportFdRestaurants: storeType => dispatch(exportFdRestaurants(storeType)),
  onImportFdRestaurants: (data, callback) =>
    dispatch(importFdRestaurants(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FdRestaurants))
)
