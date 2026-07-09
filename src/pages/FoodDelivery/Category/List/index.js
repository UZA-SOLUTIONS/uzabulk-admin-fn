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
import CustomPagination from "components/Common/CustomPagination"
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
import queryString from "query-string"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

import {
  GET_SERVICE_NAME,
  ROLES,
  SLUGS_NAME as slugname,
} from "helpers/contants"

import {
  getFdCategories,
  deleteFdCategory,
  putFdCategoriesStatus,
  putFdCategorySort,
  exportFdCategories,
} from "store/actions"
import ListColumns, { selectRow } from "./ListColumns";
import ConfirmModal from "./ConfirmModal";

import CardContent from "./CardContent";
import ExportCSVButton from "components/Common/ExportCSVButton";
import { EXPORT_FD_CATEGORIES } from "helpers/url_helper";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const FdCategories = ({
  accessLevel,
  role,
  vendorId,
  subvendorId,
  history,
  fdCategories,
  totalFdCategories,
  onGetFdCategories,
  onDeleteFdCategory,
  onPutFdCategoriesStatus,
  onPutFdCategorySort,
  loading,
  activeStoreId,
  activeStoreType,
  onExportFdCategories,
  ...props
}) => {
  console.log('activeStoreType', activeStoreType);
  const { vendorId: _vendorIdParam } = useParams()
  const { vendor_name } = queryString.parse(props?.location?.search)

  const didMountRef = useRef(true)
  const hasPermission = usePermissions()
  console.log(hasPermission("STORE.category.CREATE"), "hasPermission")
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
    fdCategoryId: null,
  })
  const [filter, setFilter] = useState({
    storeTypeId: "",
    orderBy: "sortOrder",
    order: 1,
    page: 1,
    limit: 20,
    search: "",
    fields: [
      {
        fieldName: "",
        fieldValue: "",
      },
    ],
  })

  console.log(filter?.vendor, vendorId, "filter123")
  const [searchText, setSearchText] = useState("")
  const [fdCategoriesList, setFdCategoriesList] = useState([])
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalFdCategories,
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
      onGetFdCategories(activeStoreType?.storeType?.toLowerCase(), filter)
      setFdCategoriesList(fdCategories)
    } else didMountRef.current = false
  }, [JSON.stringify(filter)])

  useEffect(() => {
    if (
      ["SERVICEPROVIDER", "CARRENTAL", "AIRBNB"].includes(
        activeStoreType?.storeType?.toUpperCase()
      )
    ) {
      /* No need for vendor */
      return setFilter(prevState => ({
        ...prevState,
        storeTypeId: activeStoreId,
      }))
    }

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
      setFilter(prevState => ({
        ...prevState,
        vendor,
        storeTypeId: activeStoreId,
      }))
    }

    setvendorIdPara(vendor)
  }, [activeStoreId, role, vendorId, _vendorIdParam])

  useEffect(() => {
    setFdCategoriesList(fdCategories || [])
  }, [fdCategories])

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

  const toggleConfirmModal = fdCategoryId => {
    setConfirmModal(prevState => ({
      isOpen: !prevState.isOpen,
      fdCategoryId,
    }))
  }

  const removeConfirm = () => {
    const { fdCategoryId, isOpen } = confirmModal

    const onComplete = () => {
      onGetFdCategories(activeStoreType?.storeType?.toLowerCase(), filter)
    }

    setConfirmModal({ isOpen: !isOpen, fdCategoryId: null })
    onDeleteFdCategory(
      activeStoreType?.storeType?.toLowerCase(),
      { _id: fdCategoryId, storeTypeId: activeStoreId },
      onComplete
    )
  }

  const onStatusChange = value => {
    const fieldName = !!value ? "status" : ""
    const fieldValue = value

    setFilter(prevState => ({
      ...prevState,
      fields: [{ fieldName, fieldValue }],
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

  const handleFdCategoryStatusChange = status => {
    const callback = () => {
      setSelected([])
      onGetFdCategories(activeStoreType?.storeType?.toLowerCase(), filter)
    }

    onPutFdCategoriesStatus(
      activeStoreType?.storeType?.toLowerCase(),
      { _id: selected, status, storeTypeId: activeStoreId },
      callback
    )
  }

  const onCategoryDragEnd = list => result => {
    if (!accesses?.canEdit) return
    const { destination, draggableId, source } = result
    if (!destination) {
      return
    }

    const items = reorder(list, source.index, destination.index)

    if (destination.droppableId === "no_parent") {
      setFdCategoriesList(items)
    } else {
      const _list = fdCategoriesList

      const findParent = list => {
        for (let i = 0; i < list.length; i++) {
          const item = list[i]

          if (item._id === destination.droppableId) {
            item.subcategories = items
            break
          }

          if (item?.subcategories?.length > 0) {
            findParent(item?.subcategories)
          }
        }
      }

      findParent(_list)
      setFdCategoriesList(_list)
    }

    onPutFdCategorySort(
      activeStoreType?.storeType?.toLowerCase(),
      {
        sortOrder: items?.map((item, index) => ({
          _id: item._id,
          sortOrder: index + 1,
        })),
        storeTypeId: activeStoreId,
      },
      filter
    )
  }

  const pageHeader = [slugname.dewe, slugname.zaza].includes(props?.slug)
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

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={props.t("categories")}
            breadcrumbItems={[
              ...(activeStoreType?.storeVendorType !== "SINGLE" &&
                !["SERVICEPROVIDER"].includes(activeStoreType?.storeType) &&
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
                title: props.t("categories"),
              },
            ]}
          />

          <Row>
            <Col sm={12} md={7}>
              <Row className="mb-2">
                <Col xs="12">
                  {activeStoreType?.storeType?.toLowerCase() !==
                    "serviceprovider" && (
                      // <Button
                      //   type="button"
                      //   color="secondary"
                      //   outline={true}
                      //   className="btn-rounded waves-effect waves-light mb-2 mr-2"
                      //   onClick={() =>
                      //     onExportFdCategories(activeStoreId, filter?.vendor)
                      //   }
                      // >
                      //   <i className="dripicons-export mr-1" />{" "}
                      //   {props.t("export")}
                      // </Button>
                      <ExportCSVButton
                        url={
                          EXPORT_FD_CATEGORIES +
                          "/" +
                          activeStoreId +
                          "/" +
                          filter?.vendor
                        }
                      />
                    )}
                  {accesses.canAdd &&
                    hasPermission("STORE.category.CREATE") && (
                      <Button
                        type="button"
                        color="success"
                        className="btn-rounded waves-effect waves-light mb-2 mr-2"
                        onClick={() =>
                          history.push(
                            `/${activeStoreType?.storeType?.toLowerCase()}/category/add${!!_vendorIdParam ? "/" + vendorIdParam : ""
                            }${props?.location?.search}`
                          )
                        }
                      >
                        <i className="mdi mdi-plus mr-1" />
                        {props.t("add")} {props.t("new")} {props.t("category")}
                      </Button>
                    )}
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={7} className="spinner-content">
              <CardContent
                currentUrl={activeStoreType?.storeType?.toLowerCase()}
                subCategories={fdCategoriesList}
                onDragEnd={onCategoryDragEnd}
                toggleConfirmModal={toggleConfirmModal}
                vendorIdParam={vendorIdParam}
                _vendorIdParam={_vendorIdParam}
                accesses={accesses}
                query={props?.location?.search}
                activeStoreType={activeStoreType}
              />

              {!loading && fdCategoriesList?.length <= 0 && (
                <Card>
                  <CardBody>{props.t("category_not_found")}</CardBody>
                </Card>
              )}

              {loading && (
                <div className="spinner">
                  <Spinner color="primary" />
                </div>
              )}
            </Col>
          </Row>

          <Row className="align-items-md-center mt-30">
            <Col
              sm={12}
              md={7}
              className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination"
            >
              <CustomPagination
                totalCount={pageOptions.totalSize}
                limit={filter.limit}
                page={filter?.page}
                setFilter={setFilter}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

FdCategories.propTypes = {
  role: PropTypes.string,
  vendorId: PropTypes.string,
  subvendorId: PropTypes.string,
  fdCategories: PropTypes.array,
  totalFdCategories: PropTypes.number,
  onGetFdCategories: PropTypes.func,
  onDeleteFdCategory: PropTypes.func,
  onPutFdCategoriesStatus: PropTypes.func,
  onPutFdCategorySort: PropTypes.func,
}

const mapStateToProps = ({ Login, FD_Categories, Settings }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "", // In Case Restaurant/Vendor based on role
  subvendorId: Login?.user?.vendor || "", // In Case Restaurant/SubVendor based on role

  vendor_name: Login?.user?.name,
  loading: FD_Categories.loading,
  fdCategories: FD_Categories.fdCategories,
  totalFdCategories: FD_Categories.totalFdCategories,
  slug: Settings?.settings?.slug,
})

const mapDispatchToProps = dispatch => ({
  onGetFdCategories: (storeType, data) =>
    dispatch(getFdCategories(storeType, data)),
  onDeleteFdCategory: (storeType, data, callback) =>
    dispatch(deleteFdCategory(storeType, data, callback)),
  onPutFdCategoriesStatus: (storeType, data, callback) =>
    dispatch(putFdCategoriesStatus(storeType, data, callback)),
  onPutFdCategorySort: (storeType, data, filter) =>
    dispatch(putFdCategorySort(storeType, data, filter)),
  onExportFdCategories: (storeType, vendorId) =>
    dispatch(exportFdCategories(storeType, vendorId)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FdCategories))
)
