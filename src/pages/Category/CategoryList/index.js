import React, { useEffect, useState, useMemo, useRef } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import CustomPagination from "components/Common/CustomPagination"
import SearchInput from "components/Common/SearchInput"
import { usePermissions } from "helpers/permissions"
import {
  buildCategoryListPayload,
  countCategoryTree,
  findCategoryListByDroppableId,
} from "helpers/categoryList"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
  Label,
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb2"
import { withTranslation } from "react-i18next"
import {
  getFdCategories,
  deleteFdCategory,
  putFdCategorySort,
} from "store/actions"
import ConfirmModal from "./ConfirmModal"
import CardContent from "./CardContent"
import ExportCSVButton from "components/Common/ExportCSVButton"
import { EXPORT_FD_CATEGORIES } from "helpers/url_helper"

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const FdCategories = ({
  accessLevel,
  history,
  fdCategories,
  totalFdCategories,
  onGetFdCategories,
  onDeleteFdCategory,
  onPutFdCategorySort,
  loading,
  activeStoreType,
  settings,
  ...props
}) => {
  const hasPermission = usePermissions()
  const canDeleteCategory = hasPermission("STORE.category.DELETE")
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canBlock: false,
  })
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
    fields: [{ fieldName: "", fieldValue: "" }],
  })
  const [searchText, setSearchText] = useState("")
  const [fdCategoriesList, setFdCategoriesList] = useState([])
  const [expandAll, setExpandAll] = useState(null)

  const stats = useMemo(
    () => countCategoryTree(fdCategoriesList),
    [fdCategoriesList]
  )

  const fetchCategories = () => {
    if (!filter.storeTypeId) return
    onGetFdCategories(buildCategoryListPayload(filter))
  }

  useEffect(() => {
    if (!accessLevel) {
      return setaccesses({
        canAdd: true,
        canEdit: true,
        canDelete: true,
        canBlock: true,
      })
    }

    const data = {
      canAdd: false,
      canEdit: false,
      canDelete: false,
      canBlock: false,
    }

    accessLevel?.forEach(item => {
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
        default:
          break
      }
    })

    setaccesses(data)
  }, [accessLevel])

  const storeTypeIdRef = useRef("")
  useEffect(() => {
    const storeTypeId =
      settings?.storeTypeEnabled?.[0]?._id || settings?._id || ""
    if (storeTypeId && storeTypeId !== storeTypeIdRef.current) {
      storeTypeIdRef.current = storeTypeId
      setFilter(prev =>
        prev.storeTypeId === storeTypeId
          ? prev
          : { ...prev, storeTypeId, page: 1 }
      )
    }
  }, [settings])

  useEffect(() => {
    if (!filter.storeTypeId) return
    fetchCategories()
  }, [
    filter.storeTypeId,
    filter.page,
    filter.limit,
    filter.search,
    filter.order,
    filter.orderBy,
    filter.fields?.[0]?.fieldName,
    filter.fields?.[0]?.fieldValue,
  ])

  useEffect(() => {
    setFdCategoriesList(fdCategories || [])
  }, [fdCategories])

  const toggleConfirmModal = fdCategoryId => {
    setConfirmModal(prev => ({
      isOpen: !prev.isOpen,
      fdCategoryId,
    }))
  }

  const removeConfirm = () => {
    const { fdCategoryId, isOpen } = confirmModal
    setConfirmModal({ isOpen: !isOpen, fdCategoryId: null })
    onDeleteFdCategory(
      { _id: fdCategoryId, storeTypeId: filter.storeTypeId },
      fetchCategories
    )
  }

  const onSearch = event => {
    event?.preventDefault()
    setFilter(prev => ({ ...prev, search: searchText.trim(), page: 1 }))
  }

  const onStatusFilter = value => {
    setFilter(prev => ({
      ...prev,
      page: 1,
      fields: [{ fieldName: value ? "status" : "", fieldValue: value }],
    }))
  }

  const clearFilters = () => {
    setSearchText("")
    setFilter(prev => ({
      ...prev,
      page: 1,
      search: "",
      fields: [{ fieldName: "", fieldValue: "" }],
    }))
  }

  const hasActiveFilters =
    !!filter.search || !!filter.fields?.[0]?.fieldName

  const onCategoryDragEnd = result => {
    if (!accesses?.canEdit) return
    const { destination, source } = result
    if (!destination || destination.droppableId !== source.droppableId) {
      return
    }

    const located = findCategoryListByDroppableId(
      fdCategoriesList,
      source.droppableId
    )
    if (!located?.list) return

    const items = reorder(located.list, source.index, destination.index)

    if (located.isRoot) {
      setFdCategoriesList(items)
    } else {
      const nextTree = [...fdCategoriesList]
      const apply = nodes => {
        for (let i = 0; i < nodes.length; i++) {
          if (String(nodes[i]._id) === destination.droppableId) {
            nodes[i].subcategories = items
            return true
          }
          if (nodes[i].subcategories?.length && apply(nodes[i].subcategories)) {
            return true
          }
        }
        return false
      }
      apply(nextTree)
      setFdCategoriesList(nextTree)
    }

    onPutFdCategorySort(
      {
        sortOrder: items.map((item, index) => ({
          _id: item._id,
          sortOrder: index + 1,
        })),
        storeTypeId: filter.storeTypeId,
      },
      buildCategoryListPayload(filter)
    )
  }

  return (
    <React.Fragment>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        toggle={toggleConfirmModal}
        onConfirm={removeConfirm}
      />

      <div className="page-content categories-page">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={props.t("categories")}
            breadcrumbItems={[{ title: props.t("categories") }]}
          />

          <Card className="categories-toolbar-card mb-3">
            <CardBody>
              <Row className="align-items-center mb-3">
                <Col md="8">
                  <h5 className="mb-1">{props.t("categories")}</h5>
                  <p className="categories-hint mb-0">
                    {accesses.canEdit
                      ? "Search, filter by status, and drag categories to change display order. Expand rows to manage subcategories."
                      : "Search and filter categories. Expand rows to view subcategories."}
                  </p>
                </Col>
                <Col
                  md="4"
                  className="d-flex flex-wrap justify-content-md-end gap-2 mt-2 mt-md-0"
                >
                  {activeStoreType?.storeType?.toLowerCase() !==
                    "serviceprovider" && (
                    <ExportCSVButton
                      url={
                        EXPORT_FD_CATEGORIES +
                        "/" +
                        filter.storeTypeId +
                        "/" +
                        (filter?.vendor || "")
                      }
                    />
                  )}
                  {accesses.canAdd &&
                    hasPermission("STORE.category.CREATE") && (
                      <Button
                        color="success"
                        className="btn-rounded waves-effect waves-light"
                        onClick={() => history.push("/categories/save")}
                      >
                        <i className="mdi mdi-plus mr-1" />
                        {props.t("add")} {props.t("new")}{" "}
                        {props.t("category")}
                      </Button>
                    )}
                </Col>
              </Row>

              <Row className="align-items-end">
                <Col lg="4" md="6" className="mb-2 mb-md-0">
                  <SearchInput
                    placeholder={`${props.t("search")} ${props.t("category")}…`}
                    searchText={searchText}
                    onSearch={setSearchText}
                    triggerSearch={onSearch}
                  />
                </Col>
                <Col lg="3" md="4" className="mb-2 mb-md-0">
                  <Label className="small text-muted mb-1 d-block">
                    {props.t("filter_by")}
                  </Label>
                  <select
                    className="custom-select"
                    value={filter?.fields?.[0]?.fieldValue || ""}
                    onChange={e => onStatusFilter(e.target.value)}
                  >
                    <option value="">{props.t("all")}</option>
                    <option value="active">{props.t("active")}</option>
                    <option value="inactive">{props.t("inactive")}</option>
                  </select>
                </Col>
                <Col
                  lg="5"
                  md="12"
                  className="d-flex flex-wrap align-items-center justify-content-lg-end gap-2 mb-2 mb-lg-0"
                >
                  <div className="categories-stat">
                    <div className="categories-stat__value">{stats.total}</div>
                    <div className="categories-stat__label">
                      {props.t("categories")}
                    </div>
                  </div>
                  <div className="categories-stat">
                    <div className="categories-stat__value text-success">
                      {stats.active}
                    </div>
                    <div className="categories-stat__label">
                      {props.t("active")}
                    </div>
                  </div>
                  {fdCategoriesList.some(c => c?.subcategories?.length > 0) && (
                    <>
                      <Button
                        color="light"
                        size="sm"
                        className="btn-soft-primary"
                        onClick={() => setExpandAll(true)}
                      >
                        Expand all
                      </Button>
                      <Button
                        color="light"
                        size="sm"
                        className="btn-soft-secondary"
                        onClick={() => setExpandAll(false)}
                      >
                        Collapse all
                      </Button>
                    </>
                  )}
                  {hasActiveFilters && (
                    <Link to="#" onClick={e => { e.preventDefault(); clearFilters() }}>
                      {props.t("clear_filters")}
                    </Link>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>

          <Row>
            <Col xs={12} className="spinner-content position-relative">
              {!loading && fdCategoriesList.length > 0 && (
                <CardContent
                  subCategories={fdCategoriesList}
                  onDragEnd={onCategoryDragEnd}
                  toggleConfirmModal={toggleConfirmModal}
                  accesses={accesses}
                  query={props?.location?.search}
                  activeStoreType={activeStoreType}
                  expandAll={expandAll}
                  canDelete={canDeleteCategory}
                />
              )}

              {!loading && fdCategoriesList.length <= 0 && (
                <Card>
                  <CardBody className="categories-empty">
                    <div className="categories-empty__icon">
                      <i className="mdi mdi-folder-open-outline" />
                    </div>
                    <h5>{props.t("category_not_found")}</h5>
                    <p className="text-muted mb-3">
                      {hasActiveFilters
                        ? "No categories match your search or filters. Try clearing filters or use a different term."
                        : "Create your first category to organize products for customers."}
                    </p>
                    {accesses.canAdd &&
                      hasPermission("STORE.category.CREATE") && (
                        <Button
                          color="primary"
                          className="btn-rounded"
                          onClick={() => history.push("/categories/save")}
                        >
                          <i className="mdi mdi-plus mr-1" />
                          {props.t("add")} {props.t("category")}
                        </Button>
                      )}
                    {hasActiveFilters && (
                      <Button
                        color="link"
                        className="ml-2"
                        onClick={clearFilters}
                      >
                        {props.t("clear_filters")}
                      </Button>
                    )}
                  </CardBody>
                </Card>
              )}

              {loading && (
                <div className="spinner">
                  <Spinner color="primary" />
                </div>
              )}
            </Col>
          </Row>

          {totalFdCategories > filter.limit && (
            <Row className="align-items-md-center mt-3">
              <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                <CustomPagination
                  totalCount={totalFdCategories}
                  limit={filter.limit}
                  page={filter.page}
                  setFilter={setFilter}
                />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

FdCategories.propTypes = {
  fdCategories: PropTypes.array,
  totalFdCategories: PropTypes.number,
  onGetFdCategories: PropTypes.func,
  onDeleteFdCategory: PropTypes.func,
  onPutFdCategorySort: PropTypes.func,
}

const mapStateToProps = ({ Login, FD_Categories, Settings }) => ({
  role: Login?.user?.role || "",
  loading: FD_Categories.loading,
  fdCategories: FD_Categories.fdCategories,
  totalFdCategories: FD_Categories.totalFdCategories,
  settings: Settings.settings,
  activeStoreType: Settings.settings?.storeTypeEnabled?.[0],
})

const mapDispatchToProps = dispatch => ({
  onGetFdCategories: data => dispatch(getFdCategories("storeType", data)),
  onDeleteFdCategory: (data, callback) =>
    dispatch(deleteFdCategory("storeType", data, callback)),
  onPutFdCategorySort: (data, filter) =>
    dispatch(putFdCategorySort("storeType", data, filter)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FdCategories))
)
