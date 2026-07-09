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

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap"

import SearchInput from "components/Common/SearchInput"

//i18n
import { withTranslation } from "react-i18next"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"
import {
  getPromotions,
  deletePromotion,
  putPromotionsStatus,
  getProductBatch,
  addProductBatch
} from "store/actions"
import ListColumns, { selectRow } from "./ListColumns"
import ConfirmModal from "./ConfirmModal"

// Components
import NotFound from "pages/Utility/pages-404-content"
import { SLUGS_NAME, isProductBatchEnabled } from "helpers/contants"
import { settings } from "nprogress"

const ProductBatch = ({
  accessLevel,
  history,
  promotions,
  totalPromotions,
  onGetPromotions,
  onDeletePromotion,
  onPutPromotionsStatus,
  onAddPromotions,
  loading,
  ...props
}) => {
  if (!isProductBatchEnabled(props.settings)) {
    return <NotFound />
  }

  const [orderIds, setOrderIds] = useState("");
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canBlock: false,
  })
  const [selected, setSelected] = useState([])
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    promotionId: null,
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
        fieldName: "",
        fieldValue: "",
      },
    ],
  })
  const [searchText, setSearchText] = useState("")
  const [promotionsList, setPromotionsList] = useState([])
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalPromotions,
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
    onGetPromotions(filter)
    setPromotionsList(promotions)
  }, [onGetPromotions, JSON.stringify(filter)])

  useEffect(() => {
    setPromotionsList(promotions || [])
  }, [promotions])

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (type, { searchText, sortField, sortOrder }) => {
    if (type === "search") {
      setSearchText(searchText)
    }

    if (type === "sort") {
      if (sortField == "createdAt") {
        sortField = "createdAt"
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

  const toggleConfirmModal = promotionId => {
    setConfirmModal(prevState => ({ isOpen: !prevState.isOpen, promotionId }))
  }

  const toggleConfirmSelectedModal = () => {
    setConfirmSelectedModal(prevState => ({ isOpen: !prevState.isOpen }))
  }

  const removeConfirm = () => {
    const { promotionId, isOpen } = confirmModal

    const onComplete = () => {
      onGetPromotions(filter)
    }

    setConfirmModal({ isOpen: !isOpen, promotionId: null })
    onDeletePromotion({ _id: promotionId }, onComplete)
  }

  const removeSelectedConfirm = () => {
    const onComplete = () => {
      setSelected([])
      onGetPromotions(filter)
    }

    setConfirmSelectedModal({ isOpen: false })
    onPutPromotionsStatus({ _id: selected, status: "archived" }, onComplete)
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

  const handlePromotionStatusChange = status => {
    const callback = () => {
      setSelected([])
      onGetPromotions(filter)
    }

    onPutPromotionsStatus({ _id: selected, status }, callback)
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
            title="productBatch"
            breadcrumbItem={props.t("productBatch")}
            breadcrumbItems={[{ title: SLUGS_NAME.confiLogistics === props.settings?.slug ? props.t("productBatch") : props.t("productBatch") }]}
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
                        data={promotionsList || []}
                        columns={ListColumns(
                          history,
                          toggleConfirmModal,
                          accesses,
                          props.t
                        )}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row>
                              <form onSubmit={(e) => e.preventDefault()}>
                                <Row>
                                  <Col
                                    xl={9}
                                  >
                                    <FormGroup>
                                      <Label>
                                        {props.t("orderIds")}
                                        <span className="text-danger">*</span>
                                      </Label>

                                      <Input
                                        required
                                        value={orderIds}
                                        onChange={(e) => {
                                          const newValue = e.target.value;
                                          const offerIds = orderIds.split(",");
                                          if (/^[0-9,]*$/.test(newValue) && offerIds.length < 50) {
                                            setOrderIds(newValue);
                                          }
                                        }}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col
                                    xl={3}
                                    className="d-flex align-items-end justify-content-end"
                                  >
                                    <div className="text-sm-left text-md-right mb-3">
                                      {accesses.canAdd && (
                                        <Button
                                          type="submit"
                                          color="success"
                                          className="btn-rounded waves-effect waves-light"
                                          onClick={async () => {

                                            const offerIds = orderIds.split(",");
                                            onAddPromotions({ offerIds }, filter);
                                          }}
                                        >
                                          <i className="mdi mdi-plus" />
                                          {props.t("addBatch")}
                                        </Button>
                                      )}
                                    </div>
                                  </Col>
                                </Row>
                              </form>
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
                                          value={filter.fields[0]?.fieldValue}
                                          style={{ minWidth: "106px" }}
                                        >
                                          <option value="">
                                            {props.t("all")}
                                          </option>
                                          <option value="processing">
                                            {props.t("processing")}
                                          </option>
                                          <option value="completed">
                                            {props.t("completed")}
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="search d-flex align-items-center">
                                    {/* <div className="pl-3">
                                      <SearchInput
                                        {...toolkitProps.searchProps}
                                        triggerSearch={onSearch}
                                        placeholder={props.t("search")}
                                        searchText={searchText}
                                      />
                                    </div> */}

                                    {!!filter.fields[0]?.fieldName ||
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
                                            handlePromotionStatusChange(
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

ProductBatch.propTypes = {
  promotions: PropTypes.array,
  totalPromotions: PropTypes.number,
  onGetPromotions: PropTypes.func,
  onDeletePromotion: PropTypes.func,
  onPutPromotionsStatus: PropTypes.func,
}

const mapStateToProps = ({ Settings, ProductBatchReducer }) => ({
  settings: Settings.settings,
  loading: ProductBatchReducer.loading,
  promotions: ProductBatchReducer.batch,
  totalPromotions: ProductBatchReducer.totalCount,
})

const mapDispatchToProps = dispatch => ({
  onGetPromotions: data => dispatch(getProductBatch(data)),
  onAddPromotions: (data, filter) => dispatch(addProductBatch(data, filter)),

  onDeletePromotion: (data, callback) =>
    dispatch(deletePromotion(data, callback)),
  onPutPromotionsStatus: (data, callback) =>
    dispatch(putPromotionsStatus(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ProductBatch))
)
