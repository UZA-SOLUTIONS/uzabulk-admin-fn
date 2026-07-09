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
import { usePermissions } from "helpers/permissions"

import { GET_SERVICE_NAME, ROLES } from "helpers/contants"

import {
  getFdAttributes,
  deleteFdAttribute,
  putFdAttributesStatus,
} from "store/actions"
import ListColumns, { selectRow } from "./ListColumns"
import ConfirmModal from "./ConfirmModal"

const FdAttributes = ({
  accessLevel,
  role,
  vendorId,
  history,
  fdAttributes,
  totalFdAttributes,
  onGetFdAttributes,
  onDeleteFdAttribute,
  onPutFdAttributesStatus,
  loading,
  activeStoreId,
  activeStoreType,
  ...props
}) => {
  const { vendorId: _vendorIdParam } = useParams()
  const { vendor_name } = queryString.parse(props?.location?.search)

  const didMountRef = useRef(null)

  const hasPermission = usePermissions()

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
    fdAttributeId: null,
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
  const [fdAttributesList, setFdAttributesList] = useState([])
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalFdAttributes,
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
      if (filter.vendor) {
        onGetFdAttributes(filter)
        setFdAttributesList([])
      }
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

      case ROLES.subVendor:
        vendor = vendorId
        break

      default:
        break
    }

    if (vendor) {
      // console.log(vendor, "II");
      setFilter(prevState => ({
        ...prevState,
        storeTypeId: activeStoreId,
        vendor,
      }))
    }

    setvendorIdPara(vendor)
  }, [activeStoreId, role, vendorId, _vendorIdParam])

  useEffect(() => {
    setFdAttributesList(fdAttributes || [])
  }, [fdAttributes])

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

  const toggleConfirmModal = fdAttributeId => {
    setConfirmModal(prevState => ({
      isOpen: !prevState.isOpen,
      fdAttributeId,
    }))
  }

  const removeConfirm = () => {
    const { fdAttributeId, isOpen } = confirmModal

    const onComplete = () => {
      onGetFdAttributes(filter)
    }

    setConfirmModal({ isOpen: !isOpen, fdAttributeId: null })
    onDeleteFdAttribute(
      { _id: fdAttributeId, storeTypeId: activeStoreId },
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

  const handleFdAttributeStatusChange = status => {
    const callback = () => {
      setSelected([])
      onGetFdAttributes(filter)
    }

    onPutFdAttributesStatus(
      { _id: selected, storeTypeId: activeStoreId, status },
      callback
    )
  }

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
            breadcrumbItem={props.t("attributes")}
            breadcrumbItems={[
              ...(activeStoreType?.storeVendorType !== "SINGLE" &&
              role !== ROLES.vendor &&
              role !== ROLES.subVendor
                ? [
                    {
                      title:
                        GET_SERVICE_NAME({
                          storeType: activeStoreType?.storeType,
                        }) + "s",
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
                title: props.t("attributes"),
              },
            ]}
          />
          <p>
            <small>{props.t("attribute_int")}</small>
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
                        data={fdAttributesList || []}
                        columns={ListColumns({
                          toggleConfirmModal,
                          currentUrl: activeStoreType?.storeType?.toLowerCase(),
                          _vendorIdParam,
                          vendorIdParam,
                          accesses,
                          t: props.t,
                          query: props?.location?.search,
                          hasPermission: hasPermission(
                            "STORE.attribute.DELETE"
                          ),
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
                                          value={filter.fields[0]?.fieldValue}
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

                              <Col
                                className="mb-3"
                                xs={12}
                                md={5}
                                lg={4}
                                xl={5}
                              >
                                <div className="text-sm-left text-md-right">
                                  {accesses.canAdd &&
                                    hasPermission("STORE.attribute.CREATE") && (
                                      <Button
                                        type="button"
                                        color="success"
                                        className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                        onClick={() =>
                                          history.push(
                                            `/${activeStoreType?.storeType?.toLowerCase()}/attributes/add${
                                              _vendorIdParam
                                                ? "/" + vendorIdParam
                                                : ""
                                            }${props?.location?.search}`
                                          )
                                        }
                                      >
                                        <i className="mdi mdi-plus mr-1" />
                                        {props.t("add")} {props.t("new")}{" "}
                                        {props.t("attribute")}
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
                                            handleFdAttributeStatusChange(
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
                                        handleFdAttributeStatusChange(
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

FdAttributes.propTypes = {
  role: PropTypes.string,
  vendorId: PropTypes.string,
  fdAttributes: PropTypes.array,
  totalFdAttributes: PropTypes.number,
  onGetFdAttributes: PropTypes.func,
  onDeleteFdAttribute: PropTypes.func,
  onPutFdAttributesStatus: PropTypes.func,
}

const mapStateToProps = ({ Login, FD_Attributes }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "",
  vendor_name: Login?.user?.name,
  loading: FD_Attributes.loading,
  fdAttributes: FD_Attributes.fdAttributes,
  totalFdAttributes: FD_Attributes.totalFdAttributes,
})

const mapDispatchToProps = dispatch => ({
  onGetFdAttributes: data => dispatch(getFdAttributes(data)),
  onDeleteFdAttribute: (data, callback) =>
    dispatch(deleteFdAttribute(data, callback)),
  onPutFdAttributesStatus: (data, callback) =>
    dispatch(putFdAttributesStatus(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FdAttributes))
)
