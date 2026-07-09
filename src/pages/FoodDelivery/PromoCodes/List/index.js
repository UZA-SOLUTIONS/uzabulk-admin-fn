import React, { useEffect, useRef, useState } from "react"
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

// Translation
import { withTranslation } from "react-i18next"

//Import Breadcrumb
//

import toastr from "toastr"
import "toastr/build/toastr.min.css"

import Breadcrumbs from "components/Common/Breadcrumb2"

import SearchInput from "components/Common/SearchInput"

// Contants
import {
  ADMIN_SUB_SERVICES_ROUTE,
  GET_SERVICE_NAME,
  ROLES,
  SLUGS_NAME as slugname,
} from "helpers/contants"

import {
  getPromoCodes,
  deletePromoCode,
  putPromoCodesStatus,
} from "store/actions"
import ListColumns, { selectRow } from "./ListColumns"
import ConfirmModal from "./ConfirmModal"

const PromoCodes = ({
  accessLevel,
  role,
  vendorId,
  history,
  promoCodes,
  totalPromoCodes,
  onGetPromoCodes,
  onDeletePromoCode,
  onPutPromoCodesStatus,
  loading,
  activeStoreId,
  activeStoreType,
  isGloble,
  ...props
}) => {
  const { vendorId: _vendorIdParam } = useParams()
  const { vendor_name } = queryString.parse(props?.location?.search)

  const didMountRef = useRef(null)

  const [vendorIdParam, setvendorIdPara] = useState()
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canBlock: false,
  })
  const [selected, setSelected] = useState([])
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    promoCodeId: null,
  })
  const [confirmSelectedModal, setConfirmSelectedModal] = useState({
    isOpen: false,
  })
  const [filter, setFilter] = useState({
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 20,
    search: "",
    fields: [
      {
        fieldName: "type",
        fieldValue: isGloble ? "global" : "vendor",
      },
      {
        fieldName: "",
        fieldValue: "",
      },
    ],
  })
  const [searchText, setSearchText] = useState("")
  const [promoCodesList, setPromoCodesList] = useState([])
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalPromoCodes,
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
    if (isGloble) {
      onGetPromoCodes(filter)
    } else {
      if (didMountRef.current) {
        onGetPromoCodes(filter)
      } else didMountRef.current = true
    }
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
      case ROLES.subVendor: ///For Sub Vendor
        vendor = vendorId
        break
      default:
        break
    }

    if (
      ADMIN_SUB_SERVICES_ROUTE.promoCode2?.onlyForStore.includes(
        activeStoreType.storeType
      )
    ) {
      setFilter({ ...filter, storeTypeId: activeStoreId })
    } else {
      if (vendor) {
        setFilter({ ...filter, storeTypeId: activeStoreId, vendor })
      }
    }

    setvendorIdPara(vendor)
  }, [activeStoreId, role, vendorId, _vendorIdParam])

  useEffect(() => {
    setPromoCodesList(promoCodes || [])
  }, [promoCodes])

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

  const toggleConfirmModal = promoCodeId => {
    setConfirmModal(prevState => ({ isOpen: !prevState.isOpen, promoCodeId }))
  }

  const toggleConfirmSelectedModal = () => {
    setConfirmSelectedModal(prevState => ({ isOpen: !prevState.isOpen }))
  }

  const removeConfirm = () => {
    const { promoCodeId, isOpen } = confirmModal

    const onComplete = res => {
      if (res.status == "success") {
        toastr.success(res.message)
        onGetPromoCodes(filter)
      }
    }

    setConfirmModal({ isOpen: !isOpen, promoCodeId: null })
    onDeletePromoCode({ _id: promoCodeId }, onComplete)
  }

  const removeSelectedConfirm = () => {
    const onComplete = () => {
      setSelected([])
      onGetPromoCodes(filter)
    }

    setConfirmSelectedModal({ isOpen: false })
    onPutPromoCodesStatus({ _id: selected, status: "archived" }, onComplete)
  }

  const onStatusChange = value => {
    const fieldName = !!value ? "status" : ""
    const fieldValue = value

    setFilter(prevState => ({
      ...prevState,
      fields: [prevState.fields[0], { fieldName, fieldValue }],
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

  const handlePromoCodeStatusChange = status => {
    const callback = () => {
      setSelected([])
      onGetPromoCodes(filter)
    }

    onPutPromoCodesStatus({ _id: selected, status }, callback)
  }

  const pageHeader =
    slugname?.dewe == props?.slug
      ? props.t("store")
      : GET_SERVICE_NAME({
          storeType: activeStoreType?.storeType,
        })

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
            title="Promo Codes"
            breadcrumbItem="Promo Codes"
            breadcrumbItems={[
              ...(isGloble
                ? []
                : activeStoreType?.storeVendorType !== "SINGLE" &&
                  role !== ROLES.vendor &&
                  role !== ROLES.subVendor &&
                  !ADMIN_SUB_SERVICES_ROUTE.promoCode2?.onlyForStore?.includes(
                    activeStoreType.storeType
                  )
                ? [
                    {
                      title: pageHeader + "s",
                      link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                        {
                          storeType: activeStoreType?.storeType,
                        }
                      ).toLowerCase()}s`,
                    },
                    {
                      title:
                        (role === ROLES.vendor
                          ? props.vendor_name
                          : vendor_name) || props.t("profile"),
                      link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                        {
                          storeType: activeStoreType?.storeType,
                        }
                      ).toLowerCase()}s/${vendorIdParam}/profile`,
                    },
                  ]
                : []),

              {
                title: props.t("promo_codes"),
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
                        data={promoCodesList || []}
                        columns={ListColumns({
                          history,
                          toggleConfirmModal,
                          storeTypeParam:
                            activeStoreType?.storeType?.toLowerCase(),
                          _vendorIdParam,
                          vendorIdParam,
                          accesses,
                          query: props?.location?.search,
                          t: props.t,
                          isGloble,
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
                                          value={filter?.fields[1]?.fieldValue}
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
                                                fields: [
                                                  prevState.fields[0],
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
                                      color="success"
                                      className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                      onClick={() =>
                                        history.push(
                                          isGloble
                                            ? `/promo-codes/add`
                                            : `/${activeStoreType?.storeType?.toLowerCase()}/promo-codes/add${
                                                !!_vendorIdParam
                                                  ? "/" + vendorIdParam
                                                  : ""
                                              }${props?.location?.search}`
                                        )
                                      }
                                    >
                                      <i className="mdi mdi-plus mr-1" />
                                      {props.t("add")} {props.t("new")}{" "}
                                      {props.t("promo_code")}
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
                                            handlePromoCodeStatusChange(
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

PromoCodes.propTypes = {
  role: PropTypes.string,
  vendorId: PropTypes.string,
  promoCodes: PropTypes.array,
  totalPromoCodes: PropTypes.number,
  onGetPromoCodes: PropTypes.func,
  onDeletePromoCode: PropTypes.func,
  onPutPromoCodesStatus: PropTypes.func,
}

const mapStateToProps = ({ Login, promocodes, Settings }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "",
  vendor_name: Login?.user?.name,
  loading: promocodes.loading,
  promoCodes: promocodes.promoCodes,
  totalPromoCodes: promocodes.totalPromoCodes,

  slug: Settings?.settings?.slug,
})

const mapDispatchToProps = dispatch => ({
  onGetPromoCodes: data => dispatch(getPromoCodes(data)),
  onDeletePromoCode: (data, callback) =>
    dispatch(deletePromoCode(data, callback)),
  onPutPromoCodesStatus: (data, callback) =>
    dispatch(putPromoCodesStatus(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(PromoCodes))
)
