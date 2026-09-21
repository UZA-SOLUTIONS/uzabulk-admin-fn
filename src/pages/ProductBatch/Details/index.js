import React, { useEffect, useMemo, useRef, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap"

import SearchInput from "components/Common/SearchInput"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

//i18n
import { withTranslation } from "react-i18next"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"
import { getProductBatchDetail } from "store/actions"
import { reprocessProductBatch } from "helpers/backend_helper"
import ListColumns from "./ListColumns"

// Components
import NotFound from "pages/Utility/pages-404-content"
import { SLUGS_NAME, isProductBatchEnabled } from "helpers/contants"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

const PAGE_SIZE = 20

const toTime = value => {
  const time = value ? new Date(value).getTime() : 0
  return Number.isNaN(time) ? 0 : time
}

const sortProductsNewestFirst = (products = [], batchCreatedAt) => {
  return products
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const aTime =
        toTime(a.item.processedAt) ||
        toTime(a.item.createdAt) ||
        toTime(batchCreatedAt)
      const bTime =
        toTime(b.item.processedAt) ||
        toTime(b.item.createdAt) ||
        toTime(batchCreatedAt)
      if (bTime !== aTime) return bTime - aTime
      return a.index - b.index
    })
    .map(({ item }) => item)
}

const ProductBatchDetails = ({
  history,
  batchDetails,
  onGetDetails,
  loading,
  ...props
}) => {
  if (!isProductBatchEnabled(props.settings)) {
    return <NotFound />
  }

  const { id: batchId } = useParams()
  const [searchText, setSearchText] = useState("")
  const [appliedSearch, setAppliedSearch] = useState("")
  const [page, setPage] = useState(1)
  const [retryingOfferId, setRetryingOfferId] = useState("")
  const [lastAlibabaJson, setLastAlibabaJson] = useState(null)
  const retryLockRef = useRef(false)

  useEffect(() => {
    if (batchId) {
      onGetDetails(batchId)
      setSearchText("")
      setAppliedSearch("")
      setPage(1)
      setRetryingOfferId("")
      setLastAlibabaJson(null)
      retryLockRef.current = false
    }
  }, [batchId])

  const sortedProducts = useMemo(
    () =>
      sortProductsNewestFirst(
        batchDetails?.productIds || [],
        batchDetails?.createdAt
      ).map(product => ({
        ...product,
        createdAt:
          product.processedAt || product.createdAt || batchDetails?.createdAt,
      })),
    [batchDetails]
  )

  const filteredProducts = useMemo(() => {
    const query = (appliedSearch || "").trim().toLowerCase()
    if (!query) return sortedProducts
    return sortedProducts.filter(product =>
      String(product.offerId || "").toLowerCase().includes(query)
    )
  }, [sortedProducts, appliedSearch])

  const pagedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredProducts.slice(start, start + PAGE_SIZE).map(product => ({
      ...product,
      isRetrying: retryingOfferId === product.offerId,
    }))
  }, [filteredProducts, page, retryingOfferId])

  const pageOptions = {
    sizePerPage: PAGE_SIZE,
    totalSize: filteredProducts.length,
    custom: true,
    page,
    onPageChange: nextPage => setPage(nextPage || 1),
  }

  const onSearch = event => {
    event.preventDefault()
    setAppliedSearch((searchText || "").trim())
    setPage(1)
  }

  const onRetry = async offerId => {
    if (!offerId || retryLockRef.current) return
    retryLockRef.current = true
    setRetryingOfferId(offerId)
    try {
      const response = await reprocessProductBatch({ offerIds: [offerId] })
      if (response?.status === "failure") {
        toastr.error(response.message || "Could not retry this product.")
        return
      }
      const items = response?.data?.items || []
      const imported = items.find(item => item.name)
      const first = items[0]
      if (first?.alibaba) {
        setLastAlibabaJson(first.alibaba)
      }
      if (imported?.name) {
        toastr.success(`Imported: ${imported.name}`)
      } else {
        toastr.error(
          first?.alibaba?.error
            ? `1688: ${first.alibaba.error}`
            : "1688 did not return a product name. This offer is still failed."
        )
      }
      onGetDetails(batchId)
    } catch (error) {
      toastr.error("Could not retry this product.")
    } finally {
      retryLockRef.current = false
      setRetryingOfferId("")
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="productBatchDetails"
            breadcrumbItem={props.t("productBatchDetails")}
            breadcrumbItems={[{ title: SLUGS_NAME.confiLogistics === props.settings?.slug ? props.t("productBatchDetails") : props.t("productBatchDetails") }]}
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
                        keyField="offerId"
                        data={pagedProducts}
                        columns={ListColumns(props.t, onRetry)}
                        bootstrap4
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            {lastAlibabaJson && (
                              <Alert color="warning" className="mb-3">
                                <div className="font-weight-bold mb-2">
                                  1688 JSON for this retry
                                </div>
                                <pre
                                  className="mb-0"
                                  style={{
                                    maxHeight: 320,
                                    overflow: "auto",
                                    whiteSpace: "pre-wrap",
                                    fontSize: 12,
                                  }}
                                >
                                  {JSON.stringify(lastAlibabaJson, null, 2)}
                                </pre>
                              </Alert>
                            )}
                            <Row className="mb-3">
                              <Col xs={12} md={7} lg={8} xl={7}>
                                <div className="search d-flex align-items-center">
                                  <SearchInput
                                    onSearch={setSearchText}
                                    triggerSearch={onSearch}
                                    placeholder={`${props.t("search")} ${props.t("offerId")}`}
                                    searchText={searchText}
                                  />
                                  {!!appliedSearch && (
                                    <div
                                      className="ml-3"
                                      style={{ minWidth: "73px" }}
                                    >
                                      <a
                                        href="#"
                                        onClick={e => {
                                          e.preventDefault()
                                          setSearchText("")
                                          setAppliedSearch("")
                                          setPage(1)
                                        }}
                                      >
                                        {props.t("clear_filters")}
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </Col>
                            </Row>
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

ProductBatchDetails.propTypes = {
  batchDetails: PropTypes.object,
  onGetDetails: PropTypes.func,
}

const mapStateToProps = ({ Settings, ProductBatchReducer }) => ({
  settings: Settings.settings,
  loading: ProductBatchReducer.loading,
  batchDetails: ProductBatchReducer.details
})

const mapDispatchToProps = dispatch => ({
  onGetDetails: (id) => dispatch(getProductBatchDetail(id)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ProductBatchDetails))
)
