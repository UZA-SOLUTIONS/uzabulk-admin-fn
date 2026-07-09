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
import queryString from "query-string"
import { usePermissions } from "helpers/permissions"
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
import SearchInput from "components/Common/SearchInput"

// Translation
import { withTranslation } from "react-i18next"

import {
  GET_SERVICE_NAME,
  ROLES,
  PRODUCT_FORM,
  DEFAULT_STORE_TYPE,
} from "helpers/contants"

import {
  getFdCategories,
  getFdProducts,
  deleteFdProduct,
  putFdProductsStatus,
  exportFdProducts,
  importFdProducts,
  importFdProductsVariations,
  importFdProductsCombine,
} from "store/actions"
import ListColumns, { selectRow } from "./ListColumns"
import ConfirmModal from "./ConfirmModal"
import ImportModal from "./ImportModal"
import { SLUGS_NAME as slugname } from "helpers/contants"
import ExportCSVButton from "components/Common/ExportCSVButton"
import { EXPORT_FD_PRODUCTS } from "helpers/url_helper"

const FdProducts = ({
  accessLevel,
  role,
  subvendorId,
  vendorId,
  history,
  fdCategories,
  fdProducts,
  totalFdProducts,
  onGetFdCategories,
  onGetFdProducts,
  onDeleteFdProduct,
  onPutFdProductsStatus,
  loading,
  activeStoreId,
  activeStoreType,
  onExportFdProducts,
  onImportFdProducts,
  onImportFdProductsVariations,
  onImportFdProductsCombine,
  ...props
}) => {
  const _PRODUCT_FORM =
    (PRODUCT_FORM[activeStoreType?.storeType]
      ? PRODUCT_FORM[activeStoreType?.storeType]
      : DEFAULT_STORE_TYPE["PRODUCT_FORM"]) || {}

  const { vendorId: _vendorIdParam } = useParams()
  console.log(activeStoreType?.storeType?.toLowerCase(), "vendorId")
  const { vendor_name } = queryString.parse(props?.location?.search)
  console.log()
  const didMountRef = useRef(null)

  const [serviceName, setserviceName] = useState("product")
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
    fdProductId: null,
  })

  const hasPermission = usePermissions()
  const [importModal, setimportModal] = useState({ isOpen: false })
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
  // console.log(activeStoreType?.storeType, "VV");
  const [searchText, setSearchText] = useState("")
  const [fdCategoriesList, setFdCategoriesList] = useState([])
  const [fdProductsList, setFdProductsList] = useState([])
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalFdProducts,
    custom: true,
    onPageChange: page => setFilter(prevState => ({ ...prevState, page })),
  }
  const { SearchBar } = Search

  useEffect(() => {
    if (activeStoreType?.storeType) {
      const _serviceName = GET_SERVICE_NAME({
        name: "product",
        storeType: activeStoreType?.storeType,
      })

      setserviceName(_serviceName)
    }
  }, [activeStoreType])

  useEffect(() => {
    // if (
    //   ["SERVICEPROVIDER"].includes(activeStoreType?.storeType?.toUpperCase())
    // )
    // {
    //   // /* No need for vendor */
    //   return setFilter(prevState => ({
    //     ...prevState,
    //     storeTypeId: activeStoreId,
    //   }))
    // }

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

      case ROLES.subVendor:
        vendor = subvendorId
        break

      default:
        break
    }

    if (vendor) {
      setFilter({ ...filter, storeTypeId: activeStoreId, vendor })
    }
    console.log(vendor, "VENDOR")
    setvendorIdParam(vendor)
  }, [activeStoreId, role, vendorId, _vendorIdParam])

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
    if (didMountRef.current || true) {
      const filter = {
        storeTypeId: activeStoreId,
        orderBy: "sortOrder",
        order: 1,
        page: 1,
        limit: 100,
        search: "",
        categories: "",
        fields: [
          {
            fieldName: "",
            fieldValue: "",
          },
        ],
        vendor: _vendorIdParam,
      }
      if (!activeStoreType?.storeType?.toLowerCase()) return
      onGetFdCategories(activeStoreType?.storeType?.toLowerCase(), filter)
      setFdCategoriesList(fdCategories)
    } else didMountRef.current = true
  }, [])

  useEffect(() => {
    setFdCategoriesList(fdCategories || [])
  }, [fdCategories])

  useEffect(() => {
    if (didMountRef.current) {
      if (!activeStoreType?.storeType?.toLowerCase()) return
      onGetFdProducts(activeStoreType?.storeType?.toLowerCase(), filter)
      setFdProductsList(fdProducts)
    } else didMountRef.current = true
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setFdProductsList(fdProducts || [])
  }, [fdProducts])

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

  const toggleConfirmModal = fdProductId => {
    setConfirmModal(prevState => ({
      isOpen: !prevState.isOpen,
      fdProductId,
    }))
  }

  const removeConfirm = () => {
    const { fdProductId, isOpen } = confirmModal

    const onComplete = () => {
      onGetFdProducts(activeStoreType?.storeType?.toLowerCase(), filter)
    }

    setConfirmModal({ isOpen: !isOpen, fdProductId: null })
    onDeleteFdProduct(
      activeStoreType?.storeType?.toLowerCase(),
      { _id: fdProductId, storeTypeId: filter?.storeTypeId },
      onComplete
    )
  }

  const importToggleModal = () => {
    setimportModal(prevState => ({ isOpen: !prevState.isOpen }))
  }

  const importConfirm = (file, type) => {
    console.log(type, "OO")
    if (file) {
      const callback = () => {
        if (!activeStoreType?.storeType?.toLowerCase()) return
        if (type === "variations") {
          // importToggleModal()
        } else {
          if (!_PRODUCT_FORM?.variations) {
            // importToggleModal()
          }

          onGetFdProducts(activeStoreType?.storeType?.toLowerCase(), filter)
        }
      }

      if (type === "variations") {
        onImportFdProductsVariations(
          {
            variationCSV: file,
            storeType: filter.storeTypeId,
            vendor: vendorIdParam,
          },
          callback
        )
      } else if (type === "combine") {
        onImportFdProductsCombine(
          {
            productCombinedCSV: file,
            storeType: filter.storeTypeId,
            vendor: vendorIdParam,
          },
          callback
        )
      } else {
        onImportFdProducts(
          {
            productCSV: file,
            storeType: filter.storeTypeId,
            vendor: vendorIdParam,
          },
          callback
        )
      }
    }
  }

  const onStatusChange = value => {
    const fieldName = !!value ? "status" : ""
    const fieldValue = value

    setFilter(prevState => {
      const fields = prevState.fields
        .filter(item => item.fieldName !== "status")
        .filter(item => item.fieldName !== "")
      return {
        ...prevState,
        fields: [
          ...fields,
          {
            fieldName,
            fieldValue,
          },
        ],
      }
    })
  }

  const onCategoriesChange = value => {
    setFilter(prevState => {
      return {
        ...prevState,
        categories: value,
      }
    })

    /*
    setFilter(prevState => {
      const fields = prevState.fields
        .filter(item => item.fieldName !== "categories")
        .filter(item => item.fieldName !== "")
      return {
        ...prevState,
        fields: [
          ...fields,
          {
            fieldName,
            fieldValue,
          },
        ],
      }
    })*/
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

  const handleFdProductStatusChange = (key, status) => {
    const callback = () => {
      setSelected([])
      onGetFdProducts(activeStoreType?.storeType?.toLowerCase(), filter)
    }

    onPutFdProductsStatus(
      activeStoreType?.storeType?.toLowerCase(),
      { _id: selected, [key]: status, storeTypeId: filter?.storeTypeId },
      callback
    )
  }
  console.log(activeStoreType?.storeType, "activeStoreType?.storeType")

  const pageHeader = [slugname.dewe, slugname.zaza].includes(props?.slug)
    ? props.t("store")
    : GET_SERVICE_NAME({
        storeType: activeStoreType?.storeType,
      })
  console.log("chunni ", filter)

  return (
    <React.Fragment>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        toggle={toggleConfirmModal}
        onConfirm={removeConfirm}
      />

      <ImportModal
        isOpen={importModal.isOpen}
        toggle={importToggleModal}
        onConfirm={importConfirm}
        title={props.t(serviceName + "s")}
        loading={loading}
        storeType={activeStoreType?.storeType}
      />

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem="Products"
            breadcrumbItems={[
              ...(activeStoreType?.storeVendorType !== "SINGLE" &&
              !["SERVICEPROVIDER", "AIRBNB"].includes(
                activeStoreType?.storeType
              ) &&
              role !== ROLES.vendor &&
              role !== ROLES.subVendor
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
                        (role === ROLES.vendor || role === ROLES.subVendor
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
                title: props.t((serviceName + "s").toLowerCase()),
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
                        data={fdProductsList || []}
                        columns={ListColumns({
                          toggleConfirmModal,
                          currentUrl: activeStoreType?.storeType?.toLowerCase(),
                          _vendorIdParam,
                          vendorIdParam,
                          accesses,
                          query: props?.location?.search,
                          t: props.t,
                          serviceName,
                          hasPermission: hasPermission("STORE.product.DELETE"),
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

                                      <div className="w-auto pl-3 d-flex">
                                        <select
                                          className="custom-select w-50"
                                          onChange={e =>
                                            onStatusChange(e.target.value)
                                          }
                                          value={
                                            filter?.fields?.find(
                                              item =>
                                                item.fieldName === "status"
                                            )?.fieldValue
                                          }
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
                                        {["food"].includes(
                                          activeStoreType?.storeType?.toLowerCase()
                                        ) && (
                                          <select
                                            className="custom-select w-50 ml-3"
                                            onChange={e =>
                                              onCategoriesChange(e.target.value)
                                            }
                                            value={filter?.categories}
                                            style={{ minWidth: "106px" }}
                                          >
                                            <option value="">
                                              {props.t("categories")}
                                            </option>
                                            {fdCategoriesList.map(
                                              (item, index) => (
                                                <option value={item._id}>
                                                  {item.catName}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        )}
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

                                    {!!filter?.fields[0]?.fieldName ||
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
                                  {accesses.canAdd &&
                                    !["SERVICEPROVIDER"].includes(
                                      activeStoreType?.storeType
                                    ) && (
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
                                  {!["SERVICEPROVIDER"].includes(
                                    activeStoreType?.storeType
                                  ) && (
                                    // <Button
                                    //   type="button"
                                    //   color="secondary"
                                    //   outline={true}
                                    //   className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                    //   onClick={() =>
                                    //     onExportFdProducts(
                                    //       activeStoreId,
                                    //       filter?.vendor
                                    //     )
                                    //   }
                                    // >
                                    //   <i className="dripicons-export mr-1" />{" "}
                                    //   {props.t("export")}
                                    // </Button>
                                    <ExportCSVButton
                                      url={
                                        EXPORT_FD_PRODUCTS +
                                        "/" +
                                        activeStoreId +
                                        "/" +
                                        filter?.vendor
                                      }
                                    />
                                  )}

                                  {accesses.canAdd &&
                                    hasPermission("STORE.product.CREATE") && (
                                      <Button
                                        type="button"
                                        color="success"
                                        className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                        onClick={() =>
                                          history.push(
                                            `/${activeStoreType?.storeType?.toLowerCase()}/${serviceName.toLowerCase()}s/add${
                                              !!_vendorIdParam
                                                ? "/" + vendorIdParam
                                                : ""
                                            }${props?.location?.search}`
                                          )
                                        }
                                      >
                                        <i className="mdi mdi-plus mr-1" />
                                        {props.t("add")} {props.t("new")}{" "}
                                        {props.t(serviceName)}
                                      </Button>
                                    )}
                                </div>
                              </Col>
                            </Row>

                            {(accesses.canEdit || accesses.canDelete) && (
                              <AnimateHeight
                                duration={500}
                                height={selected.length > 0 ? "auto" : 0}
                                className="action-animated"
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
                                          onChange={e => {
                                            if (!e.target.value) return
                                            handleFdProductStatusChange(
                                              "status",
                                              e.target.value
                                            )
                                          }}
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

                                  <div className="best-seller w-auto pr-sm-3 mb-2 mb-sm-0">
                                    <select
                                      className="custom-select w-100"
                                      onChange={e => {
                                        if (!e.target.value) return
                                        handleFdProductStatusChange(
                                          "bestSeller",
                                          e.target.value
                                        )
                                      }}
                                      style={{ minWidth: "106px" }}
                                    >
                                      <option value="">
                                        {props.t("best_seller")}
                                      </option>
                                      <option value={true}>
                                        {props.t("yes")}
                                      </option>
                                      <option value={false}>
                                        {props.t("no")}
                                      </option>
                                    </select>
                                  </div>

                                  {accesses.canDelete && (
                                    <button
                                      className="btn btn-primary"
                                      onClick={() =>
                                        handleFdProductStatusChange(
                                          "status",
                                          "archived"
                                        )
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

FdProducts.propTypes = {
  role: PropTypes.string,
  vendorId: PropTypes.string,
  fdProducts: PropTypes.array,
  totalFdProducts: PropTypes.number,
  onGetFdProducts: PropTypes.func,
  onDeleteFdProduct: PropTypes.func,
  onPutFdProductsStatus: PropTypes.func,
}

const mapStateToProps = ({ Login, FD_Categories, FD_Products, Settings }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "",
  subvendorId: Login?.user?.vendor || "",
  vendor_name: Login?.user?.name,
  loading: FD_Products.loading,
  fdCategories: FD_Categories.fdCategories,
  fdProducts: FD_Products.fdProducts,
  totalFdProducts: FD_Products.totalFdProducts,
  slug: Settings.settings?.slug,
})

const mapDispatchToProps = dispatch => ({
  onGetFdCategories: (storeType, data) =>
    dispatch(getFdCategories(storeType, data)),
  onGetFdProducts: (storeType, data) =>
    dispatch(getFdProducts(storeType, data)),
  onDeleteFdProduct: (storeType, data, callback) =>
    dispatch(deleteFdProduct(storeType, data, callback)),
  onPutFdProductsStatus: (storeType, data, callback) =>
    dispatch(putFdProductsStatus(storeType, data, callback)),
  onExportFdProducts: (storeType, vendorId) =>
    dispatch(exportFdProducts(storeType, vendorId)),
  onImportFdProducts: (data, callback) =>
    dispatch(importFdProducts(data, callback)),
  onImportFdProductsVariations: (data, callback) =>
    dispatch(importFdProductsVariations(data, callback)),
  onImportFdProductsCombine: (data, callback) =>
    dispatch(importFdProductsCombine(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FdProducts))
)
