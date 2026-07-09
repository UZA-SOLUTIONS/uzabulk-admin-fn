import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link, useParams } from "react-router-dom"
import { isEmpty } from "lodash"
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
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap"

import {
  ROLES,
  GET_SERVICE_NAME,
  SLUGS_NAME as slugname,
} from "helpers/contants"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

import SearchInput from "components/Common/SearchInput"

//i18n
import { withTranslation } from "react-i18next"

import {
  getFdbusinesstypes,
  deleteFdBusinesstype,
  putFdBusinesstypesStatus,
  exportFdBusinesstypes,
} from "store/actions"
import ListColumns, { selectRow } from "./ListColumns"
import ConfirmModal from "./ConfirmModal"
import ExportCSVButton from "components/Common/ExportCSVButton"
import { EXPORT_FD_BUSINESS_TYPES } from "helpers/url_helper"

const FdCuisines = ({
  accessLevel,
  role,
  vendorId,
  history,
  fdCuisines,
  totalFdCuisines,
  onGetFdBusinessTypes,
  onDeleteFdBusinessType,
  onPutFdBusinessTypesStatus,
  loading,
  activeStoreId,
  activeStoreType,
  onExportFdBusinessTypes,
  ...props
}) => {
  if (["basic", "premium"].includes(props?.currentPlan?.billingPlan?.type)) {
    activeStoreType = props?.storeTypeEnabled[0]

    if (activeStoreType) {
      activeStoreId = activeStoreType._id
    }
  }
  console.log(loading, "villllll")
  const { vendorId: _vendorIdParam } = useParams()
  const didMountRef = useRef(null)

  const [vendorIdParam, setvendorIdParam] = useState()
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canBlock: false,
  })
  const [selected, setSelected] = useState([])
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    fdCuisineId: null,
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
  const [fdCuisinesList, setFdCuisinesList] = useState([])
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalFdCuisines,
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
    if (didMountRef.current) {
      if (!activeStoreType?.storeType?.toLowerCase()) return
      if (!filter?.storeTypeId) return
      onGetFdBusinessTypes(activeStoreType?.storeType?.toLowerCase(), filter)
      setFdCuisinesList(fdCuisines)
    } else didMountRef.current = true
  }, [JSON.stringify(filter)])

  useEffect(() => {
    let vendor = ""

    switch (role) {
      case ROLES.admin:
      case ROLES.staff:
        vendor =
          activeStoreType?.storeVendorType === "SINGLE"
            ? activeStoreType?.singleVendorId
            : _vendorIdParam
        break

      case ROLES.vendor:
        vendor = vendorId
        break

      default:
        break
    }

    setFilter({ ...filter, storeTypeId: activeStoreId, vendor })

    setvendorIdParam(vendor)
  }, [activeStoreId, role, vendorId, _vendorIdParam])

  useEffect(() => {
    setFdCuisinesList(fdCuisines || [])
  }, [fdCuisines])

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

  const toggleConfirmModal = fdCuisineId => {
    setConfirmModal(prevState => ({
      isOpen: !prevState.isOpen,
      fdCuisineId,
    }))
  }

  const toggleConfirmSelectedModal = () => {
    setConfirmSelectedModal(prevState => ({ isOpen: !prevState.isOpen }))
  }

  const removeConfirm = () => {
    const { fdCuisineId, isOpen } = confirmModal

    const onComplete = () => {
      onGetFdBusinessTypes(activeStoreType?.storeType?.toLowerCase(), filter)
    }

    setConfirmModal({ isOpen: !isOpen, fdCuisineId: null })
    onDeleteFdBusinessType(
      activeStoreType?.storeType?.toLowerCase(),
      { _id: fdCuisineId, storeTypeId: activeStoreId },
      onComplete
    )
  }

  const removeSelectedConfirm = () => {
    const onComplete = () => {
      setSelected([])
      onGetFdBusinessTypes(activeStoreType?.storeType?.toLowerCase(), filter)
    }

    setConfirmSelectedModal({ isOpen: false })
    onPutFdBusinessTypesStatus(
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

    setFilter(prevState => ({
      ...prevState,
      page: 1,
      search: searchText,
      page: 1,
    }))
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

  const handleFdCuisineStatusChange = status => {
    const callback = () => {
      setSelected([])
      onGetFdBusinessTypes(activeStoreType?.storeType?.toLowerCase(), filter)
    }

    onPutFdBusinessTypesStatus(
      activeStoreType?.storeType?.toLowerCase(),
      { _id: selected, status, storeTypeId: activeStoreId },
      callback
    )
  }

  // For managing Fuel Store(FOOD STORETYPE) Naming
  const breadcrumtitle = [
    slugname.dewe,
    slugname.zaza,
    slugname.topup,
  ].includes(props?.slug)
    ? "Categories"
    : props.t(
        GET_SERVICE_NAME({
          storeType: activeStoreType?.storeType,
          name: "cuisine",
        }) + "s"
      )

  const addNewButtonName = [
    slugname.dewe,
    slugname.zaza,
    slugname.topup,
  ].includes(props?.slug)
    ? "Categories"
    : props.t(
        GET_SERVICE_NAME({
          storeType: activeStoreType?.storeType,
          name: "cuisine",
        })
      )

  const handleAddpagename = () => {
    let activetypestore = activeStoreType?.storeType?.toLowerCase()
    if (activetypestore == "food") return "cuisines"
    if (activetypestore == "airbnb") return "amenities"
    return "businesstype"
  }

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

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={props.t("businessType")}
            breadcrumbItems={[
              {
                title: props.t("businessType"),
              },
            ]}
          />
          <p>
            <small>{props.t("business_int")}</small>
          </p>
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
                        data={fdCuisinesList || []}
                        columns={ListColumns(
                          toggleConfirmModal,
                          ["premium"].includes(
                            props?.currentPlan?.billingPlan?.type
                          )
                            ? ""
                            : activeStoreType?.storeType?.toLowerCase(),
                          activeStoreType,
                          vendorIdParam,
                          _vendorIdParam,
                          accesses,
                          props.t,
                          handleAddpagename
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
                                          value={filter?.fields?.fieldValue}
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

                                    {!!filter?.fields?.fieldName ||
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
                              >
                                <div className="text-sm-left text-md-right">
                                  {/* <Button
                                    type="button"
                                    color="secondary"
                                    outline={true}
                                    className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                    onClick={() =>
                                      onExportFdBusinessTypes(activeStoreId)
                                    }
                                  >
                                    <i className="dripicons-export mr-1" />{" "}
                                    {props.t("export")}
                                  </Button> */}
                                  <ExportCSVButton
                                    url={
                                      EXPORT_FD_BUSINESS_TYPES +
                                      "/" +
                                      activeStoreId
                                    }
                                  />

                                  {console.log(
                                    activeStoreType?.storeType?.toLowerCase(),
                                    "activeStoreType?.storeType?.toLowerCase() activeStoreType?.storeType?.toLowerCase() "
                                  )}

                                  {accesses.canAdd && (
                                    <Button
                                      type="button"
                                      color="success"
                                      className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                      onClick={() =>
                                        history.push(
                                          `${
                                            ["premium"].includes(
                                              props?.currentPlan?.billingPlan
                                                ?.type
                                            )
                                              ? ""
                                              : "/" +
                                                activeStoreType?.storeType?.toLowerCase()
                                          }/${handleAddpagename()}/add${
                                            !!_vendorIdParam
                                              ? "/" + vendorIdParam
                                              : ""
                                          }`
                                        )
                                      }
                                    >
                                      <i className="mdi mdi-plus mr-1" />
                                      {props.t("add")} {props.t("new")}{" "}
                                      {props.t("businessType")}
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
                                            handleFdCuisineStatusChange(
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

FdCuisines.propTypes = {
  role: PropTypes.string,
  vendorId: PropTypes.string,
  fdCuisines: PropTypes.array,
  totalFdCuisines: PropTypes.number,
  onGetFdBusinessTypes: PropTypes.func,
  onDeleteFdBusinessType: PropTypes.func,
  onPutFdBusinessTypesStatus: PropTypes.func,
}

const mapStateToProps = ({ Login, Billing, Settings, FD_Businesstypes }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "",
  loading: FD_Businesstypes?.loading,
  fdCuisines: FD_Businesstypes?.fdBusinessTypes,
  totalFdCuisines: FD_Businesstypes?.totalFdBusinessTypes,
  currentPlan: Billing.currentPlan,
  storeTypeEnabled: Settings?.settings?.storeTypeEnabled,
  slug: Settings?.settings?.slug,
})

const mapDispatchToProps = dispatch => ({
  onGetFdBusinessTypes: (storeType, data) =>
    dispatch(getFdbusinesstypes(storeType, data)),
  onDeleteFdBusinessType: (storeType, data, callback) =>
    dispatch(deleteFdBusinesstype(storeType, data, callback)),
  onPutFdBusinessTypesStatus: (storeType, data, callback) =>
    dispatch(putFdBusinesstypesStatus(storeType, data, callback)),
  onExportFdBusinessTypes: storeType =>
    dispatch(exportFdBusinesstypes(storeType)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FdCuisines))
)
